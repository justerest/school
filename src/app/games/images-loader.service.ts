import { Injectable } from '@angular/core';

@Injectable()
export class ImagesLoaderService {

  private collection: { [imageName: string]: HTMLImageElement; } = {};
  private promises: Promise<any>[] = [];

  add(imageName: string, src: string) {
    const image = new Image;

    const promise = new Promise((resolve, reject) => {
      image.onerror = () => reject();
      image.onload = () => {
        this.collection[imageName] = image;
        resolve();
      };
      image.src = src;
    });
    this.promises.push(promise);

    return this;
  }

  get(imageName: string) {
    if (!this.collection[imageName]) {
      throw new Error('The image ' + imageName + ' is not found in collection');
    }
    return this.collection[imageName];
  }

  async ready() {
    await Promise.all(this.promises);
    this.promises = [];
  }

}
