const { Browser } = require("puppeteer");
var XLSX = require("xlsx");
const { constants } = require("./constants");
var workbook = XLSX.readFile(constants.requiredFiles.subscriptions);
var sheet_name_list = workbook.SheetNames;

function getSheetData(pathToSheet) {
  var workbook = XLSX.readFile(pathToSheet);
  var sheet_name_list = workbook.SheetNames;
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
}

const channelSubscriptions = getSheetData(
  constants.requiredFiles.subscriptions
);

const likedVideos = getSheetData(constants.requiredFiles.likedVideos);

exports.readCSVAndSubscribe = async () => {
  const [page] = await browser.pages();
  await page.goto(constants.LINK_YOUTUBE);

  for (let channelData of channelSubscriptions) {
    let channelUrl = channelData["Channel Url"];

    await page.goto(channelUrl);

    await page.waitForSelector(
      "#subscribe-button > ytd-subscribe-button-renderer > tp-yt-paper-button"
    );

    await page.evaluate(async () => {
      const subscribeButton = document.querySelector(
        "#subscribe-button > ytd-subscribe-button-renderer > tp-yt-paper-button"
      );

      if (
        subscribeButton &&
        !subscribeButton?.textContent?.toLowerCase()?.includes("subscribed")
      ) {
        await new Promise((res, rej) => {
          subscribeButton.click();
          setTimeout(() => {
            res("Done");
          }, 1000);
        });
      }
    });
  }

  await browser.close();
};

exports.readCSVAndLike = async () => {
  const [page] = await browser.pages();
  await page.goto(constants.LINK_YOUTUBE);

  for (let videoData of likedVideos) {
    console.log(videoData);
    // let channelUrl = channelData["Channel Url"];
    // await page.goto(channelUrl);
    // await page.waitForSelector(
    //   "#subscribe-button > ytd-subscribe-button-renderer > tp-yt-paper-button"
    // );
    // await page.evaluate(async () => {
    //   const subscribeButton = document.querySelector(
    //     "#subscribe-button > ytd-subscribe-button-renderer > tp-yt-paper-button"
    //   );
    //   if (
    //     subscribeButton &&
    //     !subscribeButton?.textContent?.toLowerCase()?.includes("subscribed")
    //   ) {
    //     await new Promise((res, rej) => {
    //       subscribeButton.click();
    //       setTimeout(() => {
    //         res("Done");
    //       }, 1000);
    //     });
    //   }
    // });
  }
};
