import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { AuthorsService } from 'src/app/services/authors.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss'],
})
export class AuthorDetailComponent implements OnInit, OnDestroy {
  author: Author;
  sortedAuthorSBooks: Book[];
  paramsSubscription: Subscription;

  constructor(
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.author = this.authorsService.getAuthor(+this.route.params['id']);
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.author = this.authorsService.getAuthor(+params['id']);
      this.sortedAuthorSBooks = this.author.books.sort((book1, book2) => {
        return book1.year < book2.year ? +1 : -1;
      });
    });

  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  onDisplayBook(book: Book): void {
    this.booksService.selectedBook = book;
    this.router.navigate(['books']);
  }



  onDeleteAuthor(): void {
    this.authorsService.deleteAuthor(this.author);
    this.router.navigate(['']);
  }
}
