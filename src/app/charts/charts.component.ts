import { randomInt } from 'utils/random-int';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { ChartsService } from './charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  canvasSize = 600;
  incrementValue = 0.5;

  functionType: ('linear' | 'parabole') = 'linear';

  paramA = randomInt(-3, 3) || 1;
  paramB = randomInt(-3, 3);
  paramC = randomInt(-3, 3);

  get formula() {
    const a = this.functionType === 'linear'
      ? this.paramA || 0
      : this.paramB || 0;
    const b = this.functionType === 'linear'
      ? this.paramB || 0
      : this.paramC || 0;

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

  drawFunction() {
    const { ctx } = this;
    const { width, height } = ctx.canvas;
    const { COLORS } = this.service;
    const range = width / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = COLORS.pencil;

    ctx.save();
    ctx.translate(width / 2, -height / 2);

    ctx.beginPath();
    for (let x = -range; x < range; x++) {
      ctx.lineTo(x, height - this[this.functionType](x));
    }
    ctx.stroke();

    ctx.restore();
  }

  linear(x: number) {
    return x * this.paramA + this.paramB * this.service.cellSize;
  }

  parabole(x: number) {
    const { cellSize } = this.service;

    return Math.pow(x, 2) * this.paramA / cellSize + this.paramB * x + this.paramC * cellSize;
  }

}

