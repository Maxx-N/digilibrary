import { Component, OnInit } from '@angular/core';

import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  selectedBook: Book = this.booksService.selectedBook;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.selectedBookSubject.subscribe((book) => {
      this.selectedBook = book;
    });
  }
}
