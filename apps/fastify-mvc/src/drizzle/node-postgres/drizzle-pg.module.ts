import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { EntitiesSchema } from '../schemas';

import { PG_CONNECTION } from './constant';
import { DatabaseConfig } from './database.config';
import { DrizzleLoggerService } from './drizzle-logger.service';
/**
 * Module responsible to create the connection pool to the database.
 */
@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [DatabaseConfig],
      useFactory: async (databaseConfig: DatabaseConfig) => {
        // https://orm.drizzle.team/docs/get-started-postgresql#node-postgres
        const pool = new Pool({
          connectionString: databaseConfig.postgresqlConnection,
        });
        return drizzle(pool, {
          schema: EntitiesSchema,
          logger: new DrizzleLoggerService(),
        });
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzlePgModule {}
