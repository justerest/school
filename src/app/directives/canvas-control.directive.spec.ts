import { ElementRef } from '@angular/core';

import { CanvasControlDirective } from './canvas-control.directive';

describe('CanvasControlDirective', () => {
  it('should create an instance', () => {
    const canvas = new ElementRef(document.createElement('canvas'));
    const directive = new CanvasControlDirective(canvas);
    expect(directive).toBeTruthy();
  });
});
