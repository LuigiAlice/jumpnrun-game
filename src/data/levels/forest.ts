// Forest World - 6 Levels (31-36) - Long Horizontal Side-Scrolling Structure
// 70-80% ground coverage with wood platforms, vertical sections with floating platforms

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat } from './helpers';

const gapWithPlatforms = (S: number, startX: number, baseY: number, gapWidth: number, platformCount: number): any[] => {
  const plats = [];
  const platformSpacing = gapWidth / (platformCount + 1);
  for (let i = 0; i < platformCount; i++) {
    const px = (startX + platformSpacing * (i + 1)) * S;
    const py = baseY - 60 - (i * 25);
    const pw = 100 * S;
    const ptype = i % 3 === 0 ? 'platform_easy' : (i % 3 === 1 ? 'platform_medium' : 'platform_hard');
    plats.push(createPlat(px, py, pw, 24, ptype));
  }
  return plats;
};

const pipeSection = (S: number, startX: number, y: number, pipeCount: number): any[] => {
  const plats = [];
  for (let i = 0; i < pipeCount; i++) {
    const px = (startX + 300 + i * 350) * S;
    const ph = 64;
    plats.push(createPlat(px, y, 64 * S, ph, 'pipe'));
  }
  return plats;
};

const verticalClimb = (S: number, startX: number, baseY: number): any[] => {
  const plats = [];
  plats.push(createPlat(startX * S, baseY - 80, 120 * S, 28, 'platform_easy'));
  plats.push(createPlat((startX + 300) * S, baseY - 160, 120 * S, 28, 'platform_medium'));
  plats.push(createPlat((startX + 600) * S, baseY - 240, 120 * S, 28, 'platform_hard'));
  plats.push(createPlat((startX + 900) * S, baseY - 320, 150 * S, 40, 'grass'));
  plats.push(createPlat((startX + 1200) * S, baseY - 240, 120 * S, 28, 'platform_hard'));
  plats.push(createPlat((startX + 1500) * S, baseY - 160, 120 * S, 28, 'platform_medium'));
  plats.push(createPlat((startX + 1800) * S, baseY - 80, 120 * S, 28, 'platform_easy'));
  return plats;
};

export const FOREST_LEVELS: LevelData[] = [
  {
    id: 31, name: "Forest Path", width: 18750, height: 600, biome: 'forest',
    platforms: (() => {
      const S = 0.625;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 550, 800 * S, 40, 'wood'));
      plats.push(createPlat(1200 * S, 550, 600 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 1900, 550, 400, 3));
      plats.push(createPlat(2600 * S, 550, 1000 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 3600, 550, 4));
      plats.push(createPlat(5200 * S, 550, 1200 * S, 40, 'wood'));
      plats.push(...verticalClimb(S, 6600, 550));
      plats.push(createPlat(8800 * S, 550, 800 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 9800, 550, 400, 3));
      plats.push(createPlat(10500 * S, 550, 1000 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 11500, 550, 3));
      plats.push(createPlat(13500 * S, 550, 1500 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 15200, 550, 450, 4));
      plats.push(createPlat(16000 * S, 550, 800 * S, 40, 'wood'));
      plats.push(...verticalClimb(S, 17200, 550));
      plats.push(createPlat(19400 * S, 550, 1000 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 20400, 550, 4));
      plats.push(createPlat(22800 * S, 550, 1200 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 24200, 550, 400, 3));
      plats.push(createPlat(24900 * S, 550, 1500 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 26400, 550, 3));
      plats.push(createPlat(28300 * S, 550, 1700 * S, 40, 'wood'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.625;
      const coins: any[] = [];
      for (let x = 300; x < 2600; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 2700; x < 3600; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 5300; x < 6500; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(6600 * S, 410), createCoin(6900 * S, 330), createCoin(7200 * S, 250), createCoin(7500 * S, 170));
      coins.push(createCoin(7800 * S, 250), createCoin(8100 * S, 330), createCoin(8400 * S, 410));
      for (let x = 8800; x < 9600; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 9900; x < 10500; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 11600; x < 12500; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 13600; x < 15100; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 15300; x < 16000; x += 100) coins.push(createCoin(x * S, 500));
      coins.push(createCoin(17200 * S, 410), createCoin(17500 * S, 330), createCoin(17800 * S, 250), createCoin(18100 * S, 170));
      coins.push(createCoin(18400 * S, 250), createCoin(18700 * S, 330), createCoin(19000 * S, 410));
      for (let x = 19500; x < 20500; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 22900; x < 24100; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 25000; x < 26500; x += 100) coins.push(createCoin(x * S, 500));
      for (let x = 28400; x < 30000; x += 100) coins.push(createCoin(x * S, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(800 * S, 480, 'mushroom'), createQB(2000 * S, 400, 'flower'), createQB(2800 * S, 480, 'mushroom'),
        createQB(3700 * S, 480, 'star'), createQB(5400 * S, 480, 'flower'), createQB(6800 * S, 150, 'mushroom'),
        createQB(8500 * S, 480, 'star'), createQB(10000 * S, 461, 'mushroom'), createQB(11800 * S, 504, 'flower'),
        createQB(13800 * S, 480, 'mushroom'),         createQB(15600 * S, 427, 'star'), createQB(17500 * S, 150, 'flower'),
        createQB(19800 * S, 480, 'mushroom'), createQB(21000 * S, 504, 'star'), createQB(23200 * S, 480, 'flower'),
        createQB(25200 * S, 480, 'mushroom'), createQB(26800 * S, 480, 'star'), createQB(29000 * S, 480, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(600 * S, 510, 'goomba'), createEnemy(1300 * S, 510, 'robot'), createEnemy(2100 * S, 510, 'koopa'),
        createEnemy(2900 * S, 510, 'goomba'), createEnemy(3700 * S, 480, 'piranha'), createEnemy(4050 * S, 480, 'piranha'),
        createEnemy(4400 * S, 480, 'piranha'), createEnemy(4750 * S, 480, 'piranha'), createEnemy(5600 * S, 510, 'spiny'),
        createEnemy(6400 * S, 510, 'koopa'), createEnemy(7500 * S, 510, 'goomba'), createEnemy(9000 * S, 510, 'robot'),
        createEnemy(10100 * S, 510, 'goomba'), createEnemy(11700 * S, 480, 'piranha'), createEnemy(12050 * S, 480, 'piranha'),
        createEnemy(12400 * S, 480, 'piranha'), createEnemy(13900 * S, 510, 'crab'), createEnemy(15100 * S, 510, 'koopa'),
        createEnemy(16200 * S, 510, 'goomba'), createEnemy(18100 * S, 510, 'robot'), createEnemy(19800 * S, 510, 'spiny'),
        createEnemy(20500 * S, 480, 'piranha'), createEnemy(20850 * S, 480, 'piranha'), createEnemy(21200 * S, 480, 'piranha'),
        createEnemy(21550 * S, 480, 'piranha'), createEnemy(23100 * S, 510, 'goomba'), createEnemy(24500 * S, 510, 'crab'),
        createEnemy(25300 * S, 510, 'goomba'), createEnemy(26900 * S, 480, 'piranha'), createEnemy(27250 * S, 480, 'piranha'),
        createEnemy(28700 * S, 510, 'spiny'), createEnemy(29500 * S, 510, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      const decos: any[] = [];
      for (let x = 300; x < 30000; x += 1200) {
        const type = x % 4800 === 300 ? 'tree' : (x % 4800 === 1500 ? 'bush' : (x % 4800 === 2700 ? 'mushroom' : 'log'));
        decos.push(createDeco(x * S, 510, type));
      }
      return decos;
    })(),
    movingPlatforms: (() => {
      const S = 0.625;
      return [
        createMovingPlat(4600 * S, 500, 150, 24, 'wood', 'horizontal', 200, 20),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 18250, y: 508 },
    timeBonus: 120,
  },
  {
    id: 32, name: "Deep Woods", width: 19460, height: 650, biome: 'forest',
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1000 * S, 40, 'wood'));
      plats.push(createPlat(1500 * S, 600, 800 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 2400, 600, 500, 4));
      plats.push(createPlat(3300 * S, 600, 1200 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 4500, 600, 5));
      plats.push(createPlat(6200 * S, 600, 1500 * S, 40, 'wood'));
      plats.push(...verticalClimb(S, 7900, 600));
      plats.push(createPlat(10100 * S, 600, 1000 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 11300, 600, 450, 3));
      plats.push(createPlat(12100 * S, 600, 1200 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 13300, 600, 4));
      plats.push(createPlat(15700 * S, 600, 1800 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 17700, 600, 500, 4));
      plats.push(createPlat(18600 * S, 600, 1000 * S, 40, 'wood'));
      plats.push(...verticalClimb(S, 20000, 600));
      plats.push(createPlat(22200 * S, 600, 1200 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 23400, 600, 5));
      plats.push(createPlat(26400 * S, 600, 2000 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 28600, 600, 500, 4));
      plats.push(createPlat(29500 * S, 600, 1500 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 31000, 600, 4));
      plats.push(createPlat(33400 * S, 600, 1600 * S, 40, 'wood'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      const coins: any[] = [];
      for (let x = 300; x < 3300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 3400; x < 4500; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 6300; x < 7800; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(7900 * S, 460), createCoin(8200 * S, 380), createCoin(8500 * S, 300), createCoin(8800 * S, 220));
      coins.push(createCoin(9100 * S, 300), createCoin(9400 * S, 380), createCoin(9700 * S, 460));
      for (let x = 10200; x < 11200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 12200; x < 13400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 15800; x < 17600; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 17800; x < 18600; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(20000 * S, 460), createCoin(20300 * S, 380), createCoin(20600 * S, 300), createCoin(20900 * S, 220));
      coins.push(createCoin(21200 * S, 300), createCoin(21500 * S, 380), createCoin(21800 * S, 460));
      for (let x = 22300; x < 23400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 26500; x < 28500; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 29600; x < 31100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 33500; x < 35000; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(1000 * S, 530, 'mushroom'), createQB(2600 * S, 450, 'flower'), createQB(3700 * S, 530, 'mushroom'),
        createQB(4700 * S, 530, 'star'), createQB(6500 * S, 530, 'flower'), createQB(8100 * S, 200, 'mushroom'),
        createQB(9500 * S, 480, 'star'),         createQB(10500 * S, 486, 'mushroom'), createQB(12400 * S, 530, 'flower'),
        createQB(14100 * S, 530, 'mushroom'), createQB(16000 * S, 530, 'star'), createQB(18000 * S, 460, 'flower'),
        createQB(20300 * S, 200, 'mushroom'), createQB(21000 * S, 530, 'star'), createQB(22700 * S, 530, 'mushroom'),
        createQB(23800 * S, 530, 'flower'), createQB(26800 * S, 530, 'mushroom'), createQB(28800 * S, 530, 'star'),
        createQB(30000 * S, 530, 'flower'), createQB(31200 * S, 576, 'mushroom'), createQB(33800 * S, 530, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(700 * S, 560, 'goomba'), createEnemy(1600 * S, 560, 'robot'), createEnemy(2500 * S, 560, 'koopa'),
        createEnemy(3600 * S, 560, 'goomba'), createEnemy(4600 * S, 520, 'piranha'), createEnemy(4950 * S, 520, 'piranha'),
        createEnemy(5300 * S, 520, 'piranha'), createEnemy(5650 * S, 520, 'piranha'), createEnemy(6000 * S, 520, 'spiny'),
        createEnemy(6600 * S, 560, 'crab'), createEnemy(7500 * S, 560, 'koopa'), createEnemy(8700 * S, 560, 'goomba'),
        createEnemy(10300 * S, 560, 'robot'), createEnemy(11500 * S, 560, 'goomba'), createEnemy(12500 * S, 520, 'piranha'),
        createEnemy(12850 * S, 520, 'piranha'), createEnemy(13200 * S, 520, 'piranha'), createEnemy(13550 * S, 520, 'piranha'),
        createEnemy(14100 * S, 560, 'crab'), createEnemy(15100 * S, 560, 'koopa'), createEnemy(16100 * S, 560, 'goomba'),
        createEnemy(17900 * S, 560, 'spiny'), createEnemy(18900 * S, 560, 'goomba'), createEnemy(20900 * S, 560, 'robot'),
        createEnemy(22100 * S, 560, 'goomba'), createEnemy(23500 * S, 520, 'piranha'), createEnemy(23850 * S, 520, 'piranha'),
        createEnemy(24200 * S, 520, 'piranha'), createEnemy(24550 * S, 520, 'piranha'), createEnemy(24900 * S, 520, 'piranha'),
        createEnemy(26700 * S, 560, 'crab'), createEnemy(28000 * S, 560, 'koopa'), createEnemy(29200 * S, 560, 'goomba'),
        createEnemy(31100 * S, 520, 'piranha'), createEnemy(31450 * S, 520, 'piranha'), createEnemy(31800 * S, 520, 'piranha'),
        createEnemy(32250 * S, 520, 'piranha'), createEnemy(33900 * S, 560, 'spiny'), createEnemy(34600 * S, 560, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      const decos: any[] = [];
      for (let x = 300; x < 35000; x += 1400) {
        const type = x % 5600 === 300 ? 'tree' : (x % 5600 === 1700 ? 'vine' : (x % 5600 === 3100 ? 'mushroom' : 'log'));
        decos.push(createDeco(x * S, 560, type));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 4247, y: 580 },
    timeBonus: 140,
  },
  {
    id: 33, name: "Mushroom Grove", width: 19000, height: 700, biome: 'forest',
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 650, 1200 * S, 40, 'wood'));
      plats.push(createPlat(1700 * S, 650, 800 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 2600, 650, 500, 4));
      plats.push(createPlat(3500 * S, 650, 1400 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 4900, 650, 6));
      plats.push(createPlat(7000 * S, 650, 1800 * S, 40, 'wood'));
      plats.push(...verticalClimb(S, 9000, 650));
      plats.push(createPlat(11200 * S, 650, 1200 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 12600, 650, 500, 4));
      plats.push(createPlat(13500 * S, 650, 1500 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 15000, 650, 5));
      plats.push(createPlat(17500 * S, 650, 2000 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 19700, 650, 600, 5));
      plats.push(createPlat(20700 * S, 650, 1200 * S, 40, 'wood'));
      plats.push(...verticalClimb(S, 22300, 650));
      plats.push(createPlat(24500 * S, 650, 1500 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 26000, 650, 5));
      plats.push(createPlat(28500 * S, 650, 2500 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 31200, 650, 600, 5));
      plats.push(createPlat(32200 * S, 650, 1800 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 34000, 650, 4));
      plats.push(createPlat(36800 * S, 650, 1200 * S, 40, 'wood'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      const coins: any[] = [];
      for (let x = 300; x < 3500; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 3600; x < 4900; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 7100; x < 8900; x += 100) coins.push(createCoin(x * S, 600));
      coins.push(createCoin(9000 * S, 510), createCoin(9300 * S, 430), createCoin(9600 * S, 350), createCoin(9900 * S, 270));
      coins.push(createCoin(10200 * S, 350), createCoin(10500 * S, 430), createCoin(10800 * S, 510));
      for (let x = 11300; x < 12500; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 13600; x < 15100; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 17600; x < 19600; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 19800; x < 20700; x += 100) coins.push(createCoin(x * S, 600));
      coins.push(createCoin(22300 * S, 510), createCoin(22600 * S, 430), createCoin(22900 * S, 350), createCoin(23200 * S, 270));
      coins.push(createCoin(23500 * S, 350), createCoin(23800 * S, 430), createCoin(24100 * S, 510));
      for (let x = 24600; x < 26100; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 28600; x < 31100; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 32300; x < 34100; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 36900; x < 38000; x += 100) coins.push(createCoin(x * S, 600));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(1200 * S, 580, 'mushroom'), createQB(2800 * S, 500, 'flower'), createQB(4100 * S, 580, 'mushroom'),
        createQB(5100 * S, 580, 'star'), createQB(7300 * S, 617, 'flower'), createQB(9200 * S, 250, 'mushroom'),
        createQB(10400 * S, 543, 'star'), createQB(11500 * S, 580, 'mushroom'),         createQB(13000 * S, 527, 'flower'),
        createQB(14500 * S, 563, 'mushroom'), createQB(15800 * S, 563, 'star'), createQB(18000 * S, 580, 'flower'),
        createQB(20000 * S, 555, 'mushroom'), createQB(22800 * S, 250, 'star'), createQB(24000 * S, 555, 'mushroom'),
        createQB(25200 * S, 580, 'flower'), createQB(26400 * S, 555, 'mushroom'), createQB(29000 * S, 580, 'star'),
        createQB(31500 * S, 542, 'flower'), createQB(32800 * S, 580, 'mushroom'), createQB(34200 * S, 580, 'star'),
        createQB(37200 * S, 580, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(800 * S, 610, 'goomba'), createEnemy(1900 * S, 610, 'robot'), createEnemy(2800 * S, 610, 'koopa'),
        createEnemy(3900 * S, 610, 'goomba'), createEnemy(5000 * S, 570, 'piranha'), createEnemy(5350 * S, 570, 'piranha'),
        createEnemy(5700 * S, 570, 'piranha'), createEnemy(6050 * S, 570, 'piranha'), createEnemy(6400 * S, 570, 'spiny'),
        createEnemy(6750 * S, 570, 'piranha'), createEnemy(7400 * S, 610, 'crab'), createEnemy(8400 * S, 610, 'koopa'),
        createEnemy(9600 * S, 610, 'goomba'), createEnemy(10500 * S, 610, 'robot'), createEnemy(11400 * S, 610, 'goomba'),
        createEnemy(12800 * S, 610, 'spiny'), createEnemy(13800 * S, 570, 'piranha'), createEnemy(14150 * S, 570, 'piranha'),
        createEnemy(14500 * S, 570, 'piranha'), createEnemy(14850 * S, 570, 'piranha'), createEnemy(15200 * S, 570, 'piranha'),
        createEnemy(15900 * S, 610, 'crab'), createEnemy(16900 * S, 610, 'koopa'), createEnemy(17900 * S, 610, 'goomba'),
        createEnemy(19900 * S, 610, 'robot'), createEnemy(20900 * S, 610, 'goomba'), createEnemy(23200 * S, 610, 'spiny'),
        createEnemy(24400 * S, 610, 'goomba'), createEnemy(25200 * S, 570, 'piranha'), createEnemy(25550 * S, 570, 'piranha'),
        createEnemy(25900 * S, 570, 'piranha'), createEnemy(26250 * S, 570, 'piranha'), createEnemy(26600 * S, 570, 'piranha'),
        createEnemy(27050 * S, 570, 'piranha'), createEnemy(28800 * S, 610, 'crab'), createEnemy(30000 * S, 610, 'koopa'),
        createEnemy(31800 * S, 610, 'goomba'), createEnemy(33000 * S, 570, 'piranha'), createEnemy(33350 * S, 570, 'piranha'),
        createEnemy(33700 * S, 570, 'piranha'), createEnemy(34050 * S, 570, 'piranha'), createEnemy(37500 * S, 610, 'spiny'),
        createEnemy(37800 * S, 610, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      const decos: any[] = [];
      for (let x = 300; x < 38000; x += 1600) {
        const type = x % 6400 === 300 ? 'tree' : (x % 6400 === 1900 ? 'bush' : (x % 6400 === 3500 ? 'vine' : 'flower'));
        decos.push(createDeco(x * S, 610, type));
      }
      return decos;
    })(),
    movingPlatforms: (() => {
      const S = 0.5;
      return [
        createMovingPlat(8000 * S, 550, 150, 24, 'wood', 'horizontal', 250, 20),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 18500, y: 608 },
    timeBonus: 160,
  },
  {
    id: 34, name: "Ancient Forest", width: 19110, height: 700, biome: 'forest',
    platforms: (() => {
      const S = 0.455;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 650, 1500 * S, 40, 'wood'));
      plats.push(createPlat(2000 * S, 650, 1000 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 3100, 650, 600, 5));
      plats.push(createPlat(4200 * S, 650, 1600 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 5800, 650, 6));
      plats.push(createPlat(8100 * S, 650, 2000 * S, 40, 'wood'));
      plats.push(...verticalClimb(S, 10300, 650));
      plats.push(createPlat(12500 * S, 650, 1400 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 14100, 650, 550, 4));
      plats.push(createPlat(15100 * S, 650, 1800 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 16900, 650, 5));
      plats.push(createPlat(19400 * S, 650, 2200 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 21800, 650, 600, 5));
      plats.push(createPlat(22900 * S, 650, 1400 * S, 40, 'wood'));
      plats.push(...verticalClimb(S, 24700, 650));
      plats.push(createPlat(26900 * S, 650, 1800 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 28700, 650, 6));
      plats.push(createPlat(31700 * S, 650, 2800 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 34700, 650, 650, 5));
      plats.push(createPlat(35800 * S, 650, 2000 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 37800, 650, 5));
      plats.push(createPlat(40300 * S, 650, 1700 * S, 40, 'wood'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.455;
      const coins: any[] = [];
      for (let x = 300; x < 4200; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 4300; x < 5800; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 8200; x < 10200; x += 100) coins.push(createCoin(x * S, 600));
      coins.push(createCoin(10300 * S, 510), createCoin(10600 * S, 430), createCoin(10900 * S, 350), createCoin(11200 * S, 270));
      coins.push(createCoin(11500 * S, 350), createCoin(11800 * S, 430), createCoin(12100 * S, 510));
      for (let x = 12600; x < 14000; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 15200; x < 17000; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 19500; x < 21700; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 23000; x < 24400; x += 100) coins.push(createCoin(x * S, 600));
      coins.push(createCoin(24700 * S, 510), createCoin(25000 * S, 430), createCoin(25300 * S, 350), createCoin(25600 * S, 270));
      coins.push(createCoin(25900 * S, 350), createCoin(26200 * S, 430), createCoin(26500 * S, 510));
      for (let x = 27000; x < 28800; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 31800; x < 34600; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 35900; x < 37900; x += 100) coins.push(createCoin(x * S, 600));
      for (let x = 40400; x < 42000; x += 100) coins.push(createCoin(x * S, 600));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.455;
      return [
        createQB(1500 * S, 580, 'mushroom'), createQB(3300 * S, 500, 'flower'), createQB(4700 * S, 580, 'mushroom'),
        createQB(6000 * S, 580, 'star'), createQB(8400 * S, 617, 'flower'), createQB(9500 * S, 617, 'mushroom'),
        createQB(10700 * S, 250, 'star'), createQB(11700 * S, 543, 'mushroom'), createQB(12900 * S, 580, 'flower'),
        createQB(14500 * S, 527, 'mushroom'), createQB(15900 * S, 527, 'star'), createQB(17200 * S, 580, 'flower'),
        createQB(19800 * S, 580, 'mushroom'), createQB(21000 * S, 617, 'star'), createQB(22200 * S, 540, 'mushroom'),
        createQB(25000 * S, 250, 'flower'), createQB(26300 * S, 543, 'mushroom'), createQB(27500 * S, 580, 'star'),
        createQB(29100 * S, 580, 'flower'), createQB(30600 * S, 580, 'mushroom'), createQB(32200 * S, 580, 'star'),
        createQB(34000 * S, 580, 'mushroom'), createQB(35200 * S, 580, 'flower'), createQB(36800 * S, 580, 'mushroom'),
        createQB(38200 * S, 580, 'star'), createQB(39800 * S, 580, 'flower'), createQB(40800 * S, 580, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.455;
      return [
        createEnemy(900 * S, 610, 'goomba'), createEnemy(2200 * S, 610, 'robot'), createEnemy(3300 * S, 610, 'koopa'),
        createEnemy(4600 * S, 610, 'goomba'), createEnemy(5900 * S, 570, 'piranha'), createEnemy(6250 * S, 570, 'piranha'),
        createEnemy(6600 * S, 570, 'piranha'), createEnemy(6950 * S, 570, 'piranha'), createEnemy(7300 * S, 570, 'spiny'),
        createEnemy(7650 * S, 570, 'piranha'), createEnemy(8500 * S, 610, 'crab'), createEnemy(9600 * S, 610, 'koopa'),
        createEnemy(10900 * S, 610, 'goomba'), createEnemy(12000 * S, 610, 'robot'), createEnemy(13100 * S, 610, 'goomba'),
        createEnemy(14300 * S, 610, 'spiny'), createEnemy(15400 * S, 570, 'piranha'), createEnemy(15750 * S, 570, 'piranha'),
        createEnemy(16100 * S, 570, 'piranha'), createEnemy(16450 * S, 570, 'piranha'), createEnemy(16800 * S, 570, 'piranha'),
        createEnemy(17150 * S, 570, 'piranha'), createEnemy(17800 * S, 610, 'crab'), createEnemy(18800 * S, 610, 'koopa'),
        createEnemy(19800 * S, 610, 'goomba'), createEnemy(21100 * S, 610, 'robot'), createEnemy(22200 * S, 610, 'goomba'),
        createEnemy(23300 * S, 610, 'spiny'), createEnemy(25600 * S, 610, 'goomba'), createEnemy(26600 * S, 610, 'koopa'),
        createEnemy(27600 * S, 570, 'piranha'), createEnemy(27950 * S, 570, 'piranha'), createEnemy(28300 * S, 570, 'piranha'),
        createEnemy(28650 * S, 570, 'piranha'), createEnemy(29000 * S, 570, 'piranha'), createEnemy(29350 * S, 570, 'piranha'),
        createEnemy(29800 * S, 570, 'piranha'), createEnemy(32100 * S, 610, 'crab'), createEnemy(33500 * S, 610, 'koopa'),
        createEnemy(34900 * S, 610, 'goomba'), createEnemy(36300 * S, 570, 'piranha'), createEnemy(36650 * S, 570, 'piranha'),
        createEnemy(37000 * S, 570, 'piranha'), createEnemy(37350 * S, 570, 'piranha'), createEnemy(37700 * S, 570, 'piranha'),
        createEnemy(38050 * S, 570, 'piranha'), createEnemy(40700 * S, 610, 'spiny'), createEnemy(41600 * S, 610, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.455;
      const decos: any[] = [];
      for (let x = 300; x < 42000; x += 1800) {
        const type = x % 7200 === 300 ? 'tree' : (x % 7200 === 2100 ? 'log' : (x % 7200 === 3900 ? 'mushroom' : 'vine'));
        decos.push(createDeco(x * S, 610, type));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 18610, y: 608 },
    timeBonus: 180,
  },
  {
    id: 35, name: "Enchanted Thicket", width: 19182, height: 650, biome: 'forest',
    platforms: (() => {
      const S = 0.417;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1800 * S, 40, 'wood'));
      plats.push(createPlat(2300 * S, 600, 1200 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 3600, 600, 650, 5));
      plats.push(createPlat(4800 * S, 600, 1800 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 6600, 600, 7));
      plats.push(createPlat(9100 * S, 600, 2200 * S, 40, 'wood'));
      plats.push(...verticalClimb(S, 11500, 600));
      plats.push(createPlat(13700 * S, 600, 1600 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 15500, 600, 600, 5));
      plats.push(createPlat(16600 * S, 600, 2000 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 18600, 600, 6));
      plats.push(createPlat(21600 * S, 600, 2500 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 24300, 600, 700, 6));
      plats.push(createPlat(25600 * S, 600, 1600 * S, 40, 'wood'));
      plats.push(...verticalClimb(S, 27600, 600));
      plats.push(createPlat(29800 * S, 600, 2200 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 32000, 600, 7));
      plats.push(createPlat(35100 * S, 600, 3000 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 38300, 600, 700, 6));
      plats.push(createPlat(39600 * S, 600, 2200 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 41800, 600, 6));
      plats.push(createPlat(44800 * S, 600, 1200 * S, 40, 'wood'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.417;
      const coins: any[] = [];
      for (let x = 300; x < 4800; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 4900; x < 6600; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 9200; x < 11400; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(11500 * S, 460), createCoin(11800 * S, 380), createCoin(12100 * S, 300), createCoin(12400 * S, 220));
      coins.push(createCoin(12700 * S, 300), createCoin(13000 * S, 380), createCoin(13300 * S, 460));
      for (let x = 13800; x < 15400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 16700; x < 18700; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 21700; x < 24200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 25700; x < 27600; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(27600 * S, 460), createCoin(27900 * S, 380), createCoin(28200 * S, 300), createCoin(28500 * S, 220));
      coins.push(createCoin(28800 * S, 300), createCoin(29100 * S, 380), createCoin(29400 * S, 460));
      for (let x = 29900; x < 32100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 35200; x < 38200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 39700; x < 41900; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 44900; x < 46000; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.417;
      return [
        createQB(1800 * S, 530, 'mushroom'), createQB(3800 * S, 450, 'flower'), createQB(5300 * S, 530, 'mushroom'),
        createQB(6800 * S, 530, 'star'), createQB(9500 * S, 530, 'flower'), createQB(10800 * S, 530, 'mushroom'),
        createQB(11900 * S, 200, 'star'), createQB(13100 * S, 530, 'mushroom'), createQB(14300 * S, 530, 'flower'),
        createQB(15800 * S, 486, 'mushroom'), createQB(17200 * S, 543, 'star'), createQB(18800 * S, 530, 'flower'),
        createQB(20000 * S, 530, 'mushroom'), createQB(21200 * S, 530, 'star'), createQB(22400 * S, 530, 'mushroom'),
        createQB(23900 * S, 530, 'flower'), createQB(25100 * S, 530, 'mushroom'), createQB(26600 * S, 530, 'star'),
        createQB(28200 * S, 200, 'flower'), createQB(29500 * S, 474, 'mushroom'), createQB(30700 * S, 530, 'star'),
        createQB(32400 * S, 530, 'flower'), createQB(33800 * S, 530, 'mushroom'), createQB(35600 * S, 530, 'star'),
        createQB(37100 * S, 530, 'flower'), createQB(38600 * S, 480, 'mushroom'), createQB(40100 * S, 530, 'star'),
        createQB(41600 * S, 530, 'mushroom'), createQB(42800 * S, 530, 'flower'), createQB(44200 * S, 474, 'mushroom'),
        createQB(45200 * S, 530, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.417;
      return [
        createEnemy(1000 * S, 560, 'goomba'), createEnemy(2500 * S, 560, 'robot'), createEnemy(3800 * S, 560, 'koopa'),
        createEnemy(5100 * S, 560, 'goomba'), createEnemy(6700 * S, 520, 'piranha'), createEnemy(7050 * S, 520, 'piranha'),
        createEnemy(7400 * S, 520, 'piranha'), createEnemy(7750 * S, 520, 'piranha'), createEnemy(8100 * S, 520, 'spiny'),
        createEnemy(8450 * S, 520, 'piranha'), createEnemy(8800 * S, 520, 'piranha'), createEnemy(9600 * S, 560, 'crab'),
        createEnemy(10800 * S, 560, 'koopa'), createEnemy(12000 * S, 560, 'goomba'), createEnemy(13200 * S, 560, 'robot'),
        createEnemy(14400 * S, 560, 'goomba'), createEnemy(15700 * S, 560, 'spiny'), createEnemy(16900 * S, 520, 'piranha'),
        createEnemy(17250 * S, 520, 'piranha'), createEnemy(17600 * S, 520, 'piranha'), createEnemy(17950 * S, 520, 'piranha'),
        createEnemy(18300 * S, 520, 'piranha'), createEnemy(18650 * S, 520, 'piranha'), createEnemy(19000 * S, 520, 'piranha'),
        createEnemy(19350 * S, 520, 'piranha'), createEnemy(19700 * S, 560, 'crab'), createEnemy(20700 * S, 560, 'koopa'),
        createEnemy(21900 * S, 560, 'goomba'), createEnemy(23100 * S, 560, 'robot'), createEnemy(24500 * S, 560, 'goomba'),
        createEnemy(25900 * S, 560, 'spiny'), createEnemy(27900 * S, 560, 'goomba'), createEnemy(28900 * S, 560, 'koopa'),
        createEnemy(29900 * S, 520, 'piranha'), createEnemy(30250 * S, 520, 'piranha'), createEnemy(30600 * S, 520, 'piranha'),
        createEnemy(30950 * S, 520, 'piranha'), createEnemy(31300 * S, 520, 'piranha'), createEnemy(31650 * S, 520, 'piranha'),
        createEnemy(32000 * S, 520, 'piranha'), createEnemy(32350 * S, 520, 'piranha'), createEnemy(32700 * S, 520, 'piranha'),
        createEnemy(33050 * S, 520, 'piranha'), createEnemy(35400 * S, 560, 'crab'), createEnemy(37000 * S, 560, 'koopa'),
        createEnemy(38600 * S, 560, 'goomba'), createEnemy(40000 * S, 560, 'robot'), createEnemy(41200 * S, 520, 'piranha'),
        createEnemy(41550 * S, 520, 'piranha'), createEnemy(41900 * S, 520, 'piranha'), createEnemy(42250 * S, 520, 'piranha'),
        createEnemy(42600 * S, 520, 'piranha'), createEnemy(42950 * S, 520, 'piranha'), createEnemy(43300 * S, 520, 'piranha'),
        createEnemy(43650 * S, 520, 'piranha'), createEnemy(44000 * S, 520, 'piranha'), createEnemy(45100 * S, 560, 'spiny'),
        createEnemy(45600 * S, 560, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.417;
      const decos: any[] = [];
      for (let x = 300; x < 46000; x += 2000) {
        const type = x % 8000 === 300 ? 'tree' : (x % 8000 === 2300 ? 'log' : (x % 8000 === 4300 ? 'bush' : (x % 8000 === 6300 ? 'mushroom' : 'flower')));
        decos.push(createDeco(x * S, 560, type));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 18682, y: 558 },
    timeBonus: 200,
  },
  {
    id: 36, name: "Forest Finale", width: 20000, height: 650, biome: 'forest',
    platforms: (() => {
      const S = 0.4;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 2000 * S, 40, 'wood'));
      plats.push(createPlat(2500 * S, 600, 1400 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 4000, 600, 700, 6));
      plats.push(createPlat(5300 * S, 600, 2000 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 7300, 600, 8));
      plats.push(createPlat(10100 * S, 600, 2500 * S, 40, 'wood'));
      plats.push(...verticalClimb(S, 12800, 600));
      plats.push(createPlat(15000 * S, 600, 1800 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 17000, 600, 650, 6));
      plats.push(createPlat(18200 * S, 600, 2200 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 20400, 600, 7));
      plats.push(createPlat(23500 * S, 600, 2800 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 26500, 600, 750, 6));
      plats.push(createPlat(27800 * S, 600, 1800 * S, 40, 'wood'));
      plats.push(...verticalClimb(S, 30000, 600));
      plats.push(createPlat(32200 * S, 600, 2500 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 34700, 600, 8));
      plats.push(createPlat(37900 * S, 600, 3200 * S, 40, 'wood'));
      plats.push(...gapWithPlatforms(S, 41300, 600, 750, 6));
      plats.push(createPlat(42600 * S, 600, 2400 * S, 40, 'wood'));
      plats.push(...pipeSection(S, 45000, 600, 7));
      plats.push(createPlat(48100 * S, 600, 1900 * S, 40, 'wood'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.4;
      const coins: any[] = [];
      for (let x = 300; x < 5300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 5400; x < 7300; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 10200; x < 12700; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(12800 * S, 460), createCoin(13100 * S, 380), createCoin(13400 * S, 300), createCoin(13700 * S, 220));
      coins.push(createCoin(14000 * S, 300), createCoin(14300 * S, 380), createCoin(14600 * S, 460));
      for (let x = 15100; x < 16900; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 18300; x < 20500; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 23600; x < 26400; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 27900; x < 29900; x += 100) coins.push(createCoin(x * S, 550));
      coins.push(createCoin(30000 * S, 460), createCoin(30300 * S, 380), createCoin(30600 * S, 300), createCoin(30900 * S, 220));
      coins.push(createCoin(31200 * S, 300), createCoin(31500 * S, 380), createCoin(31800 * S, 460));
      for (let x = 32300; x < 34800; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 38000; x < 41200; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 42700; x < 45100; x += 100) coins.push(createCoin(x * S, 550));
      for (let x = 48200; x < 50000; x += 100) coins.push(createCoin(x * S, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.4;
      return [
        createQB(2000 * S, 530, 'mushroom'), createQB(4200 * S, 450, 'flower'), createQB(5800 * S, 530, 'mushroom'),
        createQB(7500 * S, 530, 'star'), createQB(10400 * S, 530, 'flower'), createQB(11900 * S, 530, 'mushroom'),
        createQB(13100 * S, 200, 'star'), createQB(14400 * S, 530, 'mushroom'), createQB(15600 * S, 530, 'flower'),
        createQB(17200 * S, 530, 'mushroom'), createQB(18600 * S, 530, 'star'), createQB(19800 * S, 530, 'flower'),
        createQB(21000 * S, 530, 'mushroom'), createQB(22200 * S, 530, 'star'), createQB(23800 * S, 474, 'mushroom'),
        createQB(25400 * S, 530, 'flower'), createQB(26800 * S, 492, 'mushroom'), createQB(28200 * S, 530, 'star'),
        createQB(29400 * S, 530, 'flower'), createQB(30600 * S, 200, 'mushroom'), createQB(31800 * S, 530, 'star'),
        createQB(33000 * S, 530, 'mushroom'), createQB(34200 * S, 530, 'flower'), createQB(35400 * S, 530, 'mushroom'),
        createQB(36600 * S, 530, 'star'), createQB(38200 * S, 530, 'flower'), createQB(39600 * S, 530, 'mushroom'),
        createQB(41000 * S, 530, 'star'), createQB(42200 * S, 530, 'mushroom'), createQB(43400 * S, 530, 'flower'),
        createQB(44600 * S, 530, 'mushroom'), createQB(45800 * S, 530, 'star'), createQB(47000 * S, 530, 'mushroom'),
        createQB(48200 * S, 530, 'flower'), createQB(49200 * S, 530, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.4;
      return [
        createEnemy(1100 * S, 560, 'goomba'), createEnemy(2700 * S, 560, 'robot'), createEnemy(4100 * S, 560, 'koopa'),
        createEnemy(5500 * S, 560, 'goomba'), createEnemy(7400 * S, 520, 'piranha'), createEnemy(7750 * S, 520, 'piranha'),
        createEnemy(8100 * S, 520, 'piranha'), createEnemy(8450 * S, 520, 'piranha'), createEnemy(8800 * S, 520, 'spiny'),
        createEnemy(9150 * S, 520, 'piranha'), createEnemy(9500 * S, 520, 'piranha'), createEnemy(9850 * S, 520, 'piranha'),
        createEnemy(10200 * S, 560, 'crab'), createEnemy(11300 * S, 560, 'koopa'), createEnemy(12600 * S, 560, 'goomba'),
        createEnemy(13900 * S, 560, 'robot'), createEnemy(15300 * S, 560, 'goomba'), createEnemy(16400 * S, 560, 'spiny'),
        createEnemy(17300 * S, 520, 'piranha'), createEnemy(17650 * S, 520, 'piranha'), createEnemy(18000 * S, 520, 'piranha'),
        createEnemy(18350 * S, 520, 'piranha'), createEnemy(18700 * S, 520, 'piranha'), createEnemy(19050 * S, 520, 'piranha'),
        createEnemy(19400 * S, 520, 'piranha'), createEnemy(19750 * S, 520, 'piranha'), createEnemy(20100 * S, 520, 'piranha'),
        createEnemy(20450 * S, 520, 'piranha'), createEnemy(20800 * S, 560, 'crab'), createEnemy(21900 * S, 560, 'koopa'),
        createEnemy(23200 * S, 560, 'goomba'), createEnemy(24500 * S, 560, 'robot'), createEnemy(25800 * S, 560, 'goomba'),
        createEnemy(27100 * S, 560, 'spiny'), createEnemy(28400 * S, 560, 'goomba'), createEnemy(29700 * S, 560, 'koopa'),
        createEnemy(30900 * S, 560, 'crab'), createEnemy(32200 * S, 520, 'piranha'), createEnemy(32550 * S, 520, 'piranha'),
        createEnemy(32900 * S, 520, 'piranha'), createEnemy(33250 * S, 520, 'piranha'), createEnemy(33600 * S, 520, 'piranha'),
        createEnemy(33950 * S, 520, 'piranha'), createEnemy(34300 * S, 520, 'piranha'), createEnemy(34650 * S, 520, 'piranha'),
        createEnemy(35000 * S, 520, 'piranha'), createEnemy(35350 * S, 520, 'piranha'), createEnemy(35700 * S, 520, 'piranha'),
        createEnemy(36050 * S, 520, 'piranha'), createEnemy(36400 * S, 520, 'piranha'), createEnemy(36750 * S, 520, 'piranha'),
        createEnemy(37100 * S, 520, 'piranha'), createEnemy(37450 * S, 520, 'piranha'), createEnemy(37800 * S, 560, 'spiny'),
        createEnemy(39300 * S, 560, 'koopa'), createEnemy(40800 * S, 560, 'goomba'), createEnemy(42100 * S, 560, 'robot'),
        createEnemy(43600 * S, 520, 'piranha'), createEnemy(43950 * S, 520, 'piranha'), createEnemy(44300 * S, 520, 'piranha'),
        createEnemy(44650 * S, 520, 'piranha'), createEnemy(45000 * S, 520, 'piranha'), createEnemy(45350 * S, 520, 'piranha'),
        createEnemy(45700 * S, 520, 'piranha'), createEnemy(46050 * S, 520, 'piranha'), createEnemy(46400 * S, 520, 'piranha'),
        createEnemy(46750 * S, 520, 'piranha'), createEnemy(47100 * S, 520, 'piranha'), createEnemy(47450 * S, 520, 'piranha'),
        createEnemy(47800 * S, 520, 'piranha'), createEnemy(48400 * S, 560, 'crab'), createEnemy(49200 * S, 560, 'koopa'),
        createEnemy(49800 * S, 560, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.4;
      const decos: any[] = [];
      for (let x = 300; x < 50000; x += 2200) {
        const type = x % 8800 === 300 ? 'tree' : (x % 8800 === 2500 ? 'log' : (x % 8800 === 4700 ? 'vine' : (x % 8800 === 6900 ? 'mushroom' : 'flower')));
        decos.push(createDeco(x * S, 560, type));
      }
      return decos;
    })(),
    movingPlatforms: (() => {
      const S = 0.4;
      return [
        createMovingPlat(13200 * S, 450, 120, 24, 'wood', 'vertical', 150, 20),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19500, y: 558 },
    timeBonus: 220,
  },
];
