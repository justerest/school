export class GameSpeed {

  value = 0;

  up(dv = 0.001) {
    this.value += dv;
    return this;
  }

}
