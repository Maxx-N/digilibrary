import { Component, OnInit } from '@angular/core';

import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loadedComponent: string = 'authors';

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.loadedComponentSubject.subscribe((component) => {
      this.loadedComponent = component;
    });
  }
}
