import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Author } from '../models/author.model';
import { Book } from '../models/book.model';
import { BooksService } from './books.service';

@Injectable({ providedIn: 'root' })
export class AuthorsService {
  selectedAuthor: Author;
  selectedAuthorSubject: Subject<Author> = new Subject<Author>();
  isEditingAuthor: boolean = false;
  isEditingAuthorSubject: Subject<boolean> = new Subject<boolean>();
  sortedAuthorsListSubject: Subject<Author[]> = new Subject<Author[]>();

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
      'Etats-Unis',
      [this.books[3]],
      'https://img.20mn.fr/aDKy2B05Rx269DluYcCV5w/830x532_autrice-fantasy-robin-hobb-18-mars-2018.jpg'
    ),
  ];

  constructor(private booksService: BooksService) {}

  getAuthors(): Author[] {
    return this.authors.slice();
  }

  getSortedAuthors(): Author[] {
    return this.getAuthors().sort((author1, author2) => {
      return author1.lastName < author2.lastName
        ? -1
        : author1.lastName > author2.lastName
        ? 1
        : 0;
    });
  }

  addAuthor(author: Author): void {
    this.authors.push(author);
    this.sortedAuthorsListSubject.next(this.getSortedAuthors());
  }

  selectAuthor(author: Author): void {
    this.selectedAuthor = author;
    this.selectedAuthorSubject.next(author);
  }

  unselectAuthor(): void {
    this.selectedAuthor = null;
    this.selectedAuthorSubject.next(null);
  }

  startEditingAuthor(): void {
    this.isEditingAuthor = true;
    this.isEditingAuthorSubject.next(true);
  }

  stopEditingAuthor(): void {
    if (this.selectedAuthor) {
      this.isEditingAuthor = false;
      this.isEditingAuthorSubject.next(false);
    }
  }

  removeBookFromItsAuthor(book: Book) {
    const author = this.authors.find((author) => {
      return author.books.includes(book);
    });

    if (author) {
      author.books.splice(author.books.indexOf(book), 1);
    }
  }
}
