import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { InsertBookDto } from './dtos/insert-book.dto'; // 假设您有一个 DTO

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async createBook(
    @Body() insertBookDto: InsertBookDto,
  ): Promise<InsertBookDto> {
    return this.booksService.addBook(insertBookDto);
  }

  @Get()
  async getAllBooks(): Promise<InsertBookDto[]> {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  async getBookById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InsertBookDto> {
    return this.booksService.getById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: { name?: string },
  ): Promise<InsertBookDto> {
    return this.booksService.updateBook(id, updateData);
  }

  @Delete(':id')
  async deleteBook(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.booksService.deleteBook(id);
  }

  // 其他 CRUD 路由...
}
