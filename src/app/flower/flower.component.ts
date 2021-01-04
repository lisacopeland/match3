import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FlowerInterface } from '@shared/models/flower.interface';

@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.scss'],

})
export class FlowerComponent implements OnInit {

  @Input() flower: FlowerInterface | undefined;
  flowerHeight = 50;
  flowerWidth = 50;
  flowerX = 25;
  flowerY = 25;
  flowerRadius = 20;
  strokeWidth = 8;

  constructor(private observer: BreakpointObserver) { }

  ngOnInit(): void {
    this.observer.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log(
            'Matches small viewport or handset in portrait mode'
          );
        }
      });
  }
}
