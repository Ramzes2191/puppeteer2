const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");

const { clickElement, getText, isDisabled } = require("../../lib/commands.js");

setDefaultTimeout(70000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("User on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client${string}`);
});

When("User click buy ticket", async function () {
  await clickElement(this.page, "a:nth-child(3)");
  await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='217']",
  );
  await clickElement(
    this.page,
    "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
  );
  await clickElement(this.page, ".acceptin-button");
});

Then("User sees message {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  expect(actual).contains(`${string}`);
});

When("User click check - uncheck chair", async function () {
  await clickElement(
    this.page,
    "body nav[class='page-nav'] a:nth-child(2) span:nth-child(2)",
  );
  await clickElement(this.page, "a[href='#'][data-seance-id='223']");
  await clickElement(
    this.page,
    "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
  );
  await clickElement(
    this.page,
    "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
  );
});

Then("User sees inactive button", async function () {
  const actual = await isDisabled(this.page, ".acceptin-button");
  expect(actual).true;
});

When("User click check chair", async function () {
  await clickElement(
    this.page,
    "body nav[class='page-nav'] a:nth-child(2) span:nth-child(2)",
  );
  await clickElement(this.page, "a[href='#'][data-seance-id='223']");
  await clickElement(
    this.page,
    "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)",
  );
});

Then("User sees active button", async function () {
  const actual = await isDisabled(this.page, ".acceptin-button");
  expect(actual).false;
});
