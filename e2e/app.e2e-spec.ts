import { TerminusPage } from './app.po';

describe('terminus App', () => {
  let page: TerminusPage;

  beforeEach(() => {
    page = new TerminusPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
