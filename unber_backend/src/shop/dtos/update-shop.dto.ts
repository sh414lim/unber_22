import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateShopDto } from './create-shop.dto';

@InputType()
export class UpdateShopInputType extends PartialType(CreateShopDto) {}

@InputType()
export class UpdateShopDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateShopInputType)
  data: UpdateShopInputType;
}
