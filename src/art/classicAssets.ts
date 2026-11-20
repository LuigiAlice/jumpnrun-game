import type Phaser from 'phaser';
import { STORYBOOK as P, storybookPainter } from './storybookPrimitives';

/** Native canvases stay identical across states so Arcade hitboxes never jump with a pose. */
export const CLASSIC_TEXTURE_SIZES = {
  parakoopa: [32, 34], parakoopa_walk1: [32, 34], parakoopa_walk2: [32, 34],
  buzzy_beetle: [32, 34], buzzy_beetle_walk1: [32, 34], buzzy_beetle_walk2: [32, 34], buzzy_shell: [32, 34],
  bobomb: [28, 34], bobomb_walk1: [28, 34], bobomb_walk2: [28, 34], bobomb_lit: [28, 34],
  vine_segment: [24, 32], vine_top: [24, 32],
  firebar_orb: [16, 16], firebar_hub: [24, 24],
  red_ring: [48, 64], red_coin: [20, 28], red_coin_used: [20, 28],
} as const;

export function createClassicAssets(scene: Phaser.Scene): void {
  const p = storybookPainter(scene);
  const { g, ellipse, round, blob, eye, cheek, triangle } = p;
  const make = (key: keyof typeof CLASSIC_TEXTURE_SIZES, draw: () => void) => {
    const [width, height] = CLASSIC_TEXTURE_SIZES[key]; p.make(key, width, height, draw);
  };
  const feet = (width: number, phase: number) => {
    const stride = phase === 1 ? 1.8 : phase === 2 ? -1.8 : 0;
    blob(P.gold, P.goldShade, 3 + stride, 28, 10, 6);
    blob(P.gold, P.goldShade, width - 13 - stride, 28, 10, 6);
  };
  const para = (phase: number) => {
    feet(32, phase);
    const wy = phase === 2 ? 14 : 5;
    blob(P.cream, P.blue, 0, wy, 9, 15); blob(P.cream, P.blue, 4, wy + 3, 9, 14);
    ellipse(0xffffff, 1.5, wy + 2, 4, 8); ellipse(0xffffff, 5.5, wy + 5, 4, 8);
    blob(P.red, P.redShade, 8, 11, 19, 19);
    round(P.cream, 9, 25, 18, 4, 2); round(P.redShade, 15, 14, 2, 10, 1);
    blob(P.gold, P.goldShade, 20, 2, 12, 20);
    ellipse(P.gold, 22, 16, 9, 9); eye(25, 5, 5, 8); cheek(26, 15, 4);
  };
  const shell = (bottom = false) => {
    const y = bottom ? 18 : 10;
    blob(P.blue, P.blueShade, 2, y, 28, 16);
    round(P.cream, 3, y + 12, 26, 3, 1.5);
    round(P.blueShade, 15, y + 3, 2, 9, 1);
    ellipse(0xffffff, 7, y + 3, 7, 3, 0.5);
  };
  const beetle = (phase: number) => {
    feet(32, phase); blob(P.gold, P.goldShade, 21, 20, 10, 10); shell();
    eye(25, 21, 4, 6); cheek(26, 27, 3);
  };
  const bomb = (phase: number, lit = false) => {
    feet(28, phase);
    round(P.goldShade, 0, 16, 8, 4, 2); round(P.gold, 0, 13, 4, 11, 2);
    round(P.outline, 11, 4, 6, 8, 2); round(P.gold, 12, 4, 4, 6, 2);
    round(P.cream, 14, 1, 2, 5, 1);
    if (lit) {
      blob(P.red, P.redShade, 10, 0, 10, 8); ellipse(P.gold, 12, 0, 6, 5); ellipse(P.cream, 14, 1, 2, 3);
    }
    blob(lit ? P.red : P.blue, lit ? P.redShade : P.blueShade, 4, 9, 23, 22);
    eye(14, 16, 5, 8); eye(21, 16, 5, 8); cheek(12, 24, 5);
  };
  for (const [key, draw] of [['parakoopa', para], ['buzzy_beetle', beetle], ['bobomb', bomb]] as const) {
    make(key, () => draw(0));
    make(`${key}_walk1`, () => draw(1)); make(`${key}_walk2`, () => draw(2));
  }
  make('buzzy_shell', () => shell(true)); make('bobomb_lit', () => bomb(0, true));
  const vine = (top: boolean) => {
    round(P.greenShade, 10, top ? 6 : 0, 5, top ? 26 : 32, 2);
    round(P.green, 11, top ? 7 : 0, 2, top ? 25 : 32, 1);
    blob(P.green, P.greenShade, 1, 6, 11, 8); blob(P.green, P.greenShade, 13, 18, 10, 8);
    ellipse(P.cream, 3, 8, 5, 2, 0.4); ellipse(P.cream, 16, 20, 4, 2, 0.4);
    if (top) blob(P.green, P.greenShade, 8, 0, 9, 10);
  };
  make('vine_segment', () => vine(false)); make('vine_top', () => vine(true));
  make('firebar_orb', () => {
    blob(P.red, P.redShade, 0, 0, 16, 16); ellipse(P.gold, 3, 2, 11, 12); ellipse(P.cream, 5, 3, 5, 7);
  });
  make('firebar_hub', () => {
    blob(P.blue, P.blueShade, 0, 0, 24, 24); blob(P.gold, P.goldShade, 7, 7, 10, 10);
    for (const x of [4, 18]) for (const y of [4, 18]) ellipse(P.cream, x, y, 2, 2);
  });
  make('red_ring', () => {
    // Ellipse strokes leave the central opening entirely transparent.
    g.lineStyle(6, P.redShade, 1); g.strokeEllipse(24, 32, 40, 56);
    g.lineStyle(3, P.red, 1); g.strokeEllipse(24, 31.5, 40, 55);
    ellipse(P.cream, 14, 2, 12, 2.5, 0.8); ellipse(P.gold, 3, 16, 2.5, 10);
  });
  const coin = (used: boolean) => {
    blob(used ? P.blue : P.red, used ? P.blueShade : P.redShade, 1, 0, 18, 28);
    if (used) {
      round(P.cream, 6, 14, 3, 6, 1); round(P.cream, 9, 9, 3, 10, 1);
    } else {
      round(P.gold, 9, 6, 3, 15, 1.5); triangle(P.cream, 6, 8, 8, 6, 8, 19);
    }
  };
  make('red_coin', () => coin(false)); make('red_coin_used', () => coin(true));
  p.destroy();
}
