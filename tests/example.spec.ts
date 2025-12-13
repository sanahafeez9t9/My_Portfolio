
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Sana Hafeez Portfolio/);

  // Take a screenshot.
  await page.screenshot({ path: 'screenshot.png' });
});
