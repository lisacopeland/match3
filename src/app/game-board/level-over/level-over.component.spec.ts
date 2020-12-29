import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelOverComponent } from './level-over.component';

describe('LevelOverComponent', () => {
  let component: LevelOverComponent;
  let fixture: ComponentFixture<LevelOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
