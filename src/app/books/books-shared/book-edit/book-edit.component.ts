import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  updateMode: boolean = false;
  updateModeSubscription: Subscription;
  bookToUpdate: Book;

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setYearsArray();
    this.updateModeSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.updateMode = !!params['id'];
        this.initForm();
      }
    );
  }

  ngOnDestroy(): void {
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
    this.bookToUpdate = this.booksService.getBook(
      +this.route.snapshot.params['id']
    );
    const bookToUpdateAuthorIndex = this.availableAuthors.indexOf(
      this.availableAuthors.find((author) => {
        return author.books.includes(this.bookToUpdate);
      })
    );

    this.form = new FormGroup({
      title: new FormControl(this.bookToUpdate.title, [
        Validators.required,
        Validators.minLength(2),
      ]),
      authorIndex: new FormControl(bookToUpdateAuthorIndex),
      year: new FormControl(
        this.bookToUpdate.year.toString(),
        Validators.required
      ),
      category: new FormControl(this.bookToUpdate.category, [
        Validators.required,
        Validators.minLength(3),
      ]),
      isToRead: new FormControl(this.bookToUpdate.isToRead),
      synopsis: new FormControl(this.bookToUpdate.synopsis, [
        Validators.required,
        Validators.minLength(20),
      ]),
      imageUrl: new FormControl(this.bookToUpdate.imageUrl),
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
          return author.books.includes(this.bookToUpdate);
        });
        if (previousAuthor) {
          this.authorsService.removeBookFromItsAuthor(
            previousAuthor,
            this.bookToUpdate
          );
        }
      }

      if (this.updateMode) {
        this.booksService.updateBook(this.bookToUpdate, book);
        this.router.navigate(['..'], { relativeTo: this.route });
      } else {
        this.booksService.addBook(book);
        this.router.navigate(['..', book.id], { relativeTo: this.route });
      }
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
