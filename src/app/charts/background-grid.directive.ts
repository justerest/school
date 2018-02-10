import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

import { CanvasColors } from './canvas-colors.enum';

@Directive({
  selector: '[appBackgroundGrid]',
})
export class BackgroundGridDirective implements AfterViewInit {

  @Input() cellSize = 30;

  ctx = <CanvasRenderingContext2D>{};

  constructor(
    private el: ElementRef,
  ) { }

  ngAfterViewInit() {
    const canvasContext = (<HTMLCanvasElement>this.el.nativeElement).getContext('2d');
    if (!canvasContext) throw new Error('CanvasRenderingContext2D is not found');
    this.ctx = canvasContext;
    this.drawCells();
    this.drawAxis();
  }

  private drawCells() {
    this.ctx.lineWidth = 0.3;
    this.ctx.strokeStyle = CanvasColors.blue;

    this.ctx.beginPath();

    for (let i = this.cellSize; i < this.ctx.canvas.width; i += this.cellSize) {
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.ctx.canvas.height);
    }
    for (let i = this.cellSize; i < this.ctx.canvas.height; i += this.cellSize) {
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.ctx.canvas.width, i);
    }

    this.ctx.stroke();
  }

  private drawAxis() {
    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = CanvasColors.boldPencil;

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
    this.ctx.lineTo(this.ctx.canvas.width - this.cellSize / 2, this.ctx.canvas.height / 2 - this.cellSize / 2 / 2);
    this.ctx.moveTo(this.ctx.canvas.width, this.ctx.canvas.height / 2);
    this.ctx.lineTo(this.ctx.canvas.width - this.cellSize / 2, this.ctx.canvas.height / 2 + this.cellSize / 2 / 2);
  }

  private drawArrowY() {
    this.ctx.moveTo(this.ctx.canvas.width / 2, 0);
    this.ctx.lineTo(this.ctx.canvas.width / 2 - this.cellSize / 2 / 2, this.cellSize / 2);
    this.ctx.moveTo(this.ctx.canvas.width / 2, 0);
    this.ctx.lineTo(this.ctx.canvas.width / 2 + this.cellSize / 2 / 2, this.cellSize / 2);
  }

  private drawLittleLines() {
    this.ctx.moveTo(this.ctx.canvas.width / 2 + 2 * this.cellSize / 2, this.ctx.canvas.height / 2 - this.cellSize / 2 / 4);
    this.ctx.lineTo(this.ctx.canvas.width / 2 + 2 * this.cellSize / 2, this.ctx.canvas.height / 2 + this.cellSize / 2 / 4);
    this.ctx.moveTo(this.ctx.canvas.width / 2 - this.cellSize / 2 / 4, this.ctx.canvas.height / 2 - 2 * this.cellSize / 2);
    this.ctx.lineTo(this.ctx.canvas.width / 2 + this.cellSize / 2 / 4, this.ctx.canvas.height / 2 - 2 * this.cellSize / 2);
  }

  private drawSigns() {
    const CSZ = this.cellSize / 2;

    this.ctx.fillStyle = CanvasColors.darkBlue;
    this.ctx.font = 'italic 20px sans-serif';

    this.ctx.fillText('x', this.ctx.canvas.width - CSZ, this.ctx.canvas.height / 2 + 1.7 * CSZ, CSZ);
    this.ctx.fillText('y', this.ctx.canvas.width / 2 - 1.7 * CSZ, CSZ, CSZ);

    this.ctx.font = 'italic 14px sans-serif';

    this.ctx.fillText('0', this.ctx.canvas.width / 2 - CSZ, this.ctx.canvas.height / 2 + CSZ, CSZ);
    this.ctx.fillText('1', this.ctx.canvas.width / 2 + 1.7 * CSZ, this.ctx.canvas.height / 2 + CSZ, CSZ);
    this.ctx.fillText('1', this.ctx.canvas.width / 2 - CSZ, this.ctx.canvas.height / 2 - 1.7 * CSZ, CSZ);
  }

}
