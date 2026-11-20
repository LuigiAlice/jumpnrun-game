import type { LevelData, Platform } from '../index';
import { coinTrail, createDeco, createEnemy, createQB, seg } from '../helpers';

const top = (platform: Platform) => platform.y - platform.h / 2;

/** A climb with three broad switchback landings. A missed jump can return to
 * an earlier flight; checkpoints shorten the retry without adding an auto-lift.
 * Consecutive rises are 180px at g=1500, below the 270px physical apex. */
function cloudTower(): LevelData {
  const platforms: Platform[] = [
    seg(0, 600, 2600, 120, 'cloud'),
    seg(720, 980, 2420, 32, 'platform_easy'),
    seg(1090, 1410, 2240, 44, 'cloud'),
    seg(1420, 1880, 2060, 60, 'wood'),
    seg(1070, 1350, 1880, 36, 'cloud'),
    seg(600, 940, 1700, 40, 'platform_medium'),
    seg(130, 570, 1520, 70, 'wood'),
    seg(640, 940, 1340, 32, 'cloud'),
    seg(1100, 1360, 1160, 42, 'platform_easy'),
    seg(1450, 1910, 980, 60, 'wood'),
    seg(1090, 1390, 800, 36, 'cloud'),
    seg(650, 950, 620, 40, 'platform_medium'),
    seg(1030, 1310, 440, 34, 'cloud'),
    seg(1410, 1770, 260, 52, 'wood'),
    seg(1860, 2160, 260, 90, 'cloud'),
  ];
  return {
    id: 28, biome: 'sky-clouds', name: 'Der große Wolkenturm', width: 2200, height: 2800,
    platforms,
    movingPlatforms: [],
    coins: platforms.flatMap(platform => coinTrail(
      platform.x - Math.min(platform.w / 4, 90), top(platform) - 48,
      platform.x + Math.min(platform.w / 4, 90), top(platform) - 48, 3,
    )),
    questionBlocks: [
      createQB(300, 2490, 'mushroom'),
      createQB(1730, 1950, 'flower'),
      createQB(300, 1410, 'oneup'),
    ],
    enemies: [
      createEnemy(1250, 2212, 'goomba'),
      createEnemy(1230, 1132, 'koopa'),
      createEnemy(1680, 890, 'parakoopa'),
    ],
    decorations: [
      createDeco(160, 2555, 'balloon'), createDeco(1740, 2016, 'flag'),
      createDeco(250, 1476, 'balloon'), createDeco(1780, 936, 'bird'),
      createDeco(2040, 190, 'sun'),
    ],
    playerStart: { x: 220, y: 2556 }, goal: { x: 2010, y: 252 },
    checkpoints: [{ x: 1740, y: 2032 }, { x: 350, y: 1492 }, { x: 1780, y: 952 }],
    timeBonus: 100,
  };
}

/** Five large orbital bodies, each with a visibly different landing elevation.
 * The wide upcrossing from body three to four uses the actual low gravity;
 * the optional satellite above body three never becomes a required stepping stone. */
function orbitIslands(): LevelData {
  const platforms: Platform[] = [
    seg(0, 700, 700, 160, 'space'),
    seg(1000, 1600, 580, 220, 'metal'),
    seg(1900, 2600, 780, 180, 'space'),
    seg(2920, 3560, 540, 240, 'space'),
    seg(3860, 4680, 680, 200, 'metal'),
    seg(2090, 2310, 530, 28, 'platform_medium'),
  ];
  return {
    id: 80, biome: 'space-star', name: 'Die fünf Orbitinseln', width: 4800, height: 1100,
    platforms,
    movingPlatforms: [],
    coins: [
      ...coinTrail(200, 652, 590, 652, 5),
      ...coinTrail(1070, 532, 1510, 532, 5),
      ...coinTrail(1980, 732, 2500, 732, 5),
      ...coinTrail(3030, 492, 3470, 492, 5),
      ...coinTrail(3930, 632, 4460, 632, 5),
      ...coinTrail(2130, 482, 2270, 482, 3),
    ],
    questionBlocks: [
      createQB(360, 590, 'mushroom'),
      createQB(2460, 670, 'flower'),
      createQB(4320, 570, 'oneup'),
    ],
    enemies: [
      createEnemy(1430, 432, 'ufo'),
      createEnemy(3330, 512, 'robot'),
      createEnemy(4130, 532, 'ufo'),
    ],
    decorations: [
      createDeco(420, 798, 'planet'), createDeco(1210, 720, 'satellite'),
      createDeco(2290, 890, 'planet'), createDeco(3300, 680, 'rocket'),
      createDeco(4370, 820, 'planet'), createDeco(2210, 430, 'star'),
    ],
    playerStart: { x: 180, y: 656 }, goal: { x: 4480, y: 672 },
    checkpoints: [{ x: 1170, y: 552 }, { x: 3090, y: 512 }],
    timeBonus: 80,
  };
}

/** Complete authored replacements, not additions to the former horizontal route.
 * Returning fresh data also prevents old hazards, gates and expansion anchors leaking in. */
export function rewriteVerticalLevel(level: LevelData): LevelData {
  if (level.id === 28) return cloudTower();
  if (level.id === 80) return orbitIslands();
  return level;
}
