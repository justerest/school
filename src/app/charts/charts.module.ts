import { NgModule } from '@angular/core';

import { ChartsComponent } from './charts.component';
import { SharedModule } from '../shared/shared.module';
import { ChartsBackgroundDirective } from './charts-background.directive';

@NgModule({
  imports: [SharedModule],
  declarations: [ChartsComponent, ChartsBackgroundDirective],
})
export class ChartsModule { }
