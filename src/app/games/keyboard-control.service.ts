import { Injectable } from '@angular/core';

import { KeyCodes, isInKeyCodes } from './key-codes.enum';

export * from './key-codes.enum';

@Injectable()
export class KeyboardControlService {

  /** Объект, содержащий состояние клавиш */
  keys: {[P in keyof typeof KeyCodes]?: 0 | 1} = {};

  setKey(keyCode: string | number, value: 0 | 1) {
    if (isInKeyCodes(keyCode)) {
      this.keys[KeyCodes[keyCode]] = value;
    }
    return this;
  }

  reset() {
    this.keys = {};

    return this;
  }

}
