import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType('location')
@Entity('locations')
export class CharLocation {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  url: string

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
