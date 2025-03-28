import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { Job, NewJob } from '../../database/schemas/tables/job.table';

import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // 创建新作业
  @Post()
  async createJob(@Body() newJobData: { name: string }): Promise<NewJob> {
    return this.jobsService.addJob(newJobData.name);
  }

  // 获取所有作业
  @Get()
  async getAllJobs(): Promise<Job[]> {
    return this.jobsService.getAllJobs();
  }

  // 根据 ID 获取作业
  @Get(':id')
  async getJobById(@Param('id') id: string): Promise<Job> {
    return this.jobsService.getById(id);
  }

  // 更新作业
  @Put(':id')
  async updateJob(
    @Param('id') id: string,
    @Body() updateData: { name?: string; tenantId?: string },
  ): Promise<Job> {
    // 假设 JobsService 有一个 updateJob 方法
    return this.jobsService.updateJob(id, updateData);
  }

  // 删除作业
  @Delete(':id')
  async deleteJob(@Param('id') id: string): Promise<void> {
    return this.jobsService.deleteJob(id);
  }
}
