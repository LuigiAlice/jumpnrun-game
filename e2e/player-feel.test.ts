import { test, expect, type Page } from '@playwright/test';

async function startLevel(page: Page) {
  await page.goto('http://localhost:5173');
  await page.waitForFunction(() => (window as any).__game?.scene.isActive('Title'));
  await page.evaluate(() => (window as any).__game.scene.start('Game', { levelIndex: 0 }));
  await page.waitForFunction(() => {
    const s = (window as any).__game.scene.getScene('Game');
    return s.scene.isActive() && s.player?.body.blocked.down;
  });
}

test('Shift sprint reaches 400 and settles back to walking speed', async ({ page }) => {
  await startLevel(page);
  await page.keyboard.down('Shift');
  await page.keyboard.down('ArrowRight');
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').player.body.velocity.x >= 399);
  // Reset only position to keep the speed check on the safe introductory floor.
  await page.evaluate(() => {
    const s = (window as any).__game.scene.getScene('Game');
    s.player.body.reset(160, 490);
    s.player.body.setVelocityX(400);
  });
  await page.keyboard.up('Shift');
  await page.waitForFunction(() => {
    const v = (window as any).__game.scene.getScene('Game').player.body.velocity.x;
    return v >= 299 && v <= 301;
  });
  await page.keyboard.up('ArrowRight');
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').player.body.velocity.x === 0);
});

test('holding jump rises higher than a tap and does not auto-bounce', async ({ page }) => {
  const sampleJump = async (tap: boolean) => {
    await startLevel(page);
    await page.evaluate(() => {
      const s = (window as any).__game.scene.getScene('Game');
      s.jumpSample = { start: s.player.y, min: s.player.y, launched: false, landed: false, framesAfterLanding: 0, bounced: false };
      s.events.on('postupdate', () => {
        const p = s.player, sample = s.jumpSample;
        sample.min = Math.min(sample.min, p.y);
        if (p.body.velocity.y < -500) sample.launched = true;
        if (sample.launched && p.body.blocked.down && p.body.velocity.y >= 0) sample.landed = true;
        if (sample.landed) {
          sample.framesAfterLanding++;
          if (p.body.velocity.y < 0) sample.bounced = true;
        }
      });
    });
    await page.keyboard.down('z');
    await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').jumpSample.launched);
    if (tap) await page.keyboard.up('z');
    await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').jumpSample.framesAfterLanding >= 8, undefined, { timeout: 30000 });
    const result = await page.evaluate(() => (window as any).__game.scene.getScene('Game').jumpSample);
    await page.keyboard.up('z');
    expect(result.bounced).toBe(false);
    return result.start - result.min;
  };
  const tapHeight = await sampleJump(true);
  const holdHeight = await sampleJump(false);
  expect(holdHeight).toBeGreaterThan(tapHeight + 40);
});
