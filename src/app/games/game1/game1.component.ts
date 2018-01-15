import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';

import { KeyboardControlService } from '../keyboard-control.service';

import { CicleImage } from '../models/cicle-image';
import { DrawedImage } from '../models/drawed-image';
import { Level } from '../models/level';

import { getImage } from 'app/shared/utils/get-image';
import { randomInt } from 'app/shared/utils/random-int';
import { toInt } from 'app/shared/utils/to-int';

const ACCELERATION_MAX = 8;
const ACCELERATION_VALUE = 0.5;
const BARRIERS_LENGTH = 11;
const STARS_LENGTH = 30;

@Component({
  selector: 'app-game1',
  templateUrl: './game1.component.html',
  styleUrls: ['./game1.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Game1Component implements OnInit {

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  // Canvas elements
  hero: DrawedImage;
  barriers: CicleImage[];
  stars: CicleImage[];

  // Images
  barrierImage: HTMLImageElement;
  heroImage: HTMLImageElement;
  starImage: HTMLImageElement;

  level: Level;
  score: number;

  bestScore = localStorage.getItem('game-1.best-score') || '';
  pause = true;

  constructor(
    private el: ElementRef,
    private control: KeyboardControlService,
  ) { }

  async ngOnInit() {
    this.canvas = this.el.nativeElement.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = true;

    [this.barrierImage, this.heroImage, this.starImage] = await Promise.all([
      getImage('/school/assets/ice.png'),
      getImage('/school/assets/iron-man.png'),
      getImage('/school/assets/star.png'),
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
    this.level = new Level;
    this.score = 0;
    this.barriers = [];
    this.stars = [];

    const { canvas, context } = this;

    const barrierWidth = canvas.width / BARRIERS_LENGTH;
    for (let i = 0; i < BARRIERS_LENGTH; i++) {
      const barrier = new CicleImage({
        context,
        image: this.barrierImage,
        level: this.level,
      });

      const x0 = barrierWidth * i + (barrierWidth - this.barrierImage.width) / 2;
      barrier.move(x0, -randomInt(120, canvas.height));

      this.barriers.push(barrier);
    }

    for (let i = 0; i < STARS_LENGTH; i++) {
      const star = new CicleImage({
        context,
        image: this.starImage,
        spritesCount: 3,
        intermediate: true,
        level: this.level,
      });

      const y0 = -randomInt(120, canvas.height);
      star.move(canvas.width / STARS_LENGTH * i, y0);

      this.stars.push(star);
    }

    this.hero = new DrawedImage({
      context,
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

    const { canvas, hero, stars, barriers, control } = this;

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
      control.speed - this.level.value < ACCELERATION_MAX
    );
    if (isAcceleration) control.speed += ACCELERATION_VALUE;

    this.level.up();
    requestAnimationFrame(() => this.startGame());
  }

  drawInterface() {
    const { canvas, context } = this;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#a7ffff';
    context.font = 'bold 20px sans-serif';
    context.fillText('SCORE: ' + this.score, 20, 30);

    context.fillStyle = '#ddd';
    context.font = 'bold 16px sans-serif';
    context.fillText('PRESS ENTER TO PAUSE', canvas.width - 110, canvas.height - 10, 100);
  }

  drawPauseMessage() {
    const TITLE = 'PAUSE';
    const TEXT = 'PRESS ENTER TO ' + (this.score ? 'CONTINUE' : 'START');

    const { canvas, context } = this;

    context.clearRect(canvas.width - 110, canvas.height - 30, 100, 30);
    context.fillStyle = '#fff';
    context.font = 'bold 70px sans-serif';
    context.fillText(TITLE, canvas.width / 2 - 125, canvas.height / 2, 250);
    context.fillStyle = '#ddd';
    context.font = 'bold 32px sans-serif';
    context.fillText(TEXT, canvas.width / 2 - 125, canvas.height / 2 + 70, 250);
  }

}
