import { Injectable } from '@angular/core';

@Injectable()
export class ImagesLoaderService {

  private _collection: { [imageName: string]: HTMLImageElement; } = {};
  private _promises: Promise<any>[] = [];

  add(imageName: string, src: string) {
    const image = new Image;

    const promise = new Promise((resolve, reject) => {
      image.onerror = reject;
      image.onload = () => {
        this._collection[imageName] = image;
        resolve();
      };
      image.src = src;
    });
    this._promises.push(promise);

    return this;
  }

  get(imageName: string) {
    if (!this._collection[imageName]) {
      throw new Error('The image ' + imageName + ' is not found in collection');
    }
    return this._collection[imageName];
  }

  async ready() {
    await Promise.all(this._promises);
    this._promises = [];
  }

}
