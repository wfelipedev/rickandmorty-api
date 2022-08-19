import { ApiProperty } from '@nestjs/swagger'

export class CreateOriginDTO {
  @ApiProperty({
    description: 'Nome da Origem do Personagem vindo da API',
    example: 'Earth (C-137)'
  })
  name: string

  @ApiProperty({
    description: 'URL da Origem do do Personagem vindo da API',
    example: 'https://rickandmortyapi.com/api/location/1'
  })
  url: string
}
