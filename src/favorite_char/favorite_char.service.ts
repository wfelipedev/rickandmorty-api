import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CharLocationRepository } from '../char_location/repository/char_location.repository'
import { CharOriginRepository } from '../char_origin/repository/char_origin.repository'
import { User } from '../user/entity/user.entity'
import { CreateFavoriteDTO } from './dto/create-favorite.dto'
import { FavoriteChar } from './entity/favorite_char.entity'
import { FavoriteCharRepository } from './repository/favorite_char.repository'

@Injectable()
export class FavoriteCharService {
  constructor(
    private readonly repo: FavoriteCharRepository,
    private readonly repoOrigin: CharOriginRepository,
    private readonly repoLocation: CharLocationRepository
  ) {}

  async persistFavorite(
    dto: CreateFavoriteDTO,
    currentUser: User
  ): Promise<{ msg: string }> {
    try {
      if (await this.repo.getFavoriteByCharId(dto.char_id))
        throw new HttpException(
          'Esse personagem já está em sua lista de favoritos!',
          HttpStatus.BAD_REQUEST
        )

      const originSaved = await this.repoOrigin.persistOrigin(dto.origin)
      const locationSaved = await this.repoLocation.persistLocation(
        dto.location
      )

      await this.repo.persistFavorite(
        Object.assign(dto, {
          origin_id: originSaved.id,
          location_id: locationSaved.id,
          user_id: currentUser.id
        })
      )

      return { msg: 'Personagem favoritado com sucesso!' }
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus())
      }

      throw new HttpException(
        'Erro interno ao tentar salvar favorito!',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getFavoriteById(id: string): Promise<FavoriteChar> {
    try {
      const favoriteFound = await this.repo.getFavoriteById(id)

      if (!favoriteFound)
        throw new HttpException(
          'Erro ao buscar personagem favorito!',
          HttpStatus.NOT_FOUND
        )

      return favoriteFound
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus())
      }
      throw new HttpException(
        'Erro interno ao tentar buscar personagem favorito!',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getFavorites(currentUser: User): Promise<FavoriteChar[]> {
    try {
      const favoritesFound = await this.repo.getFavorites(currentUser.id)

      await Promise.all(
        favoritesFound.map(async favorite => {
          const originFound = await this.repoOrigin.getOriginsById(
            favorite.origin_id
          )

          const locationFound = await this.repoLocation.getLocationById(
            favorite.location_id
          )

          Object.assign(favorite, {
            origin: originFound,
            location: locationFound
          })
        })
      )

      return favoritesFound
    } catch (error) {
      throw new HttpException(
        'Erro interno ao tentar listar personagens favoritos!',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async deleteFavorite(id: string): Promise<{ msg: string }> {
    try {
      const favoriteFound = await this.repo.getFavoriteById(id)

      if (!favoriteFound)
        throw new HttpException(
          'Erro ao buscar personagem favorito!',
          HttpStatus.NOT_FOUND
        )

      await this.repo.deleteFavorite(id)

      return { msg: 'Personagem removido com sucesso!' }
    } catch (error) {
      console.log(error)
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus())
      }
      throw new HttpException(
        'Erro interno ao tentar remover dos favoritos!',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
