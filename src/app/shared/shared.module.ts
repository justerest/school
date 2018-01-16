import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';

import { ImagesLoaderService } from './images-loader.service';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  providers: [ImagesLoaderService],
})
export class SharedModule { }
