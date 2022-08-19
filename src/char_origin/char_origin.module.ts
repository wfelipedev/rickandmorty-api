import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CharOriginRepository } from './repository/char_origin.repository'

@Module({
  imports: [TypeOrmModule.forFeature([CharOriginRepository])]
})
export class CharOriginModule {}
