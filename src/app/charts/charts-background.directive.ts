import { AfterViewInit, Directive, ElementRef } from '@angular/core';

import { CELL_SIZE, COLORS } from './constants';

@Directive({
  selector: '[appChartsBackground]',
})
export class ChartsBackgroundDirective implements AfterViewInit {

  ctx: CanvasRenderingContext2D;

  constructor(
    private el: ElementRef,
  ) { }

  ngAfterViewInit() {
    this.ctx = this.el.nativeElement.getContext('2d');
    this.drawCells();
    this.drawAxis();
  }

  private drawCells() {
    this.ctx.lineWidth = 0.3;
    this.ctx.strokeStyle = COLORS.blue;

    this.ctx.beginPath();

    for (let i = CELL_SIZE; i < this.ctx.canvas.width; i += CELL_SIZE) {
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.ctx.canvas.height);
    }
    for (let i = CELL_SIZE; i < this.ctx.canvas.height; i += CELL_SIZE) {
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.ctx.canvas.width, i);
    }

    this.ctx.stroke();
  }

  private drawAxis() {
    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = COLORS.boldPencil;

    this.ctx.beginPath();
    this.ctx.moveTo(this.ctx.canvas.width / 2, 0);
    this.ctx.lineTo(this.ctx.canvas.width / 2, this.ctx.canvas.height);
    this.ctx.moveTo(0, this.ctx.canvas.height / 2);
    this.ctx.lineTo(this.ctx.canvas.width, this.ctx.canvas.height / 2);

    this.drawArrowX();
    this.drawArrowY();
    this.drawLittleLines();
    this.drawSigns();

    this.ctx.stroke();
  }

  private drawArrowX() {
    this.ctx.moveTo(this.ctx.canvas.width, this.ctx.canvas.height / 2);
    this.ctx.lineTo(this.ctx.canvas.width - CELL_SIZE / 2, this.ctx.canvas.height / 2 - CELL_SIZE / 2 / 2);
    this.ctx.moveTo(this.ctx.canvas.width, this.ctx.canvas.height / 2);
    this.ctx.lineTo(this.ctx.canvas.width - CELL_SIZE / 2, this.ctx.canvas.height / 2 + CELL_SIZE / 2 / 2);
  }

  private drawArrowY() {
    this.ctx.moveTo(this.ctx.canvas.width / 2, 0);
    this.ctx.lineTo(this.ctx.canvas.width / 2 - CELL_SIZE / 2 / 2, CELL_SIZE / 2);
    this.ctx.moveTo(this.ctx.canvas.width / 2, 0);
    this.ctx.lineTo(this.ctx.canvas.width / 2 + CELL_SIZE / 2 / 2, CELL_SIZE / 2);
  }

  private drawLittleLines() {
    this.ctx.moveTo(this.ctx.canvas.width / 2 + 2 * CELL_SIZE / 2, this.ctx.canvas.height / 2 - CELL_SIZE / 2 / 4);
    this.ctx.lineTo(this.ctx.canvas.width / 2 + 2 * CELL_SIZE / 2, this.ctx.canvas.height / 2 + CELL_SIZE / 2 / 4);
    this.ctx.moveTo(this.ctx.canvas.width / 2 - CELL_SIZE / 2 / 4, this.ctx.canvas.height / 2 - 2 * CELL_SIZE / 2);
    this.ctx.lineTo(this.ctx.canvas.width / 2 + CELL_SIZE / 2 / 4, this.ctx.canvas.height / 2 - 2 * CELL_SIZE / 2);
  }

  private drawSigns() {
    const CSZ = CELL_SIZE / 2;

    this.ctx.fillStyle = COLORS.darkBlue;
    this.ctx.font = 'italic 20px sans-serif';

    this.ctx.fillText('x', this.ctx.canvas.width - CSZ, this.ctx.canvas.height / 2 + 1.7 * CSZ, CSZ);
    this.ctx.fillText('y', this.ctx.canvas.width / 2 - 1.7 * CSZ, CSZ, CSZ);

    this.ctx.font = 'italic 14px sans-serif';

    this.ctx.fillText('0', this.ctx.canvas.width / 2 - CSZ, this.ctx.canvas.height / 2 + CSZ, CSZ);
    this.ctx.fillText('1', this.ctx.canvas.width / 2 + 1.7 * CSZ, this.ctx.canvas.height / 2 + CSZ, CSZ);
    this.ctx.fillText('1', this.ctx.canvas.width / 2 - CSZ, this.ctx.canvas.height / 2 - 1.7 * CSZ, CSZ);
  }

}
