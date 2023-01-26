import { Resolver } from '@nestjs/graphql';
import { User } from './entitis/user.entity';
import { UsersService } from './users.service';
import { Query } from '@nestjs/graphql';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((resturns) => Boolean)
  hi() {
    return true;
  }
}
