// Welcome to Cursor

// 1. Try generating with command K on a new line. Ask for a new react component of an error popup.
// 2. Then, select the outputted code and hit chat. Ask if there's a bug. Ask how to improve.
// 3. Try selecting some code and hitting edit. Ask the bot to add a button that updates a statefield.
// 4. To try out cursor on your own projects, go to file menu (top left) and open a folder.


const puppeteer = require("puppeteer");
const { LocalStorage } = require("node-localstorage");
const readline = require("readline");
const localStorage = new LocalStorage("./scratch");
const storedUsername = localStorage.getItem("username");
const storedPassword = localStorage.getItem("password");

let username = storedUsername;
let password = storedPassword;
if (!username || !password) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Please enter your username: ", (answer) => {
    username = answer;
    rl.question("Please enter your password: ", (answer) => {
      password = answer;
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      rl.close();
      (async () => {
        const browser = await puppeteer.launch();
        try {
          const page = await browser.newPage();
          await page.goto(
            "http://gd2.17hr.net:8018/LoginNew.aspx?ReturnUrl=%2fdefault.aspx",
            { waitUntil: "networkidle2", timeout: 30000 }
          ); // added waitUntil and timeout options to page.goto
          await page.waitForSelector("input#tbaccount", { timeout: 30000 });
          await page.type("input#tbaccount", username);
          await page.type("input#tbpassword", password);
          await page.click("input#BT_Login");
          await page.waitForNavigation();
          console.log("Logged in successfully!");
          await browser.close();
        } catch (error) {
          console.error(error);
          await browser.close();
        }
      })();
    });
  });
} else {
  (async () => {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.goto(
        "http://gd2.17hr.net:8018/LoginNew.aspx?ReturnUrl=%2fdefault.aspx",
        { waitUntil: "networkidle2", timeout: 30000 }
      ); // added waitUntil and timeout options to page.goto
      await page.waitForSelector("input#tbaccount", { timeout: 30000 });
      await page.type("input#tbaccount", username);
      await page.type("input#tbpassword", password);
      await page.click("input#BT_Login");
      await page.waitForNavigation();
      console.log("Logged in successfully!");
      await browser.close();
    } catch (error) {
      console.error(error);
      await browser.close();
    }
  })();
}

