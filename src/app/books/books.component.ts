import { Component } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  booksToLoad: string = 'Tous';

  onSelectBooksToLoad(choice: string, event): void {
    this.booksToLoad = choice;
  }
}
