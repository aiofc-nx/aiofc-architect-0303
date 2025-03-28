/* eslint-disable @typescript-eslint/no-explicit-any */
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const createTrackedTable = <T extends Record<string, any>>(
  /** 要创建的表名 */
  tableName: string,
  /** 要添加到基础字段之外的额外列定义 */
  columns: T = {} as T,
) => {
  return pgTable(tableName, {
    id: uuid('id').primaryKey().defaultRandom(),
    tenantId: uuid('tenant_id').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    deletedAt: timestamp('deleted_at'),
    ...columns,
  });
};
