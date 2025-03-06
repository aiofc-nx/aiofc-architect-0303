import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { PG_CONNECTION } from '../../node-postgres/constant';
import { AbstractDao } from '../../persisted/abstract.dao';

import * as jobsSchema from './job.table';
import { jobTable } from './job.table';

@Injectable()
export class JobDao extends AbstractDao<typeof jobsSchema, typeof jobTable> {
  constructor(
    @Inject(PG_CONNECTION)
    protected readonly db: NodePgDatabase<typeof jobsSchema>,
  ) {
    super(db, jobTable);
  }
}
