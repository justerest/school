import { NgModule } from '@angular/core';
import { ChartsComponent } from './charts.component';
import { SharedModule } from '../shared/shared.module';
import { ChartsBackgroundDirective } from './charts-background.directive';
import { ChartsService } from './charts.service';

@NgModule({
  imports: [SharedModule],
  declarations: [ChartsComponent, ChartsBackgroundDirective],
  providers: [ChartsService],
})
export class ChartsModule { }
