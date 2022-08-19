import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './controller/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './repository/user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
