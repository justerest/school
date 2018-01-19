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

  functionType: ('linear' | 'parabole') = 'linear';

  /** x^2 */
  power2 = randomInt(-3, 3) || 1;
  /** x */
  power1 = randomInt(-3, 3) || 1;
  /** c */
  power0 = randomInt(-3, 3) || 1;

  get formula() {
    const a = this.functionType === 'parabole' ? this.power2 : 0;

    return 'y = ' + `${a}x<sup>2</sup> + ${this.power1}x + ${this.power0}`
      .replace('+ -', '- ')
      .replace(/(.\s)?0x?(<sup>2<\/sup>)?\s?/g, '')
      .replace(/1x/g, 'x')
      .replace(/^\+\s/, '')
      .replace(/^$/, '0');
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
    return x * this.power1 + this.power0 * this.service.cellSize;
  }

  parabole(x: number) {
    const { cellSize } = this.service;

    return Math.pow(x, 2) * this.power2 / cellSize + this.power1 * x + this.power0 * cellSize;
  }

}

