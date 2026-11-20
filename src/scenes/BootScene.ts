import Phaser from 'phaser';
import { createStorybookPlayer } from '../art/storybookPlayer';
import { createStorybookScenery, createStorybookDecorations } from '../art/storybookScenery';
import { createClassicAssets } from '../art/classicAssets';
import { createPixelEnemies, createPixelCoins, createPixelBlocks, createPixelItems } from '../art/pixelAssets';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  create() {
    this.generateAllTextures();
    this.time.delayedCall(100, () => {
      this.scene.start('Title');
    });
  }

  private generateAllTextures() {
    this.createPlayerTextures();
    this.createEnemyTextures();
    this.createCoinTextures();
    this.createBlockTextures();
    this.createDecorationTextures();
    createStorybookDecorations(this);
    this.createBackgroundTextures();
    this.createItemTextures();
    createClassicAssets(this);
    this.createParticleTextures();
  }

  private lerpColor(from: number, to: number, t: number): number {
    const fr = (from >> 16) & 0xff, fg = (from >> 8) & 0xff, fb = from & 0xff;
    const tr = (to >> 16) & 0xff, tg = (to >> 8) & 0xff, tb = to & 0xff;
    const r = Math.round(fr + (tr - fr) * t);
    const gg = Math.round(fg + (tg - fg) * t);
    const b = Math.round(fb + (tb - fb) * t);
    return (r << 16) | (gg << 8) | b;
  }

  private fillVGradient(g: Phaser.GameObjects.Graphics, x: number, y: number, w: number, h: number, top: number, bottom: number, steps = 32) {
    const stepH = h / steps;
    for (let i = 0; i < steps; i++) {
      g.fillStyle(this.lerpColor(top, bottom, i / (steps - 1)), 1);
      g.fillRect(x, y + stepH * i, w, stepH + 0.5);
    }
  }

  private fillHGradient(g: Phaser.GameObjects.Graphics, x: number, y: number, w: number, h: number, left: number, right: number, steps = 24) {
    const stepW = w / steps;
    for (let i = 0; i < steps; i++) {
      g.fillStyle(this.lerpColor(left, right, i / (steps - 1)), 1);
      g.fillRect(x + stepW * i, y, stepW + 0.5, h);
    }
  }

  private rivet(g: Phaser.GameObjects.Graphics, x: number, y: number, r: number) {
    g.fillStyle(0x6a4a10, 1);
    g.fillCircle(x, y, r);
    g.fillStyle(0xa8822a, 1);
    g.fillCircle(x - r * 0.2, y - r * 0.2, r * 0.65);
    g.fillStyle(0xf0d888, 0.85);
    g.fillCircle(x - r * 0.3, y - r * 0.35, r * 0.3);
  }

  private strokeOutline(g: Phaser.GameObjects.Graphics, x: number, y: number, w: number, h: number, color: number, radius = 0) {
    g.lineStyle(2, color, 1);
    if (radius > 0) g.strokeRoundedRect(x, y, w, h, radius);
    else g.strokeRect(x, y, w, h);
  }

  private softRimLight(g: Phaser.GameObjects.Graphics, x: number, y: number, rx: number, ry: number, alpha = 0.25) {
    g.lineStyle(1.6, 0xffffff, alpha);
    g.strokeEllipse(x, y, rx * 2, ry * 2);
    g.lineStyle(0.8, 0xffffff, alpha * 0.55);
    g.strokeEllipse(x + 0.6, y + 0.8, rx * 2 - 1.4, ry * 2 - 1.6);
  }

  private wonderSheen(g: Phaser.GameObjects.Graphics, x: number, y: number, w: number, h: number, alpha = 0.28) {
    g.fillStyle(0xffffff, alpha);
    g.fillRoundedRect(x, y, w, h * 0.42, Math.min(3, h * 0.2));
    g.fillStyle(0xffffff, alpha * 0.4);
    g.fillRoundedRect(x + w * 0.12, y + h * 0.5, w * 0.5, h * 0.2, 2);
  }

  private softPuff(g: Phaser.GameObjects.Graphics, cx: number, cy: number, r: number, base: number, light: number, under: number, n = 6) {
    for (let i = n; i >= 1; i--) {
      const t = i / n;
      const px = cx + Math.sin(i * 2.1) * r * 0.5;
      const py = cy + Math.cos(i * 1.7) * r * 0.28 - r * 0.12;
      g.fillStyle(under, 0.5);
      g.fillCircle(px, py + r * 0.3, r * t);
      g.fillStyle(base, 0.85);
      g.fillCircle(px, py, r * t);
      g.fillStyle(light, 0.75);
      g.fillCircle(px - r * t * 0.25, py - r * t * 0.3, r * t * 0.55);
    }
    g.fillStyle(light, 0.5);
    g.fillCircle(cx - r * 0.2, cy - r * 0.35, r * 0.45);
  }

  private softRadialHaze(g: Phaser.GameObjects.Graphics, x: number, y: number, r: number, color: number, maxAlpha: number, steps = 14) {
    for (let i = steps; i >= 1; i--) {
      g.fillStyle(color, maxAlpha * (1 - i / (steps + 1)));
      g.fillCircle(x, y, (r * i) / steps);
    }
  }

  private drawLightBeams(g: Phaser.GameObjects.Graphics, w: number, h: number, color: number, maxAlpha: number) {
    const beams: [number, number, number, number][] = [
      [0.14, 90, 0.30, 1.0], [0.36, 42, 0.18, 0.6], [0.55, 120, 0.34, 1.2],
      [0.76, 60, 0.22, 0.8], [0.90, 34, 0.14, 0.5]
    ];
    for (let i = 0; i < beams.length; i++) {
      const [fx, bw, tilt, am] = beams[i];
      const x = w * fx;
      const dx = h * tilt;
      g.fillStyle(color, maxAlpha * am * (0.75 + (i % 3) * 0.15));
      g.beginPath();
      g.moveTo(x - bw * 0.5, 0);
      g.lineTo(x + bw * 0.5, 0);
      g.lineTo(x + bw * 1.4 + dx, h);
      g.lineTo(x - bw * 0.4 + dx, h);
      g.closePath();
      g.fillPath();
    }
  }

  private createPlayerTextures() {
    createStorybookPlayer(this);
  }

  private createEnemyTextures() {
    createPixelEnemies(this);
  }

  private createCoinTextures() {
    createPixelCoins(this);
  }

  private createBlockTextures() {
    createPixelBlocks(this);
  }

  private createDecorationTextures() {
    const g = this.add.graphics();
    
    // TREE - detailed tree
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(22, 58, 30, 5);
    g.fillStyle(0x4a2408, 1);
    g.fillRoundedRect(17, 28, 10, 30, 3);
    g.fillStyle(0x8B4513, 1);
    g.fillRoundedRect(18, 28, 8, 30, 3);
    g.fillStyle(0x5d3010, 0.7);
    g.fillRect(24, 30, 2.5, 26);
    g.fillStyle(0xa05c24, 0.6);
    g.fillRect(19, 30, 2, 24);
    g.fillStyle(0x6a3410, 0.8);
    g.fillCircle(20, 42, 1.5); g.fillCircle(24, 50, 1.3);
    g.fillStyle(0x2c6a20, 1);
    g.fillCircle(22, 22, 19);
    g.fillCircle(9, 25, 11); g.fillCircle(34, 25, 11);
    g.fillStyle(0x3f9434, 1);
    g.fillCircle(22, 21, 17);
    g.fillCircle(10, 23, 10); g.fillCircle(33, 23, 10);
    g.fillStyle(0x54B84C, 1);
    g.fillCircle(15, 17, 10); g.fillCircle(28, 19, 10);
    g.fillCircle(22, 14, 9);
    g.fillStyle(0x74D864, 0.8);
    g.fillCircle(13, 14, 7); g.fillCircle(27, 15, 7); g.fillCircle(21, 10, 6);
    g.fillStyle(0xA2E88A, 0.55);
    g.fillCircle(14, 12, 5); g.fillCircle(24, 9, 4);
    g.fillStyle(0xC8F8AC, 0.35);
    g.fillCircle(12, 10, 6.5);
    g.fillStyle(0xffa500, 0.65);
    g.fillCircle(18, 27, 3.5); g.fillCircle(28, 24, 3);
    g.fillCircle(12, 22, 2.6);
    g.fillStyle(0xffd966, 0.7);
    g.fillCircle(17.5, 26.2, 1.4); g.fillCircle(27.6, 23.4, 1.2);
    g.fillStyle(0xffffff, 0.5);
    g.fillCircle(12, 11, 2.2);
    g.fillStyle(0xffffff, 0.25);
    g.fillCircle(18, 14, 5.5);
    g.generateTexture('tree', 44, 60);

    // BUSH
    g.clear();
    g.fillStyle(0x000000, 0.18);
    g.fillEllipse(20, 32, 36, 5);
    g.fillStyle(0x2c6a20, 1);
    g.fillEllipse(20, 24, 40, 25);
    g.fillEllipse(8, 27, 15, 12);
    g.fillEllipse(32, 28, 15, 12);
    g.fillStyle(0x3f9434, 1);
    g.fillEllipse(20, 23, 36, 21);
    g.fillEllipse(8, 26, 12, 10);
    g.fillEllipse(32, 27, 12, 10);
    g.fillStyle(0x6ecf5a, 0.85);
    g.fillEllipse(15, 19, 18, 11);
    g.fillEllipse(27, 20, 12, 9);
    g.fillStyle(0x9ce884, 0.55);
    g.fillCircle(13, 18, 5); g.fillCircle(29, 19, 3.5);
    g.fillStyle(0xd2f8c0, 0.3);
    g.fillCircle(16, 18, 7);
    g.fillStyle(0xffa500, 0.75);
    g.fillCircle(15, 25, 3); g.fillCircle(28, 22, 3);
    g.fillStyle(0xffd966, 0.7);
    g.fillCircle(14.2, 24.2, 1.3); g.fillCircle(27.2, 21.2, 1.3);
    g.fillStyle(0xffffff, 0.5);
    g.fillCircle(13, 17, 2);
    g.generateTexture('bush', 40, 35);
    
    // CLOUD - fluffy cloud
    g.clear();
    g.fillStyle(0xd6efff, 1);
    g.fillCircle(30, 22, 18);
    g.fillCircle(15, 24, 12);
    g.fillCircle(45, 24, 14);
    g.fillCircle(25, 30, 10);
    g.fillCircle(35, 28, 10);
    g.fillStyle(0xFFFFFF, 1);
    g.fillCircle(30, 19, 17);
    g.fillCircle(15, 21, 11);
    g.fillCircle(45, 21, 13);
    g.fillCircle(25, 26, 9);
    g.fillCircle(35, 24, 9);
    g.fillStyle(0xFFFFFF, 0.75);
    g.fillCircle(38, 25, 10);
    g.fillCircle(22, 24, 11);
    g.fillStyle(0xF0FAFF, 0.9);
    g.fillCircle(24, 15, 8);
    g.fillCircle(40, 16, 7);
    g.fillStyle(0xd6efff, 0.85);
    g.fillEllipse(30, 30, 34, 8);
    g.fillStyle(0xFFFFFF, 0.85);
    g.fillCircle(20, 12, 3);
    g.generateTexture('cloud', 60, 40);
    
    // PIPE decoration (for decoration list)
    g.clear();
    g.fillStyle(0x00a000, 1); g.fillRoundedRect(0, 0, 48, 24, 4);
    g.fillStyle(0x00d800, 1); g.fillRoundedRect(4, 0, 8, 24, 2);
    g.fillStyle(0x007000, 1); g.fillRoundedRect(36, 0, 8, 24, 2);
    g.generateTexture('decoration_pipe', 48, 24);
    
    // FLAG
    g.clear();
    g.fillStyle(0x8B4513, 1); g.fillRect(6, 0, 4, 50);
    g.fillStyle(0xFF0000, 1); g.fillTriangle(10, 5, 35, 12, 10, 20);
    g.fillStyle(0xFFFFFF, 0.9); g.fillTriangle(10, 22, 25, 26, 10, 32);
    g.generateTexture('flag', 40, 50);
    
    // Difficulty markers for paths
    // Star marker - shows hard path
    g.clear();
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(12, 12, 10);
    g.fillStyle(0xFFA500, 1);
    g.fillCircle(12, 12, 6);
    g.fillStyle(0xFFFFFF, 0.8);
    g.fillCircle(8, 8, 3);
    g.generateTexture('star_marker', 24, 24);
    
    // Coin marker - shows medium path  
    g.clear();
    g.fillStyle(0xC0C0C0, 0.8);
    g.fillCircle(10, 10, 8);
    g.fillStyle(0xFFFFFF, 0.6);
    g.fillCircle(8, 8, 3);
    g.generateTexture('coin_marker', 20, 20);
    
    // Easy path marker (green leaf)
    g.clear();
    g.fillStyle(0x90EE90, 0.8);
    g.fillEllipse(10, 10, 16, 10);
    g.fillStyle(0x228B22, 1);
    g.fillCircle(10, 10, 4);
    g.generateTexture('easy_marker', 20, 20);
    
    // === BIOME SPECIFIC DECORATIONS ===
    
    // Flower (grass world)
    g.clear();
    g.fillStyle(0x123c0c, 1);
    g.fillRoundedRect(9, 19, 6, 13, 2.5);
    g.fillStyle(0x2c7a28, 1);
    g.fillRoundedRect(10, 19, 4, 13, 2);
    g.fillEllipse(6, 26, 6, 3);
    g.fillStyle(0x74d864, 0.7);
    g.fillRect(11, 20, 1.5, 10);
    g.fillStyle(0xc86898, 1);
    for (let p = 0; p < 5; p++) {
      const pa = (p / 5) * Math.PI * 2;
      g.fillEllipse(12 + Math.cos(pa) * 4.4, 15 + Math.sin(pa) * 4.4, 5, 5);
    }
    g.fillStyle(0xFF86C8, 1);
    g.fillCircle(12, 15, 5.4);
    g.fillStyle(0xff7cc4, 0.55);
    g.fillCircle(12, 14.6, 6.2);
    g.fillStyle(0xffb8dc, 0.7);
    g.fillEllipse(10.4, 13.4, 4.5, 3.5);
    g.fillStyle(0xffe860, 1);
    g.fillCircle(12, 15, 2.4);
    g.fillStyle(0xfff8b4, 0.9);
    g.fillCircle(11.3, 14.3, 1);
    g.generateTexture('flower', 24, 32);

    // Mushroom (grass world)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(12, 26.5, 14, 3);
    g.fillStyle(0xd8c8a8, 1);
    g.fillRoundedRect(9, 17, 6, 10, 2.5);
    g.fillStyle(0x8B4513, 0.5);
    g.fillRoundedRect(12, 18, 2.5, 8, 1);
    g.fillStyle(0xc05050, 1);
    g.fillEllipse(12, 12, 22, 15);
    g.fillStyle(0xf06860, 1);
    g.fillEllipse(12, 11.5, 20, 13);
    g.fillStyle(0xffa08a, 0.6);
    g.fillEllipse(9, 8.5, 8, 5);
    g.fillStyle(0xff8078, 0.3);
    g.fillCircle(11, 10, 8.5);
    g.fillStyle(0xFFFFFF, 1);
    g.fillCircle(8, 10, 2.4); g.fillCircle(15, 8, 2);
    g.fillCircle(14, 13, 1.6);
    g.fillStyle(0xfff0f0, 0.85);
    g.fillCircle(8, 9.4, 1);
    g.fillStyle(0xffffff, 0.6);
    g.fillCircle(9, 8.2, 1.2);
    this.strokeOutline(g, 2, 4, 20, 13, 0xa04848);
    g.generateTexture('mushroom', 24, 28);
    
    // Bat (cave world)
    g.clear();
    g.fillStyle(0x4a4a6a, 1);
    g.fillEllipse(16, 16, 16, 10);
    g.fillStyle(0x6a6a8a, 1);
    g.fillTriangle(6, 14, 0, 20, 6, 20);
    g.fillTriangle(26, 14, 32, 20, 26, 20);
    g.fillStyle(0xFF0000, 1); g.fillCircle(12, 14, 2); g.fillCircle(20, 14, 2);
    g.generateTexture('bat', 32, 24);
    
    // Spider (cave world)
    g.clear();
    g.fillStyle(0x2d2d44, 1);
    g.fillCircle(16, 14, 8);
    g.fillStyle(0x000000, 1);
    g.fillCircle(14, 12, 3); g.fillCircle(18, 12, 3);
    g.lineStyle(1, 0x000000, 1);
    g.lineBetween(16, 22, 10, 28); g.lineBetween(16, 22, 22, 28);
    g.lineBetween(10, 14, 4, 8); g.lineBetween(22, 14, 28, 8);
    g.generateTexture('spider', 32, 30);
    
    // Torch (castle world)
    g.clear();
    g.fillStyle(0x3a1c08, 1);
    g.fillRoundedRect(9, 15, 6, 17, 2);
    g.fillStyle(0x8B4513, 1);
    g.fillRoundedRect(10, 15, 4, 17, 2);
    g.fillStyle(0x5d3010, 0.7);
    g.fillRect(12.5, 15, 1.5, 17);
    g.fillStyle(0x4a4a4a, 1);
    g.fillRoundedRect(8, 13, 8, 3, 1.5);
    g.fillStyle(0x707070, 0.9);
    g.fillRoundedRect(9, 13.5, 6, 1.5, 1);
    g.fillStyle(0xd8340a, 0.35);
    g.fillCircle(12, 8, 9);
    g.fillStyle(0xFF4500, 1);
    g.fillTriangle(12, 0, 6, 14, 18, 14);
    g.fillStyle(0xFFFF00, 1);
    g.fillTriangle(12, 5, 8, 14, 16, 14);
    g.fillStyle(0xfff4a0, 1);
    g.fillTriangle(12, 10, 10, 14, 14, 14);
    g.fillStyle(0xffffff, 0.7);
    g.fillCircle(12, 6, 1.6);
    g.generateTexture('torch', 24, 32);
    
    // Ghost (castle world)
    g.clear();
    g.fillStyle(0xFFFFFF, 0.8);
    g.fillCircle(12, 12, 10);
    g.fillRoundedRect(2, 12, 20, 14, { tl: 0, tr: 0, bl: 6, br: 6 });
    g.fillStyle(0x000000, 1);
    g.fillCircle(8, 10, 3); g.fillCircle(16, 10, 3);
    g.generateTexture('ghost_decor', 24, 26);
    
    // Chain for castle
    g.clear();
    g.fillStyle(0x505050, 1);
    for (let i = 0; i < 4; i++) {
      g.fillRoundedRect(6, i * 8, 12, 6, 2);
    }
    g.generateTexture('chain', 24, 32);
    
    // Platform indicator - shows difficulty
    // Easy (green)
    g.clear();
    g.fillStyle(0x2E8B2E, 1); g.fillRoundedRect(0, 0, 32, 12, 3);
    g.generateTexture('path_easy', 32, 12);
    
    // Medium (yellow)
    g.clear();
    g.fillStyle(0xDAA520, 1); g.fillRoundedRect(0, 0, 32, 12, 3);
    g.generateTexture('path_medium', 32, 12);
    
    // Hard (red)
    g.clear();
    g.fillStyle(0xB22222, 1); g.fillRoundedRect(0, 0, 32, 12, 3);
    g.generateTexture('path_hard', 32, 12);

    // Fence (village decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(16, 39.5, 30, 4);
    g.fillStyle(0x5a2c10, 1);
    g.fillRect(2, 16, 4, 24);
    g.fillRect(26, 16, 4, 24);
    g.fillStyle(0x8B4513, 1);
    g.fillRect(2.7, 17, 2.6, 22);
    g.fillRect(26.7, 17, 2.6, 22);
    g.fillStyle(0xa05c28, 0.6);
    g.fillRect(3.3, 18, 1.2, 9);
    g.fillRect(27.3, 18, 1.2, 9);
    g.fillStyle(0x3a1c08, 1);
    g.fillRect(0, 12, 32, 6);
    g.fillRect(0, 26, 32, 4);
    g.fillStyle(0x6b3a10, 1);
    g.fillRect(0.8, 12.8, 30.4, 3);
    g.fillRect(0.8, 26.6, 30.4, 2);
    g.fillStyle(0xb07040, 0.45);
    g.fillRect(0.8, 13.2, 30.4, 1);
    g.fillStyle(0x5a2c10, 1);
    g.fillTriangle(4, 12, 4, 4, 2, 12);
    g.fillTriangle(28, 12, 28, 4, 30, 12);
    g.fillStyle(0xa05c28, 0.8);
    g.fillTriangle(3.4, 11, 3.4, 6.5, 2.7, 11);
    g.lineStyle(2, 0x3a1c08, 0.9);
    g.strokeRect(2, 16, 4, 24);
    g.strokeRect(26, 16, 4, 24);
    g.strokeRect(0, 12, 32, 6);
    g.strokeRect(0, 26, 32, 4);
    g.generateTexture('fence', 32, 40);

    // Balloon (sky decoration)
    g.clear();
    g.fillStyle(0x000000, 0.15);
    g.fillEllipse(16, 35, 26, 5);
    g.fillStyle(0xB83820, 1);
    g.fillEllipse(16, 20, 24, 28);
    g.fillStyle(0xFF6347, 1);
    g.fillEllipse(16, 19.4, 21, 25);
    g.fillStyle(0xFF9A80, 0.55);
    g.fillEllipse(10, 12, 10, 9);
    g.fillStyle(0xFFD8CC, 0.55);
    g.fillEllipse(9, 11, 4.5, 3.5);
    g.lineStyle(2, 0x7a1f10, 0.9);
    g.strokeEllipse(16, 20, 24, 28);
    g.fillStyle(0xB83820, 1);
    g.fillTriangle(13, 33, 19, 33, 16, 37.5);
    g.fillStyle(0xD8A800, 1);
    g.fillRect(14, 37, 4, 11);
    g.fillStyle(0xFFE870, 0.55);
    g.fillRect(14.7, 37.5, 1, 10);
    g.lineStyle(1.5, 0x8a6a10, 0.9);
    g.strokeRect(14, 37, 4, 11);
    g.fillStyle(0x6b3a10, 1);
    g.fillRoundedRect(9, 51.5, 14, 3.5, 1.5);
    g.fillStyle(0xa05c28, 0.7);
    g.fillRect(10, 52.2, 12, 1.2);
    g.lineStyle(1.5, 0x3a1c08, 0.9);
    g.strokeRoundedRect(9, 51.5, 14, 3.5, 1.5);
    g.generateTexture('balloon', 32, 56);

    // Bird (sky decoration)
    g.clear();
    g.fillStyle(0x101010, 0.9);
    g.fillEllipse(16, 16, 20, 12);
    g.fillTriangle(4, 14, 0, 10, 4, 18);
    g.fillTriangle(28, 14, 32, 10, 28, 18);
    g.fillStyle(0x3a3a3a, 1);
    g.fillEllipse(16, 15.2, 18, 10);
    g.fillStyle(0x525252, 0.55);
    g.fillEllipse(13, 12.5, 9, 5);
    g.fillStyle(0x2F2F2F, 1);
    g.fillTriangle(5, 13.5, 1.5, 11, 4, 16.5);
    g.fillTriangle(27, 13.5, 30.5, 11, 28, 16.5);
    g.fillStyle(0x585858, 0.6);
    g.fillTriangle(6, 13, 3.5, 11.5, 5, 15);
    g.lineStyle(2, 0x101010, 0.9);
    g.strokeEllipse(16, 16, 20, 12);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(22, 14, 3);
    g.fillStyle(0xFFE880, 0.7);
    g.fillCircle(21.2, 13.2, 1.6);
    g.lineStyle(2, 0x101010, 0.9);
    g.strokeCircle(22, 14, 3);
    g.fillStyle(0x000000, 1);
    g.fillCircle(23.3, 13.2, 1.1);
    g.fillStyle(0xffffff, 0.9);
    g.fillCircle(23, 12.8, 0.5);
    g.lineStyle(1.5, 0xFFA500, 0.9);
    g.lineBetween(25, 14.5, 27.5, 15.5);
    g.generateTexture('bird', 32, 32);

    // Sun (sky decoration)
    g.clear();
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      g.fillStyle(0xE89600, 0.5);
      g.fillTriangle(
        20 + Math.cos(angle) * 11, 20 + Math.sin(angle) * 11,
        20 + Math.cos(angle - 0.2) * 19, 20 + Math.sin(angle - 0.2) * 19,
        20 + Math.cos(angle + 0.2) * 19, 20 + Math.sin(angle + 0.2) * 19
      );
      g.fillStyle(0xFFA500, 1);
      g.fillTriangle(
        20 + Math.cos(angle) * 12, 20 + Math.sin(angle) * 12,
        20 + Math.cos(angle - 0.14) * 17.5, 20 + Math.sin(angle - 0.14) * 17.5,
        20 + Math.cos(angle + 0.14) * 17.5, 20 + Math.sin(angle + 0.14) * 17.5
      );
    }
    g.fillStyle(0xE89600, 1);
    g.fillCircle(20, 20, 14);
    g.fillStyle(0xFFC830, 1);
    g.fillCircle(20, 19.5, 12.5);
    g.fillStyle(0xFFE070, 0.65);
    g.fillCircle(15.5, 15, 5.5);
    g.fillStyle(0xFFF4B0, 0.75);
    g.fillCircle(14.5, 14, 2.8);
    g.lineStyle(2, 0xB86A00, 0.9);
    g.strokeCircle(20, 20, 13.5);
    g.generateTexture('sun', 40, 40);

    // Rainbow (sky decoration)
    g.clear();
    const rainbowColors = [0xFF4040, 0xFF9A40, 0xFFE050, 0x50D850, 0x4090FF, 0x7050D8, 0xB050D0];
    const rainbowDark = [0xB01A1A, 0xC05A10, 0xB89210, 0x1A8A1A, 0x1A50A8, 0x3A2890, 0x702090];
    const rainbowLight = [0xFF8A8A, 0xFFC890, 0xFFF8B0, 0x90F890, 0x80C0FF, 0xA088F0, 0xD088F8];
    for (let i = 0; i < rainbowColors.length; i++) {
      g.fillStyle(rainbowColors[i], 1);
      g.fillRect(i * 6, 0, 6, 40);
      g.fillStyle(rainbowLight[i], 0.45);
      g.fillRect(i * 6, 0, 2.2, 40);
      g.fillStyle(rainbowDark[i], 0.35);
      g.fillRect(i * 6 + 4, 0, 2, 40);
    }
    g.fillStyle(0xffffff, 0.14);
    g.fillRect(0, 6, 42, 8);
    g.fillStyle(0xffffff, 0.08);
    g.fillRect(0, 26, 42, 5);
    g.generateTexture('rainbow', 42, 40);

    // House (village decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(32, 55, 56, 5);
    g.fillStyle(0x5a2c10, 1);
    g.fillTriangle(2, 26, 62, 26, 32, 2);
    g.fillStyle(0x8B4513, 1);
    g.fillTriangle(4, 25, 60, 25, 32, 4);
    g.fillStyle(0xa0522d, 0.8);
    g.fillTriangle(32, 4, 46, 25, 60, 25);
    g.fillStyle(0x5a3a20, 0.5);
    g.fillTriangle(32, 4, 24, 25, 40, 25);
    g.fillStyle(0x6a4420, 1);
    g.fillRect(7, 26, 50, 30);
    g.fillStyle(0x8B4513, 1);
    g.fillRect(8, 27, 48, 29);
    g.fillStyle(0x9a5c28, 0.5);
    g.fillRect(9, 28, 46, 3);
    g.fillStyle(0xb8860b, 0.9);
    g.fillRect(15, 32, 12, 12);
    g.fillRect(36, 32, 12, 12);
    g.fillStyle(0x87CEEB, 1);
    g.fillRect(16, 33, 10, 11);
    g.fillRect(37, 33, 10, 11);
    g.fillStyle(0xffffff, 0.6);
    g.fillTriangle(16, 33, 21, 33, 21, 39);
    g.fillStyle(0x5a3a20, 1);
    g.fillRect(26, 40, 12, 16);
    g.fillStyle(0x8B5A2B, 1);
    g.fillRect(27, 41, 10, 15);
    g.fillStyle(0xd8b060, 0.9);
    g.fillCircle(34, 48, 1.4);
    g.lineStyle(2, 0x3a1c08, 1);
    g.strokeRect(16, 33, 10, 11); g.strokeRect(37, 33, 10, 11);
    g.strokeRect(26, 40, 12, 16);
    g.generateTexture('house', 64, 56);

    // Barrel (village decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(16, 38.5, 26, 4);
    g.fillStyle(0x5a3410, 1);
    g.fillEllipse(16, 20, 24, 28);
    g.fillStyle(0x8B4513, 1);
    g.fillEllipse(16, 19.5, 22, 26);
    g.fillStyle(0xA05C28, 0.7);
    g.fillEllipse(12, 15, 9, 14);
    g.fillStyle(0xC08040, 0.45);
    g.fillEllipse(11, 14, 4, 8);
    g.fillStyle(0x4a4a4a, 1);
    g.fillRect(3.5, 8, 25, 4);
    g.fillRect(3.5, 28, 25, 4);
    g.fillStyle(0x6a6a6a, 1);
    g.fillRect(3.5, 8.6, 25, 1.2);
    g.fillRect(3.5, 28.6, 25, 1.2);
    g.fillStyle(0x2a2a2a, 0.8);
    g.fillRect(3.5, 11, 25, 1);
    g.fillRect(3.5, 31, 25, 1);
    g.fillStyle(0x9a9a9a, 0.9);
    g.fillCircle(6, 10, 1);
    g.fillCircle(26, 10, 1);
    g.fillCircle(6, 30, 1);
    g.fillCircle(26, 30, 1);
    g.lineStyle(2, 0x3a1c08, 0.9);
    g.strokeEllipse(16, 20, 24, 28);
    g.generateTexture('barrel', 32, 40);

    // Planet (space decoration)
    g.clear();
    g.fillStyle(0x3a2810, 0.6);
    g.fillCircle(20, 21, 16.5);
    g.fillStyle(0xCD853F, 1);
    g.fillCircle(20, 20, 15);
    g.fillStyle(0xDEB887, 1);
    g.fillCircle(18.5, 18.5, 13);
    g.fillStyle(0xB87A3A, 0.55);
    g.fillEllipse(14, 24, 8, 4);
    g.fillEllipse(25, 14, 5, 3);
    g.fillCircle(26, 25, 3);
    g.fillStyle(0xF0D8B0, 0.9);
    g.fillEllipse(20, 20, 26, 5.5);
    g.fillStyle(0xFFF0D8, 0.5);
    g.fillEllipse(20, 19.4, 22, 3);
    g.fillStyle(0x8a5a2a, 0.45);
    g.fillEllipse(20, 23, 24, 3.5);
    g.lineStyle(2, 0x6a4416, 0.9);
    g.strokeCircle(20, 20, 15);
    g.generateTexture('planet', 40, 40);

    // Rocket (space decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(20, 54.5, 24, 4);
    g.fillStyle(0x8a8a8a, 1);
    g.fillTriangle(12, 8, 20, 0, 28, 8);
    g.fillStyle(0xC0C0C0, 1);
    g.fillTriangle(12.5, 7.5, 20, 2, 27.5, 7.5);
    g.fillStyle(0x9a9a9a, 1);
    g.fillRect(12, 8, 16, 40);
    g.fillStyle(0xC8C8C8, 1);
    g.fillRect(13.5, 8, 13, 40);
    g.fillStyle(0xF0F0F0, 0.7);
    g.fillRect(15, 8, 5, 40);
    g.fillStyle(0x7a7a7a, 0.6);
    g.fillRect(25, 8, 3, 40);
    g.fillStyle(0xCC1010, 1);
    g.fillRect(12, 40, 16, 8);
    g.fillStyle(0xFF3030, 0.7);
    g.fillRect(12.8, 40.8, 14, 3);
    g.fillStyle(0x8a0808, 0.6);
    g.fillRect(12, 46, 16, 2);
    g.fillStyle(0x00BFFF, 1);
    g.fillCircle(20, 28, 6);
    g.fillStyle(0x40D8FF, 1);
    g.fillCircle(20, 27.5, 4.8);
    g.fillStyle(0x90EAFF, 0.7);
    g.fillCircle(18, 26, 2.2);
    g.lineStyle(2, 0x5a5a5a, 1);
    g.strokeRoundedRect(12, 8, 16, 40, 2);
    g.strokeCircle(20, 28, 6);
    g.lineStyle(2, 0x6a0808, 0.9);
    g.strokeRect(12, 40, 16, 8);
    g.generateTexture('rocket', 40, 56);

    // Asteroid (space decoration)
    g.clear();
    g.fillStyle(0x4a4a4a, 1);
    g.fillEllipse(16, 16, 28, 24);
    g.fillStyle(0x696969, 1);
    g.fillEllipse(15.5, 15.5, 25, 21);
    g.fillStyle(0x7d7d7d, 0.7);
    g.fillEllipse(12, 11, 11, 7);
    g.fillStyle(0x505050, 1);
    g.fillCircle(10, 12, 4);
    g.fillStyle(0x3a3a3a, 0.9);
    g.fillCircle(10.3, 12.3, 3.2);
    g.fillStyle(0x5a5a5a, 0.6);
    g.fillCircle(9.3, 11.3, 1.6);
    g.fillCircle(22, 18, 3);
    g.fillStyle(0x3f3f3f, 0.9);
    g.fillCircle(22.3, 18.3, 2.3);
    g.fillCircle(14, 22, 2);
    g.fillStyle(0x333333, 0.9);
    g.fillCircle(14.3, 22.3, 1.4);
    g.lineStyle(2, 0x2a2a2a, 0.9);
    g.strokeEllipse(16, 16, 28, 24);
    g.generateTexture('asteroid', 32, 32);

    // Satellite (space decoration)
    g.clear();
    g.fillStyle(0x6a6a6a, 1);
    g.fillRect(8, 18, 24, 8);
    g.fillRect(4, 14, 8, 16);
    g.fillRect(28, 14, 8, 16);
    g.fillStyle(0xC0C0C0, 1);
    g.fillRect(8.8, 18.8, 22.4, 6.4);
    g.fillStyle(0xE0E0E0, 0.6);
    g.fillRect(9.5, 19.5, 18, 2);
    g.fillStyle(0xA8B8C8, 1);
    g.fillRect(4.8, 14.8, 6.4, 14.4);
    g.fillRect(28.8, 14.8, 6.4, 14.4);
    g.fillStyle(0x8899AA, 0.7);
    g.fillRect(5.6, 16, 4.8, 2);
    g.fillRect(29.6, 16, 4.8, 2);
    g.lineStyle(2, 0x4a4a4a, 0.9);
    g.strokeRect(8, 18, 24, 8);
    g.strokeRect(4, 14, 8, 16);
    g.strokeRect(28, 14, 8, 16);
    g.fillStyle(0x00FF00, 0.35);
    g.fillCircle(8, 22, 4);
    g.fillStyle(0x00FF00, 1);
    g.fillCircle(8, 22, 2.4);
    g.fillStyle(0xAAFFAA, 0.9);
    g.fillCircle(7.4, 21.4, 0.9);
    g.fillStyle(0xFF0000, 0.35);
    g.fillCircle(32, 22, 4);
    g.fillStyle(0xFF0000, 1);
    g.fillCircle(32, 22, 2.4);
    g.fillStyle(0xFFAAAA, 0.9);
    g.fillCircle(31.4, 21.4, 0.9);
    g.fillStyle(0xD8D8D8, 1);
    g.fillCircle(20, 22, 2);
    g.fillStyle(0x8a8a8a, 1);
    g.fillCircle(20, 22, 0.9);
    g.generateTexture('satellite', 40, 44);

    // Canyon rock (canyon decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(20, 45, 32, 4);
    g.fillStyle(0x6a3a18, 1);
    g.fillEllipse(20, 24, 32, 28);
    g.fillStyle(0x8B4513, 1);
    g.fillEllipse(19.5, 23, 29, 25);
    g.fillStyle(0xA0522D, 0.8);
    g.fillEllipse(15, 17, 14, 10);
    g.fillStyle(0xBC7A4A, 0.6);
    g.fillEllipse(13, 15, 6, 4.5);
    g.fillStyle(0x5a2e12, 0.5);
    g.fillEllipse(26, 32, 10, 5);
    g.lineStyle(2, 0x4a2410, 0.9);
    g.strokeEllipse(20, 24, 32, 28);
    g.fillStyle(0xA0522D, 1);
    g.fillEllipse(16, 20, 8, 6);
    g.fillStyle(0xB87350, 0.8);
    g.fillEllipse(15.7, 19.7, 6, 4.5);
    g.fillStyle(0x8B4513, 1);
    g.fillEllipse(26, 28, 6, 4);
    g.fillStyle(0x6a3a18, 0.7);
    g.fillEllipse(26.3, 28.3, 4, 2.8);
    g.generateTexture('canyon-rock', 40, 48);

    // Formation (canyon decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(20, 45.5, 34, 4);
    g.fillStyle(0x8a5a28, 1);
    g.fillTriangle(20, 4, 4, 44, 36, 44);
    g.fillStyle(0xCD853F, 1);
    g.fillTriangle(20, 6, 20, 43.5, 34, 43.5);
    g.fillStyle(0x9a6a34, 0.5);
    g.fillTriangle(20, 10, 20, 40, 10, 40);
    g.fillStyle(0xDEB887, 1);
    g.fillRect(8, 24, 6, 16);
    g.fillRect(18, 16, 6, 24);
    g.fillStyle(0xE0C898, 0.6);
    g.fillRect(19, 17.5, 2, 22);
    g.fillRect(9, 25.5, 2, 13.5);
    g.lineStyle(2, 0x6a4416, 0.9);
    g.lineBetween(20, 4, 4, 44);
    g.lineBetween(20, 4, 36, 44);
    g.lineStyle(1, 0x8a6410, 0.5);
    g.lineBetween(9.5, 34, 12.5, 34);
    g.lineBetween(19.5, 26, 22.5, 26);
    g.generateTexture('formation', 40, 48);

    // Eagle (canyon decoration)
    g.clear();
    g.fillStyle(0x000000, 0.15);
    g.fillEllipse(24, 29.5, 34, 4);
    g.fillStyle(0x141414, 1);
    g.fillEllipse(24, 16, 32, 16);
    g.fillTriangle(4, 14, 0, 10, 4, 18);
    g.fillTriangle(44, 14, 48, 10, 44, 18);
    g.fillStyle(0x2F2F2F, 1);
    g.fillEllipse(24, 15.2, 29, 14);
    g.fillStyle(0x4a4a4a, 0.7);
    g.fillEllipse(20, 12, 12, 6);
    g.fillStyle(0x2F2F2F, 1);
    g.fillTriangle(5, 13.5, 1, 11, 4.5, 16.5);
    g.fillTriangle(43, 13.5, 47, 11, 43.5, 16.5);
    g.lineStyle(2, 0x0a0a0a, 0.9);
    g.strokeEllipse(24, 16, 32, 16);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(32, 14, 4);
    g.fillStyle(0xFFE880, 0.7);
    g.fillCircle(31, 13, 2.2);
    g.lineStyle(2, 0x0a0a0a, 0.9);
    g.strokeCircle(32, 14, 4);
    g.fillStyle(0x000000, 1);
    g.fillCircle(33.5, 13.3, 1.4);
    g.fillStyle(0xffffff, 0.9);
    g.fillCircle(33.2, 12.9, 0.55);
    g.lineStyle(1.5, 0xFFA500, 0.9);
    g.lineBetween(35.5, 14.5, 38.5, 15.5);
    g.generateTexture('eagle', 48, 32);

    // Banner (castle decoration)
    g.clear();
    g.fillStyle(0x4a0808, 1);
    g.beginPath();
    g.moveTo(7, 3); g.lineTo(29, 3); g.lineTo(29, 34); g.lineTo(18, 41); g.lineTo(7, 34);
    g.closePath();
    g.fillPath();
    g.fillStyle(0x8B0000, 1);
    g.beginPath();
    g.moveTo(9, 5); g.lineTo(27, 5); g.lineTo(27, 33); g.lineTo(18, 39); g.lineTo(9, 33);
    g.closePath();
    g.fillPath();
    g.fillStyle(0xa81c1c, 0.6);
    g.fillRect(10, 6, 8, 26);
    g.fillStyle(0xffd700, 1);
    g.fillCircle(18, 20, 6.5);
    g.fillStyle(0xfff0a0, 0.7);
    g.fillCircle(16, 18, 2.4);
    g.fillStyle(0xc89800, 0.6);
    g.fillEllipse(18, 23, 9, 3);
    g.fillStyle(0x5a0808, 1);
    g.fillRect(5, 36, 26, 3.5);
    g.fillStyle(0x8a5410, 0.7);
    g.fillRect(6, 36.8, 24, 1.4);
    g.lineStyle(2, 0x3a0404, 1);
    g.beginPath();
    g.moveTo(7, 3); g.lineTo(29, 3); g.lineTo(29, 34); g.lineTo(18, 41); g.lineTo(7, 34);
    g.closePath();
    g.strokePath();
    g.generateTexture('banner', 36, 44);

    // Boss flag (castle decoration)
    g.clear();
    g.fillStyle(0x000000, 0.25);
    g.fillEllipse(8, 55, 12, 3);
    g.fillStyle(0x3a1c08, 1);
    g.fillRect(6, 4, 4, 52);
    g.fillStyle(0x8B4513, 1);
    g.fillRect(6.8, 4, 2.4, 52);
    g.fillStyle(0x5a2c10, 0.6);
    g.fillRect(6.8, 4, 0.8, 52);
    g.fillStyle(0xD8A800, 1);
    g.fillCircle(8, 4, 3);
    g.fillStyle(0xFFE870, 0.8);
    g.fillCircle(7, 3, 1.4);
    g.fillStyle(0x4a0808, 1);
    g.fillRect(10, 8, 28, 20);
    g.fillStyle(0x8B0000, 1);
    g.fillRect(11, 9, 26, 18);
    g.fillStyle(0xB01A1A, 0.5);
    g.fillRect(12, 10, 10, 16);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(24, 18, 6);
    g.fillStyle(0xFFE880, 0.75);
    g.fillCircle(22, 16, 3);
    g.fillStyle(0xB89000, 0.7);
    g.fillEllipse(25, 20.5, 8, 2.5);
    g.lineStyle(2, 0x3a0404, 0.9);
    g.strokeRect(10, 8, 28, 20);
    g.strokeCircle(24, 18, 6);
    g.fillStyle(0xB89000, 1);
    g.fillRect(10, 28, 28, 4);
    g.fillRect(10, 32, 28, 4);
    g.fillStyle(0xFFE870, 0.6);
    g.fillRect(10, 28.6, 28, 1.2);
    g.fillRect(10, 32.6, 28, 1.2);
    g.fillStyle(0x6a5210, 0.6);
    g.fillRect(10, 30.8, 28, 1);
    g.fillRect(10, 34.8, 28, 1);
    g.generateTexture('boss-flag', 40, 56);

    // Cactus (desert decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(16, 48, 24, 4);
    g.fillStyle(0x3a5a2a, 1);
    g.fillRoundedRect(11, 18, 10, 31, 4);
    g.fillRoundedRect(3, 26, 7, 18, 3);
    g.fillRoundedRect(21, 22, 7, 22, 3);
    g.fillStyle(0x4f9a44, 1);
    g.fillRoundedRect(12, 18, 8, 31, 4);
    g.fillRoundedRect(4, 27, 5, 17, 2.5);
    g.fillRoundedRect(22, 23, 5, 21, 2.5);
    g.fillStyle(0x8ed874, 0.85);
    g.fillRoundedRect(13, 20, 3, 26, 1.5);
    g.fillRoundedRect(23, 25, 2, 16, 1);
    g.fillRoundedRect(5, 29, 2, 12, 1);
    g.lineStyle(1, 0x3a6e30, 0.7);
    g.lineBetween(15, 22, 15, 44); g.lineBetween(24, 26, 24, 40);
    g.lineBetween(6.5, 30, 6.5, 42);
    g.fillStyle(0xffb8d8, 0.95);
    g.fillCircle(16, 17, 3.8);
    g.fillStyle(0xfff0a0, 0.9);
    g.fillCircle(16, 17, 1.4);
    this.strokeOutline(g, 12, 18, 8, 31, 0x3a5a2a);
    g.generateTexture('cactus', 32, 50);

    // Rock (desert decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(16, 38.5, 26, 4);
    g.fillStyle(0x6B5232, 1);
    g.fillEllipse(16, 20, 28, 22);
    g.fillStyle(0x8B7355, 1);
    g.fillEllipse(15.5, 19, 25, 20);
    g.fillStyle(0xA0815F, 0.7);
    g.fillEllipse(12, 15, 12, 8);
    g.fillStyle(0xB89468, 0.5);
    g.fillEllipse(11, 14, 5, 3.5);
    g.fillStyle(0x5a4328, 0.5);
    g.fillEllipse(21, 26, 9, 5);
    g.lineStyle(2, 0x4a3a22, 0.9);
    g.strokeEllipse(16, 20, 28, 22);
    g.fillStyle(0x8B7355, 1);
    g.fillEllipse(12, 16, 8, 6);
    g.fillStyle(0x9a7d58, 0.8);
    g.fillEllipse(11.7, 15.7, 6, 4.5);
    g.fillStyle(0xA0522D, 1);
    g.fillEllipse(22, 22, 5, 4);
    g.fillStyle(0x8a4520, 0.8);
    g.fillEllipse(22.3, 22.3, 3.5, 2.8);
    g.generateTexture('rock', 32, 40);

    // Skull (desert decoration)
    g.clear();
    g.fillStyle(0x000000, 0.25);
    g.fillEllipse(16, 34, 22, 3.5);
    g.fillStyle(0xC8BC96, 1);
    g.fillCircle(16, 16, 12.5);
    g.fillStyle(0xF5F5DC, 1);
    g.fillCircle(15.5, 15.5, 11);
    g.fillStyle(0xFFFCF0, 0.7);
    g.fillCircle(12, 12, 5);
    g.fillStyle(0xC8BC96, 0.55);
    g.fillEllipse(19, 20, 9, 6);
    g.lineStyle(2, 0x8a8060, 0.9);
    g.strokeCircle(16, 16, 12);
    g.fillStyle(0x2a2620, 1);
    g.fillEllipse(12, 14, 9, 8);
    g.fillEllipse(20, 14, 9, 8);
    g.fillStyle(0x363636, 1);
    g.fillCircle(12, 14, 4);
    g.fillCircle(20, 14, 4);
    g.fillStyle(0x5a5a5a, 0.8);
    g.fillCircle(11.2, 13.2, 1.5);
    g.fillCircle(19.2, 13.2, 1.5);
    g.fillStyle(0x2a2620, 1);
    g.fillTriangle(14, 20, 18, 20, 16, 23.5);
    g.fillStyle(0xF5F5DC, 1);
    g.fillEllipse(16, 30, 8, 6);
    g.fillStyle(0xE8E0C0, 0.9);
    g.fillEllipse(15.7, 29.5, 6.5, 5);
    g.lineStyle(1.5, 0x8a8060, 0.7);
    g.strokeEllipse(16, 30, 8, 6);
    g.fillStyle(0x2a2620, 0.8);
    g.fillRect(12.5, 27.5, 1.2, 2.5);
    g.fillRect(15.4, 27, 1.2, 3);
    g.fillRect(18.3, 27.5, 1.2, 2.5);
    g.generateTexture('skull', 32, 36);

    // Pyramid (desert decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(20, 45.5, 36, 4);
    g.fillStyle(0xB8860B, 1);
    g.fillTriangle(20, 4, 4, 44, 36, 44);
    g.fillStyle(0xDAA520, 1);
    g.fillTriangle(20, 6, 20, 44, 34, 44);
    g.fillStyle(0x8a6410, 0.55);
    g.fillTriangle(20, 8, 20, 40, 9, 40);
    g.fillStyle(0xF4C060, 0.6);
    g.fillTriangle(20, 8, 20, 40, 31, 40);
    g.lineStyle(2, 0x6a4a08, 0.9);
    g.lineBetween(20, 4, 4, 44);
    g.lineBetween(20, 4, 36, 44);
    g.lineStyle(1, 0x8a6410, 0.45);
    g.lineBetween(12, 30, 26.5, 30);
    g.lineBetween(15, 20, 23.5, 20);
    g.generateTexture('pyramid', 40, 48);

    // Bubble (water decoration)
    g.clear();
    g.fillStyle(0x87CEEB, 0.35);
    g.fillCircle(12, 12, 10.5);
    g.fillStyle(0x9ADAF0, 0.5);
    g.fillCircle(12, 12, 9);
    g.fillStyle(0xBDE8F8, 0.3);
    g.fillCircle(10.5, 10.5, 6);
    g.lineStyle(1.5, 0xd8f4fc, 0.85);
    g.strokeCircle(12, 12, 9.5);
    g.fillStyle(0xffffff, 0.7);
    g.fillCircle(8.5, 8.5, 2);
    g.fillStyle(0xffffff, 0.4);
    g.fillCircle(15.5, 15, 1.2);
    g.generateTexture('bubble', 24, 24);

    // Seaweed (water decoration)
    g.clear();
    g.fillStyle(0x0a3a0a, 1);
    g.fillRoundedRect(14, 6, 6, 30, 3);
    g.fillEllipse(8, 12, 10, 18);
    g.fillEllipse(25, 16, 10, 16);
    g.fillStyle(0x228B22, 1);
    g.fillRoundedRect(14.5, 7, 4.5, 29, 2.5);
    g.fillEllipse(8, 12, 8, 15);
    g.fillEllipse(24.5, 16, 8, 13);
    g.fillStyle(0x32CD32, 0.75);
    g.fillEllipse(8, 10, 5, 11);
    g.fillEllipse(25, 14, 5, 9);
    g.fillRoundedRect(15, 8, 2, 26, 1);
    g.fillStyle(0x54e054, 0.5);
    g.fillEllipse(6.5, 7, 2.5, 5);
    g.fillStyle(0x0a3a0a, 0.6);
    g.fillCircle(10, 19, 1); g.fillCircle(17, 24, 1.2);
    g.generateTexture('seaweed', 32, 36);

    // Cobweb (haunted decoration)
    g.clear();
    g.lineStyle(1.8, 0xA8A8B8, 0.6);
    g.lineBetween(16, 4, 4, 28);
    g.lineBetween(16, 4, 28, 28);
    g.lineBetween(16, 4, 16, 32);
    g.lineBetween(4, 28, 28, 28);
    g.lineBetween(8, 16, 24, 16);
    g.lineBetween(8, 16, 24, 24);
    g.lineStyle(1, 0xD3D3D3, 0.9);
    g.lineBetween(16, 4, 4, 28);
    g.lineBetween(16, 4, 28, 28);
    g.lineBetween(16, 4, 16, 32);
    g.lineBetween(4, 28, 28, 28);
    g.lineBetween(8, 16, 24, 16);
    g.lineBetween(8, 16, 24, 24);
    g.fillStyle(0xffffff, 0.5);
    g.fillCircle(8, 16, 1);
    g.fillCircle(24, 24, 1);
    g.generateTexture('cobweb', 32, 32);

    // Conveyor (factory decoration)
    g.clear();
    g.fillStyle(0x2a2a2a, 1);
    g.fillRect(0, 8, 40, 8);
    g.fillStyle(0x505050, 1);
    g.fillRect(0, 8.6, 40, 6);
    g.fillStyle(0x5e5e5e, 0.7);
    g.fillRect(0, 9.2, 40, 1.2);
    g.lineStyle(2, 0x1a1a1a, 1);
    g.strokeRect(0, 8, 40, 8);
    g.fillStyle(0x2c2c2c, 1);
    g.fillRoundedRect(4, 10, 6, 4, 1.5);
    g.fillRoundedRect(14, 10, 6, 4, 1.5);
    g.fillRoundedRect(24, 10, 6, 4, 1.5);
    g.fillRoundedRect(34, 10, 6, 4, 1.5);
    g.fillStyle(0x4a4a4a, 0.9);
    g.fillRect(4.8, 10.7, 4.4, 1.2);
    g.fillRect(14.8, 10.7, 4.4, 1.2);
    g.fillRect(24.8, 10.7, 4.4, 1.2);
    g.fillRect(34.8, 10.7, 4.4, 1.2);
    g.generateTexture('conveyor', 40, 24);

    // Coral (water decoration)
    g.clear();
    g.fillStyle(0x8a2c10, 1);
    g.fillTriangle(16, 3, 7, 29, 25, 29);
    g.fillTriangle(10, 15, 5, 29, 15, 29);
    g.fillTriangle(22, 11, 17, 29, 27, 29);
    g.fillStyle(0xFF7F50, 1);
    g.fillTriangle(16, 5, 9, 28, 23, 28);
    g.fillTriangle(10, 17, 6, 28, 14, 28);
    g.fillTriangle(22, 13, 18, 28, 26, 28);
    g.fillStyle(0xffa07a, 0.8);
    g.fillTriangle(15, 8, 12, 24, 18, 24);
    g.fillStyle(0xffd0a8, 0.6);
    g.fillCircle(14, 12, 2);
    g.fillStyle(0xffffff, 0.5);
    g.fillCircle(12, 8, 1.4);
    g.generateTexture('coral', 32, 32);

    // Crane (factory decoration)
    g.clear();
    g.fillStyle(0x708090, 1);
    g.fillRect(8, 4, 4, 40);
    g.fillRect(4, 8, 24, 4);
    g.fillStyle(0xFF4500, 1);
    g.fillRect(4, 8, 4, 4);
    g.fillStyle(0x303030, 1);
    g.fillRect(26, 8, 8, 4);
    g.lineStyle(2, 0x404040, 1);
    g.lineBetween(30, 10, 30, 28);
    g.lineBetween(28, 28, 32, 28);
    g.generateTexture('crane', 40, 48);

    // Ember (volcano decoration)
    g.clear();
    g.fillStyle(0xFF4500, 0.35);
    g.fillCircle(8, 12, 7.5);
    g.fillStyle(0xFF4500, 1);
    g.fillCircle(8, 12, 6);
    g.fillStyle(0xFF6A1A, 1);
    g.fillCircle(7.6, 11.6, 5);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(8, 10, 3);
    g.fillStyle(0xFFEC70, 0.9);
    g.fillCircle(7.4, 9.4, 1.8);
    g.fillStyle(0xFF6347, 0.7);
    g.fillCircle(6, 14, 2);
    g.fillCircle(10, 14, 2);
    g.fillStyle(0xFFEC70, 0.4);
    g.fillCircle(5.7, 13.6, 1);
    g.fillCircle(9.7, 13.6, 1);
    g.fillStyle(0xFF4500, 0.5);
    g.fillCircle(12, 6, 1.2);
    g.fillCircle(4, 7, 1);
    g.generateTexture('ember', 16, 20);

    // Fire (volcano decoration)
    g.clear();
    g.fillStyle(0xB22222, 0.6);
    g.fillTriangle(12, 2, 3, 28, 21, 28);
    g.fillStyle(0xFF4500, 1);
    g.fillTriangle(12, 4, 4, 28, 20, 28);
    g.fillStyle(0xFF6A1A, 1);
    g.fillTriangle(12, 7, 5.5, 28, 18.5, 28);
    g.fillStyle(0xFFD700, 1);
    g.fillTriangle(12, 12, 8, 24, 16, 24);
    g.fillStyle(0xFFE870, 0.9);
    g.fillTriangle(12, 15, 9.2, 23, 14.8, 23);
    g.fillStyle(0xFFFF88, 0.85);
    g.fillTriangle(12, 18, 10, 22, 14, 22);
    g.lineStyle(1.5, 0xB22222, 0.5);
    g.lineBetween(12, 4, 4, 28);
    g.lineBetween(12, 4, 20, 28);
    g.generateTexture('fire', 24, 32);

    // Gear (factory decoration)
    g.clear();
    g.fillStyle(0x3a4046, 1);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      g.fillRect(14 + Math.cos(angle) * 10, 14 + Math.sin(angle) * 10, 4, 8);
    }
    g.fillStyle(0x4a5058, 1);
    g.fillCircle(16, 16, 11);
    g.fillStyle(0x708090, 1);
    g.fillCircle(16, 16, 10);
    g.fillStyle(0x94a2ac, 0.9);
    g.fillCircle(13, 13, 6);
    g.fillStyle(0xb8c4cc, 0.5);
    g.fillCircle(12, 12, 3);
    g.fillStyle(0x505050, 1);
    g.fillCircle(16, 16, 4.5);
    g.fillStyle(0x2c3034, 1);
    g.fillCircle(16, 16, 3);
    g.fillStyle(0x8892a0, 0.8);
    g.fillCircle(14.6, 14.6, 1.2);
    g.lineStyle(1.5, 0x2c3034, 0.7);
    g.strokeCircle(16, 16, 8.5);
    g.generateTexture('gear', 32, 32);

    // Lava rock (volcano decoration)
    g.clear();
    g.fillStyle(0x000000, 0.25);
    g.fillEllipse(16, 37.5, 24, 4);
    g.fillStyle(0x5a0808, 1);
    g.fillEllipse(16, 20, 24, 20);
    g.fillStyle(0x8B0000, 1);
    g.fillEllipse(15.5, 19.5, 21.5, 17.5);
    g.fillStyle(0xA81818, 0.7);
    g.fillEllipse(12, 15, 11, 8);
    g.fillStyle(0xFF4500, 1);
    g.fillEllipse(12, 16, 8, 6);
    g.fillStyle(0xFF7A20, 0.9);
    g.fillEllipse(11.5, 15.5, 5.5, 4);
    g.fillStyle(0xFFD700, 0.7);
    g.fillCircle(10.5, 14.5, 1.5);
    g.fillStyle(0xFF4500, 1);
    g.fillEllipse(20, 22, 5, 4);
    g.fillStyle(0xFF9A40, 0.8);
    g.fillEllipse(20.3, 21.7, 3, 2.4);
    g.lineStyle(2, 0x3a0404, 0.9);
    g.strokeEllipse(16, 20, 24, 20);
    g.fillStyle(0x3a0404, 0.6);
    g.fillCircle(22, 14, 1.5);
    g.fillCircle(9, 24, 1.2);
    g.generateTexture('lava-rock', 32, 40);

    // Palm (beach decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(16, 50, 20, 4);
    g.fillStyle(0x5a3210, 1);
    g.fillRoundedRect(13, 22, 7, 30, 3);
    g.fillStyle(0x8B4513, 1);
    g.fillRoundedRect(14, 22, 5, 30, 2.5);
    g.fillStyle(0xa05c28, 0.6);
    g.fillRect(15, 24, 1.5, 26);
    g.fillStyle(0x4a2408, 0.7);
    g.fillCircle(16, 30, 1.2); g.fillCircle(15, 40, 1.1);
    g.fillStyle(0x2c6a20, 1);
    g.fillEllipse(8, 16, 14, 22);
    g.fillEllipse(22, 14, 12, 18);
    g.fillEllipse(16, 9, 10, 14);
    g.fillStyle(0x3f9434, 1);
    g.fillEllipse(8, 15, 11, 18);
    g.fillEllipse(22, 13, 9, 15);
    g.fillEllipse(16, 8, 8, 11);
    g.fillStyle(0x74d864, 0.85);
    g.fillEllipse(6, 12, 6, 8);
    g.fillEllipse(22, 10, 5, 6);
    g.fillEllipse(15, 6, 4, 5);
    g.fillStyle(0xffb85c, 0.9);
    g.fillCircle(13, 22, 2.4); g.fillCircle(19, 21, 2);
    g.fillStyle(0xffdca0, 0.7);
    g.fillCircle(12.5, 21.4, 1);
    g.generateTexture('palm', 32, 52);

    // Seagull (beach decoration)
    g.clear();
    g.fillStyle(0x101010, 0.9);
    g.fillEllipse(16, 16, 20, 9);
    g.fillTriangle(4, 14, 0, 12, 4, 18);
    g.fillTriangle(28, 14, 32, 12, 28, 18);
    g.fillStyle(0xF5F5F5, 1);
    g.fillEllipse(16, 15.2, 18, 7.5);
    g.fillStyle(0xE0E0E0, 0.6);
    g.fillEllipse(13, 13, 8, 3);
    g.fillStyle(0xD8D8D8, 1);
    g.fillTriangle(5, 13.5, 1.5, 12, 4, 16.5);
    g.fillTriangle(27.5, 13.5, 30.5, 12, 28, 16.5);
    g.fillStyle(0x8a8a8a, 0.6);
    g.fillTriangle(6, 13, 3.5, 11.8, 5, 15);
    g.lineStyle(2, 0x9a9a9a, 0.85);
    g.strokeEllipse(16, 16, 20, 9);
    g.fillStyle(0x2F2F2F, 1);
    g.fillCircle(22, 15, 2.2);
    g.fillStyle(0xFFA500, 0.9);
    g.fillTriangle(23.5, 15, 27, 16, 23.5, 17);
    g.fillStyle(0x000000, 1);
    g.fillCircle(22.4, 14.4, 0.7);
    g.generateTexture('seagull', 32, 32);

    // Shell (beach decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(16, 33, 22, 4);
    g.fillStyle(0xD8B888, 1);
    g.fillEllipse(16, 18, 20, 16);
    g.fillStyle(0xFFE4C4, 1);
    g.fillEllipse(15.5, 17.5, 18, 14.5);
    g.fillStyle(0xFFF2DC, 0.7);
    g.fillEllipse(12, 13.5, 10, 6);
    g.fillStyle(0xDEB887, 1);
    g.fillTriangle(16, 4, 8, 26, 24, 26);
    g.fillStyle(0xF0D0A8, 1);
    g.fillTriangle(16, 5.5, 10, 25, 22, 25);
    g.fillStyle(0xC8A878, 0.5);
    g.fillTriangle(16, 6, 11, 24.5, 14, 24.5);
    g.fillTriangle(16, 6, 18, 24.5, 21, 24.5);
    g.lineStyle(2, 0x9a7a50, 0.9);
    g.strokeEllipse(16, 18, 20, 16);
    g.generateTexture('shell', 32, 36);

    // Smoke (factory decoration)
    g.clear();
    g.fillStyle(0x606060, 0.35);
    g.fillCircle(8, 21, 8.5);
    g.fillCircle(16, 17, 10.5);
    g.fillCircle(24, 13, 8.5);
    g.fillCircle(12, 9, 6.5);
    g.fillStyle(0x808080, 0.6);
    g.fillCircle(8, 20, 8);
    g.fillCircle(16, 16, 10);
    g.fillCircle(24, 12, 8);
    g.fillCircle(12, 8, 6);
    g.fillStyle(0xA9A9A9, 0.45);
    g.fillCircle(15, 13, 6.5);
    g.fillCircle(22, 10, 5);
    g.fillStyle(0xC8C8C8, 0.35);
    g.fillCircle(20, 6, 5);
    g.fillStyle(0xE0E0E0, 0.3);
    g.fillCircle(21, 5.5, 3);
    g.generateTexture('smoke', 32, 32);

    // Tombstone (haunted decoration)
    g.clear();
    g.fillStyle(0x000000, 0.3);
    g.fillEllipse(16, 42.5, 26, 4);
    g.fillStyle(0x4a4a4a, 1);
    g.fillRoundedRect(8, 6, 16, 36, { tl: 7, tr: 7, bl: 1, br: 1 });
    g.fillRect(4, 12, 24, 8);
    g.fillStyle(0x696969, 1);
    g.fillRoundedRect(9, 6.8, 14, 34.4, { tl: 6.5, tr: 6.5, bl: 1, br: 1 });
    g.fillRect(4.8, 12.8, 22.4, 6.4);
    g.fillStyle(0x7d7d7d, 0.8);
    g.fillRoundedRect(11, 7.5, 8, 11, 5);
    g.fillStyle(0x808080, 1);
    g.fillRoundedRect(10, 8, 12, 8, { tl: 6, tr: 6, bl: 0, br: 0 });
    g.fillStyle(0x8f8f8f, 0.6);
    g.fillRoundedRect(11, 8.6, 8, 4.5, 4);
    g.fillStyle(0xD3D3D3, 1);
    g.fillRect(10, 20, 10, 2);
    g.fillRect(10, 26, 8, 2);
    g.fillRect(10, 32, 6, 2);
    g.fillStyle(0x9a9a9a, 0.5);
    g.fillRect(10, 21.4, 10, 0.7);
    g.lineStyle(2, 0x3a3a3a, 0.9);
    g.strokeRoundedRect(8, 6, 16, 36, { tl: 7, tr: 7, bl: 1, br: 1 });
    g.strokeRect(4, 12, 24, 8);
    g.fillStyle(0x3d5a2a, 0.5);
    g.fillEllipse(9, 40.5, 7, 3);
    g.fillEllipse(23, 41, 6, 2.5);
    g.generateTexture('tombstone', 32, 44);

    // Web (haunted decoration)
    g.clear();
    g.lineStyle(1.8, 0xA8A8B8, 0.6);
    g.lineBetween(16, 0, 16, 32);
    g.lineBetween(0, 16, 32, 16);
    g.lineBetween(4, 4, 28, 28);
    g.lineBetween(28, 4, 4, 28);
    g.lineBetween(16, 0, 0, 16);
    g.lineBetween(16, 0, 32, 16);
    g.lineBetween(16, 32, 0, 16);
    g.lineBetween(16, 32, 32, 16);
    g.lineStyle(1, 0xD3D3D3, 0.9);
    g.lineBetween(16, 0, 16, 32);
    g.lineBetween(0, 16, 32, 16);
    g.lineBetween(4, 4, 28, 28);
    g.lineBetween(28, 4, 4, 28);
    g.lineBetween(16, 0, 0, 16);
    g.lineBetween(16, 0, 32, 16);
    g.lineBetween(16, 32, 0, 16);
    g.lineBetween(16, 32, 32, 16);
    g.fillStyle(0xffffff, 0.5);
    g.fillCircle(16, 16, 1.2);
    g.generateTexture('web', 32, 32);

    // Log (forest decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(16, 30, 28, 4);
    g.fillStyle(0x5D4037, 1);
    g.fillEllipse(16, 20, 28, 14);
    g.fillStyle(0x8B4513, 1);
    g.fillEllipse(16, 19.5, 26, 12.5);
    g.fillStyle(0xA05C34, 0.6);
    g.fillEllipse(13, 17.5, 12, 7);
    g.fillStyle(0x6B3E0F, 1);
    g.fillEllipse(16, 20, 20, 10);
    g.fillStyle(0x8a5c34, 1);
    g.fillEllipse(16, 19.6, 18, 9);
    g.fillStyle(0xC89868, 0.55);
    g.fillEllipse(14, 18.5, 8, 4.5);
    g.fillStyle(0xffffff, 0.25);
    g.fillEllipse(13, 18, 12, 6);
    g.fillStyle(0xffffff, 0.5);
    g.fillEllipse(12, 17.6, 3.5, 1.8);
    g.lineStyle(2, 0x3a2010, 0.9);
    g.strokeEllipse(16, 20, 28, 14);
    g.fillStyle(0x5D4037, 0.8);
    g.fillCircle(8, 18, 3);
    g.fillCircle(20, 22, 2);
    g.fillStyle(0x7a5a3a, 0.6);
    g.fillCircle(7.6, 17.6, 2);
    g.generateTexture('log', 32, 32);

    // Vine (forest decoration)
    g.clear();
    g.fillStyle(0x1a6a1a, 1);
    g.fillRect(14, 0, 4, 40);
    g.fillStyle(0x228B22, 1);
    g.fillRect(14.8, 0, 2.4, 40);
    g.fillStyle(0x3aa03a, 0.6);
    g.fillRect(15.2, 0, 1, 40);
    const vineLeaf = (ly: number) => {
      g.fillStyle(0x2c7a28, 1);
      g.fillEllipse(14, ly, 10, 14);
      g.fillStyle(0x3ce03a, 1);
      g.fillEllipse(13.2, ly - 0.5, 8.5, 12);
      g.fillStyle(0x8cf06c, 0.7);
      g.fillEllipse(11.5, ly - 3, 4, 6);
      g.fillStyle(0xd8f8c4, 0.3);
      g.fillEllipse(12.4, ly - 1.5, 6, 9);
      g.fillStyle(0xf0fcE0, 0.55);
      g.fillEllipse(11.8, ly - 3, 2.5, 4);
      g.lineStyle(1, 0x2c6a28, 0.5);
      g.lineBetween(14, ly - 6, 14, ly + 6);
    };
    vineLeaf(8);
    vineLeaf(20);
    vineLeaf(32);
    g.generateTexture('vine', 32, 44);

    // Pillar (ruins decoration)
    g.clear();
    g.fillStyle(0x000000, 0.2);
    g.fillEllipse(16, 43, 26, 3);
    g.fillStyle(0x6B5344, 1);
    g.fillRect(8, 0, 16, 44);
    g.fillStyle(0x8B7355, 1);
    g.fillRect(9, 0, 14, 44);
    g.fillStyle(0xA0815F, 0.75);
    g.fillRect(10.5, 0, 4, 44);
    g.fillStyle(0x6B5344, 0.6);
    g.fillRect(20.5, 0, 2, 44);
    g.fillStyle(0xA0522D, 1);
    g.fillRect(4, 0, 24, 8);
    g.fillStyle(0xB87350, 1);
    g.fillRect(4.8, 0.8, 22.4, 6.4);
    g.fillStyle(0xC89070, 0.6);
    g.fillRect(5.5, 1.5, 20, 2.5);
    g.fillStyle(0xA0522D, 1);
    g.fillRect(4, 36, 24, 8);
    g.fillStyle(0xB87350, 1);
    g.fillRect(4.8, 36.5, 22.4, 7);
    g.fillStyle(0x7a4a28, 0.7);
    g.fillRect(4.8, 41.5, 22.4, 2);
    g.lineStyle(2, 0x4a3220, 0.9);
    g.strokeRect(4, 0, 24, 8);
    g.strokeRect(4, 36, 24, 8);
    g.strokeRect(8, 0, 16, 44);
    g.fillStyle(0x8a7048, 0.35);
    g.fillCircle(12, 20, 1.4);
    g.fillCircle(19, 30, 1.2);
    g.generateTexture('pillar', 32, 44);

    // Statue (ruins decoration)
    g.clear();
    g.fillStyle(0x000000, 0.25);
    g.fillEllipse(16, 43, 26, 3.5);
    g.fillStyle(0x5a5a5a, 1);
    g.fillRect(8, 32, 16, 8);
    g.fillStyle(0x6e6e6e, 1);
    g.fillRect(8.8, 32.8, 14.4, 6.8);
    g.fillStyle(0x696969, 1);
    g.fillRect(10, 8, 12, 24);
    g.fillStyle(0x7d7d7d, 1);
    g.fillRect(11, 8, 10, 24);
    g.fillStyle(0x8f8f8f, 0.8);
    g.fillRect(12, 9, 4, 22);
    g.fillStyle(0x555555, 0.7);
    g.fillRect(19, 9, 2, 22);
    g.fillStyle(0x808080, 1);
    g.fillCircle(16, 8, 8);
    g.fillStyle(0x8f8f8f, 1);
    g.fillCircle(15.3, 7.3, 6.8);
    g.fillStyle(0xA9A9A9, 1);
    g.fillRect(12, 4, 8, 4);
    g.fillStyle(0xBDBDBD, 0.7);
    g.fillRect(12.8, 4.5, 6, 2.5);
    g.fillStyle(0x000000, 0.5);
    g.fillCircle(14, 6.5, 1.8);
    g.fillCircle(18, 6.5, 1.8);
    g.fillStyle(0x4a4a4a, 0.5);
    g.fillRect(13, 14, 2, 6);
    g.fillRect(17, 22, 2, 5);
    g.lineStyle(2, 0x3a3a3a, 0.9);
    g.strokeRect(10, 8, 12, 24);
    g.strokeRect(8, 32, 16, 8);
    g.strokeCircle(16, 8, 8);
    g.generateTexture('statue', 32, 44);

    // Moss (ruins decoration)
    g.clear();
    g.fillStyle(0x1a5a1a, 0.9);
    g.fillEllipse(16, 20.5, 25, 17);
    g.fillStyle(0x228B22, 0.95);
    g.fillEllipse(15.5, 19.5, 23, 15);
    g.fillStyle(0x32CD32, 0.6);
    g.fillEllipse(10, 16, 8, 8);
    g.fillEllipse(22, 18, 10, 6);
    g.fillStyle(0x54e054, 0.35);
    g.fillEllipse(9, 15, 4, 4);
    g.fillStyle(0x1a5a1a, 0.5);
    g.fillEllipse(14, 24, 6, 4);
    g.fillStyle(0xB8E8C8, 0.4);
    g.fillCircle(19, 14, 1.2);
    g.fillCircle(8, 21, 1);
    g.generateTexture('moss', 32, 32);

    // Snowflake (ice-snow decoration)
    g.clear();
    g.lineStyle(2.4, 0x9AC8E0, 0.5);
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI;
      const len = 3 + (i % 3) * 2;
      g.lineBetween(16, 16, 16 + Math.cos(angle) * len * 2, 16 + Math.sin(angle) * len * 2);
    }
    g.lineStyle(1.6, 0xE0FFFF, 1);
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI;
      const len = 3 + (i % 3) * 2;
      g.lineBetween(16, 16, 16 + Math.cos(angle) * len * 2, 16 + Math.sin(angle) * len * 2);
    }
    g.fillStyle(0xFFFFFF, 0.9);
    g.fillCircle(16, 16, 3);
    g.fillStyle(0xB8E8F8, 0.8);
    g.fillCircle(16, 16, 1.8);
    g.generateTexture('snowflake', 32, 32);

    // Icicle (ice-snow decoration)
    g.clear();
    g.fillStyle(0x6a9cb8, 0.9);
    g.fillTriangle(16, 0, 5, 25, 27, 25);
    g.fillStyle(0xB0E0E6, 1);
    g.fillTriangle(16, 0, 7, 24, 25, 24);
    g.fillStyle(0xd8f2fa, 1);
    g.fillTriangle(16, 3, 10, 22, 22, 22);
    g.fillStyle(0xffffff, 0.55);
    g.fillTriangle(15, 4, 12, 18, 18, 18);
    g.fillCircle(15, 8, 2.6);
    g.lineStyle(1, 0xffffff, 0.8);
    g.lineBetween(13, 4, 11, 16);
    g.fillStyle(0x8ac0d8, 0.7);
    g.fillTriangle(18, 6, 20, 20, 24, 22);
    g.generateTexture('icicle', 32, 28);

    // Iceberg (ice-snow decoration)
    g.clear();
    g.fillStyle(0x8AB8D0, 0.5);
    g.fillEllipse(20, 30, 36, 24);
    g.fillStyle(0xE0FFFF, 0.85);
    g.fillEllipse(20, 29.5, 33, 21);
    g.fillStyle(0xFFFFFF, 0.6);
    g.fillTriangle(12, 14, 20, 4, 28, 14);
    g.fillStyle(0xB8E8F8, 0.55);
    g.fillTriangle(12, 14, 20, 4, 20, 14);
    g.fillStyle(0xF0F8FF, 1);
    g.fillCircle(20, 10, 5);
    g.fillStyle(0xffffff, 0.7);
    g.fillCircle(18.5, 8.5, 2.2);
    g.generateTexture('iceberg', 40, 40);

    // Penguin (ice-snow decoration)
    g.clear();
    g.fillStyle(0x000000, 0.25);
    g.fillEllipse(16, 34, 22, 3.5);
    g.fillStyle(0x1a1a2e, 1);
    g.fillEllipse(16, 20, 20, 24);
    g.fillStyle(0x2a2a44, 1);
    g.fillEllipse(15.3, 19.3, 18, 22);
    g.fillStyle(0x1a1a2e, 0.6);
    g.fillEllipse(19.5, 24, 6, 10);
    g.fillStyle(0xFFFFFF, 1);
    g.fillEllipse(16, 16, 14, 16);
    g.fillStyle(0xF0F0F8, 0.7);
    g.fillEllipse(15.3, 15.3, 11.5, 13.5);
    g.fillStyle(0x000000, 1);
    g.fillCircle(13, 10, 2);
    g.fillCircle(19, 10, 2);
    g.fillStyle(0xffffff, 0.9);
    g.fillCircle(12.5, 9.5, 0.7);
    g.fillCircle(18.5, 9.5, 0.7);
    g.fillStyle(0xFFA500, 1);
    g.fillTriangle(14, 14, 18, 14, 16, 16.5);
    g.fillStyle(0xFFC040, 0.7);
    g.fillTriangle(14.7, 14.3, 17.3, 14.3, 16, 15.5);
    g.fillStyle(0x1a1a2e, 1);
    g.fillEllipse(8, 28, 6, 4);
    g.fillEllipse(24, 28, 6, 4);
    g.fillStyle(0xFFA500, 0.85);
    g.fillEllipse(8, 27.7, 5, 3);
    g.fillEllipse(24, 27.7, 5, 3);
    g.lineStyle(2, 0x10101e, 0.85);
    g.strokeEllipse(16, 20, 20, 24);
    g.generateTexture('penguin', 32, 36);

    g.destroy();
  }

  private createBackgroundTextures() {
    createStorybookScenery(this);
  }

  private createItemTextures() {
    createPixelItems(this);
  }

  private createParticleTextures() {
    const g = this.add.graphics();
    // Outer glow (soft halo)
    g.fillStyle(0xffffff, 0.15);
    g.fillCircle(4, 4, 5);
    g.fillStyle(0xffffff, 0.3);
    g.fillCircle(4, 4, 4);
    // Main bright core
    g.fillStyle(0xffffcc, 0.8);
    g.fillCircle(4, 4, 3);
    // Hot white center
    g.fillStyle(0xffffff, 1);
    g.fillCircle(4, 4, 1.5);
    // Sparkle cross highlights
    g.fillStyle(0xffffff, 0.7);
    g.fillRect(4, 0, 0.8, 3);
    g.fillRect(4, 5, 0.8, 3);
    g.fillRect(0, 4, 3, 0.8);
    g.fillRect(5, 4, 3, 0.8);
    g.generateTexture('particle', 8, 8);
    g.destroy();
  }
  }
