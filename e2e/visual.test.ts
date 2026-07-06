import { expect, test } from '@playwright/test';
import { getStories } from './utils/getStories';

const stories = getStories();

for (const { moduleName, exportName } of stories) {
  test(`${moduleName}/${exportName}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('response', res => {
      if (res.status() >= 400) errors.push(`HTTP ${res.status()} ${res.url()}`);
    });

    await page.goto(`/test/${moduleName}/${exportName}`);

    await page.waitForSelector('#root > *', { timeout: 10_000 }).catch(() => {
      throw new Error(`#root > * never appeared. Console errors: ${errors.join(' | ')}`);
    });
    await page.waitForFunction(
      () => [...document.querySelectorAll('img')].every(img => img.complete && img.naturalWidth > 0),
      { timeout: 5_000 },
    );
    await expect(page).toHaveScreenshot([moduleName, `${exportName}.png`]);
  });
}
