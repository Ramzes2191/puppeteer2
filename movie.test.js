const jestConfig = require("./jest.config");

describe("Movies tests", () => {
  let page;

  beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  afterEach(() => {
    page.close();
  });

  test("Buy ticket successfully", async () => {
    await page.click("a:nth-child(3)");
    await page.click(".movie-seances__time[href='#'][data-seance-id='217']");
    await page.click(
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
    );
    await page.click(".acceptin-button");
    await page.waitForSelector(".ticket__check-title", {
      visible: true,
    });
    const actual = await page.$eval(
      ".ticket__check-title",
      (link) => link.textContent,
    );
    expect(actual).toEqual("Вы выбрали билеты:");
  });

  test("Check activity button", async () => {
    await page.click(
      "body nav[class='page-nav'] a:nth-child(2) span:nth-child(2)",
    );
    await page.waitForSelector("h1");
    await page.click("a[href='#'][data-seance-id='223']");
    await page.waitForSelector("h1");
    await page.click(
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
    );
    await page.waitForSelector(".buying", {
      visible: true,
    });
    await page.click(
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
    );
    await page.waitForSelector(".buying", {
      visible: true,
    });
    const isDisabled = await page.$eval(".acceptin-button", (button) => {
      return button.disabled;
    });
    expect(isDisabled).toEqual(true);
  });

  test("Inactive chair", async () => {
    await page.click(
      "body nav[class='page-nav'] a:nth-child(2) span:nth-child(2)",
    );
    await page.waitForSelector("h1");
    await page.click("a[href='#'][data-seance-id='223']");
    await page.waitForSelector("h1");
      await page.click(
      "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
    );
    await page.waitForSelector(".buying", {
      visible: true,
    });
    const isDisabled = await page.$eval(".acceptin-button", (button) => {
      return button.disabled;
    });
    expect(isDisabled).toEqual(false);
  });
});
