import type Phaser from 'phaser';

/** Gameplay sprites share the player's two-pixel grid, outline and restrained palette. */
const P = {
  ink: 0x25233b, cream: 0xfff5df, gold: 0xffd34e, goldShade: 0xc77d24,
  red: 0xdd4b3e, redShade: 0x9c3437, green: 0x59bc43, greenShade: 0x296836,
  blue: 0x72c5db, blueShade: 0x416a93, brown: 0x99552d, earth: 0xc78345,
};

type Pen = (color: number, x: number, y: number, w: number, h: number) => void;
function painter(scene: Phaser.Scene) {
  const g = scene.add.graphics();
  const r: Pen = (color, x, y, w, h) => { g.fillStyle(color, 1); g.fillRect(x, y, w, h); };
  return {
    r,
    make(key: string, w: number, h: number, draw: () => void) {
      g.clear();
      if (scene.textures.exists(key)) scene.textures.remove(key);
      draw();
      g.generateTexture(key, w, h);
    },
    destroy: () => g.destroy(),
  };
}

export const ANIMATED_ENEMY_TEXTURES = {
  goomba: [28, 42], koopa: [32, 34], spiny: [28, 32], robot: [28, 34], crab: [28, 34],
} as const;

export function createPixelEnemies(scene: Phaser.Scene): void {
  const { r, make, destroy } = painter(scene);
  const eye = (x: number, y: number, facing = 1) => {
    r(P.cream, x, y, 5, 7); r(P.ink, x + (facing > 0 ? 3 : 0), y + 1, 2, 5);
  };
  const feet = (width: number, y: number, phase: number, color = P.brown) => {
    const stride = phase === 1 ? 2 : phase === 2 ? -2 : 0;
    r(P.ink, 3 + stride, y, 10, 5); r(P.ink, width - 13 - stride, y, 10, 5);
    r(color, 4 + stride, y, 8, 3); r(color, width - 12 - stride, y, 8, 3);
  };
  const walkers: Record<keyof typeof ANIMATED_ENEMY_TEXTURES, (phase: number) => void> = {
    goomba: phase => {
      feet(28, 37, phase);
      r(P.ink, 7, 24, 14, 13); r(0xe4b878, 8, 26, 12, 10);
      r(P.ink, 8, 5, 12, 4); r(P.ink, 4, 9, 20, 6); r(P.ink, 1, 15, 26, 14);
      r(P.brown, 8, 7, 12, 4); r(P.brown, 5, 11, 18, 6); r(P.brown, 3, 17, 22, 10);
      r(P.earth, 8, 9, 8, 3); r(P.earth, 5, 15, 4, 8);
      eye(7, 19); eye(17, 19);
      r(P.ink, 5, 17, 6, 2); r(P.ink, 18, 17, 7, 2); r(P.ink, 11, 29, 7, 2);
    },
    koopa: phase => {
      feet(32, 29, phase, P.goldShade);
      r(P.ink, 3, 12, 21, 18); r(P.greenShade, 5, 13, 17, 15);
      r(P.green, 7, 12, 11, 12); r(P.cream, 4, 26, 22, 3);
      r(P.greenShade, 11, 15, 2, 11); r(P.greenShade, 6, 20, 15, 2);
      r(P.ink, 20, 3, 10, 18); r(P.gold, 22, 5, 8, 13); r(P.gold, 23, 16, 7, 8);
      eye(24, 6); r(P.ink, 27, 17, 4, 2); r(P.goldShade, 18, 22, 9, 4);
    },
    spiny: phase => {
      feet(28, 27, phase, P.redShade);
      r(P.ink, 3, 10, 22, 17); r(P.redShade, 5, 12, 18, 13); r(P.red, 7, 11, 14, 9);
      for (const [x, y] of [[4, 5], [12, 2], [20, 5]]) {
        r(P.ink, x, y + 4, 6, 6); r(P.ink, x + 2, y, 2, 6);
        r(P.cream, x + 2, y + 3, 2, 6);
      }
      r(P.cream, 4, 24, 20, 3); eye(21, 18);
    },
    robot: phase => {
      feet(28, 29, phase, P.blueShade);
      r(P.ink, 3, 6, 22, 22); r(P.blueShade, 5, 8, 18, 18); r(P.blue, 5, 8, 18, 9);
      r(P.ink, 12, 0, 3, 6); r(P.red, 11, 0, 5, 3);
      r(P.ink, 7, 12, 14, 5); r(P.gold, 9, 13, 4, 2); r(P.gold, 17, 13, 3, 2);
      r(P.cream, 9, 22, 10, 2); r(P.ink, 0, 17, 4, 8); r(P.ink, 24, 17, 4, 8);
      r(P.blue, 0, 18, 3, 5); r(P.blue, 25, 18, 3, 5);
    },
    crab: phase => {
      const lift = phase === 1 ? 2 : 0;
      r(P.ink, 4, 16, 20, 13); r(P.redShade, 5, 18, 18, 9); r(P.red, 7, 16, 14, 8);
      r(P.ink, 6, 8, 6, 9); r(P.ink, 17, 8, 6, 9); eye(7, 8); eye(18, 8);
      r(P.ink, 0, 13 - lift, 6, 9); r(P.red, 1, 14 - lift, 4, 6);
      r(P.ink, 22, 13 + lift, 6, 9); r(P.red, 23, 14 + lift, 4, 6);
      for (let i = 0; i < 3; i++) {
        r(P.ink, 2 + i * 2, 27 + (i % 2 === phase % 2 ? 2 : 0), 5, 3);
        r(P.ink, 21 - i * 2, 27 + (i % 2 !== phase % 2 ? 2 : 0), 5, 3);
      }
      r(P.ink, 11, 25, 7, 2);
    },
  };
  for (const type of Object.keys(walkers) as (keyof typeof walkers)[]) {
    const [w, h] = ANIMATED_ENEMY_TEXTURES[type];
    make(type, w, h, () => walkers[type](0));
    for (const phase of [1, 2]) make(`${type}_walk${phase}`, w, h, () => walkers[type](phase));
  }
  make('koopa_shell', 32, 34, () => {
    r(P.ink, 9, 17, 14, 3); r(P.ink, 4, 20, 24, 12); r(P.ink, 2, 29, 28, 5);
    r(P.greenShade, 6, 21, 20, 9); r(P.green, 10, 19, 12, 8);
    r(P.greenShade, 14, 20, 3, 10); r(P.greenShade, 7, 25, 18, 2);
    r(P.cream, 4, 30, 24, 2);
  });
  const piranha = (open: boolean) => {
    r(P.ink, 11, 22, 7, 22); r(P.greenShade, 13, 22, 3, 22);
    r(P.green, 4, 31, 9, 4); r(P.green, 16, 28, 9, 4);
    r(P.ink, 6, 2, 16, 4); r(P.ink, 2, 6, 24, 16); r(P.ink, 6, 22, 16, 4);
    r(P.redShade, 5, 7, 18, 14); r(P.red, 8, 4, 12, 16);
    r(P.cream, 6, 8, 4, 4); r(P.cream, 17, 6, 4, 4); r(P.cream, 13, 18, 4, 4);
    r(P.ink, 13, 11, 12, open ? 8 : 3);
    r(P.cream, 14, 10, 11, 2); r(P.cream, 14, open ? 18 : 14, 11, 2);
    if (open) { r(P.cream, 16, 11, 2, 3); r(P.cream, 21, 16, 2, 3); }
  };
  make('piranha', 28, 44, () => piranha(true));
  make('piranha_open', 28, 44, () => piranha(true));
  make('piranha_closed', 28, 44, () => piranha(false));

  const ghost = (shy: boolean, color = P.cream) => {
    r(P.ink, 9, 2, 15, 4); r(P.ink, 4, 6, 24, 5); r(P.ink, 2, 11, 28, 16);
    r(P.ink, 4, 25, 5, 7); r(P.ink, 12, 25, 7, 9); r(P.ink, 23, 25, 6, 7);
    r(color, 9, 4, 14, 3); r(color, 6, 7, 20, 20);
    r(color, 4, 12, 25, 11); r(color, 6, 25, 3, 5); r(color, 14, 25, 3, 7); r(color, 25, 25, 2, 5);
    if (shy) {
      r(P.blueShade, 13, 12, 4, 5); r(P.blueShade, 22, 12, 4, 5);
      r(0xd2e6e9, 10, 17, 9, 6); r(0xd2e6e9, 21, 17, 8, 6);
    } else {
      r(P.ink, 13, 12, 3, 5); r(P.ink, 22, 12, 3, 5); r(P.redShade, 17, 22, 7, 4);
    }
  };
  make('boo', 32, 34, () => ghost(false));
  make('boo_shy', 32, 34, () => ghost(true));
  make('ghost', 32, 32, () => ghost(false, 0xb0dbe8));

  make('bullet_bill', 30, 26, () => {
    r(P.ink, 2, 6, 24, 17); r(P.ink, 8, 3, 16, 23); r(P.ink, 24, 8, 6, 13);
    r(P.blueShade, 7, 6, 16, 17); r(0x929cba, 8, 6, 14, 3); r(P.ink, 22, 8, 6, 13);
    eye(10, 10, -1); r(P.cream, 21, 15, 6, 5); r(P.cream, 0, 8, 4, 4);
  });
  make('thwomp', 32, 34, () => {
    r(P.ink, 2, 3, 28, 29); r(P.ink, 7, 0, 4, 4); r(P.ink, 21, 0, 4, 4);
    r(P.blueShade, 4, 5, 24, 25); r(0x97a6b5, 5, 5, 22, 7);
    r(P.ink, 7, 13, 7, 8); r(P.ink, 19, 13, 7, 8);
    r(P.cream, 8, 15, 4, 5); r(P.cream, 20, 15, 4, 5);
    r(P.ink, 10, 25, 13, 3); r(P.cream, 12, 25, 2, 2); r(P.cream, 20, 25, 2, 2);
  });
  make('lakitu', 40, 40, () => {
    r(P.ink, 10, 4, 20, 20); r(P.gold, 12, 6, 16, 16);
    r(P.greenShade, 8, 10, 7, 14); r(P.green, 9, 11, 4, 10);
    r(P.ink, 15, 10, 15, 6); r(P.cream, 16, 11, 5, 3); r(P.cream, 24, 11, 5, 3);
    r(P.ink, 4, 25, 33, 10); r(P.ink, 10, 20, 22, 19);
    r(P.cream, 6, 26, 29, 7); r(P.cream, 11, 22, 19, 14);
    r(P.blue, 13, 33, 15, 3); r(P.ink, 19, 27, 2, 3); r(P.ink, 26, 27, 2, 3);
  });
  make('squid', 32, 32, () => {
    r(P.ink, 10, 0, 12, 5); r(P.ink, 5, 5, 22, 16); r(P.cream, 8, 6, 16, 15);
    r(P.blue, 10, 4, 12, 3); r(P.ink, 11, 12, 4, 6); r(P.ink, 20, 12, 4, 6);
    for (let i = 0; i < 4; i++) { r(P.ink, 4 + i * 7, 20, 5, 10 - i % 2 * 3); r(P.cream, 5 + i * 7, 20, 3, 8 - i % 2 * 3); }
  });
  make('ufo', 32, 44, () => {
    r(P.ink, 9, 8, 14, 4); r(P.ink, 5, 12, 22, 11); r(P.blue, 8, 12, 16, 8);
    r(P.ink, 1, 21, 30, 10); r(P.blueShade, 3, 23, 26, 6); r(P.cream, 8, 24, 3, 2); r(P.gold, 21, 24, 3, 2);
    r(P.ink, 8, 30, 16, 4); r(P.gold, 11, 34, 10, 4); r(P.red, 13, 38, 6, 5);
  });
  make('boss', 32, 36, () => {
    r(P.ink, 3, 12, 25, 21); r(P.greenShade, 5, 13, 21, 17); r(P.green, 7, 14, 11, 13);
    r(P.ink, 15, 3, 14, 15); r(P.goldShade, 17, 5, 12, 11);
    r(P.cream, 16, 0, 3, 6); r(P.cream, 26, 1, 3, 5); r(P.red, 17, 3, 11, 3);
    eye(22, 6); r(P.ink, 25, 14, 7, 3); r(P.cream, 29, 15, 2, 3);
    for (let y = 13; y <= 25; y += 6) { r(P.ink, 0, y, 6, 5); r(P.cream, 1, y + 1, 5, 2); }
    feet(32, 31, 0, P.goldShade);
  });
  make('fire_bar', 32, 32, () => {
    for (let i = 0; i < 4; i++) {
      r(P.redShade, i * 8, 11, 8, 10); r(P.red, i * 8 + 1, 10, 6, 10); r(P.gold, i * 8 + 2, 12, 4, 6);
    }
  });
  destroy();
}

export function createPixelCoins(scene: Phaser.Scene): void {
  const { r, make, destroy } = painter(scene);
  const coin = (width: number) => {
    const x = 12 - width / 2;
    r(P.goldShade, x, 6, width, 20); r(P.goldShade, x + 2, 2, Math.max(2, width - 4), 28);
    r(P.gold, x + 2, 6, Math.max(2, width - 4), 19);
    r(P.cream, x + 2, 7, 2, 16);
    if (width > 8) { r(0xffec83, x + 4, 4, width - 8, 3); r(P.goldShade, x + width - 6, 10, 2, 12); }
  };
  make('coin', 24, 32, () => coin(18));
  [18, 12, 6, 12].forEach((width, i) => make(`coin_spin${i + 1}`, 24, 32, () => coin(width)));
  destroy();
}

export function createPixelBlocks(scene: Phaser.Scene): void {
  const { r, make, destroy } = painter(scene);
  const terrains: Record<string, { fill: number; dark: number; fleck: number; cap: number; light: number }> = {
    grass: { fill: P.brown, dark: 0x673d27, fleck: P.earth, cap: P.green, light: 0xb7ec68 },
    snow: { fill: 0x7694ac, dark: 0x416a93, fleck: 0x9bc7dd, cap: 0xe7f6ff, light: P.cream },
    sand: { fill: 0xc79955, dark: 0x986540, fleck: 0xe6bc78, cap: 0xedcc8b, light: 0xffe8b4 },
    ice: { fill: 0x78bddb, dark: 0x4182ad, fleck: 0xb7eaf1, cap: 0xd6f9ff, light: P.cream },
    cave: { fill: 0x62546d, dark: 0x40394e, fleck: 0x86708a, cap: 0x9e8495, light: 0xc6a2aa },
    castle: { fill: 0x59637d, dark: 0x343c56, fleck: 0x7f8da3, cap: 0x8997af, light: 0xb7c9d6 },
    ruins: { fill: 0x92795e, dark: 0x655141, fleck: 0xb49c74, cap: 0xc7b48b, light: 0xe5d6ac },
    metal: { fill: 0x60788a, dark: 0x354957, fleck: 0x819baa, cap: 0xa1b9c1, light: 0xd0e3e3 },
    space: { fill: 0x595b8c, dark: 0x3c3f67, fleck: 0x8582b3, cap: 0xa1b0e6, light: 0xd7e4ff },
    stone: { fill: 0x8c8b8d, dark: 0x5b5a65, fleck: 0xb2ada6, cap: 0xbcb5ad, light: 0xe5d8c7 },
  };
  for (const [name, colors] of Object.entries(terrains)) {
    const fill = () => {
      r(colors.fill, 0, 0, 32, 32);
      r(colors.dark, 0, 15, 32, 2); r(colors.dark, 15, 0, 2, 15); r(colors.dark, 7, 17, 2, 15);
      r(colors.fleck, 3, 4, 6, 2); r(colors.fleck, 21, 20, 7, 3); r(colors.dark, 25, 7, 3, 3);
    };
    make(`ground_${name}_fill`, 32, 32, fill);
    make(`ground_${name}`, 32, 32, () => {
      fill(); r(colors.dark, 0, 5, 32, 5); r(colors.cap, 0, 0, 32, 6); r(colors.light, 0, 0, 32, 2);
      if (name === 'grass' || name === 'snow') { r(colors.cap, 4, 5, 5, 4); r(colors.cap, 23, 5, 4, 3); }
      if (name === 'ice') { r(colors.light, 4, 13, 2, 7); r(colors.light, 8, 11, 4, 2); }
    });
  }
  make('ground_water', 32, 32, () => {
    r(0x396aa0, 0, 0, 32, 32); r(0x69b9d0, 0, 2, 12, 3); r(0x69b9d0, 18, 5, 14, 3); r(0x8cdce0, 1, 1, 10, 2);
  });
  make('ground_lava', 32, 32, () => {
    r(0xa83b39, 0, 0, 32, 32); r(P.red, 0, 5, 32, 16); r(P.goldShade, 0, 1, 32, 8);
    r(P.gold, 3, 3, 7, 3); r(P.gold, 21, 8, 8, 3); r(P.redShade, 7, 24, 16, 3);
  });
  const block = (used: boolean) => {
    r(P.ink, 0, 0, 32, 32); r(used ? 0x8d7459 : P.goldShade, 2, 2, 28, 28);
    r(used ? 0xb09571 : P.gold, 3, 3, 25, 23); r(used ? 0xc6ac86 : 0xffec83, 3, 3, 24, 2);
    for (const x of [5, 25]) for (const y of [5, 25]) r(P.ink, x, y, 2, 2);
    if (!used) {
      const question = ['01110', '11011', '00011', '00110', '00100', '00000', '00100'];
      question.forEach((row, y) => [...row].forEach((v, x) => { if (v === '1') r(P.ink, 8 + x * 3, 6 + y * 3, 3, 3); }));
    }
  };
  make('question', 32, 32, () => block(false)); make('question_used', 32, 32, () => block(true));
  make('brick', 32, 32, () => {
    r(P.ink, 0, 0, 32, 32); r(0xc46b46, 1, 1, 30, 30);
    for (const y of [0, 16, 30]) r(0x6b3c36, 0, y, 32, 2);
    r(0x6b3c36, 15, 0, 2, 16); r(0x6b3c36, 7, 17, 2, 15); r(0x6b3c36, 25, 17, 2, 15);
    r(0xeaa26c, 2, 3, 12, 2); r(0xeaa26c, 18, 3, 12, 2); r(0xeaa26c, 10, 19, 13, 2);
  });
  const pipe = (w: number, h: number, top: boolean) => {
    r(P.ink, 0, 0, w, h); r(P.greenShade, 2, 2, w - 4, h - 4);
    r(P.green, 5, 2, w - 13, h - 4); r(0xa8d96b, 8, 2, 7, h - 4); r(0x438e3e, w - 12, 2, 6, h - 4);
    if (top) { r(P.ink, 8, 9, w - 16, 7); r(0x183e32, 11, 10, w - 22, 4); r(0xb7ec68, 4, 3, w - 8, 2); }
  };
  make('pipe', 64, 64, () => pipe(64, 64, false));
  make('pipe_top', 80, 24, () => pipe(80, 24, true));
  for (const [key, color] of [['platform_easy', P.green], ['platform_medium', P.blueShade], ['platform_hard', P.redShade]] as const) {
    make(key, 64, 24, () => {
      r(P.ink, 0, 0, 64, 24); r(color, 2, 2, 60, 19); r(P.cream, 3, 2, 58, 2);
      r(P.ink, 0, 20, 64, 4); for (let x = 6; x < 64; x += 16) r(P.ink, x, 11, 3, 3);
    });
  }
  make('cloud_block', 32, 32, () => {
    r(P.blueShade, 4, 8, 24, 23); r(P.blueShade, 0, 14, 32, 12); r(P.cream, 5, 6, 22, 21);
    r(P.cream, 2, 13, 28, 11); r(P.blue, 6, 25, 21, 3);
  });
  make('spring', 32, 20, () => {
    r(P.ink, 1, 1, 30, 7); r(P.red, 3, 2, 26, 4); r(P.cream, 4, 2, 23, 1);
    for (let y = 9; y < 18; y += 4) { r(P.ink, 9, y, 14, 2); r(P.blue, 11, y, 10, 1); }
    r(P.ink, 4, 18, 24, 2);
  });
  make('spike', 24, 16, () => {
    r(P.ink, 0, 12, 24, 4);
    for (const x of [0, 8, 16]) {
      r(P.ink, x + 3, 0, 2, 4); r(P.ink, x + 2, 4, 4, 4); r(P.ink, x + 1, 8, 6, 4);
      r(P.cream, x + 3, 4, 2, 8); r(P.blueShade, x + 5, 9, 2, 3);
    }
  });
  destroy();
}

export function createPixelItems(scene: Phaser.Scene): void {
  const { r, make, destroy } = painter(scene);
  make('mushroom', 32, 28, () => {
    r(P.ink, 9, 14, 14, 14); r(P.cream, 11, 16, 10, 10);
    r(P.ink, 8, 0, 16, 4); r(P.ink, 3, 4, 26, 6); r(P.ink, 0, 10, 32, 10);
    r(P.redShade, 3, 10, 26, 8); r(P.red, 5, 5, 22, 11); r(P.red, 9, 2, 14, 13);
    r(P.cream, 7, 6, 5, 5); r(P.cream, 20, 6, 5, 5); r(P.cream, 14, 11, 5, 5);
    r(P.ink, 13, 21, 2, 4); r(P.ink, 18, 21, 2, 4);
  });
  make('flower', 32, 32, () => {
    r(P.ink, 13, 18, 6, 14); r(P.green, 15, 20, 2, 12);
    r(P.greenShade, 3, 23, 10, 5); r(P.green, 5, 23, 8, 3); r(P.greenShade, 19, 25, 10, 5); r(P.green, 19, 25, 8, 3);
    r(P.ink, 7, 1, 18, 4); r(P.ink, 2, 5, 28, 13); r(P.ink, 7, 18, 18, 4);
    r(P.redShade, 7, 3, 18, 16); r(P.red, 4, 6, 24, 10); r(P.gold, 10, 6, 12, 11);
    r(P.cream, 12, 7, 8, 8); r(P.ink, 14, 9, 2, 4); r(P.ink, 18, 9, 2, 4);
  });
  make('star', 32, 36, () => {
    // A stepped five-point silhouette, with a clear centre and no glow hitbox ambiguity.
    const rows = ['00000011000000', '00000111100000', '00000111100000', '11111111111111',
      '01111111111110', '00111111111100', '00011111111000', '00011111111000',
      '00111111111100', '00111100111100', '01111000011110', '01100000000110'];
    rows.forEach((row, y) => [...row].forEach((v, x) => {
      if (v === '1') r(P.goldShade, 2 + x * 2, 3 + y * 2, 2, 2);
    }));
    r(P.gold, 12, 6, 8, 20); r(P.gold, 6, 12, 20, 8); r(P.cream, 13, 8, 3, 5);
    r(P.ink, 12, 15, 2, 6); r(P.ink, 19, 15, 2, 6);
  });
  make('goal', 40, 64, () => {
    r(P.ink, 13, 0, 6, 64); r(P.cream, 15, 4, 2, 60); r(P.goldShade, 11, 0, 10, 8);
    r(P.gold, 13, 1, 6, 5); r(P.redShade, 19, 10, 18, 15); r(P.red, 19, 10, 15, 11);
    r(P.cream, 23, 13, 5, 4);
  });
  destroy();
}
