import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignInDTO {
  @ApiProperty({
    description: 'Nome do Usuário para Acessar sistema',
    example: 'Felipe'
  })
  @IsString({ message: 'O campo nome do usuário deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo nome do usuário é obrigatório!' })
  name?: string

  @ApiProperty({
    description: 'Senha para Acessar Sistema',
    example: 'StrongPassword123!!'
  })
  @IsString({ message: 'O campo senha deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo senha é obrigatório' })
  @MinLength(8, {
    message: 'O campo senha deve conter pelo menos 8 caracteres!'
  })
  password: string
}
