import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const getSafeURL = sanitizer.bypassSecurityTrustResourceUrl;
    iconRegistry
      .addSvgIcon('up', getSafeURL('./assets/icons/ic_arrow_upward_48px.svg'))
      .addSvgIcon('down', getSafeURL('./assets/icons/ic_arrow_downward_48px.svg'))
      .addSvgIcon('rotate-left', getSafeURL('./assets/icons/ic_rotate_left_48px.svg'))
      .addSvgIcon('rotate-right', getSafeURL('./assets/icons/ic_rotate_right_48px.svg'))
      .addSvgIcon('play', getSafeURL('./assets/icons/ic_play_arrow_48px.svg'))
      .addSvgIcon('game', getSafeURL('./assets/icons/ic_games_48px.svg'));
  }

}
