import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, OnDestroy {
  selectedBook: Book = this.booksService.selectedBook;
  booksToLoad: string = 'Tous';
  selectedBookSubscription: Subscription;
  isEditing: boolean = this.booksService.isEditing;
  isEditingSubscription: Subscription;

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.selectedBookSubscription = this.booksService.selectedBookSubject.subscribe(
      (book) => {
        this.selectedBook = book;
      }
    );
    this.isEditingSubscription = this.booksService.isEditingSubject.subscribe(
      (isEditing) => {
        this.isEditing = isEditing;
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedBookSubscription.unsubscribe();
    this.isEditingSubscription.unsubscribe();
  }

  onSelectBooksToLoad(choice: string, event): void {
    this.booksToLoad = choice;
    if (this.booksService.isEditing) {
      this.booksService.stopEditing();
    }
  }

  onAddBook(): void {
    this.booksService.startEditing();
    this.booksService.unselectBook();
  }
}
