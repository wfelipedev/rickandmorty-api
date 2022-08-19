import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetUser } from '../../auth/get-user.decorator'
import AuthGuard from '../../auth/guards/jwt-auth.guard'
import { User } from '../../user/entity/user.entity'
import { CreateFavoriteDTO } from '../dto/create-favorite.dto'
import { FavoriteCharService } from '../favorite_char.service'

@ApiTags('Favorite Character')
@UseGuards(AuthGuard)
@Controller('favorite-char')
export class FavoriteCharController {
  constructor(private readonly service: FavoriteCharService) {}

  @ApiOperation({ summary: 'Favoritar Personagem' })
  @ApiResponse({
    status: 201,
    description: 'Recurso utilizado para cadastrar-se no sistema.',
    schema: { example: { msg: 'Personagem favoritado com sucesso!' } }
  })
  @ApiResponse({
    status: 400,
    description:
      'Erro disparado quando o personagem já existe na lista de favoritos.',
    schema: {
      example: { message: 'Esse personagem já está em sua lista de favoritos!' }
    }
  })
  @ApiResponse({
    status: 500,
    description:
      'Erro disparado quando alguma excessão é disparada e não foi tradada.',
    schema: {
      example: { message: 'Erro interno ao tentar salvar favorito!' }
    }
  })
  @Post()
  async persitFavorite(
    @Body() dto: CreateFavoriteDTO,
    @GetUser() user: User
  ): Promise<{ msg: string }> {
    return this.service.persistFavorite(dto, user)
  }

  @ApiOperation({ summary: 'Remover Personagem da lista de Favoritos' })
  @ApiResponse({
    status: 201,
    description:
      'Recurso utilizado para remover personagem da lista de favoritos.',
    schema: { example: { msg: 'Personagem removido com sucesso!' } }
  })
  @ApiResponse({
    status: 404,
    description:
      'Erro disparado quando o personagem não é encontrado na base de dados.',
    schema: {
      example: { message: 'Erro ao buscar personagem favorito!' }
    }
  })
  @ApiResponse({
    status: 500,
    description:
      'Erro disparado quando alguma excessão é disparada e não foi tradada.',
    schema: {
      example: { message: 'Erro interno ao tentar remover dos favoritos!' }
    }
  })
  @Delete(':id/delete')
  async deleteFavorite(@Param('id') id: string): Promise<{ msg: string }> {
    return this.service.deleteFavorite(id)
  }
}
