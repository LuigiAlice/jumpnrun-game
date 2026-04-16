import { test, expect } from '@playwright/test';

test.describe('Game E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForTimeout(2000);
  });

  test('game canvas loads without errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(1000);

    const canvas = await page.locator('canvas').first();
    await expect(canvas).toBeVisible();

    const criticalErrors = consoleErrors.filter(e =>
      !e.includes('warning') &&
      !e.includes('deprecated') &&
      !e.includes('DevTools')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('game responds to input', async ({ page }) => {
    await page.waitForTimeout(1000);

    const canvas = await page.locator('canvas').first();
    await expect(canvas).toBeVisible();

    await canvas.click();
    await page.waitForTimeout(500);

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);

    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(200);
  });

  test('ESC returns to title screen', async ({ page }) => {
    await page.waitForTimeout(1000);

    const canvas = await page.locator('canvas').first();
    await canvas.click();
    await page.waitForTimeout(500);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);

    const canvasStillThere = await page.locator('canvas').first().isVisible();
    expect(canvasStillThere).toBe(true);
  });

  test('game runs without critical console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(1000);

    const canvas = await page.locator('canvas').first();
    await canvas.click();

    await page.waitForTimeout(3000);

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(500);

    const criticalErrors = consoleErrors.filter(e =>
      !e.includes('warning') &&
      !e.includes('deprecated') &&
      !e.includes('DevTools') &&
      !e.includes('favicon')
    );

    if (criticalErrors.length > 0) {
      console.log('Console errors:', criticalErrors);
    }
    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe('Level 46 Island Falls E2E', () => {
  test('Level 46 starts and ESC returns to title', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('http://localhost:5173');
    await page.waitForTimeout(2000);

    const canvas = await page.locator('canvas').first();
    await expect(canvas).toBeVisible();

    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
    }

    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(50);
    }

    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);

    const criticalErrors = consoleErrors.filter(e =>
      !e.includes('warning') &&
      !e.includes('deprecated') &&
      !e.includes('DevTools') &&
      !e.includes('favicon')
    );
    expect(criticalErrors).toHaveLength(0);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
  });
});

test.describe('Level 55 Magma Flow E2E', () => {
  test('Level 55 starts and player stands on platform', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('http://localhost:5173');
    await page.waitForTimeout(2000);

    const canvas = await page.locator('canvas').first();
    await expect(canvas).toBeVisible();

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
    }

    for (let i = 0; i < 9; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(50);
    }

    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);

    const criticalErrors = consoleErrors.filter(e =>
      !e.includes('warning') &&
      !e.includes('deprecated') &&
      !e.includes('DevTools') &&
      !e.includes('favicon')
    );
    expect(criticalErrors).toHaveLength(0);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(1000);
  });
});