import { Module } from '@nestjs/common';

import { BlocksModule } from './modules/blocks/blocks.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { FinanceModule } from './modules/finance/finance.module';
import { LotsModule } from './modules/lots/lots.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    CompaniesModule,
    ProjectsModule,
    BlocksModule,
    LotsModule,
    FinanceModule,
    ContractsModule
  ]
})
export class AppModule {}
