import { jobTable } from './job/job.table';
import { tenantTable } from './tenant/tenant.table';
import { userTable } from './user/user.table';

export const PgTablesSchema = {
  ...jobTable,
  ...tenantTable,
  ...userTable,
};
