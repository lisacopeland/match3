import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.scss']
})
export class FlowerComponent implements OnInit {

  @Input() innerColor: any;
  @Input() outerColor: any;

  constructor() { }

  ngOnInit(): void {
    console.log('hi from flower, ');
  }

}
