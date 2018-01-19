import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.scss'],
})
export class ParamComponent implements OnInit {

  @Input() paramName: string;
  @Input() subtitle: string;
  @Input() iconLeft: string;
  @Input() iconRight: string;

  @Input() param: number;
  @Output() paramChange = new EventEmitter<number>();

  incrementValue = 0.5;

  constructor() { }

  ngOnInit() {
  }

  incrementParam() {
    this.param += this.incrementValue;
    this.paramChange.emit(this.param);
  }

  decrementParam() {
    this.param -= this.incrementValue;
    this.paramChange.emit(this.param);
  }

}
