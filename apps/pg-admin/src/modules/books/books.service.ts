// apps/pg-admin/src/modules/books/books.service.ts
import { Injectable } from '@nestjs/common';

import { BookRepository } from '../../database/dao/book.repository';

import { InsertBookDto } from './dtos/insert-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BookRepository) {}

  async addBook(insertBookDto: InsertBookDto): Promise<InsertBookDto> {
    const book = await this.bookRepository.create({
      name: insertBookDto.name,
    });
    return new InsertBookDto(book);
  }

  async getAllBooks(): Promise<InsertBookDto[]> {
    const books = await this.bookRepository.findAll();
    return books.map((book) => new InsertBookDto(book));
  }

  async getById(id: number): Promise<InsertBookDto> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }
    return new InsertBookDto(book);
  }

  async updateBook(
    id: number,
    updateData: { name?: string },
  ): Promise<InsertBookDto> {
    const updatedBook = await this.bookRepository.update(id, updateData);
    if (!updatedBook) {
      throw new Error('Book not found');
    }
    return new InsertBookDto(updatedBook);
  }

  async deleteBook(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
