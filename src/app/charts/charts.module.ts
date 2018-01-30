import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ChartsBackgroundDirective } from './charts-background.directive';
import { ChartsComponent } from './charts.component';
import { ParamComponent } from './param/param.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ChartsComponent, ChartsBackgroundDirective, ParamComponent],
})
export class ChartsModule { }
