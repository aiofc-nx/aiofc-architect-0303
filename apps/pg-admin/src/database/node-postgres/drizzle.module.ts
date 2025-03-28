import { ConfigService, getDatabaseConfig } from '@aiofc/config';
import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { PgTablesSchema } from '../schemas';

import { DrizzleLoggingService } from './drizzle-logging.service';

export const PG_DATABASE_ASYNC = 'PG_DATABASE_ASYNC';
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
@Global()
@Module({
  providers: [
    {
      provide: PG_DATABASE_ASYNC,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = getDatabaseConfig(configService);

        // https://orm.drizzle.team/docs/get-started-postgresql#node-postgres
        const pool = new Pool({
          connectionString: `postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.dbName}`,
        });
        return drizzle(pool, {
          // 在这里把需要操作的数据表Schema放进来，一般我们会把需要用到的表都放进来
          // 其实，你不放进去也是可以操作的，放进来可以获得更好的类型提示
          schema: PgTablesSchema,
          logger: new DrizzleLoggingService(),
        });
      },
    },
  ],
  exports: [PG_DATABASE_ASYNC],
})
export class DrizzleModule {}
