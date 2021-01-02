import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[appFlowerClick]' })
export class FlowerClickDirective {

  @HostListener('click', ['$event.target']) onClick(target: any): void {
    const classList = target.className.split(' ');
    if (classList.includes('notuseable')) {
      // This not a useable square
    } else {
      // This is a useable square
    }
  }

}
