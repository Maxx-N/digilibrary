import { Author } from './author.model';

export class Book {
  id: number;
  constructor(
    public title: string,
    public year: number,
    public category: string,
    public isToRead: boolean,
    public isFinished: boolean,
    public synopsis: string,
    public imageUrl: string
  ) {}
}
