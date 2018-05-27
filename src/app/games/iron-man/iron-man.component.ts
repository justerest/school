import { environment } from 'environments/environment';
import { Subscription, animationFrameScheduler, interval } from 'rxjs';
import { getRandomInt } from 'utils/get-random-int';
import { toInt } from 'utils/to-int';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { ImagesLoaderService } from '../images-loader.service';
import { KeyboardControlService } from '../keyboard-control.service';
import { CicleImage } from '../models/cicle-image.model';
import { GameSpeed } from '../models/game-speed.model';
import { HeroModel } from '../models/hero.model';

const ROOT_PATH = environment.production ? '/school/' : '/';

const LS_GAME1 = 'game-1.best-score';

/** Количество препятствий */
const BARRIERS_LENGTH = 11;

/** Количество бонусов */
const STARS_LENGTH = 30;

/** Период обновления изображения на холсте */
const INTERVAL = 20;

/** Железный человек против мороженого */
@Component({
  selector: 'app-iron-man',
  templateUrl: './iron-man.component.html',
  styleUrls: ['./iron-man.component.scss'],
})
export class IronManComponent implements AfterViewInit {

  @ViewChild('canvas') canvas!: ElementRef;
  ctx!: CanvasRenderingContext2D;

  /** Герой */
  hero!: HeroModel;
  /** Массив с препятствиями */
  barriers!: CicleImage[];
  /** Массив с бонусами */
  stars!: CicleImage[];
  /** Глобальный объект скорости (уровня) */
  gameSpeed!: GameSpeed;

  score!: number;
  bestScore = localStorage.getItem(LS_GAME1);

  private gameProcess = new Subscription;

  constructor(
    private control: KeyboardControlService,
    private images: ImagesLoaderService,
  ) {
    this.gameProcess.unsubscribe();
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    this.images
      .add('ice', ROOT_PATH + 'assets/ice.png')
      .add('ironMan', ROOT_PATH + 'assets/iron-man.png')
      .add('star', ROOT_PATH + 'assets/star.png');

    this.images.ready().subscribe(() => this.initGame());
  }

  onPressEnter() {
    if (this.control.keys.enter) {
      if (this.gameProcess.closed) this.start();
      else {
        this.gameProcess.unsubscribe();
        this.drawPauseMessage();
      }
    }
  }

  start() {
    this.gameProcess = interval(INTERVAL, animationFrameScheduler)
      .subscribe(_ => this.game());
  }

  private initGame() {
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
        image: this.images.get('ice'),
        globalSpeed: this.gameSpeed,
      });

      const x0 = barrierWidth * i + (barrierWidth - this.images.get('ice').width) / 2;
      barrier.move(x0, -getRandomInt(120, canvas.height));

      this.barriers.push(barrier);
    }

    for (let i = 0; i < STARS_LENGTH; i++) {
      const star = new CicleImage({
        ctx,
        image: this.images.get('star'),
        spritesCount: 3,
        intermediate: true,
        globalSpeed: this.gameSpeed,
      });

      const y0 = -getRandomInt(120, canvas.height);
      star.move(canvas.width / STARS_LENGTH * i, y0);

      this.stars.push(star);
    }

    this.hero = new HeroModel({
      ctx,
      image: this.images.get('ironMan'),
      destroyable: true,
    });
    this.hero
      .move((canvas.width - this.images.get('ironMan').width) / 2, canvas.height - 100)
      .draw();

    canvas.focus();
    this.drawPauseMessage();
  }

  private game() {
    const { ctx: { canvas }, control } = this;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.score++;
    this.gameSpeed.up();
    this.hero.accelerate(control.keys, this.gameSpeed);

    this.stars.forEach(star => {
      if (this.hero.isCrosses(star)) {
        this.score += 200;
        star
          .move(0, canvas.height - star.points[0][1])
          .move(0, - getRandomInt(120, canvas.height));
      }
      else star.move().draw();
    });
    this.hero.moveByControl(control.keys).draw();
    this.barriers.forEach(barrier => barrier.move().draw());

    if (this.hero.isDestroyed) {
      this.gameProcess.unsubscribe();
      if (this.score > toInt(this.bestScore)) {
        localStorage.setItem(LS_GAME1, this.score.toString());
        this.bestScore = this.score.toString();
      }
      this.initGame();
    }
  }

  private drawPauseMessage() {
    const title = 'PAUSE';
    const text = `PRESS ENTER TO ${this.score ? 'CONTINUE' : 'START'}`;

    const { ctx } = this;
    const { canvas } = ctx;

    ctx.clearRect(canvas.width - 110, canvas.height - 30, 100, 30);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 70px sans-serif';
    ctx.fillText(title, canvas.width / 2 - 125, canvas.height / 2, 250);
    ctx.fillStyle = '#ddd';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText(text, canvas.width / 2 - 125, canvas.height / 2 + 70, 250);
  }

}
