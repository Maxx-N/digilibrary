import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent implements OnInit {
  books: Book[];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.books = this.booksService.getBooksToRead();
    this.booksService.readingListSubject.subscribe((books) => {
      this.books = books;
    });
  }
}
