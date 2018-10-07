import { Injectable } from '@angular/core';
import { getRandomInt } from 'utils/get-random-int';
import { MathFunction } from './math-function.enum';

enum Coefficient { k = -1, c, b, a }
type CoefficientRecord = Record<Coefficient, number>;

type DrawServiceParams = Partial<Pick<DrawService, 'ctx' | 'cellSize' | 'color'>>;

@Injectable()
export class DrawService {

  ctx!: CanvasRenderingContext2D;
  cellSize!: number;
  color!: string;

  chartType: MathFunction = MathFunction.linear;
  params: CoefficientRecord = this.getRandomParams();

  configure(params: DrawServiceParams): this {
    return Object.assign(this, params);
  }

  changeChartType(value: MathFunction): this {
    this.chartType = value;
    this.params = this.getRandomParams();
    return this;
  }

  draw(): this {
    const { ctx, chartType } = this;
    const { width, height } = ctx.canvas;
    const mathFunction = this[chartType].bind(this);

    ctx.save();

    ctx.translate(width / 2, -height / 2);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    for (let x = - width / 2; x < 0; x++) {
      ctx.lineTo(x, height - mathFunction(x));
    }
    if (chartType === MathFunction.hyperbole) {
      ctx.stroke();
      ctx.beginPath();
    }
    for (let x = 0; x < width / 2; x++) {
      ctx.lineTo(x, height - mathFunction(x));
    }
    ctx.stroke();

    ctx.restore();

    return this;
  }

  clear(): this {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    return this;
  }

  private getRandomParams(): CoefficientRecord {
    switch (this.chartType) {
      case MathFunction.linear:
        return {
          [-1]: 0,
          [0]: getRandomInt(-5, 5),
          [1]: getRandomInt(-5, 5),
          [2]: 0,
        };
      case MathFunction.parabole:
        return {
          [-1]: 0,
          [0]: getRandomInt(-5, 5),
          [1]: getRandomInt(-5, 5),
          [2]: getRandomInt(-5, 5),
        };
      case MathFunction.hyperbole:
        return {
          [-1]: getRandomInt(-5, 5),
          [0]: 0,
          [1]: 0,
          [2]: 0,
        };
    }
  }

  private [MathFunction.linear](x: number): number {
    return x * this.params['1'] + this.params['0'] * this.cellSize;
  }

  private [MathFunction.parabole](x: number): number {
    return Math.pow(x, 2) * this.params['2'] / this.cellSize + this[MathFunction.linear](x);
  }

  private [MathFunction.hyperbole](x: number): number {
    return this.params['-1'] / x * Math.pow(this.cellSize, 2);
  }

}
