import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

import { KeyboardControlService, isControlledKey } from 'app/services/keyboard-control.service';

@Directive({
  selector: '[appCanvasControl]',
})
export class CanvasControlDirective {
  @Output() ccKeypress = new EventEmitter();

  constructor(
    private control: KeyboardControlService
  ) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this._controlObserver(event);
  }
  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    this._controlObserver(event);
  }

  private _controlObserver(event: KeyboardEvent) {
    if (isControlledKey(event.keyCode)) {
      event.preventDefault();
      this.ccKeypress.emit();
    }
    this.control.setKey(event.keyCode, event.type === 'keydown' ? 1 : 0);
  }
}
