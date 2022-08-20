import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { typeOrmConfig } from './config/typeorm.config'
import { UserModule } from './user/user.module'
import { FavoriteCharModule } from './favorite_char/favorite_char.module'
import { CharOriginModule } from './char_origin/char_origin.module'
import { CharLocationModule } from './char_location/char_location.module'
import { graphqlConfig } from './config/graphql.config'
import { GraphQLModule } from '@nestjs/graphql'
import { EpidodeModule } from './epidode/epidode.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot(graphqlConfig),
    AuthModule,
    UserModule,
    FavoriteCharModule,
    CharOriginModule,
    CharLocationModule,
    EpidodeModule
  ]
})
export class AppModule {}
