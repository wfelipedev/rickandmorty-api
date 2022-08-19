import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CharLocation } from '../../char_location/entity/char_location.entity'
import { CharOrigin } from '../../char_origin/entity/char_origin.entity'

@ObjectType('favorite')
@Entity('favorites')
export class FavoriteChar {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  char_id: number

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  status: string

  @Field()
  @Column()
  species: string

  @Field()
  @Column()
  type: string

  @Field()
  @Column()
  gender: string

  @Field()
  @Column()
  origin_id: string

  @Field()
  origin?: CharOrigin

  @Field()
  @Column()
  location_id: string

  @Field()
  location?: CharLocation

  @Field()
  @Column()
  user_id: string

  @Field()
  @Column()
  image: string

  @Field()
  @Column()
  url: string

  @Field()
  @Column()
  created: string

  @Field()
  @Column({ type: 'timestamp', nullable: false })
  created_at?: Date

  @Field()
  @Column({ type: 'timestamp', nullable: false })
  updated_at?: Date

  @Field()
  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date
}
