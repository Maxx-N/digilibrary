import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthorsService } from 'src/app/services/authors.service';
import { BooksService } from 'src/app/services/books.service';
import { Author } from 'src/app/models/author.model';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
  form: FormGroup;
  yearsArray: number[] = [];
  availableAuthors: Author[] = this.authorsService.getSortedAuthors();

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.setYearsArray();
    this.initForm();
  }

  initForm(): void {
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

  onSubmit(): void {
    if (this.form.valid) {
      const writter: Author = this.availableAuthors[
        +this.form.value.authorIndex
      ];

      const book = new Book(
        this.form.value.title,
        +this.form.value.year,
        this.form.value.category,
        this.form.value.isToRead,
        false,
        this.form.value.synopsis,
        this.form.value.imageUrl
      );

      this.booksService.addBook(book);
      this.booksService.selectBook(book);

      if(writter) {
        this.authorsService.addBookToAuthor(book, writter);
      }

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
