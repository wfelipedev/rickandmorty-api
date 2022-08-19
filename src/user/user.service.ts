import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entity/user.entity'
import { UserRepository } from './repository/user.repository'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async getUserById(user_id: string): Promise<User> {
    try {
      const user_found = await this.userRepository.getUserById(user_id)

      return user_found
    } catch (error) {
      throw new HttpException(
        'Erro interno ao tentar buscar usuário!',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
