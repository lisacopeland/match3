import { Component, Input } from '@angular/core';

import { FlowerInterface } from '@shared/models/flower.interface';

@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.scss'],
})
export class FlowerComponent {

  @Input() flower: FlowerInterface | undefined;

  constructor() { }

}
