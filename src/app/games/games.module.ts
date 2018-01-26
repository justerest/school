import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GamesRoutingModule } from './games-routing.module';
import { ImagesLoaderService } from './images-loader.service';
import { IronManComponent } from './iron-man/iron-man.component';
import { KeyboardControlDirective } from './keyboard-control.directive';
import { KeyboardControlService } from './keyboard-control.service';

@NgModule({
  imports: [
    CommonModule,
    GamesRoutingModule,
  ],
  declarations: [IronManComponent, KeyboardControlDirective],
  providers: [KeyboardControlService, ImagesLoaderService],
})
export class GamesModule { }
