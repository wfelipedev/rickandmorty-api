import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EpisodeRepository } from './repository/episode.repository'

@Module({
  imports: [TypeOrmModule.forFeature([EpisodeRepository])]
})
export class EpidodeModule {}
