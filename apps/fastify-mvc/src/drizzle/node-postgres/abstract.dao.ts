/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PgTable } from 'drizzle-orm/pg-core';

import { PG_CONNECTION } from './constant';

export class AbstractDao<
  TSchema extends Record<string, unknown>,
  Entity extends PgTable,
> {
  constructor(
    @Inject(PG_CONNECTION) protected readonly db: NodePgDatabase<TSchema>,
    private readonly entity: Entity,
  ) {}

  async getAll() {
    return this.db.select().from(this.entity as PgTable);
  }

  async getById(id: string, fieldsToSelect?: (keyof Entity)[]) {
    const selectedFields = this.selectFields(fieldsToSelect);
    return this.db
      .select(selectedFields as any)
      .from(this.entity as PgTable)
      .where(eq(this.entity['id' as keyof Entity] as PgTable, id));
  }

  async getOneById(id: string, fieldsToSelect?: (keyof Entity)[]) {
    const res = await this.getById(id, fieldsToSelect);
    return res && res.length > 0 ? res[0] : null;
  }

  async getBySingleKey(
    key: keyof Entity,
    value: any,
    fieldsToSelect?: (keyof Entity)[],
  ) {
    const selectedFields = this.selectFields(fieldsToSelect);
    return await this.db
      .select(selectedFields as any)
      .from(this.entity as PgTable)
      .where(eq(this.entity[key as any] as PgTable, value))
      .execute();
  }

  async getOneBySingleKey(
    key: keyof Entity,
    value: any,
    fieldsToSelect?: (keyof Entity)[],
  ) {
    const bySingleKey = await this.getBySingleKey(key, value, fieldsToSelect);
    return bySingleKey && bySingleKey.length > 0 ? bySingleKey.at(-1) : null;
  }

  async insertNewRecord(entity: any) {
    const insertedRows = await this.db
      .insert(this.entity)
      .values(entity)
      .returning()
      .execute();

    return Array.isArray(insertedRows) && insertedRows.length === 1
      ? insertedRows.at(-1)
      : null;
  }

  async deleteById(id: string) {
    return this.db
      .delete(this.entity)
      .where(eq(this.entity['id' as keyof Entity] as PgTable, id))
      .returning()
      .execute();
  }

  async updateById(id: string, fieldsToUpdate: any) {
    return await this.db
      .update(this.entity)
      .set(fieldsToUpdate)
      .where(eq(this.entity['id' as keyof Entity] as PgTable, id))
      .returning()
      .execute();
  }

  async deleteAll() {
    return this.db.delete(this.entity).returning().execute();
  }

  private selectFields(fieldsToSelect?: (keyof Entity)[]) {
    if (!fieldsToSelect) {
      return undefined;
    }
    return fieldsToSelect.reduce(
      (acc, fieldToSelect) => {
        acc[fieldToSelect as string] = this.entity[fieldToSelect];
        return acc;
      },
      {} as Record<string, unknown>,
    );
  }
}
