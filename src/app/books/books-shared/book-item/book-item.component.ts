import { Component, Input, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book.model';
import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  author: Author;

  constructor(
    private authorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    if (
      this.authorsService
        .getAuthors()
        .find((author) => author.books.includes(this.book))
    ) {
      this.author = this.authorsService.getAuthors().find((author) => {
        return author.books.includes(this.book);
      });
    }
  }
}
