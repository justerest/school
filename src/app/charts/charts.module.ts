import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BackgroundGridDirective } from './background-grid.directive';
import { ChartsComponent } from './charts.component';
import { ChartParamComponent } from './chart-param/chart-param.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ChartsComponent, BackgroundGridDirective, ChartParamComponent],
})
export class ChartsModule { }
