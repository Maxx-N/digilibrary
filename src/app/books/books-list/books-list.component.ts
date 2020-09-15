import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books: Book[];

  constructor(private booksService : BooksService) {}

  ngOnInit(): void {
    this.books = this.booksService.getBooks();
  }
}
