import { describe, expect, it, vi } from 'vitest';
import { createStorybookDecorations, createStorybookScenery, STORYBOOK_LAYER_HEIGHTS, STORYBOOK_SCENERY } from '../src/art/storybookScenery';

function capture() {
  type Asset = { width: number; height: number; calls: unknown[][] };
  const assets = new Map<string, Asset>();
  let calls: unknown[][] = [];
  const graphics = {
    clear: () => { calls = []; },
    fillStyle: (...args: unknown[]) => calls.push(['color', ...args]),
    fillEllipse: (...args: unknown[]) => calls.push(['ellipse', ...args]),
    fillRoundedRect: (...args: unknown[]) => calls.push(['rounded', ...args]),
    fillRect: (...args: unknown[]) => calls.push(['rect', ...args]),
    generateTexture: (key: string, width: number, height: number) => assets.set(key, { width, height, calls: calls.map(call => [...call]) }),
    destroy: vi.fn(),
  };
  const scene = { add: { graphics: () => graphics }, textures: { exists: () => true, remove: vi.fn() } };
  return { assets, graphics, scene };
}

describe('Storybook biome scenery', () => {
  it('generates seven correctly sized decorative layers for all fifteen biomes', () => {
    const { scene, assets, graphics } = capture();
    createStorybookScenery(scene as any);
    expect(assets.size).toBe(105);
    expect(Object.keys(STORYBOOK_SCENERY)).toHaveLength(15);
    for (const biome of Object.keys(STORYBOOK_SCENERY)) {
      STORYBOOK_LAYER_HEIGHTS.forEach((height, layer) => {
        const asset = assets.get(`bg_${biome}_${layer}`)!;
        expect(asset, `${biome} layer ${layer}`).toBeDefined();
        expect([asset.width, asset.height]).toEqual([1200, height]);
        expect(asset.calls.some(call => call[0] === 'ellipse')).toBe(true);
        if (layer > 0) expect(asset.calls.some(call => call[0] === 'rect')).toBe(false);
      });
    }
    expect(graphics.destroy).toHaveBeenCalledOnce();
  });

  it('uses distinctive biome motifs and deterministic drawing without noisy random decoration', () => {
    const first = capture(), second = capture();
    createStorybookScenery(first.scene as any); createStorybookScenery(second.scene as any);
    expect([...first.assets]).toEqual([...second.assets]);
    const motifs = Object.keys(STORYBOOK_SCENERY).map(biome => {
      // Geometry itself, not just the chosen colours, identifies the landscape.
      return JSON.stringify(first.assets.get(`bg_${biome}_4`)!.calls.filter(call => call[0] !== 'color'));
    });
    expect(new Set(motifs).size).toBe(15);
    const grasses = first.assets.get('bg_grasslands_4')!;
    // Wrapped drawing puts clipped copies on both sides, avoiding a unique cut-off edge.
    expect(grasses.calls.some(call => call[0] === 'ellipse' && (call[1] as number) < 0)).toBe(true);
    expect(grasses.calls.some(call => call[0] === 'ellipse' && (call[1] as number) > 1200)).toBe(true);
  });

  it('keeps decorative keys at their original logical sizes while adding curved silhouettes', () => {
    const { scene, assets } = capture();
    createStorybookDecorations(scene as any);
    const sizes: Record<string, number[]> = {
      tree: [44,60], bush: [40,35], cloud: [60,40], flower: [24,32], mushroom: [24,28],
      house: [64,56], cactus: [32,50], rock: [32,40], palm: [32,52],
    };
    expect(assets.size).toBe(Object.keys(sizes).length);
    for (const [key, size] of Object.entries(sizes)) {
      const asset = assets.get(key)!;
      expect([asset.width, asset.height], key).toEqual(size);
      expect(asset.calls.some(call => call[0] === 'ellipse' || call[0] === 'rounded'), key).toBe(true);
    }
  });
});
