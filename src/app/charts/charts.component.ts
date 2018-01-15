import { ChartsService } from './charts.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-charts.charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  canvasSize = 600;

  paramA = new FormControl(2);
  paramB = new FormControl(-1);

  get formula() {
    const a = parseFloat(this.paramA.value);
    const b = parseFloat(this.paramB.value);

    return 'y = ' + `${!isNaN(a) ? a : 0}x ${!isNaN(b) ? b : 0}`
      .replace(/^0x\s/, '')
      .replace(/[0-9|.]+/g, ' $&')
      .replace(/x\s\s/g, 'x + ')
      .replace(/\s\+\s0$/g, '')
      .replace(/\s1x/g, ' x');
  }

  constructor(
    private service: ChartsService,
  ) { }

  ngAfterViewInit() {
    this.ctx = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    this.drawFunction();
  }

  incrementParamA() {
    this.paramA.setValue(this.paramA.value + 0.5);
    this.drawFunction();
  }
  decrementParamA() {
    this.paramA.setValue(this.paramA.value - 0.5);
    this.drawFunction();
  }
  incrementParamB() {
    this.paramB.setValue(this.paramB.value + 0.5);
    this.drawFunction();
  }
  decrementParamB() {
    this.paramB.setValue(this.paramB.value - 0.5);
    this.drawFunction();
  }

  drawFunction() {
    const { ctx } = this;
    const { width, height } = ctx.canvas;
    const { paramA, paramB } = this;
    const { cellSize, COLORS } = this.service;

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = COLORS.pencil;

    ctx.save();
    ctx.translate(width / 2, -height / 2);

    ctx.beginPath();
    ctx.moveTo(-width, height + width * paramA.value - paramB.value * cellSize);
    ctx.lineTo(width, height - width * paramA.value - paramB.value * cellSize);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

}
