import { test, expect, type Page } from '@playwright/test';

const startLevel = async (page: Page, levelIndex: number) => {
  await page.goto('http://localhost:5173');
  await page.waitForFunction(() => {
    const g = (window as unknown as { __game?: { scene: Phaser.Scene.ScenePlugin & { isActive: (k: string) => boolean } } }).__game;
    return typeof g !== 'undefined' && !!g.scene && g.scene.isActive('Title');
  }, undefined, { timeout: 30000 });
  await page.evaluate((idx: number) => {
    (window as unknown as { __game: { scene: { start: (k: string, d?: unknown) => void } } }).__game.scene.start('Game', { levelIndex: idx });
  }, levelIndex);
  await page.waitForFunction((idx: number) => {
    const g = (window as unknown as { __game?: { scene: { getScene: (k: string) => { scene: { isActive: () => boolean }; player?: unknown } } } }).__game;
    if (!g) return false;
    const s = g.scene.getScene('Game');
    return !!s && s.scene.isActive() && !!s.player;
  }, levelIndex, { timeout: 30000 });
};

const inGame = (page: Page, code: string) =>
  page.evaluate((src: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const s = (window as any).__game.scene.getScene('Game') as any;
    return new Function('scene', `return (async () => { ${src} })()`)(s);
  }, code);

test('F1: floating enemies leave no invisible ground (water routes stay open)', async ({ page }) => {
  test.setTimeout(60000);
  await startLevel(page, 13); // L14 Tidal Tunnels — squids mid-water
  const litter = await inGame(page, `
    return scene.solidPlatforms.getChildren()
      .filter(p => (p.platformType === 'grass') && p.displayWidth === 80 && p.displayHeight === 20).length;
  `) as number;
  expect(litter, 'hidden safePlat slabs under floating enemies').toBe(0);

  // Swim-escape: auf den Grabenboden setzen, dann Up+Left bis der Spieler über
  // der linken Uferkante (top 620) schwebt, Keys loslassen, Landung abwarten.
  // Zustandsbasierte Phasen — fps-unabhängig (Headless-Slow-Mo sicher).
  const res = await inGame(page, `
    scene.enemies.getChildren().forEach(e => e.destroy());
    scene.makeInvincible(600000);
    const plats = scene.currentLevelData.platforms.filter(p => p.type !== 'lava' && p.type !== 'pipe');
    const deep = plats.reduce((a, b) => ((b.y - b.h / 2) > (a.y - a.h / 2) ? b : a));
    const top = deep.y - deep.h / 2;
    scene.player.body.reset(deep.x - 11, top - 34);
    scene.player.body.setVelocity(0, 0);
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const sample = () => ({
      x: Math.round(scene.player.x), y: Math.round(scene.player.y),
      grounded: !!scene.player.body.blocked.down, dead: scene.isDead,
      gy: Math.round(scene.player.body.gravity.y),
      vx: Math.round(scene.player.body.velocity.x), vy: Math.round(scene.player.body.velocity.y),
    });
    const done = (o) => !o.dead && o.grounded && o.y <= 650;
    for (let i = 0; i < 30 && !sample().grounded && !sample().dead; i++) await sleep(100);
    let out = sample();
    scene.cursors.up.isDown = true;
    scene.cursors.left.isDown = true;
    // Phase A: über die Uferkante (y <= 596 => bottom 612 < Kante 620)
    for (let i = 0; i < 100 && !done(out) && !out.dead && out.y > 596; i++) { await sleep(100); out = sample(); }
    // Phase B: auf die linke Uferplatte (x <= 1385), up gehalten gegen Absacken
    for (let i = 0; i < 50 && !done(out) && !out.dead && out.x > 1385; i++) { await sleep(100); out = sample(); }
    // Phase C: Keys loslassen und Landung abwarten
    scene.cursors.up.isDown = false;
    scene.cursors.left.isDown = false;
    for (let i = 0; i < 40 && !done(out) && !out.dead; i++) { await sleep(100); out = sample(); }
    return { escaped: done(out), ...out };
  `) as { escaped: boolean; x: number; y: number; grounded: boolean; dead: boolean; gy: number; vx: number; vy: number };
  expect(res.dead, `player died during the swim probe — ${JSON.stringify(res)}`).toBe(false);
  expect(res.escaped,
    `player could not climb out of the deep-water pit (y=${res.y}, grounded=${res.grounded}, x=${res.x}, vy=${res.vy}, gy=${res.gy}) — swim route blocked`).toBe(true);
});

test('F2: crumble platform breaks after 800ms and respawns after 3s', async ({ page }) => {
  // Crumble-Start: 800ms Wandzeit; Respawn: delayedCall(3000) auf Game-Time
  // (bei Headless-Slow-Mo bis ~20s+ Wandzeit) — daher großzügige Waits.
  test.setTimeout(120000);
  await startLevel(page, 28); // L29 sky — crumble bonus route
  const setup = await inGame(page, `
    // Neutralize collateral deaths — die() pauses physics and timers
    scene.enemies.getChildren().forEach(e => e.destroy());
    scene.makeInvincible(600000);
    const all = [...scene.platforms.getChildren(), ...scene.solidPlatforms.getChildren()];
    const p = all.find(x => x.getData && x.getData('crumble') && x.body && x.body.enable);
    if (!p) return { error: 'no crumble platform' };
    window.__cp = p;
    scene.player.body.reset(p.x - 11, p.body.y - 34);
    scene.player.body.setVelocity(0, 0);
    return { top: Math.round(p.body.y) };
  `) as { error?: string; top: number };
  expect(setup.error, JSON.stringify(setup)).toBeUndefined();
  let broken = true;
  try {
    await page.waitForFunction(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cp = (window as any).__cp;
      return !!cp && !!cp.body && cp.body.enable === false;
    }, undefined, { timeout: 25000 });
  } catch { broken = false; }
  const state = await inGame(page, `
    return { broken: !window.__cp.body.enable, under: scene.player.body.blocked.down };
  `) as { broken: boolean; under: boolean };
  expect(broken && state.broken, `crumble platform did not break while stood on (player grounded=${state.under})`).toBe(true);
  // Park the player safely so a death/restart cannot orphan the respawn timer
  await inGame(page, `
    scene.player.body.setAllowGravity(false);
    scene.player.body.reset(200, 200);
    scene.player.body.setVelocity(0, 0);
  `);
  let respawned = true;
  try {
    await page.waitForFunction(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cp = (window as any).__cp;
      return !!cp && !!cp.body && cp.body.enable === true;
    }, undefined, { timeout: 45000 });
  } catch { respawned = false; }
  const last = await inGame(page, `
    return [window.__cp.body.enable, window.__cp.getData('crumbled'), Math.round(window.__cp.alpha)];
  `) as unknown[];
  expect(respawned && last[1] === false && last[0] === true,
    `crumble platform did not respawn after 3s — state ${JSON.stringify(last)}`).toBe(true);
});

test('F3: conveyor belt carries the idle player in its direction', async ({ page }) => {
  await startLevel(page, 48); // L49 factory
  const res = await inGame(page, `
    const all = [...scene.platforms.getChildren(), ...scene.solidPlatforms.getChildren()];
    const p = all.find(x => x.getData && x.getData('conveyor'));
    if (!p) return { error: 'no conveyor platform' };
    const belt = p.getData('conveyor');
    scene.player.body.reset(p.x - 11, p.body.y - 34);
    scene.player.body.setVelocity(0, 0);
    const steps = [];
    let x0 = null;
    for (let i = 0; i < 6; i++) {
      await new Promise(r => setTimeout(r, 250));
      const gp = scene.getGroundPlatform();
      if (x0 === null) x0 = scene.player.x;
      steps.push([i * 250, Math.round(scene.player.x - x0), Math.round(scene.player.body.velocity.x), !!scene.player.body.blocked.down, gp && gp.getData ? gp.getData('conveyor') : null]);
    }
    return { belt, drift: Math.round(scene.player.x - x0), steps };
  `) as { error?: string; belt: number; drift: number; steps: unknown[] };
  expect(res.error, JSON.stringify(res)).toBeUndefined();
  expect(Math.abs(res.belt - Math.abs(res.steps[res.steps.length - 1][2])),
    `belt velocity not applied to player — steps ${JSON.stringify(res.steps)}`).toBeLessThanOrEqual(8);
  expect(res.drift * res.belt, `belt ${res.belt} but drift ${res.drift}px — steps ${JSON.stringify(res.steps)}`).toBeGreaterThan(0);
  expect(Math.abs(res.drift), `belt drift too small: ${res.drift}px — steps ${JSON.stringify(res.steps)}`).toBeGreaterThan(8);
});

test('F4: ice platforms keep momentum longer than snow', async ({ page }) => {
  await startLevel(page, 18); // L19 ice-snow
  const slide = (type: string) => `
    const all = [...scene.platforms.getChildren(), ...scene.solidPlatforms.getChildren()];
    const cands = all.filter(x => (x.platformType || x.getData?.('platformType')) === '${type}' && x.displayWidth > 200);
    const p = cands.sort((a, b) => b.displayWidth - a.displayWidth)[0];
    if (!p) return { error: 'no wide ${type} platform' };
    // Safe spot: maximize distance to spikes and enemies along the platform
    const hazards = [
      ...(scene.currentLevelData.spikes || []),
      ...(scene.currentLevelData.enemies || []),
    ];
    let sx = p.x;
    let best = -1;
    for (const cand of [p.x - p.displayWidth * 0.3, p.x, p.x + p.displayWidth * 0.3]) {
      const clear = hazards.reduce((m, h) => Math.min(m, Math.abs(h.x - cand)), 1e9);
      if (clear > best) { best = clear; sx = cand; }
    }
    if (best < 250) return { error: 'no safe spot on ${type} platform', clear: best };
    scene.player.body.reset(sx - 11, p.body.y - 32);
    scene.player.body.setVelocity(0, 0);
    // Settle onto the surface so the ice/snow ground detection is active
    for (let i = 0; i < 6 && !scene.player.body.blocked.down; i++) {
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    }
    if (!scene.player.body.blocked.down) return { error: 'did not settle on ${type}' };
    scene.player.body.setVelocity(300, 0);
    // Frame-counted decay: compare the same number of physics steps at any fps
    let frames = 0;
    await new Promise(r => {
      const onStep = () => {
        frames++;
        if (frames >= 10) { scene.physics.world.off('worldstep', onStep); r(undefined); }
      };
      scene.physics.world.on('worldstep', onStep);
    });
    return { vx: Math.abs(scene.player.body.velocity.x), dead: scene.isDead, frames, sx: Math.round(sx), clear: Math.round(best) };
  `;
  const onIce = await inGame(page, slide('ice')) as { error?: string; vx: number; dead: boolean; frames: number; sx: number; clear: number };
  const onSnow = await inGame(page, slide('snow')) as { error?: string; vx: number; dead: boolean; frames: number; sx: number; clear: number };
  expect(onIce.error, JSON.stringify(onIce)).toBeUndefined();
  expect(onSnow.error, JSON.stringify(onSnow)).toBeUndefined();
  expect(onIce.dead || onSnow.dead, `player died during slide (ice=${JSON.stringify(onIce)}, snow=${JSON.stringify(onSnow)})`).toBe(false);
  expect(onSnow.vx, 'snow must stop immediately when no direction is held').toBe(0);
  expect(onIce.vx, `ice slide ended at ${onIce.vx.toFixed(0)}px/s vs snow ${onSnow.vx.toFixed(0)}px/s (ice=${JSON.stringify(onIce)}, snow=${JSON.stringify(onSnow)})`)
    .toBeGreaterThan(onSnow.vx + 15);
});

test('F5: checkpoint activates and stores the respawn point', async ({ page }) => {
  await startLevel(page, 1); // L2 grasslands
  const res = await inGame(page, `
    const cp = scene.checkpointGroup.getChildren()[0];
    if (!cp) return { error: 'no checkpoint in level' };
    scene.player.body.reset(cp.x - 11, cp.y - 30);
    scene.player.body.setVelocity(0, 0);
    await new Promise(r => setTimeout(r, 350));
    return {
      active: cp.getData('active'),
      respawn: scene.respawnPoint ? { x: Math.round(scene.respawnPoint.x), y: Math.round(scene.respawnPoint.y) } : null,
    };
  `) as { error?: string; active: boolean; respawn: { x: number; y: number } | null };
  expect(res.error, JSON.stringify(res)).toBeUndefined();
  expect(res.active, 'checkpoint did not activate').toBe(true);
  expect(res.respawn, 'respawnPoint not stored').not.toBeNull();
});

test('F6: wind zone pushes the player sideways', async ({ page }) => {
  await startLevel(page, 5); // L6 grasslands
  const res = await inGame(page, `
    const z = scene.currentLevelData.windZones[0];
    scene.player.body.reset(z.x + z.w / 2 - 11, z.y + z.h / 2 - 16);
    scene.player.body.setVelocity(0, 0);
    scene.player.body.setAllowGravity(false);
    let maxVx = 0;
    for (let i = 0; i < 22; i++) {
      await new Promise(r => setTimeout(r, 150));
      const vx = Math.abs(scene.player.body.velocity.x);
      if (vx > maxVx) maxVx = vx;
    }
    scene.player.body.setAllowGravity(true);
    return { maxVx: Math.round(maxVx) };
  `) as { maxVx: number };
  expect(res.maxVx, `no wind gust inside zone (maxVx=${res.maxVx})`).toBeGreaterThanOrEqual(80);
});

test('F7: water zone activates swim physics', async ({ page }) => {
  await startLevel(page, 12); // L13 water
  const res = await inGame(page, `
    const z = scene.currentLevelData.waterZones[0];
    scene.player.body.reset(z.x + z.w / 2 - 11, z.y + z.h / 2 - 16);
    scene.player.body.setVelocity(0, 0);
    await new Promise(r => setTimeout(r, 150));
    const gravityY = scene.player.body.gravity.y;
    scene.cursors.up.isDown = true;
    await new Promise(r => setTimeout(r, 120));
    const swimVy = scene.player.body.velocity.y;
    scene.cursors.up.isDown = false;
    return { gravityY: Math.round(gravityY), swimVy: Math.round(swimVy) };
  `) as { gravityY: number; swimVy: number };
  expect(res.gravityY, 'water zone did not enable swim gravity').toBe(-600);
  expect(res.swimVy, `swim up velocity ${res.swimVy} (expected ≈ -250)`).toBeLessThanOrEqual(-200);
});

test('F8: collecting the key opens all doors', async ({ page }) => {
  await startLevel(page, 36); // L37 village
  const res = await inGame(page, `
    const key = scene.keyGroup.getChildren()[0];
    if (!key) return { error: 'no key in level' };
    scene.player.body.reset(key.x - 11, key.y - 16);
    scene.player.body.setVelocity(0, 0);
    const steps = [];
    for (let i = 0; i < 6; i++) {
      await new Promise(r => setTimeout(r, 250));
      steps.push([i * 250, scene.keysCollected, scene.totalKeys,
        scene.doorSprites.filter(d => d.getData && d.getData('open')).length,
        scene.doorSprites.filter(d => d.body && d.body.enable).length]);
    }
    return { keys: scene.keysCollected, total: scene.totalKeys, doors: scene.doorSprites.length,
      doorsOpen: scene.doorSprites.every(d => !d.body || !d.body.enable), steps };
  `) as { error?: string; keys: number; total: number; doors: number; doorsOpen: boolean; steps: unknown[] };
  const diag = `keys=${res.keys}/${res.total} doors=${res.doors} steps=${JSON.stringify(res.steps)}`;
  expect(res.error, JSON.stringify(res)).toBeUndefined();
  expect(res.keys, `key was not collected — ${diag}`).toBeGreaterThanOrEqual(1);
  expect(res.doors, `no doors in level — ${diag}`).toBeGreaterThanOrEqual(1);
  expect(res.keys, `not all keys collected — ${diag}`).toBe(res.total);
  expect(res.doorsOpen, `doors did not open after collecting all keys — ${diag}`).toBe(true);
});

test('F9: cannons fire projectiles', async ({ page }) => {
  await startLevel(page, 50); // L51 factory
  const res = await inGame(page, `
    // Control: a manually spawned shot must survive its muzzle
    const c0 = scene.currentLevelData.cannons[0];
    const manual = scene.fallingHazards.create(c0.x + c0.dir * 30, c0.y - 12, 'fireball');
    manual.body.setAllowGravity(false);
    manual.setVelocity(c0.dir * (c0.speed ?? 260), 0);
    await new Promise(r => setTimeout(r, 400));
    const manualAlive = manual.active && manual.body && manual.body.enable && manual.x !== undefined;
    const samples = [];
    let seen = manualAlive ? 1 : 0;
    for (let i = 0; i < 16; i++) {
      await new Promise(r => setTimeout(r, 150));
      const n = scene.fallingHazards.getChildren().length;
      samples.push(n);
      if (n > seen) seen = n;
    }
    return { cannons: scene.currentLevelData.cannons, seen, manualAlive, samples };
  `) as { cannons: unknown[]; seen: number; manualAlive: boolean; samples: number[] };
  expect(res.cannons.length, `no cannons in level data — ${JSON.stringify(res)}`).toBeGreaterThanOrEqual(1);
  expect(res.seen, `cannon never fired a projectile — ${JSON.stringify(res)}`).toBeGreaterThanOrEqual(1);
});

test('F10: time gate keeps the goal locked until the countdown runs', async ({ page }) => {
  await startLevel(page, 52); // L53 factory (timeGate 40 + coinGoal 24)
  const locked = await inGame(page, `
    scene.coinCount = 24;
    scene.updateCoinGate();
    return { open: scene.coinGateOpen, enabled: scene.goal.body.enable };
  `) as { open: boolean; enabled: boolean };
  expect(locked.open, 'time gate opened too early').toBe(false);
  expect(locked.enabled, 'locked goal must keep sensing contact for requirement feedback').toBe(true);
  const opened = await inGame(page, `
    scene.timeLeft = scene.totalTime - 50;
    await new Promise(r => setTimeout(r, 250));
    return { open: scene.coinGateOpen, enabled: scene.goal.body.enable, elapsed: Math.round(scene.levelElapsed) };
  `) as { open: boolean; enabled: boolean; elapsed: number };
  expect(opened.open, `goal did not unlock after the time gate (elapsed=${opened.elapsed})`).toBe(true);
  expect(opened.enabled).toBe(true);
});

test('F11: multi-goal flags complete the level with bonus', async ({ page }) => {
  await startLevel(page, 11); // L12 desert
  const res = await inGame(page, `
    if (!scene.extraGoals.length) return { error: 'no extra goal flags' };
    const g = scene.extraGoals[0];
    scene.player.body.reset(g.x - 11, g.y - 30);
    scene.player.body.setVelocity(0, 0);
    await new Promise(r => setTimeout(r, 400));
    return { flags: scene.extraGoals.length, transitioning: scene.isTransitioning };
  `) as { error?: string; flags: number; transitioning: boolean };
  expect(res.error, JSON.stringify(res)).toBeUndefined();
  expect(res.flags).toBeGreaterThanOrEqual(1);
  expect(res.transitioning, 'touching an extra goal flag did not complete the level').toBe(true);
});

test('F12: rising flood climbs toward the player', async ({ page }) => {
  await startLevel(page, 17); // L18 water finale
  const res = await inGame(page, `
    const flood = scene.platforms.getChildren().find(p => p.getData && p.getData('risingLava'));
    if (!flood) return { error: 'no rising flood platform' };
    scene.player.body.reset(flood.x, 150);
    scene.player.body.setVelocity(0, 0);
    scene.player.body.setAllowGravity(false);
    const y0 = flood.y;
    await new Promise(r => setTimeout(r, 2000));
    return { y0: Math.round(y0), y1: Math.round(flood.y) };
  `) as { error?: string; y0: number; y1: number };
  expect(res.error, JSON.stringify(res)).toBeUndefined();
  expect(res.y1, `flood did not rise (y ${res.y0} -> ${res.y1})`).toBeLessThan(res.y0 - 3);
});

test('F13: hidden brick reveals itself when bonked from below and rewards only once', async ({ page }) => {
  test.setTimeout(60000);
  await startLevel(page, 61);
  await inGame(page, `
    const block = scene.solidPlatforms.getChildren().find(p => p.platformType === 'hidden');
    if (!block) throw new Error('no hidden platform');
    scene.enemies.getChildren().forEach(e => e.destroy());
    scene.coins.clear(true, true);
    scene.makeInvincible(600000);
    scene.hiddenProbe = block;
    scene.coinsBeforeHidden = scene.coinCount;
    scene.player.body.reset(block.x, block.body.y + block.body.height + 40);
    scene.player.body.setVelocity(0, -900);
  `);
  await page.waitForFunction(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.hiddenProbe?.platformType === 'question_used' && !scene.tweens.isTweening(scene.hiddenProbe);
  }, undefined, { timeout: 20000 });
  const first = await inGame(page, `return { visible: scene.hiddenProbe.visible, coins: scene.coinCount, before: scene.coinsBeforeHidden };`);
  expect(first.visible).toBe(true);
  expect(first.coins).toBe(first.before + 1);
  await inGame(page, `
    scene.secondHiddenBonk = false;
    const block = scene.hiddenProbe;
    const sample = () => {
      if (scene.player.body.touching.up && block.body.touching.down) {
        scene.secondHiddenBonk = true;
        scene.events.off('postupdate', sample);
      }
    };
    scene.events.on('postupdate', sample);
    scene.player.body.reset(block.x, block.body.y + block.body.height + 40);
    scene.player.body.setVelocity(0, -900);
  `);
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').secondHiddenBonk, undefined, { timeout: 20000 });
  const after = await inGame(page, `return scene.coinCount;`);
  expect(after).toBe(first.coins);
});

test('F14: 1-UP question block grants an extra life', async ({ page }) => {
  await startLevel(page, 2); // L3 grasslands — oneup QB
  const res = await inGame(page, `
    const qb = scene.questionBlocks.getChildren().find(b => b.contents === 'oneup');
    if (!qb) return { error: 'no oneup question block' };
    const lives0 = scene.lives;
    scene.player.body.reset(qb.x - 11, qb.y + 44);
    scene.player.body.setVelocity(0, -900);
    await new Promise(r => setTimeout(r, 600));
    return { lives0, lives: scene.lives };
  `) as { error?: string; lives0: number; lives: number };
  expect(res.error, JSON.stringify(res)).toBeUndefined();
  expect(res.lives, `1-UP did not grant a life (${res.lives0} -> ${res.lives})`).toBe(res.lives0 + 1);
});
