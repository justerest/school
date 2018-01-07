export class ImagesLoader {
  ready: Promise<any>;
  private _collection: { [imageName: string]: HTMLImageElement; } = {};

  get(imageName: string) {
    if (!this._collection[imageName]) {
      throw new Error('Image is not found in collection');
    }
    return this._collection[imageName];
  }

  constructor(images: { [imageName: string]: string; }) {
    Object.keys(images).forEach(key => {
      this._collection[key] = new Image;
      this._collection[key].src = '/assets/' + images[key];
    });
    this.ready = this._load();
  }

  private _load() {
    const loadingImages: Promise<void>[] = Object
      .values(this._collection)
      .map(image => new Promise<void>((resolve, reject) => {
        const tmp = image.src;
        image.src = '';
        image.onload = () => resolve();
        image.onerror = () => reject();
        image.src = tmp;
      }));
    return Promise.all(loadingImages);
  }
}
