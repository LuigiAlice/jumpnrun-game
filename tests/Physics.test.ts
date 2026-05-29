import { describe, it, expect } from 'vitest';
import { Physics, DEFAULT_PHYSICS } from '../src/engine/Physics';
import type { MovingPlatformData } from '../src/engine/Physics';

function makePlat(x: number, y: number, w: number, h: number, type = 'grass') {
  return { x, y, w, h, type } as any;
}

function makeMP(x: number, y: number, moveType: 'horizontal' | 'vertical' | 'circular', range: number, speed = 20, w = 100, h = 24): MovingPlatformData {
  return { x, y, w, h, type: 'cloud', moveType, range, speed };
}

describe('Physics - getMaxHorizontalJump', () => {
  it('same height jump should return 246px', () => {
    const ph = new Physics([], 800, 600);
    const d = (ph as any).getMaxHorizontalJump(0);
    expect(d).toBeCloseTo(246, 0);
  });

  it('upward jump (negative vDiff) should return 246px', () => {
    const ph = new Physics([], 800, 600);
    const d = (ph as any).getMaxHorizontalJump(-50);
    expect(d).toBeCloseTo(246, 0);
  });

  it('downward jump of 100px should return longer distance', () => {
    const ph = new Physics([], 800, 600);
    const d = (ph as any).getMaxHorizontalJump(100);
    // t = (900+sqrt(810000+2*2000*100))/2000 = (900+sqrt(1210000))/2000 = (900+1100)/2000 = 1.0
    // d = 300*1.0 - 24 = 276
    expect(d).toBeCloseTo(276, 0);
  });

  it('downward jump of 500px should return even longer distance', () => {
    const ph = new Physics([], 800, 600);
    const d = (ph as any).getMaxHorizontalJump(500);
    // t = (900+sqrt(810000+2*2000*500))/2000 = (900+sqrt(2810000))/2000 = (900+1676)/2000 = 1.288
    // d = 300*1.288 - 24 = 362.4
    expect(d).toBeCloseTo(362.4, 0);
  });

  it('max fall down should be 1000px', () => {
    expect(DEFAULT_PHYSICS.MAX_FALL_DOWN).toBe(1000);
  });

  it('max jump up should be 350px', () => {
    expect(DEFAULT_PHYSICS.MAX_JUMP_UP).toBe(350);
  });
});

describe('Physics - horizontalJumpCheck', () => {
  it('gap within physics max should return true', () => {
    const ph = new Physics([], 800, 600);
    expect((ph as any).horizontalJumpCheck(200, 0)).toBe(true);
  });

  it('gap beyond physics max should return false', () => {
    const ph = new Physics([], 800, 600);
    expect((ph as any).horizontalJumpCheck(500, 0)).toBe(false);
  });

  it('gap far beyond physics max should return false', () => {
    const ph = new Physics([], 800, 600);
    expect((ph as any).horizontalJumpCheck(600, 0)).toBe(false);
  });
});

describe('Physics - canJumpTo', () => {
  it('adjacent platforms at same height should be reachable', () => {
    const a = makePlat(100, 500, 200, 40);
    const b = makePlat(400, 500, 200, 40);
    const ph = new Physics([a, b], 800, 600);
    expect((ph as any).canJumpTo(a, b)).toBe(true);
  });

  it('distant platforms at same height should NOT be reachable', () => {
    const a = makePlat(100, 500, 200, 40);
    const b = makePlat(1500, 500, 200, 40);
    const ph = new Physics([a, b], 800, 600);
    expect((ph as any).canJumpTo(a, b)).toBe(false);
  });

  it('platform reachable with drop should be reachable', () => {
    const a = makePlat(100, 400, 200, 40);
    const b = makePlat(500, 500, 200, 40);
    const ph = new Physics([a, b], 800, 600);
    expect((ph as any).canJumpTo(a, b)).toBe(true);
  });

  it('platform too far up should NOT be reachable', () => {
    const a = makePlat(100, 500, 200, 40);
    const b = makePlat(300, 100, 200, 40);
    const ph = new Physics([a, b], 800, 600);
    expect((ph as any).canJumpTo(a, b)).toBe(false);
  });

  it('overlapping platforms should be reachable', () => {
    const a = makePlat(100, 500, 200, 40);
    const b = makePlat(200, 500, 200, 40);
    const ph = new Physics([a, b], 800, 600);
    expect((ph as any).canJumpTo(a, b)).toBe(true);
  });
});

describe('Physics - canJumpToMovingPlatform', () => {
  it('nearby moving platform should be reachable', () => {
    const a = makePlat(100, 500, 200, 40);
    const mp = makeMP(500, 500, 'horizontal', 50);
    const ph = new Physics([a], 800, 600, [mp]);
    expect((ph as any).canJumpToMovingPlatform(a, mp)).toBe(true);
  });

  it('distant moving platform should NOT be reachable', () => {
    const a = makePlat(100, 500, 200, 40);
    const mp = makeMP(1500, 500, 'horizontal', 50);
    const ph = new Physics([a], 800, 600, [mp]);
    expect((ph as any).canJumpToMovingPlatform(a, mp)).toBe(false);
  });

  it('moving platform reachable at one extreme but not center should still be reachable', () => {
    const a = makePlat(100, 500, 200, 40);
    const mp = makeMP(400, 500, 'horizontal', 300, 20, 100, 24);
    // Leftmost: x=100, left=50, right=150
    // From a (right=200) to mp leftmost (left=50): gap = 200-50 = 150 (negative, overlap)
    // From a (left=0) to mp leftmost (right=150): gap = max(0, 0-150) = 0
    // Actually the mp swings from x=400-300=100 to 400+300=700
    // Leftmost: left=100-50=50, right=150
    // From a right=200, gap to mp leftmost left=50: max(50-200, 0-150, 0) = max(-150, -150, 0) = 0
    // So it's reachable because it overlaps at the leftmost extent
    const ph = new Physics([a], 800, 600, [mp]);
    expect((ph as any).canJumpToMovingPlatform(a, mp)).toBe(true);
  });

  it('moving platform too high should NOT be reachable', () => {
    const a = makePlat(100, 500, 200, 40);
    const mp = makeMP(300, 50, 'horizontal', 50);
    const ph = new Physics([a], 800, 600, [mp]);
    expect((ph as any).canJumpToMovingPlatform(a, mp)).toBe(false);
  });

  it('vertical moving platform should be reachable when at same height', () => {
    const a = makePlat(100, 500, 200, 40);
    const mp = makeMP(350, 500, 'vertical', 100);
    const ph = new Physics([a], 800, 600, [mp]);
    expect((ph as any).canJumpToMovingPlatform(a, mp)).toBe(true);
  });

  it('circular moving platform near origin should be reachable', () => {
    const a = makePlat(100, 500, 200, 40);
    const mp = makeMP(350, 500, 'circular', 50);
    const ph = new Physics([a], 800, 600, [mp]);
    expect((ph as any).canJumpToMovingPlatform(a, mp)).toBe(true);
  });
});

describe('Physics - canJumpFromMovingPlatform', () => {
  it('should be able to jump from moving platform to nearby static', () => {
    const a = makePlat(500, 500, 200, 40);
    const mp = makeMP(100, 500, 'horizontal', 50);
    const ph = new Physics([a], 800, 600, [mp]);
    expect((ph as any).canJumpFromMovingPlatform(mp, a)).toBe(true);
  });

  it('should NOT be able to jump from moving platform to distant static', () => {
    const a = makePlat(1500, 500, 200, 40);
    const mp = makeMP(100, 500, 'horizontal', 50);
    const ph = new Physics([a], 800, 600, [mp]);
    expect((ph as any).canJumpFromMovingPlatform(mp, a)).toBe(false);
  });
});

describe('Physics - getStaticPlatformReachableFromMoving', () => {
  it('should return reachable static platforms from moving platform', () => {
    const a = makePlat(500, 500, 200, 40);
    const b = makePlat(1500, 500, 200, 40);
    const mp = makeMP(100, 500, 'horizontal', 50);
    const ph = new Physics([a, b], 800, 600, [mp]);
    const reachable = (ph as any).getStaticPlatformReachableFromMoving(mp, new Set());
    expect(reachable).toContain(a);
    expect(reachable).not.toContain(b);
  });
});

describe('Physics - findPlatformUnderPoint', () => {
  it('should find platform below a point', () => {
    const p = makePlat(200, 500, 200, 40);
    const ph = new Physics([p], 800, 600);
    const result = (ph as any).findPlatformUnderPoint(200, 480);
    expect(result).toBe(p);
  });

  it('should return platform below a point that is slightly above it', () => {
    const p = makePlat(200, 500, 200, 40);
    const ph = new Physics([p], 800, 600);
    // Platform top=480, point y=470 → point is 10px above platform top
    const result = (ph as any).findPlatformUnderPoint(200, 470);
    expect(result).toBe(p);
  });

  it('should return null when point is far horizontally from platform', () => {
    const p = makePlat(200, 500, 200, 40);
    const ph = new Physics([p], 800, 600);
    // Point x=600, platform covers x=100-300 → far away
    const result = (ph as any).findPlatformUnderPoint(600, 470);
    expect(result).toBeNull();
  });

  it('should return platform when feet are on platform top (at same y as top)', () => {
    const p = makePlat(200, 500, 200, 40);
    const ph = new Physics([p], 800, 600);
    // Player feet at y=480 which is exactly platform top
    const result = (ph as any).findPlatformUnderPoint(200, 480);
    expect(result).toBe(p);
  });
});

describe('Physics - isSolvable', () => {
  it('single platform with goal on it should be solvable', () => {
    const p = makePlat(200, 500, 400, 40);
    const ph = new Physics([p], 800, 600);
    expect(ph.isSolvable(200, 480, 400, 480)).toBe(true);
  });

  it('empty platforms should not be solvable', () => {
    const ph = new Physics([], 800, 600);
    expect(ph.isSolvable(200, 480, 400, 480)).toBe(false);
  });

  it('two connected platforms should be solvable', () => {
    const a = makePlat(100, 500, 200, 40);
    const b = makePlat(400, 500, 200, 40);
    const ph = new Physics([a, b], 800, 600);
    expect(ph.isSolvable(200, 480, 500, 480)).toBe(true);
  });

  it('disconnected platforms should not be solvable', () => {
    const a = makePlat(100, 500, 200, 40);
    const b = makePlat(1500, 500, 200, 40);
    const ph = new Physics([a, b], 800, 600);
    expect(ph.isSolvable(200, 480, 1600, 480)).toBe(false);
  });
});

describe('Physics - findPath', () => {
  it('should find a path between two connected platforms', () => {
    const a = makePlat(100, 500, 200, 40);
    const b = makePlat(400, 500, 200, 40);
    const ph = new Physics([a, b], 800, 600);
    const path = ph.findPath(200, 480, 500, 480);
    expect(path).not.toBeNull();
    expect(path!.length).toBeGreaterThanOrEqual(1);
  });

  it('should return null for disconnected platforms', () => {
    const a = makePlat(100, 500, 200, 40);
    const b = makePlat(1500, 500, 200, 40);
    const ph = new Physics([a, b], 800, 600);
    const path = ph.findPath(200, 480, 1600, 480);
    expect(path).toBeNull();
  });
});

describe('Physics - isFullyTraversable', () => {
  it('single platform should be fully traversable', () => {
    const p = makePlat(200, 500, 400, 40);
    const ph = new Physics([p], 800, 600);
    const result = ph.isFullyTraversable(200, 480);
    expect(result.traversable).toBe(true);
    expect(result.unreachablePlatforms).toHaveLength(0);
  });

  it('connected platforms should be fully traversable', () => {
    const a = makePlat(100, 500, 200, 40);
    const b = makePlat(400, 500, 200, 40);
    const ph = new Physics([a, b], 800, 600);
    const result = ph.isFullyTraversable(200, 480);
    expect(result.traversable).toBe(true);
  });

  it('disconnected platforms should show unreachable', () => {
    const a = makePlat(100, 500, 200, 40);
    const b = makePlat(1500, 500, 200, 40);
    const ph = new Physics([a, b], 800, 600);
    const result = ph.isFullyTraversable(200, 480);
    expect(result.traversable).toBe(false);
    expect(result.unreachablePlatforms).toHaveLength(1);
    expect(result.unreachablePlatforms[0]).toBe(b);
  });
});

describe('Physics - isGoalOnPlatform', () => {
  it('goal on platform should return true', () => {
    const p = makePlat(200, 500, 400, 40);
    const ph = new Physics([p], 800, 600);
    expect(ph.isGoalOnPlatform(300, 480)).toBe(true);
  });

  it('goal off platform should return false', () => {
    const p = makePlat(200, 500, 400, 40);
    const ph = new Physics([p], 800, 600);
    expect(ph.isGoalOnPlatform(500, 300)).toBe(false);
  });
});

describe('Physics - moving platform integration', () => {
  it('level with reachable moving platform should be solvable', () => {
    const a = makePlat(100, 500, 200, 40);
    const b = makePlat(600, 500, 200, 40);
    const mp = makeMP(350, 500, 'horizontal', 100, 20, 100, 24);
    const ph = new Physics([a, b], 800, 600, [mp]);
    expect(ph.isSolvable(200, 480, 700, 480)).toBe(true);
  });

  it('level with too-distant moving platform should NOT be solvable', () => {
    const a = makePlat(100, 500, 200, 40);
    const b = makePlat(2000, 500, 200, 40);
    const mp = makeMP(400, 500, 'horizontal', 50, 20, 100, 24);
    const ph = new Physics([a, b], 800, 600, [mp]);
    expect(ph.isSolvable(200, 480, 2100, 480)).toBe(false);
  });
});

describe('Physics constants', () => {
  it('MAX_JUMP_DISTANCE should be 800', () => {
    expect(DEFAULT_PHYSICS.MAX_JUMP_DISTANCE).toBe(800);
  });
});
