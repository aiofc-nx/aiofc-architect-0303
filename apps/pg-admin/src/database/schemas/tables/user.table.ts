import { relations } from 'drizzle-orm';
import { text, varchar, timestamp } from 'drizzle-orm/pg-core';

import { createTrackedTable } from '../lib/base.schema';
import { tenantsTable } from './tenant.table';

/**
 * 用户表 schema 定义
 * 继承自多租户基础表结构
 * @see createTrackedTable
 */
export const usersTable = createTrackedTable('users', {
  /** 用户名：用于登录的唯一标识符 */
  username: varchar('username', { length: 50 }).notNull().unique(),

  /** 密码：加密存储的密码 */
  password: text('password').notNull(),

  /** 显示名称：用户的显示名称 */
  display_name: varchar('display_name', { length: 100 }).notNull(),

  /** 邮箱：用户的邮箱地址，用于通知和找回密码 */
  email: varchar('email', { length: 255 }).notNull().unique(),

  /** 手机号：用户的手机号，用于通知和验证 */
  phone: varchar('phone', { length: 20 }).unique(),

  /** 头像：用户头像的URL */
  avatar: text('avatar'),

  /** 状态：用户的当前状态 */
  status: varchar('status', { length: 20 }).notNull().default('pending'),

  /** 最后登录时间 */
  last_login_at: timestamp('last_login_at', { withTimezone: true }),

  /** 最后登录IP */
  last_login_ip: varchar('last_login_ip', { length: 50 }),

  /** 部门ID：关联到部门表（如果需要的话） */
  department_id: varchar('department_id', { length: 36 }),

  /** 职位：用户的职位 */
  position: varchar('position', { length: 100 }),

  /** 备注 */
  remarks: text('remarks'),
});

// 定义与租户表的关系
export const userRelations = relations(usersTable, ({ one }) => ({
  tenant: one(tenantsTable, {
    fields: [usersTable.tenantId],
    references: [tenantsTable.id],
  }),
}));

/** 用户表记录类型 - 用于查询结果类型推断 */
export type User = typeof usersTable.$inferSelect;
/** 新用户数据类型 - 用于插入数据时的类型推断 */
export type NewUser = typeof usersTable.$inferInsert;

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  LOCKED = 'locked',
}
