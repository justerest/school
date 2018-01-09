import { NgModule } from '@angular/core';

import { Game1Component } from './game1/game1.component';
import { KeyboardControlDirective } from './keyboard-control.directive';
import { KeyboardControlService } from './keyboard-control.service';

@NgModule({
  declarations: [Game1Component, KeyboardControlDirective],
  providers: [KeyboardControlService],
})
export class GamesModule { }
