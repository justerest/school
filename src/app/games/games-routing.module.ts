import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IronManComponent } from './iron-man/iron-man.component';

const gamesRoutes: Routes = [
  { path: 'iron-man', component: IronManComponent },
];

@NgModule({
  imports: [RouterModule.forChild(gamesRoutes)],
  exports: [RouterModule],
})
export class GamesRoutingModule { }
