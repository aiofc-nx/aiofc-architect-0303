import { z } from 'zod';

// 定义 Database 配置的校验规则
export const databaseZodSchema = z.object({
  user: z.coerce.string().min(1), // 数据库用户名
  password: z.coerce.string().min(1), // 数据库密码
  host: z.coerce.string().min(1), // 数据库主机地址
  port: z.coerce.number().default(5432),
  dbName: z.coerce.string().min(1), // 数据库名称
  schemaName: z.coerce.string().min(1), // 数据库模式名称
});
export type IDatabaseConfig = z.infer<typeof databaseZodSchema>;
