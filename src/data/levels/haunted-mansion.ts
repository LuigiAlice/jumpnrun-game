// Haunted Mansion World - 6 Levels (61-66) - Long Horizontal Side-Scrolling Structure
// Width: 30000-50000px, Height: 600-700px, 70-80% ground / 20-30% vertical

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco } from './helpers';

const ghostPlatforms = (S: number, startX: number, baseY: number, count: number): any[] => {
  const plats = [];
  for (let i = 0; i < count; i++) {
    const px = (startX + i * 180) * S; // Reduced from 200 to 180 for jump safety
    const py = baseY - 80 - (i % 4) * 50; // Reduced height variation
    const pw = (100 + (i % 3) * 30) * S;
    const ptype = i % 3 === 0 ? 'platform_easy' : (i % 3 === 1 ? 'platform_medium' : 'platform_hard');
    plats.push(createPlat(px, py, pw, 28, ptype));
  }
  return plats;
};

const verticalShaft = (S: number, startX: number, baseY: number): any[] => {
  const plats = [];
  plats.push(createPlat(startX * S, baseY - 100, 150 * S, 40, 'brick'));
  plats.push(createPlat((startX + 180) * S, baseY - 180, 120 * S, 28, 'platform_medium'));
  plats.push(createPlat((startX + 360) * S, baseY - 260, 120 * S, 28, 'platform_hard'));
  plats.push(createPlat((startX + 540) * S, baseY - 340, 180 * S, 40, 'brick'));
  plats.push(createPlat((startX + 720) * S, baseY - 280, 120 * S, 28, 'platform_hard'));
  plats.push(createPlat((startX + 900) * S, baseY - 200, 120 * S, 28, 'platform_medium'));
  plats.push(createPlat((startX + 1080) * S, baseY - 120, 150 * S, 28, 'platform_easy'));
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
      return [
        createCoin(500 * S, 500), createCoin(1500 * S, 460), createCoin(3000 * S, 400),
        createCoin(5000 * S, 340), createCoin(7000 * S, 280), createCoin(9000 * S, 240),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(800 * S, 460, 'mushroom'), createQB(2000 * S, 380, 'flower'),
        createQB(3500 * S, 300, 'star'), createQB(5500 * S, 260, 'mushroom'),
        createQB(7500 * S, 240, 'flower'), createQB(9500 * S, 220, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(1000 * S, 510, 'boo'), createEnemy(2500 * S, 460, 'ghost'),
        createEnemy(4000 * S, 380, 'boo'), createEnemy(6000 * S, 320, 'ghost'),
        createEnemy(8000 * S, 280, 'boo'), createEnemy(10000 * S, 240, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      return [
        createDeco(700 * S, 480, 'cobweb'), createDeco(2200 * S, 420, 'tombstone'),
        createDeco(3800 * S, 360, 'web'), createDeco(5500 * S, 300, 'ghost'),
        createDeco(7200 * S, 260, 'cobweb'), createDeco(9000 * S, 220, 'tombstone'),
      ];
    })(),
    playerStart: { x: 150, y: 510 },
    goal: { x: 18000, y: 498 },
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
      return [
        createCoin(500 * S, 540), createCoin(1600 * S, 480), createCoin(3200 * S, 420),
        createCoin(5400 * S, 360), createCoin(7500 * S, 300), createCoin(9700 * S, 260),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(800 * S, 500, 'mushroom'), createQB(2100 * S, 420, 'flower'),
        createQB(3700 * S, 340, 'star'), createQB(5800 * S, 280, 'mushroom'),
        createQB(7900 * S, 260, 'flower'), createQB(10000 * S, 240, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(1000 * S, 560, 'boo'), createEnemy(2600 * S, 500, 'ghost'),
        createEnemy(4300 * S, 420, 'boo'), createEnemy(6400 * S, 360, 'ghost'),
        createEnemy(8500 * S, 300, 'boo'), createEnemy(10600 * S, 260, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(700 * S, 520, 'cobweb'), createDeco(2300 * S, 460, 'tombstone'),
        createDeco(4000 * S, 400, 'web'), createDeco(5800 * S, 340, 'ghost'),
        createDeco(7600 * S, 280, 'cobweb'), createDeco(9500 * S, 240, 'tombstone'),
      ];
    })(),
    playerStart: { x: 150, y: 510 },
    goal: { x: 18000, y: 548 },
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
      return [
        createCoin(500 * S, 570), createCoin(1700 * S, 510), createCoin(3400 * S, 450),
        createCoin(5600 * S, 390), createCoin(7800 * S, 330), createCoin(10000 * S, 290),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(900 * S, 530, 'mushroom'), createQB(2300 * S, 450, 'flower'),
        createQB(4000 * S, 370, 'star'), createQB(6200 * S, 310, 'mushroom'),
        createQB(8400 * S, 290, 'flower'), createQB(10600 * S, 270, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(1100 * S, 590, 'boo'), createEnemy(2800 * S, 530, 'ghost'),
        createEnemy(4600 * S, 450, 'boo'), createEnemy(6800 * S, 390, 'ghost'),
        createEnemy(9000 * S, 330, 'boo'), createEnemy(11200 * S, 290, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      return [
        createDeco(800 * S, 550, 'cobweb'), createDeco(2500 * S, 490, 'tombstone'),
        createDeco(4300 * S, 430, 'web'), createDeco(6200 * S, 370, 'ghost'),
        createDeco(8100 * S, 310, 'cobweb'), createDeco(10000 * S, 270, 'tombstone'),
      ];
    })(),
    playerStart: { x: 150, y: 530 },
    goal: { x: 19000, y: 578 },
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
      return [
        createCoin(600 * S, 590), createCoin(1900 * S, 530), createCoin(3800 * S, 470),
        createCoin(6300 * S, 410), createCoin(8700 * S, 350), createCoin(11000 * S, 310),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.444;
      return [
        createQB(1000 * S, 550, 'mushroom'), createQB(2600 * S, 470, 'flower'),
        createQB(4400 * S, 390, 'star'), createQB(6800 * S, 330, 'mushroom'),
        createQB(9200 * S, 310, 'flower'), createQB(11600 * S, 290, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.444;
      return [
        createEnemy(1200 * S, 620, 'boo'), createEnemy(3100 * S, 560, 'ghost'),
        createEnemy(5100 * S, 480, 'boo'), createEnemy(7500 * S, 420, 'ghost'),
        createEnemy(9900 * S, 360, 'boo'), createEnemy(12000 * S, 310, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.444;
      return [
        createDeco(900 * S, 580, 'cobweb'), createDeco(2800 * S, 520, 'tombstone'),
        createDeco(4800 * S, 460, 'web'), createDeco(7000 * S, 400, 'ghost'),
        createDeco(9200 * S, 340, 'cobweb'), createDeco(11400 * S, 290, 'tombstone'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19000, y: 598 },
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
      return [
        createCoin(600 * S, 540), createCoin(2000 * S, 480), createCoin(4000 * S, 420),
        createCoin(6600 * S, 360), createCoin(9100 * S, 300), createCoin(11600 * S, 260),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.417;
      return [
        createQB(1000 * S, 500, 'mushroom'), createQB(2700 * S, 420, 'flower'),
        createQB(4600 * S, 340, 'star'), createQB(7100 * S, 280, 'mushroom'),
        createQB(9600 * S, 260, 'flower'), createQB(12100 * S, 240, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.417;
      return [
        createEnemy(1300 * S, 560, 'boo'), createEnemy(3300 * S, 500, 'ghost'),
        createEnemy(5300 * S, 420, 'boo'), createEnemy(7800 * S, 360, 'ghost'),
        createEnemy(10300 * S, 300, 'boo'), createEnemy(12600 * S, 260, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.417;
      return [
        createDeco(900 * S, 520, 'cobweb'), createDeco(2900 * S, 460, 'tombstone'),
        createDeco(5000 * S, 400, 'web'), createDeco(7400 * S, 340, 'ghost'),
        createDeco(9700 * S, 280, 'cobweb'), createDeco(12000 * S, 240, 'tombstone'),
      ];
    })(),
    playerStart: { x: 150, y: 510 },
    goal: { x: 19500, y: 548 },
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
      return [
        createCoin(600 * S, 590), createCoin(2100 * S, 530), createCoin(4200 * S, 470),
        createCoin(7000 * S, 410), createCoin(9600 * S, 350), createCoin(12000 * S, 310),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.4;
      return [
        createQB(1100 * S, 550, 'mushroom'), createQB(2900 * S, 470, 'flower'),
        createQB(4900 * S, 390, 'star'), createQB(7500 * S, 330, 'mushroom'),
        createQB(10200 * S, 310, 'flower'), createQB(12700 * S, 290, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.4;
      return [
        createEnemy(1400 * S, 620, 'boo'), createEnemy(3500 * S, 560, 'ghost'),
        createEnemy(5700 * S, 480, 'boo'), createEnemy(8300 * S, 420, 'ghost'),
        createEnemy(10900 * S, 360, 'boo'), createEnemy(13200 * S, 310, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.4;
      return [
        createDeco(1000 * S, 580, 'cobweb'), createDeco(3100 * S, 520, 'tombstone'),
        createDeco(5300 * S, 460, 'web'), createDeco(7900 * S, 400, 'ghost'),
        createDeco(10400 * S, 340, 'cobweb'), createDeco(12800 * S, 290, 'tombstone'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19500, y: 598 },
    timeBonus: 220,
  },
];