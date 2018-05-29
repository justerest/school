import { getRandomInt } from 'utils/get-random-int';

import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { CanvasColors } from './canvas-colors.enum';
import { ChartTypes } from './chart-types.enum';
import { interval, Subscription } from 'rxjs';

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

  /** HTML-элемент холста */
  @ViewChild('canvas') canvas!: ElementRef;
  /** Плавающий HTML-элемент контейнера холста */
  @ViewChild('stickyContainer') stickyContainer!: ElementRef;
  /** Контекст, через который происходит рисование на холсте */
  ctx!: CanvasRenderingContext2D;

  /** Выбранная функция */
  chartType = ChartTypes.linear;
  /** `k`x^2 */
  power2 = this.getRandomK();
  /** `k`x */
  power1 = this.getRandomK();
  /** `c` */
  power0 = this.getRandomK();
  /** `k`/x */
  power_1 = this.getRandomK();

  /** Значение секундомера */
  timerValue = 0;
  /** Сообщение с оценкой */
  resultMessage = '';

  /** Временное хранилище коэффициентов тестового графика */
  private testParams: number[] = [];
  /** Время отсчёта в формате `int` */
  private timerInitDateValue = 0;
  /** Переменная для автозапускающейся функции обновления секундомера */
  private testTimer = new Subscription;

  constructor() {
    this.testTimer.unsubscribe();
  }

  /** Функция, запускающаяся после отображения HTML-элементов */
  ngAfterViewInit() {
    const canvasContext = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    if (!canvasContext) {
      throw new Error('CanvasRenderingContext2D is not found');
    }
    this.ctx = canvasContext;
    this.draw();
  }

  /** Отформатированная формула графика */
  get formula() {
    const [c, b, a, k] = this.params.map((power, i) => this.paramsFilter(i) ? power : 0);

    return 'y = ' + `${a}x<sup>2</sup> + ${b}x + ${c} + ${k}x<sup>-1</sup>`
      .replace(/(^|\+\s)-/g, '- ')
      .replace(/(^|\+\s)0(x|\s|$)(<sup>.?.<\/sup>)?\s?/g, '')
      .replace(/(^|\s)1x/g, ' x')
      .replace(/^\+\s/, '')
      .replace(/^$/, '0');
  }

  /** Короткое обращение ко всем параметрам */
  get params() {
    return [this.power0, this.power1, this.power2, this.power_1];
  }
  set params(arr: number[]) {
    [this.power0, this.power1, this.power2, this.power_1] = arr;
  }

  get isTestRunning() {
    return !this.testTimer.closed;
  }

  /** Главная функция отрисовки графиков */
  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    if (this.isTestRunning) {
      const isSuccessTest = this.params
        .every((param, i) => this.testParams[i] === param || !this.paramsFilter(i));
      if (isSuccessTest) {
        this.testTimer.unsubscribe();

        const paramsLength = this.params.filter((_, i) => this.paramsFilter(i)).length;
        const points = this.timerValue / paramsLength;
        this.resultMessage =
          points <= 10 ? 'Отлично!'
            : points <= 15 ? 'Хорошо!'
              : points <= 20 ? 'Удовлетворительно!'
                : 'Не сдал';
      }
      else {
        const tmpParams = this.params;

        this.timerInitDateValue -= 2000;
        this.params = this.testParams;
        this.drawChart(CanvasColors.orange);

        this.params = tmpParams;
      }
    }

    this.drawChart(CanvasColors.pencil);
  }

  /** Новое тестовое задание со случайными коэффициентами */
  test() {
    this.testParams = this.params.map(this.getRandomK);
    this.resultMessage = '';

    this.timerValue = 0;
    this.timerInitDateValue = new Date().valueOf();
    this.testTimer = interval(500).subscribe(() => {
      const dms = (new Date().valueOf() - this.timerInitDateValue) / 1000;
      this.timerValue = Math.floor(dms);
    });

    this.draw();
  }

  /**
   * Вспомогательная функция, позволяющая выбрать необходимые параметры из [allParams]{@link ChartsComponent#allParams}
   * в зависимости от выбранной функции [chartType]{@link ChartsComponent#chartType}
   */
  private paramsFilter(i: number) {
    return (
      this.chartType === ChartTypes.linear ? i === 0 || i === 1
        : this.chartType === ChartTypes.parabole ? i !== 3
          : this.chartType === ChartTypes.hyperbole && i === 3
    );
  }

  /** Отрисовка конкретного графика */
  private drawChart(color: string) {
    const { ctx } = this;
    const { width, height } = ctx.canvas;

    const mathFunc = (
      this.chartType === ChartTypes.hyperbole ? this[ChartTypes.hyperbole] :
        this.chartType === ChartTypes.parabole ? this[ChartTypes.parabole] :
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
    if (this.chartType === ChartTypes.hyperbole) {
      ctx.stroke();
      ctx.beginPath();
    }
    for (let x = 0; x < width / 2; x++) {
      ctx.lineTo(x, height - mathFunc(x));
    }
    ctx.stroke();

    ctx.restore();
  }

  /** Получение случайного параметра */
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

  /** Обработчик события прокрутки */
  @HostListener('scroll', ['$event.target'])
  onScroll(container: HTMLElement) {
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

}

