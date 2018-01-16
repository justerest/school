import { randomInt } from 'utils/random-int';

import { DrawedImage } from './drawed-image.model';
import { GameSpeed } from './game-speed.model';

export class CicleImage extends DrawedImage {

  globalSpeed: GameSpeed;
  speed = randomInt(3, 6);

  constructor(params: Params<CicleImage, 'ctx' | 'image' | 'globalSpeed'>) {
    super(params);
    Object.assign(this, params);
  }

  move(dx = 0, dy = this.speed) {
    const windowHeight = this.ctx.canvas.height;
    if (this.points[0][1] >= windowHeight) {
      dy = -1.5 * windowHeight;
      this.speed = randomInt(3, 6) + this.globalSpeed.value;
    }
    this.points.forEach(axis => {
      axis[0] += dx;
      axis[1] += dy;
    });
    return this;
  }

}
