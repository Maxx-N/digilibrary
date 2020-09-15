import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  loadedComponentSubject: Subject<string> = new Subject<string>();
}
