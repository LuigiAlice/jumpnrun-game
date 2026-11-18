import { describe, expect, it, vi } from 'vitest';
import { CLASSIC_TEXTURE_SIZES, createClassicAssets } from '../src/art/classicAssets';

function capture() {
  const assets = new Map<string, { size: number[]; rectangles: number[][] }>();
  let rectangles: number[][] = [];
  let color = 0;
  const graphics = {
    clear: () => { rectangles = []; },
    fillStyle: (next: number) => { color = next; },
    fillRect: (...rectangle: number[]) => rectangles.push([color, ...rectangle]),
    generateTexture: (key: string, width: number, height: number) => assets.set(key, { size: [width, height], rectangles: rectangles.map(rect => [...rect]) }),
    destroy: vi.fn(),
  };
  createClassicAssets({ add: { graphics: () => graphics }, textures: { exists: () => false } } as any);
  return { assets, graphics };
}

describe('Classic expansion pixel assets', () => {
  it('generates every runtime key with stable native enemy and shell dimensions', () => {
    const { assets, graphics } = capture();
    expect(assets.size).toBe(Object.keys(CLASSIC_TEXTURE_SIZES).length);
    for (const [key, size] of Object.entries(CLASSIC_TEXTURE_SIZES)) expect(assets.get(key)?.size, key).toEqual(size);
    for (const type of ['parakoopa', 'buzzy_beetle', 'bobomb']) {
      expect(assets.get(`${type}_walk1`)?.size).toEqual(assets.get(type)?.size);
      expect(assets.get(`${type}_walk2`)?.size).toEqual(assets.get(type)?.size);
      expect(assets.get(`${type}_walk1`)?.rectangles).not.toEqual(assets.get(`${type}_walk2`)?.rectangles);
    }
    expect(assets.get('buzzy_shell')?.size).toEqual(assets.get('buzzy_beetle')?.size);
    expect(assets.get('buzzy_shell')?.rectangles.every(([, , y]) => y >= 18)).toBe(true);
    expect(graphics.destroy).toHaveBeenCalledOnce();
  });

  it('draws integral unclipped pixels and distinguishes dangerous and collected states', () => {
    const { assets } = capture();
    for (const [key, { size: [width, height], rectangles }] of assets) {
      expect(rectangles.length, key).toBeGreaterThan(0);
      for (const [, x, y, w, h] of rectangles) {
        expect([x, y, w, h].every(Number.isInteger), key).toBe(true);
        expect(x, key).toBeGreaterThanOrEqual(0); expect(y, key).toBeGreaterThanOrEqual(0);
        expect(w, key).toBeGreaterThan(0); expect(h, key).toBeGreaterThan(0);
        expect(x + w, key).toBeLessThanOrEqual(width); expect(y + h, key).toBeLessThanOrEqual(height);
      }
    }
    expect(assets.get('bobomb_lit')?.rectangles).not.toEqual(assets.get('bobomb')?.rectangles);
    expect(assets.get('red_coin_used')?.rectangles).not.toEqual(assets.get('red_coin')?.rectangles);
    // Red ring's central opening must remain transparent, preserving gameplay readability.
    expect(assets.get('red_ring')?.rectangles.some(([, x, y, w, h]) => x <= 24 && x + w > 24 && y <= 32 && y + h > 32)).toBe(false);
  });
});
