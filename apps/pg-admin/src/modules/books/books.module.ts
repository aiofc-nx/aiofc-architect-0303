import { Module } from '@nestjs/common';

import { BookRepository } from '../../database/dao/book.repository';
import { DrizzleModule } from '../../database/node-postgres/drizzle.module';

import { BooksController } from './books.contorller';
import { BooksService } from './books.service';

@Module({
  imports: [DrizzleModule],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
  exports: [BooksService],
})
export class BooksModule {}
