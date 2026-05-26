import { chromium } from 'playwright';

const url = 'https://3000-da72ad2b-3f70-45fc-853a-d4126346c598.orchids.cloud/?_cb=' + Date.now();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
page.on('console', msg => console.log('console:', msg.type(), msg.text()));
page.on('pageerror', err => console.log('pageerror:', err.stack || err.message));
page.on('requestfailed', req => console.log('requestfailed:', req.url(), req.failure()?.errorText));
page.on('response', async res => {
  if (res.status() >= 400) console.log('response:', res.status(), res.url());
});
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
await page.screenshot({ path: '/home/user/app/.orchids/preview.png', fullPage: true });
const bodyText = await page.locator('body').innerText();
console.log('title:', await page.title());
console.log('bodyText:', bodyText.slice(0, 1000));
await browser.close();
