import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { IsString, IsBoolean, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Shop } from '../entities/shop.entity';

@InputType()
export class CreateSHOPInputType extends PickType(Shop, [
  'name',
  'coverImg',
  'address',
]) {
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class CreateShopOutPut extends CoreEntity {}
