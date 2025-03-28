import { text } from 'drizzle-orm/pg-core';

import { createTrackedTable } from '../lib/base.schema';

export const jobsTable = createTrackedTable('jobs', {
  name: text('name').notNull(),
});

export type Job = typeof jobsTable.$inferSelect;
export type NewJob = typeof jobsTable.$inferInsert;
