import { Directive, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';

const MIN_SIZE = 200;

@Directive({
  selector: '[appSizeByScroll]',
})
export class SizeByScrollDirective implements AfterViewInit, OnDestroy {

  initSize: number;
  container: HTMLElement;

  constructor(
    private el: ElementRef,
  ) { }

  ngAfterViewInit() {
    this.initSize = this.el.nativeElement.offsetHeight;
    this.container = this.el.nativeElement.parentElement.parentElement;
    this.container.addEventListener('scroll', this.listener.bind(this));
  }

  ngOnDestroy() {
    this.container.removeEventListener('scroll', this.listener.bind(this));
  }

  listener() {
    this.handler();
    setTimeout(() => this.handler(), 100);
  }

  handler() {
    const el: HTMLElement = this.el.nativeElement;
    const scrollTop = this.container.scrollTop - el.offsetTop;
    const p = scrollTop < this.initSize - MIN_SIZE
      ? 1 - scrollTop / this.initSize
      : MIN_SIZE / this.initSize;
    const d = (0.9 - p) * this.initSize;

    if (scrollTop > 10) {
      el.style.opacity = '0.82';
      el.style.transform = `scale(${p})
                            translate(${d}px, ${- d}px)`;
    }
    else el.style.transform = el.style.opacity = '';
  }

}
