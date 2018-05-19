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

  /**
   * @param {TouchEvent} event BUG: Angular don't know TouchEvent class 
   */
  @HostListener('touchstart', ['$event'])
  onTouch(event: any) {
    const { clientX } = <Touch>event.changedTouches.item(0);

    event.keyCode = clientX > window.innerWidth / 2
      ? KeyCodes.right
      : KeyCodes.left;

    this.onKeyboardPress(event);
  }

  @HostListener('touchend')
  controlTouchEnd() {
    this.control.reset();
  }

}
