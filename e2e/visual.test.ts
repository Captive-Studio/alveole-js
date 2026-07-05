import { expect, test } from '@playwright/test';
import { getStories } from './utils/getStories';

const stories = getStories();

for (const { moduleName, exportName } of stories) {
  test(`${moduleName}/${exportName}`, async ({ page }) => {
    await page.goto(`/test/${moduleName}/${exportName}`);
    await page.waitForSelector('#root > *', { timeout: 10_000 });
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${moduleName}-${exportName}.png`);
  });
}
