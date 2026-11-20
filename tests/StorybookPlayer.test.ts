import { describe, expect, it, vi } from 'vitest';
import { createStorybookPlayer, STORYBOOK_PLAYER_SIZES } from '../src/art/storybookPlayer';

interface Shape { kind: 'ellipse' | 'rounded'; color: number; alpha: number; args: number[] }
function capture() {
  const assets = new Map<string, { size: number[]; shapes: Shape[] }>();
  let shapes: Shape[] = [];
  let color = 0, alpha = 1;
  const graphics = {
    clear: () => { shapes = []; },
    fillStyle: (next: number, opacity = 1) => { color = next; alpha = opacity; },
    fillEllipse: (...args: number[]) => shapes.push({ kind: 'ellipse', color, alpha, args }),
    fillRoundedRect: (...args: number[]) => shapes.push({ kind: 'rounded', color, alpha, args }),
    generateTexture: (key: string, w: number, h: number) => assets.set(key, { size: [w, h], shapes: shapes.map(shape => ({ ...shape, args: [...shape.args] })) }),
    destroy: vi.fn(),
  };
  createStorybookPlayer({ add: { graphics: () => graphics }, textures: { exists: () => false, remove: vi.fn() } } as any);
  return { assets, graphics };
}

function bounds(shape: Shape): number[] {
  const [x, y, w, h] = shape.args;
  return shape.kind === 'ellipse' ? [x - w / 2, y - h / 2, x + w / 2, y + h / 2] : [x, y, x + w, y + h];
}

describe('Storybook adventurer art', () => {
  it('keeps all native player canvases stable across soft run and jump poses', () => {
    const { assets, graphics } = capture();
    expect(assets.size).toBe(13);
    for (const [key, size] of Object.entries(STORYBOOK_PLAYER_SIZES)) expect(assets.get(key)?.size, key).toEqual(size);
    for (const prefix of ['player', 'player_big', 'player_fire']) {
      const idle = assets.get(`${prefix}_idle`)!;
      const run1 = assets.get(`${prefix}_walk1`)!;
      const run2 = assets.get(`${prefix}_walk2`)!;
      const jump = assets.get(`${prefix}_jump`)!;
      expect(run1.shapes).not.toEqual(run2.shapes);
      expect(jump.shapes).not.toEqual(idle.shapes);
      for (const frame of [idle, run1, run2, jump]) {
        expect(Math.max(...frame.shapes.map(shape => bounds(shape)[3]))).toBeCloseTo(52, 6);
      }
    }
    expect(graphics.destroy).toHaveBeenCalledOnce();
  });

  it('draws rounded shaded silhouettes entirely inside each native canvas', () => {
    const { assets } = capture();
    for (const [key, asset] of assets) {
      const [w, h] = asset.size;
      expect(asset.shapes.length, key).toBeGreaterThan(4);
      expect(asset.shapes.some(shape => shape.alpha < 1), `${key} needs soft highlights`).toBe(true);
      for (const shape of asset.shapes) {
        const [left, top, right, bottom] = bounds(shape);
        expect(shape.args.every(Number.isFinite), key).toBe(true);
        expect(left, `${key} left`).toBeGreaterThanOrEqual(-0.001);
        expect(top, `${key} top`).toBeGreaterThanOrEqual(-0.001);
        expect(right, `${key} right`).toBeLessThanOrEqual(w + 0.001);
        expect(bottom, `${key} bottom`).toBeLessThanOrEqual(h + 0.001);
      }
    }
    expect(assets.get('player_idle')!.shapes.some(shape => shape.kind === 'rounded')).toBe(true);
    expect(assets.get('player_fire_idle')!.shapes).not.toEqual(assets.get('player_big_idle')!.shapes);
  });
});
