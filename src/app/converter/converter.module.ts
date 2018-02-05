import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ConverterComponent } from './converter.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [ConverterComponent],
})
export class ConverterModule { }
