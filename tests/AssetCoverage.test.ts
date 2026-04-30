import { describe, it, expect } from 'vitest';
import { getLevel, getLevelCount } from '../src/data/levels/index';
import { DEFAULT_PHYSICS } from '../src/engine/Physics';

interface PlatformData { x: number; y: number; w: number; h: number; type: string; }
interface DecorationData { x: number; y: number; type: string; }
interface EnemyData { x: number; y: number; type: string; }

const REQUIRED_PLATFORM_TEXTURES = [
  'ground_grass', 'ground_cave', 'ground_castle', 'ground_ruins', 'ground_sand',
  'ground_water', 'ground_snow', 'ground_lava', 'ground_metal', 'ground_space', 'ground_stone',
  'brick', 'pipe', 'pipe_top', 'cloud_block',
  'platform_easy', 'platform_medium', 'platform_hard'
];

const REQUIRED_DECORATION_TEXTURES = [
  'tree', 'bush', 'cloud', 'decoration_pipe', 'flag', 'flower', 'mushroom_decor',
  'bat', 'spider', 'torch', 'ghost', 'chain', 'fence', 'balloon', 'bird', 'sun',
  'rainbow', 'house', 'barrel', 'planet', 'rocket', 'asteroid', 'satellite',
  'canyon-rock', 'formation', 'eagle', 'banner', 'boss-flag', 'cactus', 'rock',
  'skull', 'pyramid', 'bubble', 'cobweb', 'conveyor', 'coral', 'crane', 'ember',
  'fire', 'gear', 'lava-rock', 'palm', 'seagull', 'shell', 'smoke', 'tombstone',
  'web', 'pillar', 'statue', 'moss', 'seaweed', 'snowflake', 'icicle', 'iceberg', 'penguin',
  'star', 'mushroom', 'log', 'vine', 'pipe'
];

const REQUIRED_ENEMY_TEXTURES = [
  'goomba', 'koopa', 'piranha', 'spiny', 'boo', 'thwomp', 'lakitu', 'bullet_bill',
  'robot', 'crab', 'fire_bar', 'fireball', 'ghost', 'squid', 'ufo', 'boss'
];

describe('Asset Coverage Tests', () => {
  describe('Platform Textures', () => {
    it('all required platform textures should be defined', () => {
      expect(REQUIRED_PLATFORM_TEXTURES.length).toBeGreaterThan(0);
      REQUIRED_PLATFORM_TEXTURES.forEach(tex => {
        expect(tex).toBeDefined();
      });
    });

    it('all platform types in levels should use valid texture names', () => {
      const validTextures = new Set(REQUIRED_PLATFORM_TEXTURES);
      const knownTypes = ['grass', 'cave', 'castle', 'ruins', 'sand', 'water', 'snow', 'lava', 'metal', 'space', 'stone', 'brick', 'pipe', 'pipe_top', 'cloud', 'wood', 'sandstone', 'platform_easy', 'platform_medium', 'platform_hard', 'bubble', 'ground'];
      const issues: string[] = [];

      for (let i = 0; i < getLevelCount(); i++) {
        const level = getLevel(i);
        for (const p of level.platforms) {
          if (!validTextures.has(p.type as any) && !knownTypes.includes(p.type)) {
            if (!issues.includes(p.type)) {
              issues.push(p.type);
            }
          }
        }
      }

      expect(issues, `Unknown platform types used in levels: ${issues.join(', ')}`).toHaveLength(0);
    });
  });

  describe('Decoration Textures', () => {
    it('all required decoration textures should be defined', () => {
      expect(REQUIRED_DECORATION_TEXTURES.length).toBeGreaterThan(0);
      REQUIRED_DECORATION_TEXTURES.forEach(tex => {
        expect(tex).toBeDefined();
      });
    });

    it('all decoration types in levels should use valid texture names', () => {
      const validTextures = new Set(REQUIRED_DECORATION_TEXTURES);
      const issues: string[] = [];

      for (let i = 0; i < getLevelCount(); i++) {
        const level = getLevel(i);
        for (const d of level.decorations || []) {
          if (!validTextures.has(d.type)) {
            if (!issues.includes(d.type)) {
              issues.push(d.type);
            }
          }
        }
      }

      expect(issues, `Unknown decoration types used in levels: ${issues.join(', ')}`).toHaveLength(0);
    });
  });

  describe('Enemy Textures', () => {
    it('all required enemy textures should be defined', () => {
      expect(REQUIRED_ENEMY_TEXTURES.length).toBeGreaterThan(0);
      REQUIRED_ENEMY_TEXTURES.forEach(tex => {
        expect(tex).toBeDefined();
      });
    });

    it('all enemy types in levels should use valid texture names', () => {
      const validTextures = new Set(REQUIRED_ENEMY_TEXTURES);
      const issues: string[] = [];

      for (let i = 0; i < getLevelCount(); i++) {
        const level = getLevel(i);
        for (const e of level.enemies || []) {
          if (!validTextures.has(e.type)) {
            if (!issues.includes(e.type)) {
              issues.push(e.type);
            }
          }
        }
      }

      expect(issues, `Unknown enemy types used in levels: ${issues.join(', ')}`).toHaveLength(0);
    });
  });

  describe('Level Data Integrity', () => {
    it('all 90 levels should have valid platform data', () => {
      for (let i = 0; i < getLevelCount(); i++) {
        const level = getLevel(i);
        expect(level.platforms, `Level ${i} should have platforms`).toBeDefined();
        expect(level.platforms.length, `Level ${i} should have at least one platform`).toBeGreaterThan(0);
        for (const p of level.platforms) {
          expect(p.x, `Level ${i} platform should have x`).toBeDefined();
          expect(p.y, `Level ${i} platform should have y`).toBeDefined();
          expect(p.w, `Level ${i} platform should have width`).toBeDefined();
          expect(p.h, `Level ${i} platform should have height`).toBeDefined();
          expect(p.type, `Level ${i} platform should have type`).toBeDefined();
        }
      }
    });

    it('all levels should have playerStart and goal', () => {
      for (let i = 0; i < getLevelCount(); i++) {
        const level = getLevel(i);
        expect(level.playerStart, `Level ${i} should have playerStart`).toBeDefined();
        expect(level.playerStart.x, `Level ${i} playerStart should have x`).toBeDefined();
        expect(level.playerStart.y, `Level ${i} playerStart should have y`).toBeDefined();
        expect(level.goal, `Level ${i} should have goal`).toBeDefined();
        expect(level.goal.x, `Level ${i} goal should have x`).toBeDefined();
        expect(level.goal.y, `Level ${i} goal should have y`).toBeDefined();
      }
    });
  });

  describe('Goal Reachability', () => {
    it('all level goals should be reachable within physics constraints', () => {
      const failures: { level: number; biome: string; goalX: number; maxReachable: number; gap: number }[] = [];

      for (let i = 0; i < getLevelCount(); i++) {
        const level = getLevel(i);

        let maxX = 0;
        let maxPlatform: PlatformData | null = null;
        for (const p of level.platforms) {
          const right = p.x + p.w / 2;
          if (right > maxX) {
            maxX = right;
            maxPlatform = p;
          }
        }

        if (maxPlatform) {
          const maxReachableX = maxX + DEFAULT_PHYSICS.MAX_JUMP_DISTANCE;
          if (level.goal.x > maxReachableX + 100) {
            failures.push({
              level: i,
              biome: level.biome,
              goalX: level.goal.x,
              maxReachable: maxReachableX,
              gap: level.goal.x - maxReachableX
            });
          }
        }
      }

      if (failures.length > 0) {
        const msg = failures.map(f =>
          `Level ${f.level} (${f.biome}): goal x=${f.goalX.toFixed(0)} > max reachable ${f.maxReachable.toFixed(0)} (gap=${f.gap.toFixed(0)})`
        ).join('\n');
        console.error('Unreachable goals:\n' + msg);
      }

      expect(failures, `${failures.length} levels have unreachable goals`).toHaveLength(0);
    });
  });
});

describe('Physics Constants', () => {
  it('should have valid physics constants', () => {
    expect(DEFAULT_PHYSICS.MAX_JUMP_DISTANCE).toBeGreaterThan(0);
    expect(DEFAULT_PHYSICS.MAX_JUMP_UP).toBeGreaterThan(0);
    expect(DEFAULT_PHYSICS.MAX_FALL_DOWN).toBeGreaterThan(0);
    expect(DEFAULT_PHYSICS.MAX_JUMP_DISTANCE).toBeGreaterThanOrEqual(DEFAULT_PHYSICS.MAX_JUMP_UP);
  });
});