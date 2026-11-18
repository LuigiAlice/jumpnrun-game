import type { EnemyType, LevelData, Platform, PlatformType } from './index';

interface NaturePlan {
  /** A deliberately placed phrase, not a globally repeated level recipe. */
  idea: string;
  foundations: number[];
  recovery: number;
  reward: number;
  arcHeight: number;
  depth?: number;
  niche?: { x: number; floorTop: number; type: PlatformType };
}

// Anchors refer to authored platform centres, so the existing jump route never moves.
export const NATURE_LEVEL_PLANS: Record<number, NaturePlan> = {
  7: { idea: 'Dunes, sheltered coin nest, then the first canyon', foundations: [400,1500,2270,5200], recovery: 3060, reward: 2270, arcHeight: 44, niche: { x: 600, floorTop: 488, type: 'sandstone' } },
  8: { idea: 'Recover between gusts before descending into the canyon', foundations: [400,1500,3200,4900], recovery: 3200, reward: 4900, arcHeight: 70 },
  9: { idea: 'Pyramid walls frame the key chamber; the upper escape stays open', foundations: [400,1600,4750,5550], recovery: 4750, reward: 5550, arcHeight: 50 },
  10: { idea: 'Oasis shelves separate the two climbing phrases', foundations: [400,1400,3900,4500], recovery: 3900, reward: 3900, arcHeight: 62 },
  11: { idea: 'Enemy waves around the dunes with a clear breath before the flag', foundations: [400,1300,2900,4400], recovery: 4400, reward: 5800, arcHeight: 44 },
  12: { idea: 'Covered stone islands before the final tomb ascent', foundations: [400,1500,2950,5300], recovery: 5300, reward: 7100, arcHeight: 58 },
  13: { idea: 'Lagoon reef, open water, then a calm grotto landing', foundations: [1710,3260,4100], recovery: 3260, reward: 2360, arcHeight: 55 },
  14: { idea: 'Tunnel halls alternate low trenches and an open recovery shelf', foundations: [1190,2210,5310,6090], recovery: 5310, reward: 8300, arcHeight: 40 },
  15: { idea: 'Choose the coral balcony or the lower key chamber', foundations: [1690,3020,6880], recovery: 6880, reward: 5500, arcHeight: 56 },
  16: { idea: 'Temple columns lead from the submerged corridor to an airy exit', foundations: [1920,2320,3350,6300], recovery: 8100, reward: 9820, arcHeight: 72 },
  17: { idea: 'Separate the deep-sea waves with a safe reef shelf', foundations: [1520,5470,8370,10470], recovery: 8370, reward: 11200, arcHeight: 44 },
  18: { idea: 'Rest shelves punctuate the rising-water ascent', foundations: [1730,2830,3720,5220], recovery: 7020, reward: 9120, arcHeight: 64 },
  19: { idea: 'Grippy snow introduces the first distinct ice rink', foundations: [600,2800,6130,8000], recovery: 6130, reward: 4260, arcHeight: 46 },
  20: { idea: 'Snow landing zones separate long ice approaches and crevasses', foundations: [600,2275,4900,7400], recovery: 7400, reward: 9900, arcHeight: 60 },
  21: { idea: 'Snow tunnel floor, frozen crossing, then a quiet snow apron', foundations: [600,1500,2300,8600], recovery: 8600, reward: 12000, arcHeight: 50 },
  22: { idea: 'Climb sheltered snow cliffs before crossing the upper ice lake', foundations: [725,3050,5500,7000], recovery: 5500, reward: 10200, arcHeight: 64 },
  23: { idea: 'Polar patrol waves with snow islands between slippery arenas', foundations: [800,2580,6210,8590], recovery: 6210, reward: 12100, arcHeight: 44 },
  24: { idea: 'Snow banks and covered ledges break up the icicle chase', foundations: [600,1875,4200,7000,9140], recovery: 9140, reward: 14200, arcHeight: 58 },
  25: { idea: 'Gentle cloud questions, a broad reward cloud, then the high perch', foundations: [280,1430,4900], recovery: 4900, reward: 4900, arcHeight: 80, depth: 20 },
  26: { idea: 'Gust crossings lead to broad clouds with breathing space', foundations: [300,2050,3550,6250], recovery: 6250, reward: 9500, arcHeight: 90, depth: 20 },
  27: { idea: 'Pipe clusters alternate with open cloud landings', foundations: [300,2480,5330,9250], recovery: 9250, reward: 11850, arcHeight: 76, depth: 20 },
  28: { idea: 'The sky ladder opens into a quiet middle cloud before the last climb', foundations: [300,2400,5550,9950], recovery: 5550, reward: 9950, arcHeight: 100, depth: 20 },
  29: { idea: 'Air encounters form waves, not a continuous firing gallery', foundations: [300,3150,8050,10300], recovery: 8050, reward: 10300, arcHeight: 72, depth: 20 },
  30: { idea: 'Crumbling bridges have recognisable solid cloud recovery islands', foundations: [300,3100,6150,9000], recovery: 6150, reward: 10800, arcHeight: 88, depth: 20 },
  31: { idea: 'Forest floor, side-entry treetop nest, then log crossings', foundations: [500,1500,2400,4650,6550], recovery: 3900, reward: 4650, arcHeight: 46, niche: { x: 760, floorTop: 488, type: 'wood' } },
  32: { idea: 'Clearing jumps alternate with grounded forest glades', foundations: [450,1450,2700,4800,7100], recovery: 4800, reward: 7100, arcHeight: 64 },
  33: { idea: 'Root caves have an upper path and a lower exploration pocket', foundations: [450,3100,5000,7850,10350], recovery: 5000, reward: 9250, arcHeight: 52 },
  34: { idea: 'Tree canopy climbs begin on substantial wooded hills', foundations: [450,1670,3850,5200,7600], recovery: 6500, reward: 7600, arcHeight: 68 },
  35: { idea: 'Beetle patrols arrive in pairs around protected forest glades', foundations: [450,2400,3400,4900,7100], recovery: 4900, reward: 7100, arcHeight: 44 },
  36: { idea: 'Falling branches alternate with safe rooted banks', foundations: [400,3250,5900,7900,10500], recovery: 10500, reward: 13900, arcHeight: 60 },
  37: { idea: 'Stone houses frame the market, bridge and locked balcony', foundations: [450,1100,1700,5050,7550], recovery: 5050, reward: 5550, arcHeight: 46 },
  38: { idea: 'Market squares provide pauses between stall roofs', foundations: [500,1800,3200,5700,7250,9350], recovery: 5700, reward: 7250, arcHeight: 58 },
  39: { idea: 'Sewer floors and raised chambers form distinct underground rooms', foundations: [500,1500,2050,3600,5500], recovery: 4800, reward: 8400, arcHeight: 48 },
  40: { idea: 'Solid chimneys support roof walks; a square divides the climbs', foundations: [500,2850,5850,8600], recovery: 5850, reward: 9450, arcHeight: 66 },
  41: { idea: 'Patrol courtyards are separated by a quiet market awning', foundations: [450,1500,3000,6350,8350], recovery: 6350, reward: 10000, arcHeight: 48 },
  42: { idea: 'Roof runs have stone courtyard recoveries before each gust phrase', foundations: [500,2550,6400,10850,13850], recovery: 10850, reward: 16200, arcHeight: 60 },
  43: { idea: 'Beach dunes surround the optional tide-pool detour', foundations: [450,1320,2570,3420,6470], recovery: 3420, reward: 5620, arcHeight: 70 },
  44: { idea: 'Boardwalks lead from the tidal water to sandy recovery shores', foundations: [400,2320,4820,7770], recovery: 4820, reward: 6570, arcHeight: 84 },
  45: { idea: 'Palm islands frame the lagoon and reward the upper grove route', foundations: [350,2100,3620,6020,6970], recovery: 6020, reward: 4620, arcHeight: 76 },
  46: { idea: 'Solid coastal cliffs alternate with breezy timber landings', foundations: [450,2010,3900,5425,7820], recovery: 7820, reward: 8620, arcHeight: 90 },
  47: { idea: 'Reef encounters arrive in waves around quiet sandy bays', foundations: [700,3720,6420,8220,13120], recovery: 8220, reward: 13120, arcHeight: 64 },
  48: { idea: 'Island ridges punctuate the rising-tide escape', foundations: [600,3170,4970,9240,11620], recovery: 9240, reward: 13320, arcHeight: 86 },
};

const top = (p: Platform) => p.y - p.h / 2;
const bottom = (p: Platform) => p.y + p.h / 2;
const overlapsX = (a: { x: number; w: number }, b: { x: number; w: number }) => Math.abs(a.x - b.x) < (a.w + b.w) / 2;

/** Add earth/building depth only into unoccupied space, never into a lower route. */
export function deepenSafeFoundation(level: LevelData, platform: Platform, depth: number): Platform {
  const lowerEdge = bottom(platform) + depth;
  const blockedByFloor = level.platforms.some(other => other !== platform && overlapsX(platform, other)
    && top(other) >= bottom(platform) && top(other) < lowerEdge + 64);
  const objects = [level.playerStart, level.goal, ...level.coins, ...level.questionBlocks,
    ...level.enemies, ...(level.keys || []), ...(level.checkpoints || [])];
  const blockedByObject = objects.some(point => Math.abs(point.x - platform.x) < platform.w / 2 + 16
    && point.y > bottom(platform) - 8 && point.y < lowerEdge + 32);
  const blockedByMover = (level.movingPlatforms || []).some(mover => {
    const rangeX = mover.moveType === 'vertical' ? 0 : mover.range;
    const rangeY = mover.moveType === 'horizontal' ? 0 : mover.range;
    return overlapsX(platform, { x: mover.x, w: mover.w + rangeX * 2 })
      && mover.y + rangeY + mover.h / 2 > bottom(platform)
      && mover.y - rangeY - mover.h / 2 < lowerEdge + 64;
  });
  if (blockedByFloor || blockedByObject || blockedByMover || platform.crumble) return { ...platform };
  return { ...platform, y: platform.y + depth / 2, h: platform.h + depth };
}

function arcOnPlatform(platform: Platform, height: number): { x: number; y: number }[] {
  const radius = Math.min(96, platform.w / 2 - 32);
  return Array.from({ length: 5 }, (_, i) => {
    const angle = Math.PI * i / 4;
    return { x: Math.round(platform.x - Math.cos(angle) * radius), y: Math.round(top(platform) - 48 - Math.sin(angle) * height) };
  });
}

/** Curated anchors add scenery mass, a reward phrase and a recovery beat, preserving jump tops. */
export function polishNatureLevel(level: LevelData): LevelData {
  const plan = NATURE_LEVEL_PLANS[level.id];
  if (!plan) return level;
  const platforms = level.platforms.map(platform => plan.foundations.includes(platform.x) && platform.w >= 240
    ? deepenSafeFoundation(level, platform, plan.depth ?? 144) : { ...platform });
  if (plan.niche) {
    const { x, floorTop, type } = plan.niche;
    // Open on the right: a genuine little shelter off the main path, not a sealed mandatory room.
    platforms.push({ x: x - 48, y: floorTop - 96, w: 64, h: 32, type });
    platforms.push({ x, y: floorTop - 96, w: 32, h: 32, type: 'hidden' });
    platforms.push({ x: x + 32, y: floorTop - 96, w: 32, h: 32, type });
    platforms.push({ x: x - 88, y: floorTop - 40, w: 16, h: 80, type });
  }
  const rewardPlatform = level.platforms.find(platform => platform.x === plan.reward && platform.w >= 240);
  const newCoins = rewardPlatform ? arcOnPlatform(rewardPlatform, plan.arcHeight) : [];
  const coins = [...level.coins];
  for (const coin of newCoins) {
    const insideSolid = platforms.some(platform => Math.abs(coin.x - platform.x) < platform.w / 2 + 10
      && coin.y + 10 > top(platform) && coin.y - 10 < bottom(platform));
    const touchesBlock = level.questionBlocks.some(block => Math.abs(coin.x - block.x) < 26 && Math.abs(coin.y - block.y) < 26);
    if (!insideSolid && !touchesBlock && !coins.some(c => Math.hypot(c.x - coin.x, c.y - coin.y) < 18)) coins.push(coin);
  }
  const recoveryPlatform = platforms.find(platform => platform.x === plan.recovery && platform.w >= 240);
  const groundTypes = new Set<EnemyType>(['goomba','koopa','spiny','robot','crab']);
  const naturalRobot: Partial<Record<LevelData['biome'], EnemyType>> = { desert: 'crab', water: 'crab', forest: 'goomba', village: 'koopa', 'beach-island': 'crab', 'ice-snow': 'koopa', 'sky-clouds': 'koopa' };
  const enemies = level.enemies.map(enemy => {
    // Robots belong to the factory; natural worlds keep their own recognizable cast.
    const preserveHordePin = level.id === 11;
    const type = enemy.type === 'robot' && !preserveHordePin ? naturalRobot[level.biome] ?? enemy.type
      : enemy.type === 'crab' && (level.biome === 'forest' || level.biome === 'village') ? 'goomba' : enemy.type;
    let x = enemy.x;
    if (recoveryPlatform && Math.abs(x - recoveryPlatform.x) < 130) {
      const landing = recoveryPlatform.x + Math.min(recoveryPlatform.w / 2 - 40, 220);
      if (landing > recoveryPlatform.x + 130 && landing < level.goal.x - 180) x = landing;
    }
    // Let the player inspect the flag landing without a last-moment collision.
    if (Math.abs(x - level.goal.x) < 160 && groundTypes.has(type)) {
      const goalFloor = platforms.find(p => Math.abs(p.x - x) <= p.w / 2 && Math.abs(top(p) - enemy.y) <= 90);
      if (goalFloor && goalFloor.w >= 400) x = Math.max(goalFloor.x - goalFloor.w / 2 + 60, level.goal.x - 240);
    }
    return { ...enemy, x, type };
  });
  return { ...level, platforms, coins, enemies };
}
