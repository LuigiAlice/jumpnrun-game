// Grasslands World - 6 Super Mario-style Side-Scrolling Levels (IDs 1-6)
// Long horizontal levels with ground sections, gaps, pipes, and vertical passages

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat } from './helpers';

const S = 0.65;

const gapWithPlatforms = (startX: number, baseY: number, gapWidth: number, platformCount: number): any[] => {
  const plats = [];
  const platformSpacing = gapWidth / (platformCount + 1);
  for (let i = 0; i < platformCount; i++) {
    const px = startX + platformSpacing * (i + 1);
    const py = baseY - 60 - (i * 25);
    const pw = 100;
    const ptype = i % 3 === 0 ? 'platform_easy' : (i % 3 === 1 ? 'platform_medium' : 'platform_hard');
    plats.push(createPlat(px, py, pw, 24, ptype));
  }
  return plats;
};

const pipeSection = (startX: number, y: number, pipeCount: number): any[] => {
  const plats = [];
  for (let i = 0; i < pipeCount; i++) {
    const px = startX + 250 + i * 280; // Reduced spacing for jump safety (315px limit)
    const ph = 64;
    plats.push(createPlat(px, y, 64, ph, 'pipe'));
    plats.push(createPlat(px - 8, y - ph / 2 - 12, 80, 24, 'pipe_top'));
  }
  return plats;
};

export const GRASSLANDS_LEVELS: LevelData[] = [
  {
    id: 1, name: "Grasslands Plains", width: 20000, height: 600, biome: 'grasslands',
    platforms: (() => {
      const plats: any[] = [];
      plats.push(createPlat(250 * S, 550, 600 * S, 40, 'grass'));
      plats.push(createPlat(1000 * S, 550, 500 * S, 40, 'grass'));
      plats.push(createPlat(1700 * S, 550, 600 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(2300 * S, 550, 400 * S, 3));
      plats.push(createPlat(3000 * S, 550, 800 * S, 40, 'grass'));
      plats.push(createPlat(4100 * S, 550, 500 * S, 40, 'grass'));
      plats.push(createPlat(4450 * S, 500, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(4600 * S, 550, 4));
      plats.push(createPlat(5950 * S, 500, 100, 20, 'platform_easy'));
      plats.push(createPlat(6200 * S, 550, 1000 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(7400 * S, 550, 350 * S, 2));
      plats.push(createPlat(8000 * S, 550, 800 * S, 40, 'grass'));
      plats.push(createPlat(9000 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(9300 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(9600 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(9900 * S, 240, 150, 40, 'grass'));
      plats.push(createPlat(10300 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(10600 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(10900 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(11200 * S, 550, 600 * S, 40, 'grass'));
      plats.push(createPlat(12100 * S, 550, 200, 40, 'grass'));
      plats.push(createPlat(13000 * S, 550, 1200 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(14400 * S, 550, 400 * S, 3));
      plats.push(createPlat(15100 * S, 550, 800 * S, 40, 'grass'));
      plats.push(...pipeSection(15900 * S, 550, 3));
      plats.push(createPlat(17500 * S, 550, 1000 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(18700 * S, 550, 350 * S, 2));
      plats.push(createPlat(19300 * S, 550, 600 * S, 40, 'grass'));
      return plats;
    })(),
    coins: (() => {
      const coins: any[] = [];
      for (let x = 300; x < 2500; x += 200) coins.push(createCoin(x * S, 500));
      for (let x = 3000; x < 4000; x += 200) coins.push(createCoin(x * S, 500));
      for (let x = 6200 * S; x < 7200 * S; x += 200) coins.push(createCoin(x, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(1500 * S, 480, 'coin'),
        createQB(3500 * S, 480, 'mushroom'),
        createQB(7500 * S, 480, 'flower'),
        createQB(9500 * S, 170, 'star'),
        createQB(10500 * S, 250, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      return [
        createEnemy(800 * S, 510, 'goomba'),
        createEnemy(1200 * S, 510, 'goomba'),
        createEnemy(1800 * S, 510, 'koopa'),
        createEnemy(3200 * S, 510, 'goomba'),
        createEnemy(3700 * S, 510, 'robot'),
        createEnemy(4400 * S, 510, 'piranha'),
        createEnemy(6400 * S, 510, 'crab'),
        createEnemy(7000 * S, 510, 'spiny'),
        createEnemy(8500 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      return [
        createDeco(400 * S, 510, 'tree'),
        createDeco(1200 * S, 510, 'bush'),
        createDeco(2000 * S, 510, 'tree'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 12545, y: 510 },
    timeBonus: 120,
    movingPlatforms: [
      createMovingPlat(11700 * S, 480, 150, 24, 'platform_medium', 'horizontal', 350, 20),
      createMovingPlat(12100 * S, 480, 120, 24, 'platform_medium', 'horizontal', 250, 18),
    ],
  },
  {
    id: 2, name: "Grasslands Hills", width: 21000, height: 700, biome: 'grasslands',
    platforms: (() => {
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 800 * S, 40, 'grass'));
      plats.push(createPlat(1200 * S, 600, 600 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(1900 * S, 600, 400 * S, 3));
      plats.push(createPlat(2600 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(...pipeSection(3600 * S, 600, 4));
      // Bridge gap after pipes
      plats.push(createPlat(5000 * S, 550, 150, 20, 'platform_easy'));
      plats.push(createPlat(5400 * S, 600, 1200 * S, 40, 'grass'));
      // Bridge gap to platforms
      plats.push(createPlat(6600 * S, 550, 150, 20, 'platform_easy'));
      plats.push(createPlat(7000 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(7300 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(7600 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(7900 * S, 280, 150, 40, 'grass'));
      plats.push(createPlat(8300 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(8600 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(8900 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(9200 * S, 600, 800 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(10200 * S, 600, 400 * S, 3));
      plats.push(createPlat(10900 * S, 600, 1000 * S, 40, 'grass'));
      return plats;
    })(),
    coins: (() => {
      const coins: any[] = [];
      for (let x = 300; x < 2000; x += 200) coins.push(createCoin(x * S, 550));
      for (let x = 2600 * S; x < 3600 * S; x += 200) coins.push(createCoin(x, 550));
      for (let x = 5400 * S; x < 6600 * S; x += 200) coins.push(createCoin(x, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      return [
        createQB(800 * S, 530, 'mushroom'),
        createQB(1500 * S, 530, 'coin'),
        createQB(2800 * S, 530, 'mushroom'),
        createQB(4000 * S, 530, 'flower'),
        createQB(5500 * S, 530, 'star'),
        createQB(7200 * S, 290, 'mushroom'),
        createQB(8500 * S, 450, 'coin'),
      ];
    })(),
    enemies: (() => {
      return [
        createEnemy(600 * S, 560, 'goomba'),
        createEnemy(1400 * S, 560, 'koopa'),
        createEnemy(2200 * S, 560, 'goomba'),
        createEnemy(2800 * S, 560, 'robot'),
        createEnemy(3700 * S, 560, 'piranha'),
        createEnemy(4600 * S, 560, 'crab'),
        createEnemy(7000 * S, 560, 'goomba'),
        createEnemy(7500 * S, 560, 'spiny'),
      ];
    })(),
    decorations: (() => {
      return [
        createDeco(400 * S, 560, 'tree'),
        createDeco(1800 * S, 560, 'bush'),
        createDeco(3000 * S, 560, 'tree'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 11000 * S, y: 580 },
    timeBonus: 140,
  },
  {
    id: 3, name: "Grasslands Mountains", width: 20000, height: 800, biome: 'grasslands',
    platforms: (() => {
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 700, 800 * S, 40, 'grass'));
      plats.push(createPlat(1200 * S, 700, 600 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(1900 * S, 700, 400 * S, 3));
      plats.push(createPlat(2600 * S, 700, 1000 * S, 40, 'grass'));
      plats.push(...pipeSection(3600 * S, 700, 5));
      // Bridge gap after pipes
      plats.push(createPlat(5200 * S, 650, 150, 20, 'platform_easy'));
      plats.push(createPlat(5600 * S, 700, 1200 * S, 40, 'grass'));
      return plats;
    })(),
    coins: (() => {
      const coins: any[] = [];
      for (let x = 300; x < 2400; x += 200) coins.push(createCoin(x * S, 650));
      for (let x = 2600 * S; x < 3600 * S; x += 200) coins.push(createCoin(x, 650));
      return coins;
    })(),
    questionBlocks: (() => {
      return [
        createQB(600 * S, 630, 'mushroom'),
        createQB(1400 * S, 630, 'coin'),
        createQB(2800 * S, 630, 'mushroom'),
        createQB(3200 * S, 630, 'flower'),
        createQB(3800 * S, 630, 'star'),
      ];
    })(),
    enemies: (() => {
      return [
        createEnemy(500 * S, 660, 'goomba'),
        createEnemy(1000 * S, 660, 'koopa'),
        createEnemy(1600 * S, 660, 'goomba'),
        createEnemy(2200 * S, 660, 'robot'),
        createEnemy(3700 * S, 660, 'piranha'),
        createEnemy(4400 * S, 660, 'crab'),
      ];
    })(),
    decorations: (() => {
      return [
        createDeco(400 * S, 660, 'tree'),
        createDeco(2000 * S, 660, 'bush'),
      ];
    })(),
    playerStart: { x: 150, y: 650 },
    goal: { x: 6000 * S, y: 680 },
    timeBonus: 160,
  },
  {
    id: 4, name: "Grasslands Valley", width: 20250, height: 700, biome: 'grasslands',
    platforms: (() => {
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(createPlat(1500 * S, 600, 800 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(2400 * S, 600, 500 * S, 3));
      plats.push(createPlat(3200 * S, 600, 1200 * S, 40, 'grass'));
      plats.push(...pipeSection(4400 * S, 600, 5));
      // Bridge gap
      plats.push(createPlat(5800 * S, 550, 150, 20, 'platform_easy'));
      plats.push(createPlat(6200 * S, 600, 1500 * S, 40, 'grass'));
      return plats;
    })(),
    coins: (() => {
      const coins: any[] = [];
      for (let x = 300; x < 2400; x += 200) coins.push(createCoin(x * S, 550));
      for (let x = 3200 * S; x < 4400 * S; x += 200) coins.push(createCoin(x, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      return [
        createQB(800 * S, 530, 'mushroom'),
        createQB(1800 * S, 530, 'coin'),
        createQB(3500 * S, 530, 'flower'),
        createQB(4000 * S, 530, 'star'),
        createQB(4500 * S, 530, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      return [
        createEnemy(600 * S, 560, 'goomba'),
        createEnemy(1300 * S, 560, 'koopa'),
        createEnemy(1900 * S, 560, 'goomba'),
        createEnemy(2500 * S, 560, 'robot'),
        createEnemy(4500 * S, 560, 'piranha'),
        createEnemy(5500 * S, 560, 'crab'),
      ];
    })(),
    decorations: (() => {
      return [
        createDeco(400 * S, 560, 'tree'),
        createDeco(2000 * S, 560, 'bush'),
        createDeco(5000 * S, 560, 'tree'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 7000 * S, y: 580 },
    timeBonus: 180,
    movingPlatforms: [
      createMovingPlat(5500 * S, 480, 150, 24, 'platform_medium', 'horizontal', 400, 22),
    ],
  },
  {
    id: 5, name: "Grasslands Fortress", width: 20160, height: 700, biome: 'grasslands',
    platforms: (() => {
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1200 * S, 40, 'grass'));
      plats.push(createPlat(1700 * S, 600, 800 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(2600 * S, 600, 500 * S, 4));
      plats.push(createPlat(3500 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(...pipeSection(5000 * S, 600, 6));
      // Bridge gap
      plats.push(createPlat(6800 * S, 550, 150, 20, 'platform_easy'));
      plats.push(createPlat(7200 * S, 600, 1800 * S, 40, 'grass'));
      return plats;
    })(),
    coins: (() => {
      const coins: any[] = [];
      for (let x = 300; x < 2600; x += 200) coins.push(createCoin(x * S, 550));
      for (let x = 3500 * S; x < 5000 * S; x += 200) coins.push(createCoin(x, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(1500 * S, 480, 'coin'),
        createQB(3000 * S, 586, 'mushroom'),
        createQB(3700 * S, 586, 'flower'),
        createQB(4500 * S, 586, 'star'),
        createQB(6000 * S, 586, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      return [
        createEnemy(500 * S, 560, 'goomba'),
        createEnemy(1100 * S, 560, 'koopa'),
        createEnemy(1700 * S, 560, 'goomba'),
        createEnemy(2400 * S, 560, 'robot'),
        createEnemy(5100 * S, 560, 'piranha'),
        createEnemy(5600 * S, 560, 'crab'),
        createEnemy(6200 * S, 560, 'spiny'),
      ];
    })(),
    decorations: (() => {
      return [
        createDeco(400 * S, 560, 'tree'),
        createDeco(2800 * S, 560, 'bush'),
        createDeco(6000 * S, 560, 'tree'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 8500 * S, y: 580 },
    timeBonus: 200,
  },
  {
    id: 6, name: "Grasslands Finale", width: 20000, height: 700, biome: 'grasslands',
    platforms: (() => {
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(createPlat(2000 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(3100 * S, 600, 600 * S, 4));
      plats.push(createPlat(4100 * S, 600, 1800 * S, 40, 'grass'));
      plats.push(...pipeSection(5900 * S, 600, 6));
      // Bridge gap
      plats.push(createPlat(7800 * S, 550, 150, 20, 'platform_easy'));
      plats.push(createPlat(8200 * S, 600, 2000 * S, 40, 'grass'));
      return plats;
    })(),
    coins: (() => {
      const coins: any[] = [];
      for (let x = 300; x < 3100; x += 200) coins.push(createCoin(x * S, 550));
      for (let x = 4100 * S; x < 5900 * S; x += 200) coins.push(createCoin(x, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      return [
        createQB(800 * S, 530, 'mushroom'),
        createQB(1500 * S, 530, 'coin'),
        createQB(2200 * S, 530, 'mushroom'),
        createQB(3000 * S, 530, 'flower'),
        createQB(4500 * S, 530, 'star'),
        createQB(5500 * S, 530, 'mushroom'),
        createQB(6500 * S, 530, 'coin'),
      ];
    })(),
    enemies: (() => {
      return [
        createEnemy(600 * S, 560, 'goomba'),
        createEnemy(1200 * S, 560, 'koopa'),
        createEnemy(1900 * S, 560, 'goomba'),
        createEnemy(2700 * S, 560, 'robot'),
        createEnemy(4200 * S, 560, 'piranha'),
        createEnemy(4800 * S, 560, 'crab'),
        createEnemy(6000 * S, 560, 'spiny'),
      ];
    })(),
    decorations: (() => {
      return [
        createDeco(400 * S, 560, 'tree'),
        createDeco(2500 * S, 560, 'bush'),
        createDeco(5000 * S, 560, 'tree'),
        createDeco(7000 * S, 560, 'bush'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 9500 * S, y: 580 },
    timeBonus: 220,
    movingPlatforms: [
      createMovingPlat(7500 * S, 480, 150, 24, 'platform_medium', 'horizontal', 400, 22),
    ],
  },
];