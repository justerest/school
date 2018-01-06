import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasControlComponent } from './canvas-control.component';

describe('CanvasControlComponent', () => {
  let component: CanvasControlComponent;
  let fixture: ComponentFixture<CanvasControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasControlComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
