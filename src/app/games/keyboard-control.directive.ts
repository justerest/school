import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

import { KeyboardControlService, isInKeyCodes } from './keyboard-control.service';

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
  controlObserver(event: KeyboardEvent) {
    if (isInKeyCodes(event.keyCode)) {
      event.preventDefault();
      this.kcKeypress.emit();
    }
    this.control.setKey(event.keyCode, event.type === 'keydown' ? 1 : 0);
  }

}
