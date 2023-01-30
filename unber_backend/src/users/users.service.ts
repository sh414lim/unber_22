import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entitis/user.entity';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '../jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';
import { Verification } from './entitis/verification.entity';
import { versionInfo } from 'graphql';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    // private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    // check email  , new user
    // create user pwd
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        // make error
        return { ok: false, error: 'There is a user with that email already' };
      }
      const user = await this.users.save(
        this.users.create({ email, password, role }),
      );
      await this.verifications.save(
        this.verifications.create({
          // code : 12312313,
          user,
        }),
      );
      return { ok: true };
    } catch (e) {
      //make error
      console.log(e);
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    // emaill user find
    //pwd check
    //jwt -> user seetting

    try {
      const user = await this.users.findOne({
        where: { email },
        select: ['id', 'password'],
      });
      if (!user) {
        return {
          ok: false,
          error: 'not found user',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: '비밀번호가 맞지 않습니다 다시 확인부탁드립니다',
        };
      }
      // const token = jwt.sign(
      //   { id: user.id, password: '123456' },
      //   this.config.get('SECRET_KEY'),
      // );
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ where: { id } });
  }
  async editProfile(
    id: number,
    { email, password }: EditProfileInput,
  ): Promise<User> {
    const user = await this.users.findOne({ where: { id } });

    if (email) {
      user.email = email;
      user.verified = false;
      await this.verifications.save(this.verifications.create({ user }));
    }

    if (password) {
      user.password = password;
    }

    return this.users.save(user);
  }

  async verifyEmail(code: string): Promise<boolean> {
    try {
      const verification = await this.verifications.findOne({
        where: { code },
        relations: ['user'],
      });
      if (verification) {
        verification.user.verified = true;
        console.log(verification.user);
        this.users.save(verification.user);
        return true;
      }

      throw new Error();
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
