import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { SignInDTO } from '../dto/signin.dto'
import { AuthDTO } from '../dto/auth.dto'
import { User } from '../../user/entity/user.entity'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SignupExample } from '../examples/signup.example'
import { SigninExample } from '../examples/signin.example'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiOperation({ summary: 'Cadastrar-se no Sistema' })
  @ApiResponse({
    status: 201,
    description: 'Recurso utilizado para cadastrar-se no sistema.',
    type: SignupExample
  })
  @ApiResponse({
    status: 500,
    description:
      'Erro disparado quando alguma excessão é disparada e não foi tradada.',
    schema: {
      example: { message: 'Erro ao se cadastrar!' }
    }
  })
  @Post('signup')
  signUp(
    @Body(ValidationPipe) dto: AuthDTO
  ): Promise<{ user: User; msg: string }> {
    return this.service.signUp(dto)
  }

  @ApiOperation({ summary: 'Entrar no Sistema' })
  @ApiResponse({
    status: 200,
    description: 'Recurso utilizado para entrar no sistema.',
    type: SigninExample
  })
  @ApiResponse({
    status: 500,
    description:
      'Erro disparado quando alguma excessão é disparada e não foi tradada.',
    schema: {
      example: { message: 'Erro ao fazer login!' }
    }
  })
  @Post('signin')
  signIn(
    @Body(ValidationPipe) dto: SignInDTO
  ): Promise<{ accessToken: string }> {
    return this.service.signIn(dto)
  }
}
