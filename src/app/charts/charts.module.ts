import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { BackgroundGridDirective } from './background-grid.directive';
import { ChartParamComponent } from './chart-param.component';
import { ChartsComponent } from './charts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [ChartsComponent, BackgroundGridDirective, ChartParamComponent],
})
export class ChartsModule { }
