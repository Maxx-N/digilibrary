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
  isEditingAuthor: boolean = this.authorsService.isEditingAuthor;

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    this.authorsService.selectedAuthorSubject.subscribe((author) => {
      this.selectedAuthor = author;
    });
    this.authorsService.isEditingAuthorSubject.subscribe((isEditing) => {
      this.isEditingAuthor = isEditing;
    });
  }

  onAddAuthor(): void {
    this.authorsService.setEditMode(false);
    this.authorsService.startEditingAuthor();
    this.authorsService.unselectAuthor();
  }
}
