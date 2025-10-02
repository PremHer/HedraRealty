import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LotsController } from './lots.controller';
import { LotsService } from './lots.service';
import { LotEntity } from './entities/lot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LotEntity])],
  controllers: [LotsController],
  providers: [LotsService],
  exports: [LotsService]
})
export class LotsModule {}
