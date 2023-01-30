import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entitis/user.entity';
import { UsersService } from './users.service';
import { Query } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutPut } from './dtos/login.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { MutationOutput } from 'src/common/dtos/output.dto';
import {
  VerifyEmailIutput,
  VerifyEmailOutput,
} from './entitis/verify-email.dto';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query((resturns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  @Mutation((returns) => LoginOutPut)
  async login(@Args('input') loginInput: LoginInput) {
    return this.userService.login(loginInput);
  }

  // @Query((returns) => User)
  // me(@Context() context) {
  //   console.log(context.user);
  //   if (!context.user) {
  //     return;
  //   } else {
  //     return context.user;
  //   }
  // }

  @Query((returns) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    //authuser 는 현재 사용자에 대한 정보를 준다
    // console.log(authUser);
    return authUser;
  }

  @UseGuards(AuthGuard)
  @Query((reutrns) => UserProfileOutput)
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.userService.findById(userProfileInput.userId);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => EditProfileOutput)
  async editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.userService.editProfile(authUser.id, editProfileInput);
  }

  @Mutation((returns) => VerifyEmailOutput)
  async verifyEmail(
    @Args('input') { code }: VerifyEmailIutput,
  ): Promise<VerifyEmailOutput> {
    try {
      await this.userService.verifyEmail(code);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }
}
