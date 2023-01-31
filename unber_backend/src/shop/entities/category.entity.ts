import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { isAbstractType } from 'graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from './shop.entity';

@InputType('CategoryInput', { isAbstract: true }) // Inputtype 이 스키마에 포함되지 않길 원한다
@ObjectType() // 자동으로 스키마를 빌드하기 위해 사용하는 GraphQl decorator
@Entity()
export class Category extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImage: string;

  @Field((type) => [Shop])
  @OneToMany((type) => Shop, (shop) => shop.category)
  shops: Shop[];
}
