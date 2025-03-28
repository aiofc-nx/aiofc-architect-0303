import { Module } from '@nestjs/common';

import { DrizzleModule } from '../../database/node-postgres/drizzle.module';

import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [DrizzleModule],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
