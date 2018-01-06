import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MainComponent } from './pages/main/main.component';
import { Game1Component } from './pages/game1/game1.component';
import { CanvasControlComponent } from './canvas-control/canvas-control.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    Game1Component,
    CanvasControlComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
})
export class AppModule { }
