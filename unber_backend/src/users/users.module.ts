import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from './entitis/user.entity';
import { UserResolver } from './user.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserResolver, ConfigService, JwtService],
})
export class UsersModule {}
