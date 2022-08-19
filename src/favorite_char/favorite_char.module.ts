import { Module } from '@nestjs/common'
import { FavoriteCharService } from './favorite_char.service'
import { FavoriteCharController } from './controller/favorite_char.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FavoriteCharRepository } from './repository/favorite_char.repository'
import { CharOriginRepository } from '../char_origin/repository/char_origin.repository'
import { CharLocationRepository } from '../char_location/repository/char_location.repository'
import { FavoriteCharResolver } from './favorite_char.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteCharRepository,
      CharOriginRepository,
      CharLocationRepository
    ])
  ],
  providers: [FavoriteCharService, FavoriteCharResolver],
  controllers: [FavoriteCharController]
})
export class FavoriteCharModule {}
