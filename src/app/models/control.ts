const SQRT_2 = Math.sqrt(2);

enum KeyCodes {
  left = 37,
  up,
  right,
  down,
}

declare type AvalibleKeyName = keyof typeof KeyCodes;
type ControlKeys = {[P in AvalibleKeyName]?: BinBool};

interface ControlParams {
  keys: ControlKeys;
  speed: number;
}

export class Control implements ControlParams {
  keys: ControlParams['keys'] = {};
  speed: ControlParams['speed'] = 1;

  static toAvalibleKeyName(keyCode: number) {
    return KeyCodes[keyCode] as AvalibleKeyName | void;
  }

  constructor(params?: Params<ControlParams>) {
    Object.assign(this, params);
  }

  setKey(keyCode: AvalibleKeyName, value: any) {
    this.keys[keyCode] = toBinBool(value);
  }

  get dx(): number {
    return this._getAxisSum(this.keys.right, this.keys.left);
  }

  get dy(): number {
    return this._getAxisSum(this.keys.down, this.keys.up);
  }

  private _getAxisSum(positive = 0, negative = 0) {
    let movement = positive - negative;
    const sumOfKeyValues = Object.values(this.keys).filter(val => val).length;
    if (sumOfKeyValues !== positive + negative) {
      movement /= SQRT_2;
    }
    return movement * this.speed;
  }
}

function toBinBool(value: any): BinBool {
  return value ? 1 : 0;
}
