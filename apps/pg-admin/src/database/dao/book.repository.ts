// apps/pg-admin/src/database/dao/book.repository.ts
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { PG_DATABASE_ASYNC } from '../node-postgres/drizzle.module';
import { booksTable } from '../schemas/tables/book.table';

type BookSelect = typeof booksTable.$inferSelect; // 用于查询时的类型
type BookInsert = typeof booksTable.$inferInsert; // 用于插入时的类型

@Injectable()
export class BookRepository {
  constructor(
    @Inject(PG_DATABASE_ASYNC)
    private readonly db: NodePgDatabase,
  ) {}
  async create(book: BookInsert): Promise<BookSelect> {
    const [result] = await this.db.insert(booksTable).values(book).returning();
    return result;
  }

  async findAll(): Promise<BookSelect[]> {
    return await this.db.select().from(booksTable);
  }

  async findById(id: number): Promise<BookSelect | null> {
    const [result] = await this.db
      .select()
      .from(booksTable)
      .where(eq(booksTable.id, id));
    return result || null;
  }

  async update(
    id: number,
    data: Partial<BookInsert>,
  ): Promise<BookSelect | null> {
    const [result] = await this.db
      .update(booksTable)
      .set(data)
      .where(eq(booksTable.id, id))
      .returning();
    return result || null;
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(booksTable).where(eq(booksTable.id, id));
  }
}
