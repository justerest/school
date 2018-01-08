import { Figure } from './figure';

import { randomInt } from 'app/utils/randomInt';

const WHITE_RGB = [255, 255, 255]; // IDEA: also check pixels on an another color background
const POINTS_FOR_CHECK = 4;

export class DrawedImage extends Figure {
  image: HTMLImageElement;
  animationFrequency = 100;
  destroyable = false;
  intermediate = false;
  spritesCount = 1;

  private _colorPoints: number[][] = [];
  private _someColorPointsOffset: number;
  private _someColorPointsStep: number;
  private _spritePos: number;
  private _spritePosFromEnd: boolean;

  constructor(params: Params<DrawedImage, 'context' | 'image'>) {
    super(params);
    Object.assign(this, params);

    const { spritesCount } = this;
    const imageWidth = this.image.naturalWidth;
    const imageHeight = this.image.naturalHeight / spritesCount;
    this.points = [
      [0, 0],
      [imageWidth, imageHeight],
    ];
    this._spritePos = randomInt(0, spritesCount);

    if (this.destroyable) {
      // REVIEW: auto get all perimeter pixels of the image
      // FIXME: don't work for pixels with an alpha channel
      // FIXME: don't work for sprites

      const { context } = this;

      context.fillStyle = '#fff';
      context.fillRect(0, 0, imageWidth, imageHeight);
      this.draw();

      for (let x = 0; x < imageWidth; x++) {
        for (let y = 0; y < imageHeight; y++) {
          if (this._checkColor(x, y, true)) {
            for (y = imageHeight - 1; y >= 0; y--) {
              if (this._checkColor(x, y)) { break; }
            }
            break;
          }
        }
      }
      for (let y = 0; y < imageHeight; y++) {
        for (let x = 0; x < imageWidth; x++) {
          if (this._checkColor(x, y)) {
            for (x = imageWidth - 1; x >= 0; x--) {
              if (this._checkColor(x, y)) { break; }
            }
            break;
          }
        }
      }

      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      this._someColorPointsStep = Math.floor(this._colorPoints.length / POINTS_FOR_CHECK);
      this._someColorPointsOffset = 0;
    }


    if (spritesCount > 1) {
      if (this.intermediate) {
        setInterval(() => {
          this._spritePos += this._spritePosFromEnd ? -1 : 1;
          if (this._spritePos % spritesCount === 0) {
            this._spritePosFromEnd = !this._spritePosFromEnd;
            if (this._spritePosFromEnd) { this._spritePos--; }
          }
        }, this.animationFrequency);
      } else {
        setInterval(() => {
          this._spritePos++;
          this._spritePos %= spritesCount;
        }, this.animationFrequency);
      }
    }
  }

  draw() {
    const size = [this.image.naturalWidth, this.image.naturalHeight / this.spritesCount];
    this.context.drawImage(this.image,
      0, size[1] * this._spritePos,
      ...size,
      ...this.points[0],
      ...size
    );
    return this;
  }

  get isDestroyed() {
    return this.someColorPoints.some(([x0, y0, ...color]) => {
      const [x, y] = this.points[0];
      const pxColor = this.context.getImageData(x0 + x, y0 + y, 1, 1).data;
      return color.some((rgb, i) => pxColor[i] !== rgb);
    });
  }

  get someColorPoints() {
    const { _colorPoints } = this;
    const someColorPoints = [];
    for (let i = this._someColorPointsOffset; i < _colorPoints.length; i += this._someColorPointsStep) {
      someColorPoints.push(_colorPoints[i]);
    }
    this._someColorPointsOffset++;
    this._someColorPointsOffset %= this._someColorPointsStep;
    return someColorPoints;
  }

  isCrosses(figure: Figure) {
    return this.someColorPoints.some(axis =>
      figure.points[0][0] < axis[0] + this.points[0][0] &&
      figure.points[0][1] < axis[1] + this.points[0][1] &&
      figure.points[1][0] > axis[0] + this.points[0][0] &&
      figure.points[1][1] > axis[1] + this.points[0][1]
    );
  }

  private _checkColor(x: number, y: number, isNewCicle?: true) {
    const pxColor = this.context.getImageData(x, y, 1, 1).data;
    if (WHITE_RGB.some((rgb, i) => rgb !== pxColor[i])) {
      if (isNewCicle || !this._colorPoints.find(point => point[0] === x && point[1] === y)) {
        this._colorPoints.push([x, y, pxColor[0], pxColor[1]]);
      }
      return true;
    }
  }
}
