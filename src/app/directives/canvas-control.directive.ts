import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

import { KeyboardControlService } from '~/services/keyboard-control.service';

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
    const avalibleKey = KeyboardControlService.toAvalibleKeyName(event.keyCode);
    if (!avalibleKey) return;
    event.preventDefault();

    this.control.setKey(avalibleKey, event.type === 'keydown');
    this.ccKeypress.emit();
  }
}
