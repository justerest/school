import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainPageComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const getSafeURL = sanitizer.bypassSecurityTrustResourceUrl;
    iconRegistry
      .addSvgIcon('play', getSafeURL('./assets/icons/ic_play_arrow_48px.svg'))
      .addSvgIcon('game', getSafeURL('./assets/icons/ic_games_48px.svg'));
  }

  ngOnInit() {
  }

}
