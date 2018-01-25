import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Game1Component } from './game1.component';
import { GamesRoutingModule } from './games-routing.module';
import { KeyboardControlDirective } from './keyboard-control.directive';
import { KeyboardControlService } from './keyboard-control.service';

@NgModule({
  imports: [
    CommonModule,
    GamesRoutingModule,
  ],
  declarations: [Game1Component, KeyboardControlDirective],
  providers: [KeyboardControlService],
})
export class GamesModule { }
