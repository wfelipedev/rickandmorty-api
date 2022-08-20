import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './entity/user.entity'
import { UserRepository } from './repository/user.repository'
import { UserService } from './user.service'

const user: User = {
  id: 'any_id',
  name: 'Admin',
  password: 'any_password',
  salt: 'any_salt'
}

const mockRepository = {
  getUserById: jest.fn().mockResolvedValue(user)
}

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockRepository
        }
      ]
    }).compile()

    service = module.get<UserService>(UserService)
  })

  describe('Get User By Id', () => {
    it('should be able to get user by id', async () => {
      const response = await service.getUserById('any_id')

      expect(response).toEqual(user)
    })

    it('should not be able to get user by id', async () => {
      jest
        .spyOn(mockRepository, 'getUserById')
        .mockRejectedValueOnce(new Error())

      const response = service.getUserById('any_id')

      expect(response).rejects.toThrow()
    })
  })
})
