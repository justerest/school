import {
  MatInputModule,
  MatButtonModule,
} from '@angular/material';

import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
  ],
})
export class MaterialModule { }
