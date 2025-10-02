import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContractsController } from './contracts.controller';
import { ContractsService } from './contracts.service';
import { ContractTemplateEntity } from './entities/contract-template.entity';
import { GeneratedContractEntity } from './entities/generated-contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractTemplateEntity, GeneratedContractEntity])],
  controllers: [ContractsController],
  providers: [ContractsService],
  exports: [ContractsService]
})
export class ContractsModule {}
