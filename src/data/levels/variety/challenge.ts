import type { LevelData, Platform, PlatformType } from '../index';

/** Top-edge notation makes the authored silhouettes and clearance easy to inspect. */
const deck = (left: number, right: number, top: number, type: PlatformType, depth = 48): Platform =>
  ({ x: (left + right) / 2, y: top + depth / 2, w: right - left, h: depth, type });
const trail = (left: number, right: number, y: number, count: number) =>
  Array.from({ length: count }, (_, i) => ({ x: Math.round(left + (right - left) * i / Math.max(1, count - 1)), y }));

/** A shaft folded into three floors: east, west, then east to the exit. */
function machineShaft(): LevelData {
  const platforms: Platform[] = [
    deck(0, 1400, 1420, 'metal', 240),
    deck(1450, 1630, 1300, 'stone', 44),
    deck(1640, 3140, 1180, 'metal', 72),
    deck(3200, 3400, 1060, 'stone', 44),
    deck(2920, 3120, 940, 'metal', 48),
    deck(900, 2880, 820, 'metal', 68),
    deck(620, 880, 700, 'stone', 48),
    deck(300, 480, 580, 'metal', 40),
    deck(620, 820, 460, 'metal', 40),
    deck(900, 1440, 460, 'metal', 64),
    deck(1550, 1840, 420, 'platform_easy', 24),
    deck(1970, 2250, 350, 'platform_medium', 24),
    deck(2360, 2670, 420, 'platform_easy', 24),
    deck(2770, 3400, 460, 'metal', 180),
  ];
  // One belt announces the factory theme without replacing the return route.
  platforms[2] = { ...platforms[2], conveyor: -45 };
  return {
    id: 50, biome: 'factory', name: 'Wartungsschacht: hin, zurück und hinauf', width: 3400, height: 1720,
    platforms, movingPlatforms: [],
    playerStart: { x: 150, y: 1376 }, goal: { x: 3230, y: 452 }, timeBonus: 150,
    coins: [
      ...trail(350, 1250, 1372, 6), { x: 1540, y: 1248 },
      ...trail(1820, 3000, 1132, 7), { x: 3300, y: 1008 }, { x: 3020, y: 888 },
      ...trail(2500, 1050, 772, 8), { x: 790, y: 648 }, { x: 390, y: 528 },
      ...trail(700, 1300, 412, 4), ...trail(1600, 1780, 372, 3),
      ...trail(2020, 2200, 302, 3), ...trail(2420, 2610, 372, 3), ...trail(2890, 3120, 412, 3),
    ],
    questionBlocks: [{ x: 550, y: 1300, contents: 'mushroom' }, { x: 2100, y: 1060, contents: 'flower' }],
    enemies: [
      { x: 1040, y: 1402, type: 'robot' }, { x: 2450, y: 1162, type: 'buzzy_beetle' },
      { x: 1700, y: 802, type: 'robot' }, { x: 1220, y: 442, type: 'goomba' },
    ],
    decorations: [
      { x: 500, y: 1490, type: 'gear' }, { x: 1800, y: 1250, type: 'pipe' },
      { x: 3050, y: 1340, type: 'crane' }, { x: 1900, y: 900, type: 'gear' },
      { x: 350, y: 650, type: 'chain' }, { x: 3230, y: 580, type: 'smoke' },
    ],
    checkpoints: [{ x: 1180, y: 792 }],
  };
}

/** A real descent into a broad crater, followed by a shorter ascent on its inner rim. */
function craterDescent(): LevelData {
  return {
    id: 58, biome: 'volcano-lava', name: 'Hinab in den stillen Krater', width: 4100, height: 1480,
    platforms: [
      deck(0, 650, 380, 'stone', 280),
      deck(730, 1080, 500, 'sandstone', 120),
      deck(1170, 1500, 640, 'stone', 136),
      deck(1580, 1880, 780, 'castle', 140),
      deck(1860, 2660, 940, 'stone', 220),
      deck(2700, 2900, 820, 'sandstone', 72),
      deck(2940, 3140, 700, 'castle', 64),
      deck(3180, 3430, 580, 'stone', 80),
      deck(3510, 4100, 580, 'sandstone', 240),
      deck(1250, 1510, 1220, 'lava', 80),
    ], movingPlatforms: [],
    playerStart: { x: 150, y: 336 }, goal: { x: 3900, y: 572 }, timeBonus: 110,
    coins: [
      ...trail(280, 540, 332, 4), ...trail(790, 1020, 452, 4), ...trail(1220, 1450, 592, 4),
      ...trail(1630, 1830, 732, 3), ...trail(1990, 2510, 892, 7),
      { x: 2800, y: 772 }, { x: 3040, y: 652 }, ...trail(3230, 3380, 532, 3), ...trail(3600, 3810, 532, 4),
    ],
    questionBlocks: [{ x: 380, y: 260, contents: 'mushroom' }, { x: 2250, y: 820, contents: 'flower' }],
    enemies: [
      { x: 900, y: 482, type: 'goomba' }, { x: 1700, y: 762, type: 'bobomb' },
      { x: 3650, y: 562, type: 'koopa' },
    ],
    decorations: [
      { x: 600, y: 420, type: 'ember' }, { x: 1200, y: 730, type: 'lava-rock' },
      { x: 1460, y: 1210, type: 'fire' }, { x: 2100, y: 1000, type: 'rock' },
      { x: 2480, y: 1000, type: 'ember' }, { x: 3880, y: 630, type: 'lava-rock' },
    ],
    checkpoints: [{ x: 2020, y: 912 }],
  };
}

/** Low gallery, tall stair hall, quiet attic: three rooms instead of repeated balconies. */
function ghostRooms(): LevelData {
  return {
    id: 62, biome: 'haunted-mansion', name: 'Drei Säle und scheue Geister', width: 4200, height: 1150,
    platforms: [
      deck(0, 1160, 800, 'stone', 240),
      deck(560, 980, 610, 'castle', 36), // Low gallery ceiling; also a reachable gallery roof.
      deck(1030, 1200, 680, 'stone', 48),
      deck(1280, 2140, 850, 'castle', 210),
      deck(2180, 2400, 730, 'stone', 52),
      deck(2430, 2650, 610, 'castle', 48),
      deck(2640, 3220, 500, 'stone', 72),
      deck(3330, 3610, 610, 'platform_easy', 24),
      deck(3710, 4200, 660, 'castle', 260),
      deck(1470, 1770, 700, 'platform_medium', 24), // Optional, clearly lit loft.
    ], movingPlatforms: [],
    playerStart: { x: 150, y: 756 }, goal: { x: 4010, y: 652 }, timeBonus: 120,
    coins: [
      ...trail(300, 1040, 752, 6), ...trail(650, 880, 562, 4),
      { x: 1120, y: 632 }, ...trail(1400, 2020, 802, 6), ...trail(1530, 1710, 652, 3),
      { x: 2290, y: 682 }, { x: 2540, y: 562 }, ...trail(2740, 3120, 452, 5),
      ...trail(3380, 3560, 562, 3), ...trail(3800, 3980, 612, 3),
    ],
    questionBlocks: [{ x: 330, y: 680, contents: 'mushroom' }, { x: 1880, y: 730, contents: 'flower' }],
    enemies: [
      { x: 950, y: 715, type: 'boo' }, { x: 1850, y: 760, type: 'boo' },
      { x: 2900, y: 415, type: 'boo' },
    ],
    decorations: [
      { x: 580, y: 640, type: 'cobweb' }, { x: 980, y: 640, type: 'chain' },
      { x: 1350, y: 820, type: 'torch' }, { x: 2100, y: 820, type: 'torch' },
      { x: 2730, y: 550, type: 'banner' }, { x: 3140, y: 550, type: 'cobweb' },
      { x: 3900, y: 710, type: 'tombstone' },
    ],
    checkpoints: [{ x: 1480, y: 822 }],
  };
}

/** High exposed band and long sheltered lower band converge at the final rim. */
function canyonBands(): LevelData {
  return {
    id: 74, biome: 'canyon-base', name: 'Zwei Wege durch die Felsbänder', width: 4600, height: 1400,
    platforms: [
      deck(0, 760, 420, 'sandstone', 280),
      deck(870, 1200, 420, 'stone', 80),
      deck(1310, 1640, 390, 'sandstone', 96),
      deck(1750, 2070, 460, 'stone', 88),
      { ...deck(2180, 2500, 420, 'platform_medium', 24), crumble: true },
      deck(2610, 2980, 400, 'sandstone', 100),
      deck(3090, 3440, 460, 'stone', 120),
      deck(3900, 4600, 420, 'sandstone', 240),
      // The deep route has room to breathe and its own gradual exit, not an invisible safety floor.
      deck(860, 1110, 560, 'ruins', 52),
      deck(1190, 1440, 700, 'stone', 56),
      deck(1520, 1770, 840, 'ruins', 60),
      deck(1740, 3000, 980, 'sandstone', 220),
      deck(3040, 3260, 840, 'ruins', 68),
      deck(3300, 3520, 700, 'stone', 68),
      deck(3560, 3780, 560, 'ruins', 64),
    ], movingPlatforms: [],
    playerStart: { x: 150, y: 376 }, goal: { x: 4390, y: 412 }, timeBonus: 120,
    coins: [
      ...trail(300, 650, 372, 4), ...trail(930, 1130, 372, 3), ...trail(1370, 1580, 342, 3),
      ...trail(1810, 2010, 412, 3), ...trail(2240, 2440, 372, 3), ...trail(2670, 2920, 352, 4),
      ...trail(3150, 3380, 412, 3), ...trail(3850, 4290, 372, 5),
      { x: 980, y: 512 }, { x: 1310, y: 652 }, { x: 1640, y: 792 },
      ...trail(1880, 2840, 932, 9), { x: 3150, y: 792 }, { x: 3410, y: 652 }, { x: 3670, y: 512 },
    ],
    questionBlocks: [{ x: 350, y: 300, contents: 'mushroom' }, { x: 2400, y: 860, contents: 'oneup' }],
    enemies: [
      { x: 1460, y: 372, type: 'spiny' }, { x: 2790, y: 382, type: 'koopa' },
      { x: 2560, y: 962, type: 'goomba' }, { x: 3950, y: 402, type: 'goomba' },
    ],
    decorations: [
      { x: 600, y: 490, type: 'formation' }, { x: 1500, y: 480, type: 'eagle' },
      { x: 1970, y: 1080, type: 'canyon-rock' }, { x: 2880, y: 1090, type: 'formation' },
      { x: 4320, y: 510, type: 'canyon-rock' },
    ],
    checkpoints: [{ x: 1900, y: 952 }],
  };
}

export const CHALLENGE_VARIETY_IDS = [50, 58, 62, 74] as const;
/** Full replacements deliberately discard legacy hazards/checkpoints at obsolete coordinates. */
export function rewriteChallengeLevel(level: LevelData): LevelData {
  switch (level.id) {
    case 50: return machineShaft();
    case 58: return craterDescent();
    case 62: return ghostRooms();
    case 74: return canyonBands();
    default: return level;
  }
}
