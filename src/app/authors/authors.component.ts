import { Component, OnInit } from '@angular/core';

import { Author } from '../models/author.model';
import { AuthorsService } from '../services/authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  selectedAuthor: Author = this.authorsService.selectedAuthor;

  constructor(
    private authorsService: AuthorsService,
  ) {}

  ngOnInit(): void {
    this.authorsService.selectedAuthorSubject.subscribe((author) => {
      this.selectedAuthor = author;
    });

  }
}
