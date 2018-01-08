import { Injectable } from '@angular/core';

enum KeyCodes {
  enter = 13,
  left = 37,
  up,
  right,
  down,
}

declare type AvalibleKeyName = keyof typeof KeyCodes;
type ControlKeys = {[P in AvalibleKeyName]?: BinBool};

@Injectable()
export class KeyboardControlService {
  keys: ControlKeys = {};
  speed = 1;

  static toAvalibleKeyName(keyCode: number) {
    return KeyCodes[keyCode] as AvalibleKeyName | void;
  }

  setKey(keyCode: AvalibleKeyName, value: any) {
    this.keys[keyCode] = toBinBool(value);

    if (!value && !this.isKeyPressed) {
      this.speed = 1;
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

  private _getAxisSum(positive = 0, negative = 0) {
    let movement = positive - negative;
    const sumOfKeyValues = Object.values(this.keys).filter(val => val).length;
    if (sumOfKeyValues !== positive + negative) {
      movement /= Math.SQRT2;
    }
    return movement * this.speed;
  }
}

function toBinBool(value: any): BinBool {
  return value ? 1 : 0;
}
