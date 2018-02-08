import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chart-param',
  templateUrl: './chart-param.component.html',
  styleUrls: ['./chart-param.component.scss'],
})
export class ChartParamComponent {

  readonly incrementValue = 1;

  @Input() paramName: string;
  @Input() subtitle: string;
  @Input() iconLeft: string;
  @Input() iconRight: string;

  @Input() param: number;
  @Output() paramChange = new EventEmitter<number>();

  incrementParam() {
    this.param += this.incrementValue;
    this.paramChange.emit(this.param);
  }

  decrementParam() {
    this.param -= this.incrementValue;
    this.paramChange.emit(this.param);
  }

}
