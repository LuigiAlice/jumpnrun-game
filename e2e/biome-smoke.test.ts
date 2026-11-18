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

// Zwei Repräsentanten pro Biome + erwartete Biome-Gravity.
const BIOMES = [
  { name: 'grasslands', indices: [0, 3], g: 2000 },
  { name: 'desert', indices: [6, 9], g: 2000 },
  { name: 'water', indices: [12, 15], g: 1200 },
  { name: 'ice-snow', indices: [18, 21], g: 2000 },
  { name: 'sky-clouds', indices: [24, 27], g: 1500 },
  { name: 'forest', indices: [30, 33], g: 2000 },
  { name: 'village', indices: [36, 39], g: 2000 },
  { name: 'beach-island', indices: [42, 45], g: 1500 },
  { name: 'factory', indices: [48, 51], g: 2000 },
  { name: 'volcano-lava', indices: [54, 57], g: 2200 },
  { name: 'haunted-mansion', indices: [60, 63], g: 2000 },
  { name: 'ruins', indices: [66, 69], g: 2000 },
  { name: 'canyon-base', indices: [72, 75], g: 2000 },
  { name: 'space-star', indices: [78, 81], g: 1000 },
  { name: 'castle-final', indices: [84, 87], g: 2000 },
];

// Sichere Untergrenze: 55% der physikalischen Sprunghöhe 900²/(2g).
const minRise = (g: number) => Math.floor(0.55 * 810000 / (2 * g));

for (const biome of BIOMES) {
  test(`smoke: ${biome.name} — spawn, ground, jump, run and movers work`, async ({ page }) => {
    // Headless läuft oft mit 5–15fps; Phaser kappt dann die Physik-Delta.
    // Alle Waits sind deshalb zustandsbasiert (nicht wandzeitbasiert).
    test.setTimeout(90000);
    const errors: string[] = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

    for (const idx of biome.indices) {
      await startLevel(page, idx);
      // Kollateraltod vor jeder Messung verhindern (Feinde sofort entfernen)
      await inGame(page, `
        scene.enemies.getChildren().forEach(e => e.destroy());
        scene.isInvincible = true;
        return true;
      `);
      // Spawn-Settle: grounded ist asynchron (Fallen zum Boden), fps-fair abwarten
      await page.waitForFunction((i: number) => {
        const g = (window as unknown as { __game?: { scene: { getScene: (k: string) => { scene: { isActive: () => boolean }; player?: { body?: { blocked?: { down?: boolean } } }; isDead?: boolean } } } }).__game;
        if (!g) return false;
        const s = g.scene.getScene('Game');
        return !!s && s.scene.isActive() && !!s.player && !s.isDead && !!s.player.body?.blocked?.down;
      }, idx, { timeout: 30000 });
      const info = await inGame(page, `
        return {
          id: scene.currentLevelData.id,
          biome: scene.currentLevelData.biome,
          grounded: scene.player.body.blocked.down,
          startY: scene.player.y,
          goalX: scene.currentLevelData.goal.x,
          width: scene.currentLevelData.width,
          movers: scene.movingPlatforms.getChildren().length,
        };
      `) as { id: number; biome: string; grounded: boolean; startY: number; goalX: number; width: number; movers: number };
      expect(info.biome, `level index ${idx} should be ${biome.name}`).toBe(biome.name);
      expect(info.grounded, `L${info.id}: player is not grounded at spawn`).toBe(true);
      expect(info.goalX, `L${info.id}: goal outside level width`).toBeLessThanOrEqual(info.width);
      expect(info.movers, `L${info.id}: no moving platforms`).toBeGreaterThanOrEqual(1);

      // Sprung (echte Taste): bis zum Apex pollen, Steighöhe muss zur Biome-Gravity passen
      await page.locator('canvas').click({ position: { x: 400, y: 300 } });
      await page.keyboard.down('ArrowUp');
      let minY = info.startY;
      let risingSeen = false;
      let apexed = false;
      let jumpDead = false;
      for (let i = 0; i < 160 && !apexed && !jumpDead; i++) {
        await page.waitForTimeout(50);
        const s = await inGame(page, `return { y: scene.player.y, vy: scene.player.body.velocity.y, dead: scene.isDead };`) as { y: number; vy: number; dead: boolean };
        if (s.dead) { jumpDead = true; break; }
        if (s.y < minY) { minY = s.y; risingSeen = true; }
        else if (risingSeen && s.vy >= 0) apexed = true;
      }
      await page.keyboard.up('ArrowUp');
      expect(jumpDead, `L${info.id}: player died during jump`).toBe(false);
      const rise = info.startY - minY;
      expect(rise, `L${info.id}: jump rise ${rise.toFixed(0)}px, expected >= ${minRise(biome.g)}px (g=${biome.g})`)
        .toBeGreaterThanOrEqual(minRise(biome.g));

      // Nach dem Sprung wieder Boden abwarten (fps-fair), dann laufen
      let groundedAgain = false;
      let landInfo: { y: number; dead: boolean; vy: number } | null = null;
      for (let i = 0; i < 40; i++) {
        await page.waitForTimeout(200);
        landInfo = await inGame(page, `
          return { y: Math.round(scene.player.y), dead: scene.isDead, vy: Math.round(scene.player.body.velocity.y), grounded: scene.player.body.blocked.down };
        `) as typeof landInfo;
        if (landInfo.dead) break;
        if ((landInfo as any).grounded) { groundedAgain = true; break; }
      }
      expect(landInfo!.dead, `L${info.id}: player died after jump — ${JSON.stringify(landInfo)}`).toBe(false);
      expect(groundedAgain, `L${info.id}: player did not land again after jump — ${JSON.stringify(landInfo)}`).toBe(true);

      // Laufen (bis Zielgeschwindigkeit pollen, fps-fair)
      await page.keyboard.down('ArrowRight');
      let maxVx = -Infinity;
      for (let i = 0; i < 40 && maxVx < 250; i++) {
        await page.waitForTimeout(100);
        const vx = await inGame(page, `return scene.player.body.velocity.x;`) as number;
        if (vx > maxVx) maxVx = vx;
      }
      await page.keyboard.up('ArrowRight');
      expect(maxVx, `L${info.id}: run speed ${maxVx} (expected >= 250)`).toBeGreaterThanOrEqual(250);

      // Mover lebt: maximale Abweichung vom Startpunkt über 1.2s (Sinus-Nulldurchgang tolerant)
      const moved = await inGame(page, `
        const list = scene.movingPlatforms.getChildren();
        let m = list.find(x => { const d = scene.movingPlatformData.get(x); return d && (d.moveType === 'vertical' || d.moveType === 'circular'); }) || list[0];
        const x0 = m.x, y0 = m.y;
        let maxDev = 0;
        for (let i = 0; i < 6; i++) {
          await new Promise(r => setTimeout(r, 200));
          const dev = Math.abs(m.x - x0) + Math.abs(m.y - y0);
          if (dev > maxDev) maxDev = dev;
        }
        return maxDev;
      `) as number;
      expect(moved, `L${info.id}: moving platform does not move`).toBeGreaterThan(1);
    }

    const critical = errors.filter(e =>
      !e.includes('favicon') && !e.includes('warning') && !e.includes('deprecated') && !e.includes('DevTools'));
    expect(critical, `${biome.name}: console errors: ${critical.join(' | ')}`).toHaveLength(0);
  });
}
