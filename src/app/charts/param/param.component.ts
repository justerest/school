import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.scss'],
})
export class ParamComponent {

  @Input() paramName: string;
  @Input() subtitle: string;
  @Input() iconLeft: string;
  @Input() iconRight: string;

  @Input() param: number;
  @Output() paramChange = new EventEmitter<number>();

  incrementValue = 1;

  incrementParam() {
    this.param += this.incrementValue;
    this.paramChange.emit(this.param);
  }

  decrementParam() {
    this.param -= this.incrementValue;
    this.paramChange.emit(this.param);
  }

}
