import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { IsString, IsBoolean, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Shop } from '../entities/shop.entity';

@InputType()
export class CreateSHOPInputType extends OmitType(
  Shop,
  ['id', 'category', 'owner'],
  // InputType
) {}

@ObjectType()
export class CreateShopOutPut extends CoreEntity {}
