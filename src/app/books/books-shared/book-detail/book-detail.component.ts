import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { Router } from '@angular/router';

import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { AuthorsService } from 'src/app/services/authors.service';
// import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book: Book;
  author: Author;

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
    // private headerService: HeaderService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.book = this.booksService.selectedBook;
    this.author = this.getBookAuthor(this.book);

    this.booksService.selectedBookSubject.subscribe((book) => {
      this.book = book;
      this.author = this.getBookAuthor(book);
    });
  }

  getBookAuthor(book: Book): Author {
    if (
      this.authorsService
        .getAuthors()
        .find((author) => author.books.includes(book))
    ) {
      return (this.author = this.authorsService.getAuthors().find((author) => {
        return author.books.includes(book);
      }));
    } else {
      return null;
    }
  }

  onDisplayBookAuthor() {
    // this.headerService.loadedComponentSubject.next('authors');
    this.authorsService.selectedAuthor = this.author;
    this.router.navigate(['authors']);
    // this.authorsService.selectedAuthorSubject.next(this.author);
  }

  onToggleReadingList(): void {
    this.booksService.toggleReadingList(this.book);
  }

  onUpdateBook(): void {
    this.booksService.setUpdateMode(true);
    this.booksService.startEditing();
  }

  onDeleteBook(): void {
    this.authorsService.removeBookFromItsAuthor(this.author, this.book);
    this.booksService.deleteBook(this.book);
  }
}
