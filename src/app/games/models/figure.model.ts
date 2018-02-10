export class Figure {

  ctx: CanvasRenderingContext2D;
  points: number[][] = [
    [0, 0],
    [0, 150],
    [50, 150],
    [50, 0],
  ];

  fillStyle = '#ccedff';
  lineWidth = 3;
  strokeStyle = '#123';

  constructor(params: Pick<Figure, 'ctx'> & Partial<Figure>) {
    Object.assign(this, params);
    this.ctx = params.ctx;
  }

  draw() {
    const { ctx } = this;

    ctx.beginPath();
    ctx.moveTo(this.points[0][0], this.points[0][1]);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i][0], this.points[i][1]);
    }
    ctx.closePath();

    Object.assign(ctx, this, { points: null });
    ctx.fill();
    ctx.stroke();

    return this;
  }

  move(dx: number, dy: number) {
    const overflow = this.isOverflow(dx, dy);
    if (overflow) {
      this.move(overflow[0], overflow[1]);
    }
    else {
      this.points.forEach(axis => {
        axis[0] += Math.floor(dx);
        axis[1] += Math.floor(dy);
      });
    }
    return this;
  }

  isOverflow(dx: number, dy: number): number[] | void {
    const { ctx: { canvas } } = this;
    for (let i = 0; i < this.points.length; i++) {
      const [x, y] = this.points[i];
      const isOverflow = (
        x + dx < 0 ? [-x, dy] :
          x + dx > canvas.width ? [canvas.width - x, dy] :
            y + dy < 0 ? [dx, -y] :
              y + dy > canvas.height ? [dx, canvas.height - y] :
                false
      );
      if (isOverflow) {
        return isOverflow;
      }
    }
  }

}
