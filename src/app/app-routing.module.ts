import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';

const appRoutes: Routes = [
  {
    path: 'authors',
    component: AuthorsComponent,
  },
  {
    path: 'books',
    component: BooksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
