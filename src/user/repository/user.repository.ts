import { EntityRepository, Repository } from 'typeorm'
import { AuthDTO } from '../../auth/dto/auth.dto'
import { SignInDTO } from '../../auth/dto/signin.dto'
import { User } from '../entity/user.entity'
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(dto: AuthDTO): Promise<User> {
    const user = this.create(dto)

    user.salt = await bcrypt.genSalt()
    user.password = await this.hashPassword(dto.password, user.salt)

    await this.save(user)
    return user
  }

  async getUserById(id: string): Promise<User> {
    const user_found = await this.findOne(id)

    return user_found
  }

  async validatePassword(dto: SignInDTO): Promise<User> {
    const { name, password } = dto
    const userFound = await this.findOne({ where: { name } })

    if (userFound && (await userFound.validatePassword(password)))
      return userFound
    else return null
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }

  generateUsernameAndPassword(length): string {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  async resetPassword(password: string, user: User): Promise<boolean> {
    user.salt = await bcrypt.genSalt()
    user.password = await this.hashPassword(password, user.salt)
    return this.save(user) ? true : false
  }

  async checkIfNameExists(name: string): Promise<boolean> {
    const nameFound = await this.findOne({ where: { name } })
    return !!nameFound
  }
}
