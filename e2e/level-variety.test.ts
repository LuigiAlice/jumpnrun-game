import { expect, test, type Page } from '@playwright/test';

const REWRITTEN_LEVELS = [8, 14, 20, 28, 32, 38, 44, 50, 58, 62, 74, 80];

async function startLevel(page: Page, id: number) {
  await page.goto('http://localhost:5173');
  await page.waitForFunction(() => (window as any).__game?.scene.isActive('Title'));
  await page.evaluate(levelId => (window as any).__game.scene.start('Game', {
    levelIndex: levelId - 1, lives: 3, score: 0,
  }), id);
  await page.waitForFunction(levelId => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.scene.isActive() && scene.currentLevelData?.id === levelId
      && scene.player?.body.blocked.down && !scene.isDead;
  }, id, { timeout: 30000 });
}

for (const id of REWRITTEN_LEVELS) {
  test(`level identity L${id}: safe grounded spawn and camera bounds match the new main route`, async ({ page }) => {
    await startLevel(page, id);
    const state = await page.evaluate(() => {
      const scene = (window as any).__game.scene.getScene('Game');
      const camera = scene.cameras.main, body = scene.player.body;
      const level = scene.currentLevelData;
      return {
        id: level.id, dead: scene.isDead, lives: scene.lives,
        player: { x: scene.player.x, y: scene.player.y, bottom: body.bottom },
        camera: { x: camera.scrollX, y: camera.scrollY, width: camera.width, height: camera.height },
        world: { width: scene.physics.world.bounds.width, height: scene.physics.world.bounds.height },
        data: { width: level.width, height: level.height },
        ground: level.platforms.filter((platform: any) => platform.type !== 'lava'
          && Math.abs(platform.x - scene.player.x) <= platform.w / 2
          && Math.abs(platform.y - platform.h / 2 - body.bottom) <= 2).length,
        backgrounds: scene.bgTiles.map((tile: any) => [tile.scrollFactorX, tile.scrollFactorY]),
      };
    });
    expect(state.id).toBe(id);
    expect(state.dead).toBe(false);
    expect(state.lives).toBe(3);
    expect(state.ground).toBeGreaterThan(0);
    expect(state.world.width).toBe(state.data.width);
    expect(state.world.height).toBe(Math.max(800, state.data.height));
    expect(state.player.x).toBeGreaterThanOrEqual(state.camera.x);
    expect(state.player.x).toBeLessThanOrEqual(state.camera.x + state.camera.width);
    expect(state.player.y).toBeGreaterThanOrEqual(state.camera.y);
    expect(state.player.y).toBeLessThanOrEqual(state.camera.y + state.camera.height);
    expect(state.backgrounds).toHaveLength(7);
    expect(state.backgrounds.every((factors: number[]) => factors[0] === 0 && factors[1] === 0)).toBe(true);
    if (id === 28) {
      expect(state.data.height).toBeGreaterThan(1600);
      expect(state.camera.y).toBeGreaterThan(800);
    }
  });
}

test('the high tower goal holds the runner safely until the ordinary level transition', async ({ page }) => {
  await startLevel(page, 28);
  await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    scene.enemies.clear(true, true);
    scene.finishProbe = { samples: [] as number[][], transitions: 0 };
    // Observe the completed scene across its real scene-clock transition delay.
    scene.nextLevel = () => { scene.finishProbe.transitions++; };
    scene.events.on('postupdate', () => {
      if (scene.isTransitioning) scene.finishProbe.samples.push([
        scene.player.x, scene.player.y, scene.lives, scene.player.body.velocity.x, scene.player.body.velocity.y,
      ]);
    });
    scene.player.body.reset(scene.goal.x, scene.goal.y);
    scene.player.body.setVelocity(300, 700);
  });
  await page.keyboard.down('ArrowRight');
  await page.waitForFunction(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.finishProbe.transitions === 1 && scene.finishProbe.samples.length >= 3;
  }, undefined, { timeout: 40000 });
  await page.keyboard.up('ArrowRight');
  const result = await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return { ...scene.finishProbe, dead: scene.isDead, bodyEnabled: scene.player.body.enable };
  });
  expect(result.dead).toBe(false);
  expect(result.bodyEnabled).toBe(false);
  expect(result.transitions).toBe(1);
  const first = result.samples[0];
  for (const sample of result.samples) {
    expect(sample[0]).toBeCloseTo(first[0], 5);
    expect(sample[1]).toBeCloseTo(first[1], 5);
    expect(sample[2]).toBe(3);
    expect(sample.slice(3)).toEqual([0, 0]);
  }
});

test('the cloud tower first ascent is reachable with ordinary running and a held jump', async ({ page }) => {
  test.setTimeout(60000);
  await startLevel(page, 28);
  await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    scene.enemies.clear(true, true);
    scene.towerJumpProbe = { launched: false, landed: false, startX: 0, minY: scene.player.y };
    scene.events.on('postupdate', () => {
      const p = scene.player, probe = scene.towerJumpProbe;
      probe.minY = Math.min(probe.minY, p.y);
      if (!probe.launched && p.body.velocity.y < -500) {
        probe.launched = true;
        probe.startX = p.x;
      }
      if (probe.launched && p.body.blocked.down && Math.abs(p.body.bottom - 2420) < 2) probe.landed = true;
    });
  });
  await page.keyboard.down('ArrowRight');
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').player.x >= 530);
  await page.keyboard.down('z');
  await page.waitForFunction(() => (window as any).__game.scene.getScene('Game').towerJumpProbe.launched);
  await page.waitForFunction(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.player.x >= 840 || scene.isDead;
  });
  await page.keyboard.up('ArrowRight');
  await page.waitForFunction(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.towerJumpProbe.landed || scene.isDead;
  }, undefined, { timeout: 30000 });
  await page.keyboard.up('z');
  const state = await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return {
      ...scene.towerJumpProbe, dead: scene.isDead, lives: scene.lives,
      x: scene.player.x, bottom: scene.player.body.bottom,
    };
  });
  expect(state.dead).toBe(false);
  expect(state.lives).toBe(3);
  expect(state.landed).toBe(true);
  expect(state.startX).toBeLessThan(600);
  expect(state.x).toBeGreaterThan(720);
  expect(state.x).toBeLessThan(980);
  expect(state.bottom).toBeCloseTo(2420, 0);
});

test('the maintenance shaft camera follows the required westbound floor instead of locking forward', async ({ page }) => {
  await startLevel(page, 50);
  await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    scene.enemies.clear(true, true);
    // Begin on the authored westbound middle floor; no platforms or physics are mocked.
    scene.player.body.reset(2100, 776);
    scene.player.body.setVelocity(0, 0);
    scene.cameras.main.centerOn(2100, 776);
  });
  await page.waitForFunction(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.player.body.blocked.down && Math.abs(scene.player.body.bottom - 820) < 2;
  });
  const initial = await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return { x: scene.player.x, scrollX: scene.cameras.main.scrollX };
  });
  await page.keyboard.down('ArrowLeft');
  await page.waitForFunction(startX => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.player.x <= startX - 140 || scene.isDead;
  }, initial.x);
  await page.keyboard.up('ArrowLeft');
  await page.waitForFunction(startScrollX => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.cameras.main.scrollX < startScrollX - 30 || scene.isDead;
  }, initial.scrollX);
  const result = await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return {
      dead: scene.isDead, mode: scene.currentLevelData.cameraMode,
      bottom: scene.player.body.bottom, scrollX: scene.cameras.main.scrollX,
    };
  });
  expect(result.dead).toBe(false);
  expect(result.mode).toBe('bidirectional');
  expect(result.bottom).toBeCloseTo(820, 0);
  expect(result.scrollX).toBeLessThan(initial.scrollX - 30);
});
