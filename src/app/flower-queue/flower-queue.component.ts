import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FlowerInterface } from '../shared/models/flower.interface';
import { trigger, transition, useAnimation } from '@angular/animations';
import { slideInLeft } from 'ng-animate';

@Component({
  selector: 'app-flower-queue',
  templateUrl: './flower-queue.component.html',
  styleUrls: ['./flower-queue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))])
  ]
})
export class FlowerQueueComponent implements OnChanges {

  @Input() flowers: FlowerInterface[] = [];
  queueLeft = 0;
  first3: FlowerInterface[] = [];
  slideInLeft = false;

  constructor(private cdRef: ChangeDetectorRef) { }

  animate(name: 'string'): void {
    this[name] = !this[name];
  }

  ngOnChanges(): void {
    this.queueLeft = this.flowers.length;
    this.first3 = this.flowers.slice(0, 3).reverse();
    this.cdRef.detectChanges();
  }

}
