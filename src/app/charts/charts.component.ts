import { getRandomInt } from 'utils/get-random-int';

import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { CanvasColors } from './canvas-colors.enum';
import { ChartTypes } from './chart-types.enum';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements AfterViewInit {

  /** Размер одной клетки */
  readonly cellSize = 30;
  /** Размер холста */
  readonly canvasSize = 600;

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('stickyContainer') stickyContainer: ElementRef;
  ctx: CanvasRenderingContext2D;

  functionType = ChartTypes.linear;
  /** `k`x^2 */
  power2 = this.getRandomK();
  /** `k`x */
  power1 = this.getRandomK();
  /** `c` */
  power0 = this.getRandomK();
  /** `k`/x */
  power_1 = this.getRandomK();

  paramsStore: { tmp?: number[], test?: number[] } = {};

  timerValue = 0;
  timerInitDateValue = 0;
  timerInterval?: NodeJS.Timer;

  /** Message with mark */
  resultMessage?: string;

  ngAfterViewInit() {
    this.ctx = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    this.draw();
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

    if (scrollTop > 0 && window.innerWidth < 761) {
      el.style.opacity = '0.82';
      el.style.transform = `scale(${scale}) translate(${margin}px, ${-margin}px)`;
    }
    else el.style.transform = el.style.opacity = '';
  }

  get formula() {
    const [c, b, a, k] = this.allParams.map((power, i) => this.paramsFilter(i) ? power : 0);

    return 'y = ' + `${a}x<sup>2</sup> + ${b}x + ${c} + ${k}x<sup>-1</sup>`
      .replace(/(^|\+\s)-/g, '- ')
      .replace(/(^|\+\s)0(x|\s|$)(<sup>.?.<\/sup>)?\s?/g, '')
      .replace(/(^|\s)1x/g, ' x')
      .replace(/^\+\s/, '')
      .replace(/^$/, '0');
  }

  get allParams() {
    return [this.power0, this.power1, this.power2, this.power_1];
  }

  set allParams(arr: number[]) {
    [this.power0, this.power1, this.power2, this.power_1] = arr;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    if (this.paramsStore.test) {
      this.paramsStore.tmp = this.allParams;
      const isSuccessTest = this.paramsStore.tmp
        .every((param, i) => param === this.paramsStore.test[i] || !this.paramsFilter(i));

      if (isSuccessTest) {
        this.paramsStore.test = null;
        clearInterval(this.timerInterval);
        const paramsLength = this.allParams.filter((_, i) => this.paramsFilter(i)).length;
        this.resultMessage = (
          this.timerValue <= 10 * paramsLength ? 'Отлично!' :
            this.timerValue <= 15 * paramsLength ? 'Хорошо!' :
              this.timerValue <= 20 * paramsLength ? 'Удовлетворительно!' :
                'Не сдал'
        );
      }
      else {
        if (this.timerValue) this.timerInitDateValue -= 2000;
        this.allParams = this.paramsStore.test;
        this.drawChart(CanvasColors.orange);
        this.allParams = this.paramsStore.tmp;
      }
    }

    this.drawChart(CanvasColors.pencil);
  }

  setRandomParams() {
    this.paramsStore.test = this.allParams.map(this.getRandomK);

    this.resultMessage = null;
    this.timerInitDateValue = new Date().valueOf();
    this.timerValue = 0;
    this.timerInterval = setInterval(() => {
      const dms = (new Date().valueOf() - this.timerInitDateValue) / 1000;
      this.timerValue = Math.floor(dms);
    }, 500);

    this.draw();
  }

  private paramsFilter(i: number) {
    return (
      this.functionType === ChartTypes.linear ? i === 0 || i === 1 :
        this.functionType === ChartTypes.parabole ? i !== 3 :
          this.functionType === ChartTypes.hyperbole && i === 3
    );
  }

  private drawChart(color: string) {
    const { ctx } = this;
    const { width, height } = ctx.canvas;

    const mathFunc = (
      this.functionType === ChartTypes.hyperbole ? this[ChartTypes.hyperbole] :
        this.functionType === ChartTypes.parabole ? this[ChartTypes.parabole] :
          this[ChartTypes.linear]
    ).bind(this);

    ctx.save();

    ctx.translate(width / 2, -height / 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    for (let x = - width / 2; x < 0; x++) {
      ctx.lineTo(x, height - mathFunc(x));
    }
    if (this.functionType === ChartTypes.hyperbole) {
      ctx.stroke();
      ctx.beginPath();
    }
    for (let x = 0; x < width / 2; x++) {
      ctx.lineTo(x, height - mathFunc(x));
    }
    ctx.stroke();

    ctx.restore();
  }

  private getRandomK() {
    return getRandomInt(-5, 5);
  }

  private [ChartTypes.linear](x: number) {
    return x * this.power1 + this.power0 * this.cellSize;
  }

  private [ChartTypes.parabole](x: number) {
    return Math.pow(x, 2) * this.power2 / this.cellSize + this[ChartTypes.linear](x);
  }

  private [ChartTypes.hyperbole](x: number) {
    return this.power_1 / x * Math.pow(this.cellSize, 2);
  }

}

