import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Author } from '../models/author.model';
import { Book } from '../models/book.model';
import { BooksService } from './books.service';

@Injectable({ providedIn: 'root' })
export class AuthorsService {
  selectedAuthor : Author;
  selectedAuthorSubject: Subject<Author> = new Subject<Author>();

  private books: Book[] = this.booksService.getBooks();
  private authors: Author[] = [
    new Author(
      'Victor',
      'Hugo',
      'France',
      [this.books[0]],
      'https://upload.wikimedia.org/wikipedia/commons/2/25/Victor_Hugo_001.jpg'
    ),
    new Author(
      'Joël',
      'Dicker',
      'Suisse',
      [this.books[1], this.books[2]],
      'https://static1.purepeople.com/articles/9/27/99/19/@/3953353-exclusif-rendez-vous-avec-joel-dicker-624x600-3.jpg'
    ),
    new Author(
      'Robin',
      'Hobb',
      'USA',
      [this.books[3]],
      'https://img.20mn.fr/aDKy2B05Rx269DluYcCV5w/830x532_autrice-fantasy-robin-hobb-18-mars-2018.jpg'
    ),
  ];

  constructor(private booksService: BooksService) {}

  getAuthors(): Author[] {
    return this.authors.slice();
  }
}
