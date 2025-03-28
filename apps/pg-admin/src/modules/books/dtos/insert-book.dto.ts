// apps/pg-admin/src/modules/books/dtos/book-response.dto.ts

export class InsertBookDto {
  name: string;

  constructor(partial: Partial<InsertBookDto>) {
    Object.assign(this, partial);
  }
}
