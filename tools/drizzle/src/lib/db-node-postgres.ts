// tools/drizzle/src/lib/db-node-postgres.ts
import { drizzle } from 'drizzle-orm/node-postgres'; // 使用 node-postgres
import { Pool } from 'pg'; // 导入 node-postgres 的 Pool
import * as schema from '../schemas';
import env from './env';

/**
 * 数据库连接配置
 *
 * 创建一个 PostgreSQL 数据库连接池实例:
 * - 使用环境变量 DATABASE_URL 作为连接字符串
 * - 当进行数据库迁移或数据填充时,将最大连接数限制为1
 * - 在数据填充过程中忽略数据库通知消息
 */
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
  // 其他连接选项可以根据需要添加
});

/**
 * Drizzle ORM 实例化
 *
 * 使用 drizzle-orm 创建数据库操作实例:
 * - 传入上面创建的数据库连接池
 * - 加载预定义的数据库模式(schema)
 * - 启用日志记录功能,方便调试
 */
export const db = drizzle(pool, {
  schema: schema,
  logger: true,
});

/**
 * 类型导出
 *
 * 导出 db 实例的类型定义,用于类型检查和智能提示
 */
export type db = typeof db;

/**
 * 默认导出
 *
 * 将 db 实例作为模块的默认导出
 */
export default db;
