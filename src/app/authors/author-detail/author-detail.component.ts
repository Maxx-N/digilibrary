import { Component, OnInit } from '@angular/core';

import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss'],
})
export class AuthorDetailComponent implements OnInit {
  author: Author;
  sortedAuthorSBooks: Book[];

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    this.author = this.authorsService.selectedAuthor;
    this.sortedAuthorSBooks = this.author.books.sort((book1, book2) => {
      return book1.year < book2.year ? +1 : book1.year > book2.year ? -1 : 0;
    });

    this.authorsService.selectedAuthorSubject.subscribe((author) => {
      this.author = author;
      this.sortedAuthorSBooks = author.books.sort((book1, book2) => {
        return book1.year < book2.year ? +1 : book1.year > book2.year ? -1 : 0;
      });
    });


  }
}
