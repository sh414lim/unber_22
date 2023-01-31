import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entitis/user.entity';
import { CreateSHOPInputType, CreateShopOutPut } from './dtos/create-shop.dto';
import { Shop } from './entities/shop.entity';
import { ShopService } from './shop.service';

@Resolver((of) => Shop)
export class ShopResolver {
  constructor(private readonly ShopService: ShopService) {}

  @Mutation((returns) => Boolean)
  async createShop(
    @AuthUser() authUser: User,
    @Args('input') createShopInput: CreateSHOPInputType,
  ): Promise<CreateShopOutPut> {
    console.log(createShopInput);
    return await this.ShopService.createShop(authUser, createShopInput);
  }
}
