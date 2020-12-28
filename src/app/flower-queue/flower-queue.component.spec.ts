import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowerQueueComponent } from './flower-queue.component';

describe('FlowerQueueComponent', () => {
  let component: FlowerQueueComponent;
  let fixture: ComponentFixture<FlowerQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowerQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowerQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
