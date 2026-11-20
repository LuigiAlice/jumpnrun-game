import { test, expect, type Page } from '@playwright/test';

async function start(page: Page, levelIndex: number) {
  await page.goto('http://localhost:5173');
  await page.waitForFunction(() => (window as any).__game?.scene.isActive('Title'));
  await page.evaluate(index => (window as any).__game.scene.start('Game', { levelIndex: index }), levelIndex);
  await page.waitForFunction(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    return scene.scene.isActive() && !!scene.player && scene.player.body.blocked.down;
  }, undefined, { timeout: 30000 });
}

test('terrain repeats native pixels with full-size colliders and the correct pipe rim', async ({ page }) => {
  await start(page, 0);
  const result = await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    const floor = scene.solidPlatforms.getChildren().find((p: any) => p.platformType === 'grass' && p.width >= 400);
    const rim = scene.platforms.getChildren().find((p: any) => p.platformType === 'pipe_top');
    const mover = scene.movingPlatforms.getChildren()[0];
    return {
      type: floor.type, width: floor.width, colliderWidth: floor.body.width,
      height: floor.height, colliderHeight: floor.body.height,
      columnWidth: floor.displayTexture.getSourceImage().width, scaleX: floor.scaleX,
      rimKey: rim.texture.key,
      moverWidth: mover.displayWidth, moverTextureWidth: mover.texture.getSourceImage().width,
    };
  });
  expect(result.type).toBe('TileSprite');
  expect(result.width).toBe(result.colliderWidth);
  expect(result.height).toBe(result.colliderHeight);
  expect(result.columnWidth).toBe(32);
  expect(result.scaleX).toBe(1);
  expect(result.rimKey).toBe('pipe_top');
  expect(result.moverTextureWidth).toBe(result.moverWidth);
});

test('deep level starts stay visible and background layers cover the camera', async ({ page }) => {
  await start(page, 81);
  const result = await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    const camera = scene.cameras.main;
    return {
      playerY: scene.player.y, scrollY: camera.scrollY, height: camera.height,
      worldHeight: scene.physics.world.bounds.height, dataHeight: scene.currentLevelData.height,
      backgroundFactors: scene.bgTiles.map((tile: any) => [tile.scrollFactorX, tile.scrollFactorY]),
    };
  });
  expect(result.worldHeight).toBeGreaterThanOrEqual(result.dataHeight);
  expect(result.playerY).toBeGreaterThanOrEqual(result.scrollY);
  expect(result.playerY).toBeLessThan(result.scrollY + result.height);
  expect(result.backgroundFactors.every((factor: number[]) => factor[0] === 0 && factor[1] === 0)).toBe(true);
});

test('final boss gates the flag and its flower block can replenish lost fire power', async ({ page }) => {
  test.setTimeout(60000);
  await start(page, 89);
  const result = await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    const boss = scene.enemies.getChildren().find((e: any) => e.getData('type') === 'boss');
    scene.reachGoal();
    const initiallyLocked = !scene.goalUnlocked() && scene.goal.body.enable && !scene.isTransitioning;
    const flowers = scene.questionBlocks.getChildren().filter((b: any) => b.contents === 'flower');
    scene.refillProbe = flowers[0];
    if (scene.refillProbe) { scene.refillProbe.isEmpty = true; scene.refillProbe.setTexture('question_used'); }
    scene.isPlayerFire = false;
    boss.setData('flowerRefillMs', 5999);
    return { initiallyLocked, flowers: flowers.length, hpMaximum: scene.bossHp };
  });
  expect(result.initiallyLocked).toBe(true);
  expect(result.flowers).toBeGreaterThan(0);
  expect(result.hpMaximum).toBe(3);
  await page.waitForFunction(() => !(window as any).__game.scene.getScene('Game').refillProbe.isEmpty);
  const unlocked = await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    const boss = scene.enemies.getChildren().find((e: any) => e.getData('type') === 'boss');
    boss.setData('defeated', true);
    boss.setData('hp', 0);
    scene.updateCoinGate();
    return scene.goalUnlocked() && scene.goal.body.enable;
  });
  expect(unlocked).toBe(true);
  const clearing = await page.evaluate(() => {
    const scene = (window as any).__game.scene.getScene('Game');
    scene.reachGoal();
    scene.die(); // A late hazard must not undo an already completed course.
    return { dead: scene.isDead, clearing: scene.isTransitioning };
  });
  expect(clearing).toEqual({ dead: false, clearing: true });
  await page.waitForFunction(() => (window as any).__game.scene.isActive('GameOver'), undefined, { timeout: 40000 });
  expect(await page.evaluate(() => (window as any).__game.scene.getScene('GameOver').victory)).toBe(true);
});
