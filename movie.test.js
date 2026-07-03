const jestConfig = require("./jest.config");
const jestpupConfig = require("./jest-puppeteer.config");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultTimeout(60000);
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Movie tests", () => {
  test.only("In title has name of movie", async () => {
    const title = await page.$("[class=movie__title]");
    await page.waitForSelector("h2");
    expect(title).toEqual("Достать ножи");
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
});
