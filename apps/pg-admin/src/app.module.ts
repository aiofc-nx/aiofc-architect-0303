import { setupConfigModule } from '@aiofc/config';
import { setupLoggerModule } from '@aiofc/logger';
import { Module } from '@nestjs/common';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { CoreModule } from './core/core.module';
import { DrizzleModule } from './database/node-postgres/drizzle.module';
import { BooksModule } from './modules/books/books.module';
import { JobsModule } from './modules/jobs/jobs.module';
@Module({
  imports: [
    setupConfigModule(),
    setupLoggerModule(),
    DrizzleModule,
    JobsModule,
    BooksModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
