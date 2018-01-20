import { Directive, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';

const MIN_SIZE = 180;

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

    const scrollTop = window.scrollY - el.offsetTop - 150;
    const p = scrollTop < this.initSize - MIN_SIZE
      ? scrollTop / this.initSize
      : 1 - MIN_SIZE / this.initSize;

    if (scrollTop > 0) {
      el.style.opacity = '0.82';
      el.style.transform = `scale(${1 - p})
                        translate(${p * 80}%, -${p * 80}%)`;
    }
    else el.style.transform = el.style.opacity = '';
  }

}
