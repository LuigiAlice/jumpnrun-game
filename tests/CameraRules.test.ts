import { expect, it } from 'vitest';
import { constrainCameraX } from '../src/engine/CameraRules';

it('follows both directions through exploration rooms while preserving classic forward framing', () => {
  const route = [0, 240, 480, 360, 180, 540];
  const trace = (mode?: 'bidirectional') => {
    let last = 0;
    return route.map(scroll => last = constrainCameraX(scroll, last, mode));
  };
  expect(trace('bidirectional')).toEqual(route);
  expect(trace()).toEqual([0, 240, 480, 480, 480, 540]);
});

it('lets coin-gate players return for missing coins without an invisible forward camera wall', () => {
  expect(constrainCameraX(200, 1200, undefined, 25)).toBe(200);
  expect(constrainCameraX(200, 1200, undefined, 0)).toBe(1200);
});
