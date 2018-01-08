import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from 'app/pages/main/main.component';
import { Game1Component } from 'app/pages/game1/game1.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'game1', component: Game1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
