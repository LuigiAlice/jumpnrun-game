// Grasslands World - 6 distinct level types (IDs 1-6)
// Tutorial, Gap-Strecke, Röhren-Labyrinth, Vertikal-Kletterer, Gegner-Horde, Flaggen-Run

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

const S = 0.65;

export const GRASSLANDS_LEVELS: LevelData[] = [
  // ============================================================
  // LEVEL 1: Tutorial — Linear, simple, three pipes, gaps ≤ 240px
  // S=0.65, width=13000
  // ============================================================
  {
    id: 1, name: "Grasslands Plains", width: 13000, height: 600, biome: 'grasslands',
    platforms: (() => {
      const plats: any[] = [];
      // Start ground — long enough for player to learn movement
      plats.push(createPlat(250 * S, 550, 1300 * S, 40, 'grass'));
      // Continue ground
      plats.push(createPlat(1455 * S, 550, 800 * S, 40, 'grass'));

      // Stepping platform in small gap
      plats.push(createPlat(2085 * S, 490, 100, 24, 'platform_easy'));

      // Ground after stepping platform
      plats.push(createPlat(2615 * S, 550, 600 * S, 40, 'grass'));

      // Bridge platform before pipes
      plats.push(createPlat(3146 * S, 490, 100, 24, 'platform_easy'));

      // Pipe section — 2 pipes
      plats.push(createPlat(3426 * S, 550, 64, 64, 'pipe'));
      plats.push(createPlat(3426 * S, 506, 80, 24, 'pipe_top'));
      plats.push(createPlat(3678 * S, 550, 64, 64, 'pipe'));
      plats.push(createPlat(3678 * S, 506, 80, 24, 'pipe_top'));

      // Ground after pipes
      plats.push(createPlat(4282 * S, 550, 800 * S, 40, 'grass'));

      // Final stretch
      plats.push(createPlat(5335 * S, 550, 1000 * S, 40, 'grass'));
      plats.push(createPlat(6389 * S, 550, 800 * S, 40, 'grass'));

      return plats;
    })(),
    coins: (() => {
      const cs: any[] = [];
      for (let x = 300; x < 2500; x += 200) cs.push(createCoin(x * S, 500));
      for (let x = 2700; x < 3100; x += 200) cs.push(createCoin(x * S, 500));
      for (let x = 4400; x < 5200; x += 200) cs.push(createCoin(x * S, 500));
      for (let x = 5400; x < 6300; x += 200) cs.push(createCoin(x * S, 500));
      return cs;
    })(),
    questionBlocks: (() => {
      return [
        createQB(550 * S, 480, 'mushroom'),
        createQB(1500 * S, 480, 'coin'),
        createQB(2700 * S, 480, 'mushroom'),
        createQB(4500 * S, 480, 'flower'),
        createQB(5600 * S, 480, 'coin'),
      ];
    })(),
    enemies: (() => {
      return [
        createEnemy(900 * S, 510, 'goomba'),
        createEnemy(2500 * S, 510, 'goomba'),
        createEnemy(3550 * S, 510, 'piranha'),
      ];
    })(),
    decorations: (() => {
      return [
        createDeco(400 * S, 510, 'tree'),
        createDeco(1600 * S, 510, 'bush'),
        createDeco(5000 * S, 510, 'tree'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 6389 * S, y: 528 },
    timeBonus: 120,
    movingPlatforms: [
      createMovingPlat(4808 * S, 490, 130, 24, 'platform_easy', 'horizontal', 280, 20),
    ],
  },

  // ============================================================
  // LEVEL 2: Gap-Strecke — 5 gap sections, 4 moving platforms
  // S=0.625, width=21000
  // ============================================================
  {
    id: 2, name: "Grasslands Gaps", width: 21000, height: 600, biome: 'grasslands',
    platforms: (() => {
      const L2S = 0.625;
      const plats: any[] = [];

      // Ground A
      plats.push(createPlat(250 * L2S, 550, 800 * L2S, 40, 'grass'));

      // Gap 1 to Ground B: 6 stepping platforms
      plats.push(...gapWithPlatforms(L2S, 300, 550, 1600, 6));

      // Ground B
      plats.push(createPlat(2100 * L2S, 550, 600 * L2S, 40, 'grass'));

      // Gap 2 to Ground C: 6 stepping platforms
      plats.push(...gapWithPlatforms(L2S, 2200, 550, 1800, 6));

      // Ground C
      plats.push(createPlat(3900 * L2S, 550, 500 * L2S, 40, 'grass'));

      // Gap 3 to Ground D: 8 stepping platforms
      plats.push(...gapWithPlatforms(L2S, 3900, 550, 2500, 8));

      // Ground D
      plats.push(createPlat(5500 * L2S, 550, 600 * L2S, 40, 'grass'));

      // Stepping from ground D to reach ground at x5750 (gap of 1250px = ~781px unscaled)
      plats.push(createPlat(5650 * L2S, 520, 100, 24, 'platform_easy'));
      plats.push(createPlat(5800 * L2S, 490, 100, 24, 'platform_medium'));
      plats.push(createPlat(5950 * L2S, 520, 100, 24, 'platform_hard'));
      plats.push(createPlat(6100 * L2S, 490, 100, 24, 'platform_easy'));
      plats.push(createPlat(6250 * L2S, 520, 100, 24, 'platform_medium'));

      // Ground E
      plats.push(createPlat(7200 * L2S, 550, 800 * L2S, 40, 'grass'));

      // Gap 5 to Ground F: 6 stepping platforms
      plats.push(...gapWithPlatforms(L2S, 7200, 550, 2000, 6));

      // Ground F (goal area)
      plats.push(createPlat(9200 * L2S, 550, 800 * L2S, 40, 'grass'));

      // Extra bridging to goal
      plats.push(createPlat(10000 * L2S, 520, 100, 24, 'platform_easy'));
      plats.push(createPlat(10200 * L2S, 490, 100, 24, 'platform_medium'));
      plats.push(createPlat(10400 * L2S, 520, 100, 24, 'platform_hard'));
      plats.push(createPlat(10600 * L2S, 550, 200, 40, 'grass'));

      return plats;
    })(),
    coins: (() => {
      const L2S = 0.625;
      const cs: any[] = [];
      for (let x = 300; x < 1100; x += 200) cs.push(createCoin(x * L2S, 500));
      for (let x = 2100 * L2S; x < 2700 * L2S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 5500 * L2S; x < 6100 * L2S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 7200 * L2S; x < 8000 * L2S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 9200 * L2S; x < 10000 * L2S; x += 200) cs.push(createCoin(x, 500));
      return cs;
    })(),
    questionBlocks: (() => {
      const L2S = 0.625;
      return [
        createQB(500 * L2S, 480, 'mushroom'),
        createQB(2300 * L2S, 480, 'coin'),
        createQB(5000 * L2S, 480, 'flower'),
        createQB(6500 * L2S, 480, 'mushroom'),
        createQB(9500 * L2S, 480, 'coin'),
      ];
    })(),
    enemies: (() => {
      const L2S = 0.625;
      return [
        createEnemy(500 * L2S, 510, 'goomba'),
        createEnemy(1500 * L2S, 510, 'koopa'),
        createEnemy(2400 * L2S, 510, 'goomba'),
        createEnemy(3300 * L2S, 510, 'robot'),
        createEnemy(4100 * L2S, 510, 'piranha'),
        createEnemy(5700 * L2S, 510, 'crab'),
        createEnemy(7500 * L2S, 510, 'goomba'),
        createEnemy(8500 * L2S, 510, 'spiny'),
      ];
    })(),
    decorations: (() => {
      const L2S = 0.625;
      return [
        createDeco(400 * L2S, 510, 'tree'),
        createDeco(2200 * L2S, 510, 'bush'),
        createDeco(5600 * L2S, 510, 'tree'),
        createDeco(9400 * L2S, 510, 'bush'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 6625, y: 528 },
    timeBonus: 140,
    movingPlatforms: [
      // Bridge between Ground B and Ground C
      createMovingPlat(2400 * 0.625, 490, 140, 24, 'platform_medium', 'horizontal', 350, 22),
      // Bridge between Ground C and Ground D
      createMovingPlat(4000 * 0.625, 480, 130, 24, 'platform_medium', 'horizontal', 320, 20),
      // Bridge between Ground D and Ground E
      createMovingPlat(5700 * 0.625, 490, 140, 24, 'platform_medium', 'horizontal', 380, 22),
      // Vertical helper near middle
      createMovingPlat(8000 * 0.625, 480, 120, 24, 'platform_easy', 'vertical', 200, 18),
    ],
  },

  // ============================================================
  // LEVEL 3: Röhren-Labyrinth — 6 pipe sections, piranhas, vertical
  // S=0.6, width=20000
  // ============================================================
  {
    id: 3, name: "Grasslands Pipes", width: 20000, height: 900, biome: 'grasslands',
    platforms: (() => {
      const L3S = 0.6;
      const plats: any[] = [];

      // Start ground
      plats.push(createPlat(250 * L3S, 550, 800 * L3S, 40, 'grass'));
      plats.push(createPlat(1300 * L3S, 550, 500 * L3S, 40, 'grass'));

      // Stepping between ground 1300 -> pipe 1800
      plats.push(...gapWithPlatforms(L3S, 1280, 550, 600, 3));

      // Pipe section 1 — 3 pipes at ground level
      plats.push(...pipeSection(L3S, 1800, 550, 3));

      // Small ground between pipe groups
      plats.push(createPlat(3300 * L3S, 550, 400 * L3S, 40, 'grass'));

      // Stepping to reach pipe section 2 at 3700
      plats.push(...gapWithPlatforms(L3S, 3250, 550, 600, 3));

      // Pipe section 2 — 4 pipes at ground level
      plats.push(...pipeSection(L3S, 3700, 550, 4));

      // Elevated ground — players jump up via pipe tops
      plats.push(createPlat(5600 * L3S, 480, 600 * L3S, 40, 'grass'));

      // Stepping to elevated pipe
      plats.push(...gapWithPlatforms(L3S, 5600, 480, 800, 3));

      // Pipe section 3 — 3 pipes at elevated level
      plats.push(...pipeSection(L3S, 6175, 480, 3));

      // Drop down to ground
      plats.push(createPlat(7700 * L3S, 550, 500 * L3S, 40, 'grass'));

      // Stepping to pipe section 4
      plats.push(...gapWithPlatforms(L3S, 7700, 550, 700, 4));

      // Pipe section 4 — 5 pipes, mix of heights (some lower by using placement)
      plats.push(...pipeSection(L3S, 8200, 550, 5));

      // Mid-level platform
      plats.push(createPlat(10200 * L3S, 420, 150, 28, 'platform_medium'));

      // Stepping from mid-level to ground pipes
      plats.push(...gapWithPlatforms(L3S, 10200, 550, 800, 4));

      // Pipe section 5 — 3 pipes at a different height
      plats.push(...pipeSection(L3S, 10200, 550, 3));

      // Ground stretch
      plats.push(createPlat(11800 * L3S, 550, 500 * L3S, 40, 'grass'));

      // Stepping to pipe section 6
      plats.push(...gapWithPlatforms(L3S, 11800, 550, 700, 4));

      // Pipe section 6 — 3 pipes
      plats.push(...pipeSection(L3S, 12300, 550, 3));

      // Stepping to goal
      plats.push(createPlat(13500 * L3S, 520, 100, 24, 'platform_easy'));
      plats.push(createPlat(13650 * L3S, 490, 100, 24, 'platform_medium'));

      // Goal ground
      plats.push(createPlat(13800 * L3S, 550, 800 * L3S, 40, 'grass'));

      return plats;
    })(),
    coins: (() => {
      const L3S = 0.6;
      const cs: any[] = [];
      for (let x = 300; x < 1800; x += 200) cs.push(createCoin(x * L3S, 500));
      for (let x = 3300 * L3S; x < 3700 * L3S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 5600 * L3S; x < 6200 * L3S; x += 200) cs.push(createCoin(x, 430));
      for (let x = 7700 * L3S; x < 8200 * L3S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 12300 * L3S; x < 12800 * L3S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 13900 * L3S; x < 14500 * L3S; x += 200) cs.push(createCoin(x, 500));
      return cs;
    })(),
    questionBlocks: (() => {
      const L3S = 0.6;
      return [
        createQB(500 * L3S, 480, 'mushroom'),
        createQB(1600 * L3S, 480, 'coin'),
        createQB(3500 * L3S, 480, 'flower'),
        createQB(5800 * L3S, 410, 'mushroom'),
        createQB(9000 * L3S, 480, 'star'),
        createQB(11900 * L3S, 480, 'coin'),
      ];
    })(),
    enemies: (() => {
      const L3S = 0.6;
      return [
        createEnemy(500 * L3S, 510, 'goomba'),
        createEnemy(1900 * L3S, 510, 'piranha'),
        createEnemy(2300 * L3S, 510, 'piranha'),
        createEnemy(2900 * L3S, 510, 'piranha'),
        createEnemy(3900 * L3S, 510, 'piranha'),
        createEnemy(6300 * L3S, 440, 'piranha'),
        createEnemy(8400 * L3S, 510, 'piranha'),
        createEnemy(8800 * L3S, 510, 'piranha'),
        createEnemy(11000 * L3S, 510, 'piranha'),
        createEnemy(13000 * L3S, 510, 'piranha'),
        createEnemy(14100 * L3S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const L3S = 0.6;
      return [
        createDeco(400 * L3S, 510, 'tree'),
        createDeco(2400 * L3S, 510, 'bush'),
        createDeco(5700 * L3S, 440, 'tree'),
        createDeco(11900 * L3S, 510, 'bush'),
      ];
    })(),
      playerStart: { x: 150, y: 500 },
    goal: { x: 14100 * 0.6, y: 528 },
    timeBonus: 160,
    movingPlatforms: [
      // Help transition between ground and elevated section
      createMovingPlat(5000 * 0.6, 490, 130, 24, 'platform_medium', 'horizontal', 400, 22),
      // Bridge between mid-level and pipe section 5
      createMovingPlat(9800 * 0.6, 480, 120, 24, 'platform_medium', 'vertical', 180, 20),
    ],
  },

  // ============================================================
  // LEVEL 4: Vertikal-Kletterer — 3× verticalClimb, varied heights
  // S=0.556, width=22000
  // ============================================================
  {
    id: 4, name: "Grasslands Ascent", width: 22000, height: 900, biome: 'grasslands',
    platforms: (() => {
      const L4S = 0.556;
      const plats: any[] = [];

      // Start ground
      plats.push(createPlat(250 * L4S, 550, 600 * L4S, 40, 'grass'));

      // Short bridge platform
      plats.push(createPlat(950 * L4S, 500, 120, 28, 'platform_easy'));

      // Vertical climb 1: arc going up and down
      plats.push(...verticalClimb(L4S, 1100, 550));

      // Bridge gap after vertical climb 1
      plats.push(...gapWithPlatforms(L4S, 2200, 550, 350, 3));

      // Ground after climb 1
      plats.push(createPlat(3200 * L4S, 550, 600 * L4S, 40, 'grass'));

      // Vertical climb 2: higher arc
      plats.push(...verticalClimb(L4S, 3800, 550));

      // Bridge gap after vertical climb 2
      plats.push(...gapWithPlatforms(L4S, 4900, 550, 400, 4));

      // Ground after climb 2
      plats.push(createPlat(5900 * L4S, 550, 500 * L4S, 40, 'grass'));

      // Scattered platforms at mixed heights for varied climbing
      plats.push(createPlat(6600 * L4S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(6900 * L4S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(7200 * L4S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(7500 * L4S, 240, 150, 40, 'grass'));
      plats.push(createPlat(7900 * L4S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(8200 * L4S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(8500 * L4S, 480, 120, 28, 'platform_easy'));

      // Ground mid-section
      plats.push(createPlat(9100 * L4S, 550, 600 * L4S, 40, 'grass'));

      // Bridge gap before vertical climb 3
      plats.push(...gapWithPlatforms(L4S, 9300, 550, 300, 3));

      // Vertical climb 3
      plats.push(...verticalClimb(L4S, 9700, 550));

      // Ground after climb 3
      plats.push(createPlat(11800 * L4S, 550, 600 * L4S, 40, 'grass'));

      // Bridge gap after ground to scattered platforms
      plats.push(...gapWithPlatforms(L4S, 12000, 550, 400, 4));

      // Scattered platforms at different heights (secondary climb)
      plats.push(createPlat(12600 * L4S, 490, 120, 28, 'platform_easy'));
      plats.push(createPlat(12900 * L4S, 430, 120, 28, 'platform_medium'));
      plats.push(createPlat(13200 * L4S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(13500 * L4S, 310, 140, 32, 'platform_hard'));

      // Descending platforms
      plats.push(createPlat(13900 * L4S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(14200 * L4S, 430, 120, 28, 'platform_medium'));
      plats.push(createPlat(14500 * L4S, 490, 120, 28, 'platform_easy'));

      // Final ground to goal
      plats.push(createPlat(15100 * L4S, 550, 800 * L4S, 40, 'grass'));

      return plats;
    })(),
    coins: (() => {
      const L4S = 0.556;
      const cs: any[] = [];
      for (let x = 300; x < 900; x += 200) cs.push(createCoin(x * L4S, 500));
      // Coins along verticalClimb 1 top
      for (let x = 1900; x < 2100; x += 100) cs.push(createCoin(x * L4S, 190));
      for (let x = 3200 * L4S; x < 3800 * L4S; x += 200) cs.push(createCoin(x, 500));
      // Coins at climb 2 peak
      for (let x = 4600; x < 4800; x += 100) cs.push(createCoin(x * L4S, 190));
      // Coins along mixed-height section
      cs.push(createCoin(7500 * L4S, 190));
      for (let x = 9100 * L4S; x < 9700 * L4S; x += 200) cs.push(createCoin(x, 500));
      // Climb 3 peak
      for (let x = 10600; x < 10800; x += 100) cs.push(createCoin(x * L4S, 190));
      for (let x = 11800 * L4S; x < 12400 * L4S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 15100 * L4S; x < 16000 * L4S; x += 200) cs.push(createCoin(x, 500));
      return cs;
    })(),
    questionBlocks: (() => {
      const L4S = 0.556;
      return [
        createQB(500 * L4S, 480, 'mushroom'),
        createQB(2000 * L4S, 170, 'star'),
        createQB(3400 * L4S, 480, 'flower'),
        createQB(4700 * L4S, 170, 'mushroom'),
        createQB(9200 * L4S, 480, 'coin'),
        createQB(15300 * L4S, 480, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const L4S = 0.556;
      return [
        createEnemy(400 * L4S, 510, 'goomba'),
        createEnemy(1600 * L4S, 470, 'crab'),
        createEnemy(2200 * L4S, 190, 'goomba'),
        createEnemy(3300 * L4S, 510, 'koopa'),
        createEnemy(4300 * L4S, 470, 'robot'),
        createEnemy(5000 * L4S, 190, 'spiny'),
        createEnemy(6100 * L4S, 510, 'goomba'),
        createEnemy(7400 * L4S, 200, 'goomba'),
        createEnemy(9900 * L4S, 510, 'robot'),
        createEnemy(10300 * L4S, 190, 'spiny'),
      ];
    })(),
    decorations: (() => {
      const L4S = 0.556;
      return [
        createDeco(300 * L4S, 510, 'tree'),
        createDeco(2500 * L4S, 190, 'bush'),
        createDeco(6000 * L4S, 510, 'tree'),
        createDeco(10000 * L4S, 190, 'bush'),
        createDeco(15500 * L4S, 510, 'tree'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 15500 * 0.556, y: 528 },
    timeBonus: 180,
    movingPlatforms: [
      // Bridge between start ground and climb 1 approach
      createMovingPlat(700 * 0.556, 490, 120, 24, 'platform_medium', 'horizontal', 300, 20),
      // Helper between scattered platforms
      createMovingPlat(8800 * 0.556, 470, 130, 24, 'platform_medium', 'horizontal', 280, 22),
    ],
  },

  // ============================================================
  // LEVEL 5: Gegner-Horde — 15-20 enemies, simpler layout, combat focus
  // S=0.5, width=18000
  // ============================================================
  {
    id: 5, name: "Grasslands Horde", width: 18000, height: 600, biome: 'grasslands',
    platforms: (() => {
      const L5S = 0.5;
      const plats: any[] = [];

      // Long combat arenas — mostly continuous ground with brief gaps
      // Arena 1
      plats.push(createPlat(250 * L5S, 550, 1600 * L5S, 40, 'grass'));

      // Short gap
      plats.push(...gapWithPlatforms(L5S, 1500, 550, 300, 1));

      // Arena 2
      plats.push(createPlat(2900 * L5S, 550, 1800 * L5S, 40, 'grass'));

      // Short gap
      plats.push(...gapWithPlatforms(L5S, 4400, 550, 300, 2));

      // Arena 3
      plats.push(createPlat(6000 * L5S, 550, 1600 * L5S, 40, 'grass'));

      // Pipe section (to populate with piranha) — start earlier to keep gap ≤ 600
      plats.push(...pipeSection(L5S, 7100, 550, 3));

      // Arena 4
      plats.push(createPlat(9500 * L5S, 550, 1800 * L5S, 40, 'grass'));

      // Short gap
      plats.push(...gapWithPlatforms(L5S, 10800, 550, 350, 2));

      // Arena 5 (goal arena)
      plats.push(createPlat(12500 * L5S, 550, 1800 * L5S, 40, 'grass'));

      // Extra platform for exploration past goal
      plats.push(createPlat(13900 * L5S, 500, 120, 28, 'platform_easy'));
      plats.push(createPlat(14200 * L5S, 450, 120, 28, 'platform_medium'));

      return plats;
    })(),
    coins: (() => {
      const L5S = 0.5;
      const cs: any[] = [];
      for (let x = 300; x < 2000; x += 200) cs.push(createCoin(x * L5S, 500));
      for (let x = 2900 * L5S; x < 4700 * L5S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 6000 * L5S; x < 7800 * L5S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 9500 * L5S; x < 11300 * L5S; x += 200) cs.push(createCoin(x, 500));
      for (let x = 12500 * L5S; x < 14300 * L5S; x += 200) cs.push(createCoin(x, 500));
      return cs;
    })(),
    questionBlocks: (() => {
      const L5S = 0.5;
      return [
        createQB(400 * L5S, 480, 'mushroom'),
        createQB(3200 * L5S, 480, 'coin'),
        createQB(6500 * L5S, 480, 'flower'),
        createQB(9800 * L5S, 480, 'mushroom'),
        createQB(13000 * L5S, 480, 'star'),
      ];
    })(),
    enemies: (() => {
      const L5S = 0.5;
      return [
        // Arena 1: 5 enemies
        createEnemy(350 * L5S, 510, 'goomba'),
        createEnemy(600 * L5S, 510, 'goomba'),
        createEnemy(900 * L5S, 510, 'koopa'),
        createEnemy(1200 * L5S, 510, 'goomba'),
        createEnemy(1500 * L5S, 510, 'robot'),
        // Arena 2: 4 enemies  
        createEnemy(3000 * L5S, 510, 'spiny'),
        createEnemy(3400 * L5S, 510, 'goomba'),
        createEnemy(3800 * L5S, 510, 'crab'),
        createEnemy(4300 * L5S, 510, 'koopa'),
        // Arena 3: 4 enemies (plus piranhas)
        createEnemy(6200 * L5S, 510, 'robot'),
        createEnemy(6700 * L5S, 510, 'goomba'),
        createEnemy(7200 * L5S, 510, 'spiny'),
        createEnemy(8100 * L5S, 510, 'piranha'),
        createEnemy(7900 * L5S, 510, 'piranha'),
        // Arena 4: 4 enemies
        createEnemy(9700 * L5S, 510, 'goomba'),
        createEnemy(10300 * L5S, 510, 'koopa'),
        createEnemy(10800 * L5S, 510, 'crab'),
        createEnemy(11200 * L5S, 510, 'robot'),
        // Arena 5: 2 enemies
        createEnemy(12600 * L5S, 510, 'goomba'),
        createEnemy(14000 * L5S, 510, 'spiny'),
      ];
    })(),
    decorations: (() => {
      const L5S = 0.5;
      return [
        createDeco(500 * L5S, 510, 'tree'),
        createDeco(5000 * L5S, 510, 'bush'),
        createDeco(7000 * L5S, 510, 'tree'),
        createDeco(11000 * L5S, 510, 'bush'),
        createDeco(13500 * L5S, 510, 'tree'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 12500 * 0.5, y: 528 },
    timeBonus: 200,
    movingPlatforms: [
      // Quick skip over gap 2
      createMovingPlat(5500 * 0.5, 490, 130, 24, 'platform_medium', 'horizontal', 350, 25),
      // Bridge over pipe section
      createMovingPlat(9000 * 0.5, 480, 120, 24, 'platform_medium', 'horizontal', 400, 24),
    ],
  },

  // ============================================================
  // LEVEL 6: Flaggen-Run — Long, fast dash with many coins
  // S=0.45, width=21000
  // ============================================================
  {
    id: 6, name: "Grasslands Dash", width: 21000, height: 600, biome: 'grasslands',
    platforms: (() => {
      const L6S = 0.45;
      const plats: any[] = [];

      // Long dash sections with minimal gaps — just run and jump
      // Section 1: Sprint start
      plats.push(createPlat(250 * L6S, 550, 2000 * L6S, 40, 'grass'));

      // Brief gap
      plats.push(...gapWithPlatforms(L6S, 1900, 550, 250, 1));

      // Section 2: Run
      plats.push(createPlat(3200 * L6S, 550, 2000 * L6S, 40, 'grass'));

      // Brief gap
      plats.push(...gapWithPlatforms(L6S, 4800, 550, 250, 1));

      // Section 3: Run
      plats.push(createPlat(6200 * L6S, 550, 2000 * L6S, 40, 'grass'));

      // Pipe section — quick obstacle (start earlier to keep gap ≤ 600)
      plats.push(...pipeSection(L6S, 7300, 550, 2));

      // Section 4: Run
      plats.push(createPlat(9400 * L6S, 550, 2000 * L6S, 40, 'grass'));

      // Brief gap
      plats.push(...gapWithPlatforms(L6S, 10900, 550, 250, 1));

      // Section 5: Run
      plats.push(createPlat(12800 * L6S, 550, 2000 * L6S, 40, 'grass'));

      // Section 6: Final sprint
      plats.push(createPlat(15100 * L6S, 550, 2000 * L6S, 40, 'grass'));

      return plats;
    })(),
    coins: (() => {
      const L6S = 0.45;
      const cs: any[] = [];
      // Dense coin trails along all run sections
      for (let x = 300; x < 2400; x += 180) cs.push(createCoin(x * L6S, 500));
      for (let x = 3200 * L6S; x < 5200 * L6S; x += 180) cs.push(createCoin(x, 500));
      for (let x = 6200 * L6S; x < 8200 * L6S; x += 180) cs.push(createCoin(x, 500));
      for (let x = 9800 * L6S; x < 11800 * L6S; x += 180) cs.push(createCoin(x, 500));
      for (let x = 12800 * L6S; x < 14800 * L6S; x += 180) cs.push(createCoin(x, 500));
      for (let x = 15100 * L6S; x < 17100 * L6S; x += 180) cs.push(createCoin(x, 500));
      return cs;
    })(),
    questionBlocks: (() => {
      const L6S = 0.45;
      return [
        createQB(1000 * L6S, 480, 'mushroom'),
        createQB(5000 * L6S, 480, 'flower'),
        createQB(7000 * L6S, 480, 'coin'),
        createQB(10000 * L6S, 480, 'star'),
        createQB(13500 * L6S, 480, 'coin'),
        createQB(16000 * L6S, 480, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const L6S = 0.45;
      return [
        createEnemy(1200 * L6S, 510, 'goomba'),
        createEnemy(1600 * L6S, 510, 'goomba'),
        createEnemy(4000 * L6S, 510, 'koopa'),
        createEnemy(4500 * L6S, 510, 'robot'),
        createEnemy(7000 * L6S, 510, 'spiny'),
        createEnemy(7500 * L6S, 510, 'crab'),
        createEnemy(7600 * L6S, 510, 'piranha'),
        createEnemy(8000 * L6S, 510, 'piranha'),
        createEnemy(10000 * L6S, 510, 'goomba'),
        createEnemy(13500 * L6S, 510, 'koopa'),
        createEnemy(13600 * L6S, 510, 'robot'),
        createEnemy(15800 * L6S, 510, 'crab'),
      ];
    })(),
    decorations: (() => {
      const L6S = 0.45;
      return [
        createDeco(500 * L6S, 510, 'tree'),
        createDeco(3000 * L6S, 510, 'bush'),
        createDeco(6500 * L6S, 510, 'tree'),
        createDeco(10000 * L6S, 510, 'bush'),
        createDeco(13500 * L6S, 510, 'tree'),
        createDeco(16000 * L6S, 510, 'bush'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 15100 * 0.45, y: 528 },
    timeBonus: 220,
    movingPlatforms: [
      // Speed across gap 1
      createMovingPlat(2800 * 0.45, 490, 140, 24, 'platform_medium', 'horizontal', 350, 26),
      // Speed across gap 2
      createMovingPlat(5800 * 0.45, 490, 130, 24, 'platform_medium', 'horizontal', 320, 26),
      // Bridge gap 3
      createMovingPlat(12400 * 0.45, 490, 140, 24, 'platform_medium', 'horizontal', 350, 24),
    ],
  },
];
