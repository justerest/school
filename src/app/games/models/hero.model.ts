import { toInt } from 'utils/to-int';

import { KeyboardControlService } from '../keyboard-control.service';
import { DrawedImage } from './drawed-image.model';
import { GameSpeed } from './game-speed.model';

export class HeroModel extends DrawedImage {

  /** Максимальное ускорение героя. */
  static ACCELERATION_MAX = 8;
  /** Ускорение героя за один шаг. */
  static ACCELERATION_STEP = 0.5;

  /** Разгон героя */
  acceleration = 1;

  accelerate(keys: KeyboardControlService['keys'], gameSpeed: GameSpeed) {
    const isAcceleration = (
      (this._getAxisSum(keys, 'x') || this._getAxisSum(keys, 'y')) &&
      this.acceleration - gameSpeed.value < HeroModel.ACCELERATION_MAX
    );
    if (isAcceleration) this.acceleration += HeroModel.ACCELERATION_STEP;
    else this.acceleration = 1;

    return this;
  }

  moveByControl(keys: KeyboardControlService['keys']) {
    this.move(this._getAxisSum(keys, 'x'), this._getAxisSum(keys, 'y'));

    return this;
  }

  private _getAxisSum(keys: KeyboardControlService['keys'], axis: 'x' | 'y' | 'z') {
    const dPlus = toInt(axis === 'x' ? keys.right : keys.down);
    const dMinus = toInt(axis === 'x' ? keys.left : keys.up);
    let movement = dPlus - dMinus;

    const sumOfKeyValues = Object.values(keys).filter(Boolean).length;
    if (sumOfKeyValues !== dPlus + dMinus) {
      movement /= Math.SQRT2;
    }

    return movement * this.acceleration;
  }

}