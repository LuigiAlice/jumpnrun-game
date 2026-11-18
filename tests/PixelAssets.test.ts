import { describe, expect, it, vi } from 'vitest';
import { ANIMATED_ENEMY_TEXTURES, createPixelBlocks, createPixelCoins, createPixelEnemies, createPixelItems } from '../src/art/pixelAssets';

function generateAssets() {
  const dimensions = new Map<string, [number, number]>();
  const drawings = new Map<string, number[][]>();
  let rectangles: number[][] = [];
  const graphics = {
    clear: () => { rectangles = []; }, fillStyle: vi.fn(),
    fillRect: (...rectangle: number[]) => rectangles.push(rectangle),
    generateTexture: (key: string, width: number, height: number) => {
      dimensions.set(key, [width, height]); drawings.set(key, rectangles.map(r => [...r]));
    },
    destroy: vi.fn(),
  };
  const scene = { add: { graphics: () => graphics }, textures: { exists: () => false, remove: vi.fn() } };
  for (const generate of [createPixelEnemies, createPixelCoins, createPixelBlocks, createPixelItems]) generate(scene as any);
  return { dimensions, drawings };
}

describe('Generated pixel assets', () => {
  it('generates actual animation frames at identical collision-safe sizes', () => {
    const { dimensions, drawings } = generateAssets();
    for (const [enemy, size] of Object.entries(ANIMATED_ENEMY_TEXTURES)) {
      expect(dimensions.get(enemy)).toEqual(size);
      expect(dimensions.get(`${enemy}_walk1`)).toEqual(size);
      expect(dimensions.get(`${enemy}_walk2`)).toEqual(size);
      expect(drawings.get(`${enemy}_walk1`)).not.toEqual(drawings.get(`${enemy}_walk2`));
    }
    expect(dimensions.get('koopa_shell')).toEqual(dimensions.get('koopa'));
    expect(drawings.get('koopa_shell')).not.toEqual(drawings.get('koopa'));
    for (const [open, closed] of [['piranha_open', 'piranha_closed'], ['boo', 'boo_shy']]) {
      expect(dimensions.get(open)).toEqual(dimensions.get(closed));
      expect(drawings.get(open)).not.toEqual(drawings.get(closed));
    }
    for (let phase = 1; phase <= 4; phase++) expect(dimensions.get(`coin_spin${phase}`)).toEqual(dimensions.get('coin'));
  });

  it('draws integer pixels and separate terrain caps, fills and pipe lips', () => {
    const { dimensions, drawings } = generateAssets();
    expect(dimensions.size).toBeGreaterThanOrEqual(70);
    for (const rectangles of drawings.values()) for (const rect of rectangles) {
      expect(rect.every(Number.isInteger)).toBe(true);
      expect(rect[2]).toBeGreaterThan(0);
      expect(rect[3]).toBeGreaterThan(0);
    }
    for (const type of ['grass', 'snow', 'sand', 'ice', 'cave', 'castle', 'ruins', 'metal', 'space', 'stone']) {
      expect(dimensions.get(`ground_${type}`)).toEqual([32, 32]);
      expect(dimensions.get(`ground_${type}_fill`)).toEqual([32, 32]);
      expect(drawings.get(`ground_${type}`)).not.toEqual(drawings.get(`ground_${type}_fill`));
    }
    expect(dimensions.get('pipe')).toEqual([64, 64]);
    expect(dimensions.get('pipe_top')).toEqual([80, 24]);
  });
});
