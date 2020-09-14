import { Component, Input, OnInit } from '@angular/core';

import { Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.scss']
})
export class AuthorItemComponent implements OnInit {
  @Input() author : Author;

  constructor() { }

  ngOnInit(): void {
  }

}
