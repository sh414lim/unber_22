import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShopDto } from './dtos/create-shop.dto';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shop: Repository<Shop>,
  ) {}
  getAll(): Promise<Shop[]> {
    return this.shop.find();
  }

  createShop(createShopDto: CreateShopDto): Promise<Shop> {
    const newShop = this.shop.create(createShopDto); // 새로운 인스턴스 생성

    return this.shop.save(newShop);
  }
}
