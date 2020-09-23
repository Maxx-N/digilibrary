import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  book: Book;
  author: Author;
  paramsSubscription: Subscription;
  sortedAuthorsListSubscription: Subscription;

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {


    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.book = this.booksService.getBook(+params['id']);
      this.author = this.authorsService.findAuthorOfABook(this.book.id);
    });

    this.sortedAuthorsListSubscription = this.authorsService.sortedAuthorsListSubject.subscribe(
      () => {
        this.author = this.authorsService.findAuthorOfABook(this.book.id);
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.sortedAuthorsListSubscription.unsubscribe();
  }

  onToggleReadingList(): void {
    this.booksService.toggleReadingList(this.book);
  }

  onDeleteBook(): void {
    this.authorsService.removeBookFromItsAuthor(this.author, this.book);
    this.booksService.deleteBook(this.book);
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
