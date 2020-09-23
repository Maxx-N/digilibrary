import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book } from 'src/app/models/book.model';
import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit, OnDestroy {
  @Input() book: Book;
  author: Author;
  sortedAuthorsListSubscription: Subscription;

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    this.author = this.authorsService.findAuthorOfABook(this.book.id);
    this.sortedAuthorsListSubscription = this.authorsService.sortedAuthorsListSubject.subscribe(
      () => {
        this.author = this.authorsService.findAuthorOfABook(this.book.id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sortedAuthorsListSubscription.unsubscribe();
  }
}
