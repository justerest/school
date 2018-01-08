import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from 'app/app.module';
import { Game1Component } from './game1.component';

describe('Game1Component', () => {
  let component: Game1Component;
  let fixture: ComponentFixture<Game1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Game1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
