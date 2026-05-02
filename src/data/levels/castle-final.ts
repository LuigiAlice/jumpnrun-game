// Castle Final World - 6 Levels (IDs 85-90)
// 85: Tutorial, 86: Gap-Strecke, 87: Röhren-Labyrinth, 88: Vertikal-Kletterer, 89: Gegner-Horde, 90: Boss-Arena Finale
// Castle, brick, and metal platforms with banner, chain, torch, boss-flag decorations

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

const S85 = 0.556;
const S86 = 0.526;
const S87 = 0.5;
const S88 = 0.476;
const S89 = 0.455;
const S90 = 0.435;

export const CASTLE_FINAL_LEVELS: LevelData[] = [
  // ============================================================
  // LEVEL 85: Tutorial — Simple castle path, one gap, few enemies
  // S=0.556, width=6000, height=640
  // ============================================================
  {
    id: 85, name: "Castle Gates", width: 6000, height: 640, biome: 'castle-final',
    platforms: (() => {
      const S = S85;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1100 * S, 40, 'castle'));
      plats.push(...gapWithPlatforms(S, 1195, 600, 350, 1));
      plats.push(createPlat(2000 * S, 600, 600 * S, 40, 'castle'));
      plats.push(...pipeSection(S, 2800, 600, 2));
      plats.push(createPlat(4000 * S, 600, 1000 * S, 40, 'castle'));
      return plats;
    })(),
    coins: (() => {
      const S = S85;
      const cs: any[] = [];
      for (let x = 300; x < 1500; x += 180) cs.push(createCoin(x * S, 550));
      for (let x = 2100; x < 2700; x += 160) cs.push(createCoin(x * S, 550));
      for (let x = 4100; x < 4900; x += 150) cs.push(createCoin(x * S, 540));
      return cs;
    })(),
    questionBlocks: [
      createQB(500 * S85, 530, 'mushroom'),
      createQB(1500 * S85, 530, 'coin'),
      createQB(2300 * S85, 530, 'flower'),
      createQB(4400 * S85, 530, 'mushroom'),
    ],
    enemies: [
      createEnemy(800 * S85, 560, 'goomba'),
      createEnemy(2900 * S85, 565, 'piranha'),
      createEnemy(4600 * S85, 560, 'goomba'),
    ],
    decorations: [
      createDeco(400 * S85, 560, 'banner'),
      createDeco(1200 * S85, 560, 'torch'),
      createDeco(2300 * S85, 560, 'chain'),
      createDeco(3100 * S85, 560, 'boss-flag'),
    ],
    playerStart: { x: 150, y: 550 },
    goal: { x: 4300 * S85, y: 578 },
    timeBonus: 120,
    movingPlatforms: [
      createMovingPlat(3500 * S85, 540, 120, 24, 'platform_medium', 'horizontal', 250, 20),
    ],
  },

  // ============================================================
  // LEVEL 86: Gap-Strecke — 4 gap sections with moving platforms
  // S=0.526, width=9000, height=640
  // ============================================================
  {
    id: 86, name: "Throne Room", width: 9000, height: 640, biome: 'castle-final',
    platforms: (() => {
      const S = S86;
      const plats: any[] = [];
      plats.push(createPlat(250 * S, 600, 800 * S, 40, 'castle'));
      plats.push(...gapWithPlatforms(S, 1100, 600, 500, 3));
      plats.push(createPlat(2100 * S, 600, 600 * S, 40, 'castle'));
      plats.push(...gapWithPlatforms(S, 2800, 600, 500, 3));
      plats.push(createPlat(3800 * S, 600, 500 * S, 40, 'castle'));
      plats.push(...gapWithPlatforms(S, 4500, 600, 500, 3));
      plats.push(createPlat(5500 * S, 600, 600 * S, 40, 'castle'));
      plats.push(...gapWithPlatforms(S, 6200, 600, 500, 3));
      plats.push(createPlat(7200 * S, 600, 900 * S, 40, 'castle'));
      return plats;
    })(),
    coins: (() => {
      const S = S86;
      const cs: any[] = [];
      for (let x = 300; x < 1100; x += 200) cs.push(createCoin(x * S, 550));
      for (let x = 2200; x < 2700; x += 160) cs.push(createCoin(x * S, 550));
      for (let x = 3900; x < 4400; x += 200) cs.push(createCoin(x * S, 550));
      for (let x = 5600; x < 6100; x += 160) cs.push(createCoin(x * S, 550));
      for (let x = 7300; x < 8000; x += 150) cs.push(createCoin(x * S, 540));
      return cs;
    })(),
    questionBlocks: [
      createQB(500 * S86, 530, 'mushroom'),
      createQB(2300 * S86, 530, 'star'),
      createQB(5000 * S86, 530, 'flower'),
      createQB(5800 * S86, 530, 'mushroom'),
      createQB(7600 * S86, 530, 'coin'),
    ],
    enemies: [
      createEnemy(600 * S86, 560, 'goomba'),
      createEnemy(1500 * S86, 560, 'koopa'),
      createEnemy(2400 * S86, 560, 'goomba'),
      createEnemy(3100 * S86, 560, 'spiny'),
      createEnemy(4000 * S86, 560, 'crab'),
      createEnemy(4800 * S86, 560, 'goomba'),
      createEnemy(5700 * S86, 560, 'robot'),
      createEnemy(6500 * S86, 560, 'thwomp'),
      createEnemy(7500 * S86, 560, 'koopa'),
    ],
    decorations: [
      createDeco(400 * S86, 560, 'banner'),
      createDeco(1600 * S86, 560, 'torch'),
      createDeco(3500 * S86, 560, 'chain'),
      createDeco(4200 * S86, 560, 'boss-flag'),
      createDeco(5800 * S86, 560, 'banner'),
      createDeco(7500 * S86, 560, 'torch'),
    ],
    playerStart: { x: 150, y: 550 },
    goal: { x: 7600 * S86, y: 578 },
    timeBonus: 150,
    movingPlatforms: [
      createMovingPlat(1600 * S86, 530, 140, 24, 'platform_medium', 'horizontal', 320, 22),
      createMovingPlat(3300 * S86, 530, 130, 24, 'platform_medium', 'horizontal', 300, 20),
      createMovingPlat(5000 * S86, 520, 140, 24, 'platform_medium', 'horizontal', 340, 22),
      createMovingPlat(6700 * S86, 530, 120, 24, 'platform_easy', 'vertical', 180, 20),
    ],
  },

  // ============================================================
  // LEVEL 87: Röhren-Labyrinth — 6 pipe sections with piranhas
  // S=0.5, width=11000, height=800
  // ============================================================
  {
    id: 87, name: "Pipe Labyrinth", width: 11000, height: 800, biome: 'castle-final',
    platforms: (() => {
      const S = S87;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(250 * S, 600, 600 * S, 40, 'castle'));
      // Pipe section 1
      plats.push(...pipeSection(S, 935, 600, 3));
      // Ground after pipes
      plats.push(createPlat(2600 * S, 600, 400 * S, 40, 'castle'));
      // Pipe section 2
      plats.push(...pipeSection(S, 3200, 600, 4));
      // Elevated ground
      plats.push(createPlat(5200 * S, 480, 600 * S, 40, 'brick'));
      // Pipe section 3 on elevated level
      plats.push(...pipeSection(S, 5900, 480, 3));
      // Drop down ground
      plats.push(createPlat(7400 * S, 600, 400 * S, 40, 'castle'));
      // Pipe section 4
      plats.push(...pipeSection(S, 7986, 600, 5));
      // Mid platform
      plats.push(createPlat(10500 * S, 440, 120, 28, 'platform_medium'));
      // Pipe section 5
      plats.push(...pipeSection(S, 11000, 600, 3));
      // Ground
      plats.push(createPlat(12700 * S, 600, 400 * S, 40, 'castle'));
      // Pipe section 6
      plats.push(...pipeSection(S, 13280, 600, 3));
      // Goal ground
      plats.push(createPlat(15100 * S, 600, 800 * S, 40, 'castle'));
      return plats;
    })(),
    coins: (() => {
      const S = S87;
      const cs: any[] = [];
      for (let x = 300; x < 1000; x += 180) cs.push(createCoin(x * S, 550));
      for (let x = 2700; x < 3200; x += 150) cs.push(createCoin(x * S, 550));
      for (let x = 5300; x < 5800; x += 150) cs.push(createCoin(x * S, 430));
      for (let x = 7500; x < 8000; x += 180) cs.push(createCoin(x * S, 550));
      for (let x = 12800; x < 13200; x += 150) cs.push(createCoin(x * S, 550));
      for (let x = 15200; x < 15800; x += 150) cs.push(createCoin(x * S, 540));
      return cs;
    })(),
    questionBlocks: [
      createQB(500 * S87, 530, 'mushroom'),
      createQB(1800 * S87, 530, 'flower'),
      createQB(3600 * S87, 530, 'star'),
      createQB(5600 * S87, 410, 'mushroom'),
      createQB(9000 * S87, 530, 'coin'),
      createQB(11800 * S87, 530, 'flower'),
      createQB(14000 * S87, 530, 'mushroom'),
      createQB(15500 * S87, 530, 'star'),
    ],
    enemies: [
      createEnemy(600 * S87, 560, 'goomba'),
      createEnemy(1100 * S87, 565, 'piranha'),
      createEnemy(1500 * S87, 565, 'piranha'),
      createEnemy(1900 * S87, 565, 'piranha'),
      createEnemy(2800 * S87, 560, 'koopa'),
      createEnemy(3400 * S87, 565, 'piranha'),
      createEnemy(3800 * S87, 565, 'piranha'),
      createEnemy(4400 * S87, 565, 'piranha'),
      createEnemy(4900 * S87, 565, 'piranha'),
      createEnemy(6100 * S87, 445, 'piranha'),
      createEnemy(6600 * S87, 445, 'piranha'),
      createEnemy(7100 * S87, 445, 'piranha'),
      createEnemy(8700 * S87, 565, 'piranha'),
      createEnemy(9200 * S87, 565, 'piranha'),
      createEnemy(11200 * S87, 565, 'piranha'),
      createEnemy(11600 * S87, 565, 'piranha'),
      createEnemy(13100 * S87, 560, 'goomba'),
      createEnemy(13500 * S87, 565, 'piranha'),
      createEnemy(13900 * S87, 565, 'piranha'),
      createEnemy(15400 * S87, 560, 'thwomp'),
    ],
    decorations: [
      createDeco(400 * S87, 560, 'banner'),
      createDeco(2000 * S87, 560, 'chain'),
      createDeco(5200 * S87, 440, 'boss-flag'),
      createDeco(8400 * S87, 560, 'torch'),
      createDeco(11400 * S87, 560, 'banner'),
      createDeco(14500 * S87, 560, 'chain'),
    ],
    playerStart: { x: 150, y: 550 },
    goal: { x: 15500 * S87, y: 578 },
    timeBonus: 170,
    movingPlatforms: [
      createMovingPlat(4800 * S87, 540, 130, 24, 'platform_medium', 'horizontal', 350, 22),
      createMovingPlat(10200 * S87, 530, 120, 24, 'platform_medium', 'vertical', 180, 20),
    ],
  },

  // ============================================================
  // LEVEL 88: Vertikal-Kletterer — 3-4 verticalClimb sections climbing towers
  // S=0.476, width=11000, height=800
  // ============================================================
  {
    id: 88, name: "Tower Ascent", width: 11000, height: 800, biome: 'castle-final',
    platforms: (() => {
      const S = S88;
      const plats: any[] = [];
      // Start ground
      plats.push(createPlat(250 * S, 600, 600 * S, 40, 'castle'));
      // Approach platform
      plats.push(createPlat(950 * S, 540, 110, 28, 'platform_easy'));
      // Vertical climb 1
      plats.push(...verticalClimb(S, 1100, 600, 'castle'));
      // Ground after climb
      plats.push(createPlat(3200 * S, 600, 600 * S, 40, 'castle'));
      // Vertical climb 2 (higher)
      plats.push(...verticalClimb(S, 3800, 600, 'castle'));
      // Ground after climb 2
      plats.push(createPlat(5900 * S, 600, 500 * S, 40, 'castle'));
      // Scattered platforms at mixed heights
      plats.push(createPlat(6600 * S, 530, 110, 28, 'platform_easy'));
      plats.push(createPlat(6900 * S, 460, 110, 28, 'platform_medium'));
      plats.push(createPlat(7200 * S, 390, 110, 28, 'platform_hard'));
      plats.push(createPlat(7600 * S, 320, 140, 40, 'brick'));
      plats.push(createPlat(8000 * S, 390, 110, 28, 'platform_hard'));
      plats.push(createPlat(8300 * S, 460, 110, 28, 'platform_medium'));
      plats.push(createPlat(8600 * S, 530, 110, 28, 'platform_easy'));
      // Ground mid-section
      plats.push(createPlat(9200 * S, 600, 600 * S, 40, 'castle'));
      // Vertical climb 3
      plats.push(...verticalClimb(S, 9800, 600, 'castle'));
      // Ground after climb 3
      plats.push(createPlat(11900 * S, 600, 500 * S, 40, 'castle'));
      // Secondary scattered climb
      plats.push(createPlat(12600 * S, 540, 110, 28, 'platform_easy'));
      plats.push(createPlat(12900 * S, 480, 110, 28, 'platform_medium'));
      plats.push(createPlat(13200 * S, 420, 110, 28, 'platform_hard'));
      plats.push(createPlat(13500 * S, 360, 130, 32, 'platform_hard'));
      plats.push(createPlat(13900 * S, 420, 110, 28, 'platform_hard'));
      plats.push(createPlat(14200 * S, 480, 110, 28, 'platform_medium'));
      plats.push(createPlat(14500 * S, 540, 110, 28, 'platform_easy'));
      // Final ground to goal
      plats.push(createPlat(15200 * S, 600, 800 * S, 40, 'castle'));
      return plats;
    })(),
    coins: (() => {
      const S = S88;
      const cs: any[] = [];
      for (let x = 300; x < 900; x += 200) cs.push(createCoin(x * S, 550));
      for (let x = 1900; x < 2100; x += 100) cs.push(createCoin(x * S, 240));
      for (let x = 3300; x < 3700; x += 180) cs.push(createCoin(x * S, 550));
      for (let x = 4600; x < 4800; x += 100) cs.push(createCoin(x * S, 240));
      cs.push(createCoin(7600 * S, 270));
      for (let x = 9300; x < 9700; x += 180) cs.push(createCoin(x * S, 550));
      for (let x = 10700; x < 10900; x += 100) cs.push(createCoin(x * S, 240));
      for (let x = 12000; x < 12500; x += 180) cs.push(createCoin(x * S, 550));
      for (let x = 15300; x < 15900; x += 150) cs.push(createCoin(x * S, 540));
      return cs;
    })(),
    questionBlocks: [
      createQB(500 * S88, 530, 'mushroom'),
      createQB(2000 * S88, 220, 'star'),
      createQB(3500 * S88, 530, 'flower'),
      createQB(4700 * S88, 220, 'mushroom'),
      createQB(7000 * S88, 320, 'coin'),
      createQB(9400 * S88, 530, 'flower'),
      createQB(10800 * S88, 220, 'star'),
      createQB(15500 * S88, 530, 'mushroom'),
    ],
    enemies: [
      createEnemy(400 * S88, 560, 'goomba'),
      createEnemy(1600 * S88, 520, 'crab'),
      createEnemy(2200 * S88, 240, 'goomba'),
      createEnemy(3400 * S88, 560, 'koopa'),
      createEnemy(4300 * S88, 520, 'robot'),
      createEnemy(5000 * S88, 240, 'spiny'),
      createEnemy(6100 * S88, 560, 'goomba'),
      createEnemy(7500 * S88, 280, 'goomba'),
      createEnemy(10000 * S88, 560, 'robot'),
      createEnemy(10400 * S88, 240, 'spiny'),
      createEnemy(13100 * S88, 380, 'crab'),
      createEnemy(15400 * S88, 560, 'thwomp'),
    ],
    decorations: [
      createDeco(300 * S88, 560, 'banner'),
      createDeco(2500 * S88, 240, 'chain'),
      createDeco(6000 * S88, 560, 'torch'),
      createDeco(8000 * S88, 280, 'boss-flag'),
      createDeco(10500 * S88, 240, 'banner'),
      createDeco(13500 * S88, 320, 'torch'),
      createDeco(15600 * S88, 560, 'boss-flag'),
    ],
    playerStart: { x: 150, y: 550 },
    goal: { x: 15600 * S88, y: 578 },
    timeBonus: 190,
    movingPlatforms: [
      createMovingPlat(700 * S88, 530, 120, 24, 'platform_medium', 'horizontal', 280, 20),
      createMovingPlat(8900 * S88, 520, 130, 24, 'platform_medium', 'horizontal', 300, 22),
      createMovingPlat(14800 * S88, 530, 120, 24, 'platform_medium', 'vertical', 160, 20),
    ],
  },

  // ============================================================
  // LEVEL 89: Gegner-Horde — 15-20 enemies, simpler layout, combat focus
  // S=0.455, width=11000, height=660
  // ============================================================
  {
    id: 89, name: "Enemy Horde", width: 11000, height: 660, biome: 'castle-final',
    platforms: (() => {
      const S = S89;
      const plats: any[] = [];
      // Arena 1: long combat zone
      plats.push(createPlat(250 * S, 620, 1600 * S, 40, 'castle'));
      // Brief gap
      plats.push(...gapWithPlatforms(S, 2100, 620, 350, 2));
      // Arena 2
      plats.push(createPlat(2900 * S, 620, 1600 * S, 40, 'castle'));
      // Gap with pipes (piranha threats)
      plats.push(...pipeSection(S, 4800, 620, 3));
      // Arena 3
      plats.push(createPlat(6500 * S, 620, 1500 * S, 40, 'castle'));
      // Brief gap
      plats.push(...gapWithPlatforms(S, 8300, 620, 350, 2));
      // Arena 4
      plats.push(createPlat(9100 * S, 620, 1600 * S, 40, 'castle'));
      // Brief gap
      plats.push(...gapWithPlatforms(S, 10900, 620, 350, 2));
      // Arena 5 (goal arena)
      plats.push(createPlat(11700 * S, 620, 1600 * S, 40, 'castle'));
      // Upper exploration platforms
      plats.push(createPlat(13700 * S, 550, 110, 28, 'platform_easy'));
      plats.push(createPlat(14000 * S, 500, 110, 28, 'platform_medium'));
      return plats;
    })(),
    coins: (() => {
      const S = S89;
      const cs: any[] = [];
      for (let x = 300; x < 2000; x += 180) cs.push(createCoin(x * S, 570));
      for (let x = 3000; x < 4600; x += 180) cs.push(createCoin(x * S, 570));
      for (let x = 6600; x < 8100; x += 180) cs.push(createCoin(x * S, 570));
      for (let x = 9200; x < 10700; x += 180) cs.push(createCoin(x * S, 570));
      for (let x = 11800; x < 13400; x += 180) cs.push(createCoin(x * S, 570));
      return cs;
    })(),
    questionBlocks: [
      createQB(400 * S89, 550, 'mushroom'),
      createQB(3200 * S89, 550, 'flower'),
      createQB(7000 * S89, 550, 'star'),
      createQB(9500 * S89, 550, 'mushroom'),
      createQB(12100 * S89, 550, 'coin'),
    ],
    enemies: [
      // Arena 1: 5 enemies
      createEnemy(350 * S89, 580, 'goomba'),
      createEnemy(700 * S89, 580, 'goomba'),
      createEnemy(1000 * S89, 580, 'koopa'),
      createEnemy(1300 * S89, 580, 'boss'),
      createEnemy(1700 * S89, 580, 'robot'),
      // Arena 2: 5 enemies
      createEnemy(3100 * S89, 580, 'spiny'),
      createEnemy(3600 * S89, 580, 'goomba'),
      createEnemy(4000 * S89, 580, 'crab'),
      createEnemy(4400 * S89, 580, 'thwomp'),
      createEnemy(5000 * S89, 585, 'piranha'),
      // Pipe section piranhas
      createEnemy(5300 * S89, 585, 'piranha'),
      createEnemy(5700 * S89, 585, 'piranha'),
      // Arena 3: 4 enemies
      createEnemy(6800 * S89, 580, 'koopa'),
      createEnemy(7300 * S89, 580, 'crab'),
      createEnemy(7800 * S89, 580, 'thwomp'),
      createEnemy(8000 * S89, 580, 'goomba'),
      // Arena 4: 4 enemies
      createEnemy(9400 * S89, 580, 'robot'),
      createEnemy(9900 * S89, 580, 'boss'),
      createEnemy(10300 * S89, 580, 'spiny'),
      createEnemy(10700 * S89, 580, 'goomba'),
      // Arena 5: 2 enemies
      createEnemy(12000 * S89, 580, 'boss'),
      createEnemy(13000 * S89, 580, 'thwomp'),
    ],
    decorations: [
      createDeco(500 * S89, 580, 'banner'),
      createDeco(2500 * S89, 580, 'torch'),
      createDeco(5500 * S89, 580, 'chain'),
      createDeco(7200 * S89, 580, 'boss-flag'),
      createDeco(9800 * S89, 580, 'banner'),
      createDeco(11000 * S89, 580, 'torch'),
      createDeco(12500 * S89, 580, 'boss-flag'),
    ],
    playerStart: { x: 150, y: 570 },
    goal: { x: 11800 * S89, y: 598 },
    timeBonus: 200,
    movingPlatforms: [
      createMovingPlat(2600 * S89, 550, 130, 24, 'platform_medium', 'horizontal', 320, 22),
      createMovingPlat(8800 * S89, 550, 120, 24, 'platform_medium', 'horizontal', 300, 24),
      createMovingPlat(11500 * S89, 550, 120, 24, 'platform_medium', 'vertical', 160, 20),
    ],
  },

  // ============================================================
  // LEVEL 90: Boss-Arena Finale — Boss arena feel, thwomp and boss enemies, climactic
  // S=0.435, width=13000, height=700
  // ============================================================
  {
    id: 90, name: "Final Boss Arena", width: 13000, height: 700, biome: 'castle-final',
    platforms: (() => {
      const S = S90;
      const plats: any[] = [];
      // Grand entrance: long castle platform
      plats.push(createPlat(300 * S, 660, 1200 * S, 40, 'castle'));
      // First challenge gap
      plats.push(...gapWithPlatforms(S, 1600, 660, 600, 4));
      // Arena 1: battle zone
      plats.push(createPlat(2800 * S, 660, 1200 * S, 40, 'castle'));
      // Vertical arena section (climb during fight)
      plats.push(...verticalClimb(S, 4300, 660, 'castle'));
      // Arena 2: elevated battle platform
      plats.push(createPlat(6400 * S, 660, 1000 * S, 40, 'castle'));
      // Challenging scattered platforms
      plats.push(createPlat(7800 * S, 600, 110, 28, 'platform_easy'));
      plats.push(createPlat(8200 * S, 540, 110, 28, 'platform_medium'));
      plats.push(createPlat(8600 * S, 480, 110, 28, 'platform_hard'));
      plats.push(createPlat(9000 * S, 420, 150, 40, 'brick'));
      plats.push(createPlat(9500 * S, 480, 110, 28, 'platform_hard'));
      plats.push(createPlat(9900 * S, 540, 110, 28, 'platform_medium'));
      plats.push(createPlat(10300 * S, 600, 110, 28, 'platform_easy'));
      // Arena 3: final approach ground
      plats.push(createPlat(11000 * S, 660, 1000 * S, 40, 'castle'));
      // Pipe section with boss-level threats
      plats.push(...pipeSection(S, 12300, 660, 3));
      // Arena 4: long preparation stretch
      plats.push(createPlat(13900 * S, 660, 1200 * S, 40, 'castle'));
      // Final challenge gap before goal
      plats.push(...gapWithPlatforms(S, 15500, 660, 600, 4));
      // Goal platform: elevated and prestigious
      plats.push(createPlat(16600 * S, 660, 1000 * S, 40, 'castle'));
      // Descending approach platforms (alternative path)
      plats.push(createPlat(17900 * S, 600, 110, 28, 'platform_easy'));
      plats.push(createPlat(18200 * S, 540, 110, 28, 'platform_medium'));
      plats.push(createPlat(18500 * S, 480, 110, 28, 'platform_hard'));
      return plats;
    })(),
    coins: (() => {
      const S = S90;
      const cs: any[] = [];
      for (let x = 400; x < 1500; x += 170) cs.push(createCoin(x * S, 610));
      for (let x = 2900; x < 4000; x += 170) cs.push(createCoin(x * S, 610));
      for (let x = 5000; x < 5200; x += 100) cs.push(createCoin(x * S, 300));
      for (let x = 6500; x < 7400; x += 170) cs.push(createCoin(x * S, 610));
      cs.push(createCoin(9000 * S, 370));
      for (let x = 11100; x < 12100; x += 170) cs.push(createCoin(x * S, 610));
      for (let x = 14000; x < 15200; x += 170) cs.push(createCoin(x * S, 610));
      for (let x = 16700; x < 17600; x += 160) cs.push(createCoin(x * S, 610));
      return cs;
    })(),
    questionBlocks: [
      createQB(600 * S90, 590, 'mushroom'),
      createQB(1800 * S90, 550, 'star'),
      createQB(3300 * S90, 590, 'flower'),
      createQB(5100 * S90, 280, 'mushroom'),
      createQB(6800 * S90, 590, 'star'),
      createQB(8600 * S90, 410, 'coin'),
      createQB(11400 * S90, 590, 'mushroom'),
      createQB(14300 * S90, 590, 'flower'),
      createQB(16000 * S90, 550, 'star'),
      createQB(17000 * S90, 590, 'mushroom'),
    ],
    enemies: [
      // Entrance: 3 enemies
      createEnemy(600 * S90, 620, 'boss'),
      createEnemy(1000 * S90, 620, 'thwomp'),
      createEnemy(1400 * S90, 620, 'goomba'),
      // Arena 1: 4 enemies
      createEnemy(3100 * S90, 620, 'boss'),
      createEnemy(3600 * S90, 620, 'koopa'),
      createEnemy(4000 * S90, 620, 'thwomp'),
      createEnemy(4300 * S90, 620, 'robot'),
      // Vertical climb section: 3 enemies
      createEnemy(4700 * S90, 580, 'crab'),
      createEnemy(5300 * S90, 300, 'goomba'),
      createEnemy(5900 * S90, 580, 'spiny'),
      // Arena 2: 4 enemies
      createEnemy(6600 * S90, 620, 'boss'),
      createEnemy(7100 * S90, 620, 'thwomp'),
      createEnemy(7500 * S90, 620, 'koopa'),
      createEnemy(8100 * S90, 500, 'crab'),
      // Scattered section: 2 enemies
      createEnemy(9300 * S90, 380, 'robot'),
      createEnemy(10100 * S90, 500, 'thwomp'),
      // Arena 3: 3 enemies
      createEnemy(11400 * S90, 620, 'boss'),
      createEnemy(11800 * S90, 620, 'spiny'),
      createEnemy(12500 * S90, 625, 'piranha'),
      createEnemy(12900 * S90, 625, 'piranha'),
      // Pipe section piranhas
      createEnemy(13300 * S90, 625, 'piranha'),
      // Arena 4: 3 enemies
      createEnemy(14100 * S90, 620, 'goomba'),
      createEnemy(14800 * S90, 620, 'boss'),
      createEnemy(15400 * S90, 620, 'thwomp'),
      // Final gap: 1 enemy on goal platform approach
      createEnemy(17000 * S90, 620, 'boss'),
    ],
    decorations: [
      createDeco(500 * S90, 620, 'banner'),
      createDeco(1200 * S90, 620, 'torch'),
      createDeco(3500 * S90, 620, 'chain'),
      createDeco(5200 * S90, 300, 'boss-flag'),
      createDeco(6800 * S90, 620, 'banner'),
      createDeco(9000 * S90, 380, 'boss-flag'),
      createDeco(11300 * S90, 620, 'torch'),
      createDeco(14500 * S90, 620, 'chain'),
      createDeco(15800 * S90, 620, 'banner'),
      createDeco(17200 * S90, 620, 'boss-flag'),
    ],
    playerStart: { x: 150, y: 610 },
    goal: { x: 17000 * S90, y: 638 },
    timeBonus: 250,
    movingPlatforms: [
      // Bridge over first gap
      createMovingPlat(2200 * S90, 590, 140, 24, 'platform_medium', 'horizontal', 350, 24),
      // Vertical helper in arena climb
      createMovingPlat(7700 * S90, 580, 130, 24, 'platform_medium', 'vertical', 200, 22),
      // Bridge between scattered platforms and arena 3
      createMovingPlat(10600 * S90, 580, 140, 24, 'platform_medium', 'horizontal', 300, 26),
      // Bridge over final gap before goal
      createMovingPlat(16100 * S90, 580, 140, 24, 'platform_medium', 'horizontal', 380, 26),
    ],
  },
];
