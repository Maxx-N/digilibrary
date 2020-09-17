import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Author } from 'src/app/models/author.model';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss'],
})
export class AuthorEditComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    nationality: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {}

  onCreateAuthor(): void {
    const author = new Author(
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.nationality,
      [],
      this.form.value.imageUrl
    );

    this.authorsService.addAuthor(author);
  }
}
