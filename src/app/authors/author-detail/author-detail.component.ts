import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss'],
})
export class AuthorDetailComponent implements OnInit, OnDestroy {
  author: Author;
  sortedAuthorSBooks: Book[];
  paramsSubscription: Subscription;
  sortedAuthorsListSubscription: Subscription;

  constructor(
    private authorsService: AuthorsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.setAuthorOrNavigateBack(params);
      this.sortedAuthorsListSubscription = this.authorsService.sortedAuthorsListSubject.subscribe(
        () => {
          this.setAuthorOrNavigateBack(params);
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.sortedAuthorsListSubscription.unsubscribe();
  }

  setAuthorOrNavigateBack(params: Params): void {
    this.author = this.authorsService.getAuthor(+params['id']);
    if (!this.author) {
      this.router.navigate(['..'], { relativeTo: this.route });
    } else {
      this.sortedAuthorSBooks = this.author.books.sort((book1, book2) => {
        return book1.year < book2.year ? +1 : -1;
      });
    }
  }

  onDeleteAuthor(): void {
    this.authorsService.deleteAuthor(this.author);
    this.router.navigate(['']);
  }
}
