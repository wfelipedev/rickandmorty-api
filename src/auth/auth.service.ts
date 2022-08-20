import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthDTO } from './dto/auth.dto'
import { SignInDTO } from './dto/signin.dto'
import { JwtPayload } from './jwt-payload.interface'
import { User } from '../user/entity/user.entity'
import { UserRepository } from '../user/repository/user.repository'
import { AccessTokenDTO } from './dto/get-user.dto'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly repo: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async signUp(dto: AuthDTO): Promise<{ user: User; msg: string }> {
    try {
      const { name } = dto

      if (await this.repo.checkIfNameExists(name))
        throw new HttpException(
          'Esse nome já está em uso!',
          HttpStatus.BAD_REQUEST
        )

      const user = await this.repo.signUp(dto)

      return { user, msg: 'Usuário cadastrado com sucesso!' }
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus())
      }
      throw new HttpException('Erro ao se cadastrar!', HttpStatus.UNAUTHORIZED)
    }
  }

  async signIn(dto: SignInDTO): Promise<AccessTokenDTO> {
    try {
      const user = await this.repo.validatePassword(dto)

      if (!user)
        throw new HttpException(
          'Credenciais invalidas!',
          HttpStatus.UNAUTHORIZED
        )

      const payload: JwtPayload = {
        id: user.id,
        name: user.name
      }

      const accessToken = this.jwtService.sign(payload)
      const accessTokenDTO: AccessTokenDTO = {
        accessToken: accessToken,
        user: {
          id: user.id,
          name: user.name
        }
      }

      return accessTokenDTO
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException({ message: error.message }, error.getStatus())
      }
      throw new HttpException('Erro ao fazer login!', HttpStatus.UNAUTHORIZED)
    }
  }
}
