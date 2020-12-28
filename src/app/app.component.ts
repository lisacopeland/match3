import { Component } from '@angular/core';
import { FlowerInterface } from './shared/models/flower.interface';
import { blue, red, yellow } from './shared/models/flowercolors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'flowers';

}
