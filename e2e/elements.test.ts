import { test, expect, type Page } from '@playwright/test';

const startLevel = async (page: Page, levelIndex: number) => {
  await page.goto('http://localhost:5173');
  await page.waitForFunction(() => {
    const g = (window as unknown as { __game?: { scene: Phaser.Scene.ScenePlugin & { isActive: (k: string) => boolean } } }).__game;
    return typeof g !== 'undefined' && !!g.scene && g.scene.isActive('Title');
  }, undefined, { timeout: 20000 });
  await page.evaluate((idx: number) => {
    (window as unknown as { __game: { scene: { start: (k: string, d?: unknown) => void } } }).__game.scene.start('Game', { levelIndex: idx });
  }, levelIndex);
  await page.waitForFunction((idx: number) => {
    const g = (window as unknown as { __game?: { scene: { getScene: (k: string) => { scene: { isActive: () => boolean }; player?: unknown } } } }).__game;
    if (!g) return false;
    const s = g.scene.getScene('Game');
    return !!s && s.scene.isActive() && !!s.player;
  }, levelIndex, { timeout: 20000 });
};

const inGame = (page: Page, code: string) =>
  page.evaluate((src: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s = (window as any).__game.scene.getScene('Game') as any;
    return new Function('scene', `return (async () => { ${src} })()`)(s);
  }, code);

test.describe('Pilot elements runtime verification', () => {

  test('T1: spring launches player with SPRING_VELOCITY and long apex', async ({ page }) => {
    await startLevel(page, 0);
    const res = await inGame(page, `
      const spring = scene.springs.getChildren()[0];
      if (!spring) return { error: 'no spring found' };
      const sx = spring.x, sy = spring.y;
      const sample = { minVy: 0, minY: Infinity, launchedAt: -1, frames: 0, apexReached: false };
      let finish = () => {};
      const done = new Promise(r => { finish = r; });
      const onUpdate = () => {
        const p = scene.player;
        if (!p || !p.body) return;
        sample.frames++;
        const vy = p.body.velocity.y;
        if (vy < sample.minVy) sample.minVy = vy;
        if (vy <= -1250 && sample.launchedAt < 0) sample.launchedAt = sample.frames;
        if (sample.launchedAt > 0) {
          if (p.y < sample.minY) sample.minY = p.y;
          if (vy >= 0) { sample.apexReached = true; finish(); }
        }
      };
      scene.events.on('update', onUpdate);
      scene.player.body.reset(sx, sy - 60);
      scene.player.body.setVelocityX(0);
      await Promise.race([done, new Promise(r => setTimeout(r, 25000))]);
      scene.events.off('update', onUpdate);
      return { sx, sy, minVy: sample.minVy, minY: sample.minY, launchedAt: sample.launchedAt, frames: sample.frames, apexReached: sample.apexReached };
    `);
    expect(res.error).toBeUndefined();
    expect(res.frames, 'scene update loop did not run').toBeGreaterThan(10);
    expect(res.launchedAt, `spring launch never reached -1250 (minVy=${res.minVy})`).toBeGreaterThanOrEqual(0);
    expect(res.minVy, `expected launch velocity <= -1300, got ${res.minVy}`).toBeLessThanOrEqual(-1300);
    expect(res.apexReached, 'apex was not reached before sampling ended').toBe(true);
    const apex = res.sy - res.minY;
    expect(apex, `apex ${apex}px above spring too low`).toBeGreaterThanOrEqual(300);
  });

  test('T2: spike overlap kills player (isDead, lives--)', async ({ page }) => {
    await startLevel(page, 2);
    const initial = await inGame(page, `
      const spike = scene.spikes.getChildren()[0];
      if (!spike) return { error: 'no spike found' };
      scene.livesAtStart = scene.lives;
      scene.player.body.reset(spike.x, spike.y);
      return { spikeX: spike.x, spikeY: spike.y, lives: scene.lives };
    `);
    expect(initial.error).toBeUndefined();
    await page.waitForFunction(() => {
      const s = (window as unknown as { __game?: { scene: { getScene: (k: string) => any } } }).__game!.scene.getScene('Game');
      return !!s && s.isDead === true;
    }, undefined, { timeout: 3000 }).catch(() => { throw new Error('spike did not kill player within 2s (isDead never true)'); });
    await page.waitForTimeout(1700);
    const after = await inGame(page, `return { lives: scene.lives };`);
    expect(after.lives).toBeLessThan(initial.lives);
  });

  test('T3: big player destroys breakable brick from below (+50 score)', async ({ page }) => {
    await startLevel(page, 2);
    const res = await inGame(page, `
      scene.isPlayerBig = true;
      scene.player.setTexture('player_big_idle');
      scene.player.body.setSize(24, 48);
      scene.player.body.reset(1950, 500);
      scene.coins.getChildren().forEach(c => c.destroy());
      const brickExists = () => scene.solidPlatforms.getChildren().some(b => Math.abs(b.x - 1950) < 2 && Math.abs(b.y - 420) < 3);
      const existed = brickExists();
      if (!existed) return { existed };
      const scoreBefore = scene.score;
      scene.player.body.setVelocityY(-900);
      let destroyed = false;
      const t0 = performance.now();
      while (performance.now() - t0 < 2000) {
        if (!brickExists()) { destroyed = true; break; }
        await new Promise(r => setTimeout(r, 15));
      }
      return { existed, destroyed, scoreDelta: scene.score - scoreBefore, coinCount: scene.coinCount };
    `);
    expect(res.existed, 'brick at (1950,420) was not found in solidPlatforms at level start').toBe(true);
    expect(res.destroyed, 'brick was not destroyed within 2s after bonk from below').toBe(true);
    expect(res.scoreDelta, `expected +50 for brick break, got ${res.scoreDelta}`).toBe(50);
    expect(res.coinCount).toBe(0);
  });

  test('T4: load-bearing brick survives bonk (wobble instead of destroy)', async ({ page }) => {
    await startLevel(page, 36);
    const res = await inGame(page, `
      scene.isPlayerBig = true;
      scene.player.setTexture('player_big_idle');
      scene.player.body.setSize(24, 48);
      scene.player.body.reset(2400, 710);
      const brickExists = () => scene.solidPlatforms.getChildren().some(b => Math.abs(b.x - 2400) < 2 && Math.abs(b.y - 650) < 12);
      const existed = brickExists();
      if (!existed) return { existed };
      scene.player.body.setVelocityY(-900);
      let destroyed = false;
      const t0 = performance.now();
      while (performance.now() - t0 < 1600) {
        if (!brickExists()) { destroyed = true; break; }
        const p = scene.player;
        if (p && performance.now() - t0 > 200) { p.body.setAllowGravity(false); p.body.setVelocity(0, 0); }
        await new Promise(r => setTimeout(r, 15));
      }
      await new Promise(r => setTimeout(r, 500));
      const stillThere1 = brickExists();
      await new Promise(r => setTimeout(r, 500));
      const stillThere2 = brickExists();
      return { existed, destroyed, stillThere1, stillThere2 };
    `);
    expect(res.existed, 'brick at (2400,650) was not found in solidPlatforms at level start').toBe(true);
    expect(res.destroyed, 'BUG-FUND: load-bearing brick was destroyed by big player bonk (expected wobble)').toBe(false);
    expect(res.stillThere1).toBe(true);
    expect(res.stillThere2).toBe(true);
  });

  test('T5: coin gate locks goal, reachGoal guarded, opens at coinGoal', async ({ page }) => {
    await startLevel(page, 4);
    const locked = await inGame(page, `
      return {
        coinGoal: scene.currentLevelData.coinGoal,
        coinGateOpen: scene.coinGateOpen,
        goalAlpha: scene.goal.alpha,
        goalBodyEnabled: scene.goal.body.enable,
        gateText: scene.coinGateText ? scene.coinGateText.text : null
      };
    `);
    expect(locked.coinGoal).toBe(25);
    expect(locked.coinGateOpen).toBe(false);
    expect(locked.goalAlpha).toBeLessThan(1);
    expect(locked.goalBodyEnabled).toBe(false);
    expect(locked.gateText).toContain('/ 25');

    const guard = await inGame(page, `
      scene.player.body.reset(scene.goal.x, scene.goal.y - 20);
      const t0 = performance.now();
      while (performance.now() - t0 < 1600) {
        await new Promise(r => setTimeout(r, 50));
      }
      const g = window.__game;
      const sc = g.scene.getScene('Game');
      return { isTransitioning: sc.isTransitioning, stillGame: g.scene.isActive('Game'), levelIndex: sc.levelIndex };
    `);
    expect(guard.stillGame, 'scene left Game while coin gate locked').toBe(true);
    expect(guard.isTransitioning).toBe(false);
    expect(guard.levelIndex).toBe(4);

    await inGame(page, `
      scene.coinCount = 25;
      scene.updateCoinGate();
    `);
    await page.waitForFunction(() => {
      const s = (window as unknown as { __game?: { scene: { getScene: (k: string) => any } } }).__game!.scene.getScene('Game');
      return !!s && s.coinGateOpen === true && s.goal.body.enable === true && s.goal.alpha > 0.9;
    }, undefined, { timeout: 3000 }).catch(() => { throw new Error('coin gate did not open after coinCount reached coinGoal'); });
    const opened = await inGame(page, `
      return { gateText: scene.coinGateText ? scene.coinGateText.text : null, coinGateOpen: scene.coinGateOpen };
    `);
    expect(opened.gateText).toBe('Gate offen!');
    expect(opened.coinGateOpen).toBe(true);
  });

  test('T6: stomp on goomba destroys enemy (+500, bounce -400, player alive)', async ({ page }) => {
    await startLevel(page, 0);
    const setup = await inGame(page, `
      const getType = (e) => e.getData('type') || (e.texture ? e.texture.key : null);
      const stompable = ['goomba', 'koopa', 'spiny', 'robot', 'crab', 'ghost', 'squid', 'ufo'];
      const target = scene.enemies.getChildren().find(e => stompable.includes(getType(e)));
      if (!target) return { error: 'no stompable enemy in level' };
      target.setData('e2eTarget', true);
      scene.livesAtStompStart = scene.lives;
      const scoreBefore = scene.score;
      scene.isPlayerBig = false;
      scene.isPlayerFire = false;
      scene.player.setTexture('player_idle');
      scene.player.body.setSize(22, 32);
      scene.player.body.reset(target.x, target.y - 40);
      scene.player.body.setVelocityY(300);
      return { type: getType(target), scoreBefore, lives: scene.lives, tx: target.x, ty: target.y };
    `);
    expect(setup.error, `Setup failed: ${JSON.stringify(setup)}`).toBeUndefined();
    expect(setup.lives, 'player must be alive before stomp attempt').toBe(setup.livesAtStompStart ?? 3);

    let result: any = null;
    let minVy = Infinity;
    const t0 = Date.now();
    while (Date.now() - t0 < 3000) {
      await page.waitForTimeout(10);
      result = await inGame(page, `
        const p = scene.player;
        const targetAlive = scene.enemies.getChildren().some(e => e.getData('e2eTarget'));
        const vy = p ? p.body.velocity.y : null;
        return { targetAlive, score: scene.score, vy, isDead: scene.isDead, lives: scene.lives };
      `);
      if (typeof result.vy === 'number' && result.vy < minVy) minVy = result.vy;
      if (!result.targetAlive) break;
    }
    expect(result, 'poll produced no result').not.toBeNull();
    expect(result.targetAlive, `target enemy was not destroyed within 3s (score=${result.score}, isDead=${result.isDead})`).toBe(false);
    // Coins collected during the fall may add score on top of the +500 stomp.
    expect(result.score, `expected at least +500 for stomp, got score=${result.score} (before=${setup.scoreBefore})`).toBeGreaterThanOrEqual(setup.scoreBefore + 500);
    expect(result.isDead, 'player died instead of stomping').toBe(false);
    expect(result.lives, 'player lives must be unchanged after stomp').toBe(setup.lives);
    // Bounce -400: Aufwaerts-Geschwindigkeit kurz nach Stomp (Poll-Intervall 10ms;
    // Gravity 2000 reduziert vy pro Sample um ~20, daher Grenze -300 statt exakt -400).
    expect(minVy, `player did not bounce upward after stomp (minVy=${minVy}, expected <= -300)`).toBeLessThanOrEqual(-300);
  });
});
