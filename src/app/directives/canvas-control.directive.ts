import { Directive, Input, ElementRef, HostListener, OnInit } from '@angular/core';

import { Control } from '~/models/control';

@Directive({
  selector: '[appCanvasControl]',
})
export class CanvasControlDirective implements OnInit {
  @Input() control: Control;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    if (this.el.nativeElement.tagName !== 'CANVAS') {
      throw new Error('CanvasControl only for canvas element.');
    }
    if (!this.control) {
      throw new Error('Control attribute is required.');
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this._controlObserver(event);
  }
  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    this._controlObserver(event);
  }

  private _controlObserver(event: KeyboardEvent) {
    const avalibleKey = Control.toAvalibleKeyName(event.keyCode);
    if (!avalibleKey) return;
    event.preventDefault();

    const value = event.type === 'keydown';
    this.control.setKey(avalibleKey, value);
  }
}
