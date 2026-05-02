// Haunted Mansion World - 6 Levels (61-66)
// Distinct structures: Tutorial, Gap-Strecke, Röhren-Labyrinth, Vertikal-Kletterer, Gegner-Horde, Geister-Verfolgung Finale
// Stone/Brick theme with haunted decorations: cobweb, tombstone, ghost, web

import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat, gapWithPlatforms, pipeSection, verticalClimb } from './helpers';

// ---- Local helpers ----

const ghostPlatforms = (S: number, startX: number, baseY: number, count: number): any[] => {
  const plats = [];
  for (let i = 0; i < count; i++) {
    const px = (startX + i * 180) * S;
    const py = baseY - 80 - (i % 4) * 50;
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
  // ================== LEVEL 61 – Tutorial – S=0.556 ==================
  {
    id: 61, name: "Ghost Hall", width: 12500, height: 600, biome: 'haunted-mansion',
    platforms: (() => {
      const S = 0.556; const baseY = 560;
      const plats: any[] = [];
      plats.push(...bridgeSection(S, 100, baseY, 50));          // 56 → 4142
      plats.push(...verticalShaft(S, 7700, baseY));              // 4278 → 4880
      plats.push(...bridgeSection(S, 9200, baseY, 35));          // 5115 → 7949
      plats.push(...ghostPlatforms(S, 14800, baseY, 8));         // 8229 → 8929
      plats.push(...bridgeSection(S, 16800, baseY, 35));         // 9341 → 12176
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      return [
        createCoin(400 * S, 500),  createCoin(900 * S, 500),
        createCoin(1500 * S, 490), createCoin(2500 * S, 450),
        createCoin(4500 * S, 200), // vertical shaft peak
        createCoin(6000 * S, 500), createCoin(7500 * S, 500),
        createCoin(8800 * S, 400), // ghost platform area
        createCoin(10000 * S, 500), createCoin(11500 * S, 490),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(600 * S, 440, 'mushroom'),
        createQB(2200 * S, 420, 'flower'),
        createQB(5000 * S, 420, 'star'),
        createQB(7000 * S, 440, 'mushroom'),
        createQB(10000 * S, 440, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(1500 * S, 520, 'ghost'),
        createEnemy(3500 * S, 520, 'ghost'),
        createEnemy(6500 * S, 520, 'boo'),
        createEnemy(10500 * S, 520, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(300 * S, 480, 'cobweb'),   createDeco(1200 * S, 480, 'tombstone'),
        createDeco(2600 * S, 470, 'web'),       createDeco(5600 * S, 480, 'ghost'),
        createDeco(6400 * S, 470, 'cobweb'),    createDeco(8300 * S, 400, 'tombstone'),
        createDeco(9800 * S, 480, 'web'),       createDeco(11000 * S, 480, 'ghost'),
      ];
    })(),
    playerStart: { x: 83, y: 510 },
    goal: { x: 11800, y: 538 },
    timeBonus: 150,
    movingPlatforms: [
      createMovingPlat(5000, 440, 120, 24, 'platform_medium', 'horizontal', 200, 18),
      createMovingPlat(8700, 460, 100, 22, 'platform_easy', 'horizontal', 160, 22),
    ],
  },

  // ================== LEVEL 62 – Gap-Strecke – S=0.526 ==================
  {
    id: 62, name: "Phantom Foyer", width: 16800, height: 600, biome: 'haunted-mansion',
    platforms: (() => {
      const S = 0.526; const baseY = 560;
      const plats: any[] = [];
      plats.push(...bridgeSection(S, 100, baseY, 30));            // 53 → 2341
      plats.push(...gapWithPlatforms(S, 4700, baseY, 2500, 3));   // 2735 → 3419
      plats.push(...bridgeSection(S, 7200, baseY, 20));            // 3787 → 5360
      plats.push(...gapWithPlatforms(S, 10500, baseY, 2800, 4));   // 5781 → 6699
      plats.push(...bridgeSection(S, 13300, baseY, 20));           // 6996 → 8569
      plats.push(...gapWithPlatforms(S, 16600, baseY, 2400, 4));   // 8996 → 9725
      plats.push(...bridgeSection(S, 19400, baseY, 25));           // 10204 → 12093
      plats.push(...gapWithPlatforms(S, 23600, baseY, 2400, 4));   // 12666 → 13474
      plats.push(...bridgeSection(S, 26800, baseY, 30));           // 14097 → 16367
      return plats;
    })(),
    coins: (() => {
      const S = 0.526;
      return [
        createCoin(300 * S, 500),  createCoin(800 * S, 500),
        createCoin(1800 * S, 490), createCoin(3100 * S, 425), // over gap 1
        createCoin(4500 * S, 500), createCoin(5500 * S, 490),
        createCoin(6200 * S, 400), // over gap 2
        createCoin(7500 * S, 500), createCoin(8600 * S, 490),
        createCoin(9400 * S, 380), // over gap 3
        createCoin(11000 * S, 500), createCoin(12500 * S, 490),
        createCoin(13100 * S, 440), // over gap 4
        createCoin(14500 * S, 500), createCoin(15500 * S, 490),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.526;
      return [
        createQB(600 * S, 440, 'mushroom'),
        createQB(4000 * S, 420, 'flower'),
        createQB(5500 * S, 360, 'star'),
        createQB(8000 * S, 440, 'mushroom'),
        createQB(11500 * S, 440, 'coin'),
        createQB(15000 * S, 440, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.526;
      return [
        createEnemy(1000 * S, 520, 'ghost'),
        createEnemy(4000 * S, 520, 'goomba'),
        createEnemy(6000 * S, 520, 'boo'),
        createEnemy(8500 * S, 520, 'ghost'),
        createEnemy(11000 * S, 520, 'goomba'),
        createEnemy(15000 * S, 520, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.526;
      return [
        createDeco(200 * S, 480, 'cobweb'),    createDeco(1200 * S, 480, 'tombstone'),
        createDeco(3000 * S, 430, 'ghost'),     createDeco(5000 * S, 480, 'web'),
        createDeco(6500 * S, 410, 'cobweb'),    createDeco(8200 * S, 480, 'tombstone'),
        createDeco(9800 * S, 390, 'web'),       createDeco(11500 * S, 480, 'ghost'),
        createDeco(13200 * S, 450, 'tombstone'), createDeco(15500 * S, 480, 'cobweb'),
      ];
    })(),
    playerStart: { x: 79, y: 510 },
    goal: { x: 16300, y: 538 },
    timeBonus: 170,
    movingPlatforms: [
      createMovingPlat(5100, 420, 120, 24, 'platform_medium', 'horizontal', 220, 20),
      createMovingPlat(8900, 390, 120, 24, 'platform_medium', 'vertical', 160, 22),
      createMovingPlat(12300, 440, 120, 24, 'platform_medium', 'horizontal', 200, 24),
    ],
  },

  // ================== LEVEL 63 – Röhren-Labyrinth – S=0.5 ==================
  {
    id: 63, name: "Spooky Stairs", width: 20200, height: 620, biome: 'haunted-mansion',
    platforms: (() => {
      const S = 0.5; const baseY = 580;
      const plats: any[] = [];
      plats.push(...bridgeSection(S, 100, baseY, 20));            // 50 → 1475
      plats.push(...pipeSection(S, 3200, baseY, 5));              // 1750 → 2450
      plats.push(...bridgeSection(S, 5300, baseY, 18));           // 2650 → 3925
      plats.push(...pipeSection(S, 8400, baseY, 6));              // 4350 → 5225
      // Upper row of pipes
      plats.push(...pipeSection(S, 8800, baseY - 100, 4));        // 4550 → 5075 (at y=480)
      plats.push(...bridgeSection(S, 10600, baseY, 20));          // 5300 → 6725
      plats.push(...pipeSection(S, 14000, baseY, 5));             // 7150 → 7850
      plats.push(...bridgeSection(S, 16200, baseY, 15));          // 8100 → 9150
      plats.push(...pipeSection(S, 19000, baseY, 4));             // 9650 → 10175
      plats.push(...bridgeSection(S, 21000, baseY, 20));          // 10500 → 11925
      plats.push(...pipeSection(S, 24600, baseY, 6));             // 12450 → 13325
      plats.push(...bridgeSection(S, 27200, baseY, 22));          // 13600 → 15175
      // Lower pipe section near goal
      plats.push(...pipeSection(S, 31000, baseY, 4));             // 15650 → 16175
      plats.push(...bridgeSection(S, 33000, baseY, 25));          // 16500 → 18300
      plats.push(...pipeSection(S, 37200, baseY, 3));             // 18750 → 19100
      plats.push(...bridgeSection(S, 38800, baseY, 20));          // 19400 → 20825
      return plats;
    })(),
    coins: (() => {
      const S = 0.5;
      return [
        createCoin(300 * S, 520),  createCoin(700 * S, 520),
        createCoin(1200 * S, 510), createCoin(2100 * S, 470), // pipe top
        createCoin(3200 * S, 520), createCoin(4000 * S, 510),
        createCoin(4800 * S, 460), createCoin(5200 * S, 410), // upper pipes
        createCoin(6000 * S, 520), createCoin(7300 * S, 450), // pipe
        createCoin(8500 * S, 520), createCoin(9500 * S, 520),
        createCoin(10000 * S, 470), // pipe
        createCoin(11000 * S, 520), createCoin(12500 * S, 460),
        createCoin(14000 * S, 520), createCoin(16000 * S, 500), // pipe
        createCoin(17500 * S, 520), createCoin(19000 * S, 520),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.5;
      return [
        createQB(500 * S, 460, 'mushroom'),
        createQB(2800 * S, 440, 'flower'),
        createQB(4500 * S, 400, 'star'),
        createQB(6500 * S, 460, 'mushroom'),
        createQB(9000 * S, 460, 'coin'),
        createQB(12500 * S, 400, 'flower'),
        createQB(15000 * S, 460, 'star'),
        createQB(18000 * S, 460, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.5;
      return [
        createEnemy(800 * S, 540, 'ghost'),
        createEnemy(2100 * S, 540, 'piranha'),   // pipe 1
        createEnemy(3800 * S, 540, 'goomba'),
        createEnemy(4800 * S, 540, 'piranha'),    // pipe 2
        createEnemy(5100 * S, 440, 'piranha'),    // upper pipe
        createEnemy(6200 * S, 540, 'boo'),
        createEnemy(7400 * S, 540, 'piranha'),    // pipe 3
        createEnemy(8800 * S, 540, 'ghost'),
        createEnemy(10000 * S, 540, 'piranha'),   // pipe 4
        createEnemy(11500 * S, 540, 'goomba'),
        createEnemy(12700 * S, 540, 'piranha'),   // pipe 5
        createEnemy(15000 * S, 540, 'boo'),
        createEnemy(15900 * S, 540, 'piranha'),   // pipe 6
        createEnemy(19000 * S, 540, 'piranha'),   // pipe 7
      ];
    })(),
    decorations: (() => {
      const S = 0.5;
      return [
        createDeco(150 * S, 500, 'cobweb'),     createDeco(1000 * S, 500, 'tombstone'),
        createDeco(2000 * S, 480, 'web'),        createDeco(3500 * S, 500, 'ghost'),
        createDeco(4600 * S, 440, 'cobweb'),     createDeco(6000 * S, 500, 'tombstone'),
        createDeco(7200 * S, 480, 'web'),        createDeco(9000 * S, 500, 'ghost'),
        createDeco(9800 * S, 480, 'cobweb'),     createDeco(11500 * S, 500, 'tombstone'),
        createDeco(12800 * S, 480, 'web'),       createDeco(15000 * S, 500, 'ghost'),
        createDeco(17000 * S, 500, 'tombstone'), createDeco(19000 * S, 500, 'cobweb'),
      ];
    })(),
    playerStart: { x: 75, y: 530 },
    goal: { x: 19600, y: 558 },
    timeBonus: 190,
    movingPlatforms: [
      createMovingPlat(4000, 480, 120, 24, 'platform_medium', 'horizontal', 200, 20),
      createMovingPlat(8200, 430, 120, 24, 'platform_medium', 'vertical', 140, 18),
      createMovingPlat(13800, 460, 120, 24, 'platform_medium', 'horizontal', 250, 22),
      createMovingPlat(18400, 500, 120, 24, 'platform_medium', 'horizontal', 180, 20),
    ],
  },

  // ================== LEVEL 64 – Vertikal-Kletterer – S=0.476 ==================
  {
    id: 64, name: "Curse Corridor", width: 12000, height: 700, biome: 'haunted-mansion',
    platforms: (() => {
      const S = 0.476; const baseY = 640;
      const plats: any[] = [];
      plats.push(...bridgeSection(S, 100, baseY, 20));            // 48 → 1392
      plats.push(...verticalClimb(S, 3200, baseY, 'stone'));      // 1523 → 2372
      plats.push(...bridgeSection(S, 5200, baseY, 15));           // 2475 → 3494
      plats.push(...verticalClimb(S, 7800, baseY, 'brick'));      // 3713 → 4561
      plats.push(...bridgeSection(S, 9800, baseY, 15));           // 4665 → 5683
      plats.push(...verticalClimb(S, 12800, baseY, 'stone'));     // 6093 → 6941
      plats.push(...bridgeSection(S, 14800, baseY, 20));          // 7045 → 8433
      plats.push(...verticalClimb(S, 17800, baseY, 'brick'));     // 8473 → 9217
      plats.push(...bridgeSection(S, 20000, baseY, 22));          // 9520 → 11006
      return plats;
    })(),
    coins: (() => {
      const S = 0.476;
      return [
        createCoin(300 * S, 580),  createCoin(700 * S, 580),
        createCoin(1200 * S, 570),  // pre-climb 1
        createCoin(1800 * S, 530), createCoin(2100 * S, 430), // climb 1 mid
        createCoin(2300 * S, 310), // climb 1 top
        createCoin(3000 * S, 580), createCoin(3800 * S, 570),
        createCoin(4200 * S, 500), createCoin(4500 * S, 380), // climb 2
        createCoin(5200 * S, 580), createCoin(5800 * S, 570),
        createCoin(6300 * S, 500), createCoin(6800 * S, 380), // climb 3
        createCoin(7500 * S, 580), createCoin(8300 * S, 570),
        createCoin(8800 * S, 530), createCoin(9100 * S, 430), // climb 4
        createCoin(10000 * S, 580), createCoin(10800 * S, 570),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.476;
      return [
        createQB(500 * S, 520, 'mushroom'),
        createQB(1800 * S, 430, 'flower'),
        createQB(2500 * S, 440, 'star'),
        createQB(4200 * S, 400, 'mushroom'),
        createQB(5500 * S, 520, 'coin'),
        createQB(6500 * S, 400, 'flower'),
        createQB(8000 * S, 520, 'star'),
        createQB(9000 * S, 400, 'mushroom'),
        createQB(10500 * S, 520, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.476;
      return [
        createEnemy(1000 * S, 600, 'ghost'),
        createEnemy(2000 * S, 560, 'boo'),
        createEnemy(3400 * S, 600, 'goomba'),
        createEnemy(4300 * S, 400, 'ghost'),  // on climb 2 top
        createEnemy(5500 * S, 600, 'boo'),
        createEnemy(6500 * S, 400, 'ghost'),  // on climb 3 top
        createEnemy(7800 * S, 600, 'goomba'),
        createEnemy(8800 * S, 400, 'ghost'),  // on climb 4 top
        createEnemy(10200 * S, 600, 'boo'),
      ];
    })(),
    decorations: (() => {
      const S = 0.476;
      return [
        createDeco(200 * S, 560, 'cobweb'),     createDeco(800 * S, 560, 'tombstone'),
        createDeco(1600 * S, 520, 'web'),        createDeco(2000 * S, 440, 'ghost'),
        createDeco(2800 * S, 560, 'cobweb'),     createDeco(3800 * S, 520, 'tombstone'),
        createDeco(4400 * S, 420, 'web'),        createDeco(5000 * S, 560, 'ghost'),
        createDeco(6200 * S, 520, 'cobweb'),     createDeco(6800 * S, 420, 'tombstone'),
        createDeco(7800 * S, 560, 'web'),        createDeco(8600 * S, 520, 'ghost'),
        createDeco(10000 * S, 560, 'cobweb'),
      ];
    })(),
    playerStart: { x: 71, y: 590 },
    goal: { x: 11000, y: 618 },
    timeBonus: 200,
    movingPlatforms: [
      createMovingPlat(2600, 540, 120, 24, 'platform_medium', 'vertical', 180, 20),
      createMovingPlat(5400, 500, 120, 24, 'platform_medium', 'horizontal', 200, 22),
      createMovingPlat(8000, 540, 120, 24, 'platform_medium', 'vertical', 160, 20),
      createMovingPlat(10000, 500, 120, 24, 'platform_medium', 'horizontal', 220, 24),
    ],
  },

  // ================== LEVEL 65 – Gegner-Horde – S=0.455 ==================
  {
    id: 65, name: "Banshee Barracks", width: 13800, height: 650, biome: 'haunted-mansion',
    platforms: (() => {
      const S = 0.455; const baseY = 600;
      const plats: any[] = [];
      plats.push(...bridgeSection(S, 100, baseY, 40));            // 46 → 2740
      plats.push(...verticalShaft(S, 6300, baseY));               // 2867 → 3345
      plats.push(...bridgeSection(S, 7700, baseY, 30));           // 3504 → 5584
      plats.push(...ghostPlatforms(S, 13000, baseY, 15));         // 5915 → 7038
      plats.push(...bridgeSection(S, 15800, baseY, 35));          // 7189 → 9827
      plats.push(...verticalShaft(S, 22000, baseY));              // 10010 → 10489
      plats.push(...bridgeSection(S, 23400, baseY, 30));          // 10647 → 12626
      plats.push(...ghostPlatforms(S, 28000, baseY, 12));         // 12740 → 13676
      plats.push(...bridgeSection(S, 30500, baseY, 25));          // 13878 → 15487
      return plats;
    })(),
    coins: (() => {
      const S = 0.455;
      return [
        createCoin(300 * S, 540),  createCoin(700 * S, 540),
        createCoin(1200 * S, 530), createCoin(2000 * S, 540),
        createCoin(3000 * S, 200), // vertical shaft peak
        createCoin(4000 * S, 540), createCoin(5000 * S, 530),
        createCoin(6200 * S, 430), // ghost platforms
        createCoin(7500 * S, 540), createCoin(8500 * S, 530),
        createCoin(10200 * S, 230), // vertical shaft 2
        createCoin(11500 * S, 540), createCoin(12500 * S, 530),
        createCoin(13000 * S, 430), // ghost platforms 2
        createCoin(14200 * S, 540), createCoin(15000 * S, 530),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.455;
      return [
        createQB(500 * S, 480, 'mushroom'),
        createQB(2500 * S, 460, 'flower'),
        createQB(3500 * S, 480, 'star'),
        createQB(6000 * S, 480, 'mushroom'),
        createQB(8000 * S, 480, 'coin'),
        createQB(10800 * S, 480, 'flower'),
        createQB(12800 * S, 480, 'star'),
        createQB(14500 * S, 480, 'mushroom'),
      ];
    })(),
    enemies: (() => {
      const S = 0.455;
      return [
        createEnemy(800 * S, 560, 'ghost'),
        createEnemy(1400 * S, 560, 'boo'),
        createEnemy(2000 * S, 560, 'goomba'),
        createEnemy(2600 * S, 560, 'ghost'),
        createEnemy(3800 * S, 560, 'boo'),
        createEnemy(4400 * S, 560, 'ghost'),
        createEnemy(5000 * S, 560, 'goomba'),
        createEnemy(5500 * S, 560, 'boo'),
        createEnemy(6300 * S, 560, 'ghost'),   // near ghost platforms
        createEnemy(6800 * S, 560, 'goomba'),
        createEnemy(7500 * S, 560, 'boo'),
        createEnemy(8200 * S, 560, 'ghost'),
        createEnemy(8800 * S, 560, 'goomba'),
        createEnemy(9400 * S, 560, 'boo'),
        createEnemy(11000 * S, 560, 'ghost'),
        createEnemy(11800 * S, 560, 'boo'),
        createEnemy(12500 * S, 560, 'goomba'),
        createEnemy(13300 * S, 560, 'ghost'),
        createEnemy(14200 * S, 560, 'boo'),
        createEnemy(15000 * S, 560, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.455;
      return [
        createDeco(200 * S, 520, 'cobweb'),     createDeco(1000 * S, 520, 'tombstone'),
        createDeco(1800 * S, 520, 'web'),        createDeco(2400 * S, 520, 'ghost'),
        createDeco(2900 * S, 240, 'cobweb'),     createDeco(4200 * S, 520, 'tombstone'),
        createDeco(5500 * S, 520, 'web'),        createDeco(6100 * S, 440, 'ghost'),
        createDeco(7200 * S, 520, 'cobweb'),     createDeco(8200 * S, 520, 'tombstone'),
        createDeco(9500 * S, 520, 'web'),        createDeco(10100 * S, 240, 'ghost'),
        createDeco(11500 * S, 520, 'cobweb'),    createDeco(12800 * S, 440, 'tombstone'),
        createDeco(14000 * S, 520, 'web'),       createDeco(14800 * S, 520, 'ghost'),
      ];
    })(),
    playerStart: { x: 68, y: 550 },
    goal: { x: 14200, y: 578 },
    timeBonus: 210,
    movingPlatforms: [
      createMovingPlat(5200, 500, 120, 24, 'platform_medium', 'horizontal', 220, 20),
      createMovingPlat(7500, 460, 120, 24, 'platform_medium', 'vertical', 150, 18),
      createMovingPlat(11600, 500, 120, 24, 'platform_medium', 'horizontal', 250, 22),
      createMovingPlat(13600, 460, 120, 24, 'platform_medium', 'vertical', 160, 24),
    ],
  },

  // ================== LEVEL 66 – Geister-Verfolgung Finale – S=0.435 ==================
  {
    id: 66, name: "Crypt Keeper", width: 16200, height: 700, biome: 'haunted-mansion',
    platforms: (() => {
      const S = 0.435; const baseY = 640;
      const plats: any[] = [];
      plats.push(...bridgeSection(S, 100, baseY, 25));            // 44 → 1607
      plats.push(...ghostPlatforms(S, 4000, baseY, 14));          // 1740 → 2727
      plats.push(...verticalShaft(S, 6800, baseY));               // 2958 → 3416
      plats.push(...bridgeSection(S, 8200, baseY, 20));           // 3567 → 4798
      plats.push(...ghostPlatforms(S, 12000, baseY, 16));         // 5220 → 6359
      plats.push(...bridgeSection(S, 15200, baseY, 15));          // 6612 → 7530
      plats.push(...verticalShaft(S, 17800, baseY));              // 7743 → 8201
      plats.push(...ghostPlatforms(S, 19200, baseY, 18));         // 8352 → 9671
      plats.push(...bridgeSection(S, 22800, baseY, 20));          // 9918 → 11149
      plats.push(...verticalShaft(S, 26000, baseY));              // 11310 → 11768
      plats.push(...bridgeSection(S, 27400, baseY, 25));          // 11919 → 13454
      plats.push(...ghostPlatforms(S, 31000, baseY, 12));         // 13485 → 14360
      plats.push(...bridgeSection(S, 34000, baseY, 20));          // 14790 → 16021
      return plats;
    })(),
    coins: (() => {
      const S = 0.435;
      return [
        createCoin(300 * S, 580),  createCoin(700 * S, 580),
        createCoin(1400 * S, 570), createCoin(2100 * S, 460), // ghost platforms
        createCoin(3100 * S, 280), // vertical shaft
        createCoin(4000 * S, 580), createCoin(4800 * S, 570),
        createCoin(5400 * S, 460), createCoin(6000 * S, 380), // ghost platforms 2
        createCoin(7000 * S, 580), createCoin(7800 * S, 280), // vertical shaft 2
        createCoin(8500 * S, 460), createCoin(9200 * S, 380), // ghost platforms 3
        createCoin(10500 * S, 580), createCoin(11600 * S, 280), // vertical shaft 3
        createCoin(12500 * S, 580), createCoin(13500 * S, 460), // ghost platforms 4
        createCoin(15000 * S, 580), createCoin(15500 * S, 570),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.435;
      return [
        createQB(600 * S, 520, 'mushroom'),
        createQB(2200 * S, 400, 'flower'),
        createQB(3800 * S, 520, 'star'),
        createQB(5600 * S, 400, 'mushroom'),
        createQB(7500 * S, 520, 'coin'),
        createQB(8800 * S, 400, 'flower'),
        createQB(10800 * S, 520, 'star'),
        createQB(12500 * S, 520, 'mushroom'),
        createQB(14200 * S, 400, 'coin'),
        createQB(15500 * S, 520, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.435;
      return [
        createEnemy(800 * S, 600, 'boo'),
        createEnemy(1500 * S, 600, 'ghost'),
        createEnemy(2100 * S, 600, 'boo'),      // ghost platforms 1
        createEnemy(2600 * S, 600, 'boo'),
        createEnemy(3400 * S, 600, 'ghost'),
        createEnemy(4400 * S, 600, 'boo'),
        createEnemy(5400 * S, 600, 'boo'),       // ghost platforms 2
        createEnemy(6100 * S, 600, 'ghost'),
        createEnemy(7000 * S, 600, 'boo'),
        createEnemy(8200 * S, 600, 'boo'),       // ghost platforms 3
        createEnemy(9000 * S, 600, 'ghost'),
        createEnemy(10500 * S, 600, 'boo'),
        createEnemy(12200 * S, 600, 'ghost'),
        createEnemy(13600 * S, 600, 'boo'),      // ghost platforms 4
        createEnemy(14200 * S, 600, 'boo'),
        createEnemy(15000 * S, 600, 'ghost'),
      ];
    })(),
    decorations: (() => {
      const S = 0.435;
      return [
        createDeco(200 * S, 560, 'cobweb'),      createDeco(1000 * S, 560, 'tombstone'),
        createDeco(1800 * S, 480, 'web'),         createDeco(2400 * S, 440, 'ghost'),
        createDeco(3000 * S, 260, 'cobweb'),      createDeco(4200 * S, 560, 'tombstone'),
        createDeco(5400 * S, 480, 'web'),         createDeco(6200 * S, 440, 'ghost'),
        createDeco(7800 * S, 260, 'cobweb'),      createDeco(8600 * S, 440, 'tombstone'),
        createDeco(9800 * S, 480, 'web'),         createDeco(10500 * S, 560, 'ghost'),
        createDeco(11400 * S, 260, 'cobweb'),     createDeco(12600 * S, 560, 'tombstone'),
        createDeco(13800 * S, 480, 'web'),        createDeco(14800 * S, 560, 'ghost'),
        createDeco(15600 * S, 560, 'cobweb'),
      ];
    })(),
    playerStart: { x: 65, y: 590 },
    goal: { x: 15800, y: 618 },
    timeBonus: 220,
    movingPlatforms: [
      createMovingPlat(3600, 500, 120, 24, 'platform_medium', 'horizontal', 220, 22),
      createMovingPlat(6400, 460, 120, 24, 'platform_medium', 'vertical', 160, 20),
      createMovingPlat(8200, 520, 120, 24, 'platform_medium', 'horizontal', 200, 24),
      createMovingPlat(11000, 500, 120, 24, 'platform_medium', 'vertical', 180, 22),
      createMovingPlat(14200, 480, 120, 24, 'platform_medium', 'horizontal', 250, 24),
    ],
  },
];
