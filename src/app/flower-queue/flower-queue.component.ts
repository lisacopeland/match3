import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FlowerInterface } from '../shared/models/flower.interface';

@Component({
  selector: 'app-flower-queue',
  templateUrl: './flower-queue.component.html',
  styleUrls: ['./flower-queue.component.scss']
})
export class FlowerQueueComponent implements OnChanges {

  @Input() flowers: FlowerInterface[] = [];
  queueLeft = 0;
  first3: FlowerInterface[] = [];

  constructor() { }

  ngOnChanges(): void {
    this.queueLeft = this.flowers.length;
    this.first3 = this.flowers.slice(0, 3).reverse();
  }

}
