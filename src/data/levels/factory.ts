// Factory World - 6 distinct level types (IDs 49-54)
// Tutorial, Gap-Strecke, Röhren-Labyrinth, Vertikal-Kletterer, Gegner-Horde, Förderband-Finale

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

export const FACTORY_LEVELS: LevelData[] = [
  // ============================================================
  // LEVEL 49: Tutorial — Simple factory path, one gap, few enemies
  // S=0.625, width=20000
  // ============================================================
  {
    id: 49, name: "Gear Grinder", width: 20000, height: 650, biome: 'factory',
    platforms: (() => {
      const S = 0.625;
      const plats: any[] = [];

      // Start ground
      plats.push(createPlat(100 * S, 600, 1000 * S, 40, 'metal'));
      plats.push(createPlat(1300 * S, 600, 800 * S, 40, 'metal'));

      // Gap with more stepping platforms
      plats.push(...gapWithPlatforms(S, 2100, 600, 300, 2));

      // Ground after gap
      plats.push(createPlat(2800 * S, 600, 600 * S, 40, 'metal'));

      // Bridge to pipe section
      plats.push(...gapWithPlatforms(S, 3600, 600, 400, 3));
      // Pipe section — 2 pipes
      plats.push(...pipeSection(S, 3600, 600, 2));

      // Bridge after pipes
      plats.push(...gapWithPlatforms(S, 5000, 600, 400, 3));

      // Ground after pipes
      plats.push(createPlat(5000 * S, 600, 800 * S, 40, 'metal'));

      // Bridge to final ground
      plats.push(...gapWithPlatforms(S, 6300, 600, 400, 3));

      // Final ground to goal
      plats.push(createPlat(6300 * S, 600, 1000 * S, 40, 'metal'));
      plats.push(...gapWithPlatforms(S, 7800, 600, 400, 3));
      plats.push(createPlat(7800 * S, 600, 800 * S, 40, 'metal'));

      return plats;
    })(),
    coins: (() => {
      const S = 0.625;
      const cs: any[] = [];
      for (let x = 300; x < 2000; x += 200) cs.push(createCoin(x * S, 550));
      for (let x = 2800 * S; x < 3600 * S; x += 200) cs.push(createCoin(x, 550));
      for (let x = 5000 * S; x < 6000 * S; x += 200) cs.push(createCoin(x, 550));
      for (let x = 6300 * S; x < 7300 * S; x += 200) cs.push(createCoin(x, 550));
      return cs;
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(500 * S, 530, 'mushroom'),
        createQB(1700 * S, 530, 'coin'),
        createQB(3200 * S, 530, 'mushroom'),
        createQB(5400 * S, 530, 'flower'),
        createQB(6700 * S, 530, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(600 * S, 560, 'robot'),
        createEnemy(1600 * S, 560, 'goomba'),
        createEnemy(3900 * S, 560, 'piranha'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      return [
        createDeco(300 * S, 560, 'gear'),
        createDeco(1500 * S, 560, 'conveyor'),
        createDeco(3000 * S, 560, 'crane'),
        createDeco(5200 * S, 560, 'smoke'),
        createDeco(6500 * S, 560, 'gear'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 6800 * 0.625, y: 578 },
    timeBonus: 120,
    movingPlatforms: [
      createMovingPlat(4500 * 0.625, 540, 130, 24, 'platform_easy', 'horizontal', 300, 20),
    ],
  },

  // ============================================================
  // LEVEL 50: Gap-Strecke — 5 gap sections, 4 moving platforms
  // S=0.6, width=21000
  // ============================================================
  {
    id: 50, name: "Steel Gaps", width: 21000, height: 650, biome: 'factory',
    platforms: (() => {
      const S = 0.6;
      const plats: any[] = [];

      // Ground A
      plats.push(createPlat(250 * S, 600, 800 * S, 40, 'metal'));

      // Gap 1: 3 stepping platforms
      plats.push(...gapWithPlatforms(S, 1100, 600, 500, 3));

      // Ground B
      plats.push(createPlat(2100 * S, 600, 600 * S, 40, 'metal'));

      // Gap 2: 4 stepping platforms
      plats.push(...gapWithPlatforms(S, 2800, 600, 600, 4));

      // Ground C
      plats.push(createPlat(3900 * S, 600, 500 * S, 40, 'metal'));

      // Gap 3: 3 stepping platforms
      plats.push(...gapWithPlatforms(S, 4500, 600, 500, 3));

      // Ground D
      plats.push(createPlat(5500 * S, 600, 600 * S, 40, 'metal'));

      // Gap 4: 3 stepping platforms
      plats.push(...gapWithPlatforms(S, 6200, 600, 500, 3));

      // Ground E
      plats.push(createPlat(7200 * S, 600, 800 * S, 40, 'metal'));

      // Gap 5: 4 stepping platforms
      plats.push(...gapWithPlatforms(S, 8100, 600, 600, 4));

      // Ground F (goal area)
      plats.push(createPlat(9200 * S, 600, 800 * S, 40, 'metal'));
      plats.push(createPlat(10300 * S, 600, 500 * S, 40, 'metal'));

      return plats;
    })(),
    coins: (() => {
      const S = 0.6;
      const cs: any[] = [];
      for (let x = 300; x < 1000; x += 200) cs.push(createCoin(x * S, 550));
      for (let x = 2100 * S; x < 2700 * S; x += 200) cs.push(createCoin(x, 550));
      for (let x = 5500 * S; x < 6100 * S; x += 200) cs.push(createCoin(x, 550));
      for (let x = 7200 * S; x < 8000 * S; x += 200) cs.push(createCoin(x, 550));
      for (let x = 9200 * S; x < 10000 * S; x += 200) cs.push(createCoin(x, 550));
      return cs;
    })(),
    questionBlocks: (() => {
      const S = 0.6;
      return [
        createQB(500 * S, 530, 'mushroom'),
        createQB(2300 * S, 530, 'coin'),
        createQB(3700 * S, 530, 'flower'),
        createQB(5800 * S, 530, 'mushroom'),
        createQB(9500 * S, 530, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.6;
      return [
        createEnemy(500 * S, 560, 'robot'),
        createEnemy(1600 * S, 560, 'crab'),
        createEnemy(2400 * S, 560, 'goomba'),
        createEnemy(3200 * S, 560, 'koopa'),
        createEnemy(5800 * S, 560, 'robot'),
        createEnemy(7600 * S, 560, 'goomba'),
        createEnemy(8400 * S, 560, 'spiny'),
        createEnemy(9600 * S, 560, 'crab'),
      ];
    })(),
    decorations: (() => {
      const S = 0.6;
      return [
        createDeco(400 * S, 560, 'gear'),
        createDeco(2300 * S, 560, 'conveyor'),
        createDeco(5600 * S, 560, 'crane'),
        createDeco(9400 * S, 560, 'smoke'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 9600 * 0.6, y: 578 },
    timeBonus: 140,
    movingPlatforms: [
      createMovingPlat(1600 * 0.6, 530, 140, 24, 'platform_medium', 'horizontal', 350, 22),
      createMovingPlat(4000 * 0.6, 520, 130, 24, 'platform_medium', 'horizontal', 320, 20),
      createMovingPlat(5800 * 0.6, 530, 140, 24, 'platform_medium', 'horizontal', 380, 22),
      createMovingPlat(8000 * 0.6, 520, 120, 24, 'platform_easy', 'vertical', 200, 18),
    ],
  },

  // ============================================================
  // LEVEL 51: Röhren-Labyrinth — 7 pipe sections, piranhas, mixed heights
  // S=0.556, width=22000
  // ============================================================
  {
    id: 51, name: "Pipe Maze", width: 22000, height: 900, biome: 'factory',
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];

      // Start ground
      plats.push(createPlat(250 * S, 600, 800 * S, 40, 'metal'));
      plats.push(createPlat(1300 * S, 600, 500 * S, 40, 'metal'));

      // Pipe section 1 — 3 pipes at ground level
      plats.push(...pipeSection(S, 1800, 600, 3));

      // Small ground between pipe groups
      plats.push(createPlat(3300 * S, 600, 400 * S, 40, 'metal'));

      // Pipe section 2 — 4 pipes at ground level
      plats.push(...pipeSection(S, 3700, 600, 4));

      // Elevated ground — players jump up via pipe tops
      plats.push(createPlat(5600 * S, 500, 600 * S, 40, 'metal'));

      // Pipe section 3 — 3 pipes at elevated level
      plats.push(...pipeSection(S, 6300, 500, 3));

      // Drop transition back to ground
      plats.push(createPlat(7700 * S, 560, 150, 28, 'platform_easy'));
      plats.push(createPlat(8100 * S, 620, 150, 28, 'platform_easy'));

      // Ground section
      plats.push(createPlat(8300 * S, 600, 500 * S, 40, 'metal'));

      // Pipe section 4 — 5 pipes at ground level
      plats.push(...pipeSection(S, 8800, 600, 5));

      // Ground
      plats.push(createPlat(10800 * S, 600, 400 * S, 40, 'metal'));

      // Pipe section 5 — 3 pipes at ground level
      plats.push(...pipeSection(S, 11200, 600, 3));

      // Ground stretch
      plats.push(createPlat(12700 * S, 600, 500 * S, 40, 'metal'));

      // Pipe section 6 — 4 pipes at ground
      plats.push(...pipeSection(S, 13300, 600, 4));

      // Ground
      plats.push(createPlat(15200 * S, 600, 400 * S, 40, 'metal'));

      // Pipe section 7 — 3 pipes
      plats.push(...pipeSection(S, 15700, 600, 3));

      // Goal ground
      plats.push(createPlat(17200 * S, 600, 800 * S, 40, 'metal'));

      // Bridge platforms to close BFS gaps
      plats.push(createPlat(3451.0, 396, 100, 24, 'platform_easy'));
      plats.push(createPlat(7356.9, 496, 100, 24, 'platform_easy'));

      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      const cs: any[] = [];
      for (let x = 300; x < 1700; x += 200) cs.push(createCoin(x * S, 550));
      for (let x = 3300 * S; x < 3700 * S; x += 200) cs.push(createCoin(x, 550));
      for (let x = 5600 * S; x < 6200 * S; x += 200) cs.push(createCoin(x, 450));
      for (let x = 8300 * S; x < 8800 * S; x += 200) cs.push(createCoin(x, 550));
      for (let x = 12700 * S; x < 13300 * S; x += 200) cs.push(createCoin(x, 550));
      for (let x = 17200 * S; x < 18000 * S; x += 200) cs.push(createCoin(x, 550));
      return cs;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(500 * S, 530, 'mushroom'),
        createQB(2000 * S, 530, 'coin'),
        createQB(5400 * S, 530, 'flower'),
        createQB(5900 * S, 430, 'mushroom'),
        createQB(9000 * S, 530, 'star'),
        createQB(11400 * S, 530, 'coin'),
        createQB(17500 * S, 530, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(500 * S, 560, 'robot'),
        createEnemy(1900 * S, 560, 'piranha'),
        createEnemy(2400 * S, 560, 'piranha'),
        createEnemy(2900 * S, 560, 'piranha'),
        createEnemy(3900 * S, 560, 'piranha'),
        createEnemy(6400 * S, 460, 'piranha'),
        createEnemy(6800 * S, 460, 'piranha'),
        createEnemy(7200 * S, 460, 'piranha'),
        createEnemy(8500 * S, 560, 'goomba'),
        createEnemy(9000 * S, 560, 'piranha'),
        createEnemy(11400 * S, 560, 'piranha'),
        createEnemy(13500 * S, 560, 'piranha'),
        createEnemy(15900 * S, 560, 'piranha'),
        createEnemy(17500 * S, 560, 'robot'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(400 * S, 560, 'conveyor'),
        createDeco(2500 * S, 560, 'gear'),
        createDeco(5800 * S, 460, 'crane'),
        createDeco(8500 * S, 560, 'smoke'),
        createDeco(13000 * S, 560, 'conveyor'),
        createDeco(15500 * S, 560, 'gear'),
        createDeco(17400 * S, 560, 'crane'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 17600 * 0.556, y: 578 },
    timeBonus: 160,
    movingPlatforms: [
      createMovingPlat(5100 * 0.556, 540, 130, 24, 'platform_medium', 'horizontal', 400, 22),
      createMovingPlat(10400 * 0.556, 540, 120, 24, 'platform_medium', 'vertical', 180, 20),
      createMovingPlat(16300 * 0.556, 530, 130, 24, 'platform_medium', 'horizontal', 350, 24),
    ],
  },

  // ============================================================
  // LEVEL 52: Vertikal-Kletterer — 4 verticalClimb sections, mixed heights
  // S=0.5, width=22000
  // ============================================================
  {
    id: 52, name: "Smokestack Climb", width: 22000, height: 900, biome: 'factory',
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];

      // Start ground
      plats.push(createPlat(250 * S, 600, 600 * S, 40, 'metal'));

      // Short bridge platform
      plats.push(createPlat(950 * S, 540, 120, 28, 'platform_easy'));

      // Vertical climb 1 — arc going up and down
      plats.push(...verticalClimb(S, 1100, 600, 'brick'));

      // Ground after climb 1
      plats.push(createPlat(3200 * S, 600, 600 * S, 40, 'metal'));

      // Vertical climb 2 — higher arc
      plats.push(...verticalClimb(S, 3800, 600, 'brick'));

      // Ground after climb 2
      plats.push(createPlat(5900 * S, 600, 500 * S, 40, 'metal'));

      // Scattered platforms at mixed heights for varied climbing
      plats.push(createPlat(6600 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(6900 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(7200 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(7500 * S, 280, 150, 40, 'brick'));
      plats.push(createPlat(7900 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(8200 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(8500 * S, 520, 120, 28, 'platform_easy'));

      // Ground mid-section
      plats.push(createPlat(9100 * S, 600, 600 * S, 40, 'metal'));

      // Vertical climb 3
      plats.push(...verticalClimb(S, 9700, 600, 'brick'));

      // Ground after climb 3
      plats.push(createPlat(11800 * S, 600, 600 * S, 40, 'metal'));

      // Secondary climb — scattered platforms
      plats.push(createPlat(12600 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(12900 * S, 470, 120, 28, 'platform_medium'));
      plats.push(createPlat(13200 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(13500 * S, 350, 140, 32, 'platform_hard'));

      // Descending platforms
      plats.push(createPlat(13900 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(14200 * S, 470, 120, 28, 'platform_medium'));
      plats.push(createPlat(14500 * S, 530, 120, 28, 'platform_easy'));

      // Vertical climb 4
      plats.push(...verticalClimb(S, 15100, 600, 'brick'));

      // Final ground to goal
      plats.push(createPlat(17200 * S, 600, 800 * S, 40, 'metal'));

      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      const cs: any[] = [];
      for (let x = 300; x < 900; x += 200) cs.push(createCoin(x * S, 550));
      // Coins along verticalClimb 1 top
      for (let x = 1900; x < 2100; x += 100) cs.push(createCoin(x * S, 240));
      for (let x = 3200 * S; x < 3800 * S; x += 200) cs.push(createCoin(x, 550));
      // Coins at climb 2 peak
      for (let x = 4600; x < 4800; x += 100) cs.push(createCoin(x * S, 240));
      // Mixed-height section coins
      cs.push(createCoin(7500 * S, 230));
      for (let x = 9100 * S; x < 9700 * S; x += 200) cs.push(createCoin(x, 550));
      // Climb 3 peak
      for (let x = 10600; x < 10800; x += 100) cs.push(createCoin(x * S, 240));
      for (let x = 11800 * S; x < 12400 * S; x += 200) cs.push(createCoin(x, 550));
      // Climb 4 peak
      for (let x = 16000; x < 16200; x += 100) cs.push(createCoin(x * S, 240));
      for (let x = 17200 * S; x < 18000 * S; x += 200) cs.push(createCoin(x, 550));
      return cs;
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(500 * S, 530, 'mushroom'),
        createQB(2000 * S, 220, 'star'),
        createQB(3400 * S, 530, 'flower'),
        createQB(4700 * S, 220, 'mushroom'),
        createQB(9200 * S, 530, 'coin'),
        createQB(10700 * S, 220, 'star'),
        createQB(16000 * S, 220, 'mushroom'),
        createQB(17500 * S, 530, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(400 * S, 560, 'robot'),
        createEnemy(1600 * S, 520, 'crab'),
        createEnemy(2200 * S, 240, 'goomba'),
        createEnemy(3300 * S, 560, 'koopa'),
        createEnemy(4300 * S, 520, 'robot'),
        createEnemy(5000 * S, 240, 'goomba'),
        createEnemy(6100 * S, 560, 'robot'),
        createEnemy(7400 * S, 230, 'crab'),
        createEnemy(9900 * S, 560, 'robot'),
        createEnemy(10300 * S, 240, 'koopa'),
        createEnemy(12800 * S, 490, 'goomba'),
        createEnemy(15300 * S, 520, 'robot'),
        createEnemy(15800 * S, 240, 'crab'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      return [
        createDeco(300 * S, 560, 'conveyor'),
        createDeco(2500 * S, 240, 'gear'),
        createDeco(6000 * S, 560, 'smoke'),
        createDeco(9300 * S, 560, 'crane'),
        createDeco(10400 * S, 240, 'conveyor'),
        createDeco(15400 * S, 240, 'gear'),
        createDeco(17400 * S, 560, 'smoke'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 17600 * 0.5, y: 578 },
    timeBonus: 180,
    movingPlatforms: [
      createMovingPlat(700 * 0.5, 530, 120, 24, 'platform_medium', 'horizontal', 300, 20),
      createMovingPlat(8800 * 0.5, 520, 130, 24, 'platform_medium', 'horizontal', 280, 22),
      createMovingPlat(16600 * 0.5, 520, 130, 24, 'platform_medium', 'horizontal', 320, 24),
    ],
  },

  // ============================================================
  // LEVEL 53: Gegner-Horde — 15-20 enemies, simpler layout, combat focus
  // S=0.455, width=20000
  // ============================================================
  {
    id: 53, name: "Robot Rampage", width: 20000, height: 700, biome: 'factory',
    platforms: (() => {
      const S = 0.455;
      const plats: any[] = [];

      // Arena 1 — long combat area
      plats.push(createPlat(250 * S, 650, 1800 * S, 40, 'metal'));

      // Short gap
      plats.push(...gapWithPlatforms(S, 2300, 650, 300, 1));

      // Arena 2
      plats.push(createPlat(3200 * S, 650, 2000 * S, 40, 'metal'));

      // Short gap
      plats.push(...gapWithPlatforms(S, 5500, 650, 350, 2));

      // Arena 3
      plats.push(createPlat(6700 * S, 650, 1800 * S, 40, 'metal'));

      // Pipe section with piranhas
      plats.push(...pipeSection(S, 8600, 650, 3));

      // Arena 4
      plats.push(createPlat(10500 * S, 650, 2000 * S, 40, 'metal'));

      // Short gap
      plats.push(...gapWithPlatforms(S, 12700, 650, 350, 2));

      // Arena 5 (goal arena)
      plats.push(createPlat(14000 * S, 650, 1800 * S, 40, 'metal'));

      // Extra platforms
      plats.push(createPlat(16000 * S, 580, 120, 28, 'platform_easy'));
      plats.push(createPlat(16300 * S, 530, 120, 28, 'platform_medium'));

      // Bridge platforms to close BFS gaps
      plats.push(createPlat(794.0, 530, 100, 24, 'platform_easy'));
      plats.push(createPlat(2208.3, 530, 100, 24, 'platform_easy'));
      plats.push(createPlat(3729.8, 546, 100, 24, 'platform_easy'));
      plats.push(createPlat(5507.0, 530, 100, 24, 'platform_easy'));
      plats.push(createPlat(6999.8, 520, 100, 24, 'platform_easy'));

      return plats;
    })(),
    coins: (() => {
      const S = 0.455;
      const cs: any[] = [];
      for (let x = 300; x < 2200; x += 200) cs.push(createCoin(x * S, 600));
      for (let x = 3200 * S; x < 5200 * S; x += 200) cs.push(createCoin(x, 600));
      for (let x = 6700 * S; x < 8500 * S; x += 200) cs.push(createCoin(x, 600));
      for (let x = 10500 * S; x < 12500 * S; x += 200) cs.push(createCoin(x, 600));
      for (let x = 14000 * S; x < 15800 * S; x += 200) cs.push(createCoin(x, 600));
      return cs;
    })(),
    questionBlocks: (() => {
      const S = 0.455;
      return [
        createQB(400 * S, 580, 'mushroom'),
        createQB(3500 * S, 580, 'coin'),
        createQB(7000 * S, 580, 'flower'),
        createQB(10800 * S, 580, 'mushroom'),
        createQB(14300 * S, 580, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.455;
      return [
        // Arena 1: 5 enemies
        createEnemy(350 * S, 610, 'robot'),
        createEnemy(600 * S, 610, 'robot'),
        createEnemy(900 * S, 610, 'goomba'),
        createEnemy(1200 * S, 610, 'koopa'),
        createEnemy(1500 * S, 610, 'goomba'),
        // Arena 2: 5 enemies
        createEnemy(3300 * S, 610, 'robot'),
        createEnemy(3700 * S, 610, 'crab'),
        createEnemy(4100 * S, 610, 'goomba'),
        createEnemy(4500 * S, 610, 'koopa'),
        createEnemy(4900 * S, 610, 'robot'),
        // Arena 3: 4 enemies + piranhas
        createEnemy(6900 * S, 610, 'robot'),
        createEnemy(7400 * S, 610, 'goomba'),
        createEnemy(7900 * S, 610, 'koopa'),
        createEnemy(8800 * S, 610, 'piranha'),
        createEnemy(9200 * S, 610, 'piranha'),
        // Arena 4: 4 enemies
        createEnemy(10700 * S, 610, 'robot'),
        createEnemy(11200 * S, 610, 'crab'),
        createEnemy(11700 * S, 610, 'robot'),
        createEnemy(12200 * S, 610, 'goomba'),
        // Arena 5: 3 enemies
        createEnemy(14200 * S, 610, 'robot'),
        createEnemy(15000 * S, 610, 'goomba'),
        createEnemy(15500 * S, 610, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.455;
      return [
        createDeco(400 * S, 610, 'gear'),
        createDeco(2000 * S, 610, 'conveyor'),
        createDeco(3600 * S, 610, 'smoke'),
        createDeco(5200 * S, 610, 'crane'),
        createDeco(7200 * S, 610, 'gear'),
        createDeco(10800 * S, 610, 'conveyor'),
        createDeco(14000 * S, 610, 'smoke'),
        createDeco(15500 * S, 610, 'gear'),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 14400 * 0.455, y: 628 },
    timeBonus: 200,
    movingPlatforms: [
      createMovingPlat(6000 * 0.455, 590, 130, 24, 'platform_medium', 'horizontal', 350, 25),
      createMovingPlat(10000 * 0.455, 580, 120, 24, 'platform_medium', 'horizontal', 400, 24),
      createMovingPlat(14500 * 0.455, 580, 130, 24, 'platform_easy', 'vertical', 180, 22),
    ],
  },

  // ============================================================
  // LEVEL 54: Förderband-Finale — Conveyor-like linear path, many obstacles
  // S=0.417, width=22000
  // ============================================================
  {
    id: 54, name: "Conveyor Chaos", width: 22000, height: 700, biome: 'factory',
    platforms: (() => {
      const S = 0.417;
      const plats: any[] = [];

      // Section 1 — Start sprint
      plats.push(createPlat(250 * S, 650, 2000 * S, 40, 'metal'));

      // Brief gap with platforms
      plats.push(...gapWithPlatforms(S, 2500, 650, 250, 1));

      // Section 2 — Long run with scattered elevated platforms
      plats.push(createPlat(3200 * S, 650, 2000 * S, 40, 'metal'));

      // Elevated obstacle platforms
      plats.push(createPlat(4000 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(4400 * S, 500, 120, 28, 'platform_medium'));

      // Section 3 — Conveyor area with pipes as obstacles
      plats.push(...pipeSection(S, 5200, 650, 2));

      // Continue ground
      plats.push(createPlat(6500 * S, 650, 2000 * S, 40, 'metal'));

      // Section 4 — Dense obstacle area
      plats.push(createPlat(8800 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(9200 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(9600 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(10000 * S, 490, 120, 28, 'platform_medium'));

      // Ground continues
      plats.push(createPlat(10400 * S, 650, 2000 * S, 40, 'metal'));

      // Pipe obstacle area
      plats.push(...pipeSection(S, 12600, 650, 3));

      // Section 5 — Final conveyor dash
      plats.push(createPlat(14200 * S, 650, 2000 * S, 40, 'metal'));

      // Elevated platforms in final section
      plats.push(createPlat(14800 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(15200 * S, 500, 120, 28, 'platform_medium'));
      plats.push(createPlat(15600 * S, 430, 120, 28, 'platform_hard'));

      // Brief gap
      plats.push(...gapWithPlatforms(S, 16300, 650, 300, 2));

      // Section 6 — Goal stretch
      plats.push(createPlat(17200 * S, 650, 2000 * S, 40, 'metal'));

      return plats;
    })(),
    coins: (() => {
      const S = 0.417;
      const cs: any[] = [];
      for (let x = 300; x < 2400; x += 180) cs.push(createCoin(x * S, 600));
      for (let x = 3200 * S; x < 5200 * S; x += 180) cs.push(createCoin(x, 600));
      for (let x = 6500 * S; x < 8500 * S; x += 180) cs.push(createCoin(x, 600));
      for (let x = 10400 * S; x < 12400 * S; x += 180) cs.push(createCoin(x, 600));
      for (let x = 14200 * S; x < 16200 * S; x += 180) cs.push(createCoin(x, 600));
      for (let x = 17200 * S; x < 19200 * S; x += 180) cs.push(createCoin(x, 600));
      return cs;
    })(),
    questionBlocks: (() => {
      const S = 0.417;
      return [
        createQB(1200 * S, 580, 'mushroom'),
        createQB(5400 * S, 580, 'coin'),
        createQB(7000 * S, 580, 'flower'),
        createQB(11000 * S, 580, 'star'),
        createQB(15000 * S, 580, 'mushroom'),
        createQB(17800 * S, 580, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.417;
      return [
        // Section 1: 2 enemies
        createEnemy(800 * S, 610, 'robot'),
        createEnemy(1800 * S, 610, 'goomba'),
        // Section 2: 3 enemies
        createEnemy(3500 * S, 610, 'koopa'),
        createEnemy(4300 * S, 610, 'robot'),
        createEnemy(4900 * S, 610, 'crab'),
        // Section 2 elevated
        createEnemy(4500 * S, 460, 'goomba'),
        // Section 3: 3 enemies + piranhas
        createEnemy(5400 * S, 610, 'piranha'),
        createEnemy(5600 * S, 610, 'piranha'),
        createEnemy(6800 * S, 610, 'robot'),
        createEnemy(7800 * S, 610, 'goomba'),
        // Section 4: 3 enemies
        createEnemy(10700 * S, 610, 'robot'),
        createEnemy(11500 * S, 610, 'koopa'),
        // Section 4 elevated
        createEnemy(9800 * S, 370, 'crab'),
        // Section 5: 4 enemies + piranhas
        createEnemy(12700 * S, 610, 'piranha'),
        createEnemy(13100 * S, 610, 'piranha'),
        createEnemy(12900 * S, 610, 'piranha'),
        createEnemy(14500 * S, 610, 'robot'),
        createEnemy(15500 * S, 610, 'goomba'),
        // Section 6: 3 enemies
        createEnemy(17500 * S, 610, 'robot'),
        createEnemy(18300 * S, 610, 'koopa'),
        createEnemy(18900 * S, 610, 'crab'),
      ];
    })(),
    decorations: (() => {
      const S = 0.417;
      return [
        createDeco(500 * S, 610, 'conveyor'),
        createDeco(2000 * S, 610, 'gear'),
        createDeco(3500 * S, 610, 'conveyor'),
        createDeco(5200 * S, 610, 'smoke'),
        createDeco(5300 * S, 610, 'crane'),
        createDeco(7000 * S, 610, 'conveyor'),
        createDeco(9000 * S, 610, 'gear'),
        createDeco(9600 * S, 610, 'smoke'),
        createDeco(10700 * S, 610, 'conveyor'),
        createDeco(12700 * S, 610, 'crane'),
        createDeco(14500 * S, 610, 'conveyor'),
        createDeco(15200 * S, 610, 'gear'),
        createDeco(16000 * S, 610, 'smoke'),
        createDeco(17500 * S, 610, 'conveyor'),
        createDeco(18500 * S, 610, 'gear'),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 17600 * 0.417, y: 628 },
    timeBonus: 220,
    movingPlatforms: [
      // Conveyor-style moving platforms across gaps
      createMovingPlat(2800 * 0.417, 590, 140, 24, 'platform_medium', 'horizontal', 350, 26),
      createMovingPlat(6000 * 0.417, 580, 130, 24, 'platform_medium', 'horizontal', 320, 26),
      createMovingPlat(9000 * 0.417, 580, 130, 24, 'platform_medium', 'horizontal', 380, 28),
      createMovingPlat(12000 * 0.417, 570, 140, 24, 'platform_medium', 'horizontal', 400, 24),
      createMovingPlat(16500 * 0.417, 580, 130, 24, 'platform_medium', 'horizontal', 300, 22),
    ],
  },
];
