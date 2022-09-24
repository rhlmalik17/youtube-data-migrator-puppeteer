const fs = require("fs");
const { setInterval } = require("timers/promises");
const { constants } = require("./constants");

exports.getAccountCookies = async (page) => new Promise(async (res, rej) => {
  try {
    // const current = Date.now()
    const cookies = await page.cookies();
    fs.writeFileSync(constants.COOKIES_FILE, JSON.stringify(cookies));

    // const interval = setInterval(async () => {
    //   console.log("Hi2")
    //   const cookies = await page.cookies();
    //   console.log("Hi3")
    //   fs.writeFileSync(constants.COOKIES_FILE, JSON.stringify(cookies));
      
    //   if(Date.now() - current > 5000) {
    //     clearInterval(interval)
    //     res("Done")
    //   }
      
    // }, 200)

  } catch (e) {
    console.log("rej")
    rej(e)
    throw new Error(e);
  }
})
  
 