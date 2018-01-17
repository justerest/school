import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ChartsService } from './charts.service';
import { randomInt } from 'utils/random-int';

@Component({
  selector: 'app-charts.charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  canvasSize = 600;

  paramA = new FormControl(randomInt(-3, 3) || 1);
  paramB = new FormControl(randomInt(-3, 3));
  paramC = new FormControl(randomInt(-3, 3));

  get formula() {
    const a = parseFloat(this.paramA.value) || 0;
    const b = parseFloat(this.paramB.value) || 0;

    return 'y = ' + `${a}x ${b}`
      .replace(/^0x\s/, '')
      .replace(/[0-9|.]+/g, ' $&')
      .replace(/x\s\s/g, 'x + ')
      .replace(/\s\+\s0$/g, '')
      .replace(/\s1x/g, ' x');
  }

  constructor(
    private service: ChartsService,
  ) { }

  ngAfterViewInit() {
    this.ctx = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
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
    this.paramB.setValue(this.paramB.value + 0.5);
    this.drawFunction();
  }
  decrementParamB() {
    this.paramB.setValue(this.paramB.value - 0.5);
    this.drawFunction();
  }

  drawFunction() {
    const { ctx } = this;
    const { width, height } = ctx.canvas;
    const { COLORS } = this.service;
    const range = width / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = COLORS.pencil;

    ctx.save();
    ctx.translate(width / 2, -height / 2);

    ctx.beginPath();
    for (let x = -range; x < range; x++) {
      ctx.lineTo(x, height - this._paraboleFunction(x));
    }
    ctx.stroke();

    ctx.restore();
  }

  private _linearFunction(x: number) {
    return x * this.paramA.value + this.paramB.value * this.service.cellSize;
  }

  private _paraboleFunction(x: number) {
    return Math.pow(x, 2) * this.paramA.value / this.service.cellSize + this.paramB.value * x;
  }

}

