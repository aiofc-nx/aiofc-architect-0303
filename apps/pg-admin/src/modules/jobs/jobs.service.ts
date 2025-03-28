import { Injectable } from '@nestjs/common';

import { Job } from '../../database/schemas/tables/job.table'; // 导入 Job 类型

import { JobResponseDto } from './dtos/job-response.dto';

@Injectable()
export class JobsService {
  private jobs: Job[] = []; // 模拟数据库的内存存储
  private currentId = 1; // 用于生成唯一 ID

  async addJob(jobName: string): Promise<JobResponseDto> {
    const newJob: Job = {
      id: this.currentId.toString(),
      name: jobName,
      createdAt: new Date(),
      updatedAt: new Date(),
      tenantId: 'default-tenant', // 假设的租户 ID
      deletedAt: null,
    };
    this.jobs.push(newJob);
    this.currentId++;
    return new JobResponseDto(newJob); // 返回 DTO
  }

  async getById(id: string): Promise<JobResponseDto> {
    const job = this.jobs.find((job) => job.id === id);
    if (!job) {
      throw new Error('Job not found'); // 可以抛出自定义异常
    }
    return new JobResponseDto(job); // 返回 DTO
  }

  async getAllJobs(): Promise<JobResponseDto[]> {
    return this.jobs.map((job) => new JobResponseDto(job)); // 返回 DTO 数组
  }

  async updateJob(
    id: string,
    updateData: { name?: string; tenantId?: string },
  ): Promise<JobResponseDto> {
    const jobIndex = this.jobs.findIndex((job) => job.id === id);
    if (jobIndex === -1) {
      throw new Error('Job not found'); // 可以抛出自定义异常
    }
    const updatedJob: Job = {
      ...this.jobs[jobIndex],
      ...updateData,
      updatedAt: new Date(),
    };
    this.jobs[jobIndex] = updatedJob; // 更新作业
    return new JobResponseDto(updatedJob); // 返回 DTO
  }

  async deleteJob(id: string): Promise<void> {
    const jobIndex = this.jobs.findIndex((job) => job.id === id);
    if (jobIndex === -1) {
      throw new Error('Job not found'); // 可以抛出自定义异常
    }
    this.jobs.splice(jobIndex, 1); // 删除作业
  }
}
