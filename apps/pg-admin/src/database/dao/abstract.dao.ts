// // apps/pg-admin/src/database/dao/book.repository.ts
// import { Inject, Injectable } from '@nestjs/common';
// import { eq } from 'drizzle-orm';
// import { NodePgDatabase } from 'drizzle-orm/node-postgres';
// import { PgTable } from 'drizzle-orm/pg-core';

// import { PG_DATABASE_ASYNC } from '../node-postgres/drizzle.module';

// @Injectable()
// export class BaseRepository<
//   Table extends PgTable,
//   EntitySelected,
//   EntityInsert,
// > {
//   constructor(
//     @Inject(PG_DATABASE_ASYNC)
//     private readonly db: NodePgDatabase,
//     private readonly table: Table,
//     private readonly select: EntitySelected,
//     private readonly insert: EntityInsert,
//   ) {}

//   async create(data: EntitySelected): Promise<EntitySelected> {
//     const [result] = await this.db.insert(this.table).values(data).returning();
//     return result;
//   }

//   async findAll(): Promise<EntitySelected[]> {
//     return await this.db.select().from(this.table);
//   }

//   async findById(id: number): Promise<EntitySelected | null> {
//     const [result] = await this.db
//       .select()
//       .from(this.table)
//       .where(eq(this.table.id, id));
//     return result || null;
//   }

//   async update(
//     id: number,
//     data: Partial<EntityInsert>,
//   ): Promise<EntitySelected | null> {
//     const [result] = await this.db
//       .update(this.table)
//       .set(data)
//       .where(eq(this.table.id, id))
//       .returning();
//     return result || null;
//   }

//   async delete(id: number): Promise<void> {
//     await this.db.delete(this.table).where(eq(this.table.id, id));
//   }
// }
