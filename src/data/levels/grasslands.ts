// Grasslands World - 6 Super Mario-style Side-Scrolling Levels (IDs 1-6)
// Long horizontal levels with ground sections, gaps, pipes, and vertical passages

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco } from './helpers';

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
    const px = startX + 300 + i * 350;
    const ph = 64;
    plats.push(createPlat(px, y, 64, ph, 'pipe'));
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
      plats.push(...pipeSection(4600 * S, 550, 4));
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
      plats.push(createPlat(13000 * S, 550, 1200 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(14400 * S, 550, 400 * S, 3));
      plats.push(createPlat(15100 * S, 550, 800 * S, 40, 'grass'));
      plats.push(...pipeSection(15900 * S, 550, 3));
      plats.push(createPlat(17500 * S, 550, 1000 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(18700 * S, 550, 350 * S, 2));
      plats.push(createPlat(19300 * S, 550, 600 * S, 40, 'grass'));
      plats.push(createPlat(20200 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(20500 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(20800 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(21100 * S, 240, 120, 28, 'platform_hard'));
      plats.push(createPlat(21400 * S, 180, 150, 40, 'grass'));
      plats.push(createPlat(21700 * S, 240, 120, 28, 'platform_hard'));
      plats.push(createPlat(22000 * S, 320, 120, 28, 'platform_medium'));
      plats.push(createPlat(22300 * S, 400, 120, 28, 'platform_easy'));
      plats.push(createPlat(22600 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(22900 * S, 550, 600 * S, 40, 'grass'));
      plats.push(createPlat(24200 * S, 550, 800 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(25200 * S, 550, 400 * S, 3));
      plats.push(createPlat(25900 * S, 550, 1000 * S, 40, 'grass'));
      plats.push(...pipeSection(27100 * S, 550, 3));
      plats.push(createPlat(28500 * S, 550, 1500 * S, 40, 'grass'));
      return plats;
    })(),
    coins: (() => {
      const coins: any[] = [];
      for (let x = 300; x < 2500; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 3100; x < 4500; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 6200; x < 7300; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 8000; x < 8800; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(9000 * S, 420), createCoin(9300 * S, 340), createCoin(9600 * S, 260), createCoin(9900 * S, 180));
      coins.push(createCoin(10300 * S, 260), createCoin(10600 * S, 340), createCoin(10900 * S, 420));
      for (let x = 11200; x < 11800; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 13000; x < 14200; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(14500 * S, 380), createCoin(14800 * S, 320), createCoin(15100 * S, 350));
      for (let x = 15900; x < 17000; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 17500; x < 18500; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(18800 * S, 380), createCoin(19100 * S, 320));
      coins.push(createCoin(20200 * S, 420), createCoin(20500 * S, 340), createCoin(20800 * S, 260), createCoin(21100 * S, 180), createCoin(21400 * S, 120));
      coins.push(createCoin(21700 * S, 180), createCoin(22000 * S, 260), createCoin(22300 * S, 340), createCoin(22600 * S, 420));
      for (let x = 22900; x < 23500; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 24200; x < 25000; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(25300 * S, 380), createCoin(25600 * S, 320));
      for (let x = 25900; x < 26900; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 28500; x < 29500; x += 100) coins.push(createCoin(x * S, 500));
      return coins;
    })(),
    questionBlocks: [
      createQB(1500 * S, 480, 'mushroom'),
      createQB(3500 * S, 480, 'coin'),
      createQB(5000 * S, 480, 'mushroom'),
      createQB(6800 * S, 480, 'flower'),
      createQB(8500 * S, 480, 'star'),
      createQB(10000 * S, 170, 'mushroom'),
      createQB(11500 * S, 480, 'coin'),
      createQB(13500 * S, 480, 'flower'),
      createQB(15200 * S, 480, 'mushroom'),
      createQB(16200 * S, 480, 'star'),
      createQB(18000 * S, 480, 'coin'),
      createQB(19400 * S, 480, 'mushroom'),
      createQB(21500 * S, 110, 'flower'),
      createQB(23000 * S, 480, 'coin'),
      createQB(24500 * S, 480, 'star'),
      createQB(26000 * S, 480, 'mushroom'),
      createQB(27200 * S, 480, 'flower'),
      createQB(29000 * S, 480, 'star'),
    ],
    enemies: [
      createEnemy(500 * S, 510, 'goomba'),
      createEnemy(900 * S, 510, 'robot'),
      createEnemy(1200 * S, 510, 'goomba'),
      createEnemy(1500 * S, 510, 'crab'),
      createEnemy(1900 * S, 510, 'koopa'),
      createEnemy(2400 * S, 510, 'spiny'),
      createEnemy(3200 * S, 510, 'goomba'),
      createEnemy(3600 * S, 510, 'robot'),
      createEnemy(3800 * S, 510, 'koopa'),
      createEnemy(4650 * S, 480, 'piranha'),
      createEnemy(5000 * S, 480, 'piranha'),
      createEnemy(5350 * S, 480, 'piranha'),
      createEnemy(5700 * S, 480, 'piranha'),
      createEnemy(6500 * S, 510, 'goomba'),
      createEnemy(6900 * S, 510, 'crab'),
      createEnemy(7200 * S, 510, 'koopa'),
      createEnemy(8000 * S, 510, 'goomba'),
      createEnemy(8500 * S, 510, 'robot'),
      createEnemy(9500 * S, 510, 'spiny'),
      createEnemy(11300 * S, 510, 'goomba'),
      createEnemy(12000 * S, 510, 'crab'),
      createEnemy(12500 * S, 510, 'koopa'),
      createEnemy(13300 * S, 510, 'goomba'),
      createEnemy(14000 * S, 510, 'robot'),
      createEnemy(14500 * S, 510, 'koopa'),
      createEnemy(15300 * S, 510, 'goomba'),
      createEnemy(15800 * S, 510, 'spiny'),
      createEnemy(16300 * S, 510, 'koopa'),
      createEnemy(17800 * S, 510, 'goomba'),
      createEnemy(18300 * S, 510, 'robot'),
      createEnemy(18600 * S, 510, 'goomba'),
      createEnemy(19500 * S, 510, 'koopa'),
    ],
    decorations: [
      createDeco(300 * S, 510, 'tree'), createDeco(800 * S, 510, 'bush'), createDeco(1500 * S, 510, 'tree'),
      createDeco(2200 * S, 510, 'bush'), createDeco(3200 * S, 510, 'tree'), createDeco(4000 * S, 510, 'bush'),
      createDeco(5000 * S, 510, 'tree'), createDeco(6000 * S, 510, 'bush'), createDeco(7000 * S, 510, 'tree'),
      createDeco(8500 * S, 510, 'bush'), createDeco(10000 * S, 510, 'tree'), createDeco(12000 * S, 510, 'bush'),
      createDeco(14000 * S, 510, 'tree'), createDeco(16000 * S, 510, 'bush'), createDeco(18000 * S, 510, 'tree'),
      createDeco(20000 * S, 510, 'bush'), createDeco(22000 * S, 510, 'tree'), createDeco(24000 * S, 510, 'bush'),
      createDeco(26000 * S, 510, 'tree'), createDeco(28000 * S, 510, 'bush'),
    ],
    playerStart: { x: 150, y: 500 },
    goal: { x: 19500, y: 530 },
    timeBonus: 120,
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
      plats.push(createPlat(5400 * S, 600, 1200 * S, 40, 'grass'));
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
      plats.push(createPlat(12200 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(12500 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(12800 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(13100 * S, 280, 150, 40, 'grass'));
      plats.push(createPlat(13500 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(13800 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(14100 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(14400 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(...pipeSection(15400 * S, 600, 3));
      plats.push(createPlat(17200 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(18900 * S, 600, 450 * S, 3));
      plats.push(createPlat(19700 * S, 600, 800 * S, 40, 'grass'));
      plats.push(createPlat(20800 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(21100 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(21400 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(21700 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(22000 * S, 200, 150, 40, 'grass'));
      plats.push(createPlat(22400 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(22700 * S, 360, 120, 28, 'platform_medium'));
      plats.push(createPlat(23000 * S, 440, 120, 28, 'platform_easy'));
      plats.push(createPlat(23300 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(23600 * S, 600, 800 * S, 40, 'grass'));
      plats.push(createPlat(25000 * S, 600, 1200 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(26400 * S, 600, 400 * S, 3));
      plats.push(createPlat(27100 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(...pipeSection(28100 * S, 600, 4));
      plats.push(createPlat(30000 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(31700 * S, 600, 400 * S, 3));
      plats.push(createPlat(32400 * S, 600, 800 * S, 40, 'grass'));
      plats.push(createPlat(33600 * S, 600, 1400 * S, 40, 'grass'));
      return plats;
    })(),
    coins: (() => {
      const coins: any[] = [];
      for (let x = 300; x < 2600; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 2700; x < 3600; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 5400; x < 6600; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(7000 * S, 460), createCoin(7300 * S, 380), createCoin(7600 * S, 300), createCoin(7900 * S, 220));
      coins.push(createCoin(8300 * S, 300), createCoin(8600 * S, 380), createCoin(8900 * S, 460));
      for (let x = 9200; x < 10000; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(10300 * S, 400), createCoin(10600 * S, 320));
      for (let x = 10900; x < 11900; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(12200 * S, 460), createCoin(12500 * S, 380), createCoin(12800 * S, 300), createCoin(13100 * S, 220));
      coins.push(createCoin(13500 * S, 300), createCoin(13800 * S, 380), createCoin(14100 * S, 460));
      for (let x = 14400; x < 15400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 17200; x < 18700; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 19700; x < 20500; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(20800 * S, 460), createCoin(21100 * S, 380), createCoin(21400 * S, 300), createCoin(21700 * S, 220), createCoin(22000 * S, 140));
      for (let x = 23600; x < 24400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 25000; x < 26200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 27100; x < 28100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 30000; x < 31500; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 32400; x < 33200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 33600; x < 35000; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: [
      createQB(800 * S, 530, 'mushroom'), createQB(2000 * S, 400, 'coin'), createQB(2800 * S, 530, 'mushroom'),
      createQB(3700 * S, 530, 'flower'), createQB(5600 * S, 530, 'star'), createQB(6600 * S, 530, 'mushroom'),
      createQB(8000 * S, 210, 'flower'), createQB(9500 * S, 530, 'coin'), createQB(10400 * S, 350, 'mushroom'),
      createQB(11200 * S, 530, 'star'), createQB(12000 * S, 530, 'mushroom'), createQB(13200 * S, 210, 'flower'),
      createQB(14600 * S, 530, 'coin'), createQB(15500 * S, 530, 'mushroom'), createQB(17500 * S, 530, 'star'),
      createQB(19000 * S, 530, 'flower'), createQB(20000 * S, 530, 'mushroom'), createQB(22100 * S, 130, 'coin'),
      createQB(23700 * S, 530, 'star'), createQB(25200 * S, 530, 'mushroom'), createQB(26500 * S, 530, 'flower'),
      createQB(27300 * S, 530, 'coin'), createQB(28200 * S, 530, 'mushroom'), createQB(30300 * S, 530, 'star'),
    ],
    enemies: [
      createEnemy(600 * S, 560, 'goomba'), createEnemy(1000 * S, 560, 'robot'), createEnemy(1400 * S, 560, 'goomba'),
      createEnemy(1800 * S, 560, 'crab'), createEnemy(2000 * S, 560, 'koopa'), createEnemy(2400 * S, 560, 'spiny'),
      createEnemy(2800 * S, 560, 'goomba'), createEnemy(3200 * S, 560, 'robot'), createEnemy(3400 * S, 560, 'koopa'),
      createEnemy(3700 * S, 520, 'piranha'), createEnemy(4050 * S, 520, 'piranha'), createEnemy(4400 * S, 520, 'piranha'),
      createEnemy(4750 * S, 520, 'piranha'), createEnemy(5700 * S, 560, 'goomba'), createEnemy(6100 * S, 560, 'crab'),
      createEnemy(6500 * S, 560, 'koopa'), createEnemy(7200 * S, 560, 'goomba'), createEnemy(8000 * S, 560, 'goomba'),
      createEnemy(8600 * S, 560, 'robot'), createEnemy(9500 * S, 560, 'koopa'), createEnemy(10200 * S, 560, 'spiny'),
      createEnemy(11200 * S, 560, 'goomba'), createEnemy(12000 * S, 560, 'crab'), createEnemy(12300 * S, 560, 'koopa'),
      createEnemy(13200 * S, 560, 'goomba'), createEnemy(14000 * S, 560, 'robot'), createEnemy(14600 * S, 560, 'koopa'),
      createEnemy(15500 * S, 560, 'goomba'), createEnemy(16500 * S, 560, 'spiny'), createEnemy(17500 * S, 560, 'goomba'),
      createEnemy(18500 * S, 560, 'koopa'), createEnemy(19700 * S, 560, 'goomba'), createEnemy(21000 * S, 560, 'koopa'),
      createEnemy(22100 * S, 560, 'goomba'), createEnemy(23700 * S, 560, 'koopa'),
    ],
    decorations: (() => {
      const decos: any[] = [];
      for (let x = 300; x < 35000 * S; x += 1000) {
        decos.push(createDeco(x, 560, x % 2000 === 300 ? 'tree' : 'bush'));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 21000 - 500, y: 558 },
    timeBonus: 140,
  },
  {
    id: 3, name: "Grasslands Mountains", width: 20000, height: 800, biome: 'grasslands',
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 700, 800 * S, 40, 'grass'));
      plats.push(createPlat(1200 * S, 700, 600 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(1900 * S, 700, 400 * S, 3));
      plats.push(createPlat(2600 * S, 700, 1000 * S, 40, 'grass'));
      plats.push(...pipeSection(3600 * S, 700, 5));
      plats.push(createPlat(5600 * S, 700, 1200 * S, 40, 'grass'));
      plats.push(createPlat(7200 * S, 620, 120, 28, 'platform_easy'));
      plats.push(createPlat(7500 * S, 540, 120, 28, 'platform_medium'));
      plats.push(createPlat(7800 * S, 460, 120, 28, 'platform_hard'));
      plats.push(createPlat(8100 * S, 380, 120, 28, 'platform_hard'));
      plats.push(createPlat(8400 * S, 300, 150, 40, 'grass'));
      plats.push(createPlat(8800 * S, 380, 120, 28, 'platform_hard'));
      plats.push(createPlat(9100 * S, 460, 120, 28, 'platform_medium'));
      plats.push(createPlat(9400 * S, 540, 120, 28, 'platform_easy'));
      plats.push(createPlat(9700 * S, 620, 120, 28, 'platform_easy'));
      plats.push(createPlat(10000 * S, 700, 800 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(11000 * S, 700, 450 * S, 3));
      plats.push(createPlat(11800 * S, 700, 1000 * S, 40, 'grass'));
      plats.push(createPlat(13200 * S, 620, 120, 28, 'platform_easy'));
      plats.push(createPlat(13500 * S, 540, 120, 28, 'platform_medium'));
      plats.push(createPlat(13800 * S, 460, 120, 28, 'platform_hard'));
      plats.push(createPlat(14100 * S, 380, 120, 28, 'platform_hard'));
      plats.push(createPlat(14400 * S, 300, 150, 40, 'grass'));
      plats.push(createPlat(14800 * S, 380, 120, 28, 'platform_hard'));
      plats.push(createPlat(15100 * S, 460, 120, 28, 'platform_medium'));
      plats.push(createPlat(15400 * S, 540, 120, 28, 'platform_easy'));
      plats.push(createPlat(15700 * S, 620, 120, 28, 'platform_easy'));
      plats.push(createPlat(16000 * S, 700, 1000 * S, 40, 'grass'));
      plats.push(...pipeSection(17000 * S, 700, 4));
      plats.push(createPlat(19500 * S, 700, 1500 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(21200 * S, 700, 500 * S, 4));
      plats.push(createPlat(22100 * S, 700, 800 * S, 40, 'grass'));
      plats.push(createPlat(23200 * S, 620, 120, 28, 'platform_easy'));
      plats.push(createPlat(23500 * S, 540, 120, 28, 'platform_medium'));
      plats.push(createPlat(23800 * S, 460, 120, 28, 'platform_hard'));
      plats.push(createPlat(24100 * S, 380, 120, 28, 'platform_hard'));
      plats.push(createPlat(24400 * S, 300, 120, 28, 'platform_hard'));
      plats.push(createPlat(24700 * S, 220, 150, 40, 'grass'));
      plats.push(createPlat(25100 * S, 300, 120, 28, 'platform_hard'));
      plats.push(createPlat(25400 * S, 380, 120, 28, 'platform_medium'));
      plats.push(createPlat(25700 * S, 460, 120, 28, 'platform_easy'));
      plats.push(createPlat(26000 * S, 540, 120, 28, 'platform_easy'));
      plats.push(createPlat(26300 * S, 620, 120, 28, 'platform_easy'));
      plats.push(createPlat(26600 * S, 700, 800 * S, 40, 'grass'));
      plats.push(createPlat(28100 * S, 700, 1200 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(29500 * S, 700, 450 * S, 3));
      plats.push(createPlat(30300 * S, 700, 1000 * S, 40, 'grass'));
      plats.push(...pipeSection(31300 * S, 700, 4));
      plats.push(createPlat(33000 * S, 700, 1500 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(34700 * S, 700, 500 * S, 4));
      plats.push(createPlat(35600 * S, 700, 1000 * S, 40, 'grass'));
      plats.push(createPlat(37100 * S, 700, 1200 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(38500 * S, 700, 450 * S, 3));
      plats.push(createPlat(39300 * S, 700, 700 * S, 40, 'grass'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      const coins: any[] = [];
      for (let x = 300; x < 2600; x += 100) coins.push(createCoin(x * S, 650));
      for (let x = 2700; x < 3600; x += 100) coins.push(createCoin(x * S, 650));
      for (let x = 5600; x < 6800; x += 100) coins.push(createCoin(x * S, 650));
      coins.push(createCoin(7200 * S, 560), createCoin(7500 * S, 480), createCoin(7800 * S, 400), createCoin(8100 * S, 320), createCoin(8400 * S, 240));
      coins.push(createCoin(8800 * S, 320), createCoin(9100 * S, 400), createCoin(9400 * S, 480), createCoin(9700 * S, 560));
      for (let x = 10000; x < 10800; x += 100) coins.push(createCoin(x * S, 650));
      for (let x = 11800; x < 12800; x += 100) coins.push(createCoin(x * S, 650));
      coins.push(createCoin(13200 * S, 560), createCoin(13500 * S, 480), createCoin(13800 * S, 400), createCoin(14100 * S, 320), createCoin(14400 * S, 240));
      coins.push(createCoin(14800 * S, 320), createCoin(15100 * S, 400), createCoin(15400 * S, 480), createCoin(15700 * S, 560));
      for (let x = 16000; x < 17000; x += 100) coins.push(createCoin(x * S, 650));
      for (let x = 19500; x < 21000; x += 100) coins.push(createCoin(x * S, 650));
      for (let x = 22100; x < 22900; x += 100) coins.push(createCoin(x * S, 650));
      coins.push(createCoin(23200 * S, 560), createCoin(23500 * S, 480), createCoin(23800 * S, 400), createCoin(24100 * S, 320), createCoin(24400 * S, 240), createCoin(24700 * S, 160));
      coins.push(createCoin(25100 * S, 240), createCoin(25400 * S, 320), createCoin(25700 * S, 400), createCoin(26000 * S, 480), createCoin(26300 * S, 560));
      for (let x = 26600; x < 27400; x += 100) coins.push(createCoin(x * S, 650));
      for (let x = 28100; x < 29300; x += 100) coins.push(createCoin(x * S, 650));
      for (let x = 30300; x < 31300; x += 100) coins.push(createCoin(x * S, 650));
      for (let x = 33000; x < 34500; x += 100) coins.push(createCoin(x * S, 650));
      for (let x = 35600; x < 36600; x += 100) coins.push(createCoin(x * S, 650));
      for (let x = 37100; x < 38300; x += 100) coins.push(createCoin(x * S, 650));
      for (let x = 39300; x < 40000; x += 100) coins.push(createCoin(x * S, 650));
      return coins;
    })(),
    questionBlocks: [
      createQB(800 * 0.5, 630, 'mushroom'), createQB(2000 * 0.5, 500, 'coin'), createQB(2800 * 0.5, 630, 'mushroom'),
      createQB(3700 * 0.5, 630, 'flower'), createQB(5800 * 0.5, 630, 'star'), createQB(6800 * 0.5, 630, 'mushroom'),
      createQB(8500 * 0.5, 230, 'flower'), createQB(10200 * 0.5, 630, 'coin'), createQB(11200 * 0.5, 430, 'mushroom'),
      createQB(12000 * 0.5, 630, 'star'), createQB(13000 * 0.5, 630, 'mushroom'), createQB(14500 * 0.5, 230, 'flower'),
      createQB(16200 * 0.5, 630, 'coin'), createQB(17200 * 0.5, 630, 'mushroom'), createQB(19700 * 0.5, 630, 'star'),
      createQB(21300 * 0.5, 630, 'flower'), createQB(22300 * 0.5, 630, 'mushroom'), createQB(24800 * 0.5, 140, 'coin'),
      createQB(26800 * 0.5, 630, 'star'), createQB(28300 * 0.5, 630, 'mushroom'), createQB(29600 * 0.5, 630, 'flower'),
      createQB(30500 * 0.5, 630, 'coin'), createQB(31400 * 0.5, 630, 'mushroom'), createQB(33200 * 0.5, 630, 'star'),
    ],
    enemies: [
      createEnemy(600 * 0.5, 660, 'goomba'), createEnemy(900 * 0.5, 660, 'robot'), createEnemy(1400 * 0.5, 660, 'goomba'),
      createEnemy(1800 * 0.5, 660, 'crab'), createEnemy(2100 * 0.5, 660, 'koopa'), createEnemy(2500 * 0.5, 660, 'spiny'),
      createEnemy(2900 * 0.5, 660, 'goomba'), createEnemy(3600 * 0.5, 620, 'piranha'), createEnemy(3950 * 0.5, 620, 'piranha'),
      createEnemy(4300 * 0.5, 620, 'piranha'), createEnemy(4650 * 0.5, 620, 'piranha'), createEnemy(5000 * 0.5, 620, 'piranha'),
      createEnemy(5900 * 0.5, 660, 'goomba'), createEnemy(6300 * 0.5, 660, 'robot'), createEnemy(6700 * 0.5, 660, 'koopa'),
      createEnemy(7100 * 0.5, 660, 'crab'), createEnemy(7500 * 0.5, 660, 'goomba'), createEnemy(8500 * 0.5, 660, 'koopa'),
      createEnemy(9100 * 0.5, 660, 'spiny'), createEnemy(10200 * 0.5, 660, 'goomba'), createEnemy(12000 * 0.5, 660, 'koopa'),
      createEnemy(13000 * 0.5, 660, 'goomba'), createEnemy(13500 * 0.5, 660, 'robot'), createEnemy(14500 * 0.5, 660, 'koopa'),
      createEnemy(16200 * 0.5, 660, 'goomba'), createEnemy(17200 * 0.5, 660, 'koopa'), createEnemy(18200 * 0.5, 660, 'crab'),
      createEnemy(19700 * 0.5, 660, 'goomba'), createEnemy(20700 * 0.5, 660, 'koopa'), createEnemy(22300 * 0.5, 660, 'goomba'),
      createEnemy(23500 * 0.5, 660, 'koopa'), createEnemy(24800 * 0.5, 660, 'goomba'), createEnemy(25800 * 0.5, 660, 'spiny'),
      createEnemy(26800 * 0.5, 660, 'koopa'), createEnemy(28300 * 0.5, 660, 'goomba'), createEnemy(29600 * 0.5, 660, 'koopa'),
      createEnemy(31400 * 0.5, 660, 'goomba'), createEnemy(33200 * 0.5, 660, 'koopa'), createEnemy(34900 * 0.5, 660, 'goomba'),
      createEnemy(35800 * 0.5, 660, 'koopa'), createEnemy(37300 * 0.5, 660, 'goomba'), createEnemy(38600 * 0.5, 660, 'robot'),
      createEnemy(39500 * 0.5, 660, 'goomba'),
    ],
    decorations: (() => {
      const S = 0.5;
      const decos: any[] = [];
      for (let x = 300; x < 40000 * S; x += 1200 * S) {
        decos.push(createDeco(x, 660, x % (2400 * S) === 300 * S ? 'tree' : 'bush'));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 650 },
    goal: { x: 19500, y: 658 },
    timeBonus: 160,
  },
  {
    id: 4, name: "Grasslands Valley", width: 20250, height: 700, biome: 'grasslands',
    platforms: (() => {
      const S = 0.45;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(createPlat(1500 * S, 600, 800 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(2400 * S, 600, 500 * S, 3));
      plats.push(createPlat(3200 * S, 600, 1200 * S, 40, 'grass'));
      plats.push(...pipeSection(4400 * S, 600, 5));
      plats.push(createPlat(6200 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(createPlat(8100 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(8400 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(8700 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(9000 * S, 280, 150, 40, 'grass'));
      plats.push(createPlat(9400 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(9700 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(10000 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(10300 * S, 600, 800 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(11300 * S, 600, 450 * S, 3));
      plats.push(createPlat(12100 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(createPlat(13500 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(13800 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(14100 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(14400 * S, 280, 150, 40, 'grass'));
      plats.push(createPlat(14800 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(15100 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(15400 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(15700 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(...pipeSection(16700 * S, 600, 4));
      plats.push(createPlat(19300 * S, 600, 2000 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(21500 * S, 600, 500 * S, 4));
      plats.push(createPlat(22500 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(createPlat(23900 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(24200 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(24500 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(24800 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(25100 * S, 200, 150, 40, 'grass'));
      plats.push(createPlat(25500 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(25800 * S, 360, 120, 28, 'platform_medium'));
      plats.push(createPlat(26100 * S, 440, 120, 28, 'platform_easy'));
      plats.push(createPlat(26400 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(26700 * S, 600, 800 * S, 40, 'grass'));
      plats.push(createPlat(28200 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(29900 * S, 600, 500 * S, 4));
      plats.push(createPlat(30800 * S, 600, 1200 * S, 40, 'grass'));
      plats.push(...pipeSection(32000 * S, 600, 5));
      plats.push(createPlat(34500 * S, 600, 2000 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(36700 * S, 600, 500 * S, 4));
      plats.push(createPlat(37700 * S, 600, 1200 * S, 40, 'grass'));
      plats.push(createPlat(39400 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(41100 * S, 600, 500 * S, 4));
      plats.push(createPlat(42000 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(createPlat(43500 * S, 600, 1500 * S, 40, 'grass'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.45;
      const coins: any[] = [];
      for (let x = 300; x < 3200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 3300; x < 4400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 6300; x < 7800; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(8100 * S, 460), createCoin(8400 * S, 380), createCoin(8700 * S, 300), createCoin(9000 * S, 220));
      coins.push(createCoin(9400 * S, 300), createCoin(9700 * S, 380), createCoin(10000 * S, 460));
      for (let x = 10300; x < 11100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 12100; x < 13100; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(13500 * S, 460), createCoin(13800 * S, 380), createCoin(14100 * S, 300), createCoin(14400 * S, 220));
      coins.push(createCoin(14800 * S, 300), createCoin(15100 * S, 380), createCoin(15400 * S, 460));
      for (let x = 15700; x < 16700; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 19300; x < 21300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 22500; x < 23500; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(23900 * S, 460), createCoin(24200 * S, 380), createCoin(24500 * S, 300), createCoin(24800 * S, 220), createCoin(25100 * S, 140));
      coins.push(createCoin(25500 * S, 220), createCoin(25800 * S, 300), createCoin(26100 * S, 380), createCoin(26400 * S, 460));
      for (let x = 26700; x < 27500; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 28200; x < 29700; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 30800; x < 32000; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 34500; x < 36500; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 37700; x < 38900; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 39400; x < 40900; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 42000; x < 43000; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 43500; x < 45000; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: [
      createQB(1000 * 0.45, 530, 'mushroom'), createQB(2500 * 0.45, 450, 'coin'), createQB(3500 * 0.45, 530, 'mushroom'),
      createQB(4500 * 0.45, 530, 'flower'), createQB(6500 * 0.45, 530, 'star'), createQB(7800 * 0.45, 530, 'mushroom'),
      createQB(9100 * 0.45, 210, 'flower'), createQB(10500 * 0.45, 530, 'coin'), createQB(11600 * 0.45, 400, 'mushroom'),
      createQB(12500 * 0.45, 530, 'star'), createQB(13500 * 0.45, 574, 'mushroom'), createQB(14500 * 0.45, 210, 'flower'),
      createQB(16000 * 0.45, 530, 'coin'), createQB(16900 * 0.45, 530, 'mushroom'), createQB(20000 * 0.45, 530, 'star'),
      createQB(22000 * 0.45, 549, 'flower'), createQB(23000 * 0.45, 530, 'mushroom'), createQB(25200 * 0.45, 120, 'coin'),
      createQB(27000 * 0.45, 530, 'star'), createQB(28500 * 0.45, 530, 'mushroom'), createQB(30100 * 0.45, 574, 'flower'),
      createQB(31000 * 0.45, 530, 'coin'), createQB(32100 * 0.45, 530, 'mushroom'), createQB(35000 * 0.45, 530, 'star'),
      createQB(36800 * 0.45, 530, 'flower'), createQB(38000 * 0.45, 530, 'mushroom'), createQB(39600 * 0.45, 530, 'coin'),
      createQB(41200 * 0.45, 530, 'star'), createQB(42200 * 0.45, 530, 'mushroom'), createQB(43700 * 0.45, 530, 'flower'),
    ],
    enemies: [
      createEnemy(700 * 0.45, 560, 'goomba'), createEnemy(1000 * 0.45, 560, 'robot'), createEnemy(1700 * 0.45, 560, 'goomba'),
      createEnemy(2100 * 0.45, 560, 'crab'), createEnemy(2500 * 0.45, 560, 'koopa'), createEnemy(3200 * 0.45, 560, 'spiny'),
      createEnemy(3500 * 0.45, 560, 'goomba'), createEnemy(4500 * 0.45, 520, 'piranha'), createEnemy(4850 * 0.45, 520, 'piranha'),
      createEnemy(5200 * 0.45, 520, 'piranha'), createEnemy(5550 * 0.45, 520, 'piranha'), createEnemy(5900 * 0.45, 520, 'piranha'),
      createEnemy(6600 * 0.45, 560, 'goomba'), createEnemy(7200 * 0.45, 560, 'robot'), createEnemy(7500 * 0.45, 560, 'koopa'),
      createEnemy(8000 * 0.45, 560, 'crab'), createEnemy(8500 * 0.45, 560, 'goomba'), createEnemy(9500 * 0.45, 560, 'spiny'),
      createEnemy(10500 * 0.45, 560, 'koopa'), createEnemy(12500 * 0.45, 560, 'goomba'), createEnemy(13500 * 0.45, 560, 'koopa'),
      createEnemy(14500 * 0.45, 560, 'robot'), createEnemy(15000 * 0.45, 560, 'goomba'), createEnemy(16000 * 0.45, 560, 'koopa'),
      createEnemy(16900 * 0.45, 560, 'goomba'), createEnemy(20000 * 0.45, 560, 'koopa'), createEnemy(21000 * 0.45, 560, 'spiny'),
      createEnemy(22000 * 0.45, 560, 'goomba'), createEnemy(23500 * 0.45, 560, 'koopa'), createEnemy(25200 * 0.45, 560, 'goomba'),
      createEnemy(26200 * 0.45, 560, 'crab'), createEnemy(27000 * 0.45, 560, 'koopa'), createEnemy(28500 * 0.45, 560, 'goomba'),
      createEnemy(30100 * 0.45, 560, 'koopa'), createEnemy(31100 * 0.45, 560, 'robot'), createEnemy(32100 * 0.45, 560, 'goomba'),
      createEnemy(35000 * 0.45, 560, 'koopa'), createEnemy(36800 * 0.45, 560, 'goomba'), createEnemy(38000 * 0.45, 560, 'koopa'),
      createEnemy(39600 * 0.45, 560, 'goomba'), createEnemy(41200 * 0.45, 560, 'koopa'), createEnemy(42200 * 0.45, 560, 'spiny'),
      createEnemy(43700 * 0.45, 560, 'goomba'),
    ],
    decorations: (() => {
      const S = 0.45;
      const decos: any[] = [];
      for (let x = 300; x < 45000 * S; x += 1500 * S) {
        decos.push(createDeco(x, 560, x % (3000 * S) === 300 * S ? 'tree' : 'bush'));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19750, y: 558 },
    timeBonus: 180,
  },
  {
    id: 5, name: "Grasslands Fortress", width: 20160, height: 700, biome: 'grasslands',
    platforms: (() => {
      const S = 0.42;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1200 * S, 40, 'grass'));
      plats.push(createPlat(1700 * S, 600, 800 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(2600 * S, 600, 500 * S, 4));
      plats.push(createPlat(3500 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(...pipeSection(5000 * S, 600, 6));
      plats.push(createPlat(7200 * S, 600, 1800 * S, 40, 'grass'));
      plats.push(createPlat(9400 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(9700 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(10000 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(10300 * S, 280, 150, 40, 'grass'));
      plats.push(createPlat(10700 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(11000 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(11300 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(11600 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(12800 * S, 600, 500 * S, 4));
      plats.push(createPlat(13700 * S, 600, 1200 * S, 40, 'grass'));
      plats.push(createPlat(15300 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(15600 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(15900 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(16200 * S, 280, 150, 40, 'grass'));
      plats.push(createPlat(16600 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(16900 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(17200 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(17500 * S, 600, 1200 * S, 40, 'grass'));
      plats.push(...pipeSection(18700 * S, 600, 5));
      plats.push(createPlat(21500 * S, 600, 2500 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(24200 * S, 600, 600 * S, 4));
      plats.push(createPlat(25500 * S, 600, 1200 * S, 40, 'grass'));
      plats.push(createPlat(27100 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(27400 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(27700 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(28000 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(28300 * S, 200, 150, 40, 'grass'));
      plats.push(createPlat(28700 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(29000 * S, 360, 120, 28, 'platform_medium'));
      plats.push(createPlat(29300 * S, 440, 120, 28, 'platform_easy'));
      plats.push(createPlat(29600 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(29900 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(createPlat(31600 * S, 600, 2000 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(33800 * S, 600, 600 * S, 5));
      plats.push(createPlat(35100 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(...pipeSection(36600 * S, 600, 5));
      plats.push(createPlat(39500 * S, 600, 2500 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(42200 * S, 600, 600 * S, 5));
      plats.push(createPlat(43500 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(createPlat(45500 * S, 600, 2500 * S, 40, 'grass'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.42;
      const coins: any[] = [];
      for (let x = 300; x < 3500; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 3700; x < 5000; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 7200; x < 9100; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(9400 * S, 460), createCoin(9700 * S, 380), createCoin(10000 * S, 300), createCoin(10300 * S, 220));
      coins.push(createCoin(10700 * S, 300), createCoin(11000 * S, 380), createCoin(11300 * S, 460));
      for (let x = 11600; x < 12600; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 13700; x < 14900; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(15300 * S, 460), createCoin(15600 * S, 380), createCoin(15900 * S, 300), createCoin(16200 * S, 220));
      coins.push(createCoin(16600 * S, 300), createCoin(16900 * S, 380), createCoin(17200 * S, 460));
      for (let x = 17500; x < 18700; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 21500; x < 24000; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 25500; x < 26700; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(27100 * S, 460), createCoin(27400 * S, 380), createCoin(27700 * S, 300), createCoin(28000 * S, 220), createCoin(28300 * S, 140));
      for (let x = 29900; x < 30900; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 31600; x < 33600; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 35100; x < 36600; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 39500; x < 42000; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 43500; x < 45000; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 45500; x < 48000; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: [
      createQB(1200 * 0.42, 530, 'mushroom'), createQB(2800 * 0.42, 500, 'coin'), createQB(4000 * 0.42, 530, 'mushroom'),
      createQB(5200 * 0.42, 530, 'flower'), createQB(7500 * 0.42, 530, 'star'), createQB(9000 * 0.42, 530, 'mushroom'),
      createQB(10400 * 0.42, 200, 'flower'), createQB(11800 * 0.42, 530, 'coin'), createQB(13100 * 0.42, 400, 'mushroom'),
      createQB(14100 * 0.42, 530, 'star'), createQB(15500 * 0.42, 530, 'mushroom'), createQB(16300 * 0.42, 200, 'flower'),
      createQB(17800 * 0.42, 530, 'coin'), createQB(18900 * 0.42, 530, 'mushroom'), createQB(22000 * 0.42, 530, 'star'),
      createQB(24400 * 0.42, 530, 'flower'), createQB(25800 * 0.42, 530, 'mushroom'), createQB(28400 * 0.42, 120, 'coin'),
      createQB(30200 * 0.42, 530, 'star'), createQB(32000 * 0.42, 530, 'mushroom'), createQB(34400 * 0.42, 530, 'flower'),
      createQB(35500 * 0.42, 530, 'coin'), createQB(36800 * 0.42, 530, 'mushroom'), createQB(39800 * 0.42, 530, 'star'),
      createQB(42400 * 0.42, 574, 'flower'), createQB(43800 * 0.42, 530, 'mushroom'), createQB(45800 * 0.42, 530, 'coin'),
    ],
    enemies: [
      createEnemy(800 * 0.42, 560, 'goomba'), createEnemy(1100 * 0.42, 560, 'robot'), createEnemy(2000 * 0.42, 560, 'goomba'),
      createEnemy(2400 * 0.42, 560, 'crab'), createEnemy(2900 * 0.42, 560, 'koopa'), createEnemy(3500 * 0.42, 560, 'spiny'),
      createEnemy(4000 * 0.42, 560, 'goomba'), createEnemy(5200 * 0.42, 520, 'piranha'), createEnemy(5550 * 0.42, 520, 'piranha'),
      createEnemy(5900 * 0.42, 520, 'piranha'), createEnemy(6250 * 0.42, 520, 'piranha'), createEnemy(6600 * 0.42, 520, 'piranha'),
      createEnemy(6950 * 0.42, 520, 'piranha'), createEnemy(7700 * 0.42, 560, 'goomba'), createEnemy(8200 * 0.42, 560, 'robot'),
      createEnemy(8800 * 0.42, 560, 'koopa'), createEnemy(9500 * 0.42, 560, 'crab'), createEnemy(10400 * 0.42, 560, 'goomba'),
      createEnemy(11500 * 0.42, 560, 'spiny'), createEnemy(12000 * 0.42, 560, 'koopa'), createEnemy(14100 * 0.42, 560, 'goomba'),
      createEnemy(15500 * 0.42, 560, 'koopa'), createEnemy(16500 * 0.42, 560, 'robot'), createEnemy(16800 * 0.42, 560, 'goomba'),
      createEnemy(17800 * 0.42, 560, 'koopa'), createEnemy(18900 * 0.42, 560, 'goomba'), createEnemy(22000 * 0.42, 560, 'koopa'),
      createEnemy(23500 * 0.42, 560, 'spiny'), createEnemy(24500 * 0.42, 560, 'goomba'), createEnemy(26500 * 0.42, 560, 'koopa'),
      createEnemy(28400 * 0.42, 560, 'goomba'), createEnemy(29500 * 0.42, 560, 'crab'), createEnemy(30200 * 0.42, 560, 'koopa'),
      createEnemy(32000 * 0.42, 560, 'goomba'), createEnemy(34400 * 0.42, 560, 'koopa'), createEnemy(35500 * 0.42, 560, 'robot'),
      createEnemy(36800 * 0.42, 560, 'goomba'), createEnemy(39800 * 0.42, 560, 'koopa'), createEnemy(42400 * 0.42, 560, 'goomba'),
      createEnemy(43800 * 0.42, 560, 'koopa'), createEnemy(45800 * 0.42, 560, 'goomba'),
    ],
    decorations: (() => {
      const S = 0.42;
      const decos: any[] = [];
      for (let x = 300; x < 48000 * S; x += 1800 * S) {
        decos.push(createDeco(x, 560, x % (3600 * S) === 300 * S ? 'tree' : 'bush'));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19660, y: 558 },
    timeBonus: 200,
  },
  {
    id: 6, name: "Grasslands Finale", width: 20000, height: 700, biome: 'grasslands',
    platforms: (() => {
      const S = 0.4;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(createPlat(2000 * S, 600, 1000 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(3100 * S, 600, 600 * S, 4));
      plats.push(createPlat(4100 * S, 600, 1800 * S, 40, 'grass'));
      plats.push(...pipeSection(5900 * S, 600, 6));
      plats.push(createPlat(8200 * S, 600, 2000 * S, 40, 'grass'));
      plats.push(createPlat(10600 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(10900 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(11200 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(11500 * S, 280, 150, 40, 'grass'));
      plats.push(createPlat(11900 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(12200 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(12500 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(12800 * S, 600, 1200 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(14200 * S, 600, 600 * S, 4));
      plats.push(createPlat(15200 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(createPlat(17100 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(17400 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(17700 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(18000 * S, 280, 150, 40, 'grass'));
      plats.push(createPlat(18400 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(18700 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(19000 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(19300 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(...pipeSection(20800 * S, 600, 5));
      plats.push(createPlat(23800 * S, 600, 3000 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(27000 * S, 600, 700 * S, 5));
      plats.push(createPlat(28200 * S, 600, 1500 * S, 40, 'grass'));
      plats.push(createPlat(30100 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(30400 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(30700 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(31000 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(31300 * S, 200, 150, 40, 'grass'));
      plats.push(createPlat(31700 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(32000 * S, 360, 120, 28, 'platform_medium'));
      plats.push(createPlat(32300 * S, 440, 120, 28, 'platform_easy'));
      plats.push(createPlat(32600 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(32900 * S, 600, 1200 * S, 40, 'grass'));
      plats.push(createPlat(34800 * S, 600, 2500 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(37500 * S, 600, 700 * S, 5));
      plats.push(createPlat(38800 * S, 600, 1800 * S, 40, 'grass'));
      plats.push(...pipeSection(40600 * S, 600, 6));
      plats.push(createPlat(43800 * S, 600, 3000 * S, 40, 'grass'));
      plats.push(...gapWithPlatforms(47000 * S, 600, 700 * S, 5));
      plats.push(createPlat(48400 * S, 600, 1600 * S, 40, 'grass'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.4;
      const coins: any[] = [];
      for (let x = 300; x < 4100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 4300; x < 5900; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 8300; x < 10300; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(10600 * S, 460), createCoin(10900 * S, 380), createCoin(11200 * S, 300), createCoin(11500 * S, 220));
      coins.push(createCoin(11900 * S, 300), createCoin(12200 * S, 380), createCoin(12500 * S, 460));
      for (let x = 12800; x < 14000; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 15200; x < 16700; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(17100 * S, 460), createCoin(17400 * S, 380), createCoin(17700 * S, 300), createCoin(18000 * S, 220));
      coins.push(createCoin(18400 * S, 300), createCoin(18700 * S, 380), createCoin(19000 * S, 460));
      for (let x = 19300; x < 20800; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 23800; x < 26800; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 28200; x < 29700; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(30100 * S, 460), createCoin(30400 * S, 380), createCoin(30700 * S, 300), createCoin(31000 * S, 220), createCoin(31300 * S, 140));
      for (let x = 32900; x < 34100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 34800; x < 37300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 38800; x < 40600; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 43800; x < 46800; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 48400; x < 50000; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: [
      createQB(1500 * 0.4, 530, 'mushroom'), createQB(3300 * 0.4, 500, 'coin'), createQB(4600 * 0.4, 530, 'mushroom'),
      createQB(6100 * 0.4, 530, 'flower'), createQB(8500 * 0.4, 530, 'star'), createQB(10000 * 0.4, 530, 'mushroom'),
      createQB(11600 * 0.4, 200, 'flower'), createQB(13000 * 0.4, 530, 'coin'), createQB(14600 * 0.4, 400, 'mushroom'),
      createQB(15600 * 0.4, 530, 'star'), createQB(16800 * 0.4, 530, 'mushroom'), createQB(18100 * 0.4, 200, 'flower'),
      createQB(19500 * 0.4, 530, 'coin'), createQB(21000 * 0.4, 530, 'mushroom'), createQB(24000 * 0.4, 530, 'star'),
      createQB(26600 * 0.4, 530, 'flower'), createQB(28500 * 0.4, 530, 'mushroom'), createQB(31400 * 0.4, 120, 'coin'),
      createQB(33200 * 0.4, 530, 'star'), createQB(35100 * 0.4, 530, 'mushroom'), createQB(37700 * 0.4, 530, 'flower'),
      createQB(39100 * 0.4, 530, 'coin'), createQB(40700 * 0.4, 530, 'mushroom'), createQB(44200 * 0.4, 530, 'star'),
      createQB(47200 * 0.4, 530, 'flower'), createQB(48700 * 0.4, 530, 'mushroom'),
    ],
    enemies: [
      createEnemy(1000 * 0.4, 560, 'goomba'), createEnemy(1500 * 0.4, 560, 'robot'), createEnemy(2300 * 0.4, 560, 'goomba'),
      createEnemy(2800 * 0.4, 560, 'crab'), createEnemy(3300 * 0.4, 560, 'koopa'), createEnemy(4000 * 0.4, 560, 'spiny'),
      createEnemy(4600 * 0.4, 560, 'goomba'), createEnemy(6100 * 0.4, 520, 'piranha'), createEnemy(6450 * 0.4, 520, 'piranha'),
      createEnemy(6800 * 0.4, 520, 'piranha'), createEnemy(7150 * 0.4, 520, 'piranha'), createEnemy(7500 * 0.4, 520, 'piranha'),
      createEnemy(7850 * 0.4, 520, 'piranha'), createEnemy(8600 * 0.4, 560, 'goomba'), createEnemy(9400 * 0.4, 560, 'robot'),
      createEnemy(10000 * 0.4, 560, 'koopa'), createEnemy(10800 * 0.4, 560, 'crab'), createEnemy(11600 * 0.4, 560, 'goomba'),
      createEnemy(12500 * 0.4, 560, 'spiny'), createEnemy(13000 * 0.4, 560, 'koopa'), createEnemy(15600 * 0.4, 560, 'goomba'),
      createEnemy(16500 * 0.4, 560, 'robot'), createEnemy(17100 * 0.4, 560, 'koopa'), createEnemy(18600 * 0.4, 560, 'goomba'),
      createEnemy(19500 * 0.4, 560, 'koopa'), createEnemy(21000 * 0.4, 560, 'goomba'), createEnemy(24000 * 0.4, 560, 'koopa'),
      createEnemy(25500 * 0.4, 560, 'spiny'), createEnemy(27000 * 0.4, 560, 'goomba'), createEnemy(28500 * 0.4, 560, 'koopa'),
      createEnemy(31400 * 0.4, 560, 'goomba'), createEnemy(32500 * 0.4, 560, 'crab'), createEnemy(33200 * 0.4, 560, 'koopa'),
      createEnemy(35100 * 0.4, 560, 'goomba'), createEnemy(37700 * 0.4, 560, 'koopa'), createEnemy(38800 * 0.4, 560, 'robot'),
      createEnemy(39100 * 0.4, 560, 'goomba'), createEnemy(40700 * 0.4, 560, 'koopa'), createEnemy(44200 * 0.4, 560, 'goomba'),
      createEnemy(47200 * 0.4, 560, 'koopa'), createEnemy(48700 * 0.4, 560, 'goomba'),
    ],
    decorations: (() => {
      const S = 0.4;
      const decos: any[] = [];
      for (let x = 300; x < 50000 * S; x += 2000 * S) {
        decos.push(createDeco(x, 560, x % (4000 * S) === 300 * S ? 'tree' : 'bush'));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19500, y: 558 },
    timeBonus: 220,
  },
];