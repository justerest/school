import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './core/main-page/main-page.component';
import { Game1Component } from './games/game1/game1.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'game1', component: Game1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
