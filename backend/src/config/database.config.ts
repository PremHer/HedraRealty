import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  url?: string;
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  synchronize: boolean;
  logging: boolean;
  ssl: boolean;
}

export default registerAs<DatabaseConfig>('database', () => ({
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  name: process.env.DB_NAME ?? 'hedra_realty',
  synchronize: (process.env.DB_SYNCHRONIZE ?? 'false').toLowerCase() === 'true',
  logging: (process.env.DB_LOGGING ?? 'false').toLowerCase() === 'true',
  ssl: (process.env.DB_SSL ?? 'false').toLowerCase() === 'true'
}));
