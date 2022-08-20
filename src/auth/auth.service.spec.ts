import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { UserRepository } from '../user/repository/user.repository'
import { User } from '../user/entity/user.entity'
import { AuthDTO } from './dto/auth.dto'
import { SignInDTO } from './dto/signin.dto'
import { AccessTokenDTO, JWTUser } from './dto/get-user.dto'

const user: User = {
  id: 'any_id',
  name: 'Admin',
  password: 'any_password',
  salt: 'any_salt'
}

const authDTO: AuthDTO = {
  name: 'any_name',
  password: 'any_password'
}

const credentials: SignInDTO = {
  name: 'any_name',
  password: 'any_password'
}

const jwtUser: JWTUser = {
  id: 'any_id',
  name: 'Admin'
}
const accessToken: AccessTokenDTO = {
  accessToken: 'any_token',
  user: jwtUser
}

const mockRepository = {
  signUp: jest.fn().mockResolvedValue(user),
  validatePassword: jest.fn().mockResolvedValue(user),
  checkIfNameExists: jest.fn().mockResolvedValue(false)
}

describe('AuthService', () => {
  let service: AuthService
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockRepository
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
    jwtService = module.get<JwtService>(JwtService)
  })

  describe('Sign Up', () => {
    it('should be able to sign up', async () => {
      const response = await service.signUp(authDTO)

      expect(response).toEqual({ user, msg: 'Usuário cadastrado com sucesso!' })
    })

    it('should not be able to sign up', () => {
      jest
        .spyOn(mockRepository, 'checkIfNameExists')
        .mockResolvedValueOnce(true)

      const response = service.signUp(authDTO)

      expect(response).rejects.toThrow()
    })

    it('should throw error if there is an unexpected error', () => {
      jest
        .spyOn(mockRepository, 'checkIfNameExists')
        .mockRejectedValueOnce(new Error())

      const response = service.signUp(authDTO)

      expect(response).rejects.toThrow()
    })
  })

  describe('Sign In', () => {
    it('should be able to sign in', async () => {
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('any_token')

      const response = await service.signIn(credentials)

      expect(response).toEqual(accessToken)
    })

    it('should not be able to sign in', () => {
      jest.spyOn(mockRepository, 'validatePassword').mockResolvedValueOnce(null)

      const response = service.signIn(credentials)

      expect(response).rejects.toThrow()
    })

    it('should not be able to sign in', () => {
      jest
        .spyOn(mockRepository, 'validatePassword')
        .mockRejectedValueOnce(new Error())

      const response = service.signIn(credentials)

      expect(response).rejects.toThrow()
    })
  })
})
