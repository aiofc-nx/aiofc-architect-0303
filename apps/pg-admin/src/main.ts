import { ConfigKeyPaths, ConfigService, getAppConfig } from '@aiofc/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter();
  const app = await NestFactory.create(AppModule, fastifyAdapter);

  // 允许跨域设置
  app.enableCors();

  const configService = app.get(ConfigService<ConfigKeyPaths>);
  const appConfig = getAppConfig(configService);
  await app.listen(appConfig.port);
}

void bootstrap();
