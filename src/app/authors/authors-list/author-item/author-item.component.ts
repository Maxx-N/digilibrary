import { Component, Input } from '@angular/core';

import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.scss'],
})
export class AuthorItemComponent {
  @Input() author: Author;

  constructor(private authorsService: AuthorsService) {}

  onSelectAuthor(): void {
    this.authorsService.selectedAuthor = this.author;
    this.authorsService.selectedAuthorSubject.next(this.author);
  }
}
