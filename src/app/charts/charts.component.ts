import { Component, AfterViewInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CELL_SIZE, COLORS } from './constants';

@Component({
  selector: 'app-charts.charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChartsComponent implements AfterViewInit {

  context: CanvasRenderingContext2D;
  canvasSize = 520;

  paramA = new FormControl(2);
  paramB = new FormControl(-1);

  get formula() {
    return `y = ${writeMember(this.paramA.value, true)}x ${writeMember(this.paramB.value)}`;
  }

  constructor(
    private el: ElementRef,
  ) { }

  ngAfterViewInit() {
    this.context = this.el.nativeElement
      .querySelector('canvas.charts__canvas')
      .getContext('2d');

    this.drawFunction();
  }

  incrementParamA() {
    this.paramA.setValue(this.paramA.value + 0.5);
    this.drawFunction();
  }
  decrementParamA() {
    this.paramA.setValue(this.paramA.value - 0.5);
    this.drawFunction();
  }
  incrementParamB() {
    this.paramB.setValue(this.paramB.value + 1);
    this.drawFunction();
  }
  decrementParamB() {
    this.paramB.setValue(this.paramB.value - 1);
    this.drawFunction();
  }

  drawFunction() {
    const { context } = this;
    const { canvas } = context;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1;
    context.strokeStyle = COLORS.pencil;

    context.translate(canvas.width / 2, -canvas.height / 2);
    context.beginPath();
    context.moveTo(-canvas.width, canvas.height + canvas.width * this.paramA.value - this.paramB.value * CELL_SIZE);
    context.lineTo(canvas.width, canvas.height - canvas.width * this.paramA.value - this.paramB.value * CELL_SIZE);
    context.closePath();
    context.stroke();
    context.translate(-canvas.width / 2, canvas.height / 2);
  }

}

function writeMember(number: number, isWithoutPlus = false) {
  let res = '';

  if (number >= 0 && !isWithoutPlus) {
    res = '+ ';
  }
  if (number < 0) {
    res = '- ';
  }

  return res + Math.abs(number);
}
