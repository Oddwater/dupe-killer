import { DupeKillerPage } from './app.po';

describe('dupe-killer App', function() {
  let page: DupeKillerPage;

  beforeEach(() => {
    page = new DupeKillerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
