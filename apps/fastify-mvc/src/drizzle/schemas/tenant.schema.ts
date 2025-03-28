import { relations } from 'drizzle-orm';
import { text, varchar } from 'drizzle-orm/pg-core';

import { createTrackedTable } from '../shared/base.schema';
import { TenantStatus, TenantCategory } from '../shared/enums/tenant.enum';

import { userTable } from './user.schema';

export const tenantTable = createTrackedTable('tenant', {
  // 租户名称：用于显示和识别租户的友好名称
  // 例如：'Acme Corporation', 'Tech Solutions Ltd'
  name: text('name').notNull(),
  // 租户数据库标识：用于标识租户使用的数据库
  database: varchar('database', { length: 50 }).notNull(),

  // 租户Schema：租户在数据库中使用的Schema名称
  // 例如：'t_acme', 't_techsol'
  // 用于数据库多租户隔离，必须以't_'开头
  schema: text('schema').notNull().unique(),

  // 租户描述：可选的额外信息
  // 用于存储租户的详细信息、备注等
  description: text('description'),

  // 租户状态：表示租户当前的状态
  status: varchar('status', { length: 20 })
    .notNull()
    .default(TenantStatus.ACTIVE),

  // 租户组织机构代码：统一社会信用代码或其他组织机构代码
  organization_code: varchar('organization_code', { length: 50 }).unique(),

  // 租户组织机构名称：组织的正式名称
  organization_name: text('organization_name'),

  // 租户分类：租户所属的分类
  category: varchar('category', { length: 20 })
    .notNull()
    .default(TenantCategory.OTHER),
});

export type Tenant = typeof tenantTable.$inferSelect;
export type NewTenant = typeof tenantTable.$inferInsert;

// 定义与用户表的关系
export const tenantRelations = relations(tenantTable, ({ many }) => ({
  users: many(userTable),
}));
