import { KeyboardControlDirective } from './keyboard-control.directive';

import { KeyboardControlService } from './keyboard-control.service';

describe('KeyboardControlDirective', () => {
  it('should create an instance', () => {
    const directive = new KeyboardControlDirective(new KeyboardControlService);
    expect(directive).toBeTruthy();
  });
});
