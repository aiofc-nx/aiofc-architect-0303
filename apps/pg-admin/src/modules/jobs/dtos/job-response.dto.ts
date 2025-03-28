import { Job } from '../../../database/schemas/tables/job.table';

export class JobResponseDto implements Job {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
  deletedAt: Date | null; // 可以为 null，表示未删除

  constructor(partial: Partial<JobResponseDto>) {
    Object.assign(this, partial);
  }
}
