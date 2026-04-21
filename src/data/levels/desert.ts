// Desert World - 6 Super Mario-style Side-Scrolling Levels (IDs 7-12)
// Long horizontal desert levels with sand, pyramids, pipes, and vertical passages

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat } from './helpers';

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
    const px = startX + 250 + i * 280;
    const ph = 64;
    plats.push(createPlat(px, y, 64, ph, 'pipe'));
    plats.push(createPlat(px - 8, y - ph / 2 - 12, 80, 24, 'pipe_top'));
  }
  return plats;
};

const verticalClimb = (startX: number, baseY: number, steps: number): any[] => {
  const plats = [];
  const stepHeight = 80;
  const stepWidth = 120;
  for (let i = 0; i < steps; i++) {
    const py = baseY - i * stepHeight;
    const px = startX + i * 150;
    const ptype = i % 3 === 0 ? 'platform_easy' : (i % 3 === 1 ? 'platform_medium' : 'platform_hard');
    plats.push(createPlat(px, py, stepWidth, 28, ptype));
  }
  return plats;
};

export const DESERT_LEVELS: LevelData[] = [
  {
    id: 7, name: "Sandy Deserts", width: 20100, height: 600, biome: 'desert',
    platforms: (() => {
      const S = 0.67;
      const plats: any[] = [];
      plats.push(createPlat(250 * S, 550, 600 * S, 40, 'sand'));
      plats.push(createPlat(1000 * S, 550, 500 * S, 40, 'sand'));
      plats.push(createPlat(1700 * S, 550, 600 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(2300 * S, 550, 400 * S, 3));
      plats.push(createPlat(3000 * S, 550, 800 * S, 40, 'sand'));
      plats.push(createPlat(4100 * S, 550, 500 * S, 40, 'sand'));
      
      // Helper bridge to pipes
      plats.push(createPlat(4400 * S, 500, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(4600 * S, 550, 4));
      // Helper bridge after pipes
      plats.push(createPlat(5950 * S, 500, 100, 20, 'platform_easy'));
      
      plats.push(createPlat(6200 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(createPlat(7500 * S, 550, 600 * S, 40, 'sand'));
      plats.push(createPlat(8400 * S, 550, 500 * S, 40, 'sand'));
      plats.push(createPlat(9200 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(9500 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(9800 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(10100 * S, 240, 150, 40, 'sand'));
      plats.push(createPlat(10400 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(10700 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(11000 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(11300 * S, 550, 600 * S, 40, 'sand'));
      
      // Helper bridge for the void between 11300 and 12500
      plats.push(createPlat(11900 * S, 550, 200, 40, 'sand'));
      
      plats.push(createPlat(12500 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(13700 * S, 550, 400 * S, 3));
      plats.push(createPlat(14400 * S, 550, 800 * S, 40, 'sand'));
      
      // Helper bridge to pipes
      plats.push(createPlat(15100 * S, 500, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(15300 * S, 550, 3));
      // Helper bridge after pipes
      plats.push(createPlat(16400 * S, 500, 100, 20, 'platform_easy'));
      
      plats.push(createPlat(16800 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(18000 * S, 550, 350 * S, 2));
      plats.push(createPlat(18600 * S, 550, 600 * S, 40, 'sand'));
      plats.push(createPlat(19600 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(19900 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(20200 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(20500 * S, 240, 120, 28, 'platform_hard'));
      plats.push(createPlat(20800 * S, 180, 150, 40, 'sand'));
      plats.push(createPlat(21100 * S, 240, 120, 28, 'platform_hard'));
      plats.push(createPlat(21400 * S, 320, 120, 28, 'platform_medium'));
      plats.push(createPlat(21700 * S, 400, 120, 28, 'platform_easy'));
      plats.push(createPlat(22000 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(22300 * S, 550, 600 * S, 40, 'sand'));
      plats.push(createPlat(23600 * S, 550, 800 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(24600 * S, 550, 400 * S, 3));
      plats.push(createPlat(25300 * S, 550, 1000 * S, 40, 'sand'));
      
      // Helper bridge to pipes
      plats.push(createPlat(26300 * S, 500, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(26500 * S, 550, 3));
      // Helper bridge after pipes
      plats.push(createPlat(27600 * S, 500, 100, 20, 'platform_easy'));
      
      plats.push(createPlat(28000 * S, 550, 2000 * S, 40, 'sand'));
      return plats;
    })(),
    movingPlatforms: [
      createMovingPlat(6400, 450, 120, 24, 'platform_medium', 'vertical', 200, 20),
    ],
    coins: (() => {
      const S = 0.67;
      const coins: any[] = [];
      for (let x = 300; x < 2500; x += 200) coins.push(createCoin(x * S, 500));
      for (let x = 3000 * S; x < 4100 * S; x += 200) coins.push(createCoin(x, 500));
      for (let x = 6200 * S; x < 11000 * S; x += 200) coins.push(createCoin(x, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.67;
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(1500 * S, 480, 'coin'),
        createQB(3500 * S, 480, 'mushroom'),
        createQB(7500 * S, 480, 'flower'),
        createQB(9500 * S, 250, 'star'),
        createQB(10500 * S, 250, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.67;
      return [
        createEnemy(800 * S, 510, 'goomba'),
        createEnemy(1200 * S, 510, 'goomba'),
        createEnemy(1800 * S, 510, 'koopa'),
        createEnemy(3200 * S, 510, 'goomba'),
        createEnemy(4700 * S, 510, 'piranha'),
        createEnemy(6400 * S, 510, 'crab'),
        createEnemy(7000 * S, 510, 'spiny'),
        createEnemy(8500 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.67;
      return [
        createDeco(400 * S, 510, 'cactus'),
        createDeco(1200 * S, 510, 'rock'),
        createDeco(2000 * S, 510, 'skull'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 12730, y: 508 },
    timeBonus: 120,
  },
  {
    id: 8, name: "Pyramid Dunes", width: 20060, height: 600, biome: 'desert',
    platforms: (() => {
      const S = 0.59;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 550, 800 * S, 40, 'sand'));
      plats.push(createPlat(1200 * S, 550, 600 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(1900 * S, 550, 450 * S, 3));
      plats.push(createPlat(2600 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(createPlat(4000 * S, 550, 800 * S, 40, 'sandstone'));
      plats.push(...pipeSection(5000 * S, 550, 4));
      // Helper after pipes
      plats.push(createPlat(6300 * S, 500, 100, 20, 'platform_easy'));
      plats.push(createPlat(6600 * S, 550, 1200 * S, 40, 'sand'));
      plats.push(createPlat(8200 * S, 550, 600 * S, 40, 'sand'));
      plats.push(createPlat(9100 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(9400 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(9700 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(10000 * S, 240, 150, 40, 'sand'));
      plats.push(createPlat(10300 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(10600 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(10900 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(11200 * S, 550, 800 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(12200 * S, 550, 400 * S, 3));
      plats.push(createPlat(12900 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(createPlat(14200 * S, 550, 800 * S, 40, 'sandstone'));
      plats.push(...pipeSection(15200 * S, 550, 3));
      // Helper
      plats.push(createPlat(16300 * S, 500, 100, 20, 'platform_easy'));
      plats.push(createPlat(16700 * S, 550, 1200 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.59;
      const coins: any[] = [];
      for (let x = 300; x < 2600; x += 200) coins.push(createCoin(x * S, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.59;
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(3000 * S, 480, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.59;
      return [
        createEnemy(800 * S, 510, 'goomba'),
        createEnemy(1400 * S, 510, 'koopa'),
        createEnemy(2700 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.59;
      return [
        createDeco(400 * S, 510, 'cactus'),
        createDeco(2000 * S, 510, 'rock'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 10620, y: 530 },
    timeBonus: 140,
  },
  {
    id: 9, name: "Scorpion Sands", width: 20140, height: 600, biome: 'desert',
    platforms: (() => {
      const S = 0.53;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 550, 800 * S, 40, 'sand'));
      plats.push(createPlat(1200 * S, 550, 600 * S, 40, 'sand'));
      plats.push(createPlat(2000 * S, 550, 500 * S, 40, 'sandstone'));
      plats.push(...gapWithPlatforms(2600 * S, 550, 450 * S, 4));
      plats.push(createPlat(3300 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(...pipeSection(4500 * S, 550, 4));
      // Helper
      plats.push(createPlat(5700 * S, 500, 100, 20, 'platform_easy'));
      plats.push(createPlat(6000 * S, 550, 1200 * S, 40, 'sand'));
      plats.push(createPlat(7500 * S, 550, 600 * S, 40, 'sand'));
      return plats;
    })(),
    movingPlatforms: [
      createMovingPlat(1400, 480, 150, 24, 'platform_medium', 'horizontal', 180, 22),
    ],
    coins: (() => {
      const S = 0.53;
      const coins: any[] = [];
      for (let x = 300; x < 2400; x += 200) coins.push(createCoin(x * S, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.53;
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(3500 * S, 480, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.53;
      return [
        createEnemy(800 * S, 510, 'goomba'),
        createEnemy(1400 * S, 510, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.53;
      return [
        createDeco(400 * S, 510, 'cactus'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 4240, y: 530 },
    timeBonus: 160,
  },
  {
    id: 10, name: "Tomb Raider", width: 20160, height: 650, biome: 'desert',
    platforms: (() => {
      const S = 0.48;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 800 * S, 40, 'sand'));
      plats.push(createPlat(1200 * S, 600, 600 * S, 40, 'sand'));
      plats.push(createPlat(2000 * S, 600, 500 * S, 40, 'sandstone'));
      plats.push(...gapWithPlatforms(2600 * S, 600, 500 * S, 4));
      plats.push(createPlat(3400 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(...pipeSection(4600 * S, 600, 5));
      // Helper
      plats.push(createPlat(5900 * S, 550, 100, 20, 'platform_easy'));
      plats.push(createPlat(6200 * S, 600, 1400 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.48;
      const coins: any[] = [];
      for (let x = 300; x < 2200; x += 200) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.48;
      return [
        createQB(500 * S, 586, 'mushroom'),
        createQB(3000 * S, 586, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.48;
      return [
        createEnemy(800 * S, 560, 'goomba'),
        createEnemy(1300 * S, 560, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.48;
      return [
        createDeco(400 * S, 560, 'skull'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 3840, y: 580 },
    timeBonus: 180,
  },
  {
    id: 11, name: "Quicksand Canyon", width: 19780, height: 650, biome: 'desert',
    platforms: (() => {
      const S = 0.43;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 800 * S, 40, 'sand'));
      plats.push(createPlat(1200 * S, 600, 600 * S, 40, 'sand'));
      plats.push(createPlat(2000 * S, 600, 500 * S, 40, 'sandstone'));
      plats.push(...gapWithPlatforms(2600 * S, 600, 500 * S, 4));
      plats.push(createPlat(3400 * S, 600, 1200 * S, 40, 'sand'));
      plats.push(...pipeSection(4800 * S, 600, 5));
      // Helper
      plats.push(createPlat(6100 * S, 550, 100, 20, 'platform_easy'));
      plats.push(createPlat(6400 * S, 600, 1400 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.43;
      const coins: any[] = [];
      for (let x = 300; x < 2400; x += 200) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.43;
      return [
        createQB(500 * S, 586, 'mushroom'),
        createQB(3000 * S, 586, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.43;
      return [
        createEnemy(800 * S, 560, 'goomba'),
        createEnemy(1400 * S, 560, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.43;
      return [
        createDeco(400 * S, 560, 'pyramid'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 3440, y: 580 },
    timeBonus: 200,
  },
  {
    id: 12, name: "Pharaoh's Tomb", width: 20000, height: 650, biome: 'desert',
    platforms: (() => {
      const S = 0.4;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(createPlat(1400 * S, 600, 800 * S, 40, 'sand'));
      plats.push(createPlat(2400 * S, 600, 600 * S, 40, 'sandstone'));
      plats.push(...gapWithPlatforms(3200 * S, 600, 600 * S, 5));
      plats.push(createPlat(4100 * S, 600, 1400 * S, 40, 'sand'));
      plats.push(...pipeSection(5700 * S, 600, 6));
      plats.push(createPlat(7100 * S, 550, 100, 20, 'platform_easy'));
      plats.push(createPlat(7400 * S, 600, 1600 * S, 40, 'sand'));
      return plats;
    })(),
    movingPlatforms: [
      createMovingPlat(1300, 520, 150, 24, 'platform_medium', 'horizontal', 200, 20),
    ],
    coins: (() => {
      const S = 0.4;
      const coins: any[] = [];
      for (let x = 300; x < 2400; x += 200) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.4;
      return [
        createQB(500 * S, 600, 'mushroom'),
        createQB(3500 * S, 600, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.4;
      return [
        createEnemy(800 * S, 560, 'goomba'),
        createEnemy(1600 * S, 560, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.4;
      return [
        createDeco(400 * S, 560, 'skull'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 3600, y: 580 },
    timeBonus: 220,
  },
];