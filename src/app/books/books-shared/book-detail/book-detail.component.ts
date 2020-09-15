import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author.model';

import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book: Book;
  author : Author;

  constructor(private booksService: BooksService, private authorsService : AuthorsService) {}

  ngOnInit(): void {
    this.book = this.booksService.selectedBook;
    this.booksService.selectedBookSubject.subscribe((book) => {
      this.book = book;
    });

    if (this.authorsService.getAuthors().find((author) => author.books.includes(this.book))) {
      this.author = this.authorsService.getAuthors().find((author) => {
        return author.books.includes(this.book);
      });
    }
  }
}
