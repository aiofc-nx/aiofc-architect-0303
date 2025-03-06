import { setupConfigModule } from '@aiofc/config';
import { setupClsModule } from '@aiofc/fastify-server';
import { setupLoggerModule } from '@aiofc/logger';
import { Module } from '@nestjs/common';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { DrizzlePgModule } from './drizzle/node-postgres/drizzle-pg.module';

@Module({
  imports: [
    // 配置模块，应当在所有模块之前导入，因为这是一个全局模块，其他模块需要使用 ConfigService
    // setupConfigModule(
    //   path.join(__dirname, 'assets', 'config.development.yaml')
    // ),
    setupConfigModule(),
    // 日志模块
    setupLoggerModule(),
    // 缓存模块
    setupClsModule(),
    DrizzlePgModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
