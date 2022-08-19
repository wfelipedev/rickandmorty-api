import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { UserRepository } from '../user/repository/user.repository'
import { User } from '../user/entity/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly reposiroty: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret'
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload

    const user = await this.reposiroty.findOne({ id })

    if (!user) {
      throw new UnauthorizedException('invalid credentials')
    }

    return user
  }
}
