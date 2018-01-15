import { Figure } from './figure';
import { Level } from './level';
import { randomInt } from 'app/shared/utils/random-int';

export class CicleFigure extends Figure {

  level: Level;
  speed = randomInt(3, 6);

  constructor(params: Params<CicleFigure, 'context' | 'level'>) {
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
