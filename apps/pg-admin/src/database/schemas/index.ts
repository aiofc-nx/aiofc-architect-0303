import { booksTable } from './tables/book.table';
import { jobsTable } from './tables/job.table';
import { tenantsTable } from './tables/tenant.table';
import { usersTable } from './tables/user.table';

export * from './lib/base.schema';
export * from './tables/book.table';
export * from './tables/job.table';
export * from './tables/tenant.table';
export * from './tables/user.table';
export const PgTablesSchema = {
  ...jobsTable,
  ...tenantsTable,
  ...usersTable,
  ...booksTable,
};
