import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CanvasColor } from './canvas-color.enum';
import { DrawService } from './draw.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, AfterViewInit {

  readonly canvasSize = 600;

  /** HTML-элемент холста */
  @ViewChild('canvas') canvas!: ElementRef;
  /** Плавающий HTML-элемент контейнера холста */
  @ViewChild('stickyContainer') stickyContainer!: ElementRef;

  formula: string = this.getFormatedFormula();

  constructor(
    public drawService: DrawService,
  ) { }

  ngOnInit(): void {
    this.drawService.configure({
      cellSize: 30,
      color: CanvasColor.pencil,
    });
  }

  ngAfterViewInit(): void {
    const canvasContext = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    if (!canvasContext) {
      throw new Error('CanvasRenderingContext2D is not found');
    }
    this.drawService.configure({ ctx: canvasContext });
    this.draw();
  }

  draw(): void {
    this.drawService.clear().draw();
    this.formula = this.getFormatedFormula();
  }

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

  private getFormatedFormula(): string {
    const a = this.drawService.params[2];
    const b = this.drawService.params[1];
    const c = this.drawService.params[0];
    const k = this.drawService.params[-1];

    return 'y = ' + `${a}x<sup>2</sup> + ${b}x + ${c} + ${k}x<sup>-1</sup>`
      .replace(/(^|\+\s)-/g, '- ')
      .replace(/(^|\+\s)0(x|\s|$)(<sup>.?.<\/sup>)?\s?/g, '')
      .replace(/(^|\s)1x/g, ' x')
      .replace(/^\+\s/, '')
      .replace(/^$/, '0');
  }

}
