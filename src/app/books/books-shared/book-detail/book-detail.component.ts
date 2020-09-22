import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book: Book;
  author: Author;

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.book = this.booksService.getBook(+this.route.params['id']);
    this.author = this.getBookAuthor(this.book);

    this.route.params.subscribe((params: Params) => {
      this.book = this.booksService.getBook(+params['id']);
      this.author = this.getBookAuthor(this.book);
    });
  }

  getBookAuthor(book: Book): Author {
    if (
      this.authorsService
        .getAuthors()
        .find((author) => author.books.includes(book))
    ) {
      return (this.author = this.authorsService.getAuthors().find((author) => {
        return author.books.includes(book);
      }));
    } else {
      return null;
    }
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
