import { Component, OnInit } from '@angular/core';

import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss'],
})
export class AuthorDetailComponent implements OnInit {
  author: Author;

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    this.author = this.authorsService.selectedAuthor;
    this.authorsService.selectedAuthorSubject.subscribe((author) => {
      this.author = author;
    });
  }
}
