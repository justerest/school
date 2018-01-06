import { Component, OnInit, Input } from '@angular/core';

import { Control } from '../models/control';

@Component({
  selector: 'app-canvas-control',
  templateUrl: './canvas-control.component.html',
  styleUrls: ['./canvas-control.component.scss'],
})
export class CanvasControlComponent implements OnInit {
  @Input()
  control: Control;

  ngOnInit() {
  }

  controlObserver(event: KeyboardEvent) {
    const avalibleKey = Control.toAvalibleKeyName(event.keyCode);
    if (!avalibleKey) return;
    event.preventDefault();

    const value = event.type === 'keydown';
    this.control.setKey(avalibleKey, value);

    const isAnyKeyPressed = (
      value || Object.values(this.control.keys).some(Boolean)
    );
    if (!isAnyKeyPressed) {
      this.control.speed = 1;
    }
  }
}
