/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PgTable } from 'drizzle-orm/pg-core';

import { PG_CONNECTION } from '../node-postgres/constant';

export class AbstractDao<
  /**
   * (type parameter) TSchema in NodePgDatabase<TSchema extends Record<string, unknown> = Record<string, never>>
   */
  TSchema extends Record<string, unknown>,
  /**
   * 指定您的表，子查询或其他目标
   * 建立选择的查询。
   *
   * {@link https://www.postgresql.org/docs/current/sql-select.html#SQL-FROM | Postgres from documentation}
   */
  TFrom extends PgTable,
> {
  constructor(
    @Inject(PG_CONNECTION) protected readonly db: NodePgDatabase<TSchema>,
    private readonly table: TFrom,
  ) {}

  async getAll() {
    return this.db.select().from(this.table as PgTable);
  }

  async getById(id: string, fieldsToSelect?: (keyof TFrom)[]) {
    const selectedFields = this.selectFields(fieldsToSelect);
    return this.db
      .select(selectedFields as any)
      .from(this.table as PgTable)
      .where(eq(this.table['id' as keyof TFrom] as PgTable, id));
  }

  async getOneById(id: string, fieldsToSelect?: (keyof TFrom)[]) {
    const res = await this.getById(id, fieldsToSelect);
    return res && res.length > 0 ? res[0] : null;
  }

  async getBySingleKey(
    key: keyof TFrom,
    value: any,
    fieldsToSelect?: (keyof TFrom)[],
  ) {
    const selectedFields = this.selectFields(fieldsToSelect);
    return await this.db
      .select(selectedFields as any)
      .from(this.table as PgTable)
      .where(eq(this.table[key as any] as PgTable, value))
      .execute();
  }

  async getOneBySingleKey(
    key: keyof TFrom,
    value: any,
    fieldsToSelect?: (keyof TFrom)[],
  ) {
    const bySingleKey = await this.getBySingleKey(key, value, fieldsToSelect);
    return bySingleKey && bySingleKey.length > 0 ? bySingleKey.at(-1) : null;
  }

  async insertNewRecord(table: any) {
    const insertedRows = await this.db
      .insert(this.table)
      .values(table)
      .returning()
      .execute();

    return Array.isArray(insertedRows) && insertedRows.length === 1
      ? insertedRows.at(-1)
      : null;
  }

  async deleteById(id: string) {
    return this.db
      .delete(this.table)
      .where(eq(this.table['id' as keyof TFrom] as PgTable, id))
      .returning()
      .execute();
  }

  async updateById(id: string, fieldsToUpdate: any) {
    return await this.db
      .update(this.table)
      .set(fieldsToUpdate)
      .where(eq(this.table['id' as keyof TFrom] as PgTable, id))
      .returning()
      .execute();
  }

  async deleteAll() {
    return this.db.delete(this.table).returning().execute();
  }

  private selectFields(fieldsToSelect?: (keyof TFrom)[]) {
    if (!fieldsToSelect) {
      return undefined;
    }
    return fieldsToSelect.reduce(
      (acc, fieldToSelect) => {
        acc[fieldToSelect as string] = this.table[fieldToSelect];
        return acc;
      },
      {} as Record<string, unknown>,
    );
  }
}
