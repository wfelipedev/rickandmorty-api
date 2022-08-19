import { EntityRepository, Repository } from 'typeorm'
import { CreateOriginDTO } from '../dto/create-origin.dto'
import { CharOrigin } from '../entity/char_origin.entity'

@EntityRepository(CharOrigin)
export class CharOriginRepository extends Repository<CharOrigin> {
  async persistOrigin(dto: CreateOriginDTO): Promise<CharOrigin> {
    const entity = this.create(dto)

    return this.save(entity)
  }

  async getOriginsById(id: String): Promise<CharOrigin> {
    const originFound = await this.findOne({ where: { id } })

    return originFound
  }
}
