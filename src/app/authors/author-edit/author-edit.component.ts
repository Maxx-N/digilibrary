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

  constructor(
    private authorsService: AuthorsService,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
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

  setAuthorBooks(): Book[] {
    const authorBooks: Book[] = [];

    for (let index of this.form.value.booksIndexes) {
      const book = this.existingBooks[index];
      if (!authorBooks.includes(book)) {
        const authorToReplace = this.authorsService
          .getAuthors()
          .find((author) => {
            return author.books.includes(book);
          });
        if (authorToReplace) {
          if (
            confirm(
              `Le livre \"${book.title}\" a déjà un auteur (${authorToReplace.firstName} ${authorToReplace.lastName}). Voulez-vous le remplacer?`
            )
          ) {
            this.authorsService.removeBookFromItsAuthor(authorToReplace, book);
            authorBooks.push(book);
          }
        } else {
          authorBooks.push(book);
        }
      }
    }

    return authorBooks;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const authorBooks = this.setAuthorBooks();

      const author = new Author(
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.nationality,
        authorBooks,
        this.form.value.imageUrl
      );

      this.authorsService.addAuthor(author);

      this.initForm();
    } else {
      alert('Formulaire invalide');
    }
  }

  onAddBookControl(): void {
    (this.form.get('booksIndexes') as FormArray).push(
      new FormControl(null, Validators.required)
    );
  }

  onRemoveBookControl(index): void {
    (this.form.get('booksIndexes') as FormArray).removeAt(index);
  }
}
