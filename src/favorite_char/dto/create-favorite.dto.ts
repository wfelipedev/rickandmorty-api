import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

class OriginDTO {
  name: string
  url: string
}

class LocationDTO {
  name: string
  url: string
}

export class CreateFavoriteDTO {
  @ApiProperty({
    description: 'Id do Personagem vindo da API',
    example: 1
  })
  @IsNumber(
    {},
    { message: 'O campo Id do personagem deve conter apenas digitos!' }
  )
  @IsNotEmpty({ message: 'O campo Id do personagem é obrigatório!' })
  char_id: number

  @ApiProperty({
    description: 'Nome do Personagem vindo da API',
    example: 'Rick Sanchez'
  })
  @IsString({ message: 'O campo nome deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório!' })
  name: string

  @ApiProperty({
    description: 'Status do Personagem vindo da API',
    example: 'Alive'
  })
  @IsString({ message: 'O campo status deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo status é obrigatório!' })
  status: string

  @ApiProperty({
    description: 'Especie do Personagem vindo da API',
    example: 'Human'
  })
  @IsString({ message: 'O campo especie deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo especie é obrigatório!' })
  species: string

  @ApiProperty({
    description: 'Tipo do Personagem vindo da API',
    example: ''
  })
  @IsString({ message: 'O campo tipo deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo tipo é obrigatório!' })
  type: string

  @ApiProperty({
    description: 'Gênero do Personagem vindo da API',
    example: 'Male'
  })
  @IsString({ message: 'O campo gênero deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo gênero é obrigatório!' })
  gender: string

  @ApiProperty({
    description: 'Origem do Personagem vindo da API',
    example: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/12'
    }
  })
  @IsNotEmpty({ message: 'O campo nome do usuário é obrigatório!' })
  origin: OriginDTO

  @ApiProperty({
    description: 'Localização do Personagem vindo da API',
    example: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3'
    }
  })
  @IsNotEmpty({ message: 'O campo nome do usuário é obrigatório!' })
  location: LocationDTO

  @ApiProperty({
    description: 'Imagem do Personagem vindo da API',
    example: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
  })
  @IsString({ message: 'O campo imagem deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo imagem é obrigatório!' })
  image: string

  @ApiProperty({
    description: 'Episodios em que o Personagem aparece vindo da API',
    example: ['https://rickandmortyapi.com/api/episode/1']
  })
  @IsString({
    each: true,
    message: 'O campo episodios deve conter apenas texto!'
  })
  @IsArray({ message: 'Campo episodios deve ser um array.' })
  @IsNotEmpty({ message: 'O campo episodios é obrigatório!' })
  episodes: string[]

  @ApiProperty({
    description: 'URL do Personagem vindo da API',
    example: 'https://rickandmortyapi.com/api/character/1'
  })
  @IsString({ message: 'O campo url deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo url é obrigatório!' })
  url: string

  @ApiProperty({
    description: 'Data de criação do Personagem vindo da API',
    example: '2017-11-04T18:48:46.250Z'
  })
  @IsString({ message: 'O campo data de criação deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo data de criação é obrigatório!' })
  created: string

  @ApiProperty({
    description: 'Dados salvos da Origem do Personagem',
    example: 'e30bade0-7bb8-4f31-b110-1fd8d26f9ab7'
  })
  @IsString({ message: 'O campo data de criação deve conter apenas texto!' })
  @IsOptional()
  origin_id?: string

  @ApiProperty({
    description: 'Dados salvos da Localização do Personagem',
    example: '3ee950e8-c308-4b58-a22e-4679fb246d4e'
  })
  @IsString({ message: 'O campo data de criação deve conter apenas texto!' })
  @IsOptional()
  location_id?: string
}
