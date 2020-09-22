import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Author } from '../models/author.model';
import { Book } from '../models/book.model';
import { BooksService } from './books.service';

@Injectable({ providedIn: 'root' })
export class AuthorsService {
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
    for (let author of this.authors) {
      author.id = this.authors.indexOf(author) + 1;
    }
    return this.authors.slice();
  }

  getAuthor(id: number) {
    return this.getAuthors()[id - 1];
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

  updateAuthor(formerAuthor: Author, newAuthor: Author): void {
    this.authors[formerAuthor.id - 1] = newAuthor;
    this.sortedAuthorsListSubject.next(this.getSortedAuthors());
  }

  removeBookFromItsAuthor(author: Author, book: Book) {
    if (author) {
      author.books.splice(author.books.indexOf(book), 1);
    }
  }

  deleteAuthor(author: Author) {
    if (
      confirm(
        `Vous êtes sur le point de supprimer ${author.firstName} ${author.lastName} de la liste des auteurs. \nCette opération est irréversible. \n\nÊtes vous sûr(e) de vouloir continuer ?`
      )
    ) {
      this.authors.splice(this.authors.indexOf(author), 1);
      this.sortedAuthorsListSubject.next(this.getSortedAuthors());
    }
  }

  addBookToAuthor(book: Book, author: Author) {
    this.authors[this.authors.indexOf(author)].books.push(book);
    this.sortedAuthorsListSubject.next(this.getSortedAuthors());
  }
}
