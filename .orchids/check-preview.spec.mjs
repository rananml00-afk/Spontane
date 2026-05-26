import { test } from '@playwright/test';

test('inspect preview', async ({ page }) => {
  page.on('console', msg => console.log('console:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('pageerror:', err.stack || err.message));
  page.on('requestfailed', req => console.log('requestfailed:', req.url(), req.failure()?.errorText));
  page.on('response', async res => {
    if (res.status() >= 400) console.log('response:', res.status(), res.url());
  });

  const url = 'https://3000-da72ad2b-3f70-45fc-853a-d4126346c598.orchids.cloud/?_cb=' + Date.now();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/home/user/app/.orchids/preview.png', fullPage: true });
  console.log('title:', await page.title());
  console.log('text:', (await page.locator('body').innerText()).slice(0, 1000));
});
