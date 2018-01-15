import { Component, AfterViewInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CELL_SIZE, COLORS } from './constants';

@Component({
  selector: 'app-charts.charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChartsComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  canvasSize = 600;

  paramA = new FormControl(2);
  paramB = new FormControl(-1);

  get formula() {
    const a = parseFloat(this.paramA.value);
    const b = parseFloat(this.paramB.value);

    return 'y = ' + `${!isNaN(a) ? a : 0}x ${!isNaN(b) ? b : 0}`
      .replace(/^0x\s/, '')
      .replace(/[0-9|.]+/g, ' $&')
      .replace(/x\s\s/g, 'x + ')
      .replace(/\s\+\s0$/g, '')
      .replace(/\s1x/g, ' x');
  }

  constructor() { }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

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
    const { ctx } = this;
    const { width, height } = ctx.canvas;
    const { paramA, paramB } = this;

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = COLORS.pencil;

    ctx.save();
    ctx.translate(width / 2, -height / 2);

    ctx.beginPath();
    ctx.moveTo(-width, height + width * paramA.value - paramB.value * CELL_SIZE);
    ctx.lineTo(width, height - width * paramA.value - paramB.value * CELL_SIZE);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

}
