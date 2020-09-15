import { Component } from '@angular/core';

import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  constructor(private headerService : HeaderService) {}

  onSelectComponent(component : string) {
    this.headerService.loadedComponentSubject.next(component);  }
}
