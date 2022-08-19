import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType('origin')
@Entity('origins')
export class CharOrigin {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field({ nullable: true })
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
