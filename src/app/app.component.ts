import { environment } from 'environments/environment';

import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { ImagesLoaderService } from './shared/images-loader.service';

const ROOT_PATH = environment.production ? '/school/' : '/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    imagesRegistry: ImagesLoaderService,
  ) {

    const getSafeURL = sanitizer.bypassSecurityTrustResourceUrl;
    iconRegistry
      .addSvgIcon('up', getSafeURL('./assets/icons/ic_arrow_upward_48px.svg'))
      .addSvgIcon('down', getSafeURL('./assets/icons/ic_arrow_downward_48px.svg'))
      .addSvgIcon('rotate-left', getSafeURL('./assets/icons/ic_rotate_left_48px.svg'))
      .addSvgIcon('rotate-right', getSafeURL('./assets/icons/ic_rotate_right_48px.svg'))
      .addSvgIcon('more-horiz', getSafeURL('./assets/icons/ic_more_horiz_48px.svg'))
      .addSvgIcon('more-vert', getSafeURL('./assets/icons/ic_more_vert_48px.svg'))
      .addSvgIcon('play', getSafeURL('./assets/icons/ic_play_arrow_48px.svg'))
      .addSvgIcon('game', getSafeURL('./assets/icons/ic_games_48px.svg'));

    imagesRegistry
      .add('ice', ROOT_PATH + 'assets/ice.png')
      .add('ironMan', ROOT_PATH + 'assets/iron-man.png')
      .add('star', ROOT_PATH + 'assets/star.png');

    imagesRegistry.ready();

  }

}
