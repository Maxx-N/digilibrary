import { Book } from './book.model';

export class Author {
  id: number;
  constructor(
    public firstName: string,
    public lastName: string,
    public nationality: string,
    public books: Book[],
    public imageUrl: string
  ) {}
}
