import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartsComponent } from './charts/charts.component';
import { ConverterComponent } from './converter/converter.component';

const routes: Routes = [
  { path: '', redirectTo: 'charts', pathMatch: 'full' },
  { path: 'charts', component: ChartsComponent },
  { path: 'converter', component: ConverterComponent },
  { path: 'games', loadChildren: 'app/games/games.module#GamesModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
