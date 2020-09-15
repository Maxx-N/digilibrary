import { Component } from '@angular/core';

import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loadedComponent: string = this.headerService.loadedComponent;

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.loadedComponentSubject.subscribe((component) => {
      this.loadedComponent = component;
    });
  }

  onSelectComponent(component: string) {
    this.headerService.loadedComponentSubject.next(component);
  }
}
