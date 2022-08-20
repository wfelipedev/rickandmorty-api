import { EntityRepository, Repository } from 'typeorm'
import { FavoriteChar } from '../entity/favorite_char.entity'
import { CreateFavoriteDTO } from '../dto/create-favorite.dto'
import { User } from '../../user/entity/user.entity'

@EntityRepository(FavoriteChar)
export class FavoriteCharRepository extends Repository<FavoriteChar> {
  async persistFavorite(dto: CreateFavoriteDTO): Promise<FavoriteChar> {
    const entity = this.create(dto)

    return this.save(entity)
  }

  async getFavorites(userId: string): Promise<FavoriteChar[]> {
    const entitiesFound = await this.find({
      where: { user_id: userId }
    })

    return entitiesFound
  }

  async getFavoriteById(id: string): Promise<FavoriteChar> {
    const entityFound = await this.findOne({ where: { id } })

    return entityFound
  }

  async getFavoriteByCharId(id: number): Promise<FavoriteChar> {
    const entityFound = await this.findOne({ where: { char_id: id } })

    return entityFound
  }

  async getMyFavoriteByCharId(
    id: number,
    userId: string
  ): Promise<FavoriteChar> {
    const entityFound = await this.findOne({
      where: { char_id: id, user_id: userId }
    })

    return entityFound
  }

  async deleteFavorite(id: string): Promise<boolean> {
    await this.delete(id)
    return true
  }
}
