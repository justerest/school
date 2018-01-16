import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { MainPageComponent } from './core/main-page.component';
import { Game1Component } from './games/game1.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'game1', component: Game1Component },
  { path: 'charts', component: ChartsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
