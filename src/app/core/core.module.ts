import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav.component';

@NgModule({
  declarations: [NavComponent],
  exports: [NavComponent],
  imports: [
    RouterModule,
    SharedModule,
  ],
})
export class CoreModule { }
