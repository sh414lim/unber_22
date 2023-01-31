import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entitis/user.entity';
import { Repository } from 'typeorm';
import { CreateSHOPInputType, CreateShopOutPut } from './dtos/create-shop.dto';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shop: Repository<Shop>,
  ) {}

  async createShop(
    owner: User,
    createShopInput: CreateSHOPInputType,
  ): Promise<CreateShopOutPut> {
    try {
      const newShop = this.shop.create(createShopInput); // 새로운 인스턴스 생성
      newShop.owner = owner;
      await this.shop.save(newShop);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
