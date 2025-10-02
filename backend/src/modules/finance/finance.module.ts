import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { CashflowEntryEntity } from './entities/cashflow-entry.entity';
import { FinancingPlanEntity } from './entities/financing-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinancingPlanEntity, CashflowEntryEntity])],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [FinanceService]
})
export class FinanceModule {}
