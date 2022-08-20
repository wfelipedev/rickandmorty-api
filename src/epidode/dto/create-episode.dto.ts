import { IsNotEmpty, IsString } from 'class-validator'

export class CreateEpisodeDTO {
  @IsString({ message: 'O campo Id do Personagem deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo Id do Personagem é obrigátorio!' })
  character_id: string

  @IsString({ message: 'O campo URL do episódio conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo URL do episódio é obrigátorio!' })
  episode: string
}
