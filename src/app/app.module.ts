import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '~/app.component';
import { MaterialModule } from '~/modules/material.module';
import { AppRoutingModule } from '~/modules/app-routing.module';
import { MainComponent } from '~/pages/main/main.component';
import { Game1Component } from '~/pages/game1/game1.component';
import { CanvasControlDirective } from './directives/canvas-control.directive';
import { KeyboardControlService } from './services/keyboard-control.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    Game1Component,
    CanvasControlDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [KeyboardControlService],
})
export class AppModule { }
