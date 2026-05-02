// Village World - 6 Levels (37-42) - Redesign
// 37: Tutorial (village path, one gap, few enemies)
// 38: Gap-Strecke (4-5 gaps with moving platforms)
// 39: Röhren-Labyrinth (5-8 pipe sections with piranhas)
// 40: Vertikal-Kletterer (3-4 verticalClimb sections)
// 41: Gegner-Horde (15-20 enemies)
// 42: Dach-Rennen Finale (rooftop-hopping, multi-height platforms)

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

export const VILLAGE_LEVELS: LevelData[] = [
  // ============================================================
  // LEVEL 37 - Tutorial (S=2.0)
  // Simple village path, one small gap, 3 enemies, 1 pipe
  // ============================================================
  {
    id: 37, name: "Village Green", width: 8000, height: 800, biome: 'village',
    platforms: (() => {
      const S = 2.0;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(100 * S, 650, 500 * S, 40, 'grass'));
      plats.push(createPlat(350 * S, 530, 120 * S, 24, 'brick'));
      // Ground continue
      plats.push(createPlat(650 * S, 650, 400 * S, 40, 'grass'));
      plats.push(createPlat(750 * S, 520, 180 * S, 28, 'wood'));
      // More bridge platforms for gap
      plats.push(...gapWithPlatforms(S, 1090, 590, 300, 3));
      // Ground after gap
      plats.push(createPlat(1200 * S, 650, 400 * S, 40, 'brick'));
      // Pipe area
      plats.push(createPlat(1620 * S, 650, 300 * S, 40, 'grass'));
      plats.push(...pipeSection(S, 1650, 650, 1));
      // More bridge after pipe
      plats.push(...gapWithPlatforms(S, 2050, 650, 350, 3));
      plats.push(createPlat(2150 * S, 520, 100 * S, 24, 'wood'));
      // Final ground
      plats.push(createPlat(2500 * S, 650, 400 * S, 40, 'grass'));
      // Step-ups to goal
      plats.push(createPlat(2950 * S, 530, 100 * S, 24, 'platform_medium'));
      plats.push(createPlat(3150 * S, 450, 80 * S, 24, 'platform_hard'));
      plats.push(createPlat(3300 * S, 380, 300 * S, 40, 'brick'));
      return plats;
    })(),
    coins: (() => {
      const S = 2.0;
      const c: any[] = [];
      c.push(createCoin(380 * S, 490), createCoin(410 * S, 490));
      c.push(createCoin(820 * S, 480), createCoin(860 * S, 480), createCoin(900 * S, 480));
      c.push(createCoin(1350 * S, 500));
      c.push(createCoin(1750 * S, 500), createCoin(1800 * S, 500));
      c.push(createCoin(2200 * S, 480), createCoin(2250 * S, 480));
      c.push(createCoin(3000 * S, 490), createCoin(3050 * S, 490));
      c.push(createCoin(3350 * S, 340));
      return c;
    })(),
    questionBlocks: (() => {
      const S = 2.0;
      return [
        createQB(380 * S, 440, 'mushroom'),
        createQB(1800 * S, 440, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 2.0;
      return [
        createEnemy(850 * S, 610, 'goomba'),
        createEnemy(1750 * S, 600, 'piranha'),
        createEnemy(2200 * S, 610, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 2.0;
      return [
        createDeco(150 * S, 610, 'house'),
        createDeco(650 * S, 610, 'fence'),
        createDeco(1400 * S, 610, 'tree'),
        createDeco(2600 * S, 610, 'barrel'),
        createDeco(3300 * S, 610, 'cloud'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 2.0;
      return [
        createMovingPlat(2400 * S, 480, 80 * S, 20, 'wood', 'horizontal', 150, 18),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 3450 * 2.0, y: 358 },
    timeBonus: 55,
  },

  // ============================================================
  // LEVEL 38 - Gap-Strecke (S=1.82)
  // 5 gap sections with moving platforms bridging the gaps
  // ============================================================
  {
    id: 38, name: "Market Road", width: 10000, height: 800, biome: 'village',
    platforms: (() => {
      const S = 1.82;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(150 * S, 650, 500 * S, 40, 'grass'));
      plats.push(createPlat(400 * S, 530, 120 * S, 24, 'brick'));
      // Gap 1: 2 helper platforms
      plats.push(...gapWithPlatforms(S, 750, 650, 300, 2));
      // Ground segment
      plats.push(createPlat(1100 * S, 650, 400 * S, 40, 'brick'));
      plats.push(createPlat(1200 * S, 520, 180 * S, 28, 'wood'));
      // Gap 2: 2 helper platforms
      plats.push(...gapWithPlatforms(S, 1600, 650, 350, 2));
      // Ground segment
      plats.push(createPlat(2000 * S, 650, 400 * S, 40, 'grass'));
      plats.push(createPlat(2150 * S, 520, 100 * S, 24, 'brick'));
      // Gap 3: 3 helper platforms
      plats.push(...gapWithPlatforms(S, 2500, 650, 400, 3));
      // Ground segment
      plats.push(createPlat(2950 * S, 650, 500 * S, 40, 'brick'));
      plats.push(createPlat(3100 * S, 530, 120 * S, 24, 'wood'));
      // Gap 4: 2 helper platforms
      plats.push(...gapWithPlatforms(S, 3500, 650, 350, 2));
      // Ground segment
      plats.push(createPlat(3900 * S, 650, 400 * S, 40, 'grass'));
      // Gap 5: 3 helper platforms
      plats.push(...gapWithPlatforms(S, 4350, 650, 400, 3));
      // Goal ground
      plats.push(createPlat(4800 * S, 650, 500 * S, 40, 'brick'));
      plats.push(createPlat(4950 * S, 530, 120 * S, 24, 'wood'));
      plats.push(createPlat(5150 * S, 410, 200 * S, 40, 'brick'));
      return plats;
    })(),
    coins: (() => {
      const S = 1.82;
      const c: any[] = [];
      c.push(createCoin(280 * S, 500), createCoin(430 * S, 490));
      c.push(createCoin(800 * S, 590), createCoin(870 * S, 570));
      c.push(createCoin(1250 * S, 480), createCoin(1350 * S, 480));
      c.push(createCoin(1700 * S, 590), createCoin(1770 * S, 570));
      c.push(createCoin(2150 * S, 480));
      c.push(createCoin(2580 * S, 580), createCoin(2720 * S, 540));
      c.push(createCoin(3050 * S, 500), createCoin(3200 * S, 490));
      c.push(createCoin(3580 * S, 580), createCoin(3650 * S, 560));
      c.push(createCoin(4100 * S, 500), createCoin(4430 * S, 580));
      c.push(createCoin(4950 * S, 490), createCoin(5200 * S, 370));
      return c;
    })(),
    questionBlocks: (() => {
      const S = 1.82;
      return [
        createQB(430 * S, 440, 'mushroom'),
        createQB(2150 * S, 440, 'coin'),
        createQB(3150 * S, 440, 'flower'),
        createQB(5200 * S, 310, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 1.82;
      return [
        createEnemy(500 * S, 610, 'goomba'),
        createEnemy(1300 * S, 610, 'robot'),
        createEnemy(2200 * S, 610, 'crab'),
        createEnemy(3100 * S, 610, 'goomba'),
        createEnemy(4100 * S, 610, 'koopa'),
        createEnemy(4900 * S, 610, 'robot'),
      ];
    })(),
    decorations: (() => {
      const S = 1.82;
      return [
        createDeco(200 * S, 610, 'house'),
        createDeco(1200 * S, 610, 'fence'),
        createDeco(2300 * S, 610, 'tree'),
        createDeco(3300 * S, 610, 'barrel'),
        createDeco(4400 * S, 610, 'house'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 1.82;
      return [
        createMovingPlat(900 * S, 500, 80 * S, 20, 'wood', 'vertical', 80, 18),
        createMovingPlat(1800 * S, 500, 100 * S, 20, 'wood', 'horizontal', 180, 20),
        createMovingPlat(2700 * S, 480, 100 * S, 20, 'wood', 'horizontal', 200, 22),
        createMovingPlat(3650 * S, 480, 80 * S, 20, 'wood', 'vertical', 90, 18),
        createMovingPlat(4600 * S, 500, 100 * S, 20, 'wood', 'horizontal', 200, 20),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 5250 * 1.82, y: 388 },
    timeBonus: 62,
  },

  // ============================================================
  // LEVEL 39 - Röhren-Labyrinth (S=1.67)
  // 6 pipe sections with piranhas, ground segments between
  // ============================================================
  {
    id: 39, name: "Pipe Maze", width: 12000, height: 900, biome: 'village',
    platforms: (() => {
      const S = 1.67;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(150 * S, 750, 500 * S, 40, 'grass'));
      plats.push(createPlat(350 * S, 630, 120 * S, 24, 'brick'));
      // Bridge to pipes
      plats.push(...gapWithPlatforms(S, 700, 750, 350, 3));
      // Pipe section 1
      plats.push(createPlat(700 * S, 750, 400 * S, 40, 'brick'));
      plats.push(...pipeSection(S, 800, 750, 2));
      // Bridge after pipes
      plats.push(...gapWithPlatforms(S, 1350, 750, 350, 3));
      plats.push(createPlat(1450 * S, 630, 150 * S, 28, 'wood'));
      // Bridge to pipes 2
      plats.push(...gapWithPlatforms(S, 1750, 750, 350, 3));
      // Pipe section 2
      plats.push(createPlat(1750 * S, 750, 400 * S, 40, 'brick'));
      plats.push(...pipeSection(S, 1850, 750, 2));
      // Bridge after pipes
      plats.push(...gapWithPlatforms(S, 2450, 750, 350, 3));
      // Bridge to pipes 3
      plats.push(...gapWithPlatforms(S, 2650, 750, 350, 3));
      plats.push(...pipeSection(S, 2650, 750, 3));
      // Bridge after pipe3
      plats.push(...gapWithPlatforms(S, 3450, 750, 350, 3));
      plats.push(createPlat(3550 * S, 630, 120 * S, 24, 'wood'));
      // Bridge to pipes 4
      plats.push(...gapWithPlatforms(S, 3950, 750, 350, 3));
      // Pipe section 4
      plats.push(createPlat(3950 * S, 750, 400 * S, 40, 'grass'));
      plats.push(...pipeSection(S, 4050, 750, 2));
      // Bridge after pipes
      plats.push(...gapWithPlatforms(S, 4700, 750, 350, 3));
      // Bridge to pipes 5
      plats.push(...gapWithPlatforms(S, 5150, 750, 350, 3));
      // Pipe section 5
      plats.push(createPlat(5150 * S, 750, 300 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(S, 5520, 750, 350, 3));
      // Bridge to pipe section 6 (final)
      plats.push(...gapWithPlatforms(S, 5900, 750, 350, 3));
      // Bridge to pipes6
      plats.push(...gapWithPlatforms(S, 6100, 750, 350, 3));
      plats.push(...pipeSection(S, 6100, 750, 3));
      // Bridge to goal area
      plats.push(...gapWithPlatforms(S, 6900, 630, 350, 3));
      plats.push(createPlat(7100 * S, 510, 200 * S, 40, 'brick'));
      return plats;
    })(),
    coins: (() => {
      const S = 1.67;
      const c: any[] = [];
      c.push(createCoin(280 * S, 600), createCoin(380 * S, 590));
      c.push(createCoin(950 * S, 590), createCoin(1050 * S, 590));
      c.push(createCoin(1500 * S, 590), createCoin(1550 * S, 590));
      c.push(createCoin(2000 * S, 590), createCoin(2100 * S, 590));
      c.push(createCoin(2650 * S, 590), createCoin(2900 * S, 590), createCoin(3150 * S, 590));
      c.push(createCoin(3600 * S, 590), createCoin(3700 * S, 590));
      c.push(createCoin(4200 * S, 590), createCoin(4350 * S, 590));
      c.push(createCoin(4900 * S, 590), createCoin(5400 * S, 590), createCoin(5550 * S, 590));
      c.push(createCoin(6250 * S, 590), createCoin(6500 * S, 590), createCoin(6750 * S, 590));
      c.push(createCoin(7150 * S, 470));
      return c;
    })(),
    questionBlocks: (() => {
      const S = 1.67;
      return [
        createQB(380 * S, 530, 'mushroom'),
        createQB(1480 * S, 530, 'coin'),
        createQB(3600 * S, 530, 'flower'),
        createQB(4800 * S, 530, 'coin'),
        createQB(7200 * S, 400, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 1.67;
      return [
        createEnemy(500 * S, 710, 'goomba'),
        createEnemy(1000 * S, 700, 'piranha'),
        createEnemy(1200 * S, 700, 'piranha'),
        createEnemy(1550 * S, 710, 'robot'),
        createEnemy(2000 * S, 700, 'piranha'),
        createEnemy(2200 * S, 700, 'piranha'),
        createEnemy(2600 * S, 710, 'goomba'),
        createEnemy(2800 * S, 700, 'piranha'),
        createEnemy(3050 * S, 700, 'piranha'),
        createEnemy(3300 * S, 700, 'piranha'),
        createEnemy(4200 * S, 700, 'piranha'),
        createEnemy(4350 * S, 700, 'piranha'),
        createEnemy(5400 * S, 700, 'piranha'),
        createEnemy(5550 * S, 700, 'piranha'),
        createEnemy(6250 * S, 700, 'piranha'),
        createEnemy(6500 * S, 700, 'piranha'),
        createEnemy(6750 * S, 700, 'piranha'),
        createEnemy(7000 * S, 710, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 1.67;
      return [
        createDeco(200 * S, 710, 'house'),
        createDeco(800 * S, 710, 'fence'),
        createDeco(1600 * S, 710, 'tree'),
        createDeco(3000 * S, 710, 'barrel'),
        createDeco(4200 * S, 710, 'house'),
        createDeco(5600 * S, 710, 'tree'),
        createDeco(7000 * S, 710, 'cloud'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 1.67;
      return [
        createMovingPlat(3300 * S, 600, 100 * S, 20, 'wood', 'horizontal', 200, 20),
        createMovingPlat(5800 * S, 600, 100 * S, 20, 'wood', 'horizontal', 180, 22),
      ];
    })(),
    playerStart: { x: 150, y: 700 },
    goal: { x: 7200 * 1.67, y: 488 },
    timeBonus: 68,
  },

  // ============================================================
  // LEVEL 40 - Vertikal-Kletterer (S=1.48)
  // 4 verticalClimb sections with ground segments between
  // ============================================================
  {
    id: 40, name: "Chimney Chase", width: 14000, height: 950, biome: 'village',
    platforms: (() => {
      const S = 1.48;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(150 * S, 800, 500 * S, 40, 'grass'));
      plats.push(createPlat(400 * S, 680, 120 * S, 24, 'brick'));
      // Bridge to vertical climb 1
      plats.push(...gapWithPlatforms(S, 700, 800, 400, 3));
      // Vertical climb 1
      plats.push(createPlat(700 * S, 800, 400 * S, 40, 'brick'));
      plats.push(...verticalClimb(S, 900, 800, 'brick'));
      // Bridge after climb 1
      plats.push(...gapWithPlatforms(S, 2700, 800, 400, 3));
      // Ground segment
      plats.push(createPlat(2700 * S, 800, 400 * S, 40, 'grass'));
      plats.push(createPlat(2850 * S, 680, 150 * S, 28, 'wood'));
      // Bridge to vertical climb 2
      plats.push(...gapWithPlatforms(S, 3150, 800, 400, 3));
      // Vertical climb 2
      plats.push(createPlat(3150 * S, 800, 400 * S, 40, 'brick'));
      plats.push(...verticalClimb(S, 3350, 800, 'brick'));
      // Bridge after climb 2
      plats.push(...gapWithPlatforms(S, 5150, 800, 400, 3));
      // Ground segment
      plats.push(createPlat(5150 * S, 800, 400 * S, 40, 'grass'));
      plats.push(createPlat(5300 * S, 680, 120 * S, 24, 'wood'));
      // Bridge to vertical climb 3
      plats.push(...gapWithPlatforms(S, 5600, 800, 400, 3));
      // Vertical climb 3
      plats.push(createPlat(5600 * S, 800, 400 * S, 40, 'brick'));
      plats.push(...verticalClimb(S, 5800, 800, 'grass'));
      // Bridge after climb 3
      plats.push(...gapWithPlatforms(S, 7600, 800, 400, 3));
      // Ground segment
      plats.push(createPlat(7600 * S, 800, 400 * S, 40, 'grass'));
      // Bridge to vertical climb 4
      plats.push(...gapWithPlatforms(S, 8050, 800, 400, 3));
      // Vertical climb 4
      plats.push(createPlat(8050 * S, 800, 300 * S, 40, 'brick'));
      plats.push(...verticalClimb(S, 8200, 800, 'brick'));
      // Bridge to goal platform
      plats.push(...gapWithPlatforms(S, 9800, 520, 400, 3));
      // Goal platform
      plats.push(createPlat(9800 * S, 520, 300 * S, 40, 'brick'));
      return plats;
    })(),
    coins: (() => {
      const S = 1.48;
      const c: any[] = [];
      c.push(createCoin(280 * S, 650), createCoin(430 * S, 640));
      // Climb 1 coins
      c.push(createCoin(900 * S, 720), createCoin(1200 * S, 640), createCoin(1500 * S, 560));
      c.push(createCoin(1800 * S, 480), createCoin(2100 * S, 560), createCoin(2400 * S, 640), createCoin(2700 * S, 720));
      c.push(createCoin(2900 * S, 640));
      // Climb 2 coins
      c.push(createCoin(3350 * S, 720), createCoin(3650 * S, 640), createCoin(3950 * S, 560));
      c.push(createCoin(4250 * S, 480), createCoin(4550 * S, 560), createCoin(4850 * S, 640), createCoin(5150 * S, 720));
      c.push(createCoin(5350 * S, 640));
      // Climb 3 coins
      c.push(createCoin(5800 * S, 720), createCoin(6100 * S, 640), createCoin(6400 * S, 560));
      c.push(createCoin(6700 * S, 480), createCoin(7000 * S, 560), createCoin(7300 * S, 640), createCoin(7600 * S, 720));
      // Climb 4 coins
      c.push(createCoin(8200 * S, 720), createCoin(8500 * S, 640), createCoin(8800 * S, 560));
      c.push(createCoin(9100 * S, 480), createCoin(9400 * S, 560), createCoin(9700 * S, 640));
      c.push(createCoin(9900 * S, 480));
      return c;
    })(),
    questionBlocks: (() => {
      const S = 1.48;
      return [
        createQB(430 * S, 580, 'mushroom'),
        createQB(1900 * S, 400, 'coin'),
        createQB(4350 * S, 400, 'flower'),
        createQB(6800 * S, 400, 'star'),
        createQB(9200 * S, 400, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 1.48;
      return [
        createEnemy(500 * S, 760, 'goomba'),
        createEnemy(1400 * S, 760, 'robot'),
        createEnemy(2900 * S, 760, 'crab'),
        createEnemy(3800 * S, 760, 'goomba'),
        createEnemy(4500 * S, 760, 'koopa'),
        createEnemy(5500 * S, 760, 'spiny'),
        createEnemy(6200 * S, 760, 'robot'),
        createEnemy(7000 * S, 760, 'goomba'),
        createEnemy(8400 * S, 760, 'crab'),
        createEnemy(9100 * S, 760, 'koopa'),
        createEnemy(9600 * S, 760, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 1.48;
      return [
        createDeco(200 * S, 760, 'house'),
        createDeco(1000 * S, 760, 'fence'),
        createDeco(2800 * S, 760, 'tree'),
        createDeco(4000 * S, 760, 'barrel'),
        createDeco(6000 * S, 760, 'house'),
        createDeco(7800 * S, 760, 'tree'),
        createDeco(9000 * S, 760, 'cloud'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 1.48;
      return [
        createMovingPlat(2200 * S, 650, 80 * S, 20, 'wood', 'horizontal', 200, 20),
        createMovingPlat(4700 * S, 650, 80 * S, 20, 'wood', 'vertical', 120, 18),
        createMovingPlat(7200 * S, 650, 100 * S, 20, 'wood', 'horizontal', 250, 22),
      ];
    })(),
    playerStart: { x: 150, y: 750 },
    goal: { x: 9950 * 1.48, y: 498 },
    timeBonus: 75,
  },

  // ============================================================
  // LEVEL 41 - Gegner-Horde (S=1.38)
  // 18 enemies across varied platform structures
  // All gaps ≤ ~480px in-game to ensure BFS solvability
  // ============================================================
  {
    id: 41, name: "Town Square", width: 16000, height: 1000, biome: 'village',
    platforms: (() => {
      const S = 1.38;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(100 * S, 850, 400 * S, 40, 'grass'));
      plats.push(createPlat(350 * S, 730, 120 * S, 24, 'brick'));
      // Ground bridge to gap
      plats.push(createPlat(550 * S, 850, 200 * S, 40, 'grass'));
      // Gap section 1
      plats.push(...gapWithPlatforms(S, 650, 850, 250, 2));
      // Ground + pipe
      plats.push(createPlat(950 * S, 850, 300 * S, 40, 'brick'));
      plats.push(createPlat(1250 * S, 850, 200 * S, 40, 'grass'));
      plats.push(...pipeSection(S, 1300, 850, 2));
      // Ground segment
      plats.push(createPlat(1750 * S, 850, 300 * S, 40, 'brick'));
      plats.push(createPlat(2050 * S, 850, 200 * S, 40, 'grass'));
      plats.push(createPlat(2150 * S, 730, 180 * S, 28, 'wood'));
      // Gap section 2
      plats.push(createPlat(2400 * S, 850, 200 * S, 40, 'brick'));
      plats.push(...gapWithPlatforms(S, 2500, 850, 300, 2));
      // Ground + elevated
      plats.push(createPlat(2850 * S, 850, 400 * S, 40, 'grass'));
      plats.push(createPlat(3100 * S, 730, 120 * S, 24, 'brick'));
      plats.push(createPlat(3200 * S, 610, 100 * S, 24, 'wood'));
      plats.push(createPlat(3350 * S, 850, 300 * S, 40, 'brick'));
      plats.push(createPlat(4988, 782, 60, 20, 'platform_easy'));
      // Pipe section 2
      plats.push(...pipeSection(S, 3500, 850, 3));
      plats.push(createPlat(5447, 782, 60, 20, 'platform_easy'));
      // Ground segment
      plats.push(createPlat(4250 * S, 850, 400 * S, 40, 'grass'));
      plats.push(createPlat(4550 * S, 730, 120 * S, 24, 'brick'));
      // Gap section 3
      plats.push(createPlat(4750 * S, 850, 200 * S, 40, 'brick'));
      plats.push(...gapWithPlatforms(S, 4850, 850, 250, 2));
      // Enemy-heavy ground area
      plats.push(createPlat(5150 * S, 850, 500 * S, 40, 'grass'));
      plats.push(createPlat(5500 * S, 730, 120 * S, 24, 'brick'));
      plats.push(createPlat(5750 * S, 850, 300 * S, 40, 'brick'));
      // Gap + elevated
      plats.push(...gapWithPlatforms(S, 5950, 850, 300, 2));
      plats.push(createPlat(6300 * S, 850, 400 * S, 40, 'grass'));
      plats.push(createPlat(6550 * S, 730, 100 * S, 24, 'wood'));
      // More ground + pipe
      plats.push(createPlat(6750 * S, 850, 300 * S, 40, 'brick'));
      plats.push(createPlat(9680, 782, 60, 20, 'platform_easy'));
      plats.push(...pipeSection(S, 6900, 850, 2));
      // Gap section 4
      plats.push(createPlat(7450 * S, 850, 200 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(S, 7550, 850, 200, 2));
      // Final ground
      plats.push(createPlat(7800 * S, 850, 500 * S, 40, 'brick'));
      plats.push(createPlat(8100 * S, 730, 120 * S, 24, 'wood'));
      // Goal area via step-ups
      plats.push(createPlat(8400 * S, 730, 100 * S, 24, 'platform_medium'));
      plats.push(createPlat(8600 * S, 610, 80 * S, 24, 'platform_hard'));
      plats.push(createPlat(8800 * S, 490, 300 * S, 40, 'brick'));
      return plats;
    })(),
    coins: (() => {
      const S = 1.38;
      const c: any[] = [];
      c.push(createCoin(280 * S, 700), createCoin(380 * S, 690));
      c.push(createCoin(680 * S, 790), createCoin(730 * S, 770));
      c.push(createCoin(1100 * S, 790), createCoin(1450 * S, 790), createCoin(1600 * S, 790));
      c.push(createCoin(2000 * S, 700), createCoin(2200 * S, 690));
      c.push(createCoin(2550 * S, 780), createCoin(2650 * S, 750));
      c.push(createCoin(3100 * S, 690), createCoin(3250 * S, 570));
      c.push(createCoin(3650 * S, 790), createCoin(3900 * S, 790), createCoin(4150 * S, 790));
      c.push(createCoin(4500 * S, 700), createCoin(4600 * S, 690));
      c.push(createCoin(4900 * S, 780), createCoin(5000 * S, 760));
      c.push(createCoin(5300 * S, 700), createCoin(5600 * S, 690));
      c.push(createCoin(6000 * S, 780), createCoin(6100 * S, 750));
      c.push(createCoin(6500 * S, 690), createCoin(7100 * S, 790), createCoin(7250 * S, 790));
      c.push(createCoin(7600 * S, 780), createCoin(7700 * S, 760));
      c.push(createCoin(8100 * S, 690), createCoin(8850 * S, 450));
      return c;
    })(),
    questionBlocks: (() => {
      const S = 1.38;
      return [
        createQB(380 * S, 630, 'mushroom'),
        createQB(2200 * S, 630, 'coin'),
        createQB(3250 * S, 500, 'flower'),
        createQB(5550 * S, 630, 'coin'),
        createQB(8150 * S, 630, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 1.38;
      const enemies: any[] = [];
      enemies.push(createEnemy(300 * S, 810, 'goomba'));
      enemies.push(createEnemy(500 * S, 810, 'goomba'));
      enemies.push(createEnemy(700 * S, 810, 'robot'));
      enemies.push(createEnemy(1100 * S, 810, 'koopa'));
      enemies.push(createEnemy(1500 * S, 800, 'piranha'));
      enemies.push(createEnemy(1750 * S, 800, 'piranha'));
      enemies.push(createEnemy(2000 * S, 810, 'spiny'));
      enemies.push(createEnemy(2300 * S, 810, 'crab'));
      enemies.push(createEnemy(2600 * S, 810, 'goomba'));
      enemies.push(createEnemy(3000 * S, 810, 'robot'));
      enemies.push(createEnemy(3650 * S, 800, 'piranha'));
      enemies.push(createEnemy(3900 * S, 800, 'piranha'));
      enemies.push(createEnemy(4150 * S, 800, 'piranha'));
      enemies.push(createEnemy(4600 * S, 810, 'spiny'));
      enemies.push(createEnemy(5400 * S, 810, 'goomba'));
      enemies.push(createEnemy(5900 * S, 810, 'koopa'));
      enemies.push(createEnemy(7100 * S, 800, 'piranha'));
      enemies.push(createEnemy(7250 * S, 800, 'piranha'));
      enemies.push(createEnemy(8000 * S, 810, 'robot'));
      enemies.push(createEnemy(8300 * S, 810, 'crab'));
      return enemies;
    })(),
    decorations: (() => {
      const S = 1.38;
      return [
        createDeco(200 * S, 810, 'house'),
        createDeco(600 * S, 810, 'fence'),
        createDeco(1200 * S, 810, 'tree'),
        createDeco(2400 * S, 810, 'barrel'),
        createDeco(3800 * S, 810, 'house'),
        createDeco(5500 * S, 810, 'tree'),
        createDeco(6800 * S, 810, 'cloud'),
        createDeco(8200 * S, 810, 'fence'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 1.38;
      return [
        createMovingPlat(1800 * S, 700, 80 * S, 20, 'wood', 'horizontal', 180, 20),
        createMovingPlat(4100 * S, 700, 100 * S, 20, 'wood', 'horizontal', 200, 22),
        createMovingPlat(6200 * S, 700, 80 * S, 20, 'wood', 'vertical', 100, 18),
      ];
    })(),
    playerStart: { x: 150, y: 800 },
    goal: { x: 8950 * 1.38, y: 468 },
    timeBonus: 82,
  },

  // ============================================================
  // LEVEL 42 - Dach-Rennen Finale (S=1.25)
  // Rooftop-hopping with platforms at multiple heights, minimal ground
  // ============================================================
  {
    id: 42, name: "Rooftop Finale", width: 18000, height: 1100, biome: 'village',
    platforms: (() => {
      const S = 1.25;
      const plats: any[] = [];
      // Start roof
      plats.push(createPlat(200 * S, 950, 400 * S, 40, 'grass'));
      plats.push(createPlat(100 * S, 830, 180 * S, 28, 'wood'));  // low roof
      // Rooftop row 1 (med height)
      plats.push(createPlat(600 * S, 830, 220 * S, 28, 'brick'));
      plats.push(createPlat(850 * S, 830, 220 * S, 28, 'brick'));
      plats.push(createPlat(1150 * S, 830, 220 * S, 28, 'brick'));
      plats.push(createPlat(1400 * S, 950, 200 * S, 40, 'grass')); // ground rest
      plats.push(createPlat(2019, 866, 60, 20, 'platform_easy'));
      // Gap with elevated stepping
      plats.push(...gapWithPlatforms(S, 1700, 950, 300, 2));
      // Rooftop row 2 (high)
      plats.push(createPlat(2100 * S, 950, 300 * S, 40, 'brick'));
      plats.push(createPlat(2300 * S, 710, 200 * S, 28, 'wood'));
      plats.push(createPlat(2550 * S, 710, 200 * S, 28, 'wood'));
      plats.push(createPlat(2800 * S, 710, 200 * S, 28, 'wood'));
      plats.push(createPlat(3050 * S, 950, 300 * S, 40, 'grass')); // ground rest
      plats.push(createPlat(4232, 882, 60, 20, 'platform_easy'));
      // Pipe section (chimneys)
      plats.push(...pipeSection(S, 3400, 950, 2));
      plats.push(createPlat(4812, 882, 60, 20, 'platform_easy'));
      plats.push(createPlat(4200 * S, 950, 300 * S, 40, 'brick'));
      plats.push(createPlat(5598, 866, 60, 20, 'platform_easy'));
      // Roof gap section
      plats.push(...gapWithPlatforms(S, 4600, 950, 350, 3));
      // Rooftop row 3 (varied heights)
      plats.push(createPlat(5100 * S, 950, 200 * S, 40, 'grass'));
      plats.push(createPlat(5350 * S, 830, 180 * S, 28, 'brick'));
      plats.push(createPlat(5550 * S, 830, 180 * S, 28, 'brick'));
      plats.push(createPlat(5800 * S, 710, 200 * S, 28, 'wood'));
      plats.push(createPlat(6050 * S, 710, 200 * S, 28, 'wood'));
      plats.push(createPlat(6300 * S, 950, 300 * S, 40, 'brick')); // ground rest
      plats.push(createPlat(8294, 882, 60, 20, 'platform_easy'));
      // Pipe section (more chimneys)
      plats.push(...pipeSection(S, 6650, 950, 2));
      plats.push(createPlat(8875, 882, 60, 20, 'platform_easy'));
      plats.push(createPlat(7450 * S, 950, 300 * S, 40, 'grass'));
      // Final rooftop gauntlet (highest)
      plats.push(createPlat(7800 * S, 830, 180 * S, 28, 'wood'));
      plats.push(createPlat(8000 * S, 710, 200 * S, 28, 'brick'));
      plats.push(createPlat(8250 * S, 710, 200 * S, 28, 'brick'));
      plats.push(createPlat(8500 * S, 590, 220 * S, 28, 'wood'));
      plats.push(createPlat(8750 * S, 590, 180 * S, 28, 'wood'));
      plats.push(createPlat(9000 * S, 950, 300 * S, 40, 'grass')); // ground rest
      plats.push(createPlat(11581, 866, 60, 20, 'platform_easy'));
      // Gap + goal area
      plats.push(...gapWithPlatforms(S, 9350, 950, 300, 2));
      plats.push(createPlat(9750 * S, 950, 300 * S, 40, 'brick'));
      // Goal climb
      plats.push(createPlat(10200 * S, 830, 150 * S, 28, 'brick'));
      plats.push(createPlat(10450 * S, 710, 120 * S, 24, 'wood'));
      plats.push(createPlat(10650 * S, 590, 200 * S, 28, 'brick'));
      plats.push(createPlat(10950 * S, 470, 250 * S, 40, 'brick'));
      return plats;
    })(),
    coins: (() => {
      const S = 1.25;
      const c: any[] = [];
      // Coins above rooftops
      c.push(createCoin(300 * S, 790), createCoin(500 * S, 790));
      c.push(createCoin(650 * S, 790), createCoin(900 * S, 790), createCoin(1100 * S, 790));
      c.push(createCoin(1750 * S, 880), createCoin(1850 * S, 860));
      c.push(createCoin(2350 * S, 670), createCoin(2600 * S, 670), createCoin(2850 * S, 670));
      c.push(createCoin(3500 * S, 890), createCoin(3750 * S, 890));
      c.push(createCoin(4700 * S, 880), createCoin(4850 * S, 860), createCoin(5000 * S, 840));
      c.push(createCoin(5400 * S, 790), createCoin(5600 * S, 790));
      c.push(createCoin(5850 * S, 670), createCoin(6100 * S, 670));
      c.push(createCoin(6750 * S, 890), createCoin(7000 * S, 890));
      c.push(createCoin(7850 * S, 790), createCoin(8050 * S, 670), createCoin(8300 * S, 670));
      c.push(createCoin(8550 * S, 550), createCoin(8800 * S, 550));
      c.push(createCoin(9450 * S, 880), createCoin(9550 * S, 860));
      c.push(createCoin(10250 * S, 790), createCoin(10500 * S, 670), createCoin(10700 * S, 550));
      c.push(createCoin(11000 * S, 430));
      return c;
    })(),
    questionBlocks: (() => {
      const S = 1.25;
      return [
        createQB(200 * S, 720, 'mushroom'),
        createQB(2350 * S, 600, 'coin'),
        createQB(5850 * S, 600, 'flower'),
        createQB(8550 * S, 480, 'star'),
        createQB(10700 * S, 480, 'coin'),
        createQB(11050 * S, 360, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 1.25;
      const enemies: any[] = [];
      enemies.push(createEnemy(250 * S, 910, 'goomba'));
      enemies.push(createEnemy(700 * S, 790, 'robot'));
      enemies.push(createEnemy(1100 * S, 790, 'spiny'));
      enemies.push(createEnemy(1500 * S, 910, 'koopa'));
      enemies.push(createEnemy(1900 * S, 910, 'crab'));
      enemies.push(createEnemy(2400 * S, 670, 'goomba'));
      enemies.push(createEnemy(2800 * S, 670, 'robot'));
      enemies.push(createEnemy(3500 * S, 900, 'piranha'));
      enemies.push(createEnemy(3750 * S, 900, 'piranha'));
      enemies.push(createEnemy(5400 * S, 790, 'spiny'));
      enemies.push(createEnemy(5900 * S, 670, 'koopa'));
      enemies.push(createEnemy(6100 * S, 670, 'goomba'));
      enemies.push(createEnemy(6750 * S, 900, 'piranha'));
      enemies.push(createEnemy(7000 * S, 900, 'piranha'));
      enemies.push(createEnemy(8300 * S, 670, 'crab'));
      enemies.push(createEnemy(8600 * S, 550, 'robot'));
      enemies.push(createEnemy(10300 * S, 790, 'goomba'));
      enemies.push(createEnemy(10700 * S, 910, 'koopa'));
      return enemies;
    })(),
    decorations: (() => {
      const S = 1.25;
      return [
        createDeco(300 * S, 910, 'house'),
        createDeco(800 * S, 790, 'fence'),
        createDeco(1600 * S, 910, 'tree'),
        createDeco(2900 * S, 910, 'barrel'),
        createDeco(4000 * S, 910, 'house'),
        createDeco(5600 * S, 910, 'tree'),
        createDeco(6600 * S, 790, 'barrel'),
        createDeco(7800 * S, 790, 'cloud'),
        createDeco(9400 * S, 910, 'house'),
        createDeco(11000 * S, 910, 'fence'),
      ];
    })(),
    movingPlatforms: (() => {
      const S = 1.25;
      return [
        createMovingPlat(3850 * S, 800, 80 * S, 20, 'wood', 'horizontal', 200, 20),
        createMovingPlat(6500 * S, 800, 100 * S, 20, 'wood', 'horizontal', 250, 22),
        createMovingPlat(10000 * S, 800, 80 * S, 20, 'wood', 'vertical', 120, 18),
      ];
    })(),
    playerStart: { x: 150, y: 900 },
    goal: { x: 11075 * 1.25, y: 448 },
    timeBonus: 90,
  },
];
