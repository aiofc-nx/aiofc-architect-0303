// apps/pg-admin/src/drizzle/schemas/book.table.ts
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

// 定义书籍表
export const booksTable = pgTable('books', {
  id: serial('id').primaryKey(), // 自增的主键
  name: text('name').notNull(), // 书名，不能为空
});
