import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
})
export class SharedModule { }
