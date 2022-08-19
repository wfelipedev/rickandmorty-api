import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'

@Entity('users')
@Unique(['name'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name: string

  @Exclude()
  @Column()
  password: string

  @Exclude()
  @Column()
  salt: string

  @Column({ type: 'timestamp', nullable: false })
  created_at?: Date

  @Column({ type: 'timestamp', nullable: false })
  updated_at?: Date

  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date

  async validatePassword?(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}
