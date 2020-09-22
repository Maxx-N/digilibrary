import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookDetailComponent } from './books/books-shared/book-detail/book-detail.component';
import { BookEditComponent } from './books/books-shared/book-edit/book-edit.component';
import { BooksComponent } from './books/books.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/authors',
    pathMatch: 'full',
  },
  {
    path: 'authors',
    component: AuthorsComponent,
    children: [
      { path: 'new', component: AuthorEditComponent },
      { path: ':id', component: AuthorDetailComponent },
      { path: ':id/edit', component: AuthorEditComponent },
    ],
  },
  {
    path: 'books',
    component: BooksComponent,
    children : [
      {path: 'new', component : BookEditComponent},
      {path: ':id', component : BookDetailComponent},
      {path: ':id/edit', component : BookEditComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
