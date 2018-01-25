import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Game1Component } from './game1/game1.component';

const gamesRoutes: Routes = [
  { path: '', component: Game1Component },
];

@NgModule({
  imports: [RouterModule.forChild(gamesRoutes)],
  exports: [RouterModule],
})
export class GamesRoutingModule { }
