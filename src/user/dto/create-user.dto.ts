import { IsString, IsOptional } from 'class-validator'

export class CreateUserDTO {
  @IsString({ message: 'O campo email deve conter apenas texto!' })
  @IsOptional()
  email?: string
}
