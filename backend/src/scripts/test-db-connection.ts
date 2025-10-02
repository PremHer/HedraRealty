import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import AppDataSource from "../data-source";

async function main(): Promise<void> {
  try {
    const dataSource = await AppDataSource.initialize();
    const options = dataSource.options as PostgresConnectionOptions;

    console.log("Conexion exitosa a la base de datos:", {
      type: options.type,
      database: options.database ?? options.url,
      host: options.host ?? "(usando DATABASE_URL)",
      port: options.port
    });

    await dataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error("No fue posible conectar a la base de datos", error);
    process.exit(1);
  }
}

void main();
