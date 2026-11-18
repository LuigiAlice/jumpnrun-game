import { describe, expect, it, vi } from 'vitest';
import { ClassicElements, fireBarAngle, redCoinTimeLeft } from '../src/engine/ClassicElements';
import type { LevelData } from '../src/data/levels';

class Sprite {
  active = true; visible = true; alpha = 1; destroyed = false; text = ''; texture = '';
  width = 22; height = 32;
  body: any;
  constructor(public x: number, public y: number, key = '') {
    this.texture = key;
    const sprite = this;
    this.body = { enable: true, allowGravity: true, velocity: { x: 0, y: 0 }, blocked: { down: false },
      get left() { return sprite.x - sprite.width / 2; }, get right() { return sprite.x + sprite.width / 2; },
      get top() { return sprite.y - sprite.height / 2; }, get bottom() { return sprite.y + sprite.height / 2; },
      setAllowGravity: vi.fn(function(this: any, value: boolean) { this.allowGravity = value; return this; }),
      setCircle: vi.fn(function(this: any) { return this; }),
      setVelocityX: function(value: number) { this.velocity.x = value; return this; },
      setVelocityY: function(value: number) { this.velocity.y = value; return this; },
      reset: vi.fn((x: number, y: number) => { this.x = x; this.y = y; }),
    };
  }
  setX(value: number) { this.x = value; return this; }
  setDepth() { return this; } setOrigin() { return this; } setScrollFactor() { return this; }
  setTint() { return this; }
  setAlpha(value: number) { this.alpha = value; return this; }
  setActive(value: boolean) { this.active = value; return this; }
  setVisible(value: boolean) { this.visible = value; return this; }
  setTexture(value: string) { this.texture = value; return this; }
  setText(value: string) { this.text = value; return this; }
  destroy() { this.destroyed = true; this.body.enable = false; }
}

function fixture(extra: Partial<LevelData> = {}) {
  const groups: any[] = [], nodes: Sprite[] = [], overlaps: any[] = [];
  const node = (x: number, y: number, key = '') => { const sprite = new Sprite(x, y, key); nodes.push(sprite); return sprite; };
  const group = () => {
    const children: Sprite[] = [];
    const g = { children, create: (x: number, y: number, key: string) => { const sprite = node(x, y, key); children.push(sprite); return sprite; },
      clear: vi.fn(() => { children.forEach(child => child.destroy()); children.length = 0; }), destroy: vi.fn() };
    groups.push(g); return g;
  };
  const scene = {
    physics: { add: { group, staticGroup: group, overlap: (left: any, right: any, callback: any) => {
      const collider = { left, right, callback, world: {}, destroy: vi.fn() }; overlaps.push(collider); return collider;
    } } },
    add: { image: node, tileSprite: (x: number, y: number, _w: number, _h: number, key: string) => node(x, y, key), text: node },
    events: { once: vi.fn(), off: vi.fn() }, cameras: { main: { width: 1200 } },
  };
  const level = { id: 1, biome: 'grasslands', platforms: [], coins: [], questionBlocks: [], enemies: [], decorations: [],
    name: 'fixture', width: 1200, height: 800, playerStart: { x: 100, y: 200 }, goal: { x: 1000, y: 200 }, timeBonus: 120, ...extra } as LevelData;
  const player = new Sprite(100, 200);
  const callbacks = { hit: vi.fn(), reward: vi.fn(), coin: vi.fn() };
  const elements = new ClassicElements(scene as any, player as any, level, callbacks);
  return { scene, level, player, callbacks, elements, groups, nodes, overlaps };
}

const redTrial = { x: 100, y: 200, coins: [{ x: 150, y: 150 }, { x: 200, y: 150 }], durationMs: 1000, reward: 'oneup' as const };

describe('Classic optional elements', () => {
  it('rotates fire bars on game time with fixed-size bodies and no respawn allocations', () => {
    expect(fireBarAngle(1000, Math.PI / 2, Math.PI)).toBeCloseTo(Math.PI * 1.5);
    const f = fixture({ fireBars: [{ x: 100, y: 100, length: 2, angularSpeed: Math.PI / 2 }] });
    const count = f.nodes.length;
    const orbs = f.groups[0].children;
    expect(orbs[0].body.setCircle).toHaveBeenCalledWith(6, 2, 2);
    expect(orbs[0].body.allowGravity).toBe(false);
    f.elements.update(1000);
    expect(orbs[1].x).toBeCloseTo(100);
    expect(orbs[1].y).toBeCloseTo(132);
    f.elements.update(0);
    expect(f.nodes).toHaveLength(count);
    f.overlaps[0].callback(f.player, orbs[0]);
    expect(f.callbacks.hit).toHaveBeenCalledTimes(1);
  });

  it('reveals timed red coins and grants their reward exactly once', () => {
    const f = fixture({ redCoinChallenges: [redTrial] });
    const [ring] = f.groups[1].children;
    const [a, b] = f.groups[2].children;
    expect(a.visible).toBe(false);
    expect(a.body.enable).toBe(false);
    f.overlaps[1].callback(f.player, ring);
    expect(a.visible && a.body.enable).toBe(true);
    f.overlaps[2].callback(f.player, a);
    f.overlaps[2].callback(f.player, a);
    expect(f.callbacks.coin).toHaveBeenCalledTimes(1);
    expect(f.callbacks.reward).not.toHaveBeenCalled();
    f.overlaps[2].callback(f.player, b);
    f.overlaps[2].callback(f.player, b);
    f.overlaps[1].callback(f.player, ring);
    expect(f.callbacks.reward).toHaveBeenCalledTimes(1);
    expect(f.callbacks.reward).toHaveBeenCalledWith('oneup', 100, 200);
    expect(ring.body.enable).toBe(false);
    expect(f.callbacks.coin).toHaveBeenCalledTimes(2);
  });

  it('expires trials in game time and requires leaving the ring before retrying', () => {
    expect(redCoinTimeLeft(1000, 250)).toBe(750);
    expect(redCoinTimeLeft(1000, -500)).toBe(1000);
    expect(redCoinTimeLeft(1000, 1500)).toBe(0);
    const f = fixture({ redCoinChallenges: [redTrial] });
    const ring = f.groups[1].children[0], coin = f.groups[2].children[0];
    f.overlaps[1].callback(f.player, ring);
    f.elements.update(1100);
    expect(coin.body.enable).toBe(false);
    f.overlaps[1].callback(f.player, ring);
    f.elements.update(16);
    expect(coin.body.enable).toBe(false);
    f.player.x = 500;
    f.elements.update(16);
    f.player.x = 100;
    f.overlaps[1].callback(f.player, ring);
    expect(coin.body.enable).toBe(true);
    expect(coin.texture).toBe('red_coin');
    expect(f.callbacks.reward).not.toHaveBeenCalled();
  });

  it('climbs vines, holds still, jumps off and restores gravity only after owning it', () => {
    const f = fixture({ vines: [{ x: 100, y: 300, height: 200 }] });
    const input = { up: true, down: false, jumpDown: false, horizontal: 0 };
    expect(f.elements.handleClimbing(input)).toEqual({ climbing: true, launched: false });
    expect(f.player.body.velocity.y).toBe(-180);
    expect(f.player.body.allowGravity).toBe(false);
    f.elements.handleClimbing({ ...input, up: false });
    expect(f.player.body.velocity.y).toBe(0);
    expect(f.elements.handleClimbing({ ...input, jumpDown: true })).toEqual({ climbing: false, launched: true });
    expect(f.player.body.velocity.y).toBe(-450);
    expect(f.player.body.allowGravity).toBe(true);
    f.elements.handleClimbing(input);
    expect(f.elements.isClimbing).toBe(true);
    f.elements.handleClimbing({ ...input, horizontal: 1 });
    expect(f.elements.isClimbing).toBe(false);
    expect(f.player.body.allowGravity).toBe(true);
    f.elements.handleClimbing(input, true);
    expect(f.elements.isClimbing).toBe(false);
  });

  it('tolerates Phaser systems tearing down colliders and groups before its shutdown listener', () => {
    const f = fixture();
    for (const collider of f.overlaps) collider.world = null;
    for (const group of f.groups) group.children = undefined;
    expect(() => f.elements.destroy()).not.toThrow();
    for (const collider of f.overlaps) expect(collider.destroy).not.toHaveBeenCalled();
  });

  it('releases groups and colliders once without reactivating a dead player on shutdown', () => {
    const f = fixture({ vines: [{ x: 100, y: 300, height: 200 }], redCoinChallenges: [redTrial] });
    f.elements.handleClimbing({ up: true, down: false, jumpDown: false, horizontal: 0 });
    f.player.body.setAllowGravity.mockClear();
    f.elements.destroy();
    f.elements.destroy();
    expect(f.player.body.setAllowGravity).not.toHaveBeenCalled();
    for (const collider of f.overlaps) expect(collider.destroy).toHaveBeenCalledTimes(1);
    for (const group of f.groups) expect(group.destroy).toHaveBeenCalledTimes(1);
    expect(f.scene.events.off).toHaveBeenCalledWith('shutdown', expect.any(Function));
    const count = f.nodes.length;
    f.elements.update(1000);
    expect(f.nodes).toHaveLength(count);
  });
});
