const jestConfig = require("./jest.config");
const { clickElement, getText, isDisabled } = require("./lib/commands");

describe("Movies tests", () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.setDefaultTimeout(40000);
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  afterEach(() => {
    page.close();
  });

  test("Buy ticket successfully", async () => {
    const expected = "Вы выбрали билеты:";
    await clickElement(page, "a:nth-child(3)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']",
    );
    await clickElement(
      page,
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
    );
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toEqual(expected);
  });

  test("Check activity acceptin-button when uncheck chair", async () => {
    const expected = true;
    await clickElement(
      page,
      "body nav[class='page-nav'] a:nth-child(2) span:nth-child(2)",
    );
    await clickElement(page, "a[href='#'][data-seance-id='223']");
    await clickElement(
      page,
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
    );
    await clickElement(
      page,
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
    );
    const actual = await isDisabled(page, ".acceptin-button");
    expect(actual).toEqual(expected);
  });

  test("Check activity acceptin-button when check chair", async () => {
    const expected = false;
    await clickElement(
      page,
      "body nav[class='page-nav'] a:nth-child(2) span:nth-child(2)",
    );
    await clickElement(page, "a[href='#'][data-seance-id='223']");
    await clickElement(
      page,
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
    );
    const actual = await isDisabled(page, ".acceptin-button");
    expect(actual).toEqual(expected);
  });
});
