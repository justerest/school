import { environment } from 'environments/environment';
import swal from 'sweetalert2';
import { randomInt } from 'utils/random-int';
import { toInt } from 'utils/to-int';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { getImage } from '../shared/get-image';
import { KeyboardControlService } from './keyboard-control.service';
import { CicleImage } from './models/cicle-image';
import { DrawedImage } from './models/drawed-image';
import { GameSpeed } from './models/game-speed';

/** Максимальное ускорение героя. */
const ACCELERATION_MAX = 8;

/** Ускорение героя за один шаг. */
const ACCELERATION_STEP = 0.5;

/** Количество препятствий */
const BARRIERS_LENGTH = 11;

/** Количество бонусов */
const STARS_LENGTH = 30;

/** Железный человек против мороженого */
@Component({
  selector: 'app-game1',
  templateUrl: './game1.component.html',
  styleUrls: ['./game1.component.scss'],
})
export class Game1Component implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  /** Герой */
  hero: DrawedImage;

  /** Массив с препятствиями */
  barriers: CicleImage[];

  /** Массив с бонусами */
  stars: CicleImage[];

  barrierImage: HTMLImageElement;
  heroImage: HTMLImageElement;
  starImage: HTMLImageElement;

  gameSpeed: GameSpeed;
  score: number;

  bestScore = localStorage.getItem('game-1.best-score') || '';
  pause = true;

  constructor(
    private control: KeyboardControlService,
  ) { }

  async ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.imageSmoothingEnabled = true;

    const absolutePath = environment.production ? '/school/' : '/';
    [this.barrierImage, this.heroImage, this.starImage] = await Promise.all([
      getImage(absolutePath + 'assets/ice.png'),
      getImage(absolutePath + 'assets/iron-man.png'),
      getImage(absolutePath + 'assets/star.png'),
    ]);

    this.initGame();
  }

  onPressEnter() {
    if (this.control.keys.enter) {
      this.pause = !this.pause;
      if (!this.pause) this.startGame();
    }
  }

  initGame() {
    this.control.reset();
    this.gameSpeed = new GameSpeed;
    this.score = 0;
    this.barriers = [];
    this.stars = [];

    const { ctx } = this;
    const { canvas } = ctx;

    const barrierWidth = canvas.width / BARRIERS_LENGTH;
    for (let i = 0; i < BARRIERS_LENGTH; i++) {
      const barrier = new CicleImage({
        ctx,
        image: this.barrierImage,
        globalSpeed: this.gameSpeed,
      });

      const x0 = barrierWidth * i + (barrierWidth - this.barrierImage.width) / 2;
      barrier.move(x0, -randomInt(120, canvas.height));

      this.barriers.push(barrier);
    }

    for (let i = 0; i < STARS_LENGTH; i++) {
      const star = new CicleImage({
        ctx,
        image: this.starImage,
        spritesCount: 3,
        intermediate: true,
        globalSpeed: this.gameSpeed,
      });

      const y0 = -randomInt(120, canvas.height);
      star.move(canvas.width / STARS_LENGTH * i, y0);

      this.stars.push(star);
    }

    this.hero = new DrawedImage({
      ctx,
      image: this.heroImage,
      destroyable: true,
    });
    this.hero
      .move((canvas.width - this.heroImage.width) / 2, canvas.height - 100)
      .draw();

    canvas.focus();
    this.startGame();
  }

  async startGame() {
    if (this.pause) {
      this.drawPauseMessage();
      return;
    }
    this.drawInterface();

    const { ctx: { canvas }, hero, stars, barriers, control } = this;

    this.score++;

    stars.forEach(star => {
      if (hero.isCrosses(star)) {
        this.score += 200;
        star
          .move(0, canvas.height - star.points[0][1])
          .move(0, - randomInt(120, canvas.height));
      }
      else star.move().draw();
    });

    hero.move(control.dx, control.dy).draw();

    barriers.forEach(barrier => barrier.move().draw());

    if (hero.isDestroyed) {
      const isOK: { value: boolean } = await swal({
        type: 'warning',
        title: 'GAME OVER!',
        text: 'Retry?',
        showCancelButton: true,
      });
      if (!isOK.value) this.pause = true;

      if (this.score > toInt(this.bestScore)) {
        localStorage.setItem('school-game-1.best-score', this.score.toString());
        this.bestScore = this.score.toString();
      }

      this.initGame();
      return;
    }

    const isAcceleration = (
      (control.dx || control.dy) &&
      control.touchAcceleration - this.gameSpeed.value < ACCELERATION_MAX
    );
    if (isAcceleration) control.touchAcceleration += ACCELERATION_STEP;

    this.gameSpeed.up();
    requestAnimationFrame(() => this.startGame());
  }

  drawInterface() {
    const { ctx } = this;
    const { canvas } = ctx;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#a7ffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('SCORE: ' + this.score, 20, 30);

    ctx.fillStyle = '#ddd';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('PRESS ENTER TO PAUSE', canvas.width - 110, canvas.height - 10, 100);
  }

  drawPauseMessage() {
    const TITLE = 'PAUSE';
    const TEXT = 'PRESS ENTER TO ' + (this.score ? 'CONTINUE' : 'START');

    const { ctx } = this;
    const { canvas } = ctx;

    ctx.clearRect(canvas.width - 110, canvas.height - 30, 100, 30);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 70px sans-serif';
    ctx.fillText(TITLE, canvas.width / 2 - 125, canvas.height / 2, 250);
    ctx.fillStyle = '#ddd';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText(TEXT, canvas.width / 2 - 125, canvas.height / 2 + 70, 250);
  }

}
