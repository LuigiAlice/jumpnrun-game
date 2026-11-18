import { test, expect, type Page } from '@playwright/test';

async function startLevel(page: Page, levelIndex = 0) {
  await page.goto('http://localhost:5173');
  await page.waitForFunction(() => (window as any).__game?.scene.isActive('Title'));
  await page.evaluate(index => (window as any).__game.scene.start('Game', { levelIndex: index }), levelIndex);
  await page.waitForFunction(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.scene.isActive() && scene.player?.body;
  });
}

async function overlapGroundEnemy(page: Page, star: boolean) {
  await page.evaluate(isStar => {
    const scene = (window as any).__game.scene.getScene('Game');
    const enemy = scene.enemies.getChildren().find((e: any) => e.getData('type') === 'goomba');
    scene.enemyProbe = enemy;
    enemy.body.reset(800, 509);
    enemy.setVelocity(0, 0);
    scene.makeInvincible(2000, isStar);
    scene.player.body.reset(782, 514);
    scene.player.setVelocity(0, 0);
    scene.probeFrames = 0;
    scene.events.on('postupdate', () => { scene.probeFrames++; });
  }, star);
}

test('hit protection does not kill enemies while a star does', async ({ page }) => {
  await startLevel(page);
  await overlapGroundEnemy(page, false);
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').probeFrames >= 8);
  expect(await page.evaluate(() => {
    const s = (window as any).__game.scene.getScene('Game');
    return !!s.enemyProbe.active && !s.enemyProbe.getData('defeated') && !s.isDead;
  })).toBe(true);

  await startLevel(page);
  await overlapGroundEnemy(page, true);
  await page.waitForFunction(() => {
    const e = (window as any).__game.scene.getScene('Game').enemyProbe;
    return !e.active || e.getData('defeated');
  });
});

test('a moving koopa shell can be stopped by landing on it', async ({ page }) => {
  await startLevel(page);
  await page.evaluate(() => {
    const s = (window as any).__game.scene.getScene('Game');
    s.enemies.getChildren().forEach((e: any) => e.destroy());
    const shell = s.enemies.create(300, 513, 'koopa_shell');
    shell.setData('type', 'koopa').setData('state', 'shell_moving').setData('noEdgeDetection', true);
    shell.body.setSize(28, 16, false).setOffset(2, 18);
    shell.setVelocity(0, 0);
    s.shellProbe = shell;
    s.player.body.reset(300, 466);
    s.player.setVelocity(0, 250);
  });
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').shellProbe.getData('state') === 'shell_idle');
  expect(await page.evaluate(() => {
    const s = (window as any).__game.scene.getScene('Game');
    return { alive: !s.isDead, texture: s.shellProbe.texture.key, shellVx: s.shellProbe.body.velocity.x };
  })).toEqual({ alive: true, texture: 'koopa_shell', shellVx: 0 });
});

test('bullet bills keep horizontal flight without gravity', async ({ page }) => {
  await startLevel(page, 25);
  expect(await page.evaluate(() => {
    const s = (window as any).__game.scene.getScene('Game');
    const bullet = s.enemies.getChildren().find((e: any) => e.getData('type') === 'bullet_bill');
    return bullet ? { found: true, gravity: bullet.body.allowGravity, vy: bullet.body.velocity.y } : { found: false };
  })).toEqual({ found: true, gravity: false, vy: 0 });
});

test('standing on a warp pipe and pressing down enters it', async ({ page }) => {
  await startLevel(page);
  await page.evaluate(() => {
    const s = (window as any).__game.scene.getScene('Game');
    s.makeInvincible(600000);
    const lip = s.currentLevelData.platforms.find((p: any) => p.type === 'pipe_top' && p.x === 2050);
    s.player.body.reset(lip.x, lip.y - lip.h / 2 - 30);
    s.player.setVelocity(0, 100);
  });
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').player.body.blocked.down);
  await page.keyboard.down('ArrowDown');
  await page.waitForFunction(() => {
    const s = (window as any).__game.scene.getScene('Game');
    return s.isTransitioning || s.levelIndex === 2;
  });
  await page.keyboard.up('ArrowDown');
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').levelIndex === 2);
});
