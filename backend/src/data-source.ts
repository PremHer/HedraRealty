import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

import { CompanyEntity } from "./modules/companies/entities/company.entity";
import { ProjectEntity } from "./modules/projects/entities/project.entity";
import { BlockEntity } from "./modules/blocks/entities/block.entity";
import { LotEntity } from "./modules/lots/entities/lot.entity";
import { FinancingPlanEntity } from "./modules/finance/entities/financing-plan.entity";
import { CashflowEntryEntity } from "./modules/finance/entities/cashflow-entry.entity";
import { ContractTemplateEntity } from "./modules/contracts/entities/contract-template.entity";
import { GeneratedContractEntity } from "./modules/contracts/entities/generated-contract.entity";

const sslEnabled = (process.env.DB_SSL ?? "false").toLowerCase() === "true";
const loggingEnabled = (process.env.DB_LOGGING ?? "false").toLowerCase() === "true";

const baseOptions = {
  type: "postgres" as const,
  synchronize: false,
  migrations: ["dist/migrations/*.js", "src/migrations/*.ts"],
  entities: [
    CompanyEntity,
    ProjectEntity,
    BlockEntity,
    LotEntity,
    FinancingPlanEntity,
    CashflowEntryEntity,
    ContractTemplateEntity,
    GeneratedContractEntity
  ],
  logging: loggingEnabled,
  ssl: sslEnabled ? { rejectUnauthorized: false } : undefined
};

const dataSource = new DataSource(
  process.env.DATABASE_URL
    ? {
        ...baseOptions,
        url: process.env.DATABASE_URL
      }
    : {
        ...baseOptions,
        host: process.env.DB_HOST ?? "localhost",
        port: Number(process.env.DB_PORT ?? 5432),
        username: process.env.DB_USER ?? "postgres",
        password: process.env.DB_PASSWORD ?? "postgres",
        database: process.env.DB_NAME ?? "hedra_realty"
      }
);

export default dataSource;
