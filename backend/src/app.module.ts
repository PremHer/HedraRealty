import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import databaseConfig, { DatabaseConfig } from './config/database.config';
import { BlocksModule } from './modules/blocks/blocks.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { FinanceModule } from './modules/finance/finance.module';
import { LotsModule } from './modules/lots/lots.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env.local', '.env'],
      load: [databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const dbConfig = configService.get<DatabaseConfig>('database');

        if (!dbConfig) {
          throw new Error('Database configuration is missing');
        }

        const sslOptions = dbConfig.ssl ? { ssl: { rejectUnauthorized: false } } : {};
        const baseConfig: TypeOrmModuleOptions = {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: dbConfig.synchronize,
          logging: dbConfig.logging,
          ...sslOptions
        };

        if (dbConfig.url) {
          return {
            ...baseConfig,
            url: dbConfig.url
          };
        }

        return {
          ...baseConfig,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name
        };
      }
    }),
    CompaniesModule,
    ProjectsModule,
    BlocksModule,
    LotsModule,
    FinanceModule,
    ContractsModule
  ]
})
export class AppModule {}
