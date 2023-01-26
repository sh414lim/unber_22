import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { User } from './entitis/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<string | undefined> {
    // check email  , new user
    // create user pwd
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        // make error
        return '해당 이메일이 존재합니다';
      }
      await this.users.save(this.users.create({ email, password, role }));
    } catch (e) {
      //make error
      console.log(e);
      return '계정을 생성할 수 없습니다';
    }
  }
}
