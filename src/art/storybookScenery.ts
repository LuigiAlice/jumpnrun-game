import type Phaser from 'phaser';

/** Soft distant scenery is decorative: it never changes the level's collision geometry. */
export const STORYBOOK_LAYER_HEIGHTS = [800, 400, 450, 500, 550, 600, 650] as const;
export const STORYBOOK_SCENERY = {
  grasslands: [0x79cce7, 0xfff3cf, 0xb3d7bd, 0x84c3a5, 0x4b9d79, 0xf399bd],
  desert: [0x87cbd6, 0xffe3b1, 0xe9c393, 0xdca881, 0xbd826c, 0x79b9a2],
  water: [0x60bbd7, 0xaddfd3, 0x79bdc7, 0x57a6b8, 0x397d9d, 0xf1a6bb],
  ice: [0x89bfdf, 0xe9eaf7, 0xb5cddd, 0x99b7d3, 0x7794bc, 0xf7c6dc],
  sky: [0x8fcbe5, 0xffe9da, 0xc8d9ed, 0xb1c7e2, 0x94b5d4, 0xf3b4d1],
  forest: [0x8fcdbd, 0xe9efc5, 0xb3cfad, 0x81b89a, 0x4f8c7b, 0xe9acbd],
  village: [0x8dcbdc, 0xffeccb, 0xbecbb9, 0x9ebca7, 0x79a18b, 0xd78e9b],
  beach: [0x75cbe1, 0xffe8bd, 0xa3d1c7, 0x78bdb6, 0x4f9fa5, 0xf2b6aa],
  factory: [0x9ac6d6, 0xe8dfd4, 0xb7c5d1, 0x8ea9ba, 0x617f9d, 0xe9b681],
  volcano: [0xc297ba, 0xffc79b, 0xc1a3b1, 0xae8395, 0x825c77, 0xffbd7b],
  haunted: [0x697ca7, 0xd8bddb, 0x9e9dbf, 0x8585ae, 0x68688f, 0xf6d395],
  ruins: [0x91bec4, 0xf2e2bf, 0xbdc6ac, 0x9fac94, 0x7d8b7d, 0xdcae99],
  canyon: [0x9abfda, 0xf4dac0, 0xd4b9ab, 0xbc988b, 0x9f7d7c, 0xeac389],
  space: [0x556c9e, 0xb1b0d9, 0x969ac4, 0x7d87b6, 0x6275a4, 0xeac7e8],
  castle: [0x8ca8ce, 0xe8d2e4, 0xb1b3cd, 0x969cba, 0x777fa5, 0xe4bf96],
} as const;
type Theme = keyof typeof STORYBOOK_SCENERY;
type G = Phaser.GameObjects.Graphics;

function mix(a: number, b: number, ratio: number): number {
  const channel = (shift: number) => Math.round(((a >> shift) & 255) * (1 - ratio) + ((b >> shift) & 255) * ratio);
  return (channel(16) << 16) | (channel(8) << 8) | channel(0);
}
function ellipse(g: G, color: number, x: number, y: number, w: number, h: number, alpha = 1): void {
  g.fillStyle(color, alpha); g.fillEllipse(x, y, w, h);
}
function round(g: G, color: number, x: number, y: number, w: number, h: number, radius = 12, alpha = 1): void {
  g.fillStyle(color, alpha); g.fillRoundedRect(x, y, w, h, Math.min(radius, w / 2, h / 2));
}
function glow(g: G, color: number, x: number, y: number, radius: number, alpha: number): void {
  for (let step = 8; step > 0; step--) ellipse(g, color, x, y, radius * step / 4, radius * step / 4, alpha / 8);
}
function cloud(g: G, x: number, y: number, scale: number, alpha = 1, shade = 0xd3e2ef): void {
  ellipse(g, shade, x, y + 10 * scale, 112 * scale, 31 * scale, alpha * 0.7);
  ellipse(g, 0xfff8ec, x - 29 * scale, y, 58 * scale, 40 * scale, alpha);
  ellipse(g, 0xfff8ec, x + 5 * scale, y - 15 * scale, 76 * scale, 64 * scale, alpha);
  ellipse(g, 0xfff8ec, x + 43 * scale, y + 1 * scale, 56 * scale, 38 * scale, alpha);
  ellipse(g, 0xffffff, x - 1 * scale, y - 24 * scale, 43 * scale, 20 * scale, alpha * 0.6);
}
function bloom(g: G, x: number, y: number, size: number, color: number, alpha = 1): void {
  for (let petal = 0; petal < 5; petal++) {
    const angle = petal * Math.PI * 2 / 5 - Math.PI / 2;
    ellipse(g, color, x + Math.cos(angle) * size * 0.54, y + Math.sin(angle) * size * 0.54, size, size, alpha);
  }
  ellipse(g, 0xffe4a1, x, y, size * 0.77, size * 0.77, alpha);
  ellipse(g, 0xfffae5, x - size * 0.12, y - size * 0.15, size * 0.3, size * 0.22, alpha * 0.8);
}
function tree(g: G, x: number, base: number, size: number, color: number, blossom: number, alpha = 1): void {
  round(g, 0x9c806b, x - size * 0.09, base - size * 0.9, size * 0.18, size * 0.95, size * 0.08, alpha);
  ellipse(g, color, x, base - size * 0.95, size * 0.95, size * 0.95, alpha);
  ellipse(g, mix(color, 0xfff4d4, 0.24), x - size * 0.13, base - size * 1.12, size * 0.62, size * 0.55, alpha);
  ellipse(g, color, x + size * 0.28, base - size * 0.79, size * 0.7, size * 0.67, alpha);
  bloom(g, x + size * 0.2, base - size * 1.17, size * 0.13, blossom, alpha);
}
function hill(g: G, x: number, base: number, w: number, h: number, color: number, alpha: number): void {
  ellipse(g, color, x, base + h * 0.22, w, h, alpha);
  ellipse(g, mix(color, 0xfff5d5, 0.19), x - w * 0.07, base + h * 0.12, w * 0.76, h * 0.75, alpha * 0.65);
}
function house(g: G, x: number, base: number, width: number, color: number, alpha = 1): void {
  round(g, 0xf2dbc4, x - width * 0.35, base - width * 0.7, width * 0.7, width * 0.72, width * 0.13, alpha);
  ellipse(g, color, x, base - width * 0.7, width, width * 0.53, alpha);
  ellipse(g, mix(color, 0xfff6df, 0.25), x - width * 0.12, base - width * 0.8, width * 0.58, width * 0.23, alpha);
  round(g, 0xa98583, x - width * 0.09, base - width * 0.29, width * 0.18, width * 0.31, width * 0.08, alpha);
  for (const dx of [-0.22, 0.22]) {
    ellipse(g, 0x9fc9cf, x + width * dx, base - width * 0.46, width * 0.16, width * 0.2, alpha);
    ellipse(g, 0xfff6d8, x + width * dx - width * 0.025, base - width * 0.49, width * 0.065, width * 0.06, alpha);
  }
}
function star(g: G, x: number, y: number, r: number, color: number, alpha = 1): void {
  ellipse(g, color, x, y, r * 0.5, r * 2, alpha);
  ellipse(g, color, x, y, r * 2, r * 0.5, alpha);
  ellipse(g, 0xfffbf0, x, y, r * 0.65, r * 0.65, alpha);
}
/** Draw motifs across both neighbouring repeats; shapes at the edges meet continuously. */
function wrapped(draw: (x: number) => void, x: number): void {
  for (const offset of [-1200, 0, 1200]) draw(x + offset);
}

function motif(g: G, theme: Theme, x: number, base: number, size: number, color: number, accent: number, alpha: number): void {
  switch (theme) {
    case 'grasslands':
      tree(g, x, base, size, color, accent, alpha);
      bloom(g, x - size * 0.49, base - size * 0.27, size * 0.18, accent, alpha);
      break;
    case 'desert':
      round(g, color, x - size * 0.12, base - size, size * 0.24, size, size * 0.12, alpha);
      round(g, color, x - size * 0.43, base - size * 0.7, size * 0.32, size * 0.16, size * 0.08, alpha);
      round(g, color, x - size * 0.43, base - size * 0.95, size * 0.15, size * 0.4, size * 0.07, alpha);
      round(g, mix(color, 0xfff1cd, 0.2), x - size * 0.07, base - size * 0.91, size * 0.06, size * 0.8, size * 0.03, alpha);
      bloom(g, x, base - size, size * 0.14, accent, alpha);
      break;
    case 'water':
      for (let branch = 0; branch < 4; branch++) {
        const dx = (branch - 1.5) * size * 0.17;
        round(g, color, x + dx, base - size * (0.55 + branch % 2 * 0.35), size * 0.13, size * (0.6 + branch % 2 * 0.35), size * 0.06, alpha);
        ellipse(g, accent, x + dx + size * 0.06, base - size * (0.55 + branch % 2 * 0.35), size * 0.23, size * 0.22, alpha);
      }
      ellipse(g, 0xe0faf2, x + size * 0.5, base - size * 1.15, size * 0.16, size * 0.16, alpha * 0.6);
      ellipse(g, 0xffffff, x + size * 0.48, base - size * 1.18, size * 0.04, size * 0.04, alpha * 0.8);
      break;
    case 'ice':
      for (let shard = 0; shard < 3; shard++) {
        const dx = (shard - 1) * size * 0.28;
        round(g, color, x + dx, base - size * (shard === 1 ? 1 : 0.65), size * 0.23, size * (shard === 1 ? 1 : 0.65), size * 0.1, alpha);
        round(g, mix(color, 0xffffff, 0.35), x + dx + size * 0.04, base - size * (shard === 1 ? 0.9 : 0.55), size * 0.05, size * 0.4, size * 0.025, alpha);
      }
      cloud(g, x, base - size * 1.03, size / 170, alpha);
      break;
    case 'sky':
      cloud(g, x, base - size * 0.65, size / 82, alpha);
      star(g, x + size * 0.7, base - size * 1.07, size * 0.11, accent, alpha);
      break;
    case 'forest':
      tree(g, x, base, size * 1.18, color, accent, alpha);
      tree(g, x + size * 0.55, base, size * 0.7, mix(color, 0x3d786b, 0.16), accent, alpha);
      break;
    case 'village':
      house(g, x, base, size, accent, alpha);
      tree(g, x - size * 0.64, base, size * 0.6, color, 0xf2c4a0, alpha);
      break;
    case 'beach':
      round(g, 0xc3a17a, x - size * 0.06, base - size * 0.87, size * 0.12, size * 0.9, size * 0.06, alpha);
      for (let frond = 0; frond < 5; frond++) {
        const angle = Math.PI + frond * Math.PI / 4;
        ellipse(g, color, x + Math.cos(angle) * size * 0.3, base - size * 0.86 + Math.sin(angle) * size * 0.15, size * 0.7, size * 0.18, alpha);
      }
      ellipse(g, accent, x + size * 0.38, base - size * 0.12, size * 0.4, size * 0.21, alpha);
      break;
    case 'factory':
      round(g, color, x - size * 0.42, base - size * 0.65, size * 0.84, size * 0.67, size * 0.12, alpha);
      for (const dx of [-0.23, 0.18]) {
        round(g, color, x + dx * size, base - size * 1.05, size * 0.18, size * 0.66, size * 0.08, alpha);
        cloud(g, x + dx * size, base - size * 1.13, size / 250, alpha * 0.65);
      }
      for (const dx of [-0.22, 0, 0.22]) round(g, accent, x + dx * size - size * 0.05, base - size * 0.43, size * 0.1, size * 0.16, size * 0.04, alpha);
      break;
    case 'volcano':
      hill(g, x, base - size * 0.1, size * 1.6, size * 1.5, color, alpha);
      ellipse(g, mix(color, 0x5c4f72, 0.35), x, base - size * 0.65, size * 0.68, size * 0.2, alpha);
      ellipse(g, accent, x, base - size * 0.67, size * 0.43, size * 0.1, alpha);
      glow(g, accent, x, base - size * 0.8, size * 0.4, alpha * 0.4);
      for (let ember = 0; ember < 3; ember++) ellipse(g, accent, x + (ember - 1) * size * 0.19, base - size * (1 + ember * 0.18), size * 0.05, size * 0.08, alpha);
      break;
    case 'haunted':
      house(g, x, base, size * 1.05, color, alpha);
      round(g, color, x - size * 0.14, base - size * 1.15, size * 0.28, size * 0.6, size * 0.13, alpha);
      ellipse(g, accent, x, base - size * 0.93, size * 0.13, size * 0.17, alpha * 0.85);
      glow(g, accent, x, base - size * 0.93, size * 0.24, alpha * 0.18);
      break;
    case 'ruins':
      for (const dx of [-0.36, 0.2]) {
        round(g, color, x + dx * size, base - size * 0.78, size * 0.21, size * 0.8, size * 0.05, alpha);
        round(g, mix(color, 0xffedcb, 0.2), x + dx * size - size * 0.05, base - size * 0.84, size * 0.31, size * 0.12, size * 0.05, alpha);
      }
      round(g, color, x - size * 0.4, base - size * 0.94, size * 0.86, size * 0.21, size * 0.1, alpha);
      ellipse(g, 0x6e9b7e, x - size * 0.3, base - size * 0.73, size * 0.36, size * 0.13, alpha);
      break;
    case 'canyon':
      for (let pillar = 0; pillar < 3; pillar++) {
        const height = size * (0.72 + (pillar % 2) * 0.38);
        round(g, color, x + (pillar - 1.5) * size * 0.4, base - height, size * 0.37, height + size * 0.1, size * 0.17, alpha);
        round(g, mix(color, 0xffe3bb, 0.19), x + (pillar - 1.5) * size * 0.4 + size * 0.04, base - height + size * 0.2, size * 0.29, size * 0.06, size * 0.03, alpha);
      }
      break;
    case 'space':
      ellipse(g, color, x, base - size * 0.65, size, size, alpha);
      ellipse(g, mix(color, 0xffefda, 0.25), x - size * 0.15, base - size * 0.8, size * 0.5, size * 0.42, alpha * 0.75);
      ellipse(g, accent, x, base - size * 0.58, size * 1.65, size * 0.17, alpha * 0.55);
      star(g, x + size * 0.7, base - size * 1.1, size * 0.1, 0xfff2c8, alpha);
      break;
    case 'castle':
      round(g, color, x - size * 0.45, base - size * 0.65, size * 0.9, size * 0.7, size * 0.1, alpha);
      for (const dx of [-0.37, 0.22]) {
        round(g, color, x + dx * size, base - size * 1.1, size * 0.22, size * 0.7, size * 0.1, alpha);
        ellipse(g, mix(color, 0xeecad6, 0.22), x + (dx + 0.11) * size, base - size * 1.09, size * 0.37, size * 0.25, alpha);
        round(g, accent, x + (dx + 0.07) * size, base - size * 0.87, size * 0.08, size * 0.18, size * 0.04, alpha);
      }
      round(g, mix(color, 0x4c5d85, 0.25), x - size * 0.09, base - size * 0.3, size * 0.18, size * 0.33, size * 0.09, alpha);
      break;
  }
}

export function createStorybookScenery(scene: Phaser.Scene): void {
  const g = scene.add.graphics();
  for (const [name, colors] of Object.entries(STORYBOOK_SCENERY) as [Theme, typeof STORYBOOK_SCENERY[Theme]][]) {
    const [skyTop, skyBottom, far, middle, near, accent] = colors;
    for (let layer = 0; layer < STORYBOOK_LAYER_HEIGHTS.length; layer++) {
      g.clear();
      const height = STORYBOOK_LAYER_HEIGHTS[layer];
      if (layer === 0) {
        // Full-width bands preserve identical edge colours when the sky repeats.
        for (let band = 0; band < 64; band++) {
          g.fillStyle(mix(skyTop, skyBottom, band / 63), 1);
          g.fillRect(0, band * height / 64, 1200, height / 64 + 1);
        }
        const night = name === 'haunted' || name === 'space' || name === 'castle';
        glow(g, night ? 0xe7e7ff : 0xfff2bd, 890, 125, 260, night ? 0.24 : 0.34);
        ellipse(g, night ? 0xfff2db : 0xffefb3, 890, 125, night ? 68 : 86, night ? 68 : 86, 0.9);
        ellipse(g, 0xffffff, 879, 112, night ? 21 : 28, night ? 15 : 19, 0.35);
        if (name === 'water') {
          for (let beam = 0; beam < 5; beam++) ellipse(g, 0xe4fff1, 110 + beam * 250, 210, 115, 640, 0.07);
        } else if (night) {
          for (let i = 0; i < 28; i++) star(g, (i * 173 + 53) % 1200, 38 + (i * 83) % 330, 2 + i % 3, 0xfff2d1, 0.25 + i % 4 * 0.12);
        } else {
          for (const [x, y, scale] of [[110, 150, 1.1], [470, 95, 0.76], [1090, 240, 0.9]]) wrapped(px => cloud(g, px, y, scale, 0.52), x);
        }
      } else {
        const alpha = 0.48 + layer * 0.065;
        const color = layer < 3 ? far : layer < 5 ? middle : near;
        const base = height * 0.94;
        // Rounded terrain ends at the same baseline on every horizontal repeat.
        if (name !== 'sky' && name !== 'space' && name !== 'water') {
          for (let i = 0; i < 4; i++) wrapped(x => hill(g, x, base, 450 + layer * 25, 200 + layer * 28 + i % 2 * 60, color, alpha), 100 + i * 330);
        } else if (name === 'water') {
          for (let i = 0; i < 4; i++) wrapped(x => hill(g, x, base + 45, 430, 180, color, alpha * 0.75), i * 370);
        }
        const count = layer <= 2 ? 3 : layer <= 4 ? 4 : 5;
        const size = 64 + layer * 13;
        for (let i = 0; i < count; i++) {
          const x = 90 + i * 1200 / count + (layer % 2) * 45;
          const localSize = size * (0.82 + (i % 3) * 0.13);
          wrapped(px => motif(g, name, px, base - i % 2 * 30, localSize, color, accent, alpha), x);
        }
        if (name === 'grasslands' || name === 'forest' || name === 'village' || name === 'beach') {
          for (let i = 0; i < 9; i++) wrapped(x => bloom(g, x, base - 8 - (i % 3) * 13, 10 + layer, accent, alpha * 0.8), 45 + i * 145);
        }
        if (name === 'sky' && layer === 3) {
          // A pastel rainbow sits behind the cotton islands, with no sharp outline.
          for (let stripe = 0; stripe < 4; stripe++) ellipse(g, [0xf6b9c7,0xffd7a5,0xd2e4b5,0xb4dce5][stripe], 600, base + 130, 690 - stripe * 23, 470 - stripe * 18, 0.13);
        }
      }
      const key = `bg_${name}_${layer}`;
      if (scene.textures.exists(key)) scene.textures.remove(key);
      g.generateTexture(key, 1200, height);
    }
  }
  g.destroy();
}

/** Foreground decorations share the same rounded silhouettes; original logical sizes stay fixed. */
export function createStorybookDecorations(scene: Phaser.Scene): void {
  const g = scene.add.graphics();
  const make = (key: string, width: number, height: number, draw: () => void) => {
    g.clear();
    if (scene.textures.exists(key)) scene.textures.remove(key);
    draw();
    g.generateTexture(key, width, height);
  };
  make('tree', 44, 60, () => tree(g, 20, 58, 36, 0x72b68c, 0xf5abc2));
  make('bush', 40, 35, () => {
    ellipse(g, 0x5f9d7d, 20, 26, 38, 16); ellipse(g, 0x7ab88a, 13, 19, 25, 25);
    ellipse(g, 0x90c796, 27, 19, 25, 23); ellipse(g, 0xc1dda3, 11, 13, 15, 10, 0.75);
    bloom(g, 29, 19, 5, 0xf2aec4);
  });
  make('cloud', 60, 40, () => cloud(g, 27, 25, 0.42, 1));
  make('flower', 24, 32, () => {
    round(g, 0x62986e, 11, 12, 3, 20, 1.5); ellipse(g, 0x8abb7e, 17, 23, 11, 5);
    bloom(g, 12, 11, 8, 0xf0a0ba);
  });
  make('mushroom', 24, 28, () => {
    round(g, 0xf0d8b7, 8, 13, 10, 15, 5); ellipse(g, 0xc45a78, 12, 13, 24, 18);
    ellipse(g, 0xee91a5, 10, 9, 20, 12); ellipse(g, 0xfff5df, 7, 8, 5, 4); ellipse(g, 0xfff5df, 17, 11, 4, 3);
  });
  make('house', 64, 56, () => house(g, 32, 55, 54, 0xc987a6));
  make('cactus', 32, 50, () => motif(g, 'desert', 19, 49, 43, 0x7ab59a, 0xf4b5bf, 1));
  make('rock', 32, 40, () => {
    ellipse(g, 0x9296a5, 16, 27, 31, 26); ellipse(g, 0xb7bac3, 13, 21, 25, 23);
    ellipse(g, 0xd9d6d0, 10, 17, 12, 8, 0.65);
  });
  make('palm', 32, 52, () => motif(g, 'beach', 16, 51, 46, 0x6da58b, 0xefb3a1, 1));
  g.destroy();
}
