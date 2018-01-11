import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    RouterModule,
    SharedModule,
  ],
})
export class CoreModule { }
