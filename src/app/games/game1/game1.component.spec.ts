import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagesLoaderService } from 'app/shared/images-loader.service';
import { GamesModule } from '../games.module';
import { Game1Component } from './game1.component';

describe('Game1Component', () => {
  let component: Game1Component;
  let fixture: ComponentFixture<Game1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GamesModule],
      providers: [ImagesLoaderService],
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
