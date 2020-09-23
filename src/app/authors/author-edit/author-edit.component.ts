import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';
import { AuthorsService } from 'src/app/services/authors.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss'],
})
export class AuthorEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  get booksControls() {
    return (<FormArray>this.form.get('booksIndexes')).controls;
  }
  existingBooks: Book[] = this.booksService.getBooksChronologically();
  editMode: boolean = false;
  authorToUpdate: Author;
  paramsSubscription: Subscription;
  sortedAuthorsListSubscription: Subscription;

  constructor(
    private authorsService: AuthorsService,
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.setFormOrNavigateBack(params);
      this.sortedAuthorsListSubscription = this.authorsService.sortedAuthorsListSubject.subscribe(
        () => {
          this.setFormOrNavigateBack(params);
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.sortedAuthorsListSubscription.unsubscribe();
  }

  setFormOrNavigateBack(params: Params): void {
    this.editMode = !!params['id'];
    if (this.editMode) {
      this.authorToUpdate = this.authorsService.getAuthor(+params['id']);
      if (!this.authorToUpdate) {
        this.router.navigate(['']);
      }
    }
    this.initForm();
  }

  initForm(): void {
    if (!this.editMode) {
      this.initCreatingForm();
    } else {
      this.initUpdatingForm();
    }
  }

  initCreatingForm(): void {
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

  initUpdatingForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl(this.authorToUpdate.firstName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl(this.authorToUpdate.lastName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      nationality: new FormControl(this.authorToUpdate.nationality, [
        Validators.required,
        Validators.minLength(3),
      ]),
      imageUrl: new FormControl(this.authorToUpdate.imageUrl),
      booksIndexes: new FormArray([]),
    });

    this.authorToUpdate.books.forEach((book) => {
      (<FormArray>this.form.get('booksIndexes')).push(
        new FormControl(
          this.existingBooks.indexOf(
            this.existingBooks.find((existingBook) => {
              return existingBook.id === book.id;
            })
          ),
          Validators.required
        )
      );
    });
  }

  setAuthorBooks(): Book[] {
    const authorBooks: Book[] = [];

    for (let index of this.form.value.booksIndexes) {
      const book = this.existingBooks[index];
      if (!authorBooks.includes(book)) {
        const authorToReplace = this.authorsService.findAuthorOfABook(book.id);
        if (authorToReplace && this.authorToUpdate != authorToReplace) {
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

      if (!this.editMode) {
        this.authorsService.addAuthor(author);
        this.router.navigate(['..', author.id], { relativeTo: this.route });
      } else {
        this.authorsService.updateAuthor(this.authorToUpdate, author);
        this.router.navigate(['..'], { relativeTo: this.route });
      }
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
