import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[appFlowerClick]' })
export class FlowerClickDirective {

  @HostListener('click', ['$event.target']) onClick(target: any): void {
    console.log(`You clicked on a flower with id ${target.id}`);
    const classList = target.className.split(' ');
    if (classList.includes('notuseable')) {
      console.log('you cant click here');
    } else {
      console.log('you can click here!');
    }
  }

}
