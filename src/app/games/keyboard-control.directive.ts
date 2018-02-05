import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

import { KeyCodes, KeyboardControlService, isInKeyCodes } from './keyboard-control.service';

@Directive({
  selector: '[appKeyboardControl]',
})
export class KeyboardControlDirective {

  @Output() kcKeypress = new EventEmitter();

  constructor(
    private control: KeyboardControlService,
  ) { }

  @HostListener('keydown', ['$event'])
  @HostListener('keyup', ['$event'])
  onKeyboardPress(event: KeyboardEvent) {
    if (isInKeyCodes(event.keyCode)) {
      event.preventDefault();
      this.kcKeypress.emit();
    }
    this.control.setKey(event.keyCode, event.type === 'keyup' ? 0 : 1);
  }

  @HostListener('touchstart', ['$event'])
  onTouch(event: TouchEvent) {
    const { clientX } = event.changedTouches.item(0);

    if (clientX > window.innerWidth / 2) {
      (<any>event).keyCode = KeyCodes.right;
    }
    if (clientX < window.innerWidth / 2) {
      (<any>event).keyCode = KeyCodes.left;
    }

    this.onKeyboardPress(<KeyboardEvent><any>event);
  }

  @HostListener('touchend')
  controlTouchEnd() {
    this.control.reset();
  }

}
