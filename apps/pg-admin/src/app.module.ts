import { setupConfigModule } from '@aiofc/config';
import { Module } from '@nestjs/common';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';

@Module({
  imports: [setupConfigModule()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
