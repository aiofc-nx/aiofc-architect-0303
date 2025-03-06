import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { PgTablesSchema } from '../schemas';

import { PG_CONNECTION } from './constant';
import { DatabaseConfig } from './database.config';
import { DrizzleLoggingService } from './drizzle-logging.service';
/**
 * 负责创建到数据库的连接池的模块。
 *
 * 这个模块定义了一个 NestJS 模块，用于创建和提供一个连接池到 PostgreSQL 数据库。
 *
 * 同时，还使用 Drizzle-Logger 构建了一个服务来记录日志。
 *
 * 注意：这个模块并没有维护操作数据库的客户端，操作数据库是需要使用者自行维护。
 *
 *
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
          // 需要使用的全部数据表Schema
          schema: PgTablesSchema,
          logger: new DrizzleLoggingService(),
        });
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzlePgModule {}
