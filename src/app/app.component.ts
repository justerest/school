import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  isSidenavOpened = false;

  constructor(
    sanitizer: DomSanitizer,
    iconRegistry: MatIconRegistry,
  ) {
    const getSafeURL = sanitizer.bypassSecurityTrustResourceUrl.bind(sanitizer);
    iconRegistry
      .addSvgIcon('up', getSafeURL('./assets/icons/ic_arrow_upward_48px.svg'))
      .addSvgIcon('down', getSafeURL('./assets/icons/ic_arrow_downward_48px.svg'))
      .addSvgIcon('rotate-left', getSafeURL('./assets/icons/ic_rotate_left_48px.svg'))
      .addSvgIcon('rotate-right', getSafeURL('./assets/icons/ic_rotate_right_48px.svg'))
      .addSvgIcon('more-horiz', getSafeURL('./assets/icons/ic_more_horiz_48px.svg'))
      .addSvgIcon('more-vert', getSafeURL('./assets/icons/ic_more_vert_48px.svg'))
      .addSvgIcon('menu', getSafeURL('./assets/icons/ic_menu_48px.svg'))
      .addSvgIcon('play', getSafeURL('./assets/icons/ic_play_arrow_48px.svg'))
      .addSvgIcon('game', getSafeURL('./assets/icons/ic_games_48px.svg'));
  }

}
