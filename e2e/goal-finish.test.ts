import { expect, test, type Page } from '@playwright/test';

async function start(page: Page, levelIndex: number) {
  await page.goto('http://localhost:5173');
  await page.waitForFunction(() => (window as any).__game?.scene.isActive('Title'));
  await page.evaluate(index => (window as any).__game.scene.start('Game', {
    levelIndex: index, lives: 3, score: 0,
  }), levelIndex);
  await page.waitForFunction(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.scene.isActive() && scene.player?.body.blocked.down;
  }, undefined, { timeout: 30000 });
}

test('crossing the goal freezes a falling runner throughout the clear animation without losing a life', async ({ page }) => {
  test.setTimeout(60000);
  await start(page, 0);
  await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    scene.enemies.clear(true, true);
    scene.goalFinishProbe = { samples: [] as number[][], transitions: 0, lives: scene.lives };
    // Keep this completed scene available for inspection after the normal transition delay.
    scene.nextLevel = () => { scene.goalFinishProbe.transitions++; };
    scene.events.on('postupdate', () => {
      if (scene.isTransitioning) scene.goalFinishProbe.samples.push([
        scene.player.x, scene.player.y, scene.lives, scene.player.body.velocity.x,
        scene.player.body.velocity.y,
      ]);
    });
    scene.player.body.reset(scene.goal.x, scene.goal.y);
    scene.player.body.setVelocity(400, 700);
  });
  await page.keyboard.down('ArrowRight');
  await page.waitForFunction(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.goalFinishProbe.transitions === 1 && scene.goalFinishProbe.samples.length >= 3;
  }, undefined, { timeout: 40000 });
  await page.keyboard.up('ArrowRight');
  const result = await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return {
      ...scene.goalFinishProbe,
      dead: scene.isDead,
      gravity: scene.player.body.allowGravity,
    };
  });
  expect(result.dead).toBe(false);
  expect(result.gravity).toBe(false);
  expect(result.transitions).toBe(1);
  const [x, y] = result.samples[0];
  for (const sample of result.samples) {
    expect(sample[0]).toBeCloseTo(x, 5);
    expect(sample[1]).toBeCloseTo(y, 5);
    expect(sample[2]).toBe(result.lives);
    expect(sample.slice(3)).toEqual([0, 0]);
  }
});

test('a locked goal does not freeze the runner or suppress normal gravity', async ({ page }) => {
  await start(page, 4); // Grasslands coin gate.
  const result = await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    if (!scene.currentLevelData.coinGoal) throw new Error('Expected the authored coin gate');
    scene.coinCount = 0;
    const body = scene.player.body;
    body.setVelocity(300, 200);
    scene.reachGoal();
    return {
      transitioning: scene.isTransitioning, dead: scene.isDead,
      enabled: body.enable, moves: body.moves, gravity: body.allowGravity,
      velocity: [body.velocity.x, body.velocity.y], lives: scene.lives,
    };
  });
  expect(result).toEqual({
    transitioning: false, dead: false, enabled: true, moves: true, gravity: true,
    velocity: [300, 200], lives: 3,
  });
});
