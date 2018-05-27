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

  /** Хранилище коэффициентов */
  paramsStore: {
    /** Временное хранилище текущих коэффициентов */
    tmp?: number[],
    /** Временное хранилище коэффициентов тестового графика */
    test?: number[],
  } = {};

  /** Значение секундомера */
  timerValue = 0;
  /** Время отсчёта в формате `int` */
  timerInitDateValue = 0;
  /** Переменная для автозапускающейся функции обновления секундомера */
  timerInterval?: NodeJS.Timer;

  /** Сообщение с оценкой */
  resultMessage?: string;

  constructor() { }

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
    const [c, b, a, k] = this.allParams.map((power, i) => this.paramsFilter(i) ? power : 0);

    return 'y = ' + `${a}x<sup>2</sup> + ${b}x + ${c} + ${k}x<sup>-1</sup>`
      .replace(/(^|\+\s)-/g, '- ')
      .replace(/(^|\+\s)0(x|\s|$)(<sup>.?.<\/sup>)?\s?/g, '')
      .replace(/(^|\s)1x/g, ' x')
      .replace(/^\+\s/, '')
      .replace(/^$/, '0');
  }

  /** Короткое обращение ко всем параметрам */
  get allParams() {
    return [this.power0, this.power1, this.power2, this.power_1];
  }
  set allParams(arr: number[]) {
    [this.power0, this.power1, this.power2, this.power_1] = arr;
  }

  /** Главная функция отрисовки графиков */
  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    if (this.paramsStore.test) {
      this.paramsStore.tmp = this.allParams;
      const isSuccessTest = this.paramsStore.tmp
        .every((param, i) => (
          this.paramsStore.test && this.paramsStore.test[i] === param
          || !this.paramsFilter(i)
        ));

      if (isSuccessTest) {
        this.paramsStore.test = undefined;
        clearInterval(<NodeJS.Timer>this.timerInterval);
        const paramsLength = this.allParams.filter((_, i) => this.paramsFilter(i)).length;
        this.resultMessage = (
          this.timerValue <= 10 * paramsLength
            ? 'Отлично!'
            : this.timerValue <= 15 * paramsLength
              ? 'Хорошо!'
              : this.timerValue <= 20 * paramsLength
                ? 'Удовлетворительно!'
                : 'Не сдал'
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

  /** Новое тестовое задание со случайными коэффициентами */
  runTest() {
    this.paramsStore.test = this.allParams.map(this.getRandomK);

    this.resultMessage = undefined;
    this.timerInitDateValue = new Date().valueOf();
    this.timerValue = 0;
    this.timerInterval = setInterval(() => {
      const dms = (new Date().valueOf() - this.timerInitDateValue) / 1000;
      this.timerValue = Math.floor(dms);
    }, 500);

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

