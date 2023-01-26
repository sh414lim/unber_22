import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateShopDto } from './dtos/create-shop.dto';
import { Shop } from './entities/shop.entity';
import { ShopService } from './shop.service';

@Resolver((of) => Shop)
export class ShopResolver {
  constructor(private readonly ShopService: ShopService) {}
  @Query((returns) => [Shop])
  shop(): Promise<Shop[]> {
    return this.ShopService.getAll();
  }

  @Mutation((returns) => Boolean)
  async createShop(
    @Args('input') createShopInputDto: CreateShopDto,
  ): Promise<boolean> {
    console.log(createShopInputDto);
    try {
      await this.ShopService.createShop(createShopInputDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
