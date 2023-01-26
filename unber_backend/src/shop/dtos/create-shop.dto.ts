import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { IsString, IsBoolean, Length } from 'class-validator';
import { Shop } from '../entities/shop.entity';

@InputType()
export class CreateShopDto extends OmitType(
  Shop,
  ['id'],
  // InputType
) {}

// @Field((type) => String)
// @IsString()
// @Length(5, 10)
// name: string;

// @Field((type) => Boolean)
// @IsBoolean()
// isVegan: boolean;

// @Field((type) => String)
// @IsString()
// address: string;

// @Field((type) => String)
// @IsString()
// ownersName: string;

// @Field((type) => String)
// @IsString()
// categoryName: string;
