import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BackgroundGridDirective } from './background-grid.directive';
import { ChartParamComponent } from './chart-param/chart-param.component';
import { ChartsComponent } from './charts.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ChartsComponent, BackgroundGridDirective, ChartParamComponent],
})
export class ChartsModule { }
