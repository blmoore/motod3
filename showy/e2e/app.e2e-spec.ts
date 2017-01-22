import { ShowyPage } from './app.po';

describe('showy App', function() {
  let page: ShowyPage;

  beforeEach(() => {
    page = new ShowyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
