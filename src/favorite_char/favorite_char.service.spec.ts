import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { CharLocation } from '../char_location/entity/char_location.entity'
import { CharLocationRepository } from '../char_location/repository/char_location.repository'
import { CharOrigin } from '../char_origin/entity/char_origin.entity'
import { CharOriginRepository } from '../char_origin/repository/char_origin.repository'
import { User } from '../user/entity/user.entity'
import { CreateFavoriteDTO } from './dto/create-favorite.dto'
import { FavoriteChar } from './entity/favorite_char.entity'
import { FavoriteCharService } from './favorite_char.service'
import { FavoriteCharRepository } from './repository/favorite_char.repository'

const user: User = {
  id: 'any_id',
  name: 'Admin',
  password: 'any_password',
  salt: 'any_salt'
}

const charOrigin: CharOrigin = {
  id: 'any_id',
  name: 'any_name',
  url: 'any_url'
}

const charLocation: CharLocation = {
  id: 'any_id',
  name: 'any_name',
  url: 'any_url'
}

const favorite: FavoriteChar = {
  id: 'any_id',
  char_id: 11,
  name: 'Albert Einstein',
  status: 'Dead',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin_id: '',
  location_id: '',
  image: 'https://rickandmortyapi.com/api/character/avatar/11.jpeg',
  url: 'https://rickandmortyapi.com/api/character/11',
  created: '2017-11-04T20:20:20.965Z',
  user_id: 'any_user_id'
}

const favoriteDTO: CreateFavoriteDTO = {
  char_id: 11,
  name: 'Albert Einstein',
  status: 'Dead',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1'
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20'
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/11.jpeg',
  episodes: [''],
  url: 'https://rickandmortyapi.com/api/character/11',
  created: '2017-11-04T20:20:20.965Z'
}

const mockRepository = {
  persistOrigin: jest.fn().mockResolvedValue(charOrigin),
  persistLocation: jest.fn().mockResolvedValue(charLocation),
  persistFavorite: jest.fn().mockResolvedValue(favorite),
  getFavoriteById: jest.fn().mockResolvedValue(favorite),
  getFavorites: jest.fn().mockResolvedValue([favorite]),
  getOriginsById: jest.fn().mockResolvedValue(charOrigin),
  getLocationById: jest.fn().mockResolvedValue(charLocation),
  deleteFavorite: jest.fn().mockResolvedValue(true),
  getFavoriteByCharId: jest.fn().mockResolvedValue(favorite)
}

describe('FavoriteCharService', () => {
  let service: FavoriteCharService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteCharService,
        {
          provide: getRepositoryToken(FavoriteCharRepository),
          useValue: mockRepository
        },
        {
          provide: getRepositoryToken(CharOriginRepository),
          useValue: mockRepository
        },
        {
          provide: getRepositoryToken(CharLocationRepository),
          useValue: mockRepository
        }
      ]
    }).compile()

    service = module.get<FavoriteCharService>(FavoriteCharService)
  })

  describe('Persist Favorite Character', () => {
    it('should be able to persist character', async () => {
      jest
        .spyOn(mockRepository, 'getFavoriteByCharId')
        .mockResolvedValueOnce(null)

      const response = await service.persistFavorite(favoriteDTO, user)

      expect(response).toEqual({
        msg: 'Personagem favoritado com sucesso!'
      })
    })

    it('should not return favorite character by id', () => {
      const response = service.persistFavorite(favoriteDTO, user)

      expect(response).rejects.toThrow()
    })

    it('should not be able to persist character - internal error', () => {
      jest
        .spyOn(mockRepository, 'persistFavorite')
        .mockRejectedValueOnce(new Error())

      const response = service.persistFavorite(favoriteDTO, user)

      expect(response).rejects.toThrow()
    })
  })

  describe('Get Favorite Character by Id', () => {
    it('should return favorite character by id', async () => {
      const response = await service.getFavoriteById('any_id')

      expect(response).toEqual(favorite)
    })

    it('should not return favorite character by id', () => {
      jest.spyOn(mockRepository, 'getFavoriteById').mockResolvedValueOnce(null)

      const response = service.getFavoriteById('any_id')

      expect(response).rejects.toThrow()
    })

    it('should not return favorite character by id', () => {
      jest
        .spyOn(mockRepository, 'getFavoriteById')
        .mockRejectedValueOnce(new Error())

      const response = service.getFavoriteById('any_id')

      expect(response).rejects.toThrow()
    })
  })

  describe('Get My Favorites Characters', () => {
    it('should be able to return my favorites characters', async () => {
      const response = await service.getFavorites(user)

      expect(response).toEqual([favorite])
    })

    it('should not return favorite character by id', () => {
      jest
        .spyOn(mockRepository, 'getFavorites')
        .mockRejectedValueOnce(new Error())

      const response = service.getFavorites(user)

      expect(response).rejects.toThrow()
    })
  })

  describe('Delete Favorite Character', () => {
    it('should be able to remove one of my favorites characters by id', async () => {
      const response = await service.deleteFavorite('any_id')

      expect(response).toEqual({ msg: 'Personagem removido com sucesso!' })
    })

    it('should be able to remove one of my favorites characters by id', () => {
      jest.spyOn(mockRepository, 'getFavoriteById').mockResolvedValueOnce(null)

      const response = service.deleteFavorite('any_id')

      expect(response).rejects.toThrow()
    })

    it('should not return favorite character by id', () => {
      jest
        .spyOn(mockRepository, 'deleteFavorite')
        .mockRejectedValueOnce(new Error())

      const response = service.deleteFavorite('any_id')

      expect(response).rejects.toThrow()
    })
  })
})

// 15128684/0001-89
