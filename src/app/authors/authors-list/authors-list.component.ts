import { Component, OnInit } from '@angular/core';

import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss'],
})
export class AuthorsListComponent implements OnInit {
  authors: Author[] = this.authorsService.getSortedAuthors();

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    this.authorsService.sortedAuthorsListSubject.subscribe((authorsList) => {
      this.authors = authorsList;
    });
  }
}
