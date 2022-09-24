const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const fs = require("fs");
const { constants } = require("./constants");
const { getAccountCookies } = require("./getAccountCookies");
const { readCSVAndSubscribe, readCSVAndLike } = require("./csvActions");

const main = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });

  // get cookies
  const cookies =
    JSON.parse(fs.readFileSync(constants.COOKIES_FILE) || "") || {};

  // Get current page
  let [page] = await browser.pages();
  await page.setCookie(...cookies);

  global.browser = browser;

  try {
    fs.readFileSync(constants.COOKIES_FILE);
    readCSVAndLike();
    // readCSVAndSubscribe();
  } catch {
    await page.waitForSelector("#buttons > ytd-button-renderer");

    await page.click("#buttons > ytd-button-renderer");

    await page.evaluate(() => {
      alert("Please login with your credentials. You have 60 Seconds.");
    });

    await page.waitForSelector("#avatar-btn", { timeout: 60000 });

    await getAccountCookies(page);
    readCSVAndLike();
    // readCSVAndSubscribe();
  }
};

main();
