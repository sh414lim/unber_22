import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class ShopResolver {
  @Query((returns) => Boolean)
  myGuest() {
    return true;
  }
}
