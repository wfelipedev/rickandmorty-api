import { EntityRepository, Repository } from 'typeorm'
import { CreateLocationDTO } from '../dto/create-location.dto'
import { CharLocation } from '../entity/char_location.entity'

@EntityRepository(CharLocation)
export class CharLocationRepository extends Repository<CharLocation> {
  async persistLocation(dto: CreateLocationDTO): Promise<CharLocation> {
    const entity = this.create(dto)

    return this.save(entity)
  }

  async getLocationById(id: string): Promise<CharLocation> {
    const locationFound = await this.findOne({ where: { id } })

    return locationFound
  }
}
