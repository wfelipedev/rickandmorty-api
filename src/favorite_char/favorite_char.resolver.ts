import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { GetGqlUser } from '../auth/get-user.decorator'
import AuthGuard from '../auth/guards/gql-auth.guard'
import { User } from '../user/entity/user.entity'
import { FavoriteChar } from './entity/favorite_char.entity'
import { FavoriteCharService } from './favorite_char.service'

@UseGuards(AuthGuard)
@Resolver()
export class FavoriteCharResolver {
  constructor(private readonly service: FavoriteCharService) {}

  @Query(() => [FavoriteChar])
  async getFavorites(@GetGqlUser() user: User): Promise<FavoriteChar[]> {
    return this.service.getFavorites(user)
  }
}
