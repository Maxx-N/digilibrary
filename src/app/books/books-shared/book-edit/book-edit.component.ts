import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthorsService } from 'src/app/services/authors.service';
import { BooksService } from 'src/app/services/books.service';
import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  yearsArray: number[] = [];
  availableAuthors: Author[] = this.authorsService.getSortedAuthors();
  updateMode: boolean = this.booksService.updateMode;
  updateModeSubscription: Subscription;

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.updateModeSubscription = this.booksService.updateModeSubject.subscribe(
      (bool) => {
        this.updateMode = bool;
        this.initForm();
      }
    );
    this.setYearsArray();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.booksService.stopEditing();
    this.updateModeSubscription.unsubscribe();
  }

  initForm(): void {
    if (this.updateMode) {
      this.initUpdatingForm();
    } else {
      this.initCreatingForm();
    }
  }

  initCreatingForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      authorIndex: new FormControl(null),
      year: new FormControl('', Validators.required),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      isToRead: new FormControl(''),
      synopsis: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      imageUrl: new FormControl(''),
    });
  }

  initUpdatingForm(): void {
    const bookToUpdate: Book = this.booksService.selectedBook;
    const bookToUpdateAuthorIndex = this.availableAuthors.indexOf(
      this.availableAuthors.find((author) => {
        return author.books.includes(bookToUpdate);
      })
    );

    this.form = new FormGroup({
      title: new FormControl(bookToUpdate.title, [
        Validators.required,
        Validators.minLength(2),
      ]),
      authorIndex: new FormControl(bookToUpdateAuthorIndex),
      year: new FormControl(bookToUpdate.year.toString(), Validators.required),
      category: new FormControl(bookToUpdate.category, [
        Validators.required,
        Validators.minLength(3),
      ]),
      isToRead: new FormControl(bookToUpdate.isToRead),
      synopsis: new FormControl(bookToUpdate.synopsis, [
        Validators.required,
        Validators.minLength(20),
      ]),
      imageUrl: new FormControl(bookToUpdate.imageUrl),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const book = new Book(
        this.form.value.title,
        +this.form.value.year,
        this.form.value.category,
        this.form.value.isToRead,
        false,
        this.form.value.synopsis,
        this.form.value.imageUrl
      );

      const writter: Author = this.availableAuthors[
        +this.form.value.authorIndex
      ];

      if (writter) {
        this.authorsService.addBookToAuthor(book, writter);
      }

      if (this.updateMode) {
        const previousAuthor = this.availableAuthors.find((author) => {
          return author.books.includes(this.booksService.selectedBook);
        });
        if (previousAuthor) {
          this.authorsService.removeBookFromItsAuthor(
            previousAuthor,
            this.booksService.selectedBook
          );
        }
      }

      if (this.updateMode) {
        this.booksService.updateBook(book);
      } else {
        this.booksService.addBook(book);
      }
      this.booksService.selectBook(book);

      this.booksService.setUpdateMode(false);

      this.booksService.stopEditing();
    } else {
      alert('Formulaire invalide.');
    }
  }

  setYearsArray(): void {
    let year: number = new Date().getFullYear();
    for (let i = 0; i <= 2500; i++) {
      this.yearsArray.push(year - i);
    }
  }
}
