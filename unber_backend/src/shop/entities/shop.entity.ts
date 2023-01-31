import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { isAbstractType } from 'graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entitis/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@InputType('ShopInputType', { isAbstract: true }) // Inputtype 이 스키마에 포함되지 않길 원한다
@ObjectType() // 자동으로 스키마를 빌드하기 위해 사용하는 GraphQl decorator
@Entity()
export class Shop extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImage: string;

  @Field((type) => Category, { nullable: true }) // category 를 지울때 shop 은 지우면 안된다
  @ManyToOne((type) => Category, (cateogry) => cateogry.shops, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((type) => User, { nullable: true }) // category 를 지울때 shop 은 지우면 안된다
  @ManyToOne((type) => User, (user) => user.shops, {})
  owner: User;
}
