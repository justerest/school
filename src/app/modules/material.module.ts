import { NgModule } from '@angular/core';

import {
  MatInputModule,
  MatButtonModule,
} from '@angular/material';

const importsExportsModules = [
  MatInputModule,
  MatButtonModule,
];

@NgModule({
  imports: importsExportsModules,
  exports: importsExportsModules,
})
export class MaterialModule { }
