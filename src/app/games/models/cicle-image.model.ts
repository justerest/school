import { getRandomInt } from 'utils/get-random-int';
import { DrawedImage } from './drawed-image.model';
import { GameSpeed } from './game-speed.model';

export class CicleImage extends DrawedImage {

  globalSpeed!: GameSpeed;
  speed = getRandomInt(1, 3);

  constructor(params: Pick<CicleImage, 'ctx' | 'image' | 'globalSpeed'> & Partial<CicleImage>) {
    super(params);
    Object.assign(this, params);
  }

  move(dx = 0, dy = this.speed) {
    const windowHeight = this.ctx.canvas.height;

    if (this.points[0][1] >= windowHeight) {
      dy = -1.5 * windowHeight;
      this.speed = getRandomInt(1, 3) + this.globalSpeed.value;
    }

    this.points.forEach(axis => {
      axis[0] += dx;
      axis[1] += dy;
    });

    return this;
  }

}
