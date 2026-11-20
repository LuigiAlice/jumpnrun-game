import type { DecorationType, EnemyType, LevelData, Platform, PlatformType } from '../index';
import { coinArc, coinTrail, createDeco, createEnemy, createQB, seg } from '../helpers';

export const NATURE_IDENTITY_IDS = [8, 14, 20, 32, 38, 44] as const;

const floor = (left: number, right: number, top: number, type: PlatformType, depth = 120): Platform =>
  seg(left, right, top, depth, type);
const ledge = (left: number, right: number, top: number, type: PlatformType): Platform =>
  seg(left, right, top, 24, type);
const enemy = (x: number, top: number, type: EnemyType) => createEnemy(x, top - 30, type);
const deco = (x: number, top: number, type: DecorationType) => createDeco(x, top - 20, type);

/** Complete authored replacements, not another overlay on the old jump route. */
export function rewriteNatureLevel(source: LevelData): LevelData {
  if (!(NATURE_IDENTITY_IDS as readonly number[]).includes(source.id)) return source;
  // Clear every old interactive field: old coordinates belong to the old geometry.
  const base: LevelData = {
    ...source, movingPlatforms: [], springs: [], spikes: [], checkpoints: [],
    windZones: [], waterZones: [], keys: [], doors: [], cannons: [], goals: [],
    pipeWarps: [], vines: [], fireBars: [], redCoinChallenges: [],
    coinGoal: undefined, timeGate: undefined, rising: undefined, fallingHazards: undefined,
    platforms: [], coins: [], questionBlocks: [], enemies: [], decorations: [], timeBonus: 120,
  };
  switch (source.id) {
    case 8: return desertValley(base);
    case 14: return coralGalleries(base);
    case 20: return glacierFields(base);
    case 32: return forestFork(base);
    case 38: return villageRoofs(base);
    case 44: return tidalBays(base);
    default: return source;
  }
}

function desertValley(base: LevelData): LevelData {
  // A real 780px descent fills most of the level; the short exit climbs only 430px.
  const platforms = [
    floor(0, 700, 280, 'sand', 180), floor(700, 1080, 430, 'sandstone', 150),
    floor(1080, 1450, 590, 'sand', 180), floor(1450, 1790, 760, 'sandstone', 150),
    floor(1790, 2150, 930, 'sand', 180), floor(2150, 2900, 1060, 'stone', 200),
    floor(2900, 3160, 960, 'sandstone'), floor(3160, 3410, 850, 'sand'),
    floor(3410, 3660, 740, 'sandstone', 180), floor(3660, 4010, 630, 'stone', 160),
    floor(4010, 4760, 630, 'sand', 200),
    // A short sheltered overlook rewards looking back, not another parallel runway.
    ledge(2450, 2660, 930, 'sandstone'), ledge(2700, 2860, 830, 'stone'),
  ];
  return {
    ...base, name: 'Dünental: hinab zur Oase', width: 4800, height: 1380, platforms,
    playerStart: { x: 150, y: 236 }, goal: { x: 4580, y: 622 },
    coins: [
      ...coinTrail(220, 232, 600, 232, 4), ...coinTrail(800, 380, 990, 380, 3), ...coinTrail(1170, 540, 1360, 540, 3),
      ...coinTrail(1510, 710, 1730, 710, 3), ...coinTrail(1860, 880, 2070, 880, 3),
      ...coinArc(2510, 1030, 7, 160, 35), ...coinTrail(2510, 880, 2780, 780, 4),
      ...coinTrail(2960, 910, 3100, 910, 2), ...coinTrail(3220, 800, 3350, 800, 2),
      ...coinTrail(3470, 690, 3600, 690, 2), ...coinTrail(3730, 580, 3930, 580, 3), ...coinTrail(4120, 580, 4500, 580, 5),
    ],
    questionBlocks: [createQB(410, 168, 'mushroom'), createQB(2810, 940, 'flower')],
    enemies: [enemy(920, 430, 'goomba'), enemy(1620, 760, 'koopa'), enemy(2290, 1060, 'spiny'), enemy(3360, 850, 'goomba'), enemy(4190, 630, 'koopa')],
    decorations: [deco(260, 280, 'cactus'), deco(1250, 590, 'pyramid'), deco(1950, 930, 'rock'), deco(2650, 1060, 'palm'), deco(4320, 630, 'cactus')],
    springs: [{ x: 4320, y: 630 }], // Preserve pilot spring distribution; never needed.
    checkpoints: [{ x: 2760, y: 1032 }],
    windZones: [{ x: 1200, y: 470, w: 190, h: 120, strength: 65, intervalMs: 3600 }],
  };
}

function coralGalleries(base: LevelData): LevelData {
  // Three basins alternate with dry raised galleries. The stepping route is
  // traversable with ordinary ballistics even when swim physics is ignored.
  const platforms = [
    floor(0, 650, 430, 'stone', 180), floor(650, 980, 600, 'ruins', 120),
    floor(980, 1520, 790, 'stone', 160), ledge(980, 1180, 590, 'bubble'),
    ledge(1270, 1470, 470, 'ruins'), floor(1520, 2020, 430, 'ruins', 120),
    floor(2020, 2250, 620, 'stone'), floor(2250, 2780, 820, 'stone', 180),
    ledge(2240, 2430, 610, 'bubble'), ledge(2520, 2720, 480, 'ruins'),
    floor(2780, 3240, 440, 'ruins', 120), floor(3240, 3480, 640, 'stone'),
    floor(3480, 3950, 830, 'stone', 160), ledge(3470, 3660, 640, 'bubble'),
    ledge(3750, 3950, 500, 'ruins'), floor(4050, 4580, 440, 'stone', 160),
    // Gallery arches are reachable roofs; the lower corridors have Big headroom.
    ledge(1640, 1880, 300, 'ruins'), ledge(2890, 3130, 310, 'ruins'),
  ];
  return {
    ...base, name: 'Korallengänge und Luftglocken', width: 4650, height: 1100, platforms,
    playerStart: { x: 150, y: 386 }, goal: { x: 4400, y: 432 },
    coins: [
      ...coinTrail(220, 380, 550, 380, 4), ...coinTrail(740, 550, 900, 550, 3), ...coinTrail(1040, 740, 1420, 740, 4),
      ...coinArc(1750, 250, 5, 90, 36), ...coinTrail(2080, 570, 2190, 570, 2), ...coinTrail(2310, 770, 2710, 770, 4),
      ...coinArc(3010, 260, 5, 80, 36), ...coinTrail(3290, 590, 3430, 590, 2), ...coinTrail(3530, 780, 3890, 780, 4),
      ...coinTrail(4140, 390, 4460, 390, 4),
    ],
    questionBlocks: [createQB(400, 320, 'mushroom'), createQB(4300, 330, 'flower')],
    enemies: [createEnemy(1190, 680, 'squid'), createEnemy(2460, 710, 'squid'), createEnemy(3700, 720, 'squid'), enemy(3100, 440, 'crab')],
    decorations: [deco(500, 430, 'shell'), deco(1250, 790, 'coral'), deco(2400, 820, 'seaweed'), deco(3700, 830, 'coral'), deco(4240, 440, 'shell')],
    waterZones: [{ x: 650, y: 500, w: 870, h: 480 }, { x: 2020, y: 510, w: 760, h: 470 }, { x: 3240, y: 530, w: 760, h: 450 }],
    checkpoints: [{ x: 1920, y: 402 }, { x: 3160, y: 412 }],
  };
}

function glacierFields(base: LevelData): LevelData {
  const platforms = [
    floor(0, 650, 650, 'snow', 180), floor(650, 1270, 650, 'ice', 160),
    floor(1270, 1620, 570, 'snow', 180), floor(1620, 1900, 490, 'stone', 140),
    floor(1900, 2390, 560, 'ice', 180), floor(2390, 2730, 560, 'snow', 160),
    floor(2820, 3110, 650, 'snow', 180), floor(3110, 3650, 650, 'ice', 150),
    floor(3650, 3900, 550, 'snow', 150), floor(3900, 4310, 470, 'stone', 180),
    ledge(1540, 1720, 390, 'snow'), ledge(2500, 2720, 430, 'stone'),
  ];
  return {
    ...base, name: 'Eisfelder und Schneeinseln', width: 4380, height: 1000, platforms,
    playerStart: { x: 150, y: 606 }, goal: { x: 4160, y: 462 },
    coins: [
      ...coinTrail(260, 600, 1160, 600, 8), ...coinArc(1450, 510, 5, 90, 50),
      ...coinTrail(1970, 510, 2270, 510, 4), ...coinArc(2610, 380, 5, 70, 35),
      ...coinArc(2760, 520, 5, 100, 60), ...coinTrail(3200, 600, 3540, 600, 4),
      ...coinTrail(3950, 420, 4200, 420, 4),
    ],
    questionBlocks: [createQB(390, 540, 'mushroom'), createQB(3000, 530, 'flower')],
    // Snow landings, not the end of an ice run, hold the readable encounters.
    enemies: [enemy(1410, 570, 'buzzy_beetle'), enemy(2530, 560, 'goomba'), enemy(3800, 550, 'koopa')],
    decorations: [deco(220, 650, 'penguin'), deco(1380, 570, 'iceberg'), deco(2570, 560, 'snowflake'), deco(3760, 550, 'penguin')],
    checkpoints: [{ x: 2640, y: 532 }],
  };
}

function forestFork(base: LevelData): LevelData {
  // The fork lasts 2400px: a sheltered low walk versus a broken canopy route.
  // Both reunite at the hollow tree, with two optional cross-connections.
  const platforms = [
    floor(0, 650, 760, 'grass', 180), floor(650, 1360, 800, 'grass', 160),
    floor(1360, 2060, 850, 'stone', 180), floor(2060, 2780, 790, 'grass', 200),
    floor(2780, 3420, 830, 'grass', 180), floor(3420, 3880, 740, 'wood', 150),
    floor(3880, 4470, 660, 'grass', 180),
    ledge(470, 690, 640, 'wood'), ledge(720, 950, 520, 'wood'),
    ledge(1030, 1450, 430, 'wood'), ledge(1530, 1900, 480, 'grass'),
    ledge(1980, 2350, 400, 'wood'), ledge(2440, 2800, 470, 'grass'),
    ledge(2880, 3270, 540, 'wood'), ledge(3330, 3650, 630, 'wood'),
    // These rise from the low path and make a missed canopy jump recoverable.
    ledge(1450, 1620, 720, 'stone'), ledge(1660, 1830, 600, 'wood'),
    ledge(2830, 3000, 710, 'stone'),
  ];
  return {
    ...base, name: 'Waldweg oder Baumkronen?', width: 4550, height: 1100, platforms,
    playerStart: { x: 150, y: 716 }, goal: { x: 4300, y: 652 },
    coins: [
      ...coinTrail(280, 710, 550, 710, 3), ...coinTrail(780, 470, 900, 470, 3), ...coinTrail(1090, 380, 1380, 380, 4),
      ...coinTrail(1560, 430, 1790, 430, 3), ...coinTrail(2040, 350, 2260, 350, 4),
      ...coinTrail(2510, 420, 2710, 420, 3), ...coinTrail(2960, 490, 3190, 490, 3),
      ...coinTrail(860, 750, 1220, 750, 4), ...coinTrail(1500, 800, 1950, 800, 5),
      ...coinTrail(2150, 740, 2640, 740, 4), ...coinTrail(3950, 610, 4330, 610, 4),
    ],
    questionBlocks: [createQB(340, 650, 'mushroom'), createQB(2220, 675, 'flower'), createQB(3120, 430, 'oneup')],
    enemies: [enemy(900, 800, 'goomba'), enemy(1750, 850, 'koopa'), createEnemy(2180, 300, 'parakoopa'), enemy(2600, 790, 'goomba'), enemy(3090, 540, 'buzzy_beetle'), enemy(4120, 660, 'koopa')],
    decorations: [deco(290, 760, 'tree'), deco(1150, 800, 'log'), deco(1790, 480, 'mushroom'), deco(2540, 790, 'tree'), deco(3150, 830, 'log'), deco(4020, 660, 'tree')],
    checkpoints: [{ x: 2700, y: 762 }],
  };
}

function villageRoofs(base: LevelData): LevelData {
  // Two courtyards interrupt the rooftops. There is no continuous low bypass:
  // the roofs and the descent into each courtyard are the actual forward route.
  const platforms = [
    floor(0, 550, 760, 'grass', 160), floor(550, 730, 650, 'stone', 150),
    floor(730, 920, 540, 'wood', 130), floor(920, 1360, 430, 'wood', 150),
    floor(1360, 1500, 590, 'stone', 150), floor(1500, 1860, 760, 'grass', 160),
    floor(1860, 2030, 650, 'stone', 120), floor(2030, 2210, 540, 'wood', 130),
    floor(2210, 2690, 440, 'wood', 180), floor(2690, 2860, 610, 'stone', 140),
    floor(2860, 3240, 780, 'grass', 180), floor(3240, 3420, 670, 'stone', 140),
    floor(3420, 3610, 560, 'wood', 130), floor(3610, 3820, 450, 'stone', 150),
    floor(3820, 4350, 450, 'wood', 200),
    ledge(2290, 2490, 320, 'stone'),
  ];
  return {
    ...base, name: 'Über Dächer, durch Innenhöfe', width: 4420, height: 1050, platforms,
    playerStart: { x: 150, y: 716 }, goal: { x: 4200, y: 442 },
    coins: [
      ...coinTrail(260, 710, 480, 710, 3), ...coinTrail(590, 600, 680, 600, 2), ...coinTrail(770, 490, 870, 490, 2), ...coinTrail(990, 380, 1270, 380, 4),
      ...coinArc(1670, 710, 5, 110, 45), ...coinTrail(1900, 600, 1990, 600, 2), ...coinTrail(2070, 490, 2170, 490, 2), ...coinTrail(2260, 390, 2610, 390, 4),
      ...coinArc(2380, 270, 5, 60, 35), ...coinArc(3040, 730, 5, 110, 55),
      ...coinTrail(3280, 620, 3380, 620, 2), ...coinTrail(3470, 510, 3570, 510, 2), ...coinTrail(3660, 400, 3770, 400, 2), ...coinTrail(3940, 400, 4240, 400, 4),
    ],
    questionBlocks: [createQB(330, 640, 'mushroom'), createQB(1710, 650, 'flower'), createQB(3060, 660, 'oneup')],
    enemies: [enemy(1110, 430, 'goomba'), enemy(1620, 760, 'koopa'), enemy(2570, 440, 'goomba'), enemy(2970, 780, 'buzzy_beetle')],
    decorations: [deco(260, 760, 'fence'), deco(1140, 430, 'house'), deco(1590, 760, 'barrel'), deco(2480, 440, 'house'), deco(3000, 780, 'flower'), deco(4030, 450, 'house')],
    checkpoints: [{ x: 1800, y: 732 }],
  };
}

function tidalBays(base: LevelData): LevelData {
  const platforms = [
    floor(0, 700, 580, 'sand', 180), floor(700, 920, 700, 'stone', 150),
    floor(920, 1430, 820, 'sand', 180), floor(1430, 1660, 700, 'stone', 150),
    floor(1660, 2120, 580, 'sand', 180),
    ledge(800, 1060, 540, 'wood'), ledge(1160, 1440, 540, 'wood'),
    floor(2120, 2340, 730, 'stone', 140), floor(2340, 2830, 880, 'sand', 160),
    floor(2830, 3040, 750, 'stone', 140), floor(3040, 3250, 620, 'sand', 150),
    floor(3250, 3500, 490, 'stone', 170), floor(3500, 4150, 490, 'sand', 180),
    // Second bay has a high rocky shore instead of repeating the wooden pier.
    ledge(2230, 2480, 570, 'stone'), ledge(2570, 2820, 530, 'stone'),
    ledge(2940, 3180, 460, 'wood'),
  ];
  return {
    ...base, name: 'Buchten, Stege und Muschelstrand', width: 4230, height: 1140, platforms,
    playerStart: { x: 150, y: 536 }, goal: { x: 4000, y: 482 },
    coins: [
      ...coinTrail(260, 530, 600, 530, 4), ...coinTrail(880, 490, 1350, 490, 6),
      ...coinArc(1170, 770, 5, 120, 45), ...coinTrail(1730, 530, 2020, 530, 4),
      ...coinTrail(2290, 520, 2730, 480, 5), ...coinArc(2580, 830, 5, 100, 50),
      ...coinTrail(2990, 410, 3120, 410, 3), ...coinTrail(3580, 440, 4030, 440, 5),
    ],
    questionBlocks: [createQB(360, 460, 'mushroom'), createQB(1940, 460, 'flower')],
    enemies: [enemy(1190, 820, 'crab'), enemy(1880, 580, 'koopa'), enemy(2680, 880, 'crab'), enemy(3750, 490, 'goomba')],
    decorations: [deco(250, 580, 'palm'), deco(1080, 820, 'shell'), deco(1750, 580, 'palm'), deco(2480, 880, 'coral'), deco(3800, 490, 'palm')],
    waterZones: [{ x: 700, y: 670, w: 960, h: 320 }, { x: 2120, y: 700, w: 920, h: 340 }],
    checkpoints: [{ x: 2050, y: 552 }],
  };
}
