// Desert World - 6 Super Mario-style Side-Scrolling Levels (IDs 7-12)
// Long horizontal desert levels with sand, pyramids, pipes, and vertical passages

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco } from './helpers';

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
      plats.push(...pipeSection(4600 * S, 550, 4));
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
      plats.push(createPlat(12500 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(13700 * S, 550, 400 * S, 3));
      plats.push(createPlat(14400 * S, 550, 800 * S, 40, 'sand'));
      plats.push(...pipeSection(15300 * S, 550, 3));
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
      plats.push(...pipeSection(26500 * S, 550, 3));
      plats.push(createPlat(28000 * S, 550, 2000 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.67;
      const coins: any[] = [];
      for (let x = 300; x < 2500; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 3100; x < 4500; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 6200; x < 7200; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 7500; x < 8200; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(9200 * S, 420), createCoin(9500 * S, 340), createCoin(9800 * S, 260), createCoin(10100 * S, 180));
      coins.push(createCoin(10400 * S, 260), createCoin(10700 * S, 340), createCoin(11000 * S, 420));
      for (let x = 11300; x < 11900; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 12500; x < 13500; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(13800 * S, 380), createCoin(14100 * S, 320));
      for (let x = 14400; x < 15200; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 16800; x < 17800; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(18100 * S, 380), createCoin(18400 * S, 320));
      coins.push(createCoin(19600 * S, 420), createCoin(19900 * S, 340), createCoin(20200 * S, 260), createCoin(20500 * S, 180), createCoin(20800 * S, 120));
      coins.push(createCoin(21100 * S, 180), createCoin(21400 * S, 260), createCoin(21700 * S, 340), createCoin(22000 * S, 420));
      for (let x = 22300; x < 22900; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 23600; x < 24400; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(24700 * S, 380), createCoin(25000 * S, 320));
      for (let x = 25300; x < 26300; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 28000; x < 29500; x += 100) coins.push(createCoin(x * S, 500));
      return coins;
    })(),
    questionBlocks: [
      createQB(1500 * 0.67, 480, 'mushroom'),
      createQB(3500 * 0.67, 480, 'coin'),
      createQB(5000 * 0.67, 480, 'mushroom'),
      createQB(6800 * 0.67, 480, 'flower'),
      createQB(8000 * 0.67, 480, 'star'),
      createQB(10200 * 0.67, 170, 'mushroom'),
      createQB(11800 * 0.67, 480, 'coin'),
      createQB(13000 * 0.67, 480, 'flower'),
      createQB(14500 * 0.67, 480, 'mushroom'),
      createQB(15400 * 0.67, 480, 'star'),
      createQB(17200 * 0.67, 480, 'coin'),
      createQB(18800 * 0.67, 480, 'mushroom'),
      createQB(20900 * 0.67, 110, 'flower'),
      createQB(22400 * 0.67, 480, 'coin'),
      createQB(24000 * 0.67, 480, 'star'),
      createQB(25500 * 0.67, 480, 'mushroom'),
      createQB(26600 * 0.67, 480, 'flower'),
      createQB(28500 * 0.67, 480, 'star'),
    ],
    enemies: [
      createEnemy(500 * 0.67, 510, 'goomba'), createEnemy(800 * 0.67, 510, 'robot'), createEnemy(1200 * 0.67, 510, 'goomba'),
      createEnemy(1600 * 0.67, 510, 'crab'), createEnemy(1900 * 0.67, 510, 'koopa'), createEnemy(2400 * 0.67, 510, 'spiny'),
      createEnemy(3200 * 0.67, 510, 'goomba'), createEnemy(3800 * 0.67, 510, 'koopa'), createEnemy(4200 * 0.67, 510, 'robot'),
      createEnemy(4650 * 0.67, 480, 'piranha'), createEnemy(5000 * 0.67, 480, 'piranha'), createEnemy(5350 * 0.67, 480, 'piranha'),
      createEnemy(5700 * 0.67, 480, 'piranha'), createEnemy(6500 * 0.67, 510, 'goomba'), createEnemy(7000 * 0.67, 510, 'crab'),
      createEnemy(7200 * 0.67, 510, 'koopa'), createEnemy(8500 * 0.67, 510, 'goomba'), createEnemy(9500 * 0.67, 510, 'spiny'),
      createEnemy(11400 * 0.67, 510, 'goomba'), createEnemy(12600 * 0.67, 510, 'koopa'), createEnemy(13400 * 0.67, 510, 'goomba'),
      createEnemy(14000 * 0.67, 510, 'robot'), createEnemy(14600 * 0.67, 510, 'koopa'), createEnemy(15400 * 0.67, 510, 'goomba'),
      createEnemy(16400 * 0.67, 510, 'koopa'), createEnemy(16900 * 0.67, 510, 'goomba'), createEnemy(18100 * 0.67, 510, 'goomba'),
      createEnemy(18700 * 0.67, 510, 'koopa'), createEnemy(19500 * 0.67, 510, 'spiny'), createEnemy(20900 * 0.67, 510, 'goomba'),
      createEnemy(22400 * 0.67, 510, 'koopa'), createEnemy(24000 * 0.67, 510, 'goomba'), createEnemy(25600 * 0.67, 510, 'koopa'),
      createEnemy(26700 * 0.67, 510, 'goomba'), createEnemy(28300 * 0.67, 510, 'koopa'),
    ],
    decorations: [
      createDeco(300 * 0.67, 510, 'cactus'), createDeco(800 * 0.67, 510, 'rock'), createDeco(1500 * 0.67, 510, 'cactus'),
      createDeco(2200 * 0.67, 510, 'skull'), createDeco(3200 * 0.67, 510, 'cactus'), createDeco(4000 * 0.67, 510, 'rock'),
      createDeco(5000 * 0.67, 510, 'cactus'), createDeco(6000 * 0.67, 510, 'pyramid'), createDeco(7000 * 0.67, 510, 'cactus'),
      createDeco(8500 * 0.67, 510, 'rock'), createDeco(10000 * 0.67, 510, 'cactus'), createDeco(12000 * 0.67, 510, 'skull'),
      createDeco(14000 * 0.67, 510, 'cactus'), createDeco(16000 * 0.67, 510, 'rock'), createDeco(18000 * 0.67, 510, 'pyramid'),
      createDeco(20000 * 0.67, 510, 'cactus'), createDeco(22000 * 0.67, 510, 'rock'), createDeco(24000 * 0.67, 510, 'cactus'),
      createDeco(26000 * 0.67, 510, 'skull'), createDeco(28000 * 0.67, 510, 'cactus'),
    ],
    playerStart: { x: 150, y: 500 },
    goal: { x: 19600, y: 508 },
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
      plats.push(createPlat(16700 * S, 550, 1200 * S, 40, 'sand'));
      plats.push(createPlat(18300 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(18600 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(18900 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(19200 * S, 240, 120, 28, 'platform_hard'));
      plats.push(createPlat(19500 * S, 180, 150, 40, 'sand'));
      plats.push(createPlat(19800 * S, 240, 120, 28, 'platform_hard'));
      plats.push(createPlat(20100 * S, 320, 120, 28, 'platform_medium'));
      plats.push(createPlat(20400 * S, 400, 120, 28, 'platform_easy'));
      plats.push(createPlat(20700 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(21000 * S, 550, 600 * S, 40, 'sand'));
      plats.push(createPlat(22200 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(23400 * S, 550, 400 * S, 3));
      plats.push(createPlat(24100 * S, 550, 800 * S, 40, 'sand'));
      plats.push(...pipeSection(25100 * S, 550, 4));
      plats.push(createPlat(27000 * S, 550, 1200 * S, 40, 'sand'));
      plats.push(createPlat(28600 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(29800 * S, 550, 400 * S, 3));
      plats.push(createPlat(30500 * S, 550, 1500 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.59;
      const coins: any[] = [];
      for (let x = 300; x < 2800; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 4000; x < 4800; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 6600; x < 7800; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(9100 * S, 420), createCoin(9400 * S, 340), createCoin(9700 * S, 260), createCoin(10000 * S, 180));
      coins.push(createCoin(10300 * S, 260), createCoin(10600 * S, 340), createCoin(10900 * S, 420));
      for (let x = 11200; x < 12000; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(12300 * S, 380), createCoin(12600 * S, 320));
      for (let x = 12900; x < 13900; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 16700; x < 17900; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(18300 * S, 420), createCoin(18600 * S, 340), createCoin(18900 * S, 260), createCoin(19200 * S, 180), createCoin(19500 * S, 120));
      coins.push(createCoin(19800 * S, 180), createCoin(20100 * S, 260), createCoin(20400 * S, 340), createCoin(20700 * S, 420));
      for (let x = 21000; x < 21600; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 22200; x < 23200; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(23500 * S, 380), createCoin(23800 * S, 320));
      for (let x = 24100; x < 24900; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 27000; x < 28200; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 28600; x < 29600; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(29900 * S, 380), createCoin(30200 * S, 320));
      for (let x = 30500; x < 31500; x += 100) coins.push(createCoin(x * S, 500));
      return coins;
    })(),
    questionBlocks: [
      createQB(1400 * 0.59, 480, 'mushroom'),
      createQB(3200 * 0.59, 480, 'coin'),
      createQB(4500 * 0.59, 480, 'mushroom'),
      createQB(7000 * 0.59, 480, 'flower'),
      createQB(8600 * 0.59, 480, 'star'),
      createQB(10100 * 0.59, 170, 'mushroom'),
      createQB(11500 * 0.59, 480, 'coin'),
      createQB(13200 * 0.59, 480, 'flower'),
      createQB(14500 * 0.59, 480, 'mushroom'),
      createQB(15300 * 0.59, 480, 'star'),
      createQB(17200 * 0.59, 480, 'coin'),
      createQB(18900 * 0.59, 480, 'mushroom'),
      createQB(19600 * 0.59, 110, 'flower'),
      createQB(21100 * 0.59, 480, 'coin'),
      createQB(22600 * 0.59, 480, 'star'),
      createQB(24300 * 0.59, 480, 'mushroom'),
      createQB(25300 * 0.59, 480, 'flower'),
      createQB(27400 * 0.59, 480, 'star'),
      createQB(29000 * 0.59, 480, 'mushroom'),
      createQB(30800 * 0.59, 480, 'flower'),
    ],
    enemies: [
      createEnemy(500 * 0.59, 510, 'goomba'), createEnemy(800 * 0.59, 510, 'robot'), createEnemy(1300 * 0.59, 510, 'goomba'),
      createEnemy(1700 * 0.59, 510, 'crab'), createEnemy(2000 * 0.59, 510, 'koopa'), createEnemy(2500 * 0.59, 510, 'spiny'),
      createEnemy(2800 * 0.59, 510, 'goomba'), createEnemy(3500 * 0.59, 510, 'koopa'), createEnemy(4200 * 0.59, 510, 'robot'),
      createEnemy(4350 * 0.59, 480, 'piranha'), createEnemy(4700 * 0.59, 480, 'piranha'), createEnemy(5050 * 0.59, 480, 'piranha'),
      createEnemy(5400 * 0.59, 480, 'piranha'), createEnemy(6900 * 0.59, 510, 'goomba'), createEnemy(7400 * 0.59, 510, 'crab'),
      createEnemy(7600 * 0.59, 510, 'koopa'), createEnemy(9000 * 0.59, 510, 'goomba'), createEnemy(9800 * 0.59, 510, 'spiny'),
      createEnemy(11300 * 0.59, 510, 'goomba'), createEnemy(12400 * 0.59, 510, 'koopa'), createEnemy(13400 * 0.59, 510, 'goomba'),
      createEnemy(14000 * 0.59, 510, 'robot'), createEnemy(14600 * 0.59, 510, 'koopa'), createEnemy(15400 * 0.59, 510, 'goomba'),
      createEnemy(16400 * 0.59, 510, 'koopa'), createEnemy(17200 * 0.59, 510, 'goomba'), createEnemy(18300 * 0.59, 510, 'goomba'),
      createEnemy(18900 * 0.59, 510, 'koopa'), createEnemy(19600 * 0.59, 510, 'goomba'), createEnemy(21100 * 0.59, 510, 'koopa'),
      createEnemy(22600 * 0.59, 510, 'goomba'), createEnemy(24400 * 0.59, 510, 'koopa'), createEnemy(25500 * 0.59, 510, 'goomba'),
      createEnemy(27500 * 0.59, 510, 'koopa'), createEnemy(29100 * 0.59, 510, 'goomba'), createEnemy(31000 * 0.59, 510, 'koopa'),
    ],
    decorations: [
      createDeco(300 * 0.59, 510, 'cactus'), createDeco(900 * 0.59, 510, 'pyramid'), createDeco(1600 * 0.59, 510, 'cactus'),
      createDeco(2400 * 0.59, 510, 'rock'), createDeco(3400 * 0.59, 510, 'cactus'), createDeco(4400 * 0.59, 510, 'pyramid'),
      createDeco(5600 * 0.59, 510, 'cactus'), createDeco(6800 * 0.59, 510, 'skull'), createDeco(7800 * 0.59, 510, 'cactus'),
      createDeco(9000 * 0.59, 510, 'rock'), createDeco(10400 * 0.59, 510, 'cactus'), createDeco(12000 * 0.59, 510, 'pyramid'),
      createDeco(13800 * 0.59, 510, 'cactus'), createDeco(15400 * 0.59, 510, 'skull'), createDeco(17200 * 0.59, 510, 'cactus'),
      createDeco(19000 * 0.59, 510, 'rock'), createDeco(20800 * 0.59, 510, 'cactus'), createDeco(22600 * 0.59, 510, 'pyramid'),
      createDeco(24400 * 0.59, 510, 'cactus'), createDeco(26000 * 0.59, 510, 'skull'), createDeco(28000 * 0.59, 510, 'cactus'),
    ],
    playerStart: { x: 150, y: 500 },
    goal: { x: 18938, y: 530 },
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
      plats.push(createPlat(6000 * S, 550, 1200 * S, 40, 'sand'));
      plats.push(createPlat(7500 * S, 550, 600 * S, 40, 'sand'));
      plats.push(createPlat(8400 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(8700 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(9000 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(9300 * S, 240, 150, 40, 'sand'));
      plats.push(createPlat(9600 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(9900 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(10200 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(10500 * S, 550, 800 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(11500 * S, 550, 400 * S, 3));
      plats.push(createPlat(12200 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(createPlat(13500 * S, 550, 800 * S, 40, 'sandstone'));
      plats.push(...pipeSection(14500 * S, 550, 4));
      plats.push(createPlat(16200 * S, 550, 1400 * S, 40, 'sand'));
      plats.push(createPlat(18000 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(18300 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(18600 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(18900 * S, 240, 120, 28, 'platform_hard'));
      plats.push(createPlat(19200 * S, 180, 150, 40, 'sand'));
      plats.push(createPlat(19500 * S, 240, 120, 28, 'platform_hard'));
      plats.push(createPlat(19800 * S, 320, 120, 28, 'platform_medium'));
      plats.push(createPlat(20100 * S, 400, 120, 28, 'platform_easy'));
      plats.push(createPlat(20400 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(20700 * S, 550, 600 * S, 40, 'sand'));
      plats.push(createPlat(21900 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(23100 * S, 550, 450 * S, 3));
      plats.push(createPlat(23800 * S, 550, 800 * S, 40, 'sand'));
      plats.push(...pipeSection(24800 * S, 550, 4));
      plats.push(createPlat(26700 * S, 550, 1200 * S, 40, 'sand'));
      plats.push(createPlat(28300 * S, 550, 800 * S, 40, 'sand'));
      plats.push(createPlat(29500 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(29800 * S, 400, 120, 28, 'platform_medium'));
      plats.push(createPlat(30100 * S, 320, 120, 28, 'platform_hard'));
      plats.push(createPlat(30400 * S, 240, 120, 28, 'platform_hard'));
      plats.push(createPlat(30700 * S, 180, 150, 40, 'sand'));
      plats.push(createPlat(31000 * S, 240, 120, 28, 'platform_hard'));
      plats.push(createPlat(31300 * S, 320, 120, 28, 'platform_medium'));
      plats.push(createPlat(31600 * S, 400, 120, 28, 'platform_easy'));
      plats.push(createPlat(31900 * S, 480, 120, 28, 'platform_easy'));
      plats.push(createPlat(32200 * S, 550, 800 * S, 40, 'sand'));
      plats.push(createPlat(33500 * S, 550, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(34700 * S, 550, 400 * S, 3));
      plats.push(createPlat(35400 * S, 550, 2000 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.53;
      const coins: any[] = [];
      for (let x = 300; x < 3000; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 6000; x < 7200; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(8400 * S, 420), createCoin(8700 * S, 340), createCoin(9000 * S, 260), createCoin(9300 * S, 180));
      coins.push(createCoin(9600 * S, 260), createCoin(9900 * S, 340), createCoin(10200 * S, 420));
      for (let x = 10500; x < 11300; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(11600 * S, 380), createCoin(11900 * S, 320));
      for (let x = 12200; x < 13200; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 16200; x < 17600; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(18000 * S, 420), createCoin(18300 * S, 340), createCoin(18600 * S, 260), createCoin(18900 * S, 180), createCoin(19200 * S, 120));
      coins.push(createCoin(19500 * S, 180), createCoin(19800 * S, 260), createCoin(20100 * S, 340), createCoin(20400 * S, 420));
      for (let x = 20700; x < 21300; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 21900; x < 22900; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(23200 * S, 380), createCoin(23500 * S, 320));
      for (let x = 23800; x < 24600; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 26700; x < 27900; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 28300; x < 29100; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(29500 * S, 420), createCoin(29800 * S, 340), createCoin(30100 * S, 260), createCoin(30400 * S, 180), createCoin(30700 * S, 120));
      coins.push(createCoin(31000 * S, 180), createCoin(31300 * S, 260), createCoin(31600 * S, 340), createCoin(31900 * S, 420));
      for (let x = 32200; x < 33000; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 33500; x < 34500; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(34800 * S, 380), createCoin(35100 * S, 320));
      for (let x = 35400; x < 36900; x += 100) coins.push(createCoin(x * S, 500));
      return coins;
    })(),
    questionBlocks: [
      createQB(1400 * 0.53, 480, 'mushroom'),
      createQB(2800 * 0.53, 480, 'coin'),
      createQB(3800 * 0.53, 480, 'mushroom'),
      createQB(5000 * 0.53, 480, 'flower'),
      createQB(6500 * 0.53, 480, 'star'),
      createQB(9400 * 0.53, 170, 'mushroom'),
      createQB(10800 * 0.53, 480, 'coin'),
      createQB(12500 * 0.53, 480, 'flower'),
      createQB(13800 * 0.53, 480, 'mushroom'),
      createQB(14600 * 0.53, 480, 'star'),
      createQB(16800 * 0.53, 480, 'coin'),
      createQB(18400 * 0.53, 480, 'mushroom'),
      createQB(19300 * 0.53, 110, 'flower'),
      createQB(21000 * 0.53, 480, 'coin'),
      createQB(22200 * 0.53, 480, 'star'),
      createQB(24000 * 0.53, 480, 'mushroom'),
      createQB(25000 * 0.53, 480, 'flower'),
      createQB(27100 * 0.53, 480, 'star'),
      createQB(28700 * 0.53, 480, 'mushroom'),
      createQB(30200 * 0.53, 480, 'flower'),
      createQB(30800 * 0.53, 110, 'star'),
      createQB(32300 * 0.53, 480, 'coin'),
      createQB(33800 * 0.53, 480, 'mushroom'),
      createQB(35500 * 0.53, 480, 'flower'),
    ],
    enemies: [
      createEnemy(500 * 0.53, 510, 'goomba'), createEnemy(800 * 0.53, 510, 'robot'), createEnemy(1300 * 0.53, 510, 'goomba'),
      createEnemy(1800 * 0.53, 510, 'crab'), createEnemy(2100 * 0.53, 510, 'koopa'), createEnemy(2600 * 0.53, 510, 'spiny'),
      createEnemy(2900 * 0.53, 510, 'goomba'), createEnemy(3500 * 0.53, 510, 'koopa'), createEnemy(4200 * 0.53, 510, 'robot'),
      createEnemy(4550 * 0.53, 480, 'piranha'), createEnemy(4900 * 0.53, 480, 'piranha'), createEnemy(5250 * 0.53, 480, 'piranha'),
      createEnemy(5600 * 0.53, 480, 'piranha'), createEnemy(6400 * 0.53, 510, 'goomba'), createEnemy(7000 * 0.53, 510, 'crab'),
      createEnemy(7100 * 0.53, 510, 'koopa'), createEnemy(7900 * 0.53, 510, 'spiny'), createEnemy(9400 * 0.53, 510, 'goomba'),
      createEnemy(10600 * 0.53, 510, 'koopa'), createEnemy(11800 * 0.53, 510, 'goomba'), createEnemy(12800 * 0.53, 510, 'koopa'),
      createEnemy(13600 * 0.53, 510, 'spiny'), createEnemy(14600 * 0.53, 510, 'goomba'), createEnemy(15600 * 0.53, 510, 'koopa'),
      createEnemy(16800 * 0.53, 510, 'goomba'), createEnemy(17800 * 0.53, 510, 'spiny'), createEnemy(18600 * 0.53, 510, 'koopa'),
      createEnemy(19300 * 0.53, 510, 'goomba'), createEnemy(20800 * 0.53, 510, 'koopa'), createEnemy(22000 * 0.53, 510, 'goomba'),
      createEnemy(23000 * 0.53, 510, 'spiny'), createEnemy(23900 * 0.53, 510, 'koopa'), createEnemy(25100 * 0.53, 510, 'goomba'),
      createEnemy(27200 * 0.53, 510, 'koopa'), createEnemy(28800 * 0.53, 510, 'spiny'), createEnemy(29500 * 0.53, 510, 'goomba'),
      createEnemy(30800 * 0.53, 510, 'koopa'), createEnemy(32300 * 0.53, 510, 'goomba'), createEnemy(33900 * 0.53, 510, 'spiny'),
      createEnemy(35600 * 0.53, 510, 'goomba'),
    ],
    decorations: [
      createDeco(300 * 0.53, 510, 'cactus'), createDeco(1000 * 0.53, 510, 'rock'), createDeco(1800 * 0.53, 510, 'cactus'),
      createDeco(2600 * 0.53, 510, 'pyramid'), createDeco(3600 * 0.53, 510, 'cactus'), createDeco(4800 * 0.53, 510, 'skull'),
      createDeco(5800 * 0.53, 510, 'cactus'), createDeco(7000 * 0.53, 510, 'rock'), createDeco(8200 * 0.53, 510, 'cactus'),
      createDeco(9600 * 0.53, 510, 'pyramid'), createDeco(11000 * 0.53, 510, 'cactus'), createDeco(12800 * 0.53, 510, 'skull'),
      createDeco(14400 * 0.53, 510, 'cactus'), createDeco(16200 * 0.53, 510, 'rock'), createDeco(18000 * 0.53, 510, 'cactus'),
      createDeco(19800 * 0.53, 510, 'pyramid'), createDeco(21600 * 0.53, 510, 'cactus'), createDeco(23400 * 0.53, 510, 'skull'),
      createDeco(25200 * 0.53, 510, 'cactus'), createDeco(27000 * 0.53, 510, 'rock'), createDeco(28800 * 0.53, 510, 'cactus'),
      createDeco(30600 * 0.53, 510, 'pyramid'), createDeco(32400 * 0.53, 510, 'cactus'), createDeco(34200 * 0.53, 510, 'skull'),
      createDeco(36000 * 0.53, 510, 'cactus'),
    ],
    playerStart: { x: 150, y: 500 },
    goal: { x: 19640, y: 508 },
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
      plats.push(createPlat(6200 * S, 600, 1400 * S, 40, 'sand'));
      plats.push(createPlat(8000 * S, 600, 600 * S, 40, 'sand'));
      plats.push(createPlat(8900 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(9200 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(9500 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(9800 * S, 290, 150, 40, 'sand'));
      plats.push(createPlat(10100 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(10400 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(10700 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(11000 * S, 600, 800 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(12000 * S, 600, 450 * S, 3));
      plats.push(createPlat(12700 * S, 600, 1200 * S, 40, 'sand'));
      plats.push(createPlat(14200 * S, 600, 800 * S, 40, 'sandstone'));
      plats.push(...pipeSection(15200 * S, 600, 4));
      plats.push(createPlat(17000 * S, 600, 1400 * S, 40, 'sand'));
      plats.push(createPlat(18800 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(19100 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(19400 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(19700 * S, 290, 120, 28, 'platform_hard'));
      plats.push(createPlat(20000 * S, 230, 150, 40, 'sand'));
      plats.push(createPlat(20300 * S, 290, 120, 28, 'platform_hard'));
      plats.push(createPlat(20600 * S, 370, 120, 28, 'platform_medium'));
      plats.push(createPlat(20900 * S, 450, 120, 28, 'platform_easy'));
      plats.push(createPlat(21200 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(21500 * S, 600, 600 * S, 40, 'sand'));
      plats.push(createPlat(22700 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(23900 * S, 600, 450 * S, 4));
      plats.push(createPlat(24600 * S, 600, 800 * S, 40, 'sand'));
      plats.push(...pipeSection(25600 * S, 600, 5));
      plats.push(createPlat(27800 * S, 600, 1400 * S, 40, 'sand'));
      plats.push(createPlat(29600 * S, 600, 800 * S, 40, 'sand'));
      plats.push(createPlat(30800 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(31100 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(31400 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(31700 * S, 290, 120, 28, 'platform_hard'));
      plats.push(createPlat(32000 * S, 230, 150, 40, 'sand'));
      plats.push(createPlat(32300 * S, 290, 120, 28, 'platform_hard'));
      plats.push(createPlat(32600 * S, 370, 120, 28, 'platform_medium'));
      plats.push(createPlat(32900 * S, 450, 120, 28, 'platform_easy'));
      plats.push(createPlat(33200 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(33500 * S, 600, 800 * S, 40, 'sand'));
      plats.push(createPlat(34900 * S, 600, 1200 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(36300 * S, 600, 500 * S, 4));
      plats.push(createPlat(37100 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(...pipeSection(38300 * S, 600, 4));
      plats.push(createPlat(40000 * S, 600, 2000 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.48;
      const coins: any[] = [];
      for (let x = 300; x < 3200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 6200; x < 7600; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(8900 * S, 470), createCoin(9200 * S, 390), createCoin(9500 * S, 310), createCoin(9800 * S, 230));
      coins.push(createCoin(10100 * S, 310), createCoin(10400 * S, 390), createCoin(10700 * S, 470));
      for (let x = 11000; x < 11800; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(12100 * S, 420), createCoin(12400 * S, 360));
      for (let x = 12700; x < 13900; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 17000; x < 18400; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(18800 * S, 470), createCoin(19100 * S, 390), createCoin(19400 * S, 310), createCoin(19700 * S, 230), createCoin(20000 * S, 170));
      coins.push(createCoin(20300 * S, 230), createCoin(20600 * S, 310), createCoin(20900 * S, 390), createCoin(21200 * S, 470));
      for (let x = 21500; x < 22100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 22700; x < 23700; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(24000 * S, 420), createCoin(24300 * S, 360));
      for (let x = 24600; x < 25400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 27800; x < 29200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 29600; x < 30400; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(30800 * S, 470), createCoin(31100 * S, 390), createCoin(31400 * S, 310), createCoin(31700 * S, 230), createCoin(32000 * S, 170));
      coins.push(createCoin(32300 * S, 230), createCoin(32600 * S, 310), createCoin(32900 * S, 390), createCoin(33200 * S, 470));
      for (let x = 33500; x < 34300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 34900; x < 36100; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(36400 * S, 420), createCoin(36800 * S, 360));
      for (let x = 37100; x < 38100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 40000; x < 41500; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: [
      createQB(1500 * 0.48, 530, 'mushroom'),
      createQB(3000 * 0.48, 530, 'coin'),
      createQB(4000 * 0.48, 530, 'mushroom'),
      createQB(5200 * 0.48, 530, 'flower'),
      createQB(6800 * 0.48, 530, 'star'),
      createQB(9900 * 0.48, 220, 'mushroom'),
      createQB(11300 * 0.48, 530, 'coin'),
      createQB(13000 * 0.48, 530, 'flower'),
      createQB(14500 * 0.48, 530, 'mushroom'),
      createQB(15300 * 0.48, 530, 'star'),
      createQB(17500 * 0.48, 530, 'coin'),
      createQB(19100 * 0.48, 530, 'mushroom'),
      createQB(20100 * 0.48, 160, 'flower'),
      createQB(21600 * 0.48, 530, 'coin'),
      createQB(23100 * 0.48, 530, 'star'),
      createQB(24800 * 0.48, 530, 'mushroom'),
      createQB(25800 * 0.48, 530, 'flower'),
      createQB(28200 * 0.48, 530, 'star'),
      createQB(30000 * 0.48, 530, 'mushroom'),
      createQB(31500 * 0.48, 530, 'flower'),
      createQB(32100 * 0.48, 160, 'star'),
      createQB(33600 * 0.48, 530, 'coin'),
      createQB(35300 * 0.48, 530, 'mushroom'),
      createQB(37300 * 0.48, 530, 'flower'),
      createQB(38500 * 0.48, 530, 'star'),
      createQB(40500 * 0.48, 530, 'mushroom'),
    ],
    enemies: [
      createEnemy(500 * 0.48, 560, 'goomba'), createEnemy(800 * 0.48, 560, 'robot'), createEnemy(1300 * 0.48, 560, 'goomba'),
      createEnemy(1800 * 0.48, 560, 'crab'), createEnemy(2200 * 0.48, 560, 'koopa'), createEnemy(2800 * 0.48, 560, 'spiny'),
      createEnemy(3000 * 0.48, 560, 'goomba'), createEnemy(3600 * 0.48, 560, 'koopa'), createEnemy(4200 * 0.48, 560, 'robot'),
      createEnemy(4650 * 0.48, 530, 'piranha'), createEnemy(5000 * 0.48, 530, 'piranha'), createEnemy(5350 * 0.48, 530, 'piranha'),
      createEnemy(5700 * 0.48, 530, 'piranha'), createEnemy(6050 * 0.48, 530, 'piranha'), createEnemy(6600 * 0.48, 560, 'goomba'),
      createEnemy(7000 * 0.48, 560, 'crab'), createEnemy(7300 * 0.48, 560, 'koopa'), createEnemy(8100 * 0.48, 560, 'spiny'),
      createEnemy(9900 * 0.48, 560, 'goomba'), createEnemy(11100 * 0.48, 560, 'koopa'), createEnemy(12300 * 0.48, 560, 'goomba'),
      createEnemy(13300 * 0.48, 560, 'koopa'), createEnemy(14100 * 0.48, 560, 'spiny'), createEnemy(15100 * 0.48, 560, 'goomba'),
      createEnemy(16100 * 0.48, 560, 'koopa'), createEnemy(17300 * 0.48, 560, 'goomba'), createEnemy(18300 * 0.48, 560, 'spiny'),
      createEnemy(19100 * 0.48, 560, 'koopa'), createEnemy(20100 * 0.48, 560, 'goomba'), createEnemy(21600 * 0.48, 560, 'koopa'),
      createEnemy(22800 * 0.48, 560, 'goomba'), createEnemy(23800 * 0.48, 560, 'spiny'), createEnemy(24700 * 0.48, 560, 'koopa'),
      createEnemy(25900 * 0.48, 560, 'goomba'), createEnemy(28300 * 0.48, 560, 'koopa'), createEnemy(29700 * 0.48, 560, 'spiny'),
      createEnemy(30900 * 0.48, 560, 'goomba'), createEnemy(32100 * 0.48, 560, 'koopa'), createEnemy(33600 * 0.48, 560, 'goomba'),
      createEnemy(35000 * 0.48, 560, 'spiny'), createEnemy(36400 * 0.48, 560, 'goomba'), createEnemy(37400 * 0.48, 560, 'koopa'),
      createEnemy(38600 * 0.48, 560, 'spiny'), createEnemy(40600 * 0.48, 560, 'goomba'),
    ],
    decorations: [
      createDeco(300 * 0.48, 560, 'cactus'), createDeco(1000 * 0.48, 560, 'skull'), createDeco(1800 * 0.48, 560, 'cactus'),
      createDeco(2700 * 0.48, 560, 'pyramid'), createDeco(3800 * 0.48, 560, 'cactus'), createDeco(5100 * 0.48, 560, 'rock'),
      createDeco(6300 * 0.48, 560, 'cactus'), createDeco(7500 * 0.48, 560, 'skull'), createDeco(8700 * 0.48, 560, 'cactus'),
      createDeco(10200 * 0.48, 560, 'pyramid'), createDeco(11600 * 0.48, 560, 'cactus'), createDeco(13400 * 0.48, 560, 'rock'),
      createDeco(15200 * 0.48, 560, 'cactus'), createDeco(17000 * 0.48, 560, 'skull'), createDeco(18800 * 0.48, 560, 'cactus'),
      createDeco(20600 * 0.48, 560, 'pyramid'), createDeco(22400 * 0.48, 560, 'cactus'), createDeco(24200 * 0.48, 560, 'rock'),
      createDeco(26000 * 0.48, 560, 'cactus'), createDeco(27800 * 0.48, 560, 'skull'), createDeco(29600 * 0.48, 560, 'cactus'),
      createDeco(31400 * 0.48, 560, 'pyramid'), createDeco(33200 * 0.48, 560, 'cactus'), createDeco(35000 * 0.48, 560, 'skull'),
      createDeco(36800 * 0.48, 560, 'cactus'), createDeco(38600 * 0.48, 560, 'rock'), createDeco(40400 * 0.48, 560, 'cactus'),
    ],
    playerStart: { x: 150, y: 550 },
    goal: { x: 19660, y: 558 },
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
      plats.push(createPlat(6400 * S, 600, 1400 * S, 40, 'sand'));
      plats.push(createPlat(8200 * S, 600, 600 * S, 40, 'sand'));
      plats.push(createPlat(9100 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(9400 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(9700 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(10000 * S, 290, 150, 40, 'sand'));
      plats.push(createPlat(10300 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(10600 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(10900 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(11200 * S, 600, 800 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(12200 * S, 600, 450 * S, 4));
      plats.push(createPlat(12900 * S, 600, 1200 * S, 40, 'sand'));
      plats.push(createPlat(14400 * S, 600, 800 * S, 40, 'sandstone'));
      plats.push(...pipeSection(15400 * S, 600, 5));
      plats.push(createPlat(17400 * S, 600, 1600 * S, 40, 'sand'));
      plats.push(createPlat(19400 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(19700 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(20000 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(20300 * S, 290, 120, 28, 'platform_hard'));
      plats.push(createPlat(20600 * S, 230, 150, 40, 'sand'));
      plats.push(createPlat(20900 * S, 290, 120, 28, 'platform_hard'));
      plats.push(createPlat(21200 * S, 370, 120, 28, 'platform_medium'));
      plats.push(createPlat(21500 * S, 450, 120, 28, 'platform_easy'));
      plats.push(createPlat(21800 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(22100 * S, 600, 600 * S, 40, 'sand'));
      plats.push(createPlat(23300 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(24500 * S, 600, 500 * S, 4));
      plats.push(createPlat(25200 * S, 600, 800 * S, 40, 'sand'));
      plats.push(...pipeSection(26200 * S, 600, 5));
      plats.push(createPlat(28600 * S, 600, 1600 * S, 40, 'sand'));
      plats.push(createPlat(30600 * S, 600, 800 * S, 40, 'sand'));
      plats.push(createPlat(31800 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(32100 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(32400 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(32700 * S, 290, 120, 28, 'platform_hard'));
      plats.push(createPlat(33000 * S, 230, 150, 40, 'sand'));
      plats.push(createPlat(33300 * S, 290, 120, 28, 'platform_hard'));
      plats.push(createPlat(33600 * S, 370, 120, 28, 'platform_medium'));
      plats.push(createPlat(33900 * S, 450, 120, 28, 'platform_easy'));
      plats.push(createPlat(34200 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(34500 * S, 600, 800 * S, 40, 'sand'));
      plats.push(createPlat(35900 * S, 600, 1200 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(37300 * S, 600, 500 * S, 4));
      plats.push(createPlat(38100 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(...pipeSection(39300 * S, 600, 5));
      plats.push(createPlat(41200 * S, 600, 1600 * S, 40, 'sand'));
      plats.push(createPlat(43200 * S, 600, 800 * S, 40, 'sand'));
      plats.push(createPlat(44400 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(44700 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(45000 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(45300 * S, 290, 150, 40, 'sand'));
      plats.push(createPlat(45600 * S, 600, 1000 * S, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.43;
      const coins: any[] = [];
      for (let x = 300; x < 3400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 6400; x < 7800; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(9100 * S, 470), createCoin(9400 * S, 390), createCoin(9700 * S, 310), createCoin(10000 * S, 230));
      coins.push(createCoin(10300 * S, 310), createCoin(10600 * S, 390), createCoin(10900 * S, 470));
      for (let x = 11200; x < 12000; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(12300 * S, 420), createCoin(12600 * S, 360));
      for (let x = 12900; x < 14100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 17400; x < 19000; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(19400 * S, 470), createCoin(19700 * S, 390), createCoin(20000 * S, 310), createCoin(20300 * S, 230), createCoin(20600 * S, 170));
      coins.push(createCoin(20900 * S, 230), createCoin(21200 * S, 310), createCoin(21500 * S, 390), createCoin(21800 * S, 470));
      for (let x = 22100; x < 22700; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 23300; x < 24300; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(24600 * S, 420), createCoin(24900 * S, 360));
      for (let x = 25200; x < 26000; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 28600; x < 30200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 30600; x < 31400; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(31800 * S, 470), createCoin(32100 * S, 390), createCoin(32400 * S, 310), createCoin(32700 * S, 230), createCoin(33000 * S, 170));
      coins.push(createCoin(33300 * S, 230), createCoin(33600 * S, 310), createCoin(33900 * S, 390), createCoin(34200 * S, 470));
      for (let x = 34500; x < 35300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 35900; x < 37100; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(37400 * S, 420), createCoin(37800 * S, 360));
      for (let x = 38100; x < 39100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 41200; x < 42800; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 43200; x < 44000; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(44400 * S, 470), createCoin(44700 * S, 390), createCoin(45000 * S, 310), createCoin(45300 * S, 230));
      for (let x = 45600; x < 46100; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: [
      createQB(1500 * 0.43, 530, 'mushroom'),
      createQB(3200 * 0.43, 530, 'coin'),
      createQB(4200 * 0.43, 530, 'mushroom'),
      createQB(5400 * 0.43, 530, 'flower'),
      createQB(7000 * 0.43, 530, 'star'),
      createQB(10100 * 0.43, 220, 'mushroom'),
      createQB(11500 * 0.43, 530, 'coin'),
      createQB(13200 * 0.43, 530, 'flower'),
      createQB(14700 * 0.43, 530, 'mushroom'),
      createQB(15500 * 0.43, 530, 'star'),
      createQB(18000 * 0.43, 530, 'coin'),
      createQB(19700 * 0.43, 530, 'mushroom'),
      createQB(20700 * 0.43, 160, 'flower'),
      createQB(22200 * 0.43, 530, 'coin'),
      createQB(23700 * 0.43, 530, 'star'),
      createQB(25400 * 0.43, 530, 'mushroom'),
      createQB(26400 * 0.43, 530, 'flower'),
      createQB(29000 * 0.43, 530, 'star'),
      createQB(31000 * 0.43, 530, 'mushroom'),
      createQB(32500 * 0.43, 530, 'flower'),
      createQB(33100 * 0.43, 160, 'star'),
      createQB(34600 * 0.43, 530, 'coin'),
      createQB(36300 * 0.43, 530, 'mushroom'),
      createQB(38300 * 0.43, 530, 'flower'),
      createQB(39500 * 0.43, 530, 'star'),
      createQB(41600 * 0.43, 530, 'mushroom'),
      createQB(43600 * 0.43, 530, 'flower'),
      createQB(45100 * 0.43, 530, 'mushroom'),
    ],
    enemies: [
      createEnemy(500 * 0.43, 560, 'goomba'), createEnemy(800 * 0.43, 560, 'robot'), createEnemy(1400 * 0.43, 560, 'goomba'),
      createEnemy(1900 * 0.43, 560, 'crab'), createEnemy(2300 * 0.43, 560, 'koopa'), createEnemy(2900 * 0.43, 560, 'spiny'),
      createEnemy(3100 * 0.43, 560, 'goomba'), createEnemy(3700 * 0.43, 560, 'koopa'), createEnemy(4400 * 0.43, 560, 'robot'),
      createEnemy(4850 * 0.43, 530, 'piranha'), createEnemy(5200 * 0.43, 530, 'piranha'), createEnemy(5550 * 0.43, 530, 'piranha'),
      createEnemy(5900 * 0.43, 530, 'piranha'), createEnemy(6250 * 0.43, 530, 'piranha'), createEnemy(6800 * 0.43, 560, 'goomba'),
      createEnemy(7400 * 0.43, 560, 'crab'), createEnemy(7500 * 0.43, 560, 'koopa'), createEnemy(8300 * 0.43, 560, 'spiny'),
      createEnemy(10100 * 0.43, 560, 'goomba'), createEnemy(11300 * 0.43, 560, 'koopa'), createEnemy(12500 * 0.43, 560, 'goomba'),
      createEnemy(13500 * 0.43, 560, 'koopa'), createEnemy(14300 * 0.43, 560, 'spiny'), createEnemy(15300 * 0.43, 560, 'goomba'),
      createEnemy(16300 * 0.43, 560, 'koopa'), createEnemy(17600 * 0.43, 560, 'goomba'), createEnemy(18600 * 0.43, 560, 'spiny'),
      createEnemy(19400 * 0.43, 560, 'koopa'), createEnemy(20400 * 0.43, 560, 'goomba'), createEnemy(21900 * 0.43, 560, 'koopa'),
      createEnemy(23100 * 0.43, 560, 'goomba'), createEnemy(24100 * 0.43, 560, 'spiny'), createEnemy(25000 * 0.43, 560, 'koopa'),
      createEnemy(26200 * 0.43, 560, 'goomba'), createEnemy(29000 * 0.43, 560, 'koopa'), createEnemy(30400 * 0.43, 560, 'spiny'),
      createEnemy(31600 * 0.43, 560, 'goomba'), createEnemy(32800 * 0.43, 560, 'koopa'), createEnemy(34300 * 0.43, 560, 'goomba'),
      createEnemy(35700 * 0.43, 560, 'spiny'), createEnemy(37100 * 0.43, 560, 'goomba'), createEnemy(38100 * 0.43, 560, 'koopa'),
      createEnemy(39300 * 0.43, 560, 'spiny'), createEnemy(41300 * 0.43, 560, 'goomba'), createEnemy(42500 * 0.43, 560, 'spiny'),
      createEnemy(43700 * 0.43, 560, 'goomba'), createEnemy(45300 * 0.43, 560, 'koopa'),
    ],
    decorations: [
      createDeco(300 * 0.43, 560, 'cactus'), createDeco(1100 * 0.43, 560, 'pyramid'), createDeco(1900 * 0.43, 560, 'cactus'),
      createDeco(2800 * 0.43, 560, 'skull'), createDeco(3900 * 0.43, 560, 'cactus'), createDeco(5300 * 0.43, 560, 'rock'),
      createDeco(6600 * 0.43, 560, 'cactus'), createDeco(7900 * 0.43, 560, 'pyramid'), createDeco(9100 * 0.43, 560, 'cactus'),
      createDeco(10400 * 0.43, 560, 'skull'), createDeco(11900 * 0.43, 560, 'cactus'), createDeco(13700 * 0.43, 560, 'rock'),
      createDeco(15500 * 0.43, 560, 'cactus'), createDeco(17300 * 0.43, 560, 'pyramid'), createDeco(19100 * 0.43, 560, 'cactus'),
      createDeco(20900 * 0.43, 560, 'skull'), createDeco(22700 * 0.43, 560, 'cactus'), createDeco(24500 * 0.43, 560, 'rock'),
      createDeco(26300 * 0.43, 560, 'cactus'), createDeco(28100 * 0.43, 560, 'pyramid'), createDeco(29900 * 0.43, 560, 'cactus'),
      createDeco(31700 * 0.43, 560, 'skull'), createDeco(33500 * 0.43, 560, 'cactus'), createDeco(35300 * 0.43, 560, 'rock'),
      createDeco(37100 * 0.43, 560, 'cactus'), createDeco(38900 * 0.43, 560, 'pyramid'), createDeco(40700 * 0.43, 560, 'cactus'),
      createDeco(42500 * 0.43, 560, 'skull'), createDeco(44300 * 0.43, 560, 'cactus'), createDeco(45700 * 0.43, 560, 'rock'),
    ],
    playerStart: { x: 150, y: 550 },
    goal: { x: 19280, y: 558 },
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
      plats.push(createPlat(7400 * S, 600, 1600 * S, 40, 'sand'));
      plats.push(createPlat(9400 * S, 600, 800 * S, 40, 'sand'));
      plats.push(createPlat(10400 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(10700 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(11000 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(11300 * S, 290, 150, 40, 'sand'));
      plats.push(createPlat(11600 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(11900 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(12200 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(12500 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(13700 * S, 600, 500 * S, 4));
      plats.push(createPlat(14500 * S, 600, 1400 * S, 40, 'sand'));
      plats.push(createPlat(16200 * S, 600, 1000 * S, 40, 'sandstone'));
      plats.push(...pipeSection(17400 * S, 600, 5));
      plats.push(createPlat(19700 * S, 600, 1800 * S, 40, 'sand'));
      plats.push(createPlat(21900 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(22200 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(22500 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(22800 * S, 290, 120, 28, 'platform_hard'));
      plats.push(createPlat(23100 * S, 230, 150, 40, 'sand'));
      plats.push(createPlat(23400 * S, 290, 120, 28, 'platform_hard'));
      plats.push(createPlat(23700 * S, 370, 120, 28, 'platform_medium'));
      plats.push(createPlat(24000 * S, 450, 120, 28, 'platform_easy'));
      plats.push(createPlat(24300 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(24600 * S, 600, 800 * S, 40, 'sand'));
      plats.push(createPlat(26000 * S, 600, 1200 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(27400 * S, 600, 600 * S, 5));
      plats.push(createPlat(28300 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(...pipeSection(29500 * S, 600, 6));
      plats.push(createPlat(31500 * S, 600, 1800 * S, 40, 'sand'));
      plats.push(createPlat(33700 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(createPlat(35100 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(35400 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(35700 * S, 370, 120, 28, 'platform_hard'));
      plats.push(createPlat(36000 * S, 290, 120, 28, 'platform_hard'));
      plats.push(createPlat(36300 * S, 230, 150, 40, 'sand'));
      plats.push(createPlat(36600 * S, 290, 120, 28, 'platform_hard'));
      plats.push(createPlat(36900 * S, 370, 120, 28, 'platform_medium'));
      plats.push(createPlat(37200 * S, 450, 120, 28, 'platform_easy'));
      plats.push(createPlat(37500 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(37800 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(createPlat(39400 * S, 600, 1400 * S, 40, 'sand'));
      plats.push(...gapWithPlatforms(41000 * S, 600, 600 * S, 5));
      plats.push(createPlat(41900 * S, 600, 1200 * S, 40, 'sand'));
      plats.push(...pipeSection(43300 * S, 600, 6));
      plats.push(createPlat(45300 * S, 600, 2000 * S, 40, 'sand'));
      plats.push(createPlat(47700 * S, 600, 1000 * S, 40, 'sand'));
      plats.push(createPlat(49100 * S, 530, 120, 28, 'platform_easy'));
      plats.push(createPlat(49400 * S, 450, 120, 28, 'platform_medium'));
      plats.push(createPlat(49700 * S, 370, 150, 40, 'sand'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.4;
      const coins: any[] = [];
      for (let x = 300; x < 3800; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 7400; x < 9000; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(10400 * S, 470), createCoin(10700 * S, 390), createCoin(11000 * S, 310), createCoin(11300 * S, 230));
      coins.push(createCoin(11600 * S, 310), createCoin(11900 * S, 390), createCoin(12200 * S, 470));
      for (let x = 12500; x < 13500; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(13800 * S, 420), createCoin(14100 * S, 360));
      for (let x = 14500; x < 15900; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 19700; x < 21500; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(21900 * S, 470), createCoin(22200 * S, 390), createCoin(22500 * S, 310), createCoin(22800 * S, 230), createCoin(23100 * S, 170));
      coins.push(createCoin(23400 * S, 230), createCoin(23700 * S, 310), createCoin(24000 * S, 390), createCoin(24300 * S, 470));
      for (let x = 24600; x < 25400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 26000; x < 27200; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(27500 * S, 420), createCoin(27900 * S, 360));
      for (let x = 28300; x < 29300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 31500; x < 33300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 33700; x < 34700; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(35100 * S, 470), createCoin(35400 * S, 390), createCoin(35700 * S, 310), createCoin(36000 * S, 230), createCoin(36300 * S, 170));
      coins.push(createCoin(36600 * S, 230), createCoin(36900 * S, 310), createCoin(37200 * S, 390), createCoin(37500 * S, 470));
      for (let x = 37800; x < 38800; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 39400; x < 40800; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(41100 * S, 420), createCoin(41500 * S, 360));
      for (let x = 41900; x < 43100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 45300; x < 47300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 47700; x < 48700; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(49100 * S, 470), createCoin(49400 * S, 390), createCoin(49700 * S, 310));
      return coins;
    })(),
    questionBlocks: [
      createQB(1700 * 0.4, 530, 'mushroom'),
      createQB(3600 * 0.4, 530, 'coin'),
      createQB(4700 * 0.4, 530, 'mushroom'),
      createQB(6100 * 0.4, 530, 'flower'),
      createQB(8000 * 0.4, 530, 'star'),
      createQB(11400 * 0.4, 220, 'mushroom'),
      createQB(12800 * 0.4, 530, 'coin'),
      createQB(14800 * 0.4, 530, 'flower'),
      createQB(16500 * 0.4, 530, 'mushroom'),
      createQB(17500 * 0.4, 530, 'star'),
      createQB(20200 * 0.4, 530, 'coin'),
      createQB(22200 * 0.4, 530, 'mushroom'),
      createQB(23200 * 0.4, 160, 'flower'),
      createQB(24700 * 0.4, 530, 'coin'),
      createQB(26400 * 0.4, 530, 'star'),
      createQB(28500 * 0.4, 530, 'mushroom'),
      createQB(29700 * 0.4, 530, 'flower'),
      createQB(32000 * 0.4, 530, 'star'),
      createQB(34100 * 0.4, 530, 'mushroom'),
      createQB(35800 * 0.4, 530, 'flower'),
      createQB(36400 * 0.4, 160, 'star'),
      createQB(37900 * 0.4, 530, 'coin'),
      createQB(39800 * 0.4, 530, 'mushroom'),
      createQB(42100 * 0.4, 530, 'flower'),
      createQB(43500 * 0.4, 530, 'star'),
      createQB(45800 * 0.4, 530, 'mushroom'),
      createQB(48100 * 0.4, 530, 'flower'),
      createQB(49500 * 0.4, 530, 'mushroom'),
    ],
    enemies: [
      createEnemy(600 * 0.4, 560, 'goomba'), createEnemy(900 * 0.4, 560, 'robot'), createEnemy(1500 * 0.4, 560, 'goomba'),
      createEnemy(2100 * 0.4, 560, 'crab'), createEnemy(2500 * 0.4, 560, 'koopa'), createEnemy(3100 * 0.4, 560, 'spiny'),
      createEnemy(3400 * 0.4, 560, 'goomba'), createEnemy(4100 * 0.4, 560, 'koopa'), createEnemy(4600 * 0.4, 560, 'robot'),
      createEnemy(5200 * 0.4, 560, 'goomba'), createEnemy(5750 * 0.4, 530, 'piranha'), createEnemy(6100 * 0.4, 530, 'piranha'),
      createEnemy(6450 * 0.4, 530, 'piranha'), createEnemy(6800 * 0.4, 530, 'piranha'), createEnemy(7150 * 0.4, 530, 'piranha'),
      createEnemy(7500 * 0.4, 530, 'piranha'), createEnemy(7800 * 0.4, 560, 'goomba'), createEnemy(8600 * 0.4, 560, 'koopa'),
      createEnemy(9100 * 0.4, 560, 'spiny'), createEnemy(9500 * 0.4, 560, 'goomba'), createEnemy(11400 * 0.4, 560, 'goomba'),
      createEnemy(12600 * 0.4, 560, 'koopa'), createEnemy(13800 * 0.4, 560, 'goomba'), createEnemy(15000 * 0.4, 560, 'koopa'),
      createEnemy(16000 * 0.4, 560, 'spiny'), createEnemy(17000 * 0.4, 560, 'goomba'), createEnemy(18000 * 0.4, 560, 'koopa'),
      createEnemy(19500 * 0.4, 560, 'goomba'), createEnemy(20500 * 0.4, 560, 'spiny'), createEnemy(21500 * 0.4, 560, 'koopa'),
      createEnemy(22500 * 0.4, 560, 'goomba'), createEnemy(24000 * 0.4, 560, 'koopa'), createEnemy(25200 * 0.4, 560, 'goomba'),
      createEnemy(26200 * 0.4, 560, 'spiny'), createEnemy(27200 * 0.4, 560, 'koopa'), createEnemy(28400 * 0.4, 560, 'goomba'),
      createEnemy(29600 * 0.4, 560, 'spiny'), createEnemy(31000 * 0.4, 560, 'goomba'), createEnemy(32000 * 0.4, 560, 'koopa'),
      createEnemy(33500 * 0.4, 560, 'spiny'), createEnemy(35000 * 0.4, 560, 'goomba'), createEnemy(36000 * 0.4, 560, 'koopa'),
      createEnemy(37500 * 0.4, 560, 'spiny'), createEnemy(39000 * 0.4, 560, 'goomba'), createEnemy(40000 * 0.4, 560, 'koopa'),
      createEnemy(41000 * 0.4, 560, 'spiny'), createEnemy(42000 * 0.4, 560, 'goomba'), createEnemy(43000 * 0.4, 560, 'spiny'),
      createEnemy(44000 * 0.4, 560, 'goomba'), createEnemy(45000 * 0.4, 560, 'koopa'), createEnemy(46500 * 0.4, 560, 'spiny'),
      createEnemy(47500 * 0.4, 560, 'goomba'), createEnemy(48500 * 0.4, 560, 'koopa'), createEnemy(49500 * 0.4, 560, 'spiny'),
    ],
    decorations: [
      createDeco(300 * 0.4, 560, 'cactus'), createDeco(1200 * 0.4, 560, 'pyramid'), createDeco(2100 * 0.4, 560, 'cactus'),
      createDeco(3100 * 0.4, 560, 'skull'), createDeco(4300 * 0.4, 560, 'cactus'), createDeco(5700 * 0.4, 560, 'rock'),
      createDeco(7200 * 0.4, 560, 'cactus'), createDeco(8600 * 0.4, 560, 'pyramid'), createDeco(10000 * 0.4, 560, 'cactus'),
      createDeco(11400 * 0.4, 560, 'skull'), createDeco(13000 * 0.4, 560, 'cactus'), createDeco(14800 * 0.4, 560, 'rock'),
      createDeco(16600 * 0.4, 560, 'cactus'), createDeco(18400 * 0.4, 560, 'pyramid'), createDeco(20200 * 0.4, 560, 'cactus'),
      createDeco(22000 * 0.4, 560, 'skull'), createDeco(23800 * 0.4, 560, 'cactus'), createDeco(25600 * 0.4, 560, 'rock'),
      createDeco(27400 * 0.4, 560, 'cactus'), createDeco(29200 * 0.4, 560, 'pyramid'), createDeco(31000 * 0.4, 560, 'cactus'),
      createDeco(32800 * 0.4, 560, 'skull'), createDeco(34600 * 0.4, 560, 'cactus'), createDeco(36400 * 0.4, 560, 'rock'),
      createDeco(38200 * 0.4, 560, 'cactus'), createDeco(40000 * 0.4, 560, 'pyramid'), createDeco(41800 * 0.4, 560, 'cactus'),
      createDeco(43600 * 0.4, 560, 'skull'), createDeco(45400 * 0.4, 560, 'cactus'), createDeco(47200 * 0.4, 560, 'rock'),
      createDeco(49000 * 0.4, 560, 'cactus'),
    ],
    playerStart: { x: 150, y: 550 },
    goal: { x: 19500, y: 558 },
    timeBonus: 220,
  },
];
