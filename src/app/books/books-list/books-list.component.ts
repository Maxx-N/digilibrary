import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: Book[];
  sortedBooksSubscription: Subscription;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.books = this.booksService.getBooksChronologically();
    this.sortedBooksSubscription = this.booksService.sortedBooksSubject.subscribe(
      (books) => {
        this.books = books;
      }
    );
  }

  ngOnDestroy(): void {
    this.sortedBooksSubscription.unsubscribe();
  }
}
