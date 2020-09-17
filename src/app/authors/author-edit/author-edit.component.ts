import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { AuthorsService } from 'src/app/services/authors.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss'],
})
export class AuthorEditComponent implements OnInit {
  form: FormGroup;
  get booksControls() {
    return (<FormArray>this.form.get('booksIndexes')).controls;
  }
  existingBooks: Book[] = this.booksService.getBooksChronologically();
  // remainingBooks : Book[];

  constructor(
    private authorsService: AuthorsService,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    // this.remainingBooks = this.existingBooks.slice();
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      nationality: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      imageUrl: new FormControl(''),
      booksIndexes: new FormArray([]),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      let authorBooks: Book[] = [];
      for (let index of this.form.value.booksIndexes) {
        if (!authorBooks.includes(this.existingBooks[index])) {
          authorBooks.push(this.existingBooks[index]);
        }
      }
      for (let book of authorBooks) {
        this.authorsService.removeBookFromItsAuthor(book);
      }

      const author = new Author(
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.nationality,
        authorBooks,
        this.form.value.imageUrl
      );

      this.authorsService.addAuthor(author);

      this.form.reset();
    } else {
      alert('Formulaire invalide');
    }
  }

  onAddBookControl(): void {
    // const i = this.form.value.booksIndexes[this.form.value.booksIndexes.length-1];
    // const bookToRemove : Book = this.existingBooks[i];
    // this.remainingBooks.splice(this.remainingBooks.indexOf(bookToRemove), 1);

    (this.form.get('booksIndexes') as FormArray).push(new FormControl(null));
  }
}
