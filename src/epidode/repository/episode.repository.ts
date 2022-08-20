import { EntityRepository, Repository } from 'typeorm'
import { CreateEpisodeDTO } from '../dto/create-episode.dto'
import { Episode } from '../entity/episode.entity'

@EntityRepository(Episode)
export class EpisodeRepository extends Repository<Episode> {
  async persistEpisode(dto: CreateEpisodeDTO): Promise<Episode> {
    const entity = this.create(dto)

    return this.save(entity)
  }

  async getEpisodeByCharId(id: string): Promise<Episode[]> {
    const entitiesFound = await this.find({ where: { character_id: id } })

    return entitiesFound
  }
}
