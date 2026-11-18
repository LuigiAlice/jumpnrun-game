import Phaser from 'phaser';
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
    this.createBackgroundTextures();
    this.createItemTextures();
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
    const g = this.add.graphics();

    // A side-facing silhouette keeps facing direction and strides readable at game scale.
    // All poses share a fixed canvas and foot baseline, so animation never shifts the body.
    const drawMario = (key: string, shirtColor: number, pantsColor: number, isBig: boolean, pose: 'idle' | 'walk1' | 'walk2' | 'jump' = 'idle') => {
      g.clear();
      const w = isBig ? 36 : 30;
      const height = 52;
      const xOffset = isBig ? 3 : 0;
      const headTop = isBig ? 2 : 12;
      const torsoTop = headTop + 18;
      const legTop = isBig ? 36 : 40;
      const ink = 0x25233b;
      const skin = 0xffc38b;
      const skinLight = 0xffdfad;
      const hair = 0x633620;
      const boot = 0x713d26;
      const shirtDark = Phaser.Display.Color.ValueToColor(shirtColor).darken(24).color;
      const pantsDark = Phaser.Display.Color.ValueToColor(pantsColor).darken(23).color;
      const rect = (color: number, x: number, y: number, width: number, h: number) => {
        g.fillStyle(color, 1);
        g.fillRect(xOffset + x, y, width, h);
      };
      const running = pose === 'walk1' || pose === 'walk2';
      const stride = pose === 'walk1' ? -4 : pose === 'walk2' ? 4 : 0;
      const jumping = pose === 'jump';

      // Back arm, then shirt and overalls. The forward hand rises during a jump.
      const rearHandY = jumping ? torsoTop + 2 : torsoTop + 8 + (running ? -stride : 0);
      rect(ink, 2, rearHandY - 4, 8, 10);
      rect(shirtDark, 4, rearHandY - 3, 6, 6);
      rect(0xfff5df, 2, rearHandY + 1, 6, 5);
      rect(ink, 7, torsoTop - 2, 16, legTop - torsoTop + 7);
      rect(shirtColor, 6, torsoTop, 16, legTop - torsoTop + 2);
      rect(shirtDark, 18, torsoTop + 4, 6, 8);
      rect(pantsColor, 8, torsoTop + 7, 14, legTop - torsoTop - 1);
      rect(pantsColor, 8, torsoTop, 4, 10);
      rect(pantsColor, 18, torsoTop, 4, 10);
      rect(0xffd34e, 10, torsoTop + 7, 2, 2);
      rect(0xffd34e, 18, torsoTop + 7, 2, 2);
      rect(pantsDark, 18, torsoTop + 11, 4, Math.max(2, legTop - torsoTop - 9));

      // Distinct long strides, a tucked jump leg and a stable standing pose.
      const rearX = 8 + stride;
      const frontX = 16 - stride;
      const rearFootY = jumping ? 43 : pose === 'walk1' ? 46 : 48;
      const frontFootY = jumping ? 48 : pose === 'walk2' ? 46 : 48;
      rect(ink, rearX - 1, legTop, 8, rearFootY - legTop + 4);
      rect(pantsDark, rearX, legTop, 6, rearFootY - legTop);
      rect(boot, rearX - 2, rearFootY, 10, 3);
      rect(ink, rearX - 2, rearFootY + 3, 10, 1);
      rect(ink, frontX - 1, legTop, 8, frontFootY - legTop + 4);
      rect(pantsColor, frontX, legTop, 6, frontFootY - legTop);
      rect(boot, frontX, frontFootY, 10, 3);
      rect(ink, frontX, frontFootY + 3, 10, 1);
      rect(0xb97642, frontX + 4, frontFootY, 4, 1);

      // Profile: cap brim, one bright eye, projecting nose and dark moustache.
      rect(ink, 6, headTop, 16, 18);
      rect(ink, 4, headTop + 4, 22, 10);
      rect(hair, 5, headTop + 7, 9, 10);
      rect(skin, 11, headTop + 6, 13, 10);
      rect(skinLight, 20, headTop + 9, 8, 5);
      rect(skin, 7, headTop + 10, 5, 5);
      rect(hair, 11, headTop + 7, 3, 5);
      rect(0xfff8e8, 17, headTop + 6, 5, 6);
      rect(ink, 20, headTop + 7, 2, 5);
      rect(hair, 16, headTop + 13, 10, 3);
      rect(skinLight, 13, headTop + 16, 9, 2);
      rect(shirtDark, 5, headTop + 2, 17, 5);
      rect(shirtColor, 7, headTop, 13, 5);
      rect(shirtColor, 10, headTop + 4, 17, 3);
      rect(Phaser.Display.Color.ValueToColor(shirtColor).lighten(18).color, 9, headTop + 1, 9, 2);
      rect(0xfff5df, 17, headTop + 1, 3, 3);

      const handY = jumping ? headTop + 2 : torsoTop + 7 + (running ? stride : 0);
      rect(ink, 23, handY - 1, 7, 9);
      rect(shirtColor, 22, handY + 3, 6, 5);
      rect(0xfff5df, 24, handY, 6, 5);
      rect(0xd3d7e2, 26, handY + 4, 4, 2);
      g.generateTexture(key, w, height);
    };

    // Classic red/blue Mario
    drawMario('player_idle',      0xdd2222, 0x1a5fcc, false);
    drawMario('player_walk1',     0xdd2222, 0x1a5fcc, false, 'walk1');
    drawMario('player_walk2',     0xdd2222, 0x1a5fcc, false, 'walk2');
    drawMario('player_jump',      0xdd2222, 0x1a5fcc, false, 'jump');
    drawMario('player_big_idle',  0xdd2222, 0x1a5fcc, true);
    drawMario('player_big_walk1', 0xdd2222, 0x1a5fcc, true, 'walk1');
    drawMario('player_big_walk2', 0xdd2222, 0x1a5fcc, true, 'walk2');
    drawMario('player_big_jump',  0xdd2222, 0x1a5fcc, true, 'jump');
    // Fire Mario – white/orange
    drawMario('player_fire_idle',  0xf8f8f8, 0xdd4411, true);
    drawMario('player_fire_walk1', 0xf8f8f8, 0xdd4411, true, 'walk1');
    drawMario('player_fire_walk2', 0xf8f8f8, 0xdd4411, true, 'walk2');
    drawMario('player_fire_jump',  0xf8f8f8, 0xdd4411, true, 'jump');

    // Fireball – enhanced multi-layer glow
    g.clear();
    g.fillStyle(0xff1100, 0.06); g.fillCircle(8, 8, 9);
    g.fillStyle(0xff3300, 0.12); g.fillCircle(8, 8, 7.5);
    g.fillStyle(0xff6600, 0.28); g.fillCircle(8, 8, 6);
    g.fillStyle(0xffaa00, 0.60); g.fillCircle(8, 8, 4.5);
    g.fillStyle(0xffee00, 1);    g.fillCircle(8, 8, 3);
    g.fillStyle(0xffffff, 0.85); g.fillCircle(8, 8, 1.5);
    g.generateTexture('fireball', 16, 16);
    g.destroy();
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
    const g = this.add.graphics();

    // ==================== GRASSLANDS BIOME (7 LAYERS) ====================
    // Layer 0: Sky with clouds, birds, sun glow, layered atmosphere
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 420, 0x9FDFFF, 0xEAFAF2, 40);
    this.fillVGradient(g, 0, 420, 1200, 380, 0xEAFAF2, 0xFFF6D8, 40);
    g.fillStyle(0xFFF4C9, 0.16);
    g.fillEllipse(600, 780, 1400, 260);
    g.fillStyle(0xFFF4C9, 0.10);
    g.fillEllipse(600, 700, 1200, 160);
    this.softRadialHaze(g, 900, 150, 380, 0xFFFAE0, 0.16, 12);
    this.softRadialHaze(g, 260, 110, 260, 0xD8F4FF, 0.10, 10);
    this.drawLightBeams(g, 1200, 800, 0xFFFFFF, 0.05);
    g.fillStyle(0xfff8dc, 0.22);
    g.fillEllipse(600, 640, 1400, 190);
    g.fillStyle(0xFFFFFF, 0.13); g.fillEllipse(900, 150, 380, 120);
    g.fillStyle(0xFFFCF0, 0.16); g.fillEllipse(900, 185, 240, 85);
    // Cirrus wisps
    g.fillStyle(0xFFFFFF, 0.15);
    g.fillEllipse(150, 150, 300, 28); g.fillEllipse(550, 130, 260, 24);
    g.fillEllipse(1100, 170, 220, 26); g.fillEllipse(320, 140, 180, 18);
    // Cumulus clouds with shadows
    g.fillStyle(0xC8D8E8, 0.2);
    g.fillCircle(200, 320, 50); g.fillCircle(260, 310, 40); g.fillCircle(170, 330, 36);
    g.fillCircle(700, 340, 55); g.fillCircle(780, 325, 42); g.fillCircle(650, 345, 38);
    g.fillStyle(0xFFFFFF, 0.25);
    g.fillCircle(195, 315, 45); g.fillCircle(255, 305, 35); g.fillCircle(165, 325, 30);
    g.fillCircle(695, 335, 48); g.fillCircle(775, 320, 36); g.fillCircle(645, 340, 32);
    // Birds
    g.fillStyle(0x3A3030, 0.6);
    for (let b = 0; b < 8; b++) {
      const bx = 80 + b * 130; const by = 80 + (b % 3) * 25;
      g.fillTriangle(bx, by, bx + 12, by - 8, bx + 16, by);
      g.fillTriangle(bx + 16, by, bx + 20, by - 8, bx + 36, by);
    }
    g.generateTexture('bg_grasslands_0', 1200, 800);

    // Layer 1: Far smooth dome hills with soft caps
    g.clear();
    g.fillStyle(0x9FBCCF, 0.5);
    g.fillEllipse(150, 420, 560, 340); g.fillEllipse(550, 420, 720, 400); g.fillEllipse(1050, 420, 640, 330);
    g.fillStyle(0xB8D4E2, 0.42);
    g.fillEllipse(150, 415, 460, 280); g.fillEllipse(550, 415, 600, 340); g.fillEllipse(1050, 415, 520, 270);
    g.fillStyle(0xD4E8F0, 0.35);
    g.fillEllipse(150, 340, 300, 160); g.fillEllipse(550, 315, 380, 190); g.fillEllipse(1050, 345, 330, 160);
    g.fillStyle(0xF4F8FC, 0.3);
    g.fillEllipse(120, 300, 180, 80); g.fillEllipse(520, 275, 210, 90); g.fillEllipse(1030, 305, 190, 78);
    g.fillStyle(0x8FD46A, 0.3);
    g.fillEllipse(120, 400, 190, 90); g.fillEllipse(420, 410, 160, 80); g.fillEllipse(880, 395, 170, 85);
    g.generateTexture('bg_grasslands_1', 1400, 400);

    // Layer 2: Far hills with stream
    g.clear();
    g.fillStyle(0x7BBE58, 0.5);
    g.fillEllipse(200, 420, 420, 210); g.fillEllipse(750, 400, 520, 230);
    g.fillEllipse(1300, 430, 460, 195);
    g.fillStyle(0xA2E88A, 0.45);
    g.fillEllipse(500, 415, 380, 180); g.fillEllipse(1050, 410, 400, 200);
    g.fillStyle(0xB4EC8E, 0.35);
    g.fillEllipse(180, 400, 220, 100); g.fillEllipse(720, 385, 260, 110); g.fillEllipse(1270, 405, 240, 100);
    g.fillStyle(0x5FA84B, 0.4);
    g.fillEllipse(200, 440, 340, 130); g.fillEllipse(750, 430, 430, 140); g.fillEllipse(1300, 450, 380, 120);
    g.fillStyle(0x4A90D9, 0.3); g.fillEllipse(600, 430, 80, 140);
    g.fillStyle(0x6BB5E8, 0.2); g.fillEllipse(600, 425, 50, 110);
    g.generateTexture('bg_grasslands_2', 1600, 450);

    // Layer 3: Mid hills with pine tree silhouettes
    g.clear();
    g.fillStyle(0x5FA84B, 0.7);
    g.fillEllipse(150, 480, 360, 175); g.fillEllipse(580, 460, 420, 205);
    g.fillEllipse(1000, 490, 390, 165);
    g.fillStyle(0x8FD46A, 0.55);
    g.fillEllipse(150, 480, 280, 130); g.fillEllipse(580, 460, 320, 150);
    g.fillEllipse(1000, 490, 300, 120);
    g.fillStyle(0xB2E88A, 0.4);
    g.fillEllipse(130, 455, 180, 70); g.fillEllipse(560, 435, 200, 80); g.fillEllipse(980, 465, 190, 70);
    g.fillStyle(0x4A8A3E, 0.6);
    g.fillTriangle(200, 440, 210, 360, 220, 440);
    g.fillTriangle(195, 400, 210, 330, 225, 400);
    g.fillTriangle(650, 420, 660, 340, 670, 420);
    g.fillTriangle(645, 380, 660, 310, 675, 380);
    g.fillTriangle(910, 450, 920, 370, 930, 450);
    g.generateTexture('bg_grasslands_3', 1600, 500);

    // Layer 4: Near hills with oak/pine trees and path
    g.clear();
    g.fillStyle(0x2E5A22, 0.85);
    g.fillEllipse(100, 520, 260, 145); g.fillEllipse(420, 500, 310, 165);
    g.fillEllipse(740, 530, 290, 135); g.fillEllipse(1080, 510, 330, 155);
    g.fillStyle(0x3A6E2D, 0.7);
    g.fillEllipse(100, 520, 200, 110); g.fillEllipse(420, 500, 240, 120);
    g.fillEllipse(740, 530, 220, 100); g.fillEllipse(1080, 510, 250, 115);
    g.fillStyle(0xC4A060, 0.35); g.fillEllipse(500, 535, 200, 30);
    // Oak trees
    g.fillStyle(0x1E4D14, 0.9);
    g.fillEllipse(160, 380, 85, 70); g.fillEllipse(110, 390, 70, 55);
    g.fillStyle(0x26731A, 0.8);
    g.fillEllipse(150, 370, 60, 48); g.fillEllipse(105, 380, 48, 38);
    g.fillStyle(0x5D4037, 1);
    g.fillRect(130, 410, 12, 65); g.fillRect(100, 420, 10, 55);
    // Pine trees
    g.fillStyle(0x1A3A10, 0.9);
    g.fillTriangle(460, 400, 472, 320, 484, 400);
    g.fillTriangle(450, 360, 472, 290, 494, 360);
    g.fillStyle(0x5D4037, 1); g.fillRect(468, 400, 8, 70);
    g.fillTriangle(780, 420, 792, 340, 804, 420);
    g.fillTriangle(770, 380, 792, 310, 814, 380);
    g.fillRect(788, 420, 8, 65);
    g.fillTriangle(1120, 390, 1132, 310, 1144, 390);
    g.fillTriangle(1110, 350, 1132, 280, 1154, 350);
    g.fillRect(1128, 390, 8, 75);
    g.fillStyle(0x1A3A10, 0.25);
    g.fillEllipse(140, 430, 40, 15); g.fillEllipse(790, 460, 35, 12);
    g.generateTexture('bg_grasslands_4', 1600, 550);

    // Layer 5: Bushes, flowers, butterflies
    g.clear();
    const lushBushes: [number, number, number][] = [
      [80, 575, 1], [300, 585, 0.8], [520, 570, 1.05], [750, 582, 0.9], [960, 575, 1], [1160, 588, 0.85]
    ];
    for (const [bx, by, bs] of lushBushes) {
      g.fillStyle(0x3F7A2E, 1);
      g.fillEllipse(bx, by, 115 * bs, 58 * bs);
      g.fillEllipse(bx - 38 * bs, by + 6 * bs, 70 * bs, 44 * bs);
      g.fillEllipse(bx + 40 * bs, by + 8 * bs, 72 * bs, 42 * bs);
      g.fillStyle(0x5FA84B, 1);
      g.fillEllipse(bx - 12 * bs, by - 8 * bs, 82 * bs, 48 * bs);
      g.fillEllipse(bx + 30 * bs, by - 2 * bs, 66 * bs, 40 * bs);
      g.fillEllipse(bx - 44 * bs, by + 2 * bs, 52 * bs, 34 * bs);
      g.fillStyle(0x8FD46A, 1);
      g.fillEllipse(bx - 20 * bs, by - 18 * bs, 58 * bs, 34 * bs);
      g.fillEllipse(bx + 22 * bs, by - 14 * bs, 46 * bs, 28 * bs);
      g.fillEllipse(bx + 44 * bs, by - 10 * bs, 34 * bs, 22 * bs);
      g.fillStyle(0xB2E88A, 0.6);
      g.fillCircle(bx - 28 * bs, by - 22 * bs, 10 * bs);
      g.fillCircle(bx + 14 * bs, by - 20 * bs, 8 * bs);
      g.fillStyle(0xffffff, 0.3);
      g.fillCircle(bx - 32 * bs, by - 25 * bs, 5 * bs);
    }
    g.fillStyle(0x2C6A20, 0.8);
    g.fillEllipse(180, 595, 55, 30); g.fillEllipse(440, 585, 50, 28);
    g.fillEllipse(680, 592, 52, 32); g.fillEllipse(880, 590, 48, 26);
    g.fillEllipse(1060, 595, 56, 30);
    // Flowers
    g.fillStyle(0xFF69B4, 1);
    g.fillCircle(130, 560, 6); g.fillCircle(133, 556, 3); g.fillCircle(350, 568, 5);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(570, 555, 6); g.fillCircle(573, 551, 3); g.fillCircle(790, 562, 5);
    g.fillStyle(0xFF6347, 1);
    g.fillCircle(990, 558, 5); g.fillCircle(993, 554, 3); g.fillCircle(1190, 565, 4);
    g.fillStyle(0x9370DB, 1);
    g.fillCircle(650, 570, 5); g.fillCircle(1100, 574, 4);
    // Butterflies
    g.fillStyle(0xFF8800, 0.8);
    g.fillEllipse(230, 540, 10, 6); g.fillCircle(226, 539, 3); g.fillCircle(234, 539, 3);
    g.fillEllipse(460, 530, 8, 5); g.fillCircle(457, 529, 2.5); g.fillCircle(463, 529, 2.5);
    g.fillStyle(0x4488FF, 0.8);
    g.fillEllipse(650, 535, 9, 6); g.fillCircle(647, 534, 3); g.fillCircle(653, 534, 3);
    g.fillEllipse(950, 525, 10, 6); g.fillCircle(946, 524, 3); g.fillCircle(954, 524, 3);
    g.fillStyle(0x1F5A10, 0.9);
    for (let i = 0; i < 15; i++) {
      const gx = i * 85 + 25 + (i % 3) * 10;
      g.fillTriangle(gx, 595, gx + 4, 570, gx + 8, 595);
    }
    g.generateTexture('bg_grasslands_5', 1200, 600);

    // Layer 6: Foreground with grass, rocks, flowers
    g.clear();
    g.fillStyle(0x1A4A0D, 1);
    for (let i = 0; i < 45; i++) {
      const h = 600 + (i % 4) * 12;
      g.fillTriangle(i * 28 + 8, 680, i * 28 + 14, h, i * 28 + 20, 680);
    }
    g.fillStyle(0x12330A, 0.85);
    for (let i = 0; i < 45; i++) {
      const h = 620 + (i % 3) * 10;
      g.fillTriangle(i * 28 + 11, 680, i * 28 + 15, h, i * 28 + 19, 680);
    }
    g.fillStyle(0x5D5D4A, 0.7);
    g.fillEllipse(100, 665, 35, 18); g.fillEllipse(450, 670, 28, 14);
    g.fillEllipse(800, 662, 38, 20); g.fillEllipse(1050, 668, 32, 16);
    g.fillStyle(0x6E6E5A, 0.5);
    g.fillEllipse(100, 662, 25, 12); g.fillEllipse(800, 659, 26, 13);
    g.fillStyle(0x2E6E1A, 0.4);
    g.fillEllipse(105, 660, 15, 6); g.fillEllipse(805, 657, 12, 5);
    g.fillStyle(0xFFDD44, 0.9);
    g.fillCircle(50, 660, 3); g.fillCircle(350, 665, 3);
    g.fillCircle(620, 658, 3); g.fillCircle(920, 663, 3);
    g.fillStyle(0xFF88AA, 0.9);
    g.fillCircle(170, 662, 3); g.fillCircle(520, 660, 3);
    g.fillCircle(720, 665, 3); g.fillCircle(1150, 658, 3);
    g.generateTexture('bg_grasslands_6', 1200, 680);


    // ==================== DESERT BIOME (7 LAYERS) ====================
    // Layer 0: Sunset desert sky with heat shimmer bands and vultures
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0x8A6AB8, 0xFFB070, 48);
    g.fillStyle(0xFFD98A, 0.2); g.fillRect(0, 600, 1200, 200);
    g.fillStyle(0xFFE4A8, 0.16); g.fillEllipse(600, 720, 1200, 220);
    g.fillStyle(0xFFAA80, 0.12);
    g.fillEllipse(200, 680, 400, 30); g.fillEllipse(800, 660, 350, 25);
    this.drawLightBeams(g, 1200, 800, 0xFFE8B0, 0.05);
    this.softRadialHaze(g, 900, 130, 280, 0xFFF4CC, 0.16, 12);
    // Distant sun
    g.fillStyle(0xFFF8DC, 0.25); g.fillCircle(900, 120, 60);
    g.fillStyle(0xFFFFFF, 0.2); g.fillCircle(900, 120, 40);
    // Vultures
    g.fillStyle(0x3A2A1A, 0.5);
    for (let v = 0; v < 4; v++) {
      const vx = 150 + v * 220; const vy = 90 - (v % 2) * 15;
      g.fillTriangle(vx, vy + 8, vx - 8, vy - 5, vx - 2, vy + 2);
      g.fillTriangle(vx, vy + 8, vx + 8, vy - 5, vx + 2, vy + 2);
    }
    g.generateTexture('bg_desert_0', 1200, 800);

    // Layer 1: Far dunes with heat haze and pyramids
    g.clear();
    g.fillStyle(0xF2DCAC, 0.5);
    g.fillEllipse(250, 400, 620, 260); g.fillEllipse(950, 370, 720, 290);
    g.fillStyle(0xE8CC94, 0.4); g.fillEllipse(600, 390, 550, 230);
    g.fillStyle(0xFAECC8, 0.35);
    g.fillEllipse(220, 380, 320, 140); g.fillEllipse(900, 350, 340, 150);
    // Pyramids
    g.fillStyle(0xC8A050, 0.55);
    g.fillTriangle(480, 390, 440, 300, 520, 300);
    g.fillTriangle(500, 300, 475, 330, 495, 330);
    g.fillStyle(0xD4B060, 0.4);
    g.fillTriangle(480, 300, 460, 360, 510, 360);
    g.fillStyle(0xC4A050, 0.5);
    g.fillTriangle(700, 385, 675, 320, 725, 320);
    g.fillStyle(0xD0B060, 0.35);
    g.fillTriangle(700, 320, 685, 355, 715, 355);
    g.fillStyle(0xF0D490, 0.2);
    g.fillEllipse(300, 340, 200, 25); g.fillEllipse(850, 320, 180, 22);
    g.generateTexture('bg_desert_1', 1400, 450);

    // Layer 2: Mid dunes with sun, palms, camel caravan
    g.clear();
    g.fillStyle(0xD4A84C, 0.65);
    g.fillEllipse(200, 450, 510, 210); g.fillEllipse(720, 430, 560, 240);
    g.fillEllipse(1250, 460, 460, 195);
    g.fillStyle(0xCC9930, 0.5); g.fillEllipse(480, 445, 480, 200);
    // Sun
    g.fillStyle(0xFFF4B0, 0.2); g.fillCircle(850, 90, 80);
    g.fillStyle(0xFFF8DC, 0.4); g.fillCircle(850, 90, 60);
    g.fillStyle(0xFFD700, 0.85); g.fillCircle(850, 90, 44);
    g.fillStyle(0xFFF4A0, 0.6); g.fillCircle(850, 90, 28);
    g.fillStyle(0xFFFFFF, 0.35); g.fillCircle(845, 85, 10);
    // Palm trees
    g.fillStyle(0x3A2A1A, 0.45);
    g.fillRect(120, 350, 10, 130); g.fillEllipse(125, 340, 70, 40);
    g.fillRect(340, 370, 9, 110); g.fillEllipse(345, 360, 60, 35);
    g.fillRect(620, 340, 11, 140); g.fillEllipse(625, 330, 75, 42);
    // Camel caravan
    g.fillStyle(0x8B6914, 0.35);
    g.fillEllipse(480, 480, 50, 25);
    g.fillRect(460, 490, 4, 18); g.fillRect(475, 488, 4, 20);
    g.fillRect(490, 490, 4, 18); g.fillRect(505, 488, 4, 20);
    g.fillEllipse(540, 485, 45, 22);
    g.fillRect(522, 493, 4, 16); g.fillRect(536, 492, 4, 18);
    g.fillRect(550, 494, 4, 16); g.fillRect(564, 492, 4, 18);
    g.generateTexture('bg_desert_2', 1600, 500);

    // Layer 3: Near dunes with varied shapes
    g.clear();
    g.fillStyle(0xB8954E, 0.8);
    g.fillEllipse(150, 500, 410, 185); g.fillEllipse(670, 480, 510, 205);
    g.fillEllipse(1180, 510, 390, 175);
    g.fillStyle(0xCC9930, 0.6);
    g.fillEllipse(340, 515, 300, 110); g.fillEllipse(900, 505, 280, 100);
    g.fillStyle(0xD4B060, 0.6);
    g.fillEllipse(150, 490, 360, 150); g.fillEllipse(670, 470, 440, 165);
    g.fillEllipse(1180, 500, 330, 140);
    g.generateTexture('bg_desert_3', 1600, 550);

    // Layer 4: Cacti, detailed rock formations, pyramids
    g.clear();
    g.fillStyle(0x4A5A20, 1);
    g.fillRect(120, 410, 20, 160); g.fillRect(95, 470, 28, 18);
    g.fillRect(115, 440, 20, 18);
    g.fillStyle(0x5A6E2A, 0.7); g.fillRect(123, 410, 7, 160);
    g.fillStyle(0x4A5A20, 1);
    g.fillRect(260, 380, 16, 130); g.fillRect(245, 425, 22, 16);
    g.fillRect(258, 395, 18, 16);
    g.fillStyle(0xFF69B4, 0.9);
    g.fillCircle(125, 407, 5); g.fillCircle(100, 465, 4); g.fillCircle(270, 377, 5);
    g.fillStyle(0xC8A050, 0.6);
    g.fillTriangle(480, 560, 440, 450, 520, 450);
    g.fillTriangle(500, 450, 475, 480, 510, 480);
    g.fillStyle(0xD4B060, 0.45);
    g.fillTriangle(480, 450, 460, 520, 520, 520);
    g.fillStyle(0x7B6340, 1);
    g.fillEllipse(650, 555, 75, 42); g.fillEllipse(900, 558, 85, 48);
    g.fillEllipse(1100, 550, 70, 38);
    g.fillStyle(0x8C7450, 0.7);
    g.fillEllipse(645, 550, 55, 30); g.fillEllipse(1095, 545, 50, 28);
    // Skull
    g.fillStyle(0xE8DCC8, 1); g.fillEllipse(1065, 532, 28, 20);
    g.fillStyle(0x3A3A3A, 1);
    g.fillEllipse(1058, 528, 6, 4); g.fillEllipse(1072, 528, 6, 4);
    g.fillRect(1063, 536, 6, 5);
    g.generateTexture('bg_desert_4', 1200, 600);

    // Layer 5: Shrubs, tumbleweeds, agave plants
    g.clear();
    g.fillStyle(0x8BAA36, 0.75);
    g.fillCircle(180, 580, 26); g.fillCircle(560, 590, 22);
    g.fillCircle(870, 575, 24); g.fillCircle(1180, 585, 20);
    g.fillStyle(0x6E8C24, 0.6);
    g.fillEllipse(175, 575, 30, 16); g.fillEllipse(865, 570, 28, 14);
    g.fillStyle(0x6B8E23, 1);
    g.fillEllipse(360, 570, 55, 32); g.fillEllipse(770, 565, 48, 30);
    g.fillEllipse(1040, 572, 50, 28);
    g.fillStyle(0x7EA830, 0.7);
    g.fillEllipse(360, 565, 40, 22); g.fillEllipse(1040, 567, 36, 20);
    g.fillStyle(0xB89A40, 0.6);
    g.fillEllipse(460, 590, 25, 14); g.fillEllipse(960, 588, 22, 12);
    g.fillStyle(0x6B8E23, 0.8);
    g.fillTriangle(140, 595, 150, 555, 160, 595);
    g.fillTriangle(150, 595, 155, 565, 162, 595);
    g.fillTriangle(680, 590, 688, 555, 698, 590);
    g.generateTexture('bg_desert_5', 1200, 620);

    // Layer 6: Sand with ripples, rocks, cacti
    g.clear();
    g.fillStyle(0xE8A850, 1);
    for (let i = 0; i < 32; i++) {
      const sy = 650 + Math.sin(i * 0.5) * 8;
      g.fillEllipse(i * 46 + 28, sy, 48, 30);
    }
    g.fillStyle(0xF0C068, 0.5);
    for (let i = 0; i < 32; i++) {
      g.fillEllipse(i * 46 + 20, 647, 30, 14);
    }
    g.fillStyle(0x8C7050, 0.85);
    g.fillEllipse(150, 675, 60, 32); g.fillEllipse(550, 680, 48, 26);
    g.fillEllipse(950, 672, 55, 30);
    g.fillStyle(0x9C8060, 0.6);
    g.fillEllipse(150, 670, 42, 20); g.fillEllipse(950, 668, 38, 18);
    g.fillStyle(0x5A7A2A, 0.9);
    g.fillRect(330, 645, 10, 38); g.fillRect(320, 660, 18, 12);
    g.fillStyle(0xFF69B4, 0.8); g.fillCircle(337, 642, 4);
    g.fillStyle(0x5A7A2A, 0.9); g.fillRect(730, 648, 8, 35);
    g.generateTexture('bg_desert_6', 1400, 700);


    // ==================== WATER BIOME (7 LAYERS) ====================
    // Layer 0: Deep underwater gradient with caustic waves
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0x1E5C7C, 0x5CD0E8, 48);
    g.fillStyle(0x7CE0F0, 0.25); g.fillRect(0, 720, 1200, 80);
    g.fillStyle(0xB4EEF8, 0.16); g.fillRect(0, 0, 1200, 100);
    g.fillStyle(0x40C0E0, 0.05);
    for (let i = 0; i < 18; i++) {
      g.fillEllipse(80 + i * 72, 200 + (i % 3) * 180, 90 + (i % 4) * 20, 25);
    }
    g.fillStyle(0x80E8FF, 0.08);
    for (let i = 0; i < 20; i++) {
      g.fillEllipse(i * 65 + 30, 750 + (i % 3) * 20, 70, 15);
    }
    g.generateTexture('bg_water_0', 1200, 800);

    // Layer 1: Volumetric light rays
    g.clear();
    const rayColors = [0x4A90D9, 0x3399CC, 0x55A8E0, 0x2E8BC0, 0x5BB5E8];
    const rays: [number, number, number][] = [
      [120, 350, 30], [250, 420, 40], [380, 280, 25], [500, 500, 50],
      [600, 350, 35], [720, 450, 28], [830, 300, 45], [950, 480, 32],
      [1050, 380, 38], [1150, 420, 30]
    ];
    for (let j = 0; j < rays.length; j++) {
      const [x, bottom, w] = rays[j];
      g.fillStyle(rayColors[j % rayColors.length], 0.06 + (j % 3) * 0.04);
      g.fillTriangle(x - w * 0.6, 0, x, 0, x + w * 0.8, bottom);
      g.fillTriangle(x, 0, x + w * 0.6, 0, x + w * 0.5, bottom);
    }
    g.fillStyle(0x88CCFF, 0.15);
    g.fillTriangle(300, 0, 320, 0, 280, 600);
    g.fillTriangle(600, 0, 620, 0, 580, 600);
    g.fillTriangle(900, 0, 920, 0, 880, 550);
    g.generateTexture('bg_water_1', 1200, 650);

    // Layer 2: Far coral reef + underwater ruins
    g.clear();
    const farCoral: [number, number, number, number, number][] = [
      [100, 500, 80, 120, 0xFF7F50], [300, 480, 100, 140, 0xFF69B4],
      [520, 510, 90, 130, 0x00CED1], [750, 490, 95, 145, 0x9932CC],
      [960, 505, 85, 125, 0xFF7F50], [1120, 495, 75, 115, 0x20B2AA]
    ];
    for (const [cx, cy, rw, rh, color] of farCoral) {
      g.fillStyle(color, 0.45); g.fillEllipse(cx, cy, rw, rh);
      g.fillStyle(0xFFFFFF, 0.1);
      g.fillEllipse(cx - 15, cy - 20, rw * 0.5, rh * 0.6);
    }
    g.fillStyle(0x6A5A4A, 0.3); g.fillRect(600, 440, 40, 60);
    g.fillStyle(0x7A6A5A, 0.25);
    for (let c = 0; c < 3; c++) { g.fillRect(595 + c * 22, 450, 10, 50); }
    g.generateTexture('bg_water_2', 1200, 650);

    // Layer 3: Seaweed forest + sea turtle
    g.clear();
    const seaweedTypes = [
      { color: 0x1A6B1A, highlight: 0x228B22 },
      { color: 0x0D5D0D, highlight: 0x1A7A1A },
      { color: 0x1E4D14, highlight: 0x2E6E24 }
    ];
    for (let i = 0; i < 20; i++) {
      const x = i * 65 + 40;
      const t = seaweedTypes[i % 3];
      const h = 220 + (i % 5) * 25;
      const baseY = 350 + (i % 3) * 15;
      g.fillStyle(t.color, 0.65); g.fillRect(x, baseY, 10, h);
      g.fillStyle(t.highlight, 0.5);
      g.fillEllipse(x - 6, baseY + h * 0.4, 24, 16);
      g.fillEllipse(x + 8, baseY + h * 0.6, 20, 14);
      g.fillEllipse(x - 4, baseY + h * 0.25, 18, 12);
      g.fillStyle(0x3CAA3C, 0.35);
      g.fillEllipse(x + 4, baseY + h * 0.15, 20, 40);
    }
    for (let a = 0; a < 10; a++) {
      const ax = a * 145 + 60;
      g.fillStyle(0x1A6B1A, 0.75);
      g.fillCircle(ax, 560, 42); g.fillCircle(ax - 34, 570, 28); g.fillCircle(ax + 32, 568, 30);
      g.fillStyle(0x2E9428, 0.55);
      g.fillCircle(ax - 6, 550, 30); g.fillCircle(ax + 26, 554, 22);
      g.fillStyle(0x4CC230, 0.4);
      g.fillCircle(ax - 10, 542, 16); g.fillCircle(ax + 20, 546, 12);
    }
    // Sea turtle
    g.fillStyle(0x2E8B57, 0.7); g.fillEllipse(1120, 520, 55, 32);
    g.fillStyle(0x3CB371, 0.6); g.fillEllipse(1110, 515, 38, 22);
    g.fillEllipse(1160, 525, 16, 12); g.fillEllipse(1140, 510, 14, 10);
    g.fillEllipse(1165, 512, 14, 10); g.fillEllipse(1150, 538, 14, 10);
    g.fillEllipse(1170, 535, 14, 10);
    g.fillStyle(0x1A1A1A, 0.6); g.fillCircle(1105, 516, 3);
    g.generateTexture('bg_water_3', 1400, 650);

    // Layer 4: Fish schools + angelfish
    g.clear();
    g.fillStyle(0xFF7700, 0.85); g.fillEllipse(120, 250, 52, 26);
    g.fillTriangle(70, 250, 44, 233, 44, 267);
    g.fillStyle(0xFFFFFF, 0.7); g.fillRect(95, 242, 18, 4);
    g.fillStyle(0x2F2F2F, 0.8); g.fillCircle(150, 244, 4);
    g.fillStyle(0xE04040, 0.85); g.fillEllipse(400, 310, 46, 23);
    g.fillTriangle(354, 310, 330, 294, 330, 326);
    g.fillStyle(0x2F2F2F, 0.8); g.fillCircle(428, 304, 4);
    g.fillStyle(0xFFD700, 0.85); g.fillEllipse(700, 220, 56, 28);
    g.fillTriangle(644, 220, 616, 204, 616, 236);
    g.fillStyle(0x2F2F2F, 0.8); g.fillCircle(734, 214, 4);
    g.fillStyle(0x0088D4, 0.85); g.fillEllipse(1000, 280, 50, 25);
    g.fillTriangle(950, 280, 926, 264, 926, 296);
    g.fillStyle(0xFFFF00, 0.6); g.fillRect(980, 275, 6, 3);
    g.fillStyle(0x2F2F2F, 0.8); g.fillCircle(1030, 274, 4);
    g.fillStyle(0x90EE90, 0.7);
    g.fillEllipse(250, 180, 28, 14); g.fillTriangle(230, 180, 215, 172, 215, 188);
    g.fillEllipse(290, 170, 26, 13); g.fillTriangle(272, 170, 258, 163, 258, 177);
    g.fillEllipse(270, 195, 24, 12); g.fillTriangle(253, 195, 240, 188, 240, 202);
    // Angelfish
    g.fillStyle(0xFFA500, 0.8); g.fillEllipse(540, 140, 40, 24);
    g.fillTriangle(510, 140, 495, 128, 495, 152);
    g.fillStyle(0x000000, 0.7); g.fillCircle(535, 135, 3);
    g.generateTexture('bg_water_4', 1200, 450);

    // Layer 5: Bubbles of varying sizes
    g.clear();
    for (let i = 0; i < 50; i++) {
      const bx = 30 + i * 26 + Math.sin(i * 0.8) * 25;
      const by = 40 + (i * 47) % 160;
      const bs = 2 + (i % 5) * 2;
      g.fillStyle(0xFFFFFF, 0.12 + (i % 3) * 0.08); g.fillCircle(bx, by, bs);
      g.fillStyle(0xFFFFFF, 0.3);
      g.fillCircle(bx - bs * 0.3, by - bs * 0.3, bs * 0.35);
    }
    for (let col = 0; col < 6; col++) {
      const cx = 150 + col * 180;
      for (let r = 0; r < 8; r++) {
        g.fillStyle(0xE0F8FF, 0.06 + r * 0.04);
        g.fillCircle(cx + Math.sin(r * 1.2) * 15, 100 + r * 18, 4 + r % 3);
      }
    }
    g.generateTexture('bg_water_5', 1200, 250);

    // Layer 6: Coral, anemones, starfish, urchins, shells, small fish
    g.clear();
    g.fillStyle(0xFF4500, 1); g.fillEllipse(90, 600, 85, 105);
    g.fillStyle(0xFF6B35, 0.8); g.fillEllipse(90, 585, 62, 75);
    g.fillStyle(0x20B2AA, 1); g.fillEllipse(300, 590, 92, 115);
    g.fillStyle(0x40D8C8, 0.7); g.fillEllipse(300, 575, 68, 80);
    g.fillStyle(0xDB7093, 1); g.fillEllipse(530, 605, 72, 98);
    g.fillStyle(0xF080A0, 0.7); g.fillEllipse(530, 590, 52, 70);
    g.fillStyle(0x00CED1, 1); g.fillEllipse(760, 595, 88, 110);
    g.fillStyle(0x40E8E8, 0.7); g.fillEllipse(760, 578, 64, 75);
    g.fillStyle(0x9370DB, 1); g.fillEllipse(980, 610, 68, 88);
    g.fillStyle(0xB090E8, 0.7); g.fillEllipse(980, 595, 48, 62);
    g.fillStyle(0x9966CC, 1); g.fillEllipse(1150, 600, 55, 75);
    g.fillStyle(0xBB88EE, 0.7); g.fillEllipse(1150, 588, 38, 52);
    g.fillStyle(0xFF6347, 0.85);
    for (let a = 0; a < 8; a++) {
      g.fillEllipse(250 + a * 10, 630, 6, 22 + a % 3 * 6);
    }
    g.fillStyle(0xFFA500, 0.85);
    g.fillEllipse(1200, 640, 30, 14); g.fillEllipse(1202, 636, 15, 22);
    g.fillStyle(0xFFE4C4, 0.7);
    g.fillEllipse(420, 650, 22, 14); g.fillEllipse(680, 660, 25, 16);
    g.fillStyle(0xFFD0B0, 0.6);
    g.fillEllipse(420, 647, 15, 8); g.fillEllipse(680, 657, 17, 10);
    g.fillStyle(0x4A0040, 0.7); g.fillCircle(160, 650, 12);
    for (let s = 0; s < 10; s++) {
      const sa = (s / 10) * Math.PI * 2;
      g.lineStyle(1, 0x4A0040, 0.5);
      g.lineBetween(160 + Math.cos(sa) * 12, 650 + Math.sin(sa) * 12, 160 + Math.cos(sa) * 20, 650 + Math.sin(sa) * 20);
    }
    g.fillStyle(0xFF8800, 0.6);
    g.fillEllipse(750, 680, 22, 12); g.fillTriangle(735, 680, 725, 673, 725, 687);
    g.fillEllipse(1050, 685, 18, 10); g.fillTriangle(1037, 685, 1028, 679, 1028, 691);
    g.generateTexture('bg_water_6', 1400, 700);


    // ==================== ICE-SNOW BIOME (7 LAYERS) ====================
    // Layer 0: Aurora-lit polar sky with dynamic bands, stars
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0x2C3C6A, 0xF0F8FF, 48);
    // Aurora bands
    g.fillStyle(0x00FF88, 0.12);
    g.fillEllipse(300, 180, 500, 80); g.fillEllipse(900, 200, 450, 70);
    g.fillStyle(0x8844FF, 0.10);
    g.fillEllipse(150, 160, 400, 60); g.fillEllipse(700, 190, 500, 75);
    g.fillStyle(0x44FFCC, 0.08);
    g.fillEllipse(500, 170, 600, 90); g.fillEllipse(1000, 175, 400, 60);
    g.fillStyle(0xFF4488, 0.06);
    g.fillEllipse(400, 155, 450, 65); g.fillEllipse(850, 185, 380, 55);
    // Aurora curtains
    g.fillStyle(0x00FF88, 0.05);
    for (let a = 0; a < 12; a++) {
      g.fillRect(60 + a * 100, a % 2 === 0 ? 80 : 120, 15, 200 + (a % 3) * 30);
    }
    // Stars
    g.fillStyle(0xFFFFFF, 0.6);
    for (let s = 0; s < 30; s++) {
      g.fillCircle((s * 53 + 17) % 1150, (s * 41 + 5) % 200, (s % 3) * 0.5 + 0.8);
    }
    g.fillStyle(0xE8F8FF, 0.2); g.fillRect(0, 680, 1200, 120);
    g.generateTexture('bg_ice_0', 1200, 800);

    // Layer 1: Distant soft pastel-cyan ice domes with snowy pines
    g.clear();
    g.fillStyle(0xA8D0E4, 0.55);
    g.fillEllipse(180, 470, 620, 380); g.fillEllipse(550, 470, 700, 420); g.fillEllipse(1050, 470, 660, 360);
    g.fillStyle(0xC4E4F2, 0.5);
    g.fillEllipse(180, 460, 480, 290); g.fillEllipse(550, 455, 580, 340); g.fillEllipse(1050, 460, 520, 280);
    g.fillStyle(0xE8F8FF, 0.55);
    g.fillEllipse(160, 380, 300, 150); g.fillEllipse(540, 350, 350, 170); g.fillEllipse(1040, 385, 310, 150);
    g.fillStyle(0xFFFFFF, 0.45);
    g.fillEllipse(150, 340, 190, 80); g.fillEllipse(520, 315, 210, 85); g.fillEllipse(1030, 345, 190, 78);
    // Snowy pines
    g.fillStyle(0x3A5A4A, 0.3);
    g.fillTriangle(50, 420, 65, 340, 80, 420); g.fillTriangle(45, 380, 65, 310, 85, 380);
    g.fillTriangle(320, 430, 335, 350, 350, 430); g.fillTriangle(315, 390, 335, 320, 355, 390);
    g.fillTriangle(860, 420, 875, 340, 890, 420);
    g.generateTexture('bg_ice_1', 1400, 480);

    // Layer 2: Icebergs, glaciers, penguin colony
    g.clear();
    g.fillStyle(0xB8E0F0, 0.65);
    g.fillEllipse(200, 480, 310, 185); g.fillEllipse(680, 460, 390, 225);
    g.fillEllipse(1150, 490, 290, 165);
    g.fillStyle(0xD4F0FC, 0.55);
    g.fillEllipse(200, 470, 250, 140); g.fillEllipse(680, 450, 310, 175);
    g.fillEllipse(1150, 480, 220, 120);
    g.fillStyle(0xFFFFFF, 0.4);
    g.fillEllipse(190, 440, 180, 90); g.fillEllipse(670, 420, 210, 105); g.fillEllipse(1140, 460, 170, 85);
    // Blue ice crevasses
    g.fillStyle(0x80D0FF, 0.35);
    g.fillRect(210, 430, 4, 40); g.fillRect(270, 420, 3, 35);
    g.fillRect(690, 410, 5, 50); g.fillRect(730, 400, 3, 45);
    // Penguins
    g.fillStyle(0x1A1A2A, 0.7);
    for (let p = 0; p < 6; p++) {
      const px = 160 + p * 22; const py = 490 + (p % 2) * 8;
      g.fillEllipse(px, py, 10, 14);
      g.fillStyle(0xFFFFFF, 0.8); g.fillEllipse(px, py - 2, 8, 10);
      g.fillStyle(0x1A1A2A, 0.7); g.fillEllipse(px, py - 4, 6, 7);
      g.fillStyle(0xFF8830, 0.8); g.fillTriangle(px - 1, py - 1, px + 3, py + 3, px + 1, py);
    }
    g.generateTexture('bg_ice_2', 1400, 520);

    // Layer 3: Snow clouds + large snowflakes
    g.clear();
    g.fillStyle(0xE8E8F0, 0.4);
    g.fillCircle(120, 100, 52); g.fillCircle(185, 85, 44); g.fillCircle(70, 115, 34);
    g.fillCircle(430, 120, 58); g.fillCircle(540, 100, 40);
    g.fillCircle(750, 90, 50); g.fillCircle(860, 115, 42);
    g.fillCircle(1050, 95, 48); g.fillCircle(1160, 118, 40);
    g.fillStyle(0xF0F0FA, 0.3);
    g.fillCircle(120, 90, 40); g.fillCircle(430, 108, 44);
    g.fillCircle(750, 78, 38); g.fillCircle(1050, 83, 36);
    g.fillStyle(0xF0D8E0, 0.25);
    g.fillCircle(260, 135, 38); g.fillCircle(640, 125, 42); g.fillCircle(960, 130, 36);
    // Snowflakes
    g.fillStyle(0xFFFFFF, 0.45);
    for (let sf = 0; sf < 20; sf++) {
      const sx = (sf * 75 + 30) % 1200; const sy = (sf * 45 + 15) % 160;
      g.fillCircle(sx, sy, 2.5); g.fillRect(sx - 1, sy - 4, 2, 8); g.fillRect(sx - 4, sy - 1, 8, 2);
    }
    g.generateTexture('bg_ice_3', 1200, 200);

    // Layer 4: Snow particles + distant snow-evergreens
    g.clear();
    for (let i = 0; i < 80; i++) {
      const x = (i * 43 + 17) % 1200; const y = (i * 31 + 11) % 600;
      g.fillStyle(0xFFFFFF, 0.3 + (i % 4) * 0.15);
      g.fillCircle(x, y, 1.5 + (i % 5));
    }
    g.fillStyle(0xFFFFFF, 0.6);
    for (let i = 0; i < 25; i++) {
      g.fillCircle((i * 67 + 33) % 1200, (i * 53 + 27) % 550, 1.5);
    }
    g.fillStyle(0xFFFFFF, 0.25);
    for (let t = 0; t < 10; t++) {
      const tx = t * 130 + 60; const ty = 550 + (t % 3) * 20;
      g.fillTriangle(tx, ty, tx + 12, ty - 40, tx + 24, ty);
      g.fillTriangle(tx - 3, ty - 15, tx + 12, ty - 60, tx + 27, ty - 15);
    }
    g.generateTexture('bg_ice_4', 1200, 650);

    // Layer 5: Icicles, snowbanks, snow-covered bushes
    g.clear();
    for (let i = 0; i < 30; i++) {
      const ix = i * 44 + 22; const h = 80 + (i % 5) * 18; const iw = 8 + (i % 4) * 4;
      g.fillStyle(0xA0D8F0, 0.8); g.fillTriangle(ix, 0, ix - iw, h, ix + iw, h);
      g.fillStyle(0xC8F0FF, 0.5);
      g.fillTriangle(ix, 4, ix - iw * 0.5, h * 0.7, ix + iw * 0.5, h * 0.7);
      g.fillStyle(0xFFFFFF, 0.4); g.fillCircle(ix, h * 0.3, iw * 0.35);
    }
    g.fillStyle(0xF0F8FF, 0.85);
    g.fillEllipse(200, 520, 260, 70); g.fillEllipse(600, 535, 280, 65);
    g.fillEllipse(1000, 525, 240, 72);
    g.fillStyle(0xFFFFFF, 0.6);
    g.fillCircle(120, 510, 4); g.fillCircle(520, 525, 3);
    g.fillCircle(880, 515, 4); g.fillCircle(1150, 518, 3);
    g.fillStyle(0xC8E8FF, 0.5);
    g.fillEllipse(340, 530, 60, 28); g.fillEllipse(780, 525, 55, 25);
    g.fillEllipse(1120, 528, 50, 22);
    g.generateTexture('bg_ice_5', 1200, 550);

    // Layer 6: Snow ground, frozen rocks, ice crystals
    g.clear();
    g.fillStyle(0xF0F6FC, 1);
    g.fillEllipse(150, 680, 260, 62); g.fillEllipse(470, 690, 230, 57);
    g.fillEllipse(790, 675, 290, 68); g.fillEllipse(1100, 685, 210, 54);
    g.fillStyle(0xFFFFFF, 0.8);
    g.fillEllipse(150, 672, 200, 42); g.fillEllipse(790, 667, 220, 46);
    g.fillStyle(0xE8F0F8, 0.7);
    g.fillEllipse(320, 695, 100, 32); g.fillEllipse(650, 698, 90, 28);
    g.fillEllipse(960, 692, 95, 30);
    g.fillStyle(0x8898AA, 0.7);
    g.fillEllipse(100, 685, 40, 22); g.fillEllipse(580, 688, 35, 18);
    g.fillEllipse(1050, 682, 42, 24);
    g.fillStyle(0xAABCC4, 0.5);
    g.fillEllipse(100, 682, 28, 14); g.fillEllipse(1050, 679, 28, 16);
    g.fillStyle(0x90D0E8, 0.6);
    g.fillEllipse(250, 678, 45, 25); g.fillEllipse(750, 680, 38, 22);
    g.fillStyle(0xC0E8F8, 0.4); g.fillEllipse(250, 674, 32, 16);
    // Ice crystals
    g.fillStyle(0xD0F0FF, 0.5);
    for (let cr = 0; cr < 15; cr++) {
      const cx = (cr * 95 + 40) % 1150; const cy = 690 + (cr % 3) * 8;
      g.fillRect(cx, cy - 3, 1.5, 6); g.fillRect(cx - 2, cy, 5.5, 1.5);
    }
    g.generateTexture('bg_ice_6', 1200, 720);

    // ==================== SKY-CLOUDS BIOME (7 LAYERS) ====================
    // Layer 0: Dramatic multi-band sunset with stars
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0x7A5AA8, 0xFFF0C8, 48);
    this.softRadialHaze(g, 600, 220, 420, 0xFFF0D8, 0.13, 12);
    g.fillStyle(0xFFFFFF, 0.5);
    for (let s = 0; s < 30; s++) {
      g.fillCircle((s * 67 + 13) % 1150 + 25, (s * 43 + 7) % 90 + 5, (s % 3) + 1);
    }
    g.fillStyle(0xFFD700, 0.28); g.fillEllipse(600, 700, 800, 250);
    g.fillStyle(0xFFF4A0, 0.24); g.fillEllipse(600, 680, 500, 180);
    g.fillStyle(0xFFFFFF, 0.2); g.fillEllipse(600, 660, 300, 120);
    g.fillStyle(0xFFEFB4, 0.12); g.fillEllipse(600, 760, 1200, 160);
    g.generateTexture('bg_sky_0', 1200, 800);

    // Layer 1: Cirrus + stratus clouds, birds
    g.clear();
    g.fillStyle(0xFFFFFF, 0.2);
    g.fillEllipse(120, 120, 250, 30); g.fillEllipse(450, 90, 280, 26);
    g.fillEllipse(800, 130, 240, 28); g.fillEllipse(1080, 100, 220, 24);
    g.fillStyle(0xFFE8E0, 0.18);
    g.fillEllipse(280, 135, 200, 24); g.fillEllipse(650, 105, 230, 22);
    g.fillEllipse(950, 125, 210, 26);
    g.fillStyle(0xE8E0FF, 0.12);
    g.fillEllipse(380, 155, 180, 18); g.fillEllipse(750, 140, 160, 16);
    g.fillStyle(0x3A2A2A, 0.5);
    for (let b = 0; b < 6; b++) {
      const bx = 80 + b * 180; const by = 60 + (b % 2) * 15;
      g.fillTriangle(bx, by, bx + 8, by - 6, bx + 12, by);
      g.fillTriangle(bx + 12, by, bx + 16, by - 6, bx + 28, by);
    }
    g.generateTexture('bg_sky_1', 1200, 180);

    // Layer 2: Pink/purple cloud banks + sun rays
    g.clear();
    g.fillStyle(0xE8A0C0, 0.45);
    g.fillCircle(150, 200, 72); g.fillCircle(250, 180, 58);
    g.fillCircle(60, 220, 48); g.fillCircle(340, 195, 50);
    g.fillStyle(0xD090B0, 0.4);
    g.fillCircle(500, 230, 82); g.fillCircle(650, 200, 62); g.fillCircle(530, 210, 50);
    g.fillStyle(0xE8A0C0, 0.45);
    g.fillCircle(800, 215, 68); g.fillCircle(1000, 195, 58);
    g.fillCircle(880, 225, 48); g.fillCircle(1100, 205, 55);
    g.fillStyle(0xFFD0E0, 0.25);
    g.fillCircle(150, 185, 55); g.fillCircle(500, 212, 60);
    g.fillCircle(800, 198, 50); g.fillCircle(1000, 180, 42);
    g.fillStyle(0xFFE8A0, 0.06);
    g.fillTriangle(400, 350, 450, 0, 500, 350);
    g.fillTriangle(600, 350, 650, 0, 700, 350);
    g.fillTriangle(700, 350, 750, 0, 800, 350);
    g.generateTexture('bg_sky_2', 1200, 350);

    // Layer 3: Voluminous cumulus clouds
    g.clear();
    g.fillStyle(0xFFFFFF, 0.65);
    g.fillCircle(100, 350, 68); g.fillCircle(200, 325, 58);
    g.fillCircle(260, 365, 48); g.fillCircle(130, 370, 42);
    g.fillCircle(430, 380, 72); g.fillCircle(560, 345, 54);
    g.fillCircle(510, 385, 46);
    g.fillCircle(680, 370, 64); g.fillCircle(840, 340, 58);
    g.fillCircle(920, 360, 50);
    g.fillCircle(1100, 330, 62); g.fillCircle(1170, 355, 48);
    g.fillStyle(0xD6EFFF, 0.4);
    g.fillCircle(100, 370, 55); g.fillCircle(200, 345, 45);
    g.fillCircle(430, 398, 58); g.fillCircle(560, 362, 42);
    g.fillCircle(680, 388, 50); g.fillCircle(840, 358, 46);
    g.fillCircle(1100, 348, 48);
    g.fillStyle(0xFFF8E0, 0.35);
    g.fillCircle(100, 338, 50); g.fillCircle(430, 365, 54);
    g.fillCircle(680, 355, 48); g.fillCircle(1100, 318, 44);
    g.generateTexture('bg_sky_3', 1200, 450);

    // Layer 4: Golden clouds + floating islands
    g.clear();
    g.fillStyle(0xFFECC8, 0.75);
    g.fillCircle(120, 480, 82); g.fillCircle(250, 455, 68);
    g.fillCircle(350, 495, 58); g.fillCircle(190, 470, 54);
    g.fillCircle(550, 470, 78); g.fillCircle(720, 500, 64);
    g.fillCircle(640, 480, 52);
    g.fillCircle(880, 460, 72); g.fillCircle(1050, 485, 62);
    g.fillCircle(980, 478, 50); g.fillCircle(1180, 465, 56);
    g.fillStyle(0xC8A870, 0.35);
    g.fillCircle(120, 498, 66); g.fillCircle(250, 472, 54);
    g.fillCircle(550, 488, 62); g.fillCircle(720, 516, 50);
    g.fillCircle(880, 478, 56); g.fillCircle(1050, 502, 48);
    g.fillStyle(0xFFF4D8, 0.4);
    g.fillCircle(120, 468, 60); g.fillCircle(550, 456, 58);
    g.fillCircle(880, 446, 54); g.fillCircle(1050, 472, 44);
    // Floating islands
    g.fillStyle(0x4A3A2A, 0.3);
    g.fillEllipse(350, 290, 90, 25); g.fillRect(320, 290, 60, 20);
    g.fillEllipse(850, 260, 80, 22); g.fillRect(825, 260, 50, 15);
    g.fillStyle(0x2E5A20, 0.2);
    g.fillEllipse(350, 280, 60, 30); g.fillEllipse(850, 250, 55, 25);
    g.generateTexture('bg_sky_4', 1200, 550);

    // Layer 5: Bird flocks + wind swirls + sun rays
    g.clear();
    g.fillStyle(0x2F1F1F, 1);
    g.fillTriangle(250, 400, 268, 383, 286, 400);
    g.fillTriangle(286, 400, 304, 383, 322, 400);
    g.fillTriangle(550, 430, 568, 413, 586, 430);
    g.fillTriangle(586, 430, 604, 413, 622, 430);
    g.fillTriangle(800, 410, 818, 393, 836, 410);
    g.fillTriangle(836, 410, 854, 393, 872, 410);
    g.fillStyle(0x3A2A2A, 0.7);
    g.fillTriangle(380, 350, 388, 340, 396, 350);
    g.fillTriangle(396, 350, 404, 340, 412, 350);
    g.fillTriangle(680, 365, 688, 355, 696, 365);
    g.fillTriangle(696, 365, 704, 355, 712, 365);
    g.fillTriangle(960, 375, 968, 365, 976, 375);
    g.fillTriangle(976, 375, 984, 365, 992, 375);
    g.fillStyle(0xFFFFFF, 0.04);
    for (let w = 0; w < 8; w++) { g.fillEllipse(100 + w * 140, 200 + w * 15, 80, 12); }
    g.fillStyle(0xFFD700, 0.06);
    g.fillTriangle(300, 0, 500, 0, 400, 500);
    g.fillTriangle(600, 0, 900, 0, 750, 500);
    g.generateTexture('bg_sky_5', 1200, 500);

    // Layer 6: Distant landscape silhouette + rainbow
    g.clear();
    g.fillStyle(0x3A2040, 0.9);
    g.fillTriangle(0, 700, 150, 530, 300, 700);
    g.fillTriangle(200, 700, 450, 490, 700, 700);
    g.fillTriangle(550, 700, 800, 520, 1050, 700);
    g.fillTriangle(900, 700, 1100, 550, 1400, 700);
    g.fillStyle(0x5A3060, 0.4);
    g.fillTriangle(200, 700, 450, 490, 380, 700);
    g.fillTriangle(550, 700, 800, 520, 720, 700);
    const rainbowBands: { color: number; y: number }[] = [
      { color: 0xFF3030, y: 600 }, { color: 0xFF7F30, y: 618 },
      { color: 0xFFFF30, y: 636 }, { color: 0x30FF30, y: 654 },
      { color: 0x3030FF, y: 672 }, { color: 0x7F30FF, y: 690 },
    ];
    for (const { color, y } of rainbowBands) {
      g.fillStyle(color, 0.55); g.fillEllipse(600, y, 1100, 280);
    }
    g.fillStyle(0x8866AA, 0.3); g.fillEllipse(600, 670, 900, 200);
    g.fillStyle(0xFFE8D0, 0.12); g.fillRect(0, 640, 1200, 100);
    g.generateTexture('bg_sky_6', 1200, 750);


    // ==================== FOREST BIOME (7 LAYERS) ====================
    // Layer 0: Forest canopy sky with dappled light
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0x6FA86A, 0xF4FCE8, 48);
    this.drawLightBeams(g, 1200, 800, 0xFFFEC0, 0.05);
    this.softRadialHaze(g, 600, 180, 380, 0xFFF6C8, 0.13, 12);
    g.fillStyle(0xFFFF80, 0.08);
    g.fillEllipse(200, 300, 30, 20); g.fillEllipse(500, 350, 25, 18);
    g.fillEllipse(800, 280, 28, 20); g.fillEllipse(1050, 320, 22, 16);
    g.fillEllipse(350, 450, 35, 22); g.fillEllipse(700, 420, 32, 20);
    g.generateTexture('bg_forest_0', 1200, 800);

    // Layer 1: Far dense tree canopy
    g.clear();
    const canopy1: [number, number][] = [
      [120, 180], [400, 155], [700, 190], [1000, 165], [260, 200], [560, 200], [860, 210], [1140, 195]
    ];
    for (const [cx, cy] of canopy1) {
      g.fillStyle(0x004A10, 0.6);
      g.fillCircle(cx, cy, 78); g.fillCircle(cx - 62, cy + 22, 52);
      g.fillCircle(cx + 58, cy + 18, 54); g.fillCircle(cx + 20, cy + 30, 60);
      g.fillCircle(cx - 20, cy + 12, 66);
      g.fillStyle(0x1A6A20, 0.5);
      g.fillCircle(cx - 8, cy - 12, 58); g.fillCircle(cx + 40, cy - 4, 44);
      g.fillCircle(cx - 44, cy - 6, 40);
      g.fillStyle(0x2E9428, 0.4);
      g.fillCircle(cx - 14, cy - 20, 34); g.fillCircle(cx + 26, cy - 16, 26);
    }
    g.generateTexture('bg_forest_1', 1200, 300);

    // Layer 2: Mid canopy with hanging moss
    g.clear();
    const canopy2: [number, number][] = [
      [100, 300], [400, 275], [700, 310], [1000, 290], [250, 320], [850, 320]
    ];
    for (const [cx, cy] of canopy2) {
      g.fillStyle(0x1A5A1A, 0.7);
      g.fillCircle(cx, cy, 82); g.fillCircle(cx - 64, cy + 24, 56);
      g.fillCircle(cx + 60, cy + 20, 58); g.fillCircle(cx + 18, cy + 32, 62);
      g.fillStyle(0x2E7A2E, 0.5);
      g.fillCircle(cx - 8, cy - 10, 58); g.fillCircle(cx + 36, cy - 2, 44);
      g.fillCircle(cx - 40, cy - 4, 40);
      g.fillStyle(0x4A9A3A, 0.35);
      g.fillCircle(cx - 12, cy - 18, 32); g.fillCircle(cx + 28, cy - 14, 24);
    }
    g.fillStyle(0x4A8A3A, 0.3);
    for (let m = 0; m < 8; m++) { g.fillRect(150 + m * 130, 320, 4, 30 + (m % 3) * 15); }
    g.generateTexture('bg_forest_2', 1200, 400);

    // Layer 3: Tree trunks with bark texture and moss
    g.clear();
    g.fillStyle(0x5A3A20, 0.6);
    g.fillRect(150, 250, 22, 390); g.fillRect(400, 220, 28, 420);
    g.fillRect(700, 270, 26, 370); g.fillRect(1000, 240, 20, 400);
    g.fillStyle(0x7A5A3A, 0.4);
    g.fillRect(152, 250, 8, 390); g.fillRect(402, 220, 10, 420);
    g.fillRect(702, 270, 9, 370); g.fillRect(1002, 240, 7, 400);
    // Moss on trunks
    g.fillStyle(0x2E6E2E, 0.4);
    g.fillRect(148, 350, 4, 40); g.fillRect(164, 420, 6, 50);
    g.fillRect(398, 380, 6, 55); g.fillRect(420, 450, 4, 35);
    g.fillRect(698, 340, 5, 45); g.fillRect(720, 430, 4, 40);
    g.fillRect(998, 370, 5, 50); g.fillRect(1016, 440, 4, 35);
    g.generateTexture('bg_forest_3', 1200, 600);

    // Layer 4: Vines, hanging leaves, fern undergrowth
    g.clear();
    g.fillStyle(0x2A7A2A, 0.8);
    for (let i = 0; i < 15; i++) {
      const x = i * 85 + 40;
      g.fillRect(x, 0, 5, 180 + (i % 3) * 35);
      g.fillEllipse(x + 2, 180 + (i % 3) * 35, 18, 30);
    }
    g.fillStyle(0x1E6E1E, 0.7);
    for (let f = 0; f < 12; f++) {
      const fx = 50 + f * 100;
      for (let s = 0; s < 4; s++) {
        g.fillEllipse(fx, 230 + s * 6, 14, 6);
        g.fillEllipse(fx + 5, 228 + s * 7, 14, 5);
      }
    }
    g.generateTexture('bg_forest_4', 1200, 250);

    // Layer 5: Mushrooms, fallen logs, mossy rocks
    g.clear();
    g.fillStyle(0x5A3A20, 0.8);
    g.fillEllipse(120, 600, 100, 38); g.fillEllipse(500, 610, 110, 42);
    g.fillEllipse(900, 595, 95, 35);
    g.fillStyle(0x3A5A3A, 0.5);
    g.fillEllipse(120, 596, 80, 25); g.fillEllipse(500, 606, 88, 28);
    // Mushrooms
    g.fillStyle(0xCC2200, 1); g.fillEllipse(220, 575, 38, 25);
    g.fillStyle(0xFFFFFF, 1);
    g.fillCircle(208, 568, 5); g.fillCircle(218, 565, 4); g.fillCircle(228, 572, 4);
    g.fillStyle(0xFFD700, 1); g.fillEllipse(620, 580, 32, 22);
    g.fillStyle(0xFFFFFF, 1);
    g.fillCircle(612, 573, 4); g.fillCircle(625, 576, 4); g.fillCircle(630, 572, 3);
    g.fillStyle(0x8844CC, 1); g.fillEllipse(780, 590, 28, 18);
    g.fillStyle(0xFFFFFF, 0.6);
    g.fillCircle(774, 586, 3); g.fillCircle(786, 588, 3);
    // Mossy rocks
    g.fillStyle(0x5A5A4A, 0.7);
    g.fillEllipse(350, 620, 45, 25); g.fillEllipse(750, 625, 40, 22);
    g.fillStyle(0x2E6E2E, 0.5);
    g.fillEllipse(350, 616, 35, 16); g.fillEllipse(750, 621, 30, 14);
    g.generateTexture('bg_forest_5', 1200, 650);

    // Layer 6: Fireflies with glow, tree roots, small flowers
    g.clear();
    g.fillStyle(0xFFFF00, 0.8);
    for (let i = 0; i < 45; i++) {
      const x = (i * 47) % 1200; const y = 400 + (i * 31) % 300;
      g.fillCircle(x, y, 2.5);
      g.fillStyle(0xFFFF00, 0.15); g.fillCircle(x, y, 6);
      g.fillStyle(0xFFFF00, 0.8);
    }
    g.fillStyle(0x5A3A20, 0.6);
    g.fillRect(200, 650, 8, 50); g.fillRect(195, 670, 15, 6);
    g.fillRect(600, 640, 10, 60); g.fillRect(592, 665, 22, 7);
    g.fillRect(1000, 645, 7, 55); g.fillRect(995, 668, 14, 5);
    g.fillStyle(0xFF88FF, 0.7);
    g.fillCircle(300, 670, 3); g.fillCircle(450, 680, 3);
    g.fillCircle(700, 675, 3); g.fillCircle(850, 665, 3);
    g.fillCircle(1050, 678, 3);
    g.generateTexture('bg_forest_6', 1200, 700);

    // ==================== VILLAGE BIOME (7 LAYERS) ====================
    // Layer 0: Peaceful blue sky with sun, clouds, birds
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0xA8E4FF, 0xFFF6DC, 40);
    g.fillStyle(0xFFF4C9, 0.15); g.fillEllipse(600, 770, 1300, 220);
    this.softRadialHaze(g, 900, 130, 340, 0xFFF6D8, 0.14, 12);
    this.drawLightBeams(g, 1200, 800, 0xFFFFFF, 0.05);
    // Clouds
    g.fillStyle(0xFFFFFF, 0.3);
    g.fillCircle(200, 200, 60); g.fillCircle(260, 190, 48); g.fillCircle(160, 205, 40);
    g.fillCircle(600, 250, 55); g.fillCircle(680, 235, 45); g.fillCircle(550, 260, 38);
    g.fillCircle(950, 180, 50); g.fillCircle(1020, 170, 42); g.fillCircle(910, 188, 36);
    // Sun
    g.fillStyle(0xFFFFFF, 0.15); g.fillCircle(900, 80, 55);
    g.fillStyle(0xFFF4C0, 0.2); g.fillCircle(900, 80, 40);
    g.generateTexture('bg_village_0', 1200, 800);

    // Layer 1: Distant houses, windmill, castle on hill
    g.clear();
    g.fillStyle(0x7A6060, 0.45);
    g.fillRect(60, 320, 75, 100); g.fillRect(250, 295, 85, 125);
    g.fillRect(500, 310, 70, 110); g.fillRect(720, 285, 95, 135);
    g.fillRect(950, 300, 70, 120);
    g.fillStyle(0x8B2020, 0.45);
    g.fillTriangle(50, 320, 155, 320, 100, 255);
    g.fillTriangle(240, 295, 350, 295, 295, 220);
    g.fillTriangle(490, 310, 580, 310, 535, 240);
    g.fillTriangle(710, 285, 830, 285, 770, 200);
    g.fillTriangle(940, 300, 1025, 300, 982, 240);
    // Distant castle
    g.fillStyle(0x5A4A4A, 0.35);
    g.fillRect(1020, 260, 80, 160); g.fillTriangle(1014, 260, 1116, 260, 1060, 200);
    g.fillRect(1048, 280, 24, 100); g.fillRect(1000, 380, 40, 40);
    // Windmill far
    g.fillStyle(0x8B7355, 0.4);
    g.fillRect(420, 340, 30, 100);
    g.fillStyle(0x6B5322, 0.5);
    g.fillRect(410, 290, 50, 8); g.fillRect(432, 308, 8, 40); g.fillRect(400, 325, 50, 8);
    g.generateTexture('bg_village_1', 1200, 450);

    // Layer 2: Mid buildings with windows and chimney smoke
    g.clear();
    g.fillStyle(0x8B7355, 0.7);
    g.fillRect(100, 380, 100, 150); g.fillRect(350, 360, 110, 170);
    g.fillRect(620, 370, 90, 160); g.fillRect(850, 350, 105, 180);
    g.fillStyle(0xFFFF80, 0.6);
    g.fillRect(120, 405, 18, 18); g.fillRect(155, 430, 18, 18);
    g.fillRect(380, 385, 22, 22); g.fillRect(425, 420, 18, 18);
    g.fillStyle(0xFFFF80, 0.5);
    g.fillRect(640, 395, 16, 16); g.fillRect(675, 430, 18, 18);
    g.fillRect(870, 375, 20, 20); g.fillRect(920, 415, 18, 18);
    // Chimneys
    g.fillStyle(0x6A4020, 0.8);
    g.fillRect(155, 340, 15, 40); g.fillRect(415, 320, 18, 40);
    g.fillRect(670, 330, 15, 40); g.fillRect(910, 310, 16, 40);
    // Smoke
    g.fillStyle(0xCCCCCC, 0.3);
    g.fillEllipse(162, 320, 18, 12); g.fillEllipse(158, 300, 15, 10);
    g.fillEllipse(424, 300, 22, 14); g.fillEllipse(420, 278, 16, 11);
    g.fillEllipse(678, 310, 18, 12); g.fillEllipse(910, 290, 20, 13);
    g.generateTexture('bg_village_2', 1200, 550);

    // Layer 3: Windmill + gardens
    g.clear();
    g.fillStyle(0xA08870, 1); g.fillRect(800, 400, 55, 190);
    g.fillStyle(0x8B4513, 1);
    g.fillRect(785, 310, 85, 10); g.fillRect(825, 325, 10, 80);
    g.fillRect(740, 350, 85, 10); g.fillRect(820, 340, 10, 80);
    g.fillStyle(0x6A4020, 1);
    g.fillRect(818, 540, 24, 50); g.fillStyle(0x5A3010, 0.6); g.fillRect(818, 540, 4, 50);
    // Gardens
    g.fillStyle(0x5A8A3A, 0.8);
    g.fillEllipse(140, 580, 70, 30); g.fillEllipse(340, 590, 60, 25);
    g.fillEllipse(550, 575, 75, 35); g.fillEllipse(960, 585, 65, 28);
    g.fillStyle(0x6A9A4A, 0.6);
    g.fillEllipse(140, 575, 50, 18); g.fillEllipse(550, 570, 52, 20);
    g.generateTexture('bg_village_3', 1200, 650);

    // Layer 4: Fence + cobblestone path
    g.clear();
    g.fillStyle(0x8B4513, 1);
    for (let i = 0; i < 35; i++) {
      g.fillRect(i * 35 + 12, 560, 8, 60);
      g.fillTriangle(i * 35 + 12, 560, i * 35 + 16, 545, i * 35 + 20, 560);
    }
    g.fillRect(0, 585, 1225, 10); g.fillRect(0, 610, 1225, 6);
    g.fillStyle(0x9A8A7A, 1); g.fillEllipse(600, 640, 80, 30);
    for (let c = 0; c < 20; c++) {
      g.fillStyle(0xA09888, 0.8);
      g.fillEllipse(400 + c * 22, 630 + (c % 3) * 8, 18, 10);
    }
    g.generateTexture('bg_village_4', 1200, 650);

    // Layer 5: Flowers, bushes, small tree
    g.clear();
    for (let i = 0; i < 7; i++) {
      const bx = i * 175 + 40;
      g.fillStyle(0x1E5E14, 1);
      g.fillEllipse(bx, 650, 80, 46); g.fillEllipse(bx - 28, 656, 52, 36); g.fillEllipse(bx + 28, 656, 54, 36);
      g.fillStyle(0x3A8A2A, 1);
      g.fillEllipse(bx - 8, 642, 58, 36); g.fillEllipse(bx + 22, 646, 44, 30); g.fillEllipse(bx - 30, 648, 36, 26);
      g.fillStyle(0x5CBF3E, 0.8);
      g.fillEllipse(bx - 14, 634, 36, 22); g.fillEllipse(bx + 14, 638, 28, 18);
      g.fillStyle(0x8CE860, 0.55);
      g.fillCircle(bx - 16, 634, 7); g.fillCircle(bx + 8, 638, 5);
      g.fillStyle(0xFFFFFF, 0.3);
      g.fillCircle(bx - 19, 632, 3.5);
    }
    g.fillStyle(0xFF0000, 1);
    for (let i = 0; i < 20; i++) { g.fillCircle(60 + i * 58, 635, 8); }
    g.fillStyle(0xFFFF00, 1);
    for (let i = 0; i < 16; i++) { g.fillCircle(90 + i * 72, 642, 6); }
    g.fillStyle(0xFF69B4, 1);
    for (let i = 0; i < 14; i++) { g.fillCircle(130 + i * 88, 640, 7); }
    // Small tree
    g.fillStyle(0x5D4037, 1); g.fillRect(1100, 580, 12, 70);
    g.fillStyle(0x2E6E1A, 0.9); g.fillEllipse(1106, 565, 55, 50);
    g.fillStyle(0x3A8A2A, 0.7); g.fillEllipse(1106, 558, 40, 35);
    g.generateTexture('bg_village_5', 1200, 700);

    // Layer 6: Path with cobblestone texture, edge plants
    g.clear();
    g.fillStyle(0xC4A676, 1); g.fillRect(0, 660, 1200, 60);
    g.fillStyle(0xB8985E, 1);
    for (let i = 0; i < 28; i++) { g.fillEllipse(i * 45 + 25, 680, 30, 18); }
    g.fillStyle(0xD4B88A, 0.6);
    for (let i = 0; i < 30; i++) { g.fillEllipse(i * 42 + 15, 670, 22, 12); }
    g.fillStyle(0x3A8A2A, 0.8);
    g.fillEllipse(50, 660, 60, 20); g.fillEllipse(350, 662, 50, 18);
    g.fillEllipse(700, 658, 55, 20); g.fillEllipse(1050, 662, 50, 18);
    g.generateTexture('bg_village_6', 1200, 720);

    // ==================== BEACH-ISLAND BIOME (7 LAYERS) ====================
    // Layer 0: Tropical sky with sun and distant seabirds
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0x8FE0E0, 0xFFF4DC, 44);
    g.fillStyle(0xFFF4C9, 0.16); g.fillEllipse(600, 775, 1300, 210);
    this.drawLightBeams(g, 1200, 800, 0xFFF8D0, 0.05);
    g.fillStyle(0xFFF4C0, 0.25); g.fillCircle(900, 120, 55);
    g.fillStyle(0xFFFFFF, 0.2); g.fillCircle(900, 120, 38);
    g.fillStyle(0x2A2A1A, 0.4);
    for (let s = 0; s < 6; s++) {
      const sx = 120 + s * 180; const sy = 90 + (s % 2) * 20;
      g.fillTriangle(sx, sy, sx + 10, sy - 7, sx + 16, sy);
      g.fillTriangle(sx + 16, sy, sx + 22, sy - 7, sx + 36, sy);
    }
    g.generateTexture('bg_beach_0', 1200, 800);

    // Layer 1: Ocean horizon with sailboats
    g.clear();
    g.fillStyle(0x006994, 0.6); g.fillRect(0, 350, 1200, 180);
    g.fillStyle(0x0088B8, 0.5); g.fillRect(0, 350, 1200, 60);
    g.fillStyle(0x00BFFF, 0.4);
    for (let i = 0; i < 28; i++) { g.fillEllipse(i * 50 + 25, 420, 45, 12); }
    // Sailboats
    g.fillStyle(0xFFFFFF, 0.5);
    g.fillTriangle(250, 370, 260, 340, 250, 350); g.fillRect(250, 370, 8, 8);
    g.fillTriangle(600, 380, 610, 348, 600, 358); g.fillRect(600, 380, 8, 8);
    g.fillTriangle(900, 365, 912, 335, 902, 345); g.fillRect(900, 365, 8, 8);
    g.generateTexture('bg_beach_1', 1200, 500);

    // Layer 2: Palm trees with shadows + cliff silhouette
    g.clear();
    g.fillStyle(0x3A2A1A, 0.5);
    g.fillRect(120, 350, 18, 250); g.fillRect(380, 330, 15, 270);
    g.fillRect(750, 340, 17, 260); g.fillRect(1050, 355, 14, 245);
    g.fillStyle(0x1E6E1E, 0.5);
    g.fillEllipse(120, 330, 95, 60); g.fillEllipse(380, 305, 85, 55);
    g.fillEllipse(750, 320, 90, 58); g.fillEllipse(1050, 335, 80, 52);
    g.fillStyle(0x1A2A0A, 0.15);
    g.fillEllipse(150, 590, 60, 12); g.fillEllipse(410, 595, 55, 10);
    g.fillEllipse(780, 595, 58, 11);
    // Cliff
    g.fillStyle(0x7A6A4A, 0.5); g.fillTriangle(1150, 600, 1200, 320, 1300, 600);
    g.fillStyle(0x8A7A5A, 0.4); g.fillTriangle(1160, 600, 1200, 340, 1280, 600);
    g.generateTexture('bg_beach_2', 1200, 650);

    // Layer 3: Waves with white foam
    g.clear();
    g.fillStyle(0x40E0D0, 0.6);
    for (let i = 0; i < 22; i++) { g.fillEllipse(i * 60 + 30, 520, 55, 18); }
    g.fillStyle(0x80F0E8, 0.5);
    for (let i = 0; i < 22; i++) { g.fillEllipse(i * 60 + 20, 515, 40, 10); }
    g.fillStyle(0xFFFFFF, 0.25);
    for (let i = 0; i < 20; i++) { g.fillEllipse(i * 65 + 35, 525, 30, 6); }
    g.generateTexture('bg_beach_3', 1400, 580);

    // Layer 4: Beach sand with seashells
    g.clear();
    g.fillStyle(0xF0C870, 1); g.fillRect(0, 550, 1200, 130);
    g.fillStyle(0xDEB060, 1);
    for (let i = 0; i < 35; i++) { g.fillEllipse(i * 38 + 20, 590, 30, 15); }
    g.fillStyle(0xE8C060, 0.7); g.fillRect(0, 550, 1200, 8);
    // Seashells
    g.fillStyle(0xFFF0E0, 0.8);
    g.fillEllipse(180, 600, 18, 12); g.fillEllipse(450, 610, 15, 10);
    g.fillEllipse(800, 595, 20, 13); g.fillEllipse(1100, 605, 16, 11);
    g.fillStyle(0xFFD8C0, 0.6);
    g.fillEllipse(180, 598, 12, 7); g.fillEllipse(800, 593, 13, 8);
    g.generateTexture('bg_beach_4', 1200, 680);

    // Layer 5: Shells, crab, starfish, pelican
    g.clear();
    g.fillStyle(0xFFFACD, 1);
    g.fillEllipse(120, 640, 25, 18); g.fillEllipse(380, 650, 22, 15);
    g.fillEllipse(700, 635, 28, 20); g.fillEllipse(1000, 645, 24, 17);
    // Crab
    g.fillStyle(0xFF6347, 1); g.fillEllipse(250, 645, 30, 22);
    g.fillTriangle(220, 630, 235, 622, 235, 635);
    g.fillTriangle(280, 630, 265, 622, 265, 635);
    g.fillStyle(0x1A1A1A, 0.7); g.fillCircle(240, 638, 2); g.fillCircle(260, 638, 2);
    // Starfish
    g.fillStyle(0xFF8830, 0.9);
    g.fillEllipse(550, 660, 24, 10); g.fillEllipse(552, 656, 12, 20);
    g.fillStyle(0xFFAA50, 0.6);
    g.fillEllipse(550, 657, 14, 6); g.fillEllipse(552, 653, 6, 12);
    // Pelican
    g.fillStyle(0xE8E8E0, 0.8); g.fillEllipse(850, 610, 35, 22);
    g.fillStyle(0xFFD8A0, 0.8); g.fillTriangle(815, 610, 805, 600, 805, 618);
    g.fillStyle(0x1A1A1A, 0.7); g.fillCircle(868, 605, 3);
    g.generateTexture('bg_beach_5', 1200, 700);

    // Layer 6: Foreground with palm fronds, rocks, tropical plants
    g.clear();
    g.fillStyle(0x1E6E1E, 0.9);
    for (let i = 0; i < 14; i++) {
      const x = i * 90 + 45;
      g.fillRect(x, 650, 8, 100); g.fillEllipse(x + 4, 650, 22, 38);
    }
    g.fillStyle(0x2E8A2E, 0.7);
    g.fillCircle(80, 692, 40); g.fillCircle(122, 688, 30); g.fillCircle(48, 696, 26);
    g.fillCircle(1078, 694, 40); g.fillCircle(1118, 688, 30); g.fillCircle(1044, 696, 26);
    g.fillStyle(0x54D848, 0.5);
    g.fillCircle(72, 684, 22); g.fillCircle(1110, 684, 22);
    g.fillStyle(0x7A6A4A, 0.6);
    g.fillEllipse(300, 720, 55, 30); g.fillEllipse(800, 725, 45, 25);
    g.fillStyle(0x8A7A5A, 0.4);
    g.fillEllipse(300, 715, 38, 18); g.fillEllipse(800, 720, 30, 15);
    g.generateTexture('bg_beach_6', 1400, 750);


    // ==================== FACTORY BIOME (7 LAYERS) ====================
    // Layer 0: Smoggy industrial sky with glowing furnaces
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0x5A6470, 0xC4CCD4, 40);
    g.fillStyle(0xFF8844, 0.10); g.fillRect(0, 450, 1200, 350);
    g.fillStyle(0xFFAA66, 0.08);
    g.fillEllipse(400, 500, 300, 80); g.fillEllipse(800, 520, 250, 60);
    this.softRadialHaze(g, 600, 200, 380, 0xE8EEF2, 0.12, 12);
    g.generateTexture('bg_factory_0', 1200, 800);

    // Layer 1: Industrial buildings with glowing windows
    g.clear();
    g.fillStyle(0x2F2F2F, 0.7);
    g.fillRect(60, 250, 100, 300); g.fillRect(250, 220, 120, 330);
    g.fillRect(500, 270, 90, 280); g.fillRect(700, 230, 110, 320);
    g.fillRect(920, 260, 95, 290);
    g.fillStyle(0x1a1a1a, 1);
    g.fillRect(100, 180, 25, 70); g.fillRect(300, 155, 30, 65);
    g.fillRect(730, 170, 28, 60);
    g.fillStyle(0xFF8800, 0.5);
    g.fillRect(75, 270, 20, 16); g.fillRect(115, 290, 20, 16);
    g.fillRect(270, 240, 24, 18); g.fillRect(310, 265, 20, 16);
    g.fillRect(720, 250, 22, 18); g.fillRect(760, 275, 20, 16);
    g.generateTexture('bg_factory_1', 1200, 600);

    // Layer 2: Gears with detailed teeth and hubs
    g.clear();
    g.fillStyle(0x5A5A5A, 0.8); g.fillCircle(180, 380, 75);
    g.fillStyle(0x6A6A6A, 0.8); g.fillCircle(500, 350, 100);
    g.fillStyle(0x888888, 0.8); g.fillCircle(850, 400, 88);
    g.fillStyle(0x404040, 1);
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      g.fillRect(105 + Math.cos(angle) * 65, 305 + Math.sin(angle) * 65, 15, 25);
    }
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      g.fillRect(468 + Math.cos(angle) * 85, 318 + Math.sin(angle) * 85, 18, 30);
    }
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      g.fillRect(810 + Math.cos(angle) * 78, 362 + Math.sin(angle) * 78, 15, 25);
    }
    g.fillStyle(0x333333, 1);
    g.fillCircle(180, 380, 18); g.fillCircle(500, 350, 22); g.fillCircle(850, 400, 20);
    g.fillStyle(0x555555, 0.6);
    g.fillCircle(180, 380, 10); g.fillCircle(500, 350, 12); g.fillCircle(850, 400, 11);
    g.generateTexture('bg_factory_2', 1200, 550);

    // Layer 3: Pipes with joints + steam vents
    g.clear();
    g.fillStyle(0x5A5A6A, 1);
    g.fillRect(0, 380, 1200, 25); g.fillRect(0, 440, 1200, 20);
    g.fillRect(0, 500, 1200, 30);
    g.fillStyle(0x4A4A4A, 1);
    g.fillRect(150, 365, 40, 50); g.fillRect(450, 425, 40, 45);
    g.fillRect(800, 485, 40, 55); g.fillRect(1100, 375, 40, 40);
    g.fillStyle(0x6A6A7A, 0.5);
    g.fillRect(0, 382, 1200, 5); g.fillRect(0, 442, 1200, 4);
    g.fillRect(0, 502, 1200, 6);
    g.fillStyle(0xCCCCCC, 0.2);
    g.fillEllipse(300, 360, 30, 15); g.fillEllipse(600, 355, 25, 12);
    g.fillEllipse(1000, 358, 28, 14);
    g.generateTexture('bg_factory_3', 1200, 580);

    // Layer 4: Conveyor belts with items and rollers
    g.clear();
    g.fillStyle(0x2A2A2A, 1); g.fillRect(0, 580, 1200, 50);
    g.fillStyle(0x404040, 1);
    for (let i = 0; i < 55; i++) { g.fillRect(i * 22 + 6, 588, 14, 36); }
    g.fillStyle(0x666666, 0.6);
    for (let i = 0; i < 55; i++) { g.fillCircle(i * 22 + 13, 595, 4); }
    g.fillStyle(0x888888, 0.7);
    g.fillEllipse(120, 578, 20, 14); g.fillEllipse(380, 576, 22, 16);
    g.fillEllipse(720, 580, 18, 12); g.fillEllipse(1020, 577, 20, 14);
    g.generateTexture('bg_factory_4', 1200, 650);

    // Layer 5: Sparks + glowing furnaces
    g.clear();
    g.fillStyle(0xFFD700, 0.9);
    for (let i = 0; i < 35; i++) {
      g.fillCircle((i * 67) % 1200, 420 + (i * 43) % 180, 2 + (i % 3));
    }
    g.fillStyle(0xFF4500, 0.8);
    for (let i = 0; i < 25; i++) {
      g.fillCircle((i * 89) % 1200, 460 + (i * 57) % 150, 3);
    }
    // Furnaces
    g.fillStyle(0xFF3300, 0.3);
    g.fillEllipse(200, 560, 80, 40); g.fillEllipse(650, 550, 100, 45);
    g.fillEllipse(1050, 555, 70, 38);
    g.fillStyle(0xFF8800, 0.5);
    g.fillEllipse(200, 558, 50, 22); g.fillEllipse(650, 548, 60, 25);
    g.fillEllipse(1050, 553, 44, 20);
    g.fillStyle(0xFFDD00, 0.7);
    g.fillEllipse(200, 556, 25, 10); g.fillEllipse(650, 546, 30, 12);
    g.fillEllipse(1050, 551, 22, 10);
    g.generateTexture('bg_factory_5', 1200, 650);

    // Layer 6: Smoke rising from stacks
    g.clear();
    g.fillStyle(0x555555, 0.5);
    g.fillEllipse(150, 120, 100, 60); g.fillEllipse(190, 70, 75, 50);
    g.fillEllipse(750, 150, 110, 65); g.fillEllipse(800, 95, 88, 55);
    g.fillEllipse(500, 110, 95, 58); g.fillEllipse(530, 60, 70, 45);
    g.fillEllipse(1000, 130, 85, 52); g.fillEllipse(1050, 80, 65, 40);
    g.fillStyle(0x666666, 0.35);
    g.fillEllipse(160, 100, 60, 35); g.fillEllipse(760, 120, 70, 40);
    g.fillEllipse(510, 80, 50, 30);
    g.fillStyle(0x1A1A1A, 0.9);
    g.fillRect(130, 155, 20, 25); g.fillRect(285, 130, 25, 25);
    g.fillRect(715, 145, 22, 25);
    g.generateTexture('bg_factory_6', 1200, 250);

    // ==================== VOLCANO-LAVA BIOME (7 LAYERS) ====================
    // Layer 0: Dark ashy sky with red glow and ash particles
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0x2A0A0A, 0xC47070, 48);
    g.fillStyle(0xFF4A28, 0.12); g.fillRect(0, 500, 1200, 300);
    g.fillStyle(0xFF8848, 0.08); g.fillEllipse(600, 700, 800, 250);
    this.softRadialHaze(g, 600, 560, 620, 0x5A1006, 0.42, 12);
    this.softRadialHaze(g, 300, 300, 320, 0x40100A, 0.28, 10);
    this.softRadialHaze(g, 950, 220, 300, 0x40100A, 0.28, 10);
    // Ash
    g.fillStyle(0x333333, 0.3);
    for (let a = 0; a < 40; a++) {
      g.fillCircle((a * 59 + 17) % 1200, (a * 37 + 11) % 600, 1.5 + (a % 4));
    }
    g.generateTexture('bg_volcano_0', 1200, 800);

    // Layer 1: Lava glow, distant eruption, magma rivers
    g.clear();
    g.fillStyle(0xFF3300, 0.3); g.fillRect(0, 500, 1200, 300);
    g.fillStyle(0xFF5500, 0.25); g.fillRect(0, 580, 1200, 220);
    g.fillStyle(0xFF8800, 0.15); g.fillRect(0, 450, 1200, 350);
    g.fillStyle(0xFF6600, 0.2);
    g.fillEllipse(600, 200, 120, 100); g.fillEllipse(600, 130, 80, 80);
    g.fillStyle(0xFF4400, 0.15); g.fillEllipse(580, 100, 60, 50);
    g.fillStyle(0xFF0000, 0.15);
    g.fillTriangle(200, 800, 300, 350, 400, 800);
    g.fillTriangle(700, 800, 800, 320, 900, 800);
    g.generateTexture('bg_volcano_1', 1200, 800);

    // Layer 2: Volcanic mountains with lava streams + eruption
    g.clear();
    g.fillStyle(0x3E3E42, 0.85);
    g.fillEllipse(300, 560, 640, 420); g.fillEllipse(700, 560, 640, 480); g.fillEllipse(1100, 560, 640, 400);
    g.fillStyle(0x2E2E34, 0.7);
    g.fillEllipse(700, 560, 480, 420); g.fillEllipse(1100, 560, 420, 320);
    g.fillStyle(0xFF5A2A, 0.55);
    g.fillEllipse(300, 470, 260, 130); g.fillEllipse(700, 450, 300, 150);
    g.fillStyle(0xFF8A3A, 0.45);
    g.fillEllipse(300, 455, 170, 80); g.fillEllipse(700, 435, 200, 95);
    g.fillStyle(0xFFC05A, 0.3);
    g.fillEllipse(300, 445, 90, 40); g.fillEllipse(700, 425, 110, 48);
    g.fillStyle(0xFF8800, 0.35); g.fillCircle(700, 100, 35);
    g.fillStyle(0xFFDD00, 0.18); g.fillCircle(700, 100, 18);
    g.generateTexture('bg_volcano_2', 1400, 550);

    // Layer 3: Falling volcanic rocks + fire sparks
    g.clear();
    g.fillStyle(0x3A3A3A, 1);
    for (let i = 0; i < 40; i++) {
      g.fillEllipse((i * 53) % 1200, (i * 37) % 500, 6 + (i % 10), (6 + (i % 10)) * 0.7);
    }
    g.fillStyle(0x505050, 0.6);
    for (let i = 0; i < 25; i++) {
      g.fillEllipse((i * 73) % 1200, (i * 61) % 450, 3 + (i % 6), (3 + (i % 6)) * 0.7);
    }
    g.fillStyle(0xFF6600, 0.5);
    for (let i = 0; i < 15; i++) {
      g.fillCircle((i * 131 + 45) % 1200, (i * 91 + 22) % 500, 2 + (i % 3));
    }
    g.generateTexture('bg_volcano_3', 1200, 550);

    // Layer 4: Smoke clouds with ash, steam
    g.clear();
    g.fillStyle(0x2A2A2A, 0.7);
    g.fillEllipse(180, 180, 150, 100); g.fillEllipse(500, 120, 180, 110);
    g.fillEllipse(800, 160, 160, 105); g.fillEllipse(1050, 140, 130, 85);
    g.fillStyle(0x404040, 0.5);
    g.fillEllipse(250, 100, 100, 60); g.fillEllipse(620, 75, 120, 72);
    g.fillEllipse(880, 90, 110, 68);
    g.fillStyle(0x555555, 0.35);
    g.fillEllipse(200, 120, 70, 40); g.fillEllipse(550, 80, 80, 45);
    g.fillEllipse(850, 100, 75, 42);
    g.fillStyle(0x886644, 0.25);
    g.fillEllipse(300, 350, 180, 80); g.fillEllipse(700, 330, 160, 70);
    g.generateTexture('bg_volcano_4', 1200, 250);

    // Layer 5: Lava pools with glow + cooled crust
    g.clear();
    g.fillStyle(0x5A0000, 1);
    g.fillEllipse(150, 620, 180, 60); g.fillEllipse(500, 640, 250, 70);
    g.fillEllipse(850, 615, 220, 65); g.fillEllipse(1100, 630, 170, 55);
    g.fillStyle(0xFF2200, 0.8);
    g.fillEllipse(150, 610, 120, 35); g.fillEllipse(500, 630, 180, 42);
    g.fillEllipse(850, 605, 150, 38);
    g.fillStyle(0xFF6600, 0.6);
    g.fillEllipse(150, 608, 80, 20); g.fillEllipse(500, 625, 120, 25);
    g.fillEllipse(850, 602, 100, 22);
    g.fillStyle(0xFFDD00, 0.5);
    g.fillEllipse(150, 606, 40, 10); g.fillEllipse(500, 622, 60, 12);
    g.fillEllipse(850, 600, 45, 11);
    g.fillStyle(0x1A1A1A, 0.6);
    for (let c = 0; c < 20; c++) {
      g.fillEllipse(120 + c * 50 + (c % 2) * 10, 640 + (c % 3) * 10, 15, 5);
    }
    g.generateTexture('bg_volcano_5', 1400, 720);

    // Layer 6: Ember particles + lava bombs
    g.clear();
    g.fillStyle(0xFF4400, 1);
    for (let i = 0; i < 55; i++) {
      g.fillCircle((i * 41) % 1200, 700 - (i * 23) % 400, 2 + (i % 4));
    }
    g.fillStyle(0xFFD700, 0.8);
    for (let i = 0; i < 45; i++) {
      g.fillCircle((i * 67) % 1200, 700 - (i * 31) % 450, 1 + (i % 3));
    }
    g.fillStyle(0xFF8800, 0.7);
    for (let i = 0; i < 30; i++) {
      g.fillCircle((i * 89) % 1200, 680 - (i * 41) % 350, 1.5 + (i % 2));
    }
    g.fillStyle(0xFF3300, 0.6);
    g.fillEllipse(300, 680, 16, 10); g.fillEllipse(700, 650, 12, 8);
    g.fillEllipse(1000, 670, 14, 9);
    g.generateTexture('bg_volcano_6', 1200, 750);

    // ==================== HAUNTED-MANSION BIOME (7 LAYERS) ====================
    // Layer 0: Stormy night sky with lightning and dark clouds
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 460, 0x141428, 0x3D2A5E, 30);
    this.fillVGradient(g, 0, 460, 1200, 340, 0x3D2A5E, 0x241430, 24);
    this.softRadialHaze(g, 600, 300, 560, 0x1A1030, 0.4, 12);
    this.softRadialHaze(g, 250, 180, 340, 0x100A20, 0.26, 10);
    this.softRadialHaze(g, 1000, 160, 320, 0x100A20, 0.26, 10);
    // Storm clouds
    g.fillStyle(0x1A1A2E, 0.6);
    g.fillCircle(200, 140, 90); g.fillCircle(320, 120, 75); g.fillCircle(150, 160, 60);
    g.fillCircle(600, 150, 85); g.fillCircle(750, 130, 70); g.fillCircle(550, 170, 55);
    g.fillCircle(1000, 140, 80); g.fillCircle(1130, 125, 65); g.fillCircle(950, 160, 55);
    // Lightning
    g.fillStyle(0xFFFFEE, 0.4);
    g.fillRect(750, 0, 4, 50); g.fillRect(740, 50, 3, 40);
    g.fillRect(755, 90, 3, 35); g.fillRect(748, 125, 2, 30);
    g.fillStyle(0xFFFFDD, 0.2); g.fillRect(748, 0, 10, 80);
    g.generateTexture('bg_haunted_0', 1200, 800);

    // Layer 1: Full moon with craters + bats
    g.clear();
    g.fillStyle(0xFFFFDD, 0.15); g.fillCircle(800, 100, 65);
    g.fillStyle(0xFFFFEE, 0.9); g.fillCircle(800, 100, 48);
    g.fillStyle(0x0D0D1A, 1); g.fillCircle(788, 92, 36);
    g.fillStyle(0xCCCCAA, 0.55);
    g.fillCircle(815, 108, 6); g.fillCircle(795, 88, 5);
    g.fillCircle(808, 90, 4); g.fillCircle(822, 98, 3);
    g.fillStyle(0x08080A, 1);
    for (let i = 0; i < 10; i++) {
      const bx = 100 + i * 80; const by = 80 + (i % 3) * 30;
      g.fillEllipse(bx, by, 16, 8);
      g.fillTriangle(bx - 8, by, bx - 16, by - 10, bx - 6, by + 5);
      g.fillTriangle(bx + 8, by, bx + 16, by - 10, bx + 6, by + 5);
    }
    g.generateTexture('bg_haunted_1', 1200, 200);

    // Layer 2: Gothic architecture, dead trees, iron fence
    g.clear();
    g.fillStyle(0x1a1a2e, 0.9);
    g.fillRect(120, 250, 18, 300); g.fillRect(85, 310, 50, 10);
    g.fillRect(72, 350, 62, 8); g.fillRect(60, 390, 75, 6);
    g.fillRect(350, 220, 15, 330); g.fillRect(310, 275, 55, 9);
    g.fillRect(295, 325, 68, 7);
    g.fillRect(750, 240, 17, 310); g.fillRect(710, 300, 48, 10);
    g.fillRect(695, 365, 58, 8);
    g.fillRect(1050, 230, 16, 320); g.fillRect(1015, 290, 45, 9);
    g.fillRect(1000, 350, 55, 7);
    // Gothic mansion
    g.fillStyle(0x1A081A, 0.85);
    g.fillRect(500, 250, 160, 300); g.fillTriangle(485, 250, 675, 250, 580, 150);
    g.fillRect(540, 240, 12, 310); g.fillRect(610, 240, 12, 310);
    g.fillStyle(0xFF8800, 0.3);
    g.fillRect(530, 400, 16, 20); g.fillRect(560, 400, 16, 20);
    g.fillRect(615, 420, 16, 20); g.fillRect(645, 420, 16, 20);
    g.generateTexture('bg_haunted_2', 1200, 600);

    // Layer 3: Gravestones + iron fence
    g.clear();
    g.fillStyle(0x3a3a4a, 1);
    g.fillRect(100, 550, 50, 75); g.fillTriangle(87, 550, 137, 550, 112, 510);
    g.fillRect(250, 565, 45, 60);
    g.fillRect(430, 540, 60, 85); g.fillTriangle(415, 540, 490, 540, 452, 490);
    g.fillRect(620, 555, 48, 68);
    g.fillRect(840, 545, 55, 80); g.fillTriangle(825, 545, 892, 545, 858, 500);
    g.fillRect(1020, 560, 42, 65);
    // Iron fence
    g.fillStyle(0x1A0A1A, 0.9);
    for (let i = 0; i < 30; i++) {
      g.fillRect(i * 40 + 15, 590, 4, 50);
      g.fillTriangle(i * 40 + 15, 590, i * 40 + 17, 580, i * 40 + 19, 590);
    }
    g.fillRect(0, 618, 1200, 4); g.fillRect(0, 630, 1200, 3);
    g.generateTexture('bg_haunted_3', 1200, 680);

    // Layer 4: Fog layers with mist
    g.clear();
    g.fillStyle(0x3A3A4A, 0.3);
    g.fillEllipse(150, 600, 380, 100); g.fillEllipse(500, 630, 420, 110);
    g.fillEllipse(900, 590, 350, 90); g.fillEllipse(1100, 615, 300, 85);
    g.fillStyle(0x4A4A5A, 0.2);
    g.fillEllipse(300, 650, 300, 70); g.fillEllipse(700, 670, 350, 80);
    g.fillStyle(0x5A5A6A, 0.15);
    g.fillEllipse(500, 700, 600, 90); g.fillEllipse(1100, 680, 400, 75);
    g.generateTexture('bg_haunted_4', 1400, 750);

    // Layer 5: Bats in flight
    g.clear();
    g.fillStyle(0x000000, 1);
    for (let i = 0; i < 20; i++) {
      const x = 80 + i * 58; const y = 120 + (i % 5) * 50;
      g.fillEllipse(x, y, 18, 10);
      g.fillTriangle(x - 10, y, x - 20, y - 12, x - 10, y + 6);
      g.fillTriangle(x + 10, y, x + 20, y - 12, x + 10, y + 6);
    }
    // Ghost orbs
    g.fillStyle(0x8888FF, 0.2);
    g.fillCircle(300, 200, 12); g.fillCircle(600, 250, 14);
    g.fillCircle(900, 180, 10); g.fillCircle(1100, 220, 12);
    g.fillStyle(0xAAAAFF, 0.15);
    g.fillCircle(300, 198, 6); g.fillCircle(600, 248, 7);
    g.fillCircle(900, 178, 5); g.fillCircle(1100, 218, 6);
    g.generateTexture('bg_haunted_5', 1200, 400);

    // Layer 6: Dead grass + mist tendrils
    g.clear();
    g.fillStyle(0x2a2a3a, 1);
    for (let i = 0; i < 55; i++) {
      const x = i * 22 + 12;
      g.fillRect(x, 640, 3, 60 + (i % 6) * 12);
    }
    g.fillStyle(0x1A1A2A, 0.7);
    for (let i = 0; i < 50; i++) {
      const x = i * 25 + 10;
      g.fillRect(x, 660, 2.5, 45 + (i % 5) * 10);
    }
    // Ground mist wisps
    g.fillStyle(0x444466, 0.12);
    g.fillEllipse(200, 700, 250, 40); g.fillEllipse(600, 710, 280, 35);
    g.fillEllipse(1000, 705, 220, 38);
    g.generateTexture('bg_haunted_6', 1200, 750);


    // ==================== RUINS BIOME (7 LAYERS) ====================
    // Layer 0: Tropical sunset sky with haze
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0x7A3060, 0xFFF8D0, 48);
    g.fillStyle(0xFFE288, 0.16); g.fillRect(0, 600, 1200, 200);
    g.fillStyle(0xFFF4C9, 0.12); g.fillEllipse(600, 760, 1200, 180);
    // Distant jungle canopy
    g.fillStyle(0x2C7A28, 0.22);
    g.fillEllipse(250, 680, 500, 80); g.fillEllipse(800, 660, 400, 70);
    g.generateTexture('bg_ruins_0', 1200, 800);

    // Layer 1: Ancient temple silhouettes with jungle encroachment
    g.clear();
    g.fillStyle(0x4a3a2a, 0.6);
    g.fillRect(120, 250, 150, 250); g.fillRect(380, 225, 125, 275);
    g.fillRect(650, 240, 170, 260); g.fillRect(900, 215, 120, 285);
    g.fillStyle(0x5a4a3a, 0.7);
    g.fillRect(145, 275, 25, 225); g.fillRect(195, 275, 25, 225);
    g.fillRect(415, 250, 22, 250); g.fillRect(465, 250, 22, 250);
    g.fillRect(690, 270, 28, 230); g.fillRect(760, 270, 28, 230);
    // Jungle vines on temples
    g.fillStyle(0x1A5A1A, 0.35);
    g.fillRect(100, 280, 8, 150); g.fillRect(380, 250, 6, 180);
    g.fillRect(640, 270, 7, 160);
    g.fillEllipse(104, 280, 14, 25); g.fillEllipse(383, 250, 12, 20);
    g.generateTexture('bg_ruins_1', 1200, 550);

    // Layer 2: Broken pillars + overgrown statues
    g.clear();
    g.fillStyle(0x6a5a4a, 0.8);
    g.fillRect(100, 380, 38, 180); g.fillRect(250, 440, 32, 120);
    g.fillRect(500, 400, 42, 160); g.fillRect(700, 350, 35, 210);
    g.fillRect(900, 420, 40, 140);
    g.fillStyle(0x8A7A6A, 0.6);
    g.fillRect(103, 380, 15, 180); g.fillRect(503, 400, 16, 160);
    g.fillRect(703, 350, 13, 210);
    // Fallen column
    g.fillStyle(0x6a5a4a, 0.7);
    g.fillEllipse(350, 550, 120, 25);
    g.fillStyle(0x8A7A6A, 0.5);
    g.fillEllipse(345, 548, 90, 16);
    g.generateTexture('bg_ruins_2', 1200, 600);

    // Layer 3: Vines + overgrown jungle plants
    g.clear();
    g.fillStyle(0x1A6A1A, 0.7);
    for (let i = 0; i < 18; i++) {
      const x = i * 70 + 30;
      g.fillRect(x, 0, 6, 250 + (i % 3) * 60);
      g.fillEllipse(x + 3, 250 + (i % 3) * 60, 15, 25);
    }
    g.fillStyle(0x2A8A2A, 0.5);
    for (let i = 0; i < 12; i++) {
      const x = i * 100 + 50;
      g.fillEllipse(x + 3, 200 + (i % 4) * 30, 20, 35);
    }
    g.generateTexture('bg_ruins_3', 1200, 350);

    // Layer 4: Fallen stones + scattered rocks
    g.clear();
    g.fillStyle(0x5a5a4a, 1);
    g.fillEllipse(120, 580, 75, 50); g.fillEllipse(380, 610, 100, 60);
    g.fillEllipse(650, 570, 70, 45); g.fillEllipse(900, 595, 85, 55);
    g.fillEllipse(1100, 575, 65, 42);
    g.fillStyle(0x7A7A6A, 0.6);
    g.fillEllipse(120, 575, 55, 32); g.fillEllipse(380, 605, 75, 38);
    g.fillEllipse(900, 590, 62, 34);
    // Small scattered stones
    g.fillStyle(0x6A6A5A, 0.5);
    g.fillEllipse(200, 600, 25, 14); g.fillEllipse(480, 580, 20, 12);
    g.fillEllipse(750, 595, 22, 13); g.fillEllipse(1020, 590, 18, 10);
    g.generateTexture('bg_ruins_4', 1200, 680);

    // Layer 5: Moss patches + overgrown ground
    g.clear();
    g.fillStyle(0x2a5a2a, 0.8);
    g.fillEllipse(150, 650, 100, 45); g.fillEllipse(420, 670, 110, 50);
    g.fillEllipse(750, 640, 95, 42); g.fillEllipse(1000, 660, 105, 48);
    g.fillStyle(0x3A7A3A, 0.6);
    g.fillEllipse(150, 644, 72, 28); g.fillEllipse(420, 664, 78, 32);
    g.fillEllipse(1000, 654, 74, 30);
    g.fillStyle(0x4A8A3A, 0.4);
    g.fillEllipse(280, 660, 60, 22); g.fillEllipse(600, 650, 55, 20);
    g.fillEllipse(880, 658, 58, 24);
    g.generateTexture('bg_ruins_5', 1200, 720);

    // Layer 6: Detailed statues + jungle flora foreground
    g.clear();
    g.fillStyle(0x808080, 1);
    g.fillRect(120, 500, 50, 125); g.fillCircle(145, 475, 32);
    g.fillRect(500, 530, 45, 100); g.fillCircle(522, 505, 26);
    g.fillRect(880, 490, 55, 135); g.fillCircle(907, 458, 35);
    g.fillStyle(0x9A9A9A, 0.6);
    g.fillCircle(140, 470, 22); g.fillCircle(518, 500, 18);
    g.fillCircle(902, 452, 25);
    // Statue moss
    g.fillStyle(0x3A6A3A, 0.4);
    g.fillEllipse(145, 478, 20, 8); g.fillEllipse(522, 508, 16, 6);
    g.fillEllipse(907, 460, 22, 9);
    // Small vines
    g.fillStyle(0x1A6A1A, 0.6);
    g.fillRect(125, 530, 4, 50); g.fillRect(505, 550, 4, 40);
    g.fillRect(885, 520, 5, 55);
    g.generateTexture('bg_ruins_6', 1200, 680);

    // ==================== CANYON-BASE BIOME (7 LAYERS) ====================
    // Layer 0: Red/orange canyon sky with layered atmosphere
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0x8A4A3A, 0xFFD98A, 48);
    g.fillStyle(0xFFC88A, 0.16); g.fillRect(0, 600, 1200, 200);
    g.fillStyle(0xFFE0AC, 0.14); g.fillEllipse(600, 740, 1200, 190);
    this.softRadialHaze(g, 600, 260, 380, 0xFFE8C4, 0.12, 12);
    g.generateTexture('bg_canyon_0', 1200, 800);

    // Layer 1: Far canyon walls with rock striations
    g.clear();
    g.fillStyle(0xB87A5A, 0.55);
    g.fillEllipse(300, 620, 640, 500); g.fillEllipse(750, 620, 760, 560); g.fillEllipse(1200, 620, 720, 500);
    g.fillStyle(0xD89A74, 0.42);
    g.fillEllipse(300, 610, 480, 380); g.fillEllipse(750, 610, 560, 430); g.fillEllipse(1200, 610, 520, 380);
    g.fillStyle(0xF0BE92, 0.32);
    g.fillEllipse(300, 540, 320, 200); g.fillEllipse(760, 520, 360, 220); g.fillEllipse(1180, 545, 300, 190);
    // Striations (horizontal color bands)
    g.fillStyle(0x8A5A3A, 0.35);
    g.fillRect(0, 480, 1400, 8); g.fillRect(0, 510, 1400, 6);
    g.fillStyle(0x9A6A4A, 0.3);
    g.fillRect(0, 360, 1400, 7); g.fillRect(0, 390, 1400, 6);
    g.generateTexture('bg_canyon_1', 1400, 600);

    // Layer 2: Mid canyon layers with color striations
    g.clear();
    g.fillStyle(0xC47A50, 0.6);
    g.fillEllipse(200, 620, 440, 400); g.fillEllipse(550, 620, 520, 440); g.fillEllipse(900, 620, 560, 380);
    g.fillStyle(0xE09A6C, 0.45);
    g.fillEllipse(200, 610, 330, 300); g.fillEllipse(560, 610, 380, 330); g.fillEllipse(900, 610, 400, 290);
    g.fillStyle(0xF4BE92, 0.3);
    g.fillEllipse(210, 540, 240, 150); g.fillEllipse(570, 520, 280, 170); g.fillEllipse(880, 545, 300, 150);
    g.fillStyle(0xAA6A4A, 0.55);
    g.fillRect(0, 420, 1400, 14); g.fillRect(0, 480, 1400, 12);
    g.fillRect(0, 530, 1400, 10);
    g.fillStyle(0xCC8A5A, 0.4);
    g.fillRect(0, 370, 1400, 10); g.fillRect(0, 450, 1400, 8);
    g.generateTexture('bg_canyon_2', 1400, 600);

    // Layer 3: Canyon floor with river below
    g.clear();
    g.fillStyle(0xAA8050, 1);
    g.fillRect(0, 600, 1200, 100);
    g.fillStyle(0xC8A060, 0.8);
    for (let i = 0; i < 28; i++) { g.fillEllipse(i * 45 + 25, 640, 35, 18); }
    // River
    g.fillStyle(0x4A80D0, 0.4);
    g.fillEllipse(600, 660, 300, 25);
    g.fillStyle(0x6AA0F0, 0.3);
    g.fillEllipse(600, 658, 220, 16);
    g.fillStyle(0x8AC0FF, 0.2);
    g.fillEllipse(600, 656, 130, 8);
    g.generateTexture('bg_canyon_3', 1200, 700);

    // Layer 4: Rock formations / hoodoos
    g.clear();
    g.fillStyle(0x7A3A2A, 0.9);
    g.fillTriangle(120, 500, 180, 300, 240, 500);
    g.fillTriangle(420, 520, 510, 250, 600, 520);
    g.fillTriangle(720, 480, 820, 220, 920, 480);
    g.fillTriangle(1050, 510, 1150, 280, 1250, 510);
    g.fillStyle(0x9A5A3A, 0.6);
    g.fillTriangle(132, 500, 180, 330, 228, 500);
    g.fillTriangle(432, 520, 510, 290, 588, 520);
    g.fillTriangle(732, 480, 820, 270, 908, 480);
    g.fillTriangle(1062, 510, 1150, 320, 1238, 510);
    // Rock striations
    g.fillStyle(0xAA6A4A, 0.4);
    g.fillRect(120, 450, 300, 6); g.fillRect(420, 440, 280, 5);
    g.fillRect(720, 430, 320, 6);
    g.generateTexture('bg_canyon_4', 1400, 600);

    // Layer 5: Eagles soaring in canyon updrafts
    g.clear();
    g.fillStyle(0x2F2F2F, 1);
    for (let i = 0; i < 12; i++) {
      const x = 100 + i * 100; const y = 180 + (i % 4) * 60;
      g.fillEllipse(x, y, 25, 10);
      g.fillTriangle(x - 15, y, x - 32, y - 18, x - 15, y + 6);
      g.fillTriangle(x + 15, y, x + 32, y - 18, x + 15, y + 6);
    }
    // Small distant birds
    g.fillStyle(0x3A2A2A, 0.7);
    for (let b = 0; b < 8; b++) {
      const bx = 150 + b * 140; const by = 120 + (b % 3) * 25;
      g.fillTriangle(bx, by, bx + 6, by - 4, bx + 9, by);
      g.fillTriangle(bx + 9, by, bx + 12, by - 4, bx + 20, by);
    }
    // Wind swirls
    g.fillStyle(0xFFD8A0, 0.04);
    for (let w = 0; w < 6; w++) {
      g.fillEllipse(150 + w * 200, 250 + (w % 2) * 30, 60, 8);
    }
    g.generateTexture('bg_canyon_5', 1400, 400);

    // Layer 6: Dust particles + desert varnish
    g.clear();
    g.fillStyle(0xAA8050, 0.5);
    for (let i = 0; i < 70; i++) {
      g.fillCircle((i * 37) % 1200, 500 + (i * 23) % 200, 1 + (i % 3));
    }
    g.fillStyle(0xC8A060, 0.3);
    for (let i = 0; i < 50; i++) {
      g.fillCircle((i * 53) % 1200, 550 + (i * 41) % 180, 1.5 + (i % 2));
    }
    // Small foreground rocks
    g.fillStyle(0x6A3A2A, 0.6);
    g.fillEllipse(200, 720, 40, 20); g.fillEllipse(600, 725, 35, 18);
    g.fillEllipse(1000, 715, 38, 22);
    g.generateTexture('bg_canyon_6', 1200, 750);

    // ==================== SPACE-STAR BIOME (7 LAYERS) ====================
    // Layer 0: Deep space with colorful nebula backdrop
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0x101030, 0x2E2E66, 40);
    this.softRadialHaze(g, 600, 320, 520, 0x3A3A88, 0.12, 12);
    // Nebula clouds
    g.fillStyle(0x5A2AA8, 0.14); g.fillEllipse(300, 300, 400, 200);
    g.fillStyle(0x2A7AC8, 0.10); g.fillEllipse(800, 350, 350, 180);
    g.fillStyle(0xC83878, 0.08); g.fillEllipse(200, 500, 300, 160);
    g.fillStyle(0x8030CC, 0.10); g.fillEllipse(1000, 250, 250, 140);
    g.generateTexture('bg_space_0', 1200, 800);

    // Layer 1: Stars of varying brightness and colors
    g.clear();
    g.fillStyle(0xFFFFFF, 0.9);
    for (let i = 0; i < 150; i++) {
      g.fillCircle((i * 73) % 1200, (i * 47) % 800, 0.5 + (i % 3) * 0.5);
    }
    g.fillStyle(0xFFFF88, 0.7);
    for (let i = 0; i < 30; i++) {
      g.fillCircle((i * 97 + 33) % 1200, (i * 83 + 17) % 780, 1 + (i % 2));
    }
    g.fillStyle(0x88BBFF, 0.7);
    for (let i = 0; i < 25; i++) {
      g.fillCircle((i * 113 + 55) % 1200, (i * 91 + 29) % 790, 1 + (i % 2));
    }
    g.fillStyle(0xFF8888, 0.6);
    for (let i = 0; i < 20; i++) {
      g.fillCircle((i * 127 + 77) % 1200, (i * 71 + 41) % 785, 0.8 + (i % 2) * 0.5);
    }
    g.generateTexture('bg_space_1', 1200, 800);

    // Layer 2: Complex nebula clouds
    g.clear();
    g.fillStyle(0x4B0082, 0.2); g.fillEllipse(250, 250, 250, 130);
    g.fillStyle(0x5A10A0, 0.15); g.fillEllipse(220, 260, 200, 100);
    g.fillStyle(0x0000FF, 0.15); g.fillEllipse(650, 380, 320, 150);
    g.fillStyle(0x2222FF, 0.12); g.fillEllipse(620, 360, 250, 110);
    g.fillStyle(0xFF1493, 0.1); g.fillEllipse(850, 200, 190, 100);
    g.fillStyle(0xFF2288, 0.08); g.fillEllipse(820, 180, 150, 70);
    g.fillStyle(0x00FFFF, 0.06); g.fillEllipse(1050, 300, 200, 110);
    // Nebula dust lanes
    g.fillStyle(0x000000, 0.3);
    g.fillEllipse(400, 330, 180, 30); g.fillEllipse(700, 370, 140, 20);
    g.generateTexture('bg_space_2', 1200, 550);

    // Layer 3: Multiple planets with detail
    g.clear();
    // Gas giant with rings
    g.fillStyle(0xCD853F, 1); g.fillCircle(200, 200, 50);
    g.fillStyle(0xDEB887, 1); g.fillEllipse(200, 200, 75, 10);
    g.fillStyle(0x8B6914, 0.6); g.fillEllipse(200, 190, 30, 6);
    // Blue planet
    g.fillStyle(0x1A4A8A, 1); g.fillCircle(700, 320, 70);
    g.fillStyle(0x2A6AAA, 1); g.fillCircle(690, 310, 45);
    g.fillStyle(0x208020, 0.5); g.fillEllipse(700, 280, 40, 15);
    // Small moon
    g.fillStyle(0x888888, 1); g.fillCircle(900, 130, 25);
    g.fillStyle(0xAAAAAA, 1); g.fillCircle(895, 125, 12);
    g.fillStyle(0x555555, 0.6);
    g.fillCircle(908, 135, 4); g.fillCircle(895, 120, 3);
    // Ringed planet far right
    g.fillStyle(0xAA7744, 1); g.fillCircle(1100, 350, 35);
    g.fillStyle(0xCC9966, 0.7); g.fillEllipse(1100, 350, 55, 6);
    g.generateTexture('bg_space_3', 1200, 500);

    // Layer 4: Asteroid belt with varied sizes
    g.clear();
    for (let i = 0; i < 35; i++) {
      const x = (i * 67) % 1200; const y = (i * 43) % 600;
      const size = 10 + (i % 12);
      g.fillStyle(0x505050 + (i % 3) * 0x101010, 1);
      g.fillEllipse(x, y, size, size * 0.8);
      g.fillStyle(0x808080 + (i % 3) * 0x101010, 0.5);
      g.fillEllipse(x - size * 0.2, y - size * 0.15, size * 0.5, size * 0.3);
    }
    g.generateTexture('bg_space_4', 1200, 650);

    // Layer 5: Space station + satellites with solar panels
    g.clear();
    // Space station
    g.fillStyle(0xA0A0A0, 1);
    g.fillRect(400, 350, 250, 40);
    g.fillRect(440, 330, 30, 20); g.fillRect(580, 330, 30, 20);
    g.fillRect(440, 390, 30, 20); g.fillRect(580, 390, 30, 20);
    g.fillStyle(0x00BFFF, 0.8); g.fillRect(415, 360, 220, 20);
    g.fillStyle(0xFFFFFF, 0.3); g.fillRect(415, 362, 220, 3);
    // Solar panels
    g.fillStyle(0x2244AA, 0.8); g.fillRect(330, 345, 70, 12);
    g.fillRect(330, 383, 70, 12);
    g.fillStyle(0x3366CC, 0.5);
    g.fillRect(330, 345, 70, 3); g.fillRect(330, 383, 70, 3);
    g.fillStyle(0x2244AA, 0.8); g.fillRect(650, 345, 70, 12);
    g.fillRect(650, 383, 70, 12);
    g.fillStyle(0x3366CC, 0.5);
    g.fillRect(650, 345, 70, 3); g.fillRect(650, 383, 70, 3);
    // Small satellite
    g.fillStyle(0xC0C0C0, 1);
    g.fillRect(250, 120, 80, 10); g.fillRect(235, 112, 100, 22);
    g.fillStyle(0x00FF00, 1); g.fillCircle(250, 128, 5);
    // Shooting star
    g.fillStyle(0xFFFFFF, 0.6);
    g.fillRect(100, 70, 50, 3); g.fillRect(90, 72, 15, 2);
    g.fillStyle(0xFFFFFF, 0.3);
    g.fillRect(140, 65, 20, 2.5);
    g.generateTexture('bg_space_5', 1200, 450);

    // Layer 6: Close-up asteroid + space debris
    g.clear();
    // Large near asteroid
    g.fillStyle(0x606060, 0.9);
    g.fillEllipse(200, 550, 120, 80);
    g.fillStyle(0x808080, 0.6);
    g.fillEllipse(190, 540, 70, 40);
    g.fillStyle(0x444444, 0.5);
    g.fillCircle(220, 560, 8); g.fillCircle(180, 545, 6); g.fillCircle(200, 575, 5);
    // Small debris
    g.fillStyle(0x707070, 0.7);
    for (let d = 0; d < 20; d++) {
      g.fillEllipse(600 + d * 30, 520 + (d % 3) * 25, 8 + (d % 4) * 3, 6 + (d % 3) * 2);
    }
    // Another small meteor
    g.fillStyle(0x555555, 0.8);
    g.fillEllipse(900, 480, 45, 30);
    g.fillStyle(0x777777, 0.5);
    g.fillEllipse(895, 475, 25, 15);
    // Distant star clusters
    g.fillStyle(0xFFFFFF, 0.3);
    for (let c = 0; c < 15; c++) {
      g.fillCircle(400 + c * 55, 600 + (c % 3) * 20, 1.5);
    }
    g.generateTexture('bg_space_6', 1200, 650);

    // ==================== CASTLE-FINAL BIOME (7 LAYERS) ====================
    // Layer 0: Midnight sky with dark clouds
    g.clear();
    this.fillVGradient(g, 0, 0, 1200, 800, 0x141438, 0x3A3A9C, 40);
    // Dark clouds
    g.fillStyle(0x2A2A55, 0.5);
    g.fillCircle(200, 120, 100); g.fillCircle(320, 100, 85); g.fillCircle(150, 140, 70);
    g.fillCircle(700, 130, 95); g.fillCircle(850, 110, 80); g.fillCircle(650, 150, 65);
    g.fillCircle(1050, 115, 90); g.fillCircle(1150, 135, 70);
    g.fillStyle(0x0A0A2A, 0.3); g.fillRect(0, 0, 1200, 180);
    this.softRadialHaze(g, 600, 340, 620, 0x18184A, 0.45, 12);
    this.softRadialHaze(g, 300, 150, 380, 0x101030, 0.3, 10);
    this.softRadialHaze(g, 950, 130, 360, 0x101030, 0.3, 10);
    g.generateTexture('bg_castle_0', 1200, 800);

    // Layer 1: Stars + moon + dragon silhouettes
    g.clear();
    g.fillStyle(0xFFFFFF, 0.9);
    for (let i = 0; i < 100; i++) {
      g.fillCircle((i * 59) % 1200, (i * 37) % 500, 1 + (i % 3));
    }
    // Moon crescent
    g.fillStyle(0xFFFFEE, 0.85); g.fillCircle(900, 100, 40);
    g.fillStyle(0x000020, 1); g.fillCircle(915, 90, 35);
    // Dragon silhouettes
    g.fillStyle(0x1A0A0A, 0.6);
    // Dragon 1
    g.fillEllipse(200, 160, 80, 25); // body
    g.fillTriangle(240, 160, 280, 130, 260, 150); // wing
    g.fillTriangle(200, 160, 220, 175, 180, 170); // tail
    // Dragon 2
    g.fillEllipse(700, 180, 90, 28);
    g.fillTriangle(750, 180, 790, 145, 770, 170);
    g.fillTriangle(700, 180, 720, 200, 680, 190);
    g.generateTexture('bg_castle_1', 1200, 550);

    // Layer 2: Grand castle silhouette with multiple towers
    g.clear();
    g.fillStyle(0x2A2A48, 0.9);
    // Main castle body
    g.fillRect(120, 280, 100, 270); g.fillRect(320, 220, 125, 330);
    g.fillRect(560, 200, 150, 350); g.fillRect(820, 250, 110, 300);
    // Guard towers
    g.fillRect(90, 320, 40, 230); g.fillRect(210, 300, 40, 250);
    g.fillRect(290, 260, 40, 290); g.fillRect(440, 240, 45, 310);
    g.fillRect(530, 220, 40, 330); g.fillRect(710, 220, 35, 330);
    g.fillRect(790, 280, 40, 270); g.fillRect(940, 300, 40, 250);
    // Tower tops
    g.fillTriangle(78, 320, 142, 320, 110, 250);
    g.fillTriangle(198, 300, 262, 300, 230, 220);
    g.fillTriangle(278, 260, 342, 260, 310, 170);
    g.fillTriangle(428, 240, 498, 240, 462, 150);
    g.fillTriangle(518, 220, 582, 220, 550, 120);
    g.fillTriangle(698, 220, 758, 220, 730, 130);
    g.fillTriangle(778, 280, 832, 280, 805, 200);
    g.fillTriangle(928, 300, 992, 300, 960, 220);
    // Main central tower
    g.fillTriangle(598, 200, 722, 200, 660, 80);
    g.fillStyle(0xFF8800, 0.15); // window light
    g.fillRect(660, 90, 8, 15);
    // Drawbridge
    g.fillStyle(0x3A2A1A, 0.7);
    g.fillRect(620, 500, 50, 50);
    g.fillTriangle(618, 500, 645, 530, 672, 500);
    // Mountain backdrop
    g.fillStyle(0x2E2E52, 0.5);
    g.fillEllipse(150, 580, 380, 300); g.fillEllipse(500, 580, 400, 340);
    g.fillEllipse(850, 580, 380, 310); g.fillEllipse(1100, 580, 380, 280);
    g.generateTexture('bg_castle_2', 1200, 600);

    // Layer 3: Banners on towers + wall details
    g.clear();
    g.fillStyle(0x8B0000, 1);
    g.fillRect(112, 240, 8, 75); g.fillRect(232, 210, 8, 85);
    g.fillRect(312, 160, 9, 90); g.fillRect(462, 140, 10, 95);
    g.fillRect(552, 110, 9, 100); g.fillRect(732, 120, 8, 95);
    g.fillRect(808, 195, 8, 80); g.fillRect(965, 215, 8, 75);
    // Banner flags
    g.fillStyle(0xFFD700, 1);
    g.fillTriangle(108, 240, 120, 240, 112, 300);
    g.fillTriangle(228, 210, 240, 210, 232, 270);
    g.fillTriangle(308, 160, 321, 160, 312, 225);
    g.fillTriangle(458, 140, 472, 140, 462, 210);
    g.fillTriangle(548, 110, 561, 110, 552, 180);
    g.fillTriangle(728, 120, 740, 120, 732, 185);
    g.fillTriangle(804, 195, 816, 195, 808, 255);
    g.fillTriangle(961, 215, 973, 215, 965, 270);
    // Wall crenellations
    g.fillStyle(0x1A1A2A, 1);
    for (let w = 0; w < 12; w++) {
      g.fillRect(120 + w * 18, 270, 10, 16);
    }
    g.generateTexture('bg_castle_3', 1200, 450);

    // Layer 4: Torches with flames + guard posts
    g.clear();
    g.fillStyle(0x8B4513, 1);
    g.fillRect(100, 500, 12, 75); g.fillRect(350, 475, 15, 88);
    g.fillRect(620, 440, 12, 82); g.fillRect(900, 465, 14, 85);
    // Flames
    g.fillStyle(0xFF2200, 0.5);
    g.fillEllipse(106, 488, 24, 32); g.fillEllipse(357, 460, 28, 36);
    g.fillEllipse(626, 426, 26, 30); g.fillEllipse(907, 450, 27, 34);
    g.fillStyle(0xFF5500, 1);
    g.fillEllipse(106, 492, 18, 25); g.fillEllipse(357, 465, 22, 28);
    g.fillEllipse(626, 430, 20, 23); g.fillEllipse(907, 455, 21, 26);
    g.fillStyle(0xFFD700, 0.8);
    g.fillEllipse(106, 492, 10, 15); g.fillEllipse(357, 465, 12, 17);
    g.fillEllipse(626, 430, 11, 14); g.fillEllipse(907, 455, 12, 16);
    g.fillStyle(0xFFFFFF, 0.5);
    g.fillEllipse(106, 492, 4, 6); g.fillEllipse(357, 465, 5, 7);
    g.fillEllipse(626, 430, 4, 5.5); g.fillEllipse(907, 455, 5, 6);
    // Guard posts
    g.fillStyle(0x1A1A2A, 0.8);
    g.fillRect(80, 540, 40, 60); g.fillRect(250, 548, 35, 55);
    g.fillRect(560, 530, 38, 65); g.fillRect(830, 538, 36, 58);
    g.generateTexture('bg_castle_4', 1200, 620);

    // Layer 5: Chandelier, chains, torches inside
    g.clear();
    // Chandelier body
    g.fillStyle(0xFFD700, 1);
    g.fillRect(560, 420, 50, 18); g.fillRect(545, 440, 80, 12);
    // Chains
    g.fillStyle(0x808080, 1);
    g.fillRect(580, 380, 4, 45); g.fillRect(595, 390, 3, 38);
    g.fillRect(575, 385, 3, 40); g.fillRect(605, 388, 3, 35);
    // Candle lights
    g.fillStyle(0xFFFF88, 0.9);
    g.fillCircle(575, 460, 10); g.fillCircle(605, 468, 8);
    g.fillCircle(590, 475, 9);
    g.fillStyle(0xFFFFFF, 0.4);
    g.fillCircle(575, 458, 5); g.fillCircle(605, 466, 4);
    g.fillCircle(590, 473, 4);
    g.generateTexture('bg_castle_5', 1200, 550);

    // Layer 6: Fireworks in night sky
    g.clear();
    g.fillStyle(0xFF0000, 0.7);
    g.fillCircle(250, 120, 6); g.fillCircle(244, 114, 4);
    g.fillCircle(258, 116, 4); g.fillCircle(250, 108, 3);
    g.fillStyle(0x00FF00, 0.7);
    g.fillCircle(620, 95, 5); g.fillCircle(615, 90, 3);
    g.fillCircle(627, 92, 3); g.fillCircle(620, 88, 2);
    g.fillStyle(0x0044FF, 0.7);
    g.fillCircle(880, 145, 6); g.fillCircle(875, 140, 4);
    g.fillCircle(888, 142, 4); g.fillCircle(880, 136, 3);
    g.fillStyle(0xFFD700, 0.7);
    g.fillCircle(450, 80, 4); g.fillCircle(1020, 110, 5);
    g.fillCircle(455, 76, 3); g.fillCircle(1025, 106, 3);
    g.fillStyle(0xFF8800, 0.7);
    g.fillCircle(150, 160, 5); g.fillCircle(750, 75, 4);
    g.fillCircle(155, 156, 3); g.fillCircle(755, 72, 2);
    // Trails
    g.fillStyle(0xFFD700, 0.3);
    g.fillRect(220, 130, 30, 2); g.fillRect(590, 105, 30, 2);
    g.fillRect(850, 155, 30, 2); g.fillRect(420, 85, 30, 2);
    g.generateTexture('bg_castle_6', 1200, 250);

    g.destroy();
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
