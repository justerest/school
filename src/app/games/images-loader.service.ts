import { environment } from 'environments/environment';
import { Subject, fromEvent, merge } from 'rxjs';
import { skip, tap, first } from 'rxjs/operators';

import { Injectable } from '@angular/core';

@Injectable()
export class ImagesLoaderService {

  private collection: { [imageName: string]: HTMLImageElement; } = {};
  private promisesCount = 0;
  private subject = new Subject<void>();

  add(imageName: string, src: string) {
    if (!this.collection[imageName]) {
      const image = new Image;

      const loadEvent$ = fromEvent(image, 'load');
      const errorEvent$ = fromEvent(image, 'error').pipe(
        tap(() => {
          if (!environment.production) {
            throw new Error(`Image ${imageName} not found 404`);
          }
        }),
      );
      merge(loadEvent$, errorEvent$)
        .pipe(first())
        .subscribe(() => {
          this.collection[imageName] = image;
          this.promisesCount--;
          this.subject.next();
        });

      // Start loading image
      this.promisesCount++;
      image.src = src;
    }

    return this;
  }

  get(imageName: string) {
    if (!environment.production && !this.collection[imageName]) {
      throw new Error(`Image ${imageName} not found in collection`);
    }
    return this.collection[imageName];
  }

  ready() {
    setTimeout(() => this.subject.next());
    return this.subject.pipe(skip(this.promisesCount));
  }

}
