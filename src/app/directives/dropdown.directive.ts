import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostListener('click') toggleDisplay() {
    this.elementRef.nativeElement
      .querySelector('.dropdown-menu')
      .classList.toggle('show');
  }

  constructor(private elementRef: ElementRef) {}
}
