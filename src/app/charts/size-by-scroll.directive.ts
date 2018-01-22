import { Directive, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';

const MIN_SIZE = 200;

@Directive({
  selector: '[appSizeByScroll]',
})
export class SizeByScrollDirective implements AfterViewInit, OnDestroy {

  initSize: number;

  constructor(
    private el: ElementRef,
  ) { }

  ngAfterViewInit() {
    this.initSize = this.el.nativeElement.offsetHeight;
    window.addEventListener('scroll', this.listener.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.listener.bind(this));
  }

  listener() {
    this.handler();
    setTimeout(() => this.handler(), 100);
  }

  handler() {
    const el: HTMLElement = this.el.nativeElement;
    const scrollTop = window.scrollY - el.offsetTop - 50;
    const p = scrollTop < this.initSize - MIN_SIZE
      ? 1 - scrollTop / this.initSize
      : MIN_SIZE / this.initSize;
    const d = (0.9 - p) * this.initSize;

    if (scrollTop > 0) {
      el.style.opacity = '0.82';
      el.style.transform = `scale(${p})
                            translate(${d}px, -${d}px)`;
    }
    else el.style.transform = el.style.opacity = '';
  }

}
