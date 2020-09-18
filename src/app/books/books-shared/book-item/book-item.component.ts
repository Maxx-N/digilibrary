import { Component, Input, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  selectedBook: Book = this.booksService.selectedBook;
  author: Author;

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.booksService.selectedBookSubject.subscribe((book) => {
      this.selectedBook = book;
    });

    if (
      this.authorsService
        .getAuthors()
        .find((author) => author.books.includes(this.book))
    ) {
      this.author = this.authorsService.getAuthors().find((author) => {
        return author.books.includes(this.book);
      });
    }
  }

  onSelectBook(): void {
    this.booksService.selectBook(this.book);
    this.booksService.stopEditing();
  }
}
