import { Injectable } from '@angular/core';

enum KeyCodes {
  enter = 13,
  left = 37,
  up,
  right,
  down,
}

declare type ControlledKey = keyof typeof KeyCodes;

type ControlledKeys = {[P in ControlledKey]?: 0 | 1};

export function isControlledKey(keyCode: string | number) {
  return Boolean(KeyCodes[keyCode]);
}

@Injectable()
export class KeyboardControlService {

  keys: ControlledKeys = {};
  speed = 1;

  setKey(keyCode: string | number, value: 0 | 1) {
    if (isControlledKey(keyCode)) {
      this.keys[KeyCodes[keyCode]] = value;
      if (!this.isKeyPressed) this.speed = 1;
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

  get isKeyPressed() {
    return Object.values(this.keys).some(Boolean);
  }

  private _getAxisSum(dPlus = 0, dMinus = 0) {
    let movement = dPlus - dMinus;
    const sumOfKeyValues = Object.values(this.keys).filter(Boolean).length;
    if (sumOfKeyValues !== dPlus + dMinus) {
      movement /= Math.SQRT2;
    }
    return movement * this.speed;
  }

}
