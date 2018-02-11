import { AppPage } from './app.po';

describe('Графики App', () => {
  let page: AppPage;

  beforeEach(() => page = new AppPage());

  it('should display title', () => {
    page.browser.ignoreSynchronization = true;
    page.navigateTo('/');
    expect(page.getElementByCSS('.title').getText()).toEqual('Школа №13');
  });

  it('should display game canvas', () => {
    page.getElementByCSS('.menu-btn').click();
    page.getElementByCSS('a + a').click();
    expect(page.getElementByCSS('.app-iron-man__canvas').isDisplayed()).toBeTruthy();
  });
});
