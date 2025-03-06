import { text } from 'drizzle-orm/pg-core';

import { createTrackedTable } from '../../helpers/base.schema';

export const jobTable = createTrackedTable('jobs', {
  name: text('name').notNull(),
});

export type Job = typeof jobTable.$inferSelect;
export type NewJob = typeof jobTable.$inferInsert;
