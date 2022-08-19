import { Module } from '@nestjs/common'
import { CharLocationController } from './char_location.controller';

@Module({
  controllers: [CharLocationController]
})
export class CharLocationModule {}
