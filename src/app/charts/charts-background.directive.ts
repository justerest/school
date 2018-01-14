import { Directive, ElementRef, AfterViewInit } from '@angular/core';

import { CELL_SIZE, COLORS } from './constants';

@Directive({
  selector: '[appChartsBackground]',
})
export class ChartsBackgroundDirective implements AfterViewInit {

  context: CanvasRenderingContext2D;

  constructor(
    private el: ElementRef,
  ) { }

  ngAfterViewInit() {
    this.context = this.el.nativeElement.getContext('2d');
    this.init();
  }

  init() {
    const { context } = this;
    const { canvas } = context;

    context.lineWidth = 0.3;
    context.strokeStyle = COLORS.blue;

    context.beginPath();
    for (let i = CELL_SIZE; i < canvas.width; i += CELL_SIZE) {
      context.moveTo(i, 0);
      context.lineTo(i, canvas.height);
    }
    for (let i = CELL_SIZE; i < canvas.height; i += CELL_SIZE) {
      context.moveTo(0, i);
      context.lineTo(canvas.width, i);
    }
    context.stroke();

    context.lineWidth = 0.5;
    context.strokeStyle = COLORS.boldPencil;

    context.beginPath();

    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);

    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2 - CELL_SIZE / 2, CELL_SIZE);
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2 + CELL_SIZE / 2, CELL_SIZE);

    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);

    context.moveTo(canvas.width, canvas.height / 2);
    context.lineTo(canvas.width - CELL_SIZE, canvas.height / 2 - CELL_SIZE / 2);
    context.moveTo(canvas.width, canvas.height / 2);
    context.lineTo(canvas.width - CELL_SIZE, canvas.height / 2 + CELL_SIZE / 2);

    context.moveTo(canvas.width / 2 + CELL_SIZE, canvas.height / 2 - CELL_SIZE / 4);
    context.lineTo(canvas.width / 2 + CELL_SIZE, canvas.height / 2 + CELL_SIZE / 4);

    context.moveTo(canvas.width / 2 - CELL_SIZE / 4, canvas.height / 2 - CELL_SIZE);
    context.lineTo(canvas.width / 2 + CELL_SIZE / 4, canvas.height / 2 - CELL_SIZE);

    context.stroke();

    context.fillStyle = COLORS.darkBlue;
    context.font = 'italic 20px sans-serif';

    context.fillText('x', canvas.width - CELL_SIZE, canvas.height / 2 + CELL_SIZE, CELL_SIZE);
    context.fillText('y', canvas.width / 2 - CELL_SIZE, CELL_SIZE, CELL_SIZE);

    context.font = 'italic 14px sans-serif';

    context.fillText('0', canvas.width / 2 - CELL_SIZE / 2, canvas.height / 2 + CELL_SIZE, CELL_SIZE);
    context.fillText('1', canvas.width / 2 + CELL_SIZE, canvas.height / 2 + CELL_SIZE, CELL_SIZE);
    context.fillText('1', canvas.width / 2 - CELL_SIZE / 2, canvas.height / 2 - CELL_SIZE / 2, CELL_SIZE);
  }
}
