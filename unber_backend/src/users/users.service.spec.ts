import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { User } from './entitis/user.entity';
import { Verification } from './entitis/verification.entity';
import { UsersService } from './users.service';

const mockRepositiory = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockMailService = {
  sendEmail: jest.fn(),
};

type MockRepositiory<T = any> = Partial<
  Record<keyof Repository<User>, jest.Mock>
>;

describe('UserService', () => {
  let service: UsersService;
  let userRepository: MockRepositiory<User>; // Parital -> 타입 t의 모든 요소를 optional 하게 만든다 , Record -> 타입 T의 요소 K의 집합으로 타입을 만들어주는 TS

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepositiory(),
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepositiory(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('be defined', () => {
    expect(service).toBeDefined;
  });
  describe('createAccount', () => {
    const createAccountArgs = {
      email: '',
      password: '',
      role: 0,
    };
    it('should fail if user exists', async () => {
      userRepository.findOne.mockResolvedValue({
        id: 1,
        email: '',
      });
      const result = await service.createAccount(createAccountArgs);
      expect(result).toMatchObject({
        ok: false,
        error: 'There is a user with that email already',
      });
    });
    it('should create a new user', async () => {
      userRepository.findOne.mockResolvedValue(undefined);
      userRepository.create.mockResolvedValue(createAccountArgs);
      await service.createAccount(createAccountArgs);
      expect(userRepository.create).toHaveBeenCalledTimes(1); // 이 함수가 한번만 불린다
      expect(userRepository.create).toHaveBeenCalledWith(createAccountArgs);
      expect(userRepository.save).toHaveBeenCalledTimes(1); // 이 함수가 한번만 불린다
      expect(userRepository.save).toHaveBeenCalledWith(createAccountArgs);
    });
  });

  it.todo('createAccount ');
  it.todo('login ');
  it.todo('editProfile ');
  it.todo('findById ');
  it.todo('verifyEmail ');
});
