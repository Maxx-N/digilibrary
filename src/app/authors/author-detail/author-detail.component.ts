import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { AuthorsService } from 'src/app/services/authors.service';
import { BooksService } from 'src/app/services/books.service';
// import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss'],
})
export class AuthorDetailComponent implements OnInit {
  author: Author = this.authorsService.selectedAuthor;
  sortedAuthorSBooks: Book[];

  constructor(
    private authorsService: AuthorsService,
    private booksService: BooksService,
    // private headerService: HeaderService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sortedAuthorSBooks = this.author.books.sort((book1, book2) => {
      return book1.year < book2.year ? +1 : book1.year > book2.year ? -1 : 0;
    });

    this.authorsService.selectedAuthorSubject.subscribe((author) => {
      if (author) {
        this.author = author;
        this.sortedAuthorSBooks = author.books.sort((book1, book2) => {
          return book1.year < book2.year
            ? +1
            : book1.year > book2.year
            ? -1
            : 0;
        });
      }
    });
  }

  onDisplayBook(book: Book): void {
    this.booksService.selectedBook = book;
    // this.headerService.loadedComponentSubject.next('books');
    this.router.navigate(['books']);
  }

  onUpdateAuthor(): void {
    this.authorsService.setEditMode(true);
    this.authorsService.authorToUpdate = this.author;
    this.authorsService.startEditingAuthor();
  }

  onDeleteAuthor(): void {
    this.authorsService.deleteAuthor(this.author);
  }
}
