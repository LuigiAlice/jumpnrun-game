# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: elements.test.ts >> Pilot elements runtime verification >> T1: spring launches player with SPRING_VELOCITY and long apex
- Location: e2e/elements.test.ts:29:3

# Error details

```
Error: apex 258.66666666666674px above spring too low

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 300
Received:    258.66666666666674
```

# Test source

```ts
  1   | import { test, expect, type Page } from '@playwright/test';
  2   | 
  3   | const startLevel = async (page: Page, levelIndex: number) => {
  4   |   await page.goto('http://localhost:5173');
  5   |   await page.waitForFunction(() => {
  6   |     const g = (window as unknown as { __game?: { scene: Phaser.Scene.ScenePlugin & { isActive: (k: string) => boolean } } }).__game;
  7   |     return typeof g !== 'undefined' && !!g.scene && g.scene.isActive('Title');
  8   |   }, undefined, { timeout: 20000 });
  9   |   await page.evaluate((idx: number) => {
  10  |     (window as unknown as { __game: { scene: { start: (k: string, d?: unknown) => void } } }).__game.scene.start('Game', { levelIndex: idx });
  11  |   }, levelIndex);
  12  |   await page.waitForFunction((idx: number) => {
  13  |     const g = (window as unknown as { __game?: { scene: { getScene: (k: string) => { scene: { isActive: () => boolean }; player?: unknown } } } }).__game;
  14  |     if (!g) return false;
  15  |     const s = g.scene.getScene('Game');
  16  |     return !!s && s.scene.isActive() && !!s.player;
  17  |   }, levelIndex, { timeout: 20000 });
  18  | };
  19  | 
  20  | const inGame = (page: Page, code: string) =>
  21  |   page.evaluate((src: string) => {
  22  |     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  23  |     const s = (window as any).__game.scene.getScene('Game') as any;
  24  |     return new Function('scene', `return (async () => { ${src} })()`)(s);
  25  |   }, code);
  26  | 
  27  | test.describe('Pilot elements runtime verification', () => {
  28  | 
  29  |   test('T1: spring launches player with SPRING_VELOCITY and long apex', async ({ page }) => {
  30  |     await startLevel(page, 0);
  31  |     const res = await inGame(page, `
  32  |       const g = window.__game;
  33  |       const spring = scene.springs.getChildren()[0];
  34  |       if (!spring) return { error: 'no spring found' };
  35  |       const sx = spring.x, sy = spring.y;
  36  |       scene.player.body.reset(sx, sy - 60);
  37  |       scene.player.body.setVelocityX(0);
  38  |       let minVy = 0, minY = Infinity, launchedAt = -1;
  39  |       const t0 = performance.now();
  40  |       while (performance.now() - t0 < 2500) {
  41  |         const sc = g.scene.getScene('Game');
  42  |         const p = sc && sc.player;
  43  |         if (p) {
  44  |           const vy = p.body.velocity.y;
  45  |           if (vy < minVy) minVy = vy;
  46  |           if (p.y < minY) minY = p.y;
  47  |           if (launchedAt < 0 && vy <= -1250) launchedAt = performance.now() - t0;
  48  |         }
  49  |         if (launchedAt >= 0 && performance.now() - t0 - launchedAt > 900) break;
  50  |         await new Promise(r => setTimeout(r, 10));
  51  |       }
  52  |       return { sx, sy, minVy, minY, launchedAt };
  53  |     `);
  54  |     expect(res.error).toBeUndefined();
  55  |     expect(res.launchedAt, `spring launch never reached -1250 (minVy=${res.minVy})`).toBeGreaterThanOrEqual(0);
  56  |     expect(res.minVy, `expected launch velocity <= -1300, got ${res.minVy}`).toBeLessThanOrEqual(-1300);
  57  |     const apex = res.sy - res.minY;
> 58  |     expect(apex, `apex ${apex}px above spring too low`).toBeGreaterThanOrEqual(300);
      |                                                         ^ Error: apex 258.66666666666674px above spring too low
  59  |   });
  60  | 
  61  |   test('T2: spike overlap kills player (isDead, lives--)', async ({ page }) => {
  62  |     await startLevel(page, 2);
  63  |     const initial = await inGame(page, `
  64  |       const spike = scene.spikes.getChildren()[0];
  65  |       if (!spike) return { error: 'no spike found' };
  66  |       scene.livesAtStart = scene.lives;
  67  |       scene.player.body.reset(spike.x, spike.y);
  68  |       return { spikeX: spike.x, spikeY: spike.y, lives: scene.lives };
  69  |     `);
  70  |     expect(initial.error).toBeUndefined();
  71  |     await page.waitForFunction(() => {
  72  |       const s = (window as unknown as { __game?: { scene: { getScene: (k: string) => any } } }).__game!.scene.getScene('Game');
  73  |       return !!s && s.isDead === true;
  74  |     }, undefined, { timeout: 3000 }).catch(() => { throw new Error('spike did not kill player within 2s (isDead never true)'); });
  75  |     await page.waitForTimeout(1700);
  76  |     const after = await inGame(page, `return { lives: scene.lives };`);
  77  |     expect(after.lives).toBeLessThan(initial.lives);
  78  |   });
  79  | 
  80  |   test('T3: big player destroys breakable brick from below (+50 score)', async ({ page }) => {
  81  |     await startLevel(page, 2);
  82  |     const res = await inGame(page, `
  83  |       scene.isPlayerBig = true;
  84  |       scene.player.setTexture('player_big_idle');
  85  |       scene.player.body.setSize(24, 48);
  86  |       scene.player.body.reset(1950, 500);
  87  |       scene.coins.getChildren().forEach(c => c.destroy());
  88  |       const brickExists = () => scene.solidPlatforms.getChildren().some(b => Math.abs(b.x - 1950) < 2 && Math.abs(b.y - 420) < 3);
  89  |       const existed = brickExists();
  90  |       if (!existed) return { existed };
  91  |       const scoreBefore = scene.score;
  92  |       scene.player.body.setVelocityY(-900);
  93  |       let destroyed = false;
  94  |       const t0 = performance.now();
  95  |       while (performance.now() - t0 < 2000) {
  96  |         if (!brickExists()) { destroyed = true; break; }
  97  |         await new Promise(r => setTimeout(r, 15));
  98  |       }
  99  |       return { existed, destroyed, scoreDelta: scene.score - scoreBefore, coinCount: scene.coinCount };
  100 |     `);
  101 |     expect(res.existed, 'brick at (1950,420) was not found in solidPlatforms at level start').toBe(true);
  102 |     expect(res.destroyed, 'brick was not destroyed within 2s after bonk from below').toBe(true);
  103 |     expect(res.scoreDelta, `expected +50 for brick break, got ${res.scoreDelta}`).toBe(50);
  104 |     expect(res.coinCount).toBe(0);
  105 |   });
  106 | 
  107 |   test('T4: load-bearing brick survives bonk (wobble instead of destroy)', async ({ page }) => {
  108 |     await startLevel(page, 36);
  109 |     const res = await inGame(page, `
  110 |       scene.isPlayerBig = true;
  111 |       scene.player.setTexture('player_big_idle');
  112 |       scene.player.body.setSize(24, 48);
  113 |       scene.player.body.reset(2400, 710);
  114 |       const brickExists = () => scene.solidPlatforms.getChildren().some(b => Math.abs(b.x - 2400) < 2 && Math.abs(b.y - 650) < 12);
  115 |       const existed = brickExists();
  116 |       if (!existed) return { existed };
  117 |       scene.player.body.setVelocityY(-900);
  118 |       let destroyed = false;
  119 |       const t0 = performance.now();
  120 |       while (performance.now() - t0 < 1600) {
  121 |         if (!brickExists()) { destroyed = true; break; }
  122 |         const p = scene.player;
  123 |         if (p && performance.now() - t0 > 200) { p.body.setAllowGravity(false); p.body.setVelocity(0, 0); }
  124 |         await new Promise(r => setTimeout(r, 15));
  125 |       }
  126 |       await new Promise(r => setTimeout(r, 500));
  127 |       const stillThere1 = brickExists();
  128 |       await new Promise(r => setTimeout(r, 500));
  129 |       const stillThere2 = brickExists();
  130 |       return { existed, destroyed, stillThere1, stillThere2 };
  131 |     `);
  132 |     expect(res.existed, 'brick at (2400,650) was not found in solidPlatforms at level start').toBe(true);
  133 |     expect(res.destroyed, 'BUG-FUND: load-bearing brick was destroyed by big player bonk (expected wobble)').toBe(false);
  134 |     expect(res.stillThere1).toBe(true);
  135 |     expect(res.stillThere2).toBe(true);
  136 |   });
  137 | 
  138 |   test('T5: coin gate locks goal, reachGoal guarded, opens at coinGoal', async ({ page }) => {
  139 |     await startLevel(page, 4);
  140 |     const locked = await inGame(page, `
  141 |       return {
  142 |         coinGoal: scene.currentLevelData.coinGoal,
  143 |         coinGateOpen: scene.coinGateOpen,
  144 |         goalAlpha: scene.goal.alpha,
  145 |         goalBodyEnabled: scene.goal.body.enable,
  146 |         gateText: scene.coinGateText ? scene.coinGateText.text : null
  147 |       };
  148 |     `);
  149 |     expect(locked.coinGoal).toBe(25);
  150 |     expect(locked.coinGateOpen).toBe(false);
  151 |     expect(locked.goalAlpha).toBeLessThan(1);
  152 |     expect(locked.goalBodyEnabled).toBe(false);
  153 |     expect(locked.gateText).toContain('/ 25');
  154 | 
  155 |     const guard = await inGame(page, `
  156 |       scene.player.body.reset(scene.goal.x, scene.goal.y - 20);
  157 |       const t0 = performance.now();
  158 |       while (performance.now() - t0 < 1600) {
```