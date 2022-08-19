import { ApiProperty } from '@nestjs/swagger'

class User {
  @ApiProperty({ example: '7dc497a0-0c2b-4a11-8cde-6e731983dafb' })
  id: string

  @ApiProperty({ example: 'Felipe' })
  name: string

  @ApiProperty({ example: null })
  deleted_at: string
}

export class SignupExample {
  @ApiProperty({
    example: 'Usuário cadastrado com sucesso!'
  })
  msg: string

  @ApiProperty()
  user: User
}
