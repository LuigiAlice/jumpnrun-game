// Haunted Mansion World - 6 Levels (61-66) - Long Horizontal Side-Scrolling Structure
// Width: 30000-50000px, Height: 600-700px, 70-80% ground / 20-30% vertical

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco } from './helpers';

const ghostPlatforms = (S: number, startX: number, baseY: number, count: number): any[] => {
  const plats = [];
  for (let i = 0; i < count; i++) {
    const px = (startX + i * 200) * S;
    const py = baseY - 80 - (i % 4) * 60;
    const pw = (100 + (i % 3) * 30) * S;
    const ptype = i % 3 === 0 ? 'platform_easy' : (i % 3 === 1 ? 'platform_medium' : 'platform_hard');
    plats.push(createPlat(px, py, pw, 28, ptype));
  }
  return plats;
};

const verticalShaft = (S: number, startX: number, baseY: number): any[] => {
  const plats = [];
  plats.push(createPlat(startX * S, baseY - 100, 150 * S, 40, 'brick'));
  plats.push(createPlat((startX + 250) * S, baseY - 180, 120 * S, 28, 'platform_medium'));
  plats.push(createPlat((startX + 450) * S, baseY - 260, 120 * S, 28, 'platform_hard'));
  plats.push(createPlat((startX + 650) * S, baseY - 340, 180 * S, 40, 'brick'));
  plats.push(createPlat((startX + 850) * S, baseY - 280, 120 * S, 28, 'platform_hard'));
  plats.push(createPlat((startX + 1050) * S, baseY - 200, 120 * S, 28, 'platform_medium'));
  plats.push(createPlat((startX + 1250) * S, baseY - 120, 150 * S, 28, 'platform_easy'));
  return plats;
};

const bridgeSection = (S: number, startX: number, baseY: number, length: number): any[] => {
  const plats = [];
  for (let i = 0; i < length; i++) {
    plats.push(createPlat((startX + i * 150) * S, baseY, 140 * S, 40, 'brick'));
  }
  return plats;
};

export const HAUNTED_MANSION_LEVELS: LevelData[] = [
  {
    id: 61, name: "Ghost Hall", width: 18750, height: 600, biome: 'haunted-mansion',
    platforms: (() => {
      const S = 0.625;
      const plats: any[] = [];
      plats.push(...bridgeSection(S, 100, 560, 50));
      plats.push(...verticalShaft(S, 7700, 560));
      plats.push(...bridgeSection(S, 9200, 560, 40));
      plats.push(...ghostPlatforms(S, 15200, 560, 20));
      plats.push(...bridgeSection(S, 19200, 560, 45));
      plats.push(...verticalShaft(S, 25950, 560));
      plats.push(...bridgeSection(S, 27450, 560, 18));
      return plats;
    })(),
    coins: (() => {
      const S = 0.625;
      const coins: any[] = [];
      for (let x = 200 * S; x < 7600 * S; x += 120 * S) coins.push(createCoin(x, 500));
      coins.push(createCoin(7800 * S, 400), createCoin(8050 * S, 320), createCoin(8300 * S, 240), createCoin(8550 * S, 160));
      coins.push(createCoin(8800 * S, 240), createCoin(9050 * S, 320), createCoin(9300 * S, 400));
      for (let x = 9400 * S; x < 15000 * S; x += 120 * S) coins.push(createCoin(x, 500));
      for (let x = 15400 * S; x < 19000 * S; x += 120 * S) coins.push(createCoin(x, 480));
      for (let x = 19400 * S; x < 25700 * S; x += 120 * S) coins.push(createCoin(x, 500));
      coins.push(createCoin(26100 * S, 400), createCoin(26350 * S, 320), createCoin(26600 * S, 240), createCoin(26850 * S, 160));
      coins.push(createCoin(27100 * S, 240), createCoin(27350 * S, 320), createCoin(27600 * S, 400));
      for (let x = 27650 * S; x < 30000 * S; x += 120 * S) coins.push(createCoin(x, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(600 * S, 490, 'mushroom'), createQB(1800 * S, 490, 'flower'), createQB(3000 * S, 490, 'coin'),
        createQB(4200 * S, 490, 'star'), createQB(5400 * S, 490, 'mushroom'), createQB(6600 * S, 490, 'flower'),
        createQB(8050 * S, 180, 'star'), createQB(10500 * S, 490, 'mushroom'), createQB(12600 * S, 490, 'flower'),
        createQB(16000 * S, 430, 'coin'), createQB(18000 * S, 490, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(2400 * S, 510, 'ghost'), createEnemy(4800 * S, 510, 'boo'), createEnemy(7200 * S, 510, 'koopa'),
        createEnemy(8300 * S, 200, 'ghost'), createEnemy(10800 * S, 510, 'boo'), createEnemy(13200 * S, 510, 'ghost'),
        createEnemy(15600 * S, 510, 'boo'), createEnemy(18000 * S, 510, 'koopa'), createEnemy(20400 * S, 510, 'ghost'),
        createEnemy(22800 * S, 510, 'boo'), createEnemy(25200 * S, 510, 'ghost'), createEnemy(26850 * S, 200, 'boo'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      return [
        createDeco(200 * S, 510, 'cobweb'), createDeco(2400 * S, 460, 'bat'), createDeco(4800 * S, 460, 'tombstone'),
        createDeco(7200 * S, 460, 'web'), createDeco(9600 * S, 460, 'ghost'), createDeco(12000 * S, 460, 'cobweb'),
        createDeco(14400 * S, 460, 'bat'), createDeco(16800 * S, 460, 'tombstone'), createDeco(19200 * S, 460, 'web'),
        createDeco(21600 * S, 460, 'ghost'), createDeco(24000 * S, 460, 'cobweb'), createDeco(26400 * S, 460, 'bat'),
        createDeco(28800 * S, 460, 'tombstone'),
      ];
    })(),
    playerStart: { x: 150, y: 510 },
    goal: { x: 18750 - 500, y: 498 },
    timeBonus: 165,
  },
  {
    id: 62, name: "Phantom Foyer", width: 19460, height: 650, biome: 'haunted-mansion',
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      plats.push(...bridgeSection(S, 100, 610, 60));
      plats.push(...verticalShaft(S, 9100, 610));
      plats.push(...bridgeSection(S, 10600, 610, 50));
      plats.push(...ghostPlatforms(S, 18100, 610, 25));
      plats.push(...bridgeSection(S, 23100, 610, 50));
      plats.push(...verticalShaft(S, 30600, 610));
      plats.push(...bridgeSection(S, 32100, 610, 20));
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      const coins: any[] = [];
      for (let x = 200 * S; x < 9000 * S; x += 120 * S) coins.push(createCoin(x, 550));
      coins.push(createCoin(9200 * S, 450), createCoin(9450 * S, 370), createCoin(9700 * S, 290), createCoin(9950 * S, 210));
      coins.push(createCoin(10200 * S, 290), createCoin(10450 * S, 370), createCoin(10700 * S, 450));
      for (let x = 10800 * S; x < 17900 * S; x += 120 * S) coins.push(createCoin(x, 550));
      for (let x = 18300 * S; x < 22900 * S; x += 120 * S) coins.push(createCoin(x, 530));
      for (let x = 23300 * S; x < 30400 * S; x += 120 * S) coins.push(createCoin(x, 550));
      coins.push(createCoin(30750 * S, 450), createCoin(31000 * S, 370), createCoin(31250 * S, 290), createCoin(31500 * S, 210));
      coins.push(createCoin(31750 * S, 290), createCoin(32000 * S, 370), createCoin(32250 * S, 450));
      for (let x = 32300 * S; x < 35000 * S; x += 120 * S) coins.push(createCoin(x, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(800 * S, 540, 'mushroom'), createQB(2200 * S, 540, 'flower'), createQB(3600 * S, 540, 'coin'),
        createQB(5000 * S, 540, 'star'), createQB(6400 * S, 540, 'mushroom'), createQB(7800 * S, 540, 'flower'),
        createQB(9450 * S, 240, 'star'), createQB(12000 * S, 540, 'mushroom'), createQB(14400 * S, 540, 'flower'),
        createQB(19200 * S, 490, 'coin'), createQB(21600 * S, 540, 'star'), createQB(26400 * S, 540, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(3000 * S, 510, 'ghost'), createEnemy(4200 * S, 510, 'goomba'), createEnemy(5400 * S, 510, 'crab'),
        createEnemy(6600 * S, 510, 'boo'), createEnemy(7800 * S, 510, 'koopa'), createEnemy(9000 * S, 510, 'spiny'),
        createEnemy(9950 * S, 200, 'ghost'), createEnemy(12000 * S, 510, 'boo'), createEnemy(14000 * S, 510, 'goomba'),
        createEnemy(16000 * S, 510, 'ghost'), createEnemy(18000 * S, 510, 'crab'), createEnemy(20000 * S, 510, 'boo'),
        createEnemy(22000 * S, 510, 'koopa'), createEnemy(24000 * S, 510, 'spiny'), createEnemy(26000 * S, 510, 'ghost'),
        createEnemy(28000 * S, 510, 'fireball'), createEnemy(31250 * S, 200, 'boo'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(300 * S, 560, 'cobweb'), createDeco(3000 * S, 510, 'bat'), createDeco(6000 * S, 510, 'tombstone'),
        createDeco(9000 * S, 510, 'web'), createDeco(12000 * S, 510, 'ghost'), createDeco(15000 * S, 510, 'cobweb'),
        createDeco(18000 * S, 510, 'bat'), createDeco(21000 * S, 510, 'tombstone'), createDeco(24000 * S, 510, 'web'),
        createDeco(27000 * S, 510, 'ghost'), createDeco(30000 * S, 510, 'cobweb'), createDeco(33000 * S, 510, 'bat'),
      ];
    })(),
    playerStart: { x: 150, y: 510 },
    goal: { x: 19460 - 500, y: 548 },
    timeBonus: 180,
  },
  {
    id: 63, name: "Spooky Stairs", width: 20000, height: 680, biome: 'haunted-mansion',
    platforms: (() => {
      const S = 0.5;
      const plats: any[] = [];
      plats.push(...bridgeSection(S, 100, 640, 70));
      plats.push(...verticalShaft(S, 10500, 640));
      plats.push(...bridgeSection(S, 12000, 640, 60));
      plats.push(...ghostPlatforms(S, 21000, 640, 30));
      plats.push(...bridgeSection(S, 27000, 640, 60));
      plats.push(...verticalShaft(S, 36000, 640));
      plats.push(...bridgeSection(S, 37500, 640, 17));
      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      const coins: any[] = [];
      for (let x = 200 * S; x < 10400 * S; x += 120 * S) coins.push(createCoin(x, 580));
      coins.push(createCoin(10600 * S, 480), createCoin(10850 * S, 400), createCoin(11100 * S, 320), createCoin(11350 * S, 240));
      coins.push(createCoin(11600 * S, 320), createCoin(11850 * S, 400), createCoin(12100 * S, 480));
      for (let x = 12200 * S; x < 20800 * S; x += 120 * S) coins.push(createCoin(x, 580));
      for (let x = 21200 * S; x < 26800 * S; x += 120 * S) coins.push(createCoin(x, 560));
      for (let x = 27200 * S; x < 35800 * S; x += 120 * S) coins.push(createCoin(x, 580));
      coins.push(createCoin(36100 * S, 480), createCoin(36350 * S, 400), createCoin(36600 * S, 320), createCoin(36850 * S, 240));
      coins.push(createCoin(37100 * S, 320), createCoin(37350 * S, 400), createCoin(37600 * S, 480));
      for (let x = 37700 * S; x < 40000 * S; x += 120 * S) coins.push(createCoin(x, 580));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(1000 * S, 570, 'mushroom'), createQB(2600 * S, 570, 'flower'), createQB(4200 * S, 570, 'coin'),
        createQB(5800 * S, 570, 'star'), createQB(7400 * S, 570, 'mushroom'), createQB(9000 * S, 570, 'flower'),
        createQB(10850 * S, 270, 'star'), createQB(14000 * S, 570, 'mushroom'), createQB(16800 * S, 570, 'flower'),
        createQB(22400 * S, 510, 'coin'), createQB(25200 * S, 570, 'star'), createQB(30400 * S, 570, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(3600 * S, 530, 'ghost'), createEnemy(4800 * S, 530, 'goomba'), createEnemy(6000 * S, 530, 'crab'),
        createEnemy(7200 * S, 530, 'boo'), createEnemy(8400 * S, 530, 'koopa'), createEnemy(9600 * S, 530, 'spiny'),
        createEnemy(10800 * S, 530, 'fireball'), createEnemy(11350 * S, 230, 'ghost'), createEnemy(13200 * S, 530, 'boo'),
        createEnemy(15000 * S, 530, 'goomba'), createEnemy(16800 * S, 530, 'crab'), createEnemy(18600 * S, 530, 'ghost'),
        createEnemy(20400 * S, 530, 'boo'), createEnemy(22200 * S, 530, 'koopa'), createEnemy(24000 * S, 530, 'spiny'),
        createEnemy(25800 * S, 530, 'fireball'), createEnemy(36650 * S, 230, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      return [
        createDeco(400 * S, 590, 'cobweb'), createDeco(3600 * S, 540, 'bat'), createDeco(7200 * S, 540, 'tombstone'),
        createDeco(10800 * S, 540, 'web'), createDeco(14400 * S, 540, 'ghost'), createDeco(18000 * S, 540, 'cobweb'),
        createDeco(21600 * S, 540, 'bat'), createDeco(25200 * S, 540, 'tombstone'), createDeco(28800 * S, 540, 'web'),
        createDeco(32400 * S, 540, 'ghost'), createDeco(36000 * S, 540, 'cobweb'), createDeco(38400 * S, 540, 'bat'),
      ];
    })(),
    playerStart: { x: 150, y: 530 },
    goal: { x: 20000 - 500, y: 578 },
    timeBonus: 195,
  },
  {
    id: 64, name: "Curse Corridor", width: 19536, height: 700, biome: 'haunted-mansion',
    platforms: (() => {
      const S = 0.444;
      const plats: any[] = [];
      plats.push(...bridgeSection(S, 100, 660, 80));
      plats.push(...verticalShaft(S, 12000, 660));
      plats.push(...bridgeSection(S, 13500, 660, 70));
      plats.push(...ghostPlatforms(S, 24000, 660, 35));
      plats.push(...bridgeSection(S, 31000, 660, 70));
      plats.push(...verticalShaft(S, 41500, 660));
      plats.push(...bridgeSection(S, 43000, 660, 14));
      return plats;
    })(),
    coins: (() => {
      const S = 0.444;
      const coins: any[] = [];
      for (let x = 200 * S; x < 11900 * S; x += 120 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(12100 * S, 500), createCoin(12350 * S, 420), createCoin(12600 * S, 340), createCoin(12850 * S, 260));
      coins.push(createCoin(13100 * S, 340), createCoin(13350 * S, 420), createCoin(13600 * S, 500));
      for (let x = 13700 * S; x < 23800 * S; x += 120 * S) coins.push(createCoin(x, 600));
      for (let x = 24200 * S; x < 30800 * S; x += 120 * S) coins.push(createCoin(x, 580));
      for (let x = 31200 * S; x < 41300 * S; x += 120 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(41600 * S, 500), createCoin(41850 * S, 420), createCoin(42100 * S, 340), createCoin(42350 * S, 260));
      coins.push(createCoin(42600 * S, 340), createCoin(42850 * S, 420), createCoin(43100 * S, 500));
      for (let x = 43200 * S; x < 45000 * S; x += 120 * S) coins.push(createCoin(x, 600));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.444;
      return [
        createQB(1200 * S, 590, 'mushroom'), createQB(3000 * S, 590, 'flower'), createQB(4800 * S, 590, 'coin'),
        createQB(6600 * S, 590, 'star'), createQB(8400 * S, 590, 'mushroom'), createQB(10200 * S, 590, 'flower'),
        createQB(12350 * S, 290, 'star'), createQB(16000 * S, 590, 'mushroom'), createQB(19200 * S, 590, 'flower'),
        createQB(25600 * S, 530, 'coin'), createQB(28800 * S, 590, 'star'), createQB(34400 * S, 590, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.444;
      return [
        createEnemy(4200 * S, 550, 'ghost'), createEnemy(5400 * S, 550, 'goomba'), createEnemy(6600 * S, 550, 'crab'),
        createEnemy(7800 * S, 550, 'boo'), createEnemy(9000 * S, 550, 'koopa'), createEnemy(10200 * S, 550, 'spiny'),
        createEnemy(11400 * S, 550, 'fireball'), createEnemy(12600 * S, 550, 'ghost'), createEnemy(12850 * S, 250, 'boo'),
        createEnemy(14400 * S, 550, 'goomba'), createEnemy(16200 * S, 550, 'crab'), createEnemy(18000 * S, 550, 'ghost'),
        createEnemy(19800 * S, 550, 'boo'), createEnemy(21600 * S, 550, 'koopa'), createEnemy(23400 * S, 550, 'spiny'),
        createEnemy(42100 * S, 250, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.444;
      return [
        createDeco(500 * S, 610, 'cobweb'), createDeco(4200 * S, 560, 'bat'), createDeco(8400 * S, 560, 'tombstone'),
        createDeco(12600 * S, 560, 'web'), createDeco(16800 * S, 560, 'ghost'), createDeco(21000 * S, 560, 'cobweb'),
        createDeco(25200 * S, 560, 'bat'), createDeco(29400 * S, 560, 'tombstone'), createDeco(33600 * S, 560, 'web'),
        createDeco(37800 * S, 560, 'ghost'), createDeco(42000 * S, 560, 'cobweb'), createDeco(44400 * S, 560, 'bat'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19536 - 500, y: 598 },
    timeBonus: 210,
  },
  {
    id: 65, name: "Banshee Barracks", width: 20016, height: 650, biome: 'haunted-mansion',
    platforms: (() => {
      const S = 0.417;
      const plats: any[] = [];
      plats.push(...bridgeSection(S, 100, 610, 85));
      plats.push(...verticalShaft(S, 12750, 610));
      plats.push(...bridgeSection(S, 14250, 610, 75));
      plats.push(...ghostPlatforms(S, 25500, 610, 40));
      plats.push(...bridgeSection(S, 33500, 610, 75));
      plats.push(...verticalShaft(S, 44750, 610));
      plats.push(...bridgeSection(S, 46250, 610, 12));
      return plats;
    })(),
    coins: (() => {
      const S = 0.417;
      const coins: any[] = [];
      for (let x = 200 * S; x < 12650 * S; x += 120 * S) coins.push(createCoin(x, 550));
      coins.push(createCoin(12850 * S, 450), createCoin(13100 * S, 370), createCoin(13350 * S, 290), createCoin(13600 * S, 210));
      coins.push(createCoin(13850 * S, 290), createCoin(14100 * S, 370), createCoin(14350 * S, 450));
      for (let x = 14450 * S; x < 25300 * S; x += 120 * S) coins.push(createCoin(x, 550));
      for (let x = 25700 * S; x < 33300 * S; x += 120 * S) coins.push(createCoin(x, 530));
      for (let x = 33700 * S; x < 44550 * S; x += 120 * S) coins.push(createCoin(x, 550));
      coins.push(createCoin(44850 * S, 450), createCoin(45100 * S, 370), createCoin(45350 * S, 290), createCoin(45600 * S, 210));
      coins.push(createCoin(45850 * S, 290), createCoin(46100 * S, 370), createCoin(46350 * S, 450));
      for (let x = 46450 * S; x < 48000 * S; x += 120 * S) coins.push(createCoin(x, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.417;
      return [
        createQB(1400 * S, 540, 'mushroom'), createQB(3400 * S, 540, 'flower'), createQB(5400 * S, 540, 'coin'),
        createQB(7400 * S, 540, 'star'), createQB(9400 * S, 540, 'mushroom'), createQB(11400 * S, 540, 'flower'),
        createQB(13100 * S, 240, 'star'), createQB(18000 * S, 540, 'mushroom'), createQB(21600 * S, 540, 'flower'),
        createQB(28800 * S, 480, 'coin'), createQB(32400 * S, 540, 'star'), createQB(38400 * S, 540, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.417;
      return [
        createEnemy(4800 * S, 510, 'ghost'), createEnemy(6000 * S, 510, 'goomba'), createEnemy(7200 * S, 510, 'crab'),
        createEnemy(8400 * S, 510, 'boo'), createEnemy(9600 * S, 510, 'koopa'), createEnemy(10800 * S, 510, 'spiny'),
        createEnemy(12000 * S, 510, 'fireball'), createEnemy(13200 * S, 510, 'ghost'), createEnemy(14400 * S, 510, 'boo'),
        createEnemy(15600 * S, 510, 'goomba'), createEnemy(16800 * S, 510, 'crab'), createEnemy(18000 * S, 510, 'ghost'),
        createEnemy(19200 * S, 510, 'boo'), createEnemy(20400 * S, 510, 'koopa'), createEnemy(21600 * S, 510, 'spiny'),
        createEnemy(22800 * S, 510, 'fireball'), createEnemy(45350 * S, 200, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.417;
      return [
        createDeco(600 * S, 560, 'cobweb'), createDeco(4800 * S, 510, 'bat'), createDeco(9600 * S, 510, 'tombstone'),
        createDeco(14400 * S, 510, 'web'), createDeco(19200 * S, 510, 'ghost'), createDeco(24000 * S, 510, 'cobweb'),
        createDeco(28800 * S, 510, 'bat'), createDeco(33600 * S, 510, 'tombstone'), createDeco(38400 * S, 510, 'web'),
        createDeco(43200 * S, 510, 'ghost'), createDeco(45600 * S, 510, 'cobweb'), createDeco(47400 * S, 510, 'bat'),
      ];
    })(),
    playerStart: { x: 150, y: 510 },
    goal: { x: 20016 - 500, y: 548 },
    timeBonus: 215,
  },
  {
    id: 66, name: "Crypt Keeper", width: 20000, height: 700, biome: 'haunted-mansion',
    platforms: (() => {
      const S = 0.4;
      const plats: any[] = [];
      plats.push(...bridgeSection(S, 100, 660, 90));
      plats.push(...verticalShaft(S, 13500, 660));
      plats.push(...bridgeSection(S, 15000, 660, 80));
      plats.push(...ghostPlatforms(S, 27000, 660, 45));
      plats.push(...bridgeSection(S, 36000, 660, 80));
      plats.push(...verticalShaft(S, 48000, 660));
      plats.push(...bridgeSection(S, 49500, 660, 4));
      return plats;
    })(),
    coins: (() => {
      const S = 0.4;
      const coins: any[] = [];
      for (let x = 200 * S; x < 13400 * S; x += 120 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(13600 * S, 500), createCoin(13850 * S, 420), createCoin(14100 * S, 340), createCoin(14350 * S, 260));
      coins.push(createCoin(14600 * S, 340), createCoin(14850 * S, 420), createCoin(15100 * S, 500));
      for (let x = 15200 * S; x < 26800 * S; x += 120 * S) coins.push(createCoin(x, 600));
      for (let x = 27200 * S; x < 35800 * S; x += 120 * S) coins.push(createCoin(x, 580));
      for (let x = 36200 * S; x < 47800 * S; x += 120 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(48100 * S, 500), createCoin(48350 * S, 420), createCoin(48600 * S, 340), createCoin(48850 * S, 260));
      coins.push(createCoin(49100 * S, 340), createCoin(49350 * S, 420), createCoin(49600 * S, 500));
      for (let x = 49700 * S; x < 50000 * S; x += 120 * S) coins.push(createCoin(x, 600));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.4;
      return [
        createQB(1600 * S, 590, 'mushroom'), createQB(3800 * S, 590, 'flower'), createQB(6000 * S, 590, 'coin'),
        createQB(8200 * S, 590, 'star'), createQB(10400 * S, 590, 'mushroom'), createQB(12600 * S, 590, 'flower'),
        createQB(13850 * S, 290, 'star'), createQB(20000 * S, 590, 'mushroom'), createQB(24000 * S, 590, 'flower'),
        createQB(32000 * S, 520, 'coin'), createQB(36000 * S, 590, 'star'), createQB(42400 * S, 590, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.4;
      return [
        createEnemy(5400 * S, 550, 'ghost'), createEnemy(6600 * S, 550, 'goomba'), createEnemy(7800 * S, 550, 'crab'),
        createEnemy(9000 * S, 550, 'boo'), createEnemy(10200 * S, 550, 'koopa'), createEnemy(11400 * S, 550, 'spiny'),
        createEnemy(12600 * S, 550, 'fireball'), createEnemy(13800 * S, 550, 'ghost'), createEnemy(15000 * S, 550, 'boo'),
        createEnemy(16200 * S, 550, 'goomba'), createEnemy(17400 * S, 550, 'crab'), createEnemy(18600 * S, 550, 'ghost'),
        createEnemy(19800 * S, 550, 'boo'), createEnemy(21000 * S, 550, 'koopa'), createEnemy(22200 * S, 550, 'spiny'),
        createEnemy(23400 * S, 550, 'fireball'), createEnemy(48850 * S, 250, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.4;
      return [
        createDeco(700 * S, 610, 'cobweb'), createDeco(5400 * S, 560, 'bat'), createDeco(10800 * S, 560, 'tombstone'),
        createDeco(16200 * S, 560, 'web'), createDeco(21600 * S, 560, 'ghost'), createDeco(27000 * S, 560, 'cobweb'),
        createDeco(32400 * S, 560, 'bat'), createDeco(37800 * S, 560, 'tombstone'), createDeco(43200 * S, 560, 'web'),
        createDeco(48600 * S, 560, 'ghost'), createDeco(49300 * S, 560, 'cobweb'), createDeco(49700 * S, 560, 'bat'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 20000 - 500, y: 598 },
    timeBonus: 220,
  },
];
