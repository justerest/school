import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ChartsBackgroundDirective } from './charts-background.directive';
import { ChartsComponent } from './charts.component';
import { ChartsService } from './charts.service';
import { ParamComponent } from './param/param.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ChartsComponent, ChartsBackgroundDirective, ParamComponent],
  providers: [ChartsService],
})
export class ChartsModule { }
