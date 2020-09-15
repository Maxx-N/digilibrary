import { Component, Input, OnInit } from '@angular/core';

import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  @Input() book : Book ;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectBook() : void {

  }

}
