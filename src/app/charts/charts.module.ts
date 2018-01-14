import { NgModule } from '@angular/core';

import { ChartsComponent } from './charts.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [ChartsComponent],
})
export class ChartsModule { }
