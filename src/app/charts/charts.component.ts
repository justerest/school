import { randomInt } from 'utils/random-int';

import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

import { ChartsService } from './charts.service';
import { SupportedFunction, SupportedFunctions } from './supported-functions.enum';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChartsComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  canvasSize = 600;

  functionType: SupportedFunction = <SupportedFunction>SupportedFunctions[randomInt(0, 2)];

  /** `k`x^2 */
  power2 = randomInt(-3, 3) || 1;
  /** `k`x */
  power1 = randomInt(-3, 3) || 1;
  /** `c` */
  power0 = randomInt(-3, 3) || 1;
  /** `k`/x */
  power_1 = randomInt(-3, 3) || 1;

  get formula() {
    let a, b, c, k;

    if (this.functionType === 'hyperbole') {
      k = this.power_1;
    }
    else {
      if (this.functionType === 'parabole') a = this.power2;
      b = this.power1;
      c = this.power0;
    }

    return 'y = ' + `${a || 0}x<sup>2</sup> + ${b || 0}x + ${c || 0} + ${k || 0}x<sup>-1</sup>`
      .replace(/(^|\+\s)-/g, '- ')
      .replace(/(^|\+\s)0(x|\s|$)(<sup>.?.<\/sup>)?\s?/g, '')
      .replace(/(^|\s)1x/g, ' x')
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

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.service.COLORS.pencil;

    ctx.save();
    ctx.translate(width / 2, -height / 2);

    ctx.beginPath();
    if (this.functionType === 'hyperbole') {
      for (let x = -width / 2; x < 0; x++) {
        ctx.lineTo(x, height - this[this.functionType](x));
      }
      ctx.stroke();
      ctx.beginPath();
      for (let x = 0; x < width / 2; x++) {
        ctx.lineTo(x, height - this[this.functionType](x));
      }
    }
    else {
      for (let x = -width / 2; x < width / 2; x++) {
        ctx.lineTo(x, height - this[this.functionType](x));
      }
    }
    ctx.stroke();

    ctx.restore();
  }

  linear(x: number) {
    return x * this.power1 + this.power0 * this.service.cellSize;
  }

  parabole(x: number) {
    return Math.pow(x, 2) * this.power2 / this.service.cellSize + this.linear(x);
  }

  hyperbole(x: number) {
    return this.power_1 / x * Math.pow(this.service.cellSize, 2);
  }

  log(ev) {
    console.log(ev);
  }

}

