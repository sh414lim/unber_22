import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Guest {
  @PrimaryGeneratedColumn()
  @Field((is) => Int)
  number: number;

  // @Column()
  @Field((type) => Boolean, { nullable: true })
  writer: boolean;

  // @Column()
  @Field(() => String)
  title: string;

  // @Column()
  @Field(() => String)
  contents: string;
}
