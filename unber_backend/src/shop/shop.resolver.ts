import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateShopDto } from './dtos/create-shop.dto';
import { Shop } from './entities/shop.entity';

@Resolver((of) => Shop)
export class ShopResolver {
  @Query((returns) => [Shop])
  guest(@Args('veganOnly') veganOnly: boolean): Shop[] {
    return [];
  }

  @Mutation((returns) => Boolean)
  createShop(@Args() createShopInputDto: CreateShopDto): boolean {
    console.log(createShopInputDto);
    return true;
  }
}
