import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isSidenavOpened = false;

  constructor(
    private sanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry,
  ) { }

  ngOnInit(): void {
    this.iconRegistry
      .addSvgIcon('up', this.getSafeURL('./assets/icons/ic_arrow_upward_48px.svg'))
      .addSvgIcon('down', this.getSafeURL('./assets/icons/ic_arrow_downward_48px.svg'))
      .addSvgIcon('rotate-left', this.getSafeURL('./assets/icons/ic_rotate_left_48px.svg'))
      .addSvgIcon('rotate-right', this.getSafeURL('./assets/icons/ic_rotate_right_48px.svg'))
      .addSvgIcon('more-horiz', this.getSafeURL('./assets/icons/ic_more_horiz_48px.svg'))
      .addSvgIcon('more-vert', this.getSafeURL('./assets/icons/ic_more_vert_48px.svg'))
      .addSvgIcon('menu', this.getSafeURL('./assets/icons/ic_menu_48px.svg'))
      .addSvgIcon('play', this.getSafeURL('./assets/icons/ic_play_arrow_48px.svg'));
  }

  private getSafeURL(value: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
