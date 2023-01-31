import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { type } from 'os';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entitis/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutPut extends CoreOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
