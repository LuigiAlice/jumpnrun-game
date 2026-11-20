import type Phaser from 'phaser';
import { STORYBOOK as P, storybookPainter } from './storybookPrimitives';

// Public names remain stable for saved levels; the artwork is now softly rounded, not pixelated.
export const ANIMATED_ENEMY_TEXTURES = {
  goomba: [28, 42], koopa: [32, 34], spiny: [28, 32], robot: [28, 34], crab: [28, 34],
} as const;

export function createPixelEnemies(scene: Phaser.Scene): void {
  const p = storybookPainter(scene);
  const { make, ellipse: e, round: r, blob, eye, cheek, mouth, triangle: t } = p;
  const feet = (w: number, y: number, phase: number, color = P.brown) => {
    const stride = phase === 1 ? 1.8 : phase === 2 ? -1.8 : 0;
    blob(color, P.brown, 2 + stride, y, 10, 4.5);
    blob(color, P.brown, w - 12 - stride, y, 10, 4.5);
  };
  const walkers = {
    goomba: (phase: number) => {
      feet(28, 37, phase);
      blob(0xf5d3a1, 0xc99170, 6, 23, 16, 15);
      blob(0xcb8b71, 0x9e5e60, 0.5, 5, 27, 26);
      e(0xf1bf92, 3, 7, 14, 5, 0.75);
      eye(6, 18, 6, 9); eye(17, 18, 6, 9);
      cheek(3, 27); cheek(21, 27); mouth(11, 29, 6);
    },
    koopa: (phase: number) => {
      feet(32, 29, phase, P.goldShade);
      blob(P.green, P.greenShade, 2, 11, 22, 20);
      e(P.greenShade, 10, 13, 2, 12); e(P.cream, 4, 26, 22, 4);
      blob(P.gold, P.goldShade, 19, 2, 12, 22);
      e(P.gold, 21, 16, 10, 10); eye(23, 6, 6, 9); cheek(21, 16, 5); mouth(25, 20, 5);
    },
    spiny: (phase: number) => {
      feet(28, 27, phase, P.redShade);
      blob(P.red, P.redShade, 2, 9, 24, 19);
      for (const [x, y] of [[4, 6], [12, 2], [20, 6]]) {
        t(P.outline, x, 14, x + 2, y, x + 6, 14); t(P.cream, x + 1, 13, x + 2.5, y + 2, x + 4.5, 13);
      }
      e(P.cream, 3, 23, 22, 4); eye(20, 18, 5, 7); cheek(18, 25, 4);
    },
    robot: (phase: number) => {
      feet(28, 29, phase, P.blueShade);
      r(P.outline, 2, 5, 24, 24, 7); r(P.blueShade, 3, 6, 22, 22, 6);
      r(P.blue, 4, 6, 20, 19, 6); e(P.cream, 6, 7, 11, 3, 0.55);
      r(P.outline, 6, 12, 16, 8, 3); eye(8, 12.5, 5, 6); eye(17, 12.5, 4, 6);
      mouth(11, 23, 7); r(P.blueShade, 0, 16, 4, 10, 2); r(P.blueShade, 24, 16, 4, 10, 2);
      r(P.outline, 12, 1, 3, 5, 1); blob(P.red, P.redShade, 10, 0, 7, 4);
    },
    crab: (phase: number) => {
      const lift = phase === 1 ? 2 : phase === 2 ? -2 : 0;
      for (let i = 0; i < 3; i++) { e(P.redShade, 2 + i * 2, 26 + (i % 2 ? lift / 2 : 0), 7, 5); e(P.redShade, 19 - i * 2, 26 - (i % 2 ? lift / 2 : 0), 7, 5); }
      blob(P.red, P.redShade, 3, 15, 22, 15);
      r(P.redShade, 7, 10, 4, 10, 2); r(P.redShade, 18, 10, 4, 10, 2);
      blob(P.red, P.redShade, 0, 11 - lift, 7, 10); blob(P.red, P.redShade, 21, 11 + lift, 7, 10);
      eye(7, 7, 5, 9); eye(18, 7, 5, 9); cheek(5, 22, 5); cheek(19, 22, 5); mouth(12, 25, 5);
    },
  };
  for (const type of Object.keys(walkers) as (keyof typeof walkers)[]) {
    const [w, h] = ANIMATED_ENEMY_TEXTURES[type];
    make(type, w, h, () => walkers[type](0));
    for (const phase of [1, 2]) make(`${type}_walk${phase}`, w, h, () => walkers[type](phase));
  }
  make('koopa_shell', 32, 34, () => { blob(P.green, P.greenShade, 2, 18, 28, 16); e(P.greenShade, 15, 21, 2, 9); e(P.cream, 3, 30, 26, 3); });
  const piranha = (open: boolean) => {
    r(P.greenShade, 12, 19, 5, 25, 2); e(P.green, 3, 30, 12, 6); e(P.green, 15, 27, 12, 6);
    blob(P.red, P.redShade, 1, 1, 26, 25);
    e(P.cream, 5, 6, 5, 5); e(P.cream, 17, 4, 5, 4); e(P.cream, 10, 18, 5, 4);
    r(P.outline, 13, 11, 13, open ? 9 : 3, 4);
    r(P.cream, 13, 10, 13, 2, 1); r(P.cream, 13, open ? 19 : 14, 13, 2, 1);
    if (open) { t(P.cream, 15, 12, 18, 12, 16, 15); t(P.cream, 22, 18, 25, 18, 24, 15); }
  };
  make('piranha', 28, 44, () => piranha(true)); make('piranha_open', 28, 44, () => piranha(true)); make('piranha_closed', 28, 44, () => piranha(false));
  const ghost = (shy: boolean, color = P.cream, height = 34) => {
    blob(color, 0xc4d8eb, 2, 2, 28, 27);
    for (let i = 0; i < 3; i++) e(color, 5 + i * 8, 22, 6, height - 23);
    if (shy) { e(P.blueShade, 13, 12, 3, 3); e(P.blueShade, 23, 12, 3, 3); blob(0xdce5fa, 0xc4d8eb, 10, 16, 9, 8); blob(0xdce5fa, 0xc4d8eb, 21, 16, 9, 8); }
    else { eye(12, 10, 5, 8); eye(22, 10, 5, 8); e(P.redShade, 17, 21, 7, 5); cheek(9, 20, 5); cheek(25, 20, 4); }
  };
  make('boo', 32, 34, () => ghost(false)); make('boo_shy', 32, 34, () => ghost(true)); make('ghost', 32, 32, () => ghost(false, 0xc8eaf3, 32));
  make('bullet_bill', 30, 26, () => { blob(0x7c8eaf, P.blueShade, 2, 3, 26, 22); r(P.outline, 23, 7, 7, 14, 3); eye(8, 9, 7, 9, -1); e(P.cream, 22, 15, 7, 6); e(P.cream, 0, 8, 5, 4); });
  make('thwomp', 32, 34, () => { r(P.outline, 1, 2, 30, 31, 7); r(0x8eabc0, 3, 4, 26, 27, 6); r(0xbdd5df, 4, 5, 23, 6, 3); eye(7, 13, 6, 8); eye(20, 13, 6, 8); r(P.outline, 9, 25, 15, 4, 2); r(P.cream, 12, 25, 3, 2, 1); });
  make('lakitu', 40, 40, () => { blob(P.green, P.greenShade, 9, 4, 15, 23); blob(P.gold, P.goldShade, 17, 3, 14, 22); eye(20, 9, 5, 8); eye(27, 9, 5, 8); blob(P.cream, 0xc5dcee, 2, 23, 36, 16); e(P.cream, 8, 19, 21, 17); e(P.blueShade, 17, 29, 3, 4); e(P.blueShade, 26, 29, 3, 4); });
  make('squid', 32, 32, () => { blob(P.cream, 0xb9daeb, 5, 1, 23, 24); for (let i = 0; i < 4; i++) r(P.cream, 3 + i * 7, 19, 5, 12 - i % 2 * 3, 2.5); eye(10, 10, 5, 8); eye(20, 10, 5, 8); cheek(7, 19, 5); cheek(23, 19, 5); });
  make('ufo', 32, 44, () => { blob(P.blue, P.blueShade, 6, 7, 20, 18); blob(0xb2abd9, P.blueShade, 0, 21, 32, 13); e(P.cream, 6, 25, 4, 3); e(P.gold, 22, 25, 4, 3); e(P.goldShade, 10, 32, 12, 8); e(P.red, 13, 36, 6, 7); });
  make('boss', 32, 36, () => {
    feet(32, 31, 0, P.goldShade); blob(P.green, P.greenShade, 1, 11, 25, 23);
    blob(0xf7c56e, P.goldShade, 15, 3, 16, 24); eye(22, 7, 6, 9); cheek(21, 18, 5); r(P.redShade, 23, 21, 8, 4, 2);
    t(P.cream, 16, 8, 17, 0, 20, 7); t(P.cream, 25, 8, 28, 1, 29, 9);
    for (let y = 13; y <= 25; y += 6) t(P.cream, 5, y, 0, y + 2, 5, y + 5);
  });
  make('fire_bar', 32, 32, () => { for (let i = 0; i < 4; i++) { blob(P.red, P.redShade, i * 8, 10, 8, 12); e(P.gold, i * 8 + 2, 12, 4, 7); } });
  p.destroy();
}

export function createPixelCoins(scene: Phaser.Scene): void {
  const p = storybookPainter(scene);
  const coin = (width: number) => { p.blob(P.gold, P.goldShade, 12 - width / 2, 2, width, 28); p.ellipse(P.cream, 13 - width / 2, 6, 2, 16, 0.9); if (width > 8) p.round(P.goldShade, 11, 10, 3, 12, 1.5); };
  p.make('coin', 24, 32, () => coin(18));
  [18, 12, 6, 12].forEach((width, i) => p.make(`coin_spin${i + 1}`, 24, 32, () => coin(width)));
  p.destroy();
}

export function createPixelBlocks(scene: Phaser.Scene): void {
  const p = storybookPainter(scene);
  const { make, rect, round: r, ellipse: e } = p;
  const terrains: Record<string, { fill: number; dark: number; fleck: number; cap: number; light: number }> = {
    grass: { fill: 0xc99072, dark: 0xaf755f, fleck: 0xe8bc91, cap: 0x8ed978, light: 0xd5efa0 },
    snow: { fill: 0x9ebed1, dark: 0x82a7c2, fleck: 0xc2dfeb, cap: 0xf3fcff, light: 0xffffff },
    sand: { fill: 0xe2bb7f, dark: 0xc49b69, fleck: 0xf5d8a5, cap: 0xf2d592, light: 0xffedbb },
    ice: { fill: 0x91d1e7, dark: 0x69accd, fleck: 0xc4edf3, cap: 0xe0faff, light: 0xffffff },
    cave: { fill: 0x9983a9, dark: 0x786b90, fleck: 0xb6a2c3, cap: 0xc4a6d0, light: 0xe1caec },
    castle: { fill: 0x8d9bb8, dark: 0x6c7e9d, fleck: 0xb2c1d5, cap: 0xafc3de, light: 0xe0e7f7 },
    ruins: { fill: 0xbba485, dark: 0x9a876f, fleck: 0xddc9a7, cap: 0xe4d3ae, light: 0xf7e8c8 },
    metal: { fill: 0x93afb9, dark: 0x708e9d, fleck: 0xc0d1d7, cap: 0xc0d8dc, light: 0xe9f5f4 },
    space: { fill: 0x8e8cbd, dark: 0x706d9e, fleck: 0xb9b1dd, cap: 0xc6c4ed, light: 0xe9e4ff },
    stone: { fill: 0xb3a9aa, dark: 0x948a99, fleck: 0xd1c4be, cap: 0xd5c7c3, light: 0xf0e4dd },
  };
  for (const [name, colors] of Object.entries(terrains)) {
    const fill = () => { rect(colors.fill, 0, 0, 32, 32); e(colors.fleck, 4, 6, 8, 4, 0.65); e(colors.dark, 23, 21, 5, 3, 0.4); e(colors.fleck, 13, 26, 5, 3, 0.55); };
    make(`ground_${name}_fill`, 32, 32, fill);
    make(`ground_${name}`, 32, 32, () => {
      fill(); rect(colors.dark, 0, 5, 32, 4); rect(colors.cap, 0, 0, 32, 7); rect(colors.light, 0, 0, 32, 2);
      if (name === 'grass' || name === 'snow') { e(colors.cap, 0, 3, 12, 7); e(colors.cap, 10, 4, 12, 6); e(colors.cap, 20, 3, 12, 7); }
      if (name === 'grass') { e(0xf4a5b1, 7, 3, 3, 3); e(0xffe5a0, 23, 4, 3, 3); }
      if (name === 'ice') { r(colors.light, 5, 13, 2, 7, 1); r(colors.light, 8, 10, 6, 2, 1); }
    });
  }
  make('ground_water', 32, 32, () => { rect(0x77b9d8, 0, 0, 32, 32); e(0xc6edf2, 1, 3, 12, 4, 0.7); e(0xb0e5ef, 18, 7, 13, 3, 0.55); });
  make('ground_lava', 32, 32, () => { rect(0xb75667, 0, 0, 32, 32); rect(0xf89777, 0, 0, 32, 9); e(0xffd08a, 2, 2, 11, 5); e(0xffb580, 20, 4, 10, 5); });
  const block = (used: boolean) => {
    r(P.outline, 0, 0, 32, 32, 6); r(used ? 0xc5aa91 : P.goldShade, 1, 1, 30, 30, 5);
    r(used ? 0xddc6aa : P.gold, 2, 2, 28, 26, 5); r(used ? 0xead8c0 : 0xffedac, 4, 3, 23, 3, 1.5);
    for (const x of [5, 25]) for (const y of [5, 25]) e(used ? 0x9f8a80 : 0xb98751, x, y, 2, 2);
    if (!used) {
      // Thick rounded strokes keep the question mark readable at native size.
      r(P.outline, 9, 7, 14, 4, 2); r(P.outline, 19, 9, 4, 8, 2); r(P.outline, 14, 15, 8, 4, 2); r(P.outline, 13, 17, 4, 5, 2); e(P.outline, 13, 25, 4, 4);
    }
  };
  make('question', 32, 32, () => block(false)); make('question_used', 32, 32, () => block(true));
  make('brick', 32, 32, () => { rect(0xaf7e77, 0, 0, 32, 32); for (const [x, y, w] of [[1, 1, 14], [17, 1, 14], [1, 17, 6], [9, 17, 14], [25, 17, 6]]) { r(0xe7a38a, x, y, w, 14, 2); r(0xf5c4a2, x + 1, y + 1, Math.max(2, w - 2), 2, 1); } });
  const pipe = (w: number, h: number, top: boolean) => {
    r(P.greenShade, 0, 0, w, h, top ? 6 : 3); r(P.green, 2, 1, w - 4, h - 2, top ? 5 : 2);
    r(0xc6eda7, 7, 2, 9, h - 4, 3, 0.65); r(0x67b882, w - 12, 2, 8, h - 4, 3);
    if (top) { r(0x3c756b, 8, 8, w - 16, 9, 4); r(0x244c51, 12, 9, w - 24, 5, 2); r(0xe3f5bc, 4, 2, w - 8, 3, 1.5); }
  };
  make('pipe', 64, 64, () => pipe(64, 64, false)); make('pipe_top', 80, 24, () => pipe(80, 24, true));
  for (const [key, color] of [['platform_easy', P.green], ['platform_medium', P.blue], ['platform_hard', 0xdba1b5]] as const) make(key, 64, 24, () => { r(P.outline, 0, 0, 64, 24, 5); r(color, 1, 1, 62, 21, 4); r(P.cream, 3, 2, 58, 3, 1.5, 0.65); for (let x = 8; x < 64; x += 16) e(0xffffff, x, 12, 3, 3, 0.35); });
  make('cloud_block', 32, 32, () => { e(0xa8c8e6, 1, 12, 30, 19); e(P.cream, 1, 8, 30, 19); e(P.cream, 5, 3, 15, 20); e(P.cream, 16, 5, 13, 20); e(0xffffff, 7, 6, 9, 4, 0.7); });
  make('spring', 32, 20, () => { r(P.outline, 1, 1, 30, 7, 3); r(P.red, 2, 1, 28, 5, 2); r(P.cream, 5, 2, 20, 1.5, 0.7); for (let y = 8; y < 18; y += 4) r(P.blueShade, 10, y, 12, 2, 1); r(P.outline, 4, 18, 24, 2, 1); });
  make('spike', 24, 16, () => { r(P.blueShade, 0, 12, 24, 4, 1); for (const x of [0, 8, 16]) { p.triangle(P.outline, x, 13, x + 4, 0, x + 8, 13); p.triangle(P.cream, x + 1.5, 12, x + 4, 3, x + 6.5, 12); } });
  p.destroy();
}

export function createPixelItems(scene: Phaser.Scene): void {
  const p = storybookPainter(scene); const { make, blob, ellipse: e, round: r, eye } = p;
  make('mushroom', 32, 28, () => { blob(P.cream, 0xd9b8a2, 9, 12, 14, 16); blob(P.red, P.redShade, 0, 0, 32, 20); e(P.cream, 6, 5, 6, 6); e(P.cream, 20, 5, 6, 6); e(P.cream, 13, 11, 6, 5); eye(12, 21, 3, 4); eye(18, 21, 3, 4); });
  make('flower', 32, 32, () => { r(P.greenShade, 14, 16, 4, 16, 2); e(P.green, 3, 22, 13, 6); e(P.green, 17, 25, 13, 6); for (const [x, y] of [[3, 4], [11, 0], [19, 4], [10, 10]]) blob(P.red, P.redShade, x, y, 12, 12); blob(P.gold, P.goldShade, 9, 5, 15, 15); eye(13, 10, 3, 5); eye(19, 10, 3, 5); });
  make('star', 32, 36, () => { const points = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? 7.5 : 15; return { x: 16 + Math.cos(a) * rad, y: 18 + Math.sin(a) * rad }; }); p.g.fillStyle(P.goldShade, 1); p.g.fillPoints(points, true); e(P.gold, 8, 10, 16, 16); e(P.cream, 11, 10, 5, 4, 0.8); eye(11, 16, 3, 6); eye(19, 16, 3, 6); });
  make('goal', 40, 64, () => { r(P.goldShade, 14, 1, 4, 63, 2); r(P.cream, 15, 4, 1.5, 60, 0.7); blob(P.gold, P.goldShade, 10, 0, 12, 10); r(P.redShade, 18, 10, 20, 16, 4); r(P.red, 18, 10, 18, 13, 3); e(P.cream, 23, 13, 7, 5); });
  p.destroy();
}
