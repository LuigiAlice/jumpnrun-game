import { describe, expect, it, vi } from 'vitest';
import { TerrainTextures, terrainRows } from '../src/rendering/terrain';

describe('Native-scale terrain', () => {
  it('covers a tall platform once with a cap and then fill without stretching', () => {
    const rows = terrainRows(270, 32, 32);
    expect(rows[0]).toEqual({ y: 0, height: 32, fill: false });
    expect(rows.slice(1).every(row => row.fill && row.height <= 32)).toBe(true);
    expect(rows.reduce((sum, row) => sum + row.height, 0)).toBe(270);
    expect(rows.at(-1)).toEqual({ y: 256, height: 14, fill: true });
    expect(terrainRows(24, 32, 32)).toEqual([{ y: 0, height: 24, fill: false }]);
  });

  it('repeats original-size pixels, caches columns and releases them on scene shutdown', () => {
    const cap = { width: 32, height: 32 };
    const fill = { width: 32, height: 32 };
    const draw = vi.fn();
    const refresh = vi.fn();
    const remove = vi.fn();
    let shutdown = () => {};
    const scene = {
      events: { once: (_event: string, callback: () => void) => { shutdown = callback; } },
      textures: {
        get: (key: string) => ({ getSourceImage: () => key.endsWith('_fill') ? fill : cap }),
        exists: () => true,
        createCanvas: vi.fn(() => ({ context: { imageSmoothingEnabled: true, drawImage: draw }, refresh })),
        remove,
      },
    };
    const terrain = new TerrainTextures(scene as any);
    const key = terrain.surface('ground_grass', 270);
    expect(scene.textures.createCanvas).toHaveBeenCalledWith(key, 32, 270);
    expect(draw.mock.calls[0][0]).toBe(cap);
    expect(draw.mock.calls[1][0]).toBe(fill);
    for (const call of draw.mock.calls) {
      // Source and destination widths/heights are identical: no scaled-up grass or dirt.
      expect(call[3]).toBe(call[7]);
      expect(call[4]).toBe(call[8]);
    }
    expect(terrain.surface('ground_grass', 270)).toBe(key);
    expect(refresh).toHaveBeenCalledTimes(1);
    shutdown();
    expect(remove).toHaveBeenCalledWith(key);
  });
});
