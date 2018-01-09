import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatButtonModule,
} from '@angular/material';

import { ImagesLoaderService } from './images-loader.service';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
  ],
  providers: [ImagesLoaderService],
})
export class SharedModule { }
