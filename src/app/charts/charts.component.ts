import { Component, HostListener, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';

const CELL_SIZE = 20;
const COLORS = {
  darkBlue: '#000aff',
  blue: '#009bff',
  boldPencil: '#505050',
  pencil: '#737373',
};

@Component({
  selector: 'app-charts.charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChartsComponent implements OnInit {

  context: CanvasRenderingContext2D;

  paramA = 2;
  paramB = 1;

  constructor(
    private el: ElementRef,
  ) { }

  get formula() {
    return `y = ${writeMember(this.paramA, true)}x ${writeMember(this.paramB)}`;
  }

  ngOnInit() {
    this.context = this.el.nativeElement
      .querySelector('canvas')
      .getContext('2d');
    this.init();
  }

  @HostListener('click', ['$event'])
  init() {
    this.drawCells();
    this.drawFunction(this.paramA, this.paramB);
  }

  incrementParamA() {
    this.paramA += 0.5;
  }
  decrementParamA() {
    this.paramA -= 0.5;
  }
  incrementParamB() {
    this.paramB++;
  }
  decrementParamB() {
    this.paramB--;
  }

  drawCells() {
    const { context } = this;
    const { canvas } = context;

    context.clearRect(0, 0, canvas.width, canvas.height);

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

  drawFunction(a: number, b: number) {
    const { context } = this;
    const { canvas } = context;

    context.lineWidth = 1;
    context.strokeStyle = COLORS.pencil;

    context.translate(canvas.width / 2, -canvas.height / 2);
    context.beginPath();
    context.moveTo(-canvas.width, canvas.height + canvas.width * a - b * CELL_SIZE);
    context.lineTo(canvas.width, canvas.height - canvas.width * a - b * CELL_SIZE);
    context.closePath();
    context.stroke();
    context.translate(-canvas.width / 2, canvas.height / 2);
  }

}

function writeMember(number: number, isWithoutPlus = false) {
  let res = '';

  if (number >= 0 && !isWithoutPlus) {
    res = '+ ';
  }
  if (number < 0) {
    res = '- ';
  }

  return res + Math.abs(number);
}
