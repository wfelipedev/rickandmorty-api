import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType('episode')
@Entity('episodes')
export class Episode {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  character_id: string

  @Field()
  @Column()
  episode: string

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
