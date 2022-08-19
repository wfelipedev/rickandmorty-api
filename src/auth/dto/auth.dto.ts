import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'

export class AuthDTO {
  @ApiProperty({
    description: 'Nome do Usuário para Acessar sistema',
    example: 'Felipe',
  })
  @IsString({ message: 'O campo nome deve conter apenas texto!' })
  @IsNotEmpty({ message: 'O campo nome é obrigatorio!' })
  name: string

  @ApiProperty({
    description: 'Senha para Acessar Sistema',
    example: 'StrongPassword123!!'
  })
  @IsString({ message: 'O campo senha deve apenas ser texto!' })
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha informada não segue o padrão estabelecido para as senhas.'
  })
  password: string
}
