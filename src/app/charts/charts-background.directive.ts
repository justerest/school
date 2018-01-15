import { ChartsService } from './charts.service';
import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appChartsBackground]',
})
export class ChartsBackgroundDirective implements AfterViewInit {

  ctx: CanvasRenderingContext2D;

  constructor(
    private el: ElementRef,
    private service: ChartsService,
  ) { }

  ngAfterViewInit() {
    this.ctx = this.el.nativeElement.getContext('2d');
    this.drawCells();
    this.drawAxis();
    this.drawSigns();
  }

  drawCells() {
    const { ctx } = this;
    const { width, height } = ctx.canvas;
    const CSZ = this.service.cellSize / this.service.scale;

    ctx.lineWidth = 0.3;
    ctx.strokeStyle = this.service.COLORS.blue;

    ctx.beginPath();

    for (let i = CSZ; i < width; i += CSZ) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
    }
    for (let i = CSZ; i < height; i += CSZ) {
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
    }

    ctx.stroke();
  }

  drawAxis() {
    const { ctx } = this;
    const { width, height } = ctx.canvas;
    const CSZ = this.service.cellSize / this.service.scale;

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = this.service.COLORS.boldPencil;

    ctx.beginPath();

    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);

    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2 - CSZ / 2, CSZ);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2 + CSZ / 2, CSZ);

    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);

    ctx.moveTo(width, height / 2);
    ctx.lineTo(width - CSZ, height / 2 - CSZ / 2);
    ctx.moveTo(width, height / 2);
    ctx.lineTo(width - CSZ, height / 2 + CSZ / 2);

    ctx.moveTo(width / 2 + 2 * CSZ, height / 2 - CSZ / 4);
    ctx.lineTo(width / 2 + 2 * CSZ, height / 2 + CSZ / 4);

    ctx.moveTo(width / 2 - CSZ / 4, height / 2 - 2 * CSZ);
    ctx.lineTo(width / 2 + CSZ / 4, height / 2 - 2 * CSZ);

    ctx.stroke();
  }

  drawSigns() {
    const { ctx } = this;
    const { width, height } = ctx.canvas;
    const CSZ = this.service.cellSize / 2;

    ctx.fillStyle = this.service.COLORS.darkBlue;
    ctx.font = 'italic 20px sans-serif';

    ctx.fillText('x', width - CSZ, height / 2 + CSZ, CSZ);
    ctx.fillText('y', width / 2 - CSZ, CSZ, CSZ);

    ctx.font = 'italic 14px sans-serif';

    ctx.fillText('0', width / 2 - CSZ / 2, height / 2 + CSZ, CSZ);
    ctx.fillText('1', width / 2 + 2 * CSZ, height / 2 + CSZ, CSZ);
    ctx.fillText('1', width / 2 - CSZ / 2, height / 2 - 2 * CSZ, CSZ);
  }

}
