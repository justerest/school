import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Game1Component } from './game1/game1.component';
import { GamesRoutingModule } from './games-routing.module';
import { ImagesLoaderService } from './images-loader.service';
import { KeyboardControlDirective } from './keyboard-control.directive';
import { KeyboardControlService } from './keyboard-control.service';

@NgModule({
  imports: [
    CommonModule,
    GamesRoutingModule,
  ],
  declarations: [Game1Component, KeyboardControlDirective],
  providers: [KeyboardControlService, ImagesLoaderService],
})
export class GamesModule { }
