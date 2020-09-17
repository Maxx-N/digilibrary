import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorsListComponent } from './authors/authors-list/authors-list.component';
import { AuthorItemComponent } from './authors/authors-list/author-item/author-item.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { BooksComponent } from './books/books.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { ReadingListComponent } from './books/reading-list/reading-list.component';
import { BookItemComponent } from './books/books-shared/book-item/book-item.component';
import { BookDetailComponent } from './books/books-shared/book-detail/book-detail.component';
import { BookEditComponent } from './books/books-shared/book-edit/book-edit.component';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthorsComponent,
    AuthorsListComponent,
    AuthorItemComponent,
    AuthorDetailComponent,
    AuthorEditComponent,
    BooksComponent,
    BooksListComponent,
    ReadingListComponent,
    BookItemComponent,
    BookDetailComponent,
    BookEditComponent,
    DropdownDirective,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
