import { expect, test } from '@playwright/test';
import { getStories } from './utils/getStories';

const stories = getStories();

for (const { moduleName, exportName } of stories) {
  test(`${moduleName}/${exportName}`, async ({ page }) => {
    await page.goto(`/test/${moduleName}/${exportName}`);
    await page.waitForSelector('#root > *', { timeout: 10_000 });
    await page.waitForLoadState('networkidle');
    // Attendre que toutes les images soient chargées (ex: picsum.photos avec redirect 302)
    await page.waitForFunction(() =>
      [...document.querySelectorAll('img')].every(img => img.complete && img.naturalWidth > 0),
    );
    await expect(page).toHaveScreenshot([moduleName, `${exportName}.png`]);
  });
}
