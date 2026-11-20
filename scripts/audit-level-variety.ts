/**
 * Read-only audit of authored level data. Run from the repository root:
 * ./node_modules/.bin/esbuild scripts/audit-level-variety.ts --bundle --platform=node --format=esm --outfile=/tmp/jumpnrun-variety-audit.mjs
 * node /tmp/jumpnrun-variety-audit.mjs > docs/level-variety-metrics.json
 *
 * Uses the project's existing transitive esbuild installation; adds no dependency.
 * Feature presence is not a quality score. Surface widths include overlapping and
 * optional platforms, so the dominant-height share does not describe a played path.
 */
import { ALL_LEVELS } from '../src/data/levels/index';
import type { LevelData } from '../src/data/levels/index';

const levels = ALL_LEVELS;
const countLevels = (predicate: (level: LevelData) => boolean): number => levels.filter(predicate).length;
const features = [
  'springs', 'spikes', 'checkpoints', 'windZones', 'waterZones', 'keys', 'doors',
  'cannons', 'vines', 'fireBars', 'redCoinChallenges', 'goals', 'pipeWarps',
] as const;

function statistics(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  // This audit currently has an even number of levels. Use the conventional median.
  const middle = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  return { min: sorted[0], median, max: sorted[sorted.length - 1] };
}

const biomes = [...new Set(levels.map(level => level.biome))].map(biome => {
  const group = levels.filter(level => level.biome === biome);
  return {
    biome,
    levelIds: group.map(level => level.id),
    widths: group.map(level => level.width),
    heights: group.map(level => level.height),
    enemyCounts: group.map(level => level.enemies.length),
    enemyKinds: [...new Set(group.flatMap(level => level.enemies.map(enemy => enemy.type)))].sort(),
  };
});

const surfaces = levels.map(level => {
  const widthPerTop = new Map<number, number>();
  for (const platform of level.platforms) {
    if (platform.type === 'lava' || platform.type === 'pipe') continue;
    const top = platform.y - platform.h / 2;
    widthPerTop.set(top, (widthPerTop.get(top) ?? 0) + platform.w);
  }
  const ranked = [...widthPerTop].sort((a, b) => b[1] - a[1]);
  const totalSurfaceWidth = ranked.reduce((sum, [, width]) => sum + width, 0);
  return {
    id: level.id,
    name: level.name,
    dominantTop: ranked[0][0],
    dominantWidth: ranked[0][1],
    totalSurfaceWidth,
    dominantShare: Number((ranked[0][1] / totalSurfaceWidth).toFixed(4)),
    distinctTops: ranked.length,
  };
});

const enemyGaps = levels.flatMap(level => {
  const positions = level.enemies.map(enemy => enemy.x).sort((a, b) => a - b);
  return positions.slice(1).map((x, index) => x - positions[index]);
});

const report = {
  schemaVersion: 1,
  source: 'ALL_LEVELS after biome polish, classic expansion and twelve main-route rewrites, before ensureSolvable',
  limitations: [
    'Element presence does not measure player use, distinctiveness or quality.',
    'Widths do not measure play time; heights are world bounds, not path elevation.',
    'Dominant surfaces sum platform widths including overlaps and optional routes; they do not trace a played path.',
    'Enemy gaps compare x coordinates only, ignoring vertical separation and enemy behaviour.',
    'The audit is deterministic and reads level data without changing gameplay.',
  ],
  levelCount: levels.length,
  biomeCount: biomes.length,
  widths: statistics(levels.map(level => level.width)),
  worldHeights: statistics(levels.map(level => level.height)),
  levelsAtLeast12000Wide: countLevels(level => level.width >= 12000),
  totalWidth: levels.reduce((sum, level) => sum + level.width, 0),
  featurePresence: Object.fromEntries(features.map(feature => [feature, countLevels(level => !!level[feature]?.length)])),
  movingPlatforms: countLevels(level => !!level.movingPlatforms?.length),
  enemyPresence: Object.fromEntries(['goomba', 'koopa', 'robot'].map(type => [
    type, countLevels(level => level.enemies.some(enemy => enemy.type === type)),
  ])),
  coinGates: countLevels(level => !!level.coinGoal),
  timeGates: countLevels(level => level.timeGate !== undefined),
  risingFinales: countLevels(level => !!level.rising),
  fallingHazardFinales: countLevels(level => !!level.fallingHazards),
  recurringWorldOrder: {
    firstIsShortestIncludingTies: biomes.filter(group => group.widths[0] === Math.min(...group.widths)).length,
    sixthAmongTwoLongestIncludingTies: biomes.filter(group => group.widths[5] >= [...group.widths].sort((a, b) => a - b)[4]).length,
    fifthHasMostEnemiesIncludingTies: biomes.filter(group => group.enemyCounts[4] === Math.max(...group.enemyCounts)).length,
  },
  dominantSurfaceLevels: Object.fromEntries([0.5, 0.65, 0.7].map(threshold => [
    threshold, surfaces.filter(surface => surface.dominantWidth / surface.totalSurfaceWidth >= threshold).length,
  ])),
  enemyHorizontalGaps: statistics(enemyGaps),
  biomes,
  surfaces,
};

console.log(JSON.stringify(report, null, 2));
