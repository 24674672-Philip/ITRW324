import { RIPWebsitePage } from './app.po';

describe('ripwebsite App', () => {
  let page: RIPWebsitePage;

  beforeEach(() => {
    page = new RIPWebsitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
