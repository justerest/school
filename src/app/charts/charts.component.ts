import { } from '@angular/core/src/metadata/directives';

import { getRandomInt } from 'utils/get-random-int';

import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { ChartsService } from './charts.service';
import { SupportedFunction, SupportedFunctions } from './supported-functions.enum';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('stickyContainer') stickyContainer: ElementRef;
  ctx: CanvasRenderingContext2D;

  canvasSize = 600;

  functionType: SupportedFunction = <SupportedFunction>SupportedFunctions[getRandomInt(0, 2)];

  /** `k`x^2 */
  power2 = getRandomInt(-3, 3) || 1;
  /** `k`x */
  power1 = getRandomInt(-3, 3) || 1;
  /** `c` */
  power0 = getRandomInt(-3, 3) || 1;
  /** `k`/x */
  power_1 = getRandomInt(-3, 3) || 1;

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

  @HostListener('scroll', ['$event.target'])
  handler(container: HTMLElement) {
    const el: HTMLElement = this.stickyContainer.nativeElement;
    const scrollTop = container.scrollTop - el.offsetTop;
    const minSize = window.innerWidth / 2.5;

    const scale = scrollTop < container.offsetWidth - minSize
      ? 1 - scrollTop / container.offsetWidth
      : minSize / container.offsetWidth;

    const margin = 2 * Math.pow(1 - scale, 2) * container.offsetWidth;

    if (scrollTop > 0) {
      el.style.opacity = '0.82';
      el.style.transform = `scale(${scale}) translate(${margin}px, ${-margin}px)`;
    }
    else el.style.transform = el.style.opacity = '';
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

}

