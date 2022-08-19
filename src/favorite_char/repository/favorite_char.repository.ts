import { EntityRepository, Repository } from 'typeorm'
import { FavoriteChar } from '../entity/favorite_char.entity'
import { CreateFavoriteDTO } from '../dto/create-favorite.dto'

@EntityRepository(FavoriteChar)
export class FavoriteCharRepository extends Repository<FavoriteChar> {
  async persistFavorite(dto: CreateFavoriteDTO): Promise<FavoriteChar> {
    const entity = this.create(dto)

    return this.save(entity)
  }

  async getFavorites(userId: string): Promise<FavoriteChar[]> {
    const entitiesFound = await this.find()

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

  async deleteFavorite(id: string): Promise<boolean> {
    await this.delete(id)
    return true
  }
}
