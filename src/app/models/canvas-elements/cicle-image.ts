import { DrawedImage, DrawedImageParams } from './drawed-image';

import { Level } from '~/models/level';
import { randomInt } from '~/utils/randomInt';

interface CicleImageParams extends DrawedImageParams {
  level: Level;
  speed: number;
}

export class CicleImage extends DrawedImage implements CicleImageParams {
  level: Level;
  speed: number = randomInt(3, 6);

  constructor(params: Params<CicleImageParams, 'context' | 'image' | 'level'>) {
    super(params);
    Object.assign(this, params);
  }

  move(dx = 0, dy = this.speed) {
    const windowHeight = this.context.canvas.height;
    if (this.points[0][1] >= windowHeight) {
      dy = -1.5 * windowHeight;
      this.speed = randomInt(3, 6) + this.level.value;
    }
    this.points.forEach(axis => {
      axis[0] += dx;
      axis[1] += dy;
    });
    return this;
  }
}
