import { ApiProperty } from '@nestjs/swagger'

export class CreateLocationDTO {
  @ApiProperty({
    description: 'Nome da Localização do Personagem vindo da API',
    example: 'Citadel of Ricks'
  })
  name: string

  @ApiProperty({
    description: 'URL da Localização do Personagem vindo da API',
    example: 'https://rickandmortyapi.com/api/location/3'
  })
  url: string
}
