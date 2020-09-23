import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AuthorsService } from './authors.service';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private authorsService: AuthorsService
  ) {}

  storeAuthors(): void {
    const authors = this.authorsService.getAuthors();
    this.http
      .put('https://digilibrary-1f1bf.firebaseio.com/authors.json', authors)
      .subscribe();
  }

  fetchAuthors(): void {
    this.http
      .get<Author[]>('https://digilibrary-1f1bf.firebaseio.com/authors.json')
      .pipe(
        map((authors) => {
          return authors.map((author) => {
            return {
              ...author,
              books: author.books ? author.books : [],
            };
          });
        })
      )
      .subscribe((responseData) => {
        this.authorsService.setAuthors(responseData);
      });
  }
}
