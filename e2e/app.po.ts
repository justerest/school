import { browser, by, element } from 'protractor';

export class AppPage {

  browser = browser;

  navigateTo(path: string) {
    return browser.get(path);
  }

  getElementByCSS(selector: string) {
    return element(by.css(selector));
  }

}
