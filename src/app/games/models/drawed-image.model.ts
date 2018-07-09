import { getRandomInt } from 'utils/get-random-int';

import { Figure } from './figure.model';

const WHITE_RGB = [255, 255, 255]; // IDEA: also check pixels on an another color background

export class DrawedImage extends Figure {

  image!: HTMLImageElement;
  animationFrequency = 100;
  destroyable = false;
  intermediate = false;
  spritesCount = 1;

  private colorPoints: number[][] = [];
  private someColorPointsOffset = 0;
  private someColorPointsStep = 0;
  private spritePos: number;
  private spritePosFromEnd = false;

  constructor(params: Pick<DrawedImage, 'ctx' | 'image'> & Partial<DrawedImage>) {
    super(params);
    Object.assign(this, params);

    const imageWidth = this.image.naturalWidth;
    const imageHeight = this.image.naturalHeight / this.spritesCount;

    this.points = [
      [0, 0],
      [imageWidth, imageHeight],
    ];
    this.spritePos = getRandomInt(0, this.spritesCount - 1);

    if (this.destroyable) {
      // REVIEW: auto get all perimeter pixels of the image
      // FIXME: don't work for pixels with an alpha channel
      // FIXME: don't work for sprites

      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(0, 0, imageWidth, imageHeight);
      this.draw();
      this.fillColorPoints();
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }

  draw() {
    const size = [this.image.naturalWidth, this.image.naturalHeight / this.spritesCount];
    this.ctx.drawImage(this.image,
      0, size[1] * this.spritePos,
      size[0], size[1],
      this.points[0][0], this.points[0][1],
      size[0], size[1],
    );
    return this;
  }

  get isDestroyed() {
    return this.someColorPoints.some(([x0, y0, ...color]) => {
      const [x, y] = this.points[0];
      const pxColor = this.ctx.getImageData(x0 + x, y0 + y, 1, 1).data;
      return color.some((rgb, i) => pxColor[i] !== rgb);
    });
  }

  get someColorPoints() {
    const { colorPoints } = this;
    const someColorPoints = [];
    for (let i = this.someColorPointsOffset; i < colorPoints.length; i += this.someColorPointsStep) {
      someColorPoints.push(colorPoints[i]);
    }
    this.someColorPointsOffset++;
    this.someColorPointsOffset %= this.someColorPointsStep;
    return someColorPoints;
  }

  isCrosses(figure: Figure) {
    return this.someColorPoints.some(axis =>
      figure.points[0][0] < axis[0] + this.points[0][0] &&
      figure.points[0][1] < axis[1] + this.points[0][1] &&
      figure.points[1][0] > axis[0] + this.points[0][0] &&
      figure.points[1][1] > axis[1] + this.points[0][1],
    );
  }

  updateSprite() {
    if (this.intermediate) {
      this.spritePos += this.spritePosFromEnd ? -1 : 1;
      if (this.spritePos % this.spritesCount === 0) {
        this.spritePosFromEnd = !this.spritePosFromEnd;
        if (this.spritePosFromEnd) this.spritePos--;
      }
    }
    else {
      this.spritePos++;
      this.spritePos %= this.spritesCount;
    }
  }

  private fillColorPoints() {
    const POINTS_FOR_CHECK = 4;

    const imageWidth = this.image.naturalWidth;
    const imageHeight = this.image.naturalHeight / this.spritesCount;

    for (let x = 0; x < imageWidth; x++) {
      for (let y = 0; y < imageHeight; y++) {
        if (this.checkColor(x, y, true)) {
          for (y = imageHeight - 1; y >= 0; y--) {
            if (this.checkColor(x, y)) break;
          }
          break;
        }
      }
    }
    for (let y = 0; y < imageHeight; y++) {
      for (let x = 0; x < imageWidth; x++) {
        if (this.checkColor(x, y)) {
          for (x = imageWidth - 1; x >= 0; x--) {
            if (this.checkColor(x, y)) break;
          }
          break;
        }
      }
    }

    this.someColorPointsStep = Math.floor(this.colorPoints.length / POINTS_FOR_CHECK);
  }

  private checkColor(x: number, y: number, isNewCicle = false) {
    const pxColor = this.ctx.getImageData(x, y, 1, 1).data;
    if (WHITE_RGB.some((rgb, i) => rgb !== pxColor[i])) {
      if (isNewCicle || !this.colorPoints.find(point => point[0] === x && point[1] === y)) {
        this.colorPoints.push([x, y, pxColor[0], pxColor[1]]);
      }
      return true;
    }
  }

}
