import { chromium } from 'playwright';

export const openAppController = async (req, res) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto("http://localhost:3002/auth");//recipee app alternative login utility

  await page.type('#username', 'atasoy1');
  await page.type('#password', 'atasoy1');
  await page.click('#root > div > div.auth > div:nth-child(1) > form > button');

  res.send('Operation completed successfully');

  
};
