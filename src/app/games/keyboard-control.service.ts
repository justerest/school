import { Injectable } from '@angular/core';

import { KeyCodes, isInKeyCodes } from './key-codes.enum';

export * from './key-codes.enum';

@Injectable()
export class KeyboardControlService {

  /** Объект, содержащий состояние клавиш */
  keys: {[P in keyof typeof KeyCodes]?: 0 | 1} = {};

  /** Чувствительность нажатий */
  touchAcceleration = 1;

  get isKeyPressed() {
    return Object.values(this.keys).some(Boolean);
  }

  setKey(keyCode: string | number, value: 0 | 1) {
    if (isInKeyCodes(keyCode)) {
      this.keys[KeyCodes[keyCode]] = value;
      if (!this.isKeyPressed) this.touchAcceleration = 1;
    }
    return this;
  }

  reset() {
    Object.assign(this, new KeyboardControlService);
    return this;
  }

  get dx() {
    return this._getAxisSum(this.keys.right, this.keys.left);
  }

  get dy() {
    return this._getAxisSum(this.keys.down, this.keys.up);
  }

  private _getAxisSum(dPlus = 0, dMinus = 0) {
    let movement = dPlus - dMinus;
    const sumOfKeyValues = Object.values(this.keys).filter(Boolean).length;
    if (sumOfKeyValues !== dPlus + dMinus) {
      movement /= Math.SQRT2;
    }
    return movement * this.touchAcceleration;
  }

}
