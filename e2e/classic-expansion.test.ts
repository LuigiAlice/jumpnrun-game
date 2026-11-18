import { test, expect, type Page } from '@playwright/test';

async function start(page: Page, index: number) {
  await page.goto('http://localhost:5173');
  await page.waitForFunction(() => (window as any).__game?.scene.isActive('Title'));
  await page.evaluate(levelIndex => (window as any).__game.scene.start('Game', { levelIndex }), index);
  await page.waitForFunction(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.scene.isActive() && scene.player?.body.blocked.down;
  }, undefined, { timeout: 30000 });
}
const inGame = (page: Page, code: string) => page.evaluate(source => {
  const scene = (window as any).__game.scene.getScene('Game');
  return new Function('scene', source)(scene);
}, code);

test('a winged koopa loses its wings on the first stomp and becomes a ground koopa', async ({ page }) => {
  await start(page, 3);
  await inGame(page, `
    const enemy = scene.enemies.getChildren().find(e => e.getData('type') === 'parakoopa');
    if (!enemy) throw new Error('missing winged patrol');
    scene.wingProbe = enemy;
    scene.makeInvincible(600000);
    scene.player.body.reset(enemy.x, enemy.body.top - 40);
    scene.player.body.setVelocity(0, 550);
  `);
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').wingProbe.getData('type') === 'koopa');
  expect(await inGame(page, `return { active: scene.wingProbe.active, gravity: scene.wingProbe.body.allowGravity, state: scene.wingProbe.getData('state') };`))
    .toEqual({ active: true, gravity: true, state: 'walking' });
});

test('an armored beetle resists a fireball and can still become a kickable shell', async ({ page }) => {
  await start(page, 8);
  await inGame(page, `
    const beetle = scene.enemies.getChildren().find(e => e.getData('type') === 'buzzy_beetle');
    if (!beetle) throw new Error('missing beetle patrol');
    scene.beetleProbe = beetle;
    scene.fireProbe = scene.fireballs.create(beetle.x, beetle.y, 'fireball');
    scene.fireProbe.body.setAllowGravity(false);
    scene.fireProbe.setVelocity(0, 0);
    scene.makeInvincible(600000);
  `);
  await page.waitForFunction(() => !(window as any).__game.scene.getScene('Game').fireProbe.active);
  expect(await inGame(page, `return scene.beetleProbe.active && scene.beetleProbe.body.enable;`)).toBe(true);
  await inGame(page, `scene.player.body.reset(scene.beetleProbe.x, scene.beetleProbe.body.top - 40); scene.player.body.setVelocity(0, 550);`);
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').beetleProbe.getData('state') === 'shell_idle');
  expect(await inGame(page, `return scene.beetleProbe.texture.key;`)).toBe('buzzy_shell');
});

test('a bomb ignites from a fireball and explodes after its game-time warning', async ({ page }) => {
  test.setTimeout(60000);
  await start(page, 48);
  await inGame(page, `
    const bomb = scene.enemies.getChildren().find(e => e.getData('type') === 'bobomb');
    if (!bomb) throw new Error('missing bomb patrol');
    scene.bombProbe = bomb;
    const fire = scene.fireballs.create(bomb.x, bomb.y, 'fireball');
    fire.body.setAllowGravity(false); fire.setVelocity(0, 0);
    scene.makeInvincible(600000);
  `);
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').bombProbe.getData('state') === 'fused');
  expect(await inGame(page, `return scene.bombProbe.getData('fuseMs');`)).toBeGreaterThan(0);
  await page.waitForFunction(() => !(window as any).__game.scene.getScene('Game').bombProbe.active, undefined, { timeout: 40000 });
});

test('a vine supports climbing and a Z press restores jumping gravity', async ({ page }) => {
  await start(page, 3);
  await inGame(page, `
    const vine = scene.currentLevelData.vines[0];
    scene.enemies.clear(true, true);
    scene.player.body.reset(vine.x, vine.y - 60); scene.player.body.setVelocity(0, 0);
    scene.vineStartY = scene.player.y;
  `);
  await page.keyboard.down('ArrowUp');
  await page.waitForFunction(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.classicElements.isClimbing && scene.player.y < scene.vineStartY - 10;
  });
  expect(await inGame(page, `return scene.player.body.allowGravity;`)).toBe(false);
  await page.keyboard.up('ArrowUp');
  await page.keyboard.down('z');
  await page.waitForFunction(() => !(window as any).__game.scene.getScene('Game').classicElements.isClimbing);
  expect(await inGame(page, `return scene.player.body.allowGravity;`)).toBe(true);
  await page.keyboard.up('z');
});

test('a rotating fire arm moves its existing collision bodies on game time', async ({ page }) => {
  await start(page, 48);
  const before = await inGame(page, `
    const elements = scene.classicElements, orb = elements.arms[0].orbs[0];
    scene.armProbe = { time: elements.elapsedMs, orb, x: orb.x, y: orb.y };
    return { count: elements.fireOrbs.getLength(), x: orb.x, y: orb.y };
  `);
  await page.waitForFunction(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.classicElements.elapsedMs > scene.armProbe.time + 200;
  });
  const after = await inGame(page, `return { count: scene.classicElements.fireOrbs.getLength(), x: scene.armProbe.orb.x, y: scene.armProbe.orb.y, gravity: scene.armProbe.orb.body.allowGravity };`);
  expect(after.count).toBe(before.count);
  expect(Math.hypot(after.x - before.x, after.y - before.y)).toBeGreaterThan(1);
  expect(after.gravity).toBe(false);
});

test('a red coin ring reveals its challenge and awards one extra life exactly once', async ({ page }) => {
  test.setTimeout(60000);
  await start(page, 9);
  const initial = await inGame(page, `
    scene.coins.clear(true, true); scene.enemies.clear(true, true);
    const trial = scene.classicElements.trials[0];
    scene.trialProbe = trial;
    scene.player.body.reset(trial.data.x, trial.data.y); scene.player.body.setVelocity(0, 0);
    return { lives: scene.lives, coins: scene.coinCount, count: trial.coins.length };
  `);
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').trialProbe.state === 'active');
  for (let index = 0; index < initial.count; index++) {
    await page.evaluate(i => {
      const scene = (window as any).__game.scene.getScene('Game'), coin = scene.trialProbe.coins[i];
      scene.player.body.reset(coin.x, coin.y); scene.player.body.setVelocity(0, 0);
    }, index);
    await page.waitForFunction(i => !(window as any).__game.scene.getScene('Game').trialProbe.coins[i].body.enable, index);
  }
  const result = await inGame(page, `return { state: scene.trialProbe.state, lives: scene.lives, coins: scene.coinCount, ringEnabled: scene.trialProbe.ring.body.enable };`);
  expect(result).toEqual({ state: 'complete', lives: initial.lives + 1, coins: initial.coins + initial.count, ringEnabled: false });
});
