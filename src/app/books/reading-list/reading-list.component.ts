import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent implements OnInit, OnDestroy {
  books: Book[] = this.booksService.getBooksToRead();
  readingListSubscription: Subscription;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.readingListSubscription = this.booksService.readingListSubject.subscribe(
      (books) => {
        this.books = books;
      }
    );
  }

  ngOnDestroy(): void {
    this.readingListSubscription.unsubscribe();
  }
}
