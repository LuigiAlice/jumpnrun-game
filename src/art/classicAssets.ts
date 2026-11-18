import type Phaser from 'phaser';

/** Native canvases stay identical across states so Arcade hitboxes never jump with a pose. */
export const CLASSIC_TEXTURE_SIZES = {
  parakoopa: [32, 34], parakoopa_walk1: [32, 34], parakoopa_walk2: [32, 34],
  buzzy_beetle: [32, 34], buzzy_beetle_walk1: [32, 34], buzzy_beetle_walk2: [32, 34], buzzy_shell: [32, 34],
  bobomb: [28, 34], bobomb_walk1: [28, 34], bobomb_walk2: [28, 34], bobomb_lit: [28, 34],
  vine_segment: [24, 32], vine_top: [24, 32],
  firebar_orb: [16, 16], firebar_hub: [24, 24],
  red_ring: [48, 64], red_coin: [20, 28], red_coin_used: [20, 28],
} as const;

const P = {
  ink: 0x25233b, cream: 0xfff5df, gold: 0xffd34e, ochre: 0xc77d24,
  red: 0xdd4b3e, redDark: 0x9c3437, green: 0x59bc43, greenDark: 0x296836,
  blue: 0x72c5db, blueDark: 0x416a93,
};

type ClassicTextureKey = keyof typeof CLASSIC_TEXTURE_SIZES;

export function createClassicAssets(scene: Phaser.Scene): void {
  const graphics = scene.add.graphics();
  const rect = (color: number, x: number, y: number, width: number, height: number) => {
    graphics.fillStyle(color, 1);
    graphics.fillRect(x, y, width, height);
  };
  const make = (key: ClassicTextureKey, draw: () => void) => {
    graphics.clear();
    if (scene.textures.exists(key)) scene.textures.remove(key);
    draw();
    const [width, height] = CLASSIC_TEXTURE_SIZES[key];
    graphics.generateTexture(key, width, height);
  };

  const feet = (width: number, phase: number) => {
    const stride = phase === 1 ? 2 : phase === 2 ? -2 : 0;
    rect(P.ink, 3 + stride, 29, 10, 5);
    rect(P.ink, width - 13 - stride, 29, 10, 5);
    rect(P.ochre, 4 + stride, 29, 8, 3);
    rect(P.gold, width - 12 - stride, 29, 8, 3);
  };
  const parakoopa = (phase: number) => {
    feet(32, phase);
    // White stepped wings alternate between raised and spread silhouettes.
    const wingY = phase === 2 ? 12 : 6;
    rect(P.ink, 0, wingY, 8, 12); rect(P.ink, 4, wingY + 4, 8, 12);
    rect(P.cream, 1, wingY + 1, 5, 9); rect(P.cream, 5, wingY + 5, 5, 9);
    rect(P.blue, 3, wingY + 8, 2, 3); rect(P.blue, 7, wingY + 11, 2, 2);
    rect(P.ink, 9, 12, 15, 17); rect(P.redDark, 11, 13, 11, 14);
    rect(P.red, 12, 12, 8, 12); rect(P.cream, 9, 26, 16, 3);
    rect(P.redDark, 15, 15, 2, 10); rect(P.redDark, 11, 20, 11, 2);
    rect(P.ink, 21, 2, 10, 18); rect(P.gold, 23, 4, 8, 13);
    rect(P.gold, 22, 17, 7, 8); rect(P.cream, 25, 5, 5, 7);
    rect(P.ink, 28, 6, 2, 5); rect(P.ink, 27, 17, 4, 2);
  };
  const beetleShell = (bottom: boolean) => {
    const y = bottom ? 18 : 10;
    rect(P.ink, 8, y, 16, 4); rect(P.ink, 4, y + 4, 24, 10);
    rect(P.ink, 2, y + 11, 28, 5);
    rect(P.blueDark, 6, y + 5, 20, 8); rect(P.blue, 10, y + 2, 12, 6);
    rect(P.blueDark, 14, y + 3, 3, 10); rect(P.cream, 5, y + 12, 22, 2);
  };
  const beetle = (phase: number) => {
    feet(32, phase);
    rect(P.ink, 21, 22, 10, 7); rect(P.ochre, 23, 23, 8, 5);
    beetleShell(false);
    rect(P.cream, 25, 21, 4, 5); rect(P.ink, 28, 22, 2, 4);
  };
  const bomb = (phase: number, lit = false) => {
    feet(28, phase);
    // Fuse and winding key remain visible even against the dark body.
    rect(P.ink, 11, 4, 6, 7); rect(P.ochre, 12, 4, 4, 5);
    rect(P.cream, 14, 1, 2, 4);
    if (lit) {
      rect(P.red, 11, 0, 8, 6); rect(P.gold, 13, 0, 4, 4); rect(P.cream, 14, 1, 2, 2);
    }
    rect(P.ochre, 0, 17, 6, 4); rect(P.ochre, 0, 14, 3, 10);
    rect(P.ink, 8, 9, 13, 3); rect(P.ink, 4, 12, 21, 15); rect(P.ink, 8, 26, 13, 4);
    rect(lit ? P.redDark : P.blueDark, 7, 12, 15, 15);
    rect(lit ? P.red : P.blue, 8, 12, 8, 4);
    rect(P.cream, 15, 16, 3, 7); rect(P.cream, 21, 16, 3, 7);
  };

  make('parakoopa', () => parakoopa(0));
  make('parakoopa_walk1', () => parakoopa(1));
  make('parakoopa_walk2', () => parakoopa(2));
  make('buzzy_beetle', () => beetle(0));
  make('buzzy_beetle_walk1', () => beetle(1));
  make('buzzy_beetle_walk2', () => beetle(2));
  make('buzzy_shell', () => beetleShell(true));
  make('bobomb', () => bomb(0));
  make('bobomb_walk1', () => bomb(1));
  make('bobomb_walk2', () => bomb(2));
  make('bobomb_lit', () => bomb(0, true));

  const vine = (top: boolean) => {
    rect(P.ink, 10, top ? 6 : 0, 5, top ? 26 : 32);
    rect(P.greenDark, 11, top ? 7 : 0, 3, top ? 25 : 32);
    for (const [x, y, right] of [[2, 9, false], [13, 19, true]] as const) {
      rect(P.ink, x, y, 9, 5); rect(P.ink, x + (right ? 3 : 0), y - 3, 6, 4);
      rect(P.green, x + 1, y, 7, 3); rect(P.greenDark, x + 3, y + 3, 5, 2);
    }
    if (top) {
      rect(P.ink, 8, 1, 8, 6); rect(P.green, 10, 2, 5, 5);
      rect(P.cream, 10, 2, 2, 2);
    }
  };
  make('vine_segment', () => vine(false));
  make('vine_top', () => vine(true));
  make('firebar_orb', () => {
    rect(P.redDark, 5, 0, 6, 16); rect(P.redDark, 1, 4, 14, 8);
    rect(P.red, 4, 2, 8, 12); rect(P.red, 2, 5, 12, 6);
    rect(P.gold, 5, 4, 6, 8); rect(P.gold, 4, 6, 8, 4);
    rect(P.cream, 7, 5, 3, 5);
  });
  make('firebar_hub', () => {
    rect(P.ink, 4, 0, 16, 24); rect(P.ink, 0, 4, 24, 16);
    rect(P.blueDark, 4, 4, 16, 16); rect(P.blue, 6, 4, 12, 4);
    rect(P.ink, 8, 8, 8, 8); rect(P.ochre, 10, 9, 4, 6); rect(P.gold, 10, 9, 4, 2);
    for (const x of [4, 18]) for (const y of [4, 18]) rect(P.cream, x, y, 2, 2);
  });
  make('red_ring', () => {
    // A hollow stepped ellipse, so neither the player nor the reward coins are obscured.
    for (const [x, y, w, h] of [[12, 0, 24, 6], [6, 6, 8, 9], [34, 6, 8, 9],
      [1, 14, 7, 36], [40, 14, 7, 36], [6, 49, 8, 9], [34, 49, 8, 9], [12, 58, 24, 6]]) {
      rect(P.ink, x, y, w, h); rect(P.redDark, x + 1, y + 1, w - 2, h - 2);
      rect(P.red, x + 2, y + 1, Math.max(1, w - 4), Math.max(1, h - 3));
    }
    rect(P.cream, 14, 1, 12, 2); rect(P.gold, 3, 17, 2, 11);
  });
  const coin = (used: boolean) => {
    rect(P.ink, 5, 0, 10, 28); rect(P.ink, 1, 4, 18, 20);
    rect(used ? P.blueDark : P.redDark, 5, 2, 10, 24);
    rect(used ? P.blueDark : P.red, 3, 5, 14, 18);
    rect(used ? P.blue : P.cream, 5, 5, 2, 15);
    if (used) { rect(P.cream, 8, 14, 3, 4); rect(P.cream, 10, 10, 3, 6); }
    else { rect(P.gold, 10, 7, 3, 13); rect(P.redDark, 13, 7, 2, 13); }
  };
  make('red_coin', () => coin(false));
  make('red_coin_used', () => coin(true));
  graphics.destroy();
}
