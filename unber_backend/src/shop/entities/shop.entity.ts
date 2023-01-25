import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Shop {
  @Field((type) => String)
  name: string;

  @Field((type) => Boolean)
  isVegan: boolean;

  @Field((type) => String)
  address: string;

  @Field((type) => String)
  owner: string;
}
