import type Phaser from 'phaser';

/** Shared soft silhouettes, coloured outlines and top-left lighting for the storybook world. */
export const STORYBOOK = {
  outline: 0x51445f, cream: 0xfff8e9, gold: 0xffd86d, goldShade: 0xd69a46,
  red: 0xf47b83, redShade: 0xbd506b, green: 0x89cf81, greenShade: 0x438e73,
  blue: 0x91cde5, blueShade: 0x587ea6, brown: 0xb97c63, earth: 0xe1aa7c,
};

export function storybookPainter(scene: Phaser.Scene) {
  const g = scene.add.graphics();
  const ellipse = (color: number, x: number, y: number, w: number, h: number, alpha = 1) => {
    g.fillStyle(color, alpha); g.fillEllipse(x + w / 2, y + h / 2, w, h);
  };
  const round = (color: number, x: number, y: number, w: number, h: number, radius = 4, alpha = 1) => {
    g.fillStyle(color, alpha); g.fillRoundedRect(x, y, w, h, Math.min(radius, w / 2, h / 2));
  };
  const rect = (color: number, x: number, y: number, w: number, h: number, alpha = 1) => {
    g.fillStyle(color, alpha); g.fillRect(x, y, w, h);
  };
  const triangle = (color: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
    g.fillStyle(color, 1); g.fillTriangle(x1, y1, x2, y2, x3, y3);
  };
  const blob = (color: number, shadow: number, x: number, y: number, w: number, h: number) => {
    ellipse(STORYBOOK.outline, x, y, w, h);
    ellipse(shadow, x + 1, y + 1, w - 2, h - 2);
    ellipse(color, x + 1.5, y + 1, w - 3, Math.max(2, h - 4));
    ellipse(STORYBOOK.cream, x + w * 0.2, y + h * 0.13, w * 0.34, Math.max(1.5, h * 0.14), 0.45);
  };
  const eye = (x: number, y: number, w = 5, h = 7, look = 1) => {
    ellipse(STORYBOOK.cream, x, y, w, h);
    ellipse(STORYBOOK.outline, x + (look > 0 ? w * 0.48 : w * 0.12), y + h * 0.18, w * 0.4, h * 0.67);
    ellipse(0xffffff, x + (look > 0 ? w * 0.52 : w * 0.16), y + h * 0.2, Math.max(0.7, w * 0.16), Math.max(0.8, h * 0.2));
  };
  const cheek = (x: number, y: number, w = 5) => ellipse(0xffa6a0, x, y, w, 2.7, 0.75);
  const mouth = (x: number, y: number, w = 5) => {
    ellipse(STORYBOOK.outline, x, y, w, 2.8); ellipse(STORYBOOK.cream, x + 0.7, y, w - 1.4, 1.1);
  };
  return {
    g, ellipse, round, rect, triangle, blob, eye, cheek, mouth,
    make(key: string, width: number, height: number, draw: () => void) {
      g.clear();
      if (scene.textures.exists(key)) scene.textures.remove(key);
      draw(); g.generateTexture(key, width, height);
    },
    destroy: () => g.destroy(),
  };
}
