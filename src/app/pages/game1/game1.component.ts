import { Component, OnInit, ElementRef } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';

import { KeyboardControlService } from '~/services/keyboard-control.service';

import { CicleImage } from '~/models/canvas-elements/cicle-image';
import { DrawedImage } from '~/models/canvas-elements/drawed-image';
import { ImagesLoader } from '~/models/images-loader';
import { Level } from '~/models/level';

import { randomInt } from '~/utils/randomInt';
import { toInt } from '~/utils/toInt';

const ACCELERATION_MAX = 8;
const ACCELERATION_VALUE = 0.7;
const BARRIERS_LENGTH = 11;
const STARS_LENGTH = 30;

const Images = new ImagesLoader({
  ironMan: 'iron-man.png',
  ice: 'ice.png',
  star: 'star.png',
});

@Component({
  selector: 'app-game1',
  templateUrl: './game1.component.html',
  styleUrls: ['./game1.component.scss'],
})
export class Game1Component implements OnInit {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  // Canvas elements
  barriers: CicleImage[];
  hero: DrawedImage;
  stars: CicleImage[];

  level: Level;
  score: number;

  bestScore = localStorage.getItem('school-game-1.best-score') || '';
  pause = true;

  constructor(
    private el: ElementRef,
    private control: KeyboardControlService
  ) { }

  async ngOnInit() {
    this.canvas = this.el.nativeElement.firstChild;
    this.context = this.canvas.getContext('2d');

    this.context.imageSmoothingEnabled = false;
    await Images.ready;

    this.init();
  }

  init() {
    this.control.reset();
    this.level = new Level;
    this.score = 0;

    const { canvas, context } = this;

    const barrierWidth = canvas.width / BARRIERS_LENGTH;
    this.barriers = new Array(BARRIERS_LENGTH)
      .fill(0)
      .map(() => new CicleImage({
        context,
        image: Images.get('ice'),
        level: this.level,
      }))
      .map((barrier, i) => {
        const x0 = barrierWidth * i + (barrierWidth - Images.get('ice').width) / 2;
        return barrier.move(x0, -randomInt(120, canvas.height));
      });

    this.stars = new Array(STARS_LENGTH)
      .fill(0)
      .map(() => new CicleImage({
        context,
        image: Images.get('star'),
        spritesCount: 3,
        intermediate: true,
        level: this.level,
      }))
      .map((ice, i) => (
        ice.move(canvas.width / STARS_LENGTH * i, -randomInt(120, canvas.height))
      ));

    const HERO_OPTIONS = {
      context,
      image: Images.get('ironMan'),
      destroyable: true,
    };
    this.hero = new DrawedImage(HERO_OPTIONS)
      .move((canvas.width - Images.get('ironMan').width) / 2, canvas.height - 100)
      .draw();

    canvas.focus();
    this.game();
  }

  async game(): Promise<void | never> {
    const {
      canvas,
      context,
      hero,
      stars,
      barriers,
      control,
    } = this;

    if (this.pause) {
      const TITLE = 'PAUSE';
      const TEXT = 'PRESS ENTER TO ' + (this.score ? 'CONTINUE' : 'START');

      context.clearRect(canvas.width - 110, canvas.height - 30, 100, 30);
      context.fillStyle = '#fff';
      context.font = 'bold 70px sans-serif';
      context.fillText(TITLE, canvas.width / 2 - 125, canvas.height / 2, 250);
      context.fillStyle = '#ddd';
      context.font = 'bold 32px sans-serif';
      context.fillText(TEXT, canvas.width / 2 - 125, canvas.height / 2 + 70, 250);

      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#a7ffff';
    context.font = 'bold 20px sans-serif';
    context.fillText('SCORE: ' + this.score, 20, 30);

    context.fillStyle = '#ddd';
    context.font = 'bold 16px sans-serif';
    context.fillText('PRESS ENTER TO PAUSE', canvas.width - 110, canvas.height - 10, 100);

    this.score++;

    stars.forEach(star => {
      if (hero.isCrosses(star)) {
        this.score += 200;
        star
          .move(0, canvas.height - star.points[0][1])
          .move(0, - randomInt(120, canvas.height));
      }
      else {
        star.move().draw();
      }
    });

    hero
      .move(control.dx, control.dy)
      .draw();

    barriers.forEach(barrier => barrier.move().draw());

    if (hero.isDestroyed) {
      const NOTIFICATION: SweetAlertOptions = {
        type: 'warning',
        title: 'GAME OVER!',
        text: 'Retry?',
        showCancelButton: true,
      };
      const isOK = await swal(NOTIFICATION) as { value: true | void };
      if (!isOK.value) {
        this.pause = true;
      }

      if (this.score > toInt(this.bestScore)) {
        localStorage.setItem('school-game-1.best-score', this.score.toString());
        this.bestScore = this.score.toString();
      }

      this.init();
      return;
    }

    const isAcceleration = (
      (control.dx || control.dy) &&
      control.speed - this.level.value < ACCELERATION_MAX
    );
    if (isAcceleration) {
      control.speed += ACCELERATION_VALUE;
    }

    this.level.up();
    requestAnimationFrame(() => this.game());
  }

  onEnterPress() {
    if (!this.control.keys.enter) return;

    this.pause = !this.pause;
    if (!this.pause) {
      this.game();
    }
  }
}
