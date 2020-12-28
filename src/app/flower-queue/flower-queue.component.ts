import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlowerInterface } from '../shared/models/flower.interface';

@Component({
  selector: 'app-flower-queue',
  templateUrl: './flower-queue.component.html',
  styleUrls: ['./flower-queue.component.scss']
})
export class FlowerQueueComponent implements OnInit {

  @Input() flowers: FlowerInterface[] = [];
  @Output() currentFlower = new EventEmitter<FlowerInterface>();
  constructor() { }

  ngOnInit(): void {
    // Generate the flower queue
  }

}
