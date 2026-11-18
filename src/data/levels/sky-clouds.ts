import { polishNatureLevel } from './naturePolish';
// Sky Clouds World - 6 Levels (25-30)
// Phase 9 archetypes: 25 Wolkenhopser, 26 Windkanal, 27 Wolkenröhren,
// 28 Himmelsleiter, 29 Luftschlacht, 30 Wolkenfinale.
//
// Authoring convention: all hand-placed platforms use TOP-EDGE coordinates
// (`plat`/`crumble` wrappers add h/2). Biome gravity is 1500, so jumps are
// designed for <= 220px rise / <= 280px horizontal, drops up to 1000px.
// No floor: cloud islands at many heights, every platform before the goal
// must be reachable without ensureSolvable().

import {
  LevelData, createPlat, createQB, createEnemy, createDeco,
  createMovingPlat, createSpring, createSpike, createCrumblePlat,
  createCheckpoint, createWindZone, createKey, createDoor,
  gapWithPlatforms, pipeSection, staircase, plateauSection, twoTierSection,
  islandCluster, zigzagClimb, overhangSection, coinArc, coinDiamond,
  coinTrail, coinLadder,
} from './helpers';
import type { Platform, PlatformType } from './index';

// Platform center y = top edge + h/2 (keeps the vertical math exact).
const plat = (x: number, top: number, w: number, h: number, type: PlatformType): Platform =>
  createPlat(x, top + h / 2, w, h, type);
const crumble = (x: number, top: number, w: number, h: number, type: PlatformType = 'platform_medium'): Platform =>
  createCrumblePlat(x, top + h / 2, w, h, type);

const SKY_CLOUDS_AUTHORED_LEVELS: LevelData[] = [
  // ============================================================
  // Level 25: "Cloud Hop" (Wolkenhopser) - Tutorial
  // Gentle island hops, one two-tier cloud (high bonus route), a
  // vertical lift and a zig-zag reward perch with the 1-UP block.
  // ============================================================
  {
    id: 25, name: 'Cloud Hop', width: 8400, height: 720, biome: 'sky-clouds',
    platforms: [
      plat(280, 580, 480, 40, 'cloud'),
      plat(650, 545, 190, 24, 'platform_easy'),
      plat(920, 510, 240, 40, 'cloud'),
      plat(1180, 470, 150, 24, 'platform_medium'),
      plat(1430, 430, 300, 40, 'cloud'),
      plat(1900, 400, 280, 40, 'cloud'),
      ...islandCluster(2250, 400, [
        { dx: 0, dy: 0, w: 170, type: 'cloud' },
        { dx: 230, dy: 70, w: 130, type: 'platform_easy' },
        { dx: 400, dy: 30, w: 190, type: 'platform_medium' },
        { dx: 620, dy: 120, w: 150, type: 'platform_hard' },
      ]),
      ...gapWithPlatforms(1, 3000, 292, 1000, 3, {
        widths: [140, 100, 160], dy: [50, 0, 90], xOffsets: [0, 60, 120],
        types: ['platform_easy', 'cloud', 'platform_medium'],
      }),
      plat(4250, 250, 320, 40, 'cloud'),
      ...twoTierSection(4450, 250, 900, 'cloud', 'platform_medium'),
      plat(5600, 300, 280, 40, 'cloud'),
      ...zigzagClimb(5950, 380, 4, 80, 120, 140, 'platform_medium'),
      plat(6350, 140, 300, 40, 'cloud'),
      ...gapWithPlatforms(1, 6600, 152, 900, 3, {
        widths: [120, 160, 100], dy: [40, 100, 0], xOffsets: [0, -40, 60],
        types: ['platform_medium', 'platform_easy', 'platform_hard'],
      }),
      plat(7700, 180, 420, 40, 'cloud'),
    ],
    coins: [
      ...coinTrail(620, 500, 1150, 425, 5),
      ...coinArc(1500, 350, 4, 70, 60),
      ...coinArc(1700, 380, 5, 90, 70),
      ...coinDiamond(2745, 320, 60),
      ...coinArc(2930, 190, 5, 90, 70),
      ...coinArc(4900, 80, 5, 200, 60),
      ...coinLadder(5810, 200, 80, 4),
      ...coinDiamond(7800, 120, 60),
    ],
    questionBlocks: [
      createQB(920, 420, 'mushroom'),
      createQB(2745, 280, 'coin'),
      createQB(5050, 170, 'star'),
      createQB(5500, 150, 'oneup'),
    ],
    enemies: [
      createEnemy(920, 494, 'goomba'),
      createEnemy(2000, 310, 'ufo'),
      createEnemy(2635, 354, 'goomba'),
      createEnemy(3400, 200, 'lakitu'),
      createEnemy(6350, 124, 'goomba'),
    ],
    movingPlatforms: [
      createMovingPlat(1700, 430, 120, 24, 'platform_medium', 'vertical', 120, 15),
    ],
    decorations: [
      createDeco(300, 520, 'balloon'),
      createDeco(1400, 360, 'bird'),
      createDeco(3000, 180, 'sun'),
      createDeco(4500, 120, 'rainbow'),
      createDeco(6350, 60, 'bird'),
      createDeco(7700, 100, 'balloon'),
    ],
    playerStart: { x: 200, y: 564 },
    goal: { x: 7800, y: 180 },
    timeBonus: 180,
    springs: [createSpring(1500, 430), createSpring(2930, 280)],
  },

  // ============================================================
  // Level 26: "Wind Channel" (Windkanal)
  // Two wind zones blow across wide, safe cloud runways; between them
  // a circular lift, a staircase climb and a multi-width gap trapeze.
  // ============================================================
  {
    id: 26, name: 'Wind Channel', width: 11200, height: 760, biome: 'sky-clouds',
    platforms: [
      plat(300, 620, 520, 40, 'cloud'),
      plat(900, 600, 420, 40, 'cloud'),
      plat(1300, 560, 180, 24, 'platform_easy'),
      plat(1580, 520, 220, 24, 'platform_medium'),
      plat(2050, 520, 700, 40, 'cloud'),
      plat(2680, 480, 320, 40, 'cloud'),
      ...overhangSection(3350, 440, 900, 3750, 140, 'cloud'),
      plat(4520, 400, 320, 40, 'cloud'),
      ...staircase(4850, 400, 4, 70, 150, 50, 'platform_medium'),
      plat(6250, 300, 380, 40, 'cloud'),
      plat(6800, 340, 340, 40, 'cloud'),
      ...gapWithPlatforms(1, 7000, 332, 1200, 4, {
        widths: [140, 110, 180, 130], dy: [40, 0, 90, 30], xOffsets: [0, 70, 0, 40],
        types: ['platform_easy', 'platform_medium', 'cloud', 'platform_hard'],
      }),
      ...islandCluster(8300, 320, [
        { dx: 0, dy: 0, w: 200, type: 'cloud' },
        { dx: 250, dy: 80, w: 140, type: 'platform_easy' },
        { dx: 440, dy: 40, w: 220, type: 'cloud' },
        { dx: 710, dy: 130, w: 160, type: 'platform_medium' },
      ]),
      plat(9500, 220, 360, 40, 'cloud'),
      plat(10450, 300, 460, 40, 'cloud'),
    ],
    coins: [
      ...coinTrail(700, 540, 1600, 460, 6),
      ...coinArc(2150, 440, 5, 140, 60),
      ...coinArc(8450, 240, 5, 80, 70),
      ...coinDiamond(8400, 250, 60),
      ...coinLadder(5525, 110, 50, 4),
      ...coinArc(9550, 160, 4, 90, 60),
      ...coinDiamond(10450, 240, 60),
    ],
    questionBlocks: [
      createQB(2050, 430, 'mushroom'),
      createQB(6250, 210, 'flower'),
      createQB(9500, 130, 'star'),
    ],
    enemies: [
      createEnemy(900, 584, 'goomba'),
      createEnemy(2100, 504, 'koopa'),
      createEnemy(2320, 504, 'goomba'),
      createEnemy(1500, 400, 'ufo'),
      createEnemy(3500, 300, 'boo'),
      createEnemy(7000, 200, 'lakitu'),
      createEnemy(8400, 304, 'spiny'),
      createEnemy(9900, 180, 'bullet_bill'),
    ],
    movingPlatforms: [
      createMovingPlat(3100, 440, 130, 24, 'platform_medium', 'circular', 140, 13),
      createMovingPlat(5800, 260, 120, 24, 'platform_easy', 'vertical', 110, 15),
      createMovingPlat(9950, 260, 130, 24, 'platform_medium', 'horizontal', 160, 16),
    ],
    decorations: [
      createDeco(300, 560, 'balloon'),
      createDeco(1300, 460, 'bird'),
      createDeco(2800, 360, 'sun'),
      createDeco(4500, 300, 'rainbow'),
      createDeco(6300, 200, 'bird'),
      createDeco(9600, 140, 'balloon'),
      createDeco(10450, 240, 'rainbow'),
    ],
    playerStart: { x: 200, y: 604 },
    goal: { x: 10550, y: 300 },
    timeBonus: 170,
    springs: [createSpring(6300, 300), createSpring(8450, 320)],
    spikes: [createSpike(1900, 512), createSpike(2260, 512)],
    windZones: [
      createWindZone(660, 430, 480, 200, 120, 2500),
      createWindZone(1720, 340, 660, 200, 160, 3000),
    ],
  },

  // ============================================================
  // Level 27: "Cloud Pipes" (Wolkenröhren)
  // Piranha pipe chains on cloud terraces, a zig-zag ladder, plus a
  // locked bonus chamber (key + door) with the 1-UP question block.
  // ============================================================
  {
    id: 27, name: 'Cloud Pipes', width: 12600, height: 780, biome: 'sky-clouds',
    platforms: [
      plat(300, 620, 520, 40, 'cloud'),
      plat(780, 580, 200, 24, 'platform_easy'),
      plat(1080, 560, 300, 40, 'cloud'),
      ...pipeSection(1, 1200, 620, 3),
      plat(2480, 560, 320, 40, 'cloud'),
      ...plateauSection(2800, 560, [
        { dx: 0, dy: 0, w: 260, h: 40, type: 'cloud' },
        { dx: 320, dy: 80, w: 180, h: 40, type: 'cloud' },
        { dx: 560, dy: 140, w: 140, h: 24, type: 'platform_easy' },
        { dx: 700, dy: 60, w: 220, h: 40, type: 'cloud' },
      ]),
      ...pipeSection(1, 3700, 580, 4),
      plat(5330, 520, 340, 40, 'cloud'),
      plat(5400, 240, 160, 24, 'platform_easy'),
      ...gapWithPlatforms(1, 5500, 532, 1200, 4, {
        widths: [110, 170, 130, 90], dy: [70, 120, 40, 90], xOffsets: [0, 60, 0, 80],
        types: ['platform_medium', 'platform_easy', 'cloud', 'platform_hard'],
      }),
      plat(6850, 450, 320, 40, 'cloud'),
      plat(7750, 400, 300, 40, 'cloud'),
      ...zigzagClimb(8100, 440, 4, 90, 120, 140, 'platform_medium'),
      plat(8500, 160, 360, 40, 'cloud'),
      plat(9250, 300, 460, 40, 'cloud'),
      plat(9800, 260, 180, 24, 'platform_medium'),
      plat(10150, 320, 320, 40, 'cloud'),
      plat(10650, 280, 300, 40, 'cloud'),
      ...gapWithPlatforms(1, 10800, 292, 1000, 3, {
        widths: [120, 150, 100], dy: [40, 110, 60], xOffsets: [0, 50, 0],
        types: ['platform_easy', 'platform_medium', 'cloud'],
      }),
      plat(11850, 340, 480, 40, 'cloud'),
    ],
    coins: [
      ...coinTrail(680, 520, 1080, 480, 5),
      ...coinArc(2480, 380, 5, 90, 70),
      ...coinLadder(5400, 430, 280, 4),
      ...coinTrail(5740, 420, 6540, 400, 4),
      ...coinDiamond(10650, 200, 60),
      ...coinArc(11950, 260, 5, 90, 70),
    ],
    questionBlocks: [
      createQB(2480, 470, 'mushroom'),
      createQB(3190, 390, 'flower'),
      createQB(5330, 430, 'star'),
      createQB(10650, 150, 'oneup'),
    ],
    enemies: [
      createEnemy(1500, 608, 'piranha'),
      createEnemy(1850, 608, 'piranha'),
      createEnemy(2200, 608, 'piranha'),
      createEnemy(4000, 568, 'piranha'),
      createEnemy(4350, 568, 'piranha'),
      createEnemy(4700, 568, 'piranha'),
      createEnemy(5050, 568, 'piranha'),
      createEnemy(2480, 544, 'goomba'),
      createEnemy(5330, 504, 'spiny'),
      createEnemy(6850, 434, 'goomba'),
      createEnemy(8500, 144, 'koopa'),
      createEnemy(2750, 380, 'ufo'),
      createEnemy(6100, 240, 'boo'),
      createEnemy(9500, 160, 'lakitu'),
      createEnemy(11500, 120, 'bullet_bill'),
    ],
    movingPlatforms: [
      createMovingPlat(7300, 420, 130, 24, 'platform_medium', 'circular', 130, 13),
      createMovingPlat(8850, 260, 120, 24, 'platform_easy', 'vertical', 130, 14),
    ],
    decorations: [
      createDeco(400, 560, 'balloon'),
      createDeco(1200, 480, 'bird'),
      createDeco(2900, 340, 'sun'),
      createDeco(5000, 360, 'rainbow'),
      createDeco(7000, 300, 'bird'),
      createDeco(9500, 200, 'balloon'),
      createDeco(11000, 200, 'rainbow'),
    ],
    playerStart: { x: 200, y: 604 },
    goal: { x: 11950, y: 340 },
    timeBonus: 160,
    springs: [createSpring(5400, 520)],
    spikes: [createSpike(3400, 412), createSpike(3650, 492)],
    checkpoints: [createCheckpoint(6900, 450), createCheckpoint(9300, 300)],
    keys: [createKey(9800, 190)],
    doors: [createDoor(10050, 275, 40, 90)],
  },

  // ============================================================
  // Level 28: "Sky Ladder" (Himmelsleiter)
  // Vertical climb: island cluster, tall staircase to the highest
  // perch, then a descent through an overhang island back up again.
  // ============================================================
  {
    id: 28, name: 'Sky Ladder', width: 12400, height: 900, biome: 'sky-clouds',
    platforms: [
      plat(300, 700, 520, 40, 'cloud'),
      plat(800, 660, 180, 24, 'platform_easy'),
      ...islandCluster(1050, 680, [
        { dx: 0, dy: 0, w: 160, type: 'cloud' },
        { dx: 220, dy: 80, w: 140, type: 'platform_medium' },
        { dx: 400, dy: 40, w: 180, type: 'cloud' },
        { dx: 620, dy: 130, w: 120, type: 'platform_easy' },
      ]),
      plat(2400, 520, 320, 40, 'cloud'),
      ...staircase(2750, 520, 6, 75, 150, 60, 'platform_medium'),
      plat(4150, 100, 320, 40, 'cloud'),
      ...overhangSection(4500, 220, 800, 4800, 160, 'cloud'),
      plat(5550, 300, 360, 40, 'cloud'),
      ...islandCluster(6250, 420, [
        { dx: 0, dy: 0, w: 180, type: 'cloud' },
        { dx: 230, dy: 70, w: 140, type: 'platform_easy' },
        { dx: 420, dy: 30, w: 200, type: 'cloud' },
        { dx: 660, dy: 110, w: 150, type: 'platform_medium' },
        { dx: 860, dy: 170, w: 130, type: 'platform_hard' },
      ]),
      ...gapWithPlatforms(1, 7300, 232, 1000, 4, {
        widths: [140, 110, 170, 120], dy: [30, 100, 0, 60], xOffsets: [0, 40, 0, 60],
        types: ['platform_medium', 'cloud', 'platform_easy', 'platform_hard'],
      }),
      plat(8500, 200, 340, 40, 'cloud'),
      plat(8950, 300, 300, 40, 'cloud'),
      plat(9950, 240, 300, 40, 'cloud'),
      plat(10450, 360, 260, 40, 'cloud'),
      ...staircase(10750, 360, 3, 60, 160, 50, 'platform_easy'),
      plat(11700, 240, 480, 40, 'cloud'),
    ],
    coins: [
      ...coinTrail(700, 620, 1700, 520, 6),
      ...coinLadder(2825, 430, 310, 4),
      ...coinDiamond(4150, 40, 60),
      ...coinArc(8500, 120, 5, 90, 70),
      ...coinArc(9950, 160, 5, 80, 70),
      ...coinTrail(10320, 320, 11330, 200, 4),
      ...coinDiamond(11800, 170, 60),
    ],
    questionBlocks: [
      createQB(1100, 590, 'mushroom'),
      createQB(2400, 430, 'star'),
      createQB(6250, 330, 'flower'),
      createQB(10450, 270, 'mushroom'),
    ],
    enemies: [
      createEnemy(1100, 664, 'goomba'),
      createEnemy(2400, 504, 'koopa'),
      createEnemy(4200, 84, 'spiny'),
      createEnemy(5550, 284, 'goomba'),
      createEnemy(6800, 374, 'robot'),
      createEnemy(8500, 184, 'ufo'),
      createEnemy(9000, 200, 'lakitu'),
      createEnemy(10450, 344, 'boo'),
      createEnemy(11200, 120, 'bullet_bill'),
    ],
    movingPlatforms: [
      createMovingPlat(2050, 600, 130, 24, 'platform_medium', 'vertical', 150, 16),
      createMovingPlat(6000, 340, 130, 24, 'platform_hard', 'vertical', 120, 15),
      createMovingPlat(9450, 260, 130, 24, 'platform_medium', 'circular', 140, 12),
    ],
    decorations: [
      createDeco(300, 640, 'balloon'),
      createDeco(1100, 560, 'bird'),
      createDeco(3000, 400, 'sun'),
      createDeco(4500, 120, 'rainbow'),
      createDeco(6300, 300, 'bird'),
      createDeco(8800, 200, 'balloon'),
      createDeco(11200, 160, 'rainbow'),
    ],
    playerStart: { x: 200, y: 684 },
    goal: { x: 11800, y: 240 },
    timeBonus: 150,
    coinGoal: 12,
    springs: [createSpring(4150, 100), createSpring(9950, 240)],
    spikes: [createSpike(2520, 512)],
    checkpoints: [createCheckpoint(2450, 520), createCheckpoint(6350, 420)],
  },

  // ============================================================
  // Level 29: "Air Battle" (Luftschlacht)
  // Flying-enemy gauntlet with a crumble bonus route up to a lonely
  // coin island; the main route stays on solid clouds below.
  // ============================================================
  {
    id: 29, name: 'Air Battle', width: 12000, height: 800, biome: 'sky-clouds',
    platforms: [
      plat(300, 640, 520, 40, 'cloud'),
      plat(800, 610, 200, 24, 'platform_easy'),
      plat(1100, 580, 280, 40, 'cloud'),
      plat(1900, 520, 320, 40, 'cloud'),
      ...gapWithPlatforms(1, 2100, 532, 900, 3, {
        widths: [130, 100, 160], dy: [80, 140, 50], xOffsets: [0, 50, 0],
        types: ['platform_medium', 'platform_easy', 'platform_hard'],
      }),
      plat(3150, 430, 340, 40, 'cloud'),
      crumble(3500, 288, 140, 24),
      crumble(3750, 228, 140, 24),
      plat(4050, 200, 260, 40, 'cloud'),
      plat(3600, 460, 320, 40, 'cloud'),
      ...gapWithPlatforms(1, 3700, 472, 1100, 4, {
        widths: [110, 150, 90, 130], dy: [60, 120, 30, 90], xOffsets: [0, 60, 0, 40],
        types: ['platform_easy', 'platform_medium', 'cloud', 'platform_hard'],
      }),
      plat(4950, 400, 340, 40, 'cloud'),
      plat(5750, 340, 300, 40, 'cloud'),
      ...islandCluster(6150, 380, [
        { dx: 0, dy: 0, w: 170, type: 'cloud' },
        { dx: 220, dy: 90, w: 130, type: 'platform_easy' },
        { dx: 390, dy: 40, w: 190, type: 'platform_medium' },
        { dx: 620, dy: 120, w: 140, type: 'platform_hard' },
        { dx: 810, dy: 180, w: 120, type: 'platform_easy' },
      ]),
      plat(8050, 280, 460, 40, 'cloud'),
      plat(8700, 340, 320, 40, 'cloud'),
      ...gapWithPlatforms(1, 8900, 352, 1200, 4, {
        widths: [120, 160, 100, 140], dy: [70, 130, 40, 100], xOffsets: [0, 50, 0, 60],
        types: ['platform_medium', 'cloud', 'platform_easy', 'platform_hard'],
      }),
      plat(10300, 260, 340, 40, 'cloud'),
      plat(11400, 180, 500, 40, 'cloud'),
    ],
    coins: [
      ...coinTrail(620, 570, 1150, 520, 5),
      ...coinArc(1500, 460, 5, 90, 70),
      ...coinDiamond(1900, 440, 60),
      ...coinArc(3150, 340, 5, 90, 70),
      ...coinDiamond(4050, 120, 60),
      ...coinTrail(3865, 380, 4685, 350, 5),
      ...coinArc(4950, 310, 5, 80, 70),
      ...coinLadder(10300, 200, 140, 4),
      ...coinArc(11500, 100, 5, 90, 70),
    ],
    questionBlocks: [
      createQB(1100, 490, 'mushroom'),
      createQB(4150, 100, 'star'),
      createQB(5750, 250, 'flower'),
      createQB(8700, 250, 'mushroom'),
    ],
    enemies: [
      createEnemy(1100, 564, 'goomba'),
      createEnemy(1850, 504, 'spiny'),
      createEnemy(2500, 260, 'lakitu'),
      createEnemy(2800, 240, 'ufo'),
      createEnemy(3000, 320, 'bullet_bill'),
      createEnemy(3250, 220, 'boo'),
      createEnemy(5400, 160, 'ufo'),
      createEnemy(5900, 200, 'lakitu'),
      createEnemy(6500, 140, 'bullet_bill'),
      createEnemy(7000, 120, 'boo'),
      createEnemy(9000, 160, 'ufo'),
      createEnemy(10000, 140, 'lakitu'),
      createEnemy(11000, 80, 'bullet_bill'),
      createEnemy(11200, 100, 'boo'),
    ],
    movingPlatforms: [
      createMovingPlat(1500, 540, 130, 24, 'platform_medium', 'circular', 140, 13),
      createMovingPlat(5400, 360, 130, 24, 'platform_medium', 'vertical', 150, 16),
      createMovingPlat(7400, 260, 130, 24, 'platform_medium', 'horizontal', 180, 15),
      createMovingPlat(10800, 200, 130, 24, 'platform_hard', 'circular', 150, 14),
    ],
    decorations: [
      createDeco(300, 560, 'balloon'),
      createDeco(1500, 440, 'bird'),
      createDeco(3300, 300, 'sun'),
      createDeco(5200, 300, 'rainbow'),
      createDeco(7500, 160, 'balloon'),
      createDeco(9500, 160, 'bird'),
      createDeco(11000, 80, 'rainbow'),
    ],
    playerStart: { x: 200, y: 624 },
    goal: { x: 11500, y: 180 },
    timeBonus: 140,
    coinGoal: 14,
    springs: [createSpring(10300, 260)],
    spikes: [createSpike(1950, 512), createSpike(6250, 372)],
    checkpoints: [createCheckpoint(5000, 400), createCheckpoint(6250, 380), createCheckpoint(10350, 260)],
  },

  // ============================================================
  // Level 30: "Cloud Islands Finale" (Wolkenfinale)
  // Crumble platforms form high risk routes above wide plateau and
  // overhang safe routes; two wind zones punish careless runways.
  // Every crumble chain has a solid non-crumble alternative below.
  // ============================================================
  {
    id: 30, name: 'Cloud Islands Finale', width: 13000, height: 900, biome: 'sky-clouds',
    platforms: [
      plat(300, 720, 520, 40, 'cloud'),
      plat(780, 680, 200, 24, 'platform_easy'),
      plat(1080, 650, 300, 40, 'cloud'),
      ...plateauSection(1350, 650, [
        { dx: 0, dy: 0, w: 320, h: 40, type: 'cloud' },
        { dx: 380, dy: 60, w: 220, h: 40, type: 'cloud' },
        { dx: 660, dy: 0, w: 280, h: 40, type: 'cloud' },
        { dx: 1020, dy: 90, w: 180, h: 24, type: 'platform_medium' },
        { dx: 1260, dy: 30, w: 240, h: 40, type: 'cloud' },
      ]),
      crumble(1450, 468, 140, 24),
      crumble(1750, 408, 140, 24),
      crumble(2050, 348, 140, 24),
      crumble(2350, 288, 140, 24),
      plat(2700, 260, 260, 40, 'cloud'),
      plat(3100, 620, 320, 40, 'cloud'),
      ...gapWithPlatforms(1, 3250, 632, 1100, 4, {
        widths: [140, 110, 170, 120], dy: [70, 130, 40, 100], xOffsets: [0, 60, 0, 50],
        types: ['platform_easy', 'platform_medium', 'cloud', 'platform_hard'],
      }),
      plat(4550, 560, 340, 40, 'cloud'),
      ...overhangSection(4900, 560, 900, 5250, 180, 'cloud'),
      plat(6150, 640, 360, 40, 'cloud'),
      plat(6700, 680, 340, 40, 'cloud'),
      ...staircase(7100, 680, 4, 70, 150, 50, 'platform_medium'),
      crumble(6050, 448, 140, 24),
      crumble(6350, 408, 140, 24),
      crumble(6650, 388, 140, 24),
      crumble(6950, 408, 140, 24),
      crumble(7250, 368, 140, 24),
      crumble(7550, 328, 140, 24),
      plat(8100, 360, 200, 24, 'platform_medium'),
      plat(9000, 300, 320, 40, 'cloud'),
      crumble(9250, 188, 140, 24),
      crumble(9550, 148, 140, 24),
      crumble(9850, 128, 140, 24),
      plat(10150, 120, 240, 40, 'cloud'),
      plat(9800, 260, 280, 40, 'cloud'),
      plat(10300, 240, 300, 40, 'cloud'),
      plat(10800, 260, 300, 40, 'cloud'),
      ...staircase(11150, 260, 4, 50, 150, 50, 'platform_medium'),
      plat(12350, 60, 500, 40, 'cloud'),
    ],
    coins: [
      ...coinTrail(1400, 620, 2800, 580, 6),
      ...coinTrail(1430, 430, 2380, 250, 5),
      ...coinDiamond(2700, 180, 60),
      ...coinDiamond(5050, 480, 60),
      ...coinArc(6500, 400, 5, 120, 70),
      ...coinDiamond(10150, 50, 60),
      ...coinArc(9000, 220, 5, 90, 70),
      ...coinLadder(11800, 200, 110, 4),
    ],
    questionBlocks: [
      createQB(1080, 560, 'mushroom'),
      createQB(2700, 120, 'star'),
      createQB(3100, 530, 'flower'),
      createQB(10150, 25, 'oneup'),
    ],
    enemies: [
      createEnemy(1080, 634, 'goomba'),
      createEnemy(2000, 500, 'ufo'),
      createEnemy(2200, 634, 'koopa'),
      createEnemy(2500, 480, 'boo'),
      createEnemy(3300, 520, 'bullet_bill'),
      createEnemy(4300, 440, 'lakitu'),
      createEnemy(4600, 544, 'spiny'),
      createEnemy(6200, 520, 'ufo'),
      createEnemy(6700, 664, 'robot'),
      createEnemy(7400, 300, 'boo'),
      createEnemy(8000, 280, 'bullet_bill'),
      createEnemy(8900, 200, 'lakitu'),
      createEnemy(9900, 160, 'ufo'),
      createEnemy(10700, 244, 'goomba'),
      createEnemy(11500, 120, 'bullet_bill'),
    ],
    movingPlatforms: [
      createMovingPlat(8500, 300, 130, 24, 'platform_medium', 'circular', 150, 13),
      createMovingPlat(9450, 320, 130, 24, 'platform_easy', 'vertical', 160, 15),
    ],
    decorations: [
      createDeco(300, 680, 'balloon'),
      createDeco(1400, 560, 'bird'),
      createDeco(2700, 200, 'sun'),
      createDeco(4600, 480, 'rainbow'),
      createDeco(6300, 560, 'bird'),
      createDeco(8200, 280, 'balloon'),
      createDeco(9800, 200, 'rainbow'),
      createDeco(12000, 20, 'sun'),
    ],
    playerStart: { x: 200, y: 704 },
    goal: { x: 12450, y: 60 },
    timeBonus: 120,
    springs: [createSpring(9000, 300)],
    spikes: [createSpike(10850, 252)],
    checkpoints: [createCheckpoint(4600, 560), createCheckpoint(9050, 300)],
    windZones: [
      createWindZone(1350, 470, 320, 210, 150, 2800),
      createWindZone(2610, 440, 240, 220, 150, 3200),
      createWindZone(5970, 460, 360, 220, 160, 3000),
    ],
  },
];

// Individually anchored landscape, reward and recovery polish; original jump tops stay fixed.
export const SKY_CLOUDS_LEVELS: LevelData[] = SKY_CLOUDS_AUTHORED_LEVELS.map(polishNatureLevel);
