import { Body, Controller, Get, Post } from '@nestjs/common';

import { CoreService, IMessage } from './core.service';

interface InvokeDto {
  content: string;
}

@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get()
  index(): string {
    return 'Hello this is core';
  }

  @Post()
  async invoke(@Body() invokeDto: InvokeDto): Promise<IMessage> {
    console.log('invokeDto', invokeDto);
    // const message = invokeDto.content;
    const message = '你好';
    return await this.coreService.invoke(message);
  }
}
