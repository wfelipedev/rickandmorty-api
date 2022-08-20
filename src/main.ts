import { ClassSerializerInterceptor, Logger } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const globalPrefix = 'api/v1'

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.setGlobalPrefix(globalPrefix)

  const config = new DocumentBuilder()
    .setTitle('Rick and Morty | Favorite Characters')
    .setDescription('API - Save all your favorite characters')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = 3333

  await app.listen(port, () => {
    Logger.log(`REST API on http://localhost:${port}/${globalPrefix}`)
    Logger.log(`Graphql on http://localhost:${port}/graphql`)
  })
}
bootstrap()
