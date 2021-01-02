import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDifficultyComponent } from './choose-difficulty.component';

describe('ChooseDifficultyComponent', () => {
  let component: ChooseDifficultyComponent;
  let fixture: ComponentFixture<ChooseDifficultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseDifficultyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
