export class GameSpeed {

  value = 1;

  up(dv = 0.001) {
    this.value += dv;
    return this;
  }

}