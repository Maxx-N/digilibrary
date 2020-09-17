import { Component, Input, OnInit } from '@angular/core';

import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.scss'],
})
export class AuthorItemComponent implements OnInit {
  @Input() author: Author;
  selectedAuthor: Author = this.authorsService.selectedAuthor;

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    this.authorsService.selectedAuthorSubject.subscribe((author) => {
      this.selectedAuthor = author;
    });
  }

  onSelectAuthor(): void {
    this.authorsService.selectAuthor(this.author);
    this.authorsService.stopEditingAuthor();
  }
}
