import Phaser from 'phaser';

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

  private createPlayerTextures() {
    const g = this.add.graphics();
    const drawMario = (key: string, shirt: number, pants: number, isBig: boolean) => {
      g.clear();
      const w = isBig ? 32 : 28;
      const h = isBig ? 48 : 32;
      const yOff = isBig ? 0 : 16;
      g.fillStyle(0x402000, 1);
      g.fillRoundedRect(w * 0.1, h - 6 + yOff, w * 0.4, 6, 2);
      g.fillRoundedRect(w * 0.5, h - 6 + yOff, w * 0.4, 6, 2);
      g.fillStyle(pants, 1);
      g.fillRoundedRect(w * 0.1, h - 22 + yOff, w * 0.8, 18, 4);
      g.fillStyle(0xf8d870, 1);
      g.fillCircle(w * 0.3, h - 18 + yOff, 2);
      g.fillCircle(w * 0.7, h - 18 + yOff, 2);
      g.fillStyle(shirt, 1);
      g.fillRoundedRect(0, h - 28 + yOff, w, 10, 4);
      g.fillStyle(0xffdbac, 1);
      g.fillRoundedRect(w * 0.2, 4 + yOff * 0.5, w * 0.6, 18, 6);
      g.fillStyle(0xffdbac, 1);
      g.fillCircle(w * 0.8, 14 + yOff * 0.5, 5);
      g.fillStyle(0x000000, 1);
      g.fillRect(w * 0.6, 10 + yOff * 0.5, 3, 5);
      g.fillStyle(shirt, 1);
      g.fillRoundedRect(w * 0.1, 0 + yOff * 0.5, w * 0.7, 8, 3);
      g.fillRect(w * 0.5, 3 + yOff * 0.5, w * 0.45, 4);
      g.generateTexture(key, w, h + yOff);
    };
    drawMario('player_idle', 0xe00000, 0x0050c0, false);
    drawMario('player_big', 0xe00000, 0x0050c0, true);
    drawMario('player_fire', 0xf8f8f8, 0xe00000, true);
    g.clear();
    g.fillStyle(0xf8a800, 1); g.fillCircle(4, 4, 4);
    g.fillStyle(0xffffff, 1); g.fillCircle(4, 4, 2);
    g.generateTexture('fireball', 8, 8);
    g.destroy();
  }

  private createEnemyTextures() {
    const g = this.add.graphics();
    // Goomba - classic brown mushroom enemy
    g.fillStyle(0x804000, 1); g.fillCircle(14, 12, 12);
    g.fillStyle(0xf8d870, 1); g.fillCircle(14, 18, 8);
    g.fillStyle(0x000000, 1);
    g.fillRect(10, 8, 2, 4); g.fillRect(16, 8, 2, 4);
    g.generateTexture('goomba', 28, 26);
    
    // Koopa - turtle shell
    g.clear();
    g.fillStyle(0x00a000, 1);
    g.fillEllipse(14, 12, 14, 10);
    g.lineStyle(2, 0x000000, 1);
    g.strokeEllipse(14, 12, 14, 10);
    g.fillStyle(0xf8d870, 1);
    g.fillRoundedRect(6, 18, 16, 8, 4);
    g.generateTexture('koopa', 28, 26);

    // Piranha Plant - from pipes (28x40, centered on pipe)
    g.clear();
    g.fillStyle(0x1a8c1a, 1); g.fillRect(12, 20, 6, 20);
    g.fillStyle(0xe00000, 1); g.fillEllipse(14, 12, 24, 22);
    g.fillStyle(0xf8f8f8, 1);
    g.beginPath(); g.moveTo(2, 10); g.lineTo(13, 4); g.lineTo(13, 18); g.closePath(); g.fillPath();
    g.beginPath(); g.moveTo(26, 10); g.lineTo(15, 4); g.lineTo(15, 18); g.closePath(); g.fillPath();
    g.fillStyle(0xffffff, 1); g.fillCircle(8, 10, 4); g.fillCircle(20, 10, 4);
    g.fillStyle(0x000000, 1); g.fillCircle(9, 10, 2); g.fillCircle(21, 10, 2);
    g.fillStyle(0xffd700, 1); g.fillCircle(14, 2, 4);
    g.generateTexture('piranha', 28, 40);
    
    // Spiny - spiky enemy
    g.clear();
    g.fillStyle(0xFFD700, 1); // Yellow body
    g.fillCircle(14, 14, 10);
    g.fillStyle(0x8B4513, 1); // Brown spikes
    g.fillTriangle(14, 2, 12, 6, 16, 6);
    g.fillTriangle(4, 10, 8, 12, 6, 14);
    g.fillTriangle(24, 10, 20, 12, 22, 14);
    g.fillTriangle(14, 26, 12, 22, 16, 22);
    g.fillStyle(0x000000, 1); g.fillCircle(11, 12, 2); g.fillCircle(17, 12, 2);
    g.generateTexture('spiny', 28, 28);
    
    // Lakitu - flying enemy with cloud
    g.clear();
    g.fillStyle(0x00a000, 1); // Turtle shell body
    g.fillCircle(20, 18, 10);
    g.fillStyle(0xf8f8f8, 1); // White belly
    g.fillCircle(20, 20, 6);
    g.fillStyle(0x8B4513, 1); // Shell pattern
    g.fillRect(15, 16, 4, 6); g.fillRect(21, 16, 4, 6);
    // Spiny in hand
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(32, 12, 6);
    // Cloud underneath
    g.fillStyle(0xFFFFFF, 0.9);
    g.fillCircle(20, 32, 8); g.fillCircle(26, 30, 6); g.fillCircle(14, 30, 6);
    g.generateTexture('lakitu', 40, 40);
    
    // Bullet Bill - cannon projectile
    g.clear();
    g.fillStyle(0x000000, 1); // Black body
    g.fillRoundedRect(0, 8, 24, 16, 4);
    g.fillStyle(0xFF0000, 1); // Red fins
    g.fillTriangle(24, 10, 30, 14, 24, 18);
    g.fillTriangle(0, 10, -4, 14, 0, 18);
    g.fillStyle(0xFFFF00, 1); // Yellow eye
    g.fillCircle(18, 16, 4);
    g.generateTexture('bullet_bill', 30, 24);

    // Robot - mechanical enemy
    g.clear();
    g.fillStyle(0x708090, 1);
    g.fillRoundedRect(4, 8, 20, 16, 4);
    g.fillStyle(0xC0C0C0, 1);
    g.fillRect(6, 10, 8, 6);
    g.fillStyle(0xFF0000, 1);
    g.fillCircle(20, 14, 4);
    g.fillStyle(0x303030, 1);
    g.fillRect(8, 22, 12, 4);
    g.fillStyle(0x505050, 1);
    g.fillRect(6, 24, 4, 6);
    g.fillRect(18, 24, 4, 6);
    g.generateTexture('robot', 28, 30);

    // Crab - seaside enemy
    g.clear();
    g.fillStyle(0xFF6347, 1);
    g.fillEllipse(14, 14, 24, 16);
    g.fillStyle(0xFFA07A, 1);
    g.fillEllipse(14, 16, 16, 8);
    g.fillStyle(0x000000, 1);
    g.fillCircle(8, 10, 3);
    g.fillCircle(20, 10, 3);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(8, 10, 1);
    g.fillCircle(20, 10, 1);
    g.fillStyle(0xFF4500, 1);
    g.fillRect(2, 20, 4, 8);
    g.fillRect(22, 20, 4, 8);
    g.fillRect(6, 24, 2, 6);
    g.fillRect(18, 24, 2, 6);
    g.generateTexture('crab', 28, 30);

    // Thwomp - falling stone
    g.clear();
    g.fillStyle(0x696969, 1); // Gray stone
    g.fillRoundedRect(4, 4, 24, 28, 4);
    g.fillStyle(0x505050, 1); // Darker top
    g.fillRect(4, 4, 24, 8);
    g.fillStyle(0x808080, 1); // Highlight
    g.fillRect(8, 12, 8, 4); g.fillRect(20, 16, 4, 4);
    g.fillStyle(0x000000, 1); // Angry eyes
    g.fillRect(10, 14, 4, 6); g.fillRect(18, 14, 4, 6);
    g.generateTexture('thwomp', 32, 32);
    
    // Boo - ghost (castle world)
    g.clear();
    g.fillStyle(0xFFFFFF, 0.9);
    g.fillCircle(16, 14, 12);
    g.fillRoundedRect(4, 14, 24, 16, { tl: 0, tr: 0, bl: 8, br: 8 });
    g.fillStyle(0x000000, 1);
    g.fillCircle(12, 12, 4); g.fillCircle(20, 12, 4);
    g.fillStyle(0xFF0000, 1);
    g.fillCircle(12, 13, 2); g.fillCircle(20, 13, 2);
    g.generateTexture('boo', 32, 30);
    
    // Fire Bar (rotating fire)
    g.clear();
    g.fillStyle(0xFF4500, 1);
    for (let i = 0; i < 6; i++) {
      const angle = i * Math.PI / 3;
      g.fillCircle(16 + Math.cos(angle) * 12, 16 + Math.sin(angle) * 12, 5);
    }
    g.fillStyle(0xFFFF00, 1);
    for (let i = 0; i < 6; i++) {
      const angle = i * Math.PI / 3;
      g.fillCircle(16 + Math.cos(angle) * 12, 16 + Math.sin(angle) * 12, 3);
    }
    g.generateTexture('fire_bar', 32, 32);
    
    g.destroy();
  }

  private createCoinTextures() {
    const g = this.add.graphics();
    g.fillStyle(0xf8d870, 1);
    g.fillEllipse(12, 16, 10, 16);
    g.lineStyle(2, 0x000000, 1);
    g.strokeEllipse(12, 16, 10, 16);
    g.lineStyle(1, 0xb7950b, 1);
    g.strokeEllipse(12, 16, 6, 12);
    g.fillStyle(0xffffff, 0.8);
    g.fillRect(10, 6, 3, 6);
    g.generateTexture('coin', 24, 32);
    g.destroy();
  }

  private createBlockTextures() {
    const g = this.add.graphics();
    
    // Grass ground with grass top
    g.fillStyle(0x885818, 1); g.fillRect(0, 12, 32, 20);
    g.fillStyle(0x289828, 1); g.fillRoundedRect(0, 0, 32, 12, 4);
    g.generateTexture('ground_grass', 32, 32);
    
    // Cave ground
    g.clear();
    g.fillStyle(0x4a4a5a, 1); g.fillRect(0, 0, 32, 32);
    g.fillStyle(0x3a3a4a, 1); g.fillRect(0, 0, 32, 8);
    g.fillStyle(0x5a5a6a, 1); g.fillRect(8, 8, 4, 4); g.fillRect(20, 16, 6, 6);
    g.generateTexture('ground_cave', 32, 32);
    
    // Castle ground - brick pattern
    g.clear();
    g.fillStyle(0x505050, 1); g.fillRect(0, 0, 32, 32);
    g.fillStyle(0x606060, 1); g.fillRect(0, 0, 32, 16);
    g.lineStyle(1, 0x303030, 1);
    g.strokeRect(0, 0, 16, 16); g.strokeRect(16, 16, 16, 16);
    g.strokeRect(0, 16, 16, 16); g.strokeRect(16, 0, 16, 16);
    g.generateTexture('ground_castle', 32, 32);

    // Question block - animated look
    g.clear();
    g.fillStyle(0xf8a800, 1); g.fillRoundedRect(0, 0, 32, 32, 4);
    g.lineStyle(2, 0x000000, 1); g.strokeRoundedRect(1, 1, 30, 30, 4);
    g.fillStyle(0x000000, 1);
    g.fillRect(12, 8, 8, 4); g.fillRect(16, 12, 4, 8); g.fillRect(14, 24, 4, 4);
    g.fillStyle(0xFFFFFF, 0.5); g.fillCircle(8, 10, 3); g.fillCircle(24, 10, 3);
    g.generateTexture('question', 32, 32);
    
    // Used question block
    g.clear();
    g.fillStyle(0xc89038, 1); g.fillRoundedRect(0, 0, 32, 32, 4);
    g.lineStyle(1, 0x8a6020, 1); g.strokeRoundedRect(1, 1, 30, 30, 4);
    g.generateTexture('question_used', 32, 32);

    // Pipe
    g.clear();
    g.fillStyle(0x00a000, 1); g.fillRoundedRect(0, 0, 64, 32, 4);
    g.fillStyle(0x00d800, 1); g.fillRoundedRect(4, 0, 12, 32, 4);
    g.fillStyle(0x007000, 1); g.fillRoundedRect(48, 0, 12, 32, 4);
    g.lineStyle(2, 0x004000, 1); g.strokeRoundedRect(0, 0, 64, 34, 4);
    g.generateTexture('pipe', 64, 32);

    // Brick
    g.clear();
    g.fillStyle(0xc84c0c, 1); g.fillRect(0, 0, 32, 32);
    g.lineStyle(2, 0x8a3000, 1); g.strokeRect(0, 0, 32, 16); g.strokeRect(0, 16, 32, 16);
    g.lineStyle(1, 0x6a2000, 1);
    g.strokeRect(2, 2, 12, 12); g.strokeRect(18, 2, 12, 12);
    g.strokeRect(2, 18, 12, 12); g.strokeRect(18, 18, 12, 12);
    g.generateTexture('brick', 32, 32);

    // Easy platform - green (easy path)
    g.clear();
    g.fillStyle(0x2E8B2E, 1); g.fillRoundedRect(0, 0, 64, 20, 4);
    g.fillStyle(0x3CB371, 1); g.fillRoundedRect(0, 0, 64, 8, 4);
    g.fillStyle(0x1a5a1a, 1); g.fillRect(0, 18, 64, 2);
    g.generateTexture('platform_easy', 64, 20);
    
    // Medium platform - yellow/orange (medium path)
    g.clear();
    g.fillStyle(0xDAA520, 1); g.fillRoundedRect(0, 0, 64, 20, 4);
    g.fillStyle(0xFFD700, 1); g.fillRoundedRect(0, 0, 64, 8, 4);
    g.lineStyle(1, 0xB8860B, 1); g.strokeRoundedRect(1, 1, 62, 18, 4);
    g.generateTexture('platform_medium', 64, 20);
    
    // Hard platform - red (hard path)
    g.clear();
    g.fillStyle(0xB22222, 1); g.fillRoundedRect(0, 0, 64, 20, 4);
    g.fillStyle(0xDC143C, 1); g.fillRoundedRect(0, 0, 64, 8, 4);
    g.fillStyle(0x8B0000, 1); g.fillRoundedRect(0, 16, 64, 4, 2);
    g.generateTexture('platform_hard', 64, 20);

    // Cloud block (platform) - with shadow/border to distinguish from background
    g.clear();
    g.fillStyle(0xD2691E, 1);
    g.fillRect(0, 0, 32, 32);
    g.fillStyle(0xF4A460, 1);
    g.fillRect(2, 2, 28, 4);
    g.fillStyle(0xFFF8DC, 1);
    g.fillCircle(10, 18, 8);
    g.fillCircle(22, 16, 7);
    g.fillCircle(16, 22, 6);
    g.generateTexture('cloud_block', 32, 32);
    g.destroy();
  }

  private createDecorationTextures() {
    const g = this.add.graphics();
    
    // TREE - detailed tree
    g.fillStyle(0x8B4513, 1); g.fillRect(18, 30, 8, 25);
    g.fillStyle(0x228B22, 1); g.fillCircle(22, 22, 18);
    g.fillStyle(0x32CD32, 0.7); g.fillCircle(16, 18, 10); g.fillCircle(28, 20, 10);
    g.fillStyle(0xFFA500, 0.6); g.fillCircle(22, 26, 4);
    g.generateTexture('tree', 44, 60);
    
    // BUSH
    g.clear();
    g.fillStyle(0x228B22, 1); 
    g.fillEllipse(20, 25, 40, 25);
    g.fillEllipse(8, 28, 15, 12);
    g.fillEllipse(32, 28, 15, 12);
    g.fillStyle(0xFFA500, 0.7); g.fillCircle(15, 25, 3); g.fillCircle(28, 22, 3);
    g.generateTexture('bush', 40, 35);
    
    // CLOUD - fluffy cloud
    g.clear();
    g.fillStyle(0xFFFFFF, 1);
    g.fillCircle(30, 20, 18);
    g.fillCircle(15, 22, 12);
    g.fillCircle(45, 22, 14);
    g.fillCircle(25, 28, 10);
    g.fillCircle(35, 26, 10);
    g.fillStyle(0xE8E8E8, 0.8);
    g.fillCircle(25, 18, 8);
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
    g.fillStyle(0x228B22, 1); g.fillRect(10, 20, 4, 12);
    g.fillStyle(0xFF69B4, 1); g.fillCircle(12, 16, 6);
    g.fillStyle(0xFFFF00, 1); g.fillCircle(12, 16, 2);
    g.generateTexture('flower', 24, 32);
    
    // Mushroom (grass world)
    g.clear();
    g.fillStyle(0xFFFFFF, 1); g.fillCircle(12, 18, 10);
    g.fillStyle(0xFF0000, 1); g.fillCircle(12, 14, 8);
    g.fillStyle(0xFFFFFF, 1); g.fillCircle(10, 12, 2); g.fillCircle(14, 12, 2);
    g.fillStyle(0x8B4513, 1); g.fillRect(10, 20, 4, 8);
    g.generateTexture('mushroom_decor', 24, 28);
    
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
    g.fillStyle(0x8B4513, 1); g.fillRect(10, 16, 4, 16);
    g.fillStyle(0xFF4500, 0.9); g.fillTriangle(12, 0, 6, 14, 18, 14);
    g.fillStyle(0xFFFF00, 1); g.fillTriangle(12, 6, 8, 14, 16, 14);
    g.generateTexture('torch', 24, 32);
    
    // Ghost (castle world)
    g.clear();
    g.fillStyle(0xFFFFFF, 0.8);
    g.fillCircle(12, 12, 10);
    g.fillRoundedRect(2, 12, 20, 14, { tl: 0, tr: 0, bl: 6, br: 6 });
    g.fillStyle(0x000000, 1);
    g.fillCircle(8, 10, 3); g.fillCircle(16, 10, 3);
    g.generateTexture('ghost', 24, 26);
    
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
    g.fillStyle(0x8B4513, 1);
    g.fillRect(2, 16, 4, 24);
    g.fillRect(26, 16, 4, 24);
    g.fillRect(0, 12, 32, 6);
    g.fillRect(0, 26, 32, 4);
    g.fillTriangle(4, 12, 4, 4, 2, 12);
    g.fillTriangle(28, 12, 28, 4, 30, 12);
    g.generateTexture('fence', 32, 40);

    // Balloon (sky decoration)
    g.clear();
    g.fillStyle(0xFF6347, 1);
    g.fillEllipse(16, 20, 24, 28);
    g.fillStyle(0xFFD700, 1);
    g.fillRect(14, 44, 4, 12);
    g.fillStyle(0x8B4513, 1);
    g.fillRect(10, 52, 12, 2);
    g.generateTexture('balloon', 32, 56);

    // Bird (sky decoration)
    g.clear();
    g.fillStyle(0x2F2F2F, 1);
    g.fillEllipse(16, 16, 20, 12);
    g.fillTriangle(4, 14, 0, 10, 4, 18);
    g.fillTriangle(28, 14, 32, 10, 28, 18);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(22, 14, 3);
    g.generateTexture('bird', 32, 32);

    // Sun (sky decoration)
    g.clear();
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(20, 20, 14);
    g.fillStyle(0xFFA500, 1);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      g.fillRect(18 + Math.cos(angle) * 16, 18 + Math.sin(angle) * 16, 4, 8);
    }
    g.generateTexture('sun', 40, 40);

    // Rainbow (sky decoration)
    g.clear();
    const rainbowColors = [0xFF0000, 0xFF7F00, 0xFFFF00, 0x00FF00, 0x0000FF, 0x4B0082, 0x9400D3];
    for (let i = 0; i < rainbowColors.length; i++) {
      g.fillStyle(rainbowColors[i], 0.8);
      g.fillRect(i * 6, 0, 6, 40);
    }
    g.generateTexture('rainbow', 42, 40);

    // House (village decoration)
    g.clear();
    g.fillStyle(0x8B4513, 1);
    g.fillRect(8, 24, 48, 32);
    g.fillStyle(0xA52A2A, 1);
    g.fillTriangle(4, 24, 32, 4, 60, 24);
    g.fillStyle(0x87CEEB, 1);
    g.fillRect(16, 32, 12, 12);
    g.fillRect(36, 32, 12, 12);
    g.fillStyle(0x8B4513, 1);
    g.fillRect(26, 40, 12, 16);
    g.generateTexture('house', 64, 56);

    // Barrel (village decoration)
    g.clear();
    g.fillStyle(0x8B4513, 1);
    g.fillEllipse(16, 20, 24, 28);
    g.fillStyle(0x6B3E0F, 1);
    g.fillRect(4, 8, 24, 4);
    g.fillRect(4, 28, 24, 4);
    g.generateTexture('barrel', 32, 40);

    // Planet (space decoration)
    g.clear();
    g.fillStyle(0xCD853F, 1);
    g.fillCircle(20, 20, 16);
    g.fillStyle(0xDEB887, 1);
    g.fillEllipse(20, 20, 28, 6);
    g.generateTexture('planet', 40, 40);

    // Rocket (space decoration)
    g.clear();
    g.fillStyle(0xC0C0C0, 1);
    g.fillRect(12, 8, 16, 40);
    g.fillTriangle(12, 8, 20, 0, 28, 8);
    g.fillStyle(0xFF0000, 1);
    g.fillRect(12, 40, 16, 8);
    g.fillStyle(0x00BFFF, 1);
    g.fillCircle(20, 28, 6);
    g.generateTexture('rocket', 40, 56);

    // Asteroid (space decoration)
    g.clear();
    g.fillStyle(0x696969, 1);
    g.fillEllipse(16, 16, 28, 24);
    g.fillStyle(0x505050, 1);
    g.fillCircle(10, 12, 4);
    g.fillCircle(22, 18, 3);
    g.fillCircle(14, 22, 2);
    g.generateTexture('asteroid', 32, 32);

    // Satellite (space decoration)
    g.clear();
    g.fillStyle(0xC0C0C0, 1);
    g.fillRect(8, 18, 24, 8);
    g.fillRect(4, 14, 8, 16);
    g.fillRect(28, 14, 8, 16);
    g.fillStyle(0x00FF00, 1);
    g.fillCircle(8, 22, 3);
    g.fillStyle(0xFF0000, 1);
    g.fillCircle(32, 22, 3);
    g.generateTexture('satellite', 40, 44);

    // Canyon rock (canyon decoration)
    g.clear();
    g.fillStyle(0x8B4513, 1);
    g.fillEllipse(20, 24, 32, 28);
    g.fillStyle(0xA0522D, 1);
    g.fillEllipse(16, 20, 8, 6);
    g.fillEllipse(26, 28, 6, 4);
    g.generateTexture('canyon-rock', 40, 48);

    // Formation (canyon decoration)
    g.clear();
    g.fillStyle(0xCD853F, 1);
    g.fillTriangle(20, 4, 4, 44, 36, 44);
    g.fillStyle(0xDEB887, 1);
    g.fillRect(8, 24, 6, 16);
    g.fillRect(18, 16, 6, 24);
    g.generateTexture('formation', 40, 48);

    // Eagle (canyon decoration)
    g.clear();
    g.fillStyle(0x2F2F2F, 1);
    g.fillEllipse(24, 16, 32, 16);
    g.fillTriangle(4, 14, 0, 10, 4, 18);
    g.fillTriangle(44, 14, 48, 10, 44, 18);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(32, 14, 4);
    g.generateTexture('eagle', 48, 32);

    // Banner (castle decoration)
    g.clear();
    g.fillStyle(0x8B0000, 1);
    g.fillRect(8, 4, 20, 32);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(18, 20, 6);
    g.fillRect(6, 36, 24, 4);
    g.generateTexture('banner', 36, 44);

    // Boss flag (castle decoration)
    g.clear();
    g.fillStyle(0x8B4513, 1);
    g.fillRect(6, 4, 4, 52);
    g.fillStyle(0x8B0000, 1);
    g.fillRect(10, 8, 28, 20);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(24, 18, 6);
    g.fillRect(10, 28, 28, 4);
    g.fillRect(10, 32, 28, 4);
    g.generateTexture('boss-flag', 40, 56);

    // Cactus (desert decoration)
    g.clear();
    g.fillStyle(0x228B22, 1);
    g.fillRect(12, 20, 8, 30);
    g.fillRect(4, 28, 6, 16);
    g.fillRect(22, 24, 6, 20);
    g.fillStyle(0x32CD32, 0.8);
    g.fillCircle(6, 26, 4);
    g.fillCircle(24, 22, 4);
    g.generateTexture('cactus', 32, 50);

    // Rock (desert decoration)
    g.clear();
    g.fillStyle(0x8B7355, 1);
    g.fillEllipse(16, 20, 28, 22);
    g.fillStyle(0xA0522D, 1);
    g.fillEllipse(12, 16, 8, 6);
    g.fillEllipse(22, 22, 5, 4);
    g.generateTexture('rock', 32, 40);

    // Skull (desert decoration)
    g.clear();
    g.fillStyle(0xF5F5DC, 1);
    g.fillCircle(16, 16, 12);
    g.fillStyle(0x363636, 1);
    g.fillCircle(12, 14, 4);
    g.fillCircle(20, 14, 4);
    g.fillRect(14, 20, 4, 6);
    g.fillStyle(0xF5F5DC, 1);
    g.fillEllipse(16, 30, 8, 6);
    g.generateTexture('skull', 32, 36);

    // Pyramid (desert decoration)
    g.clear();
    g.fillStyle(0xDAA520, 1);
    g.fillTriangle(20, 4, 4, 44, 36, 44);
    g.fillStyle(0xF4A460, 1);
    g.fillTriangle(20, 12, 10, 36, 30, 36);
    g.fillStyle(0xFFE4B5, 0.5);
    g.fillTriangle(20, 18, 14, 30, 26, 30);
    g.generateTexture('pyramid', 40, 48);

    // Bubble (water decoration)
    g.clear();
    g.fillStyle(0x87CEEB, 0.6);
    g.fillCircle(12, 12, 10);
    g.fillStyle(0xFFFFFF, 0.4);
    g.fillCircle(8, 8, 4);
    g.generateTexture('bubble', 24, 24);

    // Cobweb (haunted decoration)
    g.clear();
    g.lineStyle(1, 0xD3D3D3, 0.8);
    g.lineBetween(16, 4, 4, 28);
    g.lineBetween(16, 4, 28, 28);
    g.lineBetween(16, 4, 16, 32);
    g.lineBetween(4, 28, 28, 28);
    g.lineBetween(8, 16, 24, 16);
    g.lineBetween(8, 16, 24, 24);
    g.generateTexture('cobweb', 32, 32);

    // Conveyor (factory decoration)
    g.clear();
    g.fillStyle(0x505050, 1);
    g.fillRect(0, 8, 40, 8);
    g.fillStyle(0x303030, 1);
    g.fillRect(4, 10, 6, 4);
    g.fillRect(14, 10, 6, 4);
    g.fillRect(24, 10, 6, 4);
    g.fillRect(34, 10, 4, 4);
    g.generateTexture('conveyor', 40, 24);

    // Coral (water decoration)
    g.clear();
    g.fillStyle(0xFF7F50, 1);
    g.fillTriangle(16, 4, 8, 28, 24, 28);
    g.fillStyle(0xFF6347, 1);
    g.fillTriangle(10, 16, 6, 28, 14, 28);
    g.fillTriangle(22, 12, 18, 28, 26, 28);
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
    g.fillStyle(0xFF4500, 1);
    g.fillCircle(8, 12, 6);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(8, 10, 3);
    g.fillStyle(0xFF6347, 0.7);
    g.fillCircle(6, 14, 2);
    g.fillCircle(10, 14, 2);
    g.generateTexture('ember', 16, 20);

    // Fire (volcano decoration)
    g.clear();
    g.fillStyle(0xFF4500, 1);
    g.fillTriangle(12, 4, 4, 28, 20, 28);
    g.fillStyle(0xFFD700, 1);
    g.fillTriangle(12, 12, 8, 24, 16, 24);
    g.fillStyle(0xFFFF00, 0.8);
    g.fillTriangle(12, 18, 10, 22, 14, 22);
    g.generateTexture('fire', 24, 32);

    // Gear (factory decoration)
    g.clear();
    g.fillStyle(0x708090, 1);
    g.fillCircle(16, 16, 10);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      g.fillRect(14 + Math.cos(angle) * 10, 14 + Math.sin(angle) * 10, 4, 8);
    }
    g.fillStyle(0x505050, 1);
    g.fillCircle(16, 16, 4);
    g.generateTexture('gear', 32, 32);

    // Lava rock (volcano decoration)
    g.clear();
    g.fillStyle(0x8B0000, 1);
    g.fillEllipse(16, 20, 24, 20);
    g.fillStyle(0xFF4500, 1);
    g.fillEllipse(12, 16, 8, 6);
    g.fillEllipse(20, 22, 5, 4);
    g.generateTexture('lava-rock', 32, 40);

    // Palm (beach decoration)
    g.clear();
    g.fillStyle(0x8B4513, 1);
    g.fillRect(14, 24, 6, 28);
    g.fillStyle(0x228B22, 1);
    g.fillEllipse(8, 16, 12, 20);
    g.fillEllipse(20, 14, 10, 16);
    g.fillEllipse(16, 10, 8, 12);
    g.fillStyle(0x32CD32, 0.7);
    g.fillEllipse(6, 12, 6, 8);
    g.fillEllipse(22, 10, 5, 6);
    g.generateTexture('palm', 32, 52);

    // Seagull (beach decoration)
    g.clear();
    g.fillStyle(0xF5F5F5, 1);
    g.fillEllipse(16, 16, 20, 8);
    g.fillTriangle(4, 14, 0, 12, 4, 18);
    g.fillTriangle(28, 14, 32, 12, 28, 18);
    g.fillStyle(0x2F2F2F, 1);
    g.fillCircle(22, 15, 2);
    g.generateTexture('seagull', 32, 32);

    // Shell (beach decoration)
    g.clear();
    g.fillStyle(0xFFE4C4, 1);
    g.fillEllipse(16, 18, 20, 16);
    g.fillStyle(0xDEB887, 1);
    g.fillTriangle(16, 4, 8, 26, 24, 26);
    g.fillStyle(0xF5DEB3, 0.7);
    g.fillEllipse(16, 14, 12, 8);
    g.generateTexture('shell', 32, 36);

    // Smoke (factory decoration)
    g.clear();
    g.fillStyle(0x808080, 0.6);
    g.fillCircle(8, 20, 8);
    g.fillCircle(16, 16, 10);
    g.fillCircle(24, 12, 8);
    g.fillCircle(12, 8, 6);
    g.fillStyle(0xA9A9A9, 0.4);
    g.fillCircle(20, 6, 5);
    g.generateTexture('smoke', 32, 32);

    // Tombstone (haunted decoration)
    g.clear();
    g.fillStyle(0x696969, 1);
    g.fillRect(8, 16, 16, 24);
    g.fillRect(4, 12, 24, 8);
    g.fillStyle(0x808080, 1);
    g.fillRect(10, 8, 12, 8);
    g.fillStyle(0xD3D3D3, 1);
    g.fillRect(10, 20, 10, 2);
    g.fillRect(10, 26, 8, 2);
    g.fillRect(10, 32, 6, 2);
    g.generateTexture('tombstone', 32, 44);

    // Web (haunted decoration)
    g.clear();
    g.lineStyle(1, 0xD3D3D3, 0.8);
    g.lineBetween(16, 0, 16, 32);
    g.lineBetween(0, 16, 32, 16);
    g.lineBetween(4, 4, 28, 28);
    g.lineBetween(28, 4, 4, 28);
    g.lineBetween(16, 0, 0, 16);
    g.lineBetween(16, 0, 32, 16);
    g.lineBetween(16, 32, 0, 16);
    g.lineBetween(16, 32, 32, 16);
    g.generateTexture('web', 32, 32);

    g.destroy();
  }

  private createBackgroundTextures() {
    const g = this.add.graphics();
    
    // ==================== GRASSLANDS BIOME (7 LAYERS) ====================
    // Layer 0: Sky gradient
    g.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xE0F4FF, 0xE0F4FF, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_grasslands_0', 800, 600);
    
    // Layer 1: Far mountains (very slow)
    g.clear();
    g.fillStyle(0x6B8E6B, 0.4);
    g.fillTriangle(0, 300, 200, 100, 400, 300);
    g.fillTriangle(300, 300, 600, 80, 800, 300);
    g.fillTriangle(600, 300, 900, 120, 1200, 300);
    g.generateTexture('bg_grasslands_1', 1200, 350);
    
    // Layer 2: Far hills
    g.clear();
    g.fillStyle(0x5A9A5A, 0.6);
    g.fillEllipse(150, 320, 350, 180);
    g.fillEllipse(500, 300, 450, 200);
    g.fillEllipse(850, 330, 400, 170);
    g.fillEllipse(1200, 310, 380, 190);
    g.generateTexture('bg_grasslands_2', 1400, 400);
    
    // Layer 3: Mid hills
    g.clear();
    g.fillStyle(0x4A8A4A, 0.75);
    g.fillEllipse(100, 380, 300, 150);
    g.fillEllipse(400, 360, 350, 180);
    g.fillEllipse(750, 390, 320, 140);
    g.fillEllipse(1100, 370, 300, 160);
    g.generateTexture('bg_grasslands_3', 1400, 450);
    
    // Layer 4: Near hills with trees
    g.clear();
    g.fillStyle(0x3A7A3A, 0.9);
    g.fillEllipse(80, 420, 200, 120);
    g.fillEllipse(300, 400, 250, 140);
    g.fillEllipse(550, 430, 220, 110);
    g.fillEllipse(800, 410, 280, 130);
    g.fillEllipse(1050, 425, 200, 115);
    // Tree trunks
    g.fillStyle(0x5D4037, 1);
    g.fillRect(120, 350, 12, 60);
    g.fillRect(350, 330, 14, 70);
    g.fillRect(620, 360, 10, 55);
    g.fillRect(880, 340, 15, 65);
    g.fillRect(1100, 355, 12, 58);
    g.generateTexture('bg_grasslands_4', 1400, 500);
    
    // Layer 5: Bushes and flowers
    g.clear();
    g.fillStyle(0x2D6B2D, 1);
    g.fillEllipse(60, 480, 80, 45);
    g.fillEllipse(200, 490, 60, 35);
    g.fillEllipse(380, 475, 90, 50);
    g.fillEllipse(550, 485, 70, 40);
    g.fillEllipse(720, 478, 85, 48);
    g.fillEllipse(900, 488, 65, 38);
    // Flowers
    g.fillStyle(0xFF69B4, 1);
    g.fillCircle(100, 465, 5); g.fillCircle(250, 472, 4);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(420, 460, 5); g.fillCircle(600, 468, 4);
    g.fillStyle(0xFF6347, 1);
    g.fillCircle(760, 462, 5); g.fillCircle(950, 470, 4);
    g.generateTexture('bg_grasslands_5', 1000, 550);
    
    // Layer 6: Foreground grass tufts
    g.clear();
    g.fillStyle(0x228B22, 1);
    for (let i = 0; i < 30; i++) {
      g.fillTriangle(i * 30 + 10, 560, i * 30 + 15, 520, i * 30 + 20, 560);
      g.fillTriangle(i * 30 + 12, 570, i * 30 + 15, 530, i * 30 + 18, 570);
    }
    g.generateTexture('bg_grasslands_6', 1000, 600);
    
    // ==================== DESERT BIOME (7 LAYERS) ====================
    // Layer 0: Sunny sky gradient
    g.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xFFE4B5, 0xFFE4B5, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_desert_0', 800, 600);
    
    // Layer 1: Far sand dunes
    g.clear();
    g.fillStyle(0xDEB887, 0.5);
    g.fillEllipse(200, 350, 500, 200);
    g.fillEllipse(700, 320, 600, 220);
    g.generateTexture('bg_desert_1', 1400, 450);
    
    // Layer 2: Mid dunes with heat shimmer
    g.clear();
    g.fillStyle(0xD2B48C, 0.7);
    g.fillEllipse(150, 400, 400, 180);
    g.fillEllipse(550, 380, 450, 200);
    g.fillEllipse(950, 410, 380, 170);
    // Sun
    g.fillStyle(0xFFD700, 0.8);
    g.fillCircle(700, 80, 40);
    g.fillStyle(0xFFF8DC, 0.6);
    g.fillCircle(700, 80, 30);
    g.generateTexture('bg_desert_2', 1400, 500);
    
    // Layer 3: Near dunes
    g.clear();
    g.fillStyle(0xC4A676, 0.85);
    g.fillEllipse(120, 450, 350, 150);
    g.fillEllipse(500, 430, 400, 170);
    g.fillEllipse(900, 460, 320, 140);
    g.generateTexture('bg_desert_3', 1200, 550);
    
    // Layer 4: Cacti and rocks
    g.clear();
    // Saguaro cactus
    g.fillStyle(0x556B2F, 1);
    g.fillRect(100, 380, 15, 120);
    g.fillRect(85, 420, 20, 15);
    g.fillRect(100, 400, 15, 15);
    g.fillRect(200, 360, 12, 100);
    g.fillRect(188, 390, 18, 12);
    g.fillRect(200, 370, 12, 12);
    // Rocks
    g.fillStyle(0x8B7355, 1);
    g.fillEllipse(350, 490, 60, 35);
    g.fillEllipse(550, 480, 50, 30);
    g.fillEllipse(750, 495, 70, 40);
    g.generateTexture('bg_desert_4', 900, 550);
    
    // Layer 5: Tumbleweed and small plants
    g.clear();
    g.fillStyle(0x9ACD32, 0.8);
    g.fillCircle(150, 520, 20);
    g.fillCircle(450, 530, 15);
    g.fillCircle(700, 515, 18);
    // Small shrubs
    g.fillStyle(0x6B8E23, 1);
    g.fillEllipse(300, 510, 40, 25);
    g.fillEllipse(600, 505, 35, 22);
    g.generateTexture('bg_desert_5', 900, 560);
    
    // Layer 6: Sand foreground
    g.clear();
    g.fillStyle(0xF4A460, 1);
    for (let i = 0; i < 20; i++) {
      g.fillEllipse(i * 50 + 25, 570, 40, 25);
    }
    g.generateTexture('bg_desert_6', 1000, 600);
    
    // ==================== WATER BIOME (7 LAYERS) ====================
    // Layer 0: Underwater sky
    g.fillGradientStyle(0x006994, 0x006994, 0x001e3d, 0x001e3d, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_water_0', 800, 600);
    
    // Layer 1: Light rays
    g.clear();
    g.fillStyle(0x4A90D9, 0.2);
    g.fillTriangle(100, 0, 150, 400, 50, 400);
    g.fillTriangle(300, 0, 380, 500, 220, 500);
    g.fillTriangle(550, 0, 650, 450, 450, 450);
    g.fillTriangle(750, 0, 800, 350, 700, 350);
    g.generateTexture('bg_water_1', 800, 600);
    
    // Layer 2: Far coral reef
    g.clear();
    g.fillStyle(0xFF7F50, 0.5);
    g.fillEllipse(100, 450, 80, 120);
    g.fillStyle(0xFF69B4, 0.5);
    g.fillEllipse(250, 430, 100, 140);
    g.fillStyle(0x00CED1, 0.5);
    g.fillEllipse(450, 460, 90, 110);
    g.fillStyle(0x9932CC, 0.5);
    g.fillEllipse(650, 440, 85, 130);
    g.generateTexture('bg_water_2', 800, 550);
    
    // Layer 3: Mid seaweed
    g.clear();
    g.fillStyle(0x228B22, 0.7);
    for (let i = 0; i < 15; i++) {
      const x = i * 60 + 30;
      g.fillRect(x, 300, 8, 200);
      g.fillEllipse(x + 4, 290, 20, 40);
    }
    g.generateTexture('bg_water_3', 900, 550);
    
    // Layer 4: Swimming fish
    g.clear();
    g.fillStyle(0xFFA500, 0.8);
    g.fillEllipse(100, 200, 40, 20);
    g.fillTriangle(60, 200, 40, 190, 40, 210);
    g.fillStyle(0xFF6347, 0.8);
    g.fillEllipse(350, 280, 35, 18);
    g.fillTriangle(315, 280, 295, 270, 295, 290);
    g.fillStyle(0xFFD700, 0.8);
    g.fillEllipse(600, 180, 45, 22);
    g.fillTriangle(555, 180, 535, 170, 535, 190);
    g.fillStyle(0x00BFFF, 0.8);
    g.fillEllipse(500, 350, 38, 19);
    g.fillTriangle(462, 350, 442, 340, 442, 360);
    g.generateTexture('bg_water_4', 800, 450);
    
    // Layer 5: Bubbles
    g.clear();
    g.fillStyle(0xADD8E6, 0.6);
    for (let i = 0; i < 25; i++) {
      g.fillCircle(30 + i * 32, 100 + Math.sin(i) * 50, 5 + (i % 5) * 2);
    }
    g.generateTexture('bg_water_5', 800, 200);
    
    // Layer 6: Near coral
    g.clear();
    g.fillStyle(0xFF4500, 1);
    g.fillEllipse(80, 530, 60, 80);
    g.fillStyle(0x20B2AA, 1);
    g.fillEllipse(250, 520, 70, 90);
    g.fillStyle(0xDB7093, 1);
    g.fillEllipse(450, 535, 55, 75);
    g.fillStyle(0x00CED1, 1);
    g.fillEllipse(650, 525, 65, 85);
    g.fillStyle(0x9370DB, 1);
    g.fillEllipse(800, 540, 50, 70);
    g.generateTexture('bg_water_6', 900, 600);
    
    // ==================== ICE-SNOW BIOME (7 LAYERS) ====================
    // Layer 0: Winter sky
    g.fillGradientStyle(0xB0C4DE, 0xB0C4DE, 0xF0F8FF, 0xF0F8FF, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_ice_0', 800, 600);
    
    // Layer 1: Far ice mountains
    g.clear();
    g.fillStyle(0x778899, 0.5);
    g.fillTriangle(0, 400, 150, 150, 300, 400);
    g.fillTriangle(200, 400, 400, 100, 600, 400);
    g.fillTriangle(500, 400, 700, 120, 900, 400);
    g.generateTexture('bg_ice_1', 1000, 450);
    
    // Layer 2: Icebergs
    g.clear();
    g.fillStyle(0xAFEEEE, 0.7);
    g.fillEllipse(150, 380, 250, 150);
    g.fillEllipse(500, 360, 300, 180);
    g.fillEllipse(850, 390, 220, 130);
    g.generateTexture('bg_ice_2', 1200, 480);
    
    // Layer 3: Snow clouds
    g.clear();
    g.fillStyle(0xFFFFFF, 0.5);
    g.fillCircle(100, 80, 40);
    g.fillCircle(150, 70, 35);
    g.fillCircle(60, 90, 25);
    g.fillCircle(350, 100, 45);
    g.fillCircle(420, 85, 30);
    g.fillCircle(600, 75, 38);
    g.fillCircle(680, 95, 32);
    g.generateTexture('bg_ice_3', 800, 150);
    
    // Layer 4: Snow particles
    g.clear();
    g.fillStyle(0xFFFFFF, 0.8);
    for (let i = 0; i < 50; i++) {
      const x = (i * 37) % 800;
      const y = (i * 23) % 500;
      const size = 2 + (i % 4);
      g.fillCircle(x, y, size);
    }
    g.generateTexture('bg_ice_4', 800, 500);
    
    // Layer 5: Icicles
    g.clear();
    g.fillStyle(0x87CEEB, 0.9);
    for (let i = 0; i < 20; i++) {
      const x = i * 45 + 20;
      g.fillTriangle(x, 0, x - 10, 80, x + 10, 80);
    }
    g.generateTexture('bg_ice_5', 900, 100);
    
    // Layer 6: Snow ground
    g.clear();
    g.fillStyle(0xFFFAFA, 1);
    g.fillEllipse(100, 570, 200, 50);
    g.fillEllipse(350, 575, 180, 45);
    g.fillEllipse(600, 565, 220, 55);
    g.fillEllipse(800, 572, 160, 42);
    g.generateTexture('bg_ice_6', 1000, 600);
    
    // ==================== SKY-CLOUDS BIOME (7 LAYERS) ====================
    // Layer 0: Sunset sky
    g.fillGradientStyle(0xFF6B6B, 0xFF6B6B, 0xFFE4B5, 0xFFA07A, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_sky_0', 800, 600);
    
    // Layer 1: Distant clouds
    g.clear();
    g.fillStyle(0xFFFFFF, 0.3);
    g.fillCircle(100, 100, 50);
    g.fillCircle(160, 90, 40);
    g.fillCircle(50, 110, 30);
    g.fillCircle(400, 80, 55);
    g.fillCircle(480, 70, 35);
    g.fillCircle(700, 110, 48);
    g.fillCircle(760, 95, 32);
    g.generateTexture('bg_sky_1', 900, 150);
    
    // Layer 2: Pink clouds
    g.clear();
    g.fillStyle(0xFFB6C1, 0.6);
    g.fillCircle(120, 180, 60);
    g.fillCircle(200, 165, 45);
    g.fillCircle(50, 195, 35);
    g.fillCircle(400, 200, 70);
    g.fillCircle(520, 180, 50);
    g.fillCircle(650, 190, 55);
    g.generateTexture('bg_sky_2', 800, 280);
    
    // Layer 3: Fluffy white clouds
    g.clear();
    g.fillStyle(0xFFFFFF, 0.8);
    g.fillCircle(80, 300, 55);
    g.fillCircle(150, 280, 45);
    g.fillCircle(200, 310, 35);
    g.fillCircle(350, 320, 60);
    g.fillCircle(450, 295, 40);
    g.fillCircle(550, 315, 50);
    g.fillCircle(680, 290, 45);
    g.fillCircle(750, 305, 38);
    g.generateTexture('bg_sky_3', 900, 400);
    
    // Layer 4: Near clouds
    g.clear();
    g.fillStyle(0xFFFACD, 0.9);
    g.fillCircle(100, 420, 70);
    g.fillCircle(200, 400, 55);
    g.fillCircle(280, 430, 45);
    g.fillCircle(450, 410, 65);
    g.fillCircle(580, 435, 50);
    g.fillCircle(700, 405, 58);
    g.generateTexture('bg_sky_4', 900, 500);
    
    // Layer 5: Birds
    g.clear();
    g.fillStyle(0x2F2F2F, 1);
    // Bird 1
    g.fillTriangle(200, 350, 210, 340, 220, 350);
    g.fillTriangle(220, 350, 230, 340, 240, 350);
    // Bird 2
    g.fillTriangle(450, 380, 460, 370, 470, 380);
    g.fillTriangle(470, 380, 480, 370, 490, 380);
    // Bird 3
    g.fillTriangle(650, 360, 660, 350, 670, 360);
    g.fillTriangle(670, 360, 680, 350, 690, 360);
    g.generateTexture('bg_sky_5', 800, 450);
    
    // Layer 6: Rainbow
    g.clear();
    g.fillStyle(0xFF0000, 0.7); g.fillRect(0, 500, 800, 15);
    g.fillStyle(0xFF7F00, 0.7); g.fillRect(0, 515, 800, 15);
    g.fillStyle(0xFFFF00, 0.7); g.fillRect(0, 530, 800, 15);
    g.fillStyle(0x00FF00, 0.7); g.fillRect(0, 545, 800, 15);
    g.fillStyle(0x0000FF, 0.7); g.fillRect(0, 560, 800, 15);
    g.fillStyle(0x4B0082, 0.7); g.fillRect(0, 575, 800, 15);
    g.fillStyle(0x9400D3, 0.7); g.fillRect(0, 590, 800, 15);
    g.generateTexture('bg_sky_6', 800, 600);
    
    // ==================== FOREST BIOME (7 LAYERS) ====================
    // Layer 0: Forest sky
    g.fillGradientStyle(0x228B22, 0x228B22, 0x90EE90, 0x98FB98, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_forest_0', 800, 600);
    
    // Layer 1: Far tree canopy
    g.clear();
    g.fillStyle(0x006400, 0.6);
    g.fillEllipse(100, 150, 200, 120);
    g.fillEllipse(300, 130, 180, 100);
    g.fillEllipse(500, 160, 220, 130);
    g.fillEllipse(700, 140, 190, 110);
    g.generateTexture('bg_forest_1', 900, 250);
    
    // Layer 2: Mid canopy
    g.clear();
    g.fillStyle(0x228B22, 0.7);
    g.fillEllipse(80, 250, 180, 110);
    g.fillEllipse(280, 230, 200, 130);
    g.fillEllipse(500, 260, 170, 100);
    g.fillEllipse(720, 240, 190, 120);
    g.generateTexture('bg_forest_2', 900, 350);
    
    // Layer 3: Tree trunks far
    g.clear();
    g.fillStyle(0x8B4513, 0.5);
    g.fillRect(120, 200, 20, 300);
    g.fillRect(320, 180, 25, 320);
    g.fillRect(550, 220, 22, 280);
    g.fillRect(750, 200, 18, 300);
    g.generateTexture('bg_forest_3', 900, 500);
    
    // Layer 4: Vines and leaves
    g.clear();
    g.fillStyle(0x32CD32, 0.8);
    for (let i = 0; i < 12; i++) {
      const x = i * 75 + 30;
      g.fillRect(x, 0, 4, 150 + (i % 3) * 30);
      g.fillEllipse(x + 2, 150 + (i % 3) * 30, 15, 25);
    }
    g.generateTexture('bg_forest_4', 900, 200);
    
    // Layer 5: Mushrooms and logs
    g.clear();
    g.fillStyle(0x8B4513, 1);
    g.fillEllipse(100, 520, 80, 30);
    g.fillEllipse(400, 530, 90, 35);
    g.fillEllipse(700, 515, 75, 28);
    // Mushrooms
    g.fillStyle(0xFF0000, 1);
    g.fillEllipse(180, 500, 30, 20);
    g.fillStyle(0xFFFFFF, 1);
    g.fillCircle(175, 495, 4);
    g.fillCircle(185, 498, 3);
    g.fillStyle(0xFFD700, 1);
    g.fillEllipse(500, 510, 25, 18);
    g.fillStyle(0xFFFFFF, 1);
    g.fillCircle(495, 505, 3);
    g.fillCircle(505, 507, 3);
    g.generateTexture('bg_forest_5', 900, 560);
    
    // Layer 6: Fireflies
    g.clear();
    g.fillStyle(0xFFFF00, 0.9);
    for (let i = 0; i < 30; i++) {
      const x = (i * 47) % 800;
      const y = 350 + (i * 31) % 200;
      g.fillCircle(x, y, 3);
    }
    g.generateTexture('bg_forest_6', 800, 600);
    
    // ==================== VILLAGE BIOME (7 LAYERS) ====================
    // Layer 0: Peaceful blue sky
    g.fillGradientStyle(0x87CEEB, 0x87CEEB, 0xE6E6FA, 0xE6E6FA, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_village_0', 800, 600);
    
    // Layer 1: Distant houses
    g.clear();
    g.fillStyle(0x696969, 0.4);
    g.fillRect(50, 280, 60, 80);
    g.fillStyle(0xA9A9A9, 0.4);
    g.fillRect(200, 260, 70, 100);
    g.fillRect(400, 270, 55, 90);
    g.fillRect(580, 250, 80, 110);
    g.fillRect(720, 280, 60, 80);
    // Roofs
    g.fillStyle(0x8B0000, 0.4);
    g.fillTriangle(40, 280, 130, 280, 85, 230);
    g.fillTriangle(190, 260, 280, 260, 235, 200);
    g.fillTriangle(390, 270, 470, 270, 430, 210);
    g.fillTriangle(570, 250, 670, 250, 620, 180);
    g.fillTriangle(710, 280, 790, 280, 750, 220);
    g.generateTexture('bg_village_1', 900, 350);
    
    // Layer 2: Mid buildings
    g.clear();
    g.fillStyle(0x808080, 0.7);
    g.fillRect(80, 320, 80, 120);
    g.fillRect(280, 300, 90, 140);
    g.fillRect(500, 310, 70, 130);
    g.fillRect(680, 290, 85, 150);
    // Windows
    g.fillStyle(0xFFFF00, 0.6);
    g.fillRect(95, 340, 15, 15);
    g.fillRect(125, 360, 15, 15);
    g.fillRect(300, 320, 18, 18);
    g.fillRect(340, 350, 15, 15);
    g.generateTexture('bg_village_2', 900, 500);
    
    // Layer 3: Windmill
    g.clear();
    g.fillStyle(0xDEB887, 1);
    g.fillRect(650, 350, 40, 150);
    // Blades
    g.fillStyle(0x8B4513, 1);
    g.fillRect(640, 280, 60, 8);
    g.fillRect(670, 290, 8, 60);
    g.fillRect(610, 310, 60, 8);
    g.fillRect(670, 300, 8, 60);
    g.generateTexture('bg_village_3', 800, 550);
    
    // Layer 4: Fence
    g.clear();
    g.fillStyle(0x8B4513, 1);
    for (let i = 0; i < 25; i++) {
      g.fillRect(i * 35 + 10, 480, 6, 50);
      g.fillTriangle(i * 35 + 10, 480, i * 35 + 13, 470, i * 35 + 16, 480);
    }
    g.fillRect(0, 500, 875, 8);
    g.fillRect(0, 520, 875, 5);
    g.generateTexture('bg_village_4', 900, 560);
    
    // Layer 5: Flowers
    g.clear();
    g.fillStyle(0x228B22, 1);
    for (let i = 0; i < 20; i++) {
      g.fillEllipse(i * 45 + 20, 550, 30, 20);
    }
    g.fillStyle(0xFF0000, 1);
    for (let i = 0; i < 15; i++) {
      g.fillCircle(50 + i * 55, 540, 6);
    }
    g.fillStyle(0xFFFF00, 1);
    for (let i = 0; i < 12; i++) {
      g.fillCircle(80 + i * 70, 545, 5);
    }
    g.generateTexture('bg_village_5', 900, 580);
    
    // Layer 6: Path
    g.clear();
    g.fillStyle(0xD2B48C, 1);
    g.fillRect(0, 560, 800, 40);
    g.fillStyle(0xC4A676, 1);
    for (let i = 0; i < 20; i++) {
      g.fillEllipse(i * 45 + 20, 575, 25, 15);
    }
    g.generateTexture('bg_village_6', 800, 600);
    
    // ==================== BEACH-ISLAND BIOME (7 LAYERS) ====================
    // Layer 0: Tropical sky
    g.fillGradientStyle(0x00CED1, 0x00CED1, 0xFFB6C1, 0x87CEEB, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_beach_0', 800, 600);
    
    // Layer 1: Ocean horizon
    g.clear();
    g.fillStyle(0x006994, 0.6);
    g.fillRect(0, 300, 800, 150);
    // Waves
    g.fillStyle(0x00CED1, 0.4);
    for (let i = 0; i < 20; i++) {
      g.fillEllipse(i * 50 + 25, 350, 40, 10);
    }
    g.generateTexture('bg_beach_1', 800, 450);
    
    // Layer 2: Palm trees silhouette
    g.clear();
    g.fillStyle(0x2F4F4F, 0.5);
    g.fillRect(100, 300, 15, 200);
    g.fillRect(300, 280, 12, 220);
    g.fillRect(600, 290, 14, 210);
    // Leaves
    g.fillStyle(0x228B22, 0.5);
    g.fillEllipse(100, 280, 80, 50);
    g.fillEllipse(300, 260, 70, 45);
    g.fillEllipse(600, 270, 75, 48);
    g.generateTexture('bg_beach_2', 800, 550);
    
    // Layer 3: Waves mid
    g.clear();
    g.fillStyle(0x40E0D0, 0.6);
    for (let i = 0; i < 15; i++) {
      g.fillEllipse(i * 60 + 30, 420, 50, 15);
    }
    g.generateTexture('bg_beach_3', 900, 480);
    
    // Layer 4: Beach sand
    g.clear();
    g.fillStyle(0xF4A460, 1);
    g.fillRect(0, 450, 800, 100);
    g.fillStyle(0xDEB887, 1);
    for (let i = 0; i < 25; i++) {
      g.fillEllipse(i * 35 + 17, 480, 25, 12);
    }
    g.generateTexture('bg_beach_4', 800, 550);
    
    // Layer 5: Shells and crabs
    g.clear();
    g.fillStyle(0xFFFACD, 1);
    g.fillEllipse(100, 520, 20, 15);
    g.fillEllipse(300, 530, 18, 12);
    g.fillEllipse(550, 515, 22, 16);
    g.fillStyle(0xFF6347, 1);
    g.fillEllipse(200, 525, 25, 18);
    // Crab claws
    g.fillTriangle(175, 515, 185, 510, 185, 520);
    g.fillTriangle(225, 515, 215, 510, 215, 520);
    g.generateTexture('bg_beach_5', 800, 570);
    
    // Layer 6: Seaweed foreground
    g.clear();
    g.fillStyle(0x228B22, 0.9);
    for (let i = 0; i < 10; i++) {
      const x = i * 90 + 40;
      g.fillRect(x, 500, 8, 100);
      g.fillEllipse(x + 4, 500, 20, 35);
    }
    g.generateTexture('bg_beach_6', 900, 600);
    
    // ==================== FACTORY BIOME (7 LAYERS) ====================
    // Layer 0: Smoggy sky
    g.fillGradientStyle(0x4A4A4A, 0x4A4A4A, 0x696969, 0x808080, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_factory_0', 800, 600);
    
    // Layer 1: Industrial buildings far
    g.clear();
    g.fillStyle(0x2F2F2F, 0.7);
    g.fillRect(50, 200, 80, 250);
    g.fillRect(200, 180, 100, 270);
    g.fillRect(400, 220, 70, 230);
    g.fillRect(550, 190, 90, 260);
    g.fillRect(720, 210, 80, 240);
    // Smokestacks
    g.fillStyle(0x1a1a1a, 1);
    g.fillRect(80, 150, 20, 50);
    g.fillRect(240, 130, 25, 50);
    g.fillRect(580, 140, 22, 50);
    g.generateTexture('bg_factory_1', 900, 500);
    
    // Layer 2: Gears
    g.clear();
    g.fillStyle(0x696969, 0.8);
    g.fillCircle(150, 300, 60);
    g.fillStyle(0x808080, 0.8);
    g.fillCircle(400, 280, 80);
    g.fillStyle(0xA9A9A9, 0.8);
    g.fillCircle(650, 320, 70);
    // Gear teeth
    g.fillStyle(0x505050, 1);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      g.fillRect(90 + Math.cos(angle) * 50, 250 + Math.sin(angle) * 50, 12, 20);
    }
    g.generateTexture('bg_factory_2', 800, 450);
    
    // Layer 3: Pipes
    g.clear();
    g.fillStyle(0x708090, 1);
    g.fillRect(0, 300, 800, 20);
    g.fillRect(0, 350, 800, 15);
    g.fillRect(0, 400, 800, 25);
    // Pipe joints
    g.fillStyle(0x4A4A4A, 1);
    g.fillRect(100, 290, 30, 40);
    g.fillRect(300, 340, 30, 35);
    g.fillRect(550, 390, 30, 45);
    g.fillRect(750, 310, 30, 30);
    g.generateTexture('bg_factory_3', 800, 480);
    
    // Layer 4: Conveyor belts
    g.clear();
    g.fillStyle(0x3a3a3a, 1);
    g.fillRect(0, 480, 800, 40);
    g.fillStyle(0x505050, 1);
    for (let i = 0; i < 40; i++) {
      g.fillRect(i * 22 + 5, 485, 12, 30);
    }
    g.generateTexture('bg_factory_4', 800, 550);
    
    // Layer 5: Sparks
    g.clear();
    g.fillStyle(0xFFD700, 0.9);
    for (let i = 0; i < 20; i++) {
      const x = (i * 67) % 800;
      const y = 350 + (i * 43) % 150;
      g.fillCircle(x, y, 2 + (i % 3));
    }
    g.fillStyle(0xFF4500, 0.8);
    for (let i = 0; i < 15; i++) {
      const x = (i * 89) % 800;
      const y = 380 + (i * 57) % 120;
      g.fillCircle(x, y, 3);
    }
    g.generateTexture('bg_factory_5', 800, 550);
    
    // Layer 6: Smoke
    g.clear();
    g.fillStyle(0x696969, 0.5);
    g.fillEllipse(120, 100, 80, 50);
    g.fillEllipse(150, 60, 60, 40);
    g.fillEllipse(600, 120, 90, 55);
    g.fillEllipse(640, 80, 70, 45);
    g.fillEllipse(400, 90, 75, 48);
    g.fillEllipse(420, 50, 55, 35);
    g.generateTexture('bg_factory_6', 800, 200);
    
    // ==================== VOLCANO-LAVA BIOME (7 LAYERS) ====================
    // Layer 0: Dark ashy sky
    g.fillGradientStyle(0x1a0a0a, 0x1a0a0a, 0x4a1010, 0x8B0000, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_volcano_0', 800, 600);
    
    // Layer 1: Lava glow
    g.clear();
    g.fillStyle(0xFF4500, 0.3);
    g.fillRect(0, 400, 800, 200);
    g.fillStyle(0xFF6347, 0.2);
    g.fillRect(0, 450, 800, 150);
    g.generateTexture('bg_volcano_1', 800, 600);
    
    // Layer 2: Volcanic mountains
    g.clear();
    g.fillStyle(0x2F2F2F, 0.8);
    g.fillTriangle(0, 400, 200, 100, 400, 400);
    g.fillTriangle(300, 400, 500, 80, 700, 400);
    g.fillTriangle(600, 400, 800, 120, 1000, 400);
    // Lava streams
    g.fillStyle(0xFF0000, 0.6);
    g.fillTriangle(180, 400, 200, 200, 220, 400);
    g.fillTriangle(480, 400, 500, 180, 520, 400);
    g.generateTexture('bg_volcano_2', 1000, 450);
    
    // Layer 3: Falling rocks
    g.clear();
    g.fillStyle(0x4a4a4a, 1);
    for (let i = 0; i < 25; i++) {
      const x = (i * 53) % 800;
      const y = (i * 37) % 400;
      const size = 5 + (i % 8);
      g.fillEllipse(x, y, size, size * 0.7);
    }
    g.generateTexture('bg_volcano_3', 800, 450);
    
    // Layer 4: Smoke clouds
    g.clear();
    g.fillStyle(0x3a3a3a, 0.7);
    g.fillEllipse(150, 150, 120, 80);
    g.fillEllipse(400, 100, 150, 90);
    g.fillEllipse(650, 130, 130, 85);
    g.fillStyle(0x505050, 0.5);
    g.fillEllipse(200, 80, 80, 50);
    g.fillEllipse(500, 60, 100, 60);
    g.fillEllipse(700, 70, 90, 55);
    g.generateTexture('bg_volcano_4', 900, 200);
    
    // Layer 5: Lava pools
    g.clear();
    g.fillStyle(0x8B0000, 1);
    g.fillEllipse(100, 520, 150, 50);
    g.fillEllipse(400, 530, 200, 60);
    g.fillEllipse(700, 515, 180, 55);
    g.fillStyle(0xFF4500, 0.8);
    g.fillEllipse(100, 515, 100, 30);
    g.fillEllipse(400, 525, 140, 35);
    g.fillEllipse(700, 510, 120, 32);
    g.generateTexture('bg_volcano_5', 900, 600);
    
    // Layer 6: Ember particles
    g.clear();
    g.fillStyle(0xFF6347, 1);
    for (let i = 0; i < 40; i++) {
      const x = (i * 41) % 800;
      const y = 600 - (i * 23) % 300;
      g.fillCircle(x, y, 2 + (i % 4));
    }
    g.fillStyle(0xFFD700, 0.8);
    for (let i = 0; i < 30; i++) {
      const x = (i * 67) % 800;
      const y = 600 - (i * 31) % 350;
      g.fillCircle(x, y, 1 + (i % 3));
    }
    g.generateTexture('bg_volcano_6', 800, 600);
    
    // ==================== HAUNTED-MANSION BIOME (7 LAYERS) ====================
    // Layer 0: Dark purple night sky
    g.fillGradientStyle(0x0D0D1A, 0x0D0D1A, 0x1A0D2E, 0x2D1B4E, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_haunted_0', 800, 600);
    
    // Layer 1: Moon
    g.clear();
    g.fillStyle(0xFFFFDD, 0.9);
    g.fillCircle(650, 80, 35);
    g.fillStyle(0x0D0D1A, 1);
    g.fillCircle(640, 75, 28);
    // Moon craters
    g.fillStyle(0xCCCCAA, 0.5);
    g.fillCircle(660, 85, 5);
    g.fillCircle(645, 70, 4);
    g.generateTexture('bg_haunted_1', 800, 150);
    
    // Layer 2: Dead trees silhouette
    g.clear();
    g.fillStyle(0x1a1a2e, 0.9);
    g.fillRect(100, 200, 15, 250);
    g.fillRect(70, 250, 40, 8);
    g.fillRect(60, 280, 50, 6);
    g.fillRect(50, 310, 60, 5);
    g.fillRect(280, 180, 12, 270);
    g.fillRect(250, 220, 45, 7);
    g.fillRect(240, 260, 55, 6);
    g.fillRect(600, 190, 14, 260);
    g.fillRect(570, 240, 40, 8);
    g.fillRect(560, 290, 50, 6);
    g.generateTexture('bg_haunted_2', 800, 500);
    
    // Layer 3: Gravestones
    g.clear();
    g.fillStyle(0x3a3a4a, 1);
    g.fillRect(80, 450, 40, 60);
    g.fillTriangle(70, 450, 110, 450, 90, 420);
    g.fillRect(200, 460, 35, 50);
    g.fillRect(350, 440, 50, 70);
    g.fillTriangle(340, 440, 400, 440, 370, 400);
    g.fillRect(500, 455, 38, 55);
    g.fillRect(680, 445, 45, 65);
    g.fillTriangle(670, 445, 720, 445, 695, 410);
    g.generateTexture('bg_haunted_3', 800, 550);
    
    // Layer 4: Fog
    g.clear();
    g.fillStyle(0x4a4a5a, 0.3);
    g.fillEllipse(100, 500, 300, 80);
    g.fillEllipse(400, 520, 350, 90);
    g.fillEllipse(700, 490, 280, 70);
    g.generateTexture('bg_haunted_4', 900, 600);
    
    // Layer 5: Bats
    g.clear();
    g.fillStyle(0x000000, 1);
    for (let i = 0; i < 15; i++) {
      const x = 50 + i * 55;
      const y = 100 + (i % 4) * 40;
      g.fillEllipse(x, y, 15, 8);
      g.fillTriangle(x - 8, y, x - 15, y - 10, x - 8, y + 5);
      g.fillTriangle(x + 8, y, x + 15, y - 10, x + 8, y + 5);
    }
    g.generateTexture('bg_haunted_5', 900, 300);
    
    // Layer 6: Dead grass
    g.clear();
    g.fillStyle(0x2a2a3a, 1);
    for (let i = 0; i < 40; i++) {
      const x = i * 22 + 10;
      g.fillRect(x, 520, 2, 50 + (i % 5) * 10);
    }
    g.generateTexture('bg_haunted_6', 900, 600);
    
    // ==================== RUINS BIOME (7 LAYERS) ====================
    // Layer 0: Sunset sky
    g.fillGradientStyle(0xFF6347, 0xFF6347, 0xFFD700, 0xFFA500, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_ruins_0', 800, 600);
    
    // Layer 1: Temple silhouette
    g.clear();
    g.fillStyle(0x4a3a2a, 0.6);
    g.fillRect(100, 200, 120, 200);
    g.fillRect(300, 180, 100, 220);
    g.fillRect(500, 190, 140, 210);
    g.fillRect(700, 170, 100, 230);
    // Columns
    g.fillStyle(0x5a4a3a, 0.7);
    g.fillRect(120, 220, 20, 180);
    g.fillRect(160, 220, 20, 180);
    g.fillRect(330, 200, 18, 200);
    g.fillRect(370, 200, 18, 200);
    g.fillRect(530, 210, 22, 190);
    g.fillRect(590, 210, 22, 190);
    g.generateTexture('bg_ruins_1', 900, 450);
    
    // Layer 2: Broken pillars
    g.clear();
    g.fillStyle(0x6a5a4a, 0.8);
    g.fillRect(80, 300, 30, 150);
    g.fillRect(200, 350, 25, 100);
    g.fillRect(400, 320, 35, 130);
    g.fillRect(550, 280, 28, 170);
    g.fillRect(720, 340, 32, 110);
    g.generateTexture('bg_ruins_2', 900, 500);
    
    // Layer 3: Vines
    g.clear();
    g.fillStyle(0x228B22, 0.7);
    for (let i = 0; i < 15; i++) {
      const x = i * 65 + 20;
      g.fillRect(x, 0, 5, 200 + (i % 3) * 50);
      g.fillEllipse(x + 2, 200 + (i % 3) * 50, 12, 20);
    }
    g.generateTexture('bg_ruins_3', 1000, 300);
    
    // Layer 4: Fallen stones
    g.clear();
    g.fillStyle(0x5a5a4a, 1);
    g.fillEllipse(100, 480, 60, 40);
    g.fillEllipse(300, 500, 80, 50);
    g.fillEllipse(500, 470, 55, 35);
    g.fillEllipse(700, 490, 70, 45);
    g.generateTexture('bg_ruins_4', 900, 560);
    
    // Layer 5: Moss patches
    g.clear();
    g.fillStyle(0x2a5a2a, 0.8);
    g.fillEllipse(120, 530, 80, 35);
    g.fillEllipse(350, 545, 90, 40);
    g.fillEllipse(600, 520, 75, 32);
    g.fillEllipse(800, 540, 85, 38);
    g.generateTexture('bg_ruins_5', 1000, 600);
    
    // Layer 6: Statues
    g.clear();
    g.fillStyle(0x808080, 1);
    g.fillRect(100, 400, 40, 100);
    g.fillCircle(120, 380, 25);
    g.fillRect(400, 420, 35, 80);
    g.fillCircle(417, 400, 20);
    g.fillRect(700, 390, 45, 110);
    g.fillCircle(722, 365, 28);
    g.generateTexture('bg_ruins_6', 900, 550);
    
    // ==================== CANYON-BASE BIOME (7 LAYERS) ====================
    // Layer 0: Red/orange sky
    g.fillGradientStyle(0xFF4500, 0xFF4500, 0xFFA07A, 0xDEB887, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_canyon_0', 800, 600);
    
    // Layer 1: Far canyon walls
    g.clear();
    g.fillStyle(0x8B4513, 0.5);
    g.fillTriangle(0, 500, 200, 150, 400, 500);
    g.fillTriangle(300, 500, 500, 100, 700, 500);
    g.fillTriangle(600, 500, 800, 180, 1000, 500);
    g.generateTexture('bg_canyon_1', 1000, 550);
    
    // Layer 2: Mid canyon layers
    g.clear();
    g.fillStyle(0xA0522D, 0.7);
    g.fillTriangle(0, 500, 150, 200, 300, 500);
    g.fillTriangle(200, 500, 400, 180, 600, 500);
    g.fillTriangle(500, 500, 700, 220, 900, 500);
    // Rock layers
    g.fillStyle(0xCD853F, 0.6);
    g.fillRect(0, 350, 800, 15);
    g.fillRect(0, 420, 800, 12);
    g.generateTexture('bg_canyon_2', 900, 550);
    
    // Layer 3: Canyon floor
    g.clear();
    g.fillStyle(0xDEB887, 1);
    g.fillRect(0, 480, 800, 80);
    g.fillStyle(0xD2691E, 0.8);
    for (let i = 0; i < 20; i++) {
      g.fillEllipse(i * 45 + 20, 510, 30, 15);
    }
    g.generateTexture('bg_canyon_3', 800, 560);
    
    // Layer 4: Rock formations
    g.clear();
    g.fillStyle(0x8B4513, 0.9);
    g.fillTriangle(100, 400, 150, 250, 200, 400);
    g.fillTriangle(350, 420, 420, 200, 490, 420);
    g.fillTriangle(600, 380, 680, 180, 760, 380);
    g.generateTexture('bg_canyon_4', 900, 500);
    
    // Layer 5: Eagles
    g.clear();
    g.fillStyle(0x2F2F2F, 1);
    for (let i = 0; i < 8; i++) {
      const x = 100 + i * 100;
      const y = 150 + (i % 3) * 50;
      g.fillEllipse(x, y, 20, 8);
      g.fillTriangle(x - 12, y, x - 25, y - 15, x - 12, y + 5);
      g.fillTriangle(x + 12, y, x + 25, y - 15, x + 12, y + 5);
    }
    g.generateTexture('bg_canyon_5', 900, 300);
    
    // Layer 6: Dust particles
    g.clear();
    g.fillStyle(0xDEB887, 0.5);
    for (let i = 0; i < 50; i++) {
      const x = (i * 37) % 800;
      const y = 400 + (i * 23) % 150;
      g.fillCircle(x, y, 1 + (i % 3));
    }
    g.generateTexture('bg_canyon_6', 800, 600);
    
    // ==================== SPACE-STAR BIOME (7 LAYERS) ====================
    // Layer 0: Deep space
    g.fillGradientStyle(0x000000, 0x000000, 0x0a0a20, 0x1a1a3a, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_space_0', 800, 600);
    
    // Layer 1: Stars far
    g.clear();
    g.fillStyle(0xFFFFFF, 0.8);
    for (let i = 0; i < 100; i++) {
      const x = (i * 73) % 800;
      const y = (i * 47) % 600;
      const size = 0.5 + (i % 3) * 0.5;
      g.fillCircle(x, y, size);
    }
    g.generateTexture('bg_space_1', 800, 600);
    
    // Layer 2: Nebula
    g.clear();
    g.fillStyle(0x4B0082, 0.2);
    g.fillEllipse(200, 200, 200, 100);
    g.fillStyle(0x0000FF, 0.15);
    g.fillEllipse(500, 300, 250, 120);
    g.fillStyle(0xFF1493, 0.1);
    g.fillEllipse(650, 150, 150, 80);
    g.generateTexture('bg_space_2', 900, 450);
    
    // Layer 3: Planets
    g.clear();
    g.fillStyle(0xCD853F, 1);
    g.fillCircle(150, 150, 40);
    g.fillStyle(0xDEB887, 1);
    g.fillEllipse(150, 150, 60, 8);
    g.fillStyle(0x4169E1, 1);
    g.fillCircle(550, 250, 55);
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(700, 100, 20);
    g.generateTexture('bg_space_3', 800, 400);
    
    // Layer 4: Asteroids
    g.clear();
    g.fillStyle(0x696969, 1);
    for (let i = 0; i < 20; i++) {
      const x = (i * 67) % 800;
      const y = (i * 43) % 500;
      const size = 8 + (i % 10);
      g.fillEllipse(x, y, size, size * 0.8);
    }
    g.generateTexture('bg_space_4', 800, 500);
    
    // Layer 5: Satellites
    g.clear();
    g.fillStyle(0xC0C0C0, 1);
    g.fillRect(200, 300, 60, 8);
    g.fillRect(190, 295, 80, 18);
    g.fillStyle(0x00FF00, 1);
    g.fillCircle(200, 304, 4);
    g.fillStyle(0xC0C0C0, 1);
    g.fillRect(500, 200, 50, 6);
    g.fillRect(490, 196, 70, 14);
    g.fillStyle(0xFF0000, 1);
    g.fillCircle(500, 203, 3);
    g.generateTexture('bg_space_5', 600, 350);
    
    // Layer 6: Space station
    g.clear();
    g.fillStyle(0x808080, 1);
    g.fillRect(300, 400, 200, 40);
    g.fillRect(350, 380, 30, 20);
    g.fillRect(420, 380, 30, 20);
    g.fillRect(350, 440, 30, 20);
    g.fillRect(420, 440, 30, 20);
    g.fillStyle(0x00BFFF, 0.8);
    g.fillRect(310, 410, 180, 20);
    g.generateTexture('bg_space_6', 800, 500);
    
    // ==================== CASTLE-FINAL BIOME (7 LAYERS) ====================
    // Layer 0: Midnight sky
    g.fillGradientStyle(0x000020, 0x000020, 0x000040, 0x000060, 1);
    g.fillRect(0, 0, 800, 600);
    g.generateTexture('bg_castle_0', 800, 600);
    
    // Layer 1: Stars
    g.clear();
    g.fillStyle(0xFFFFFF, 0.9);
    for (let i = 0; i < 80; i++) {
      const x = (i * 59) % 800;
      const y = (i * 37) % 400;
      const size = 1 + (i % 3);
      g.fillCircle(x, y, size);
    }
    g.generateTexture('bg_castle_1', 800, 450);
    
    // Layer 2: Castle silhouette
    g.clear();
    g.fillStyle(0x1a1a2a, 0.9);
    g.fillRect(100, 250, 80, 200);
    g.fillRect(250, 200, 100, 250);
    g.fillRect(450, 180, 120, 270);
    g.fillRect(650, 220, 90, 230);
    // Towers
    g.fillTriangle(90, 250, 190, 250, 140, 180);
    g.fillTriangle(240, 200, 360, 200, 300, 120);
    g.fillTriangle(440, 180, 580, 180, 510, 80);
    g.fillTriangle(640, 220, 750, 220, 695, 140);
    g.generateTexture('bg_castle_2', 900, 500);
    
    // Layer 3: Banners
    g.clear();
    g.fillStyle(0x8B0000, 1);
    g.fillRect(145, 200, 20, 80);
    g.fillRect(295, 150, 25, 100);
    g.fillRect(505, 120, 22, 90);
    g.fillRect(690, 170, 18, 75);
    g.fillStyle(0xFFD700, 1);
    g.fillTriangle(140, 200, 170, 200, 155, 280);
    g.fillTriangle(290, 150, 325, 150, 307, 250);
    g.fillTriangle(500, 120, 532, 120, 516, 210);
    g.fillTriangle(685, 170, 715, 170, 700, 245);
    g.generateTexture('bg_castle_3', 800, 350);
    
    // Layer 4: Torches
    g.clear();
    g.fillStyle(0x8B4513, 1);
    g.fillRect(80, 400, 10, 60);
    g.fillRect(280, 380, 12, 70);
    g.fillRect(500, 350, 10, 65);
    g.fillRect(720, 370, 11, 68);
    // Flames
    g.fillStyle(0xFF4500, 1);
    g.fillEllipse(85, 395, 15, 20);
    g.fillEllipse(286, 375, 18, 22);
    g.fillEllipse(505, 345, 16, 18);
    g.fillEllipse(725, 365, 17, 21);
    g.fillStyle(0xFFD700, 0.8);
    g.fillEllipse(85, 395, 8, 12);
    g.fillEllipse(286, 375, 10, 14);
    g.fillEllipse(505, 345, 9, 11);
    g.fillEllipse(725, 365, 10, 13);
    g.generateTexture('bg_castle_4', 800, 500);
    
    // Layer 5: Chandelier
    g.clear();
    g.fillStyle(0xFFD700, 1);
    g.fillRect(380, 350, 40, 15);
    g.fillRect(370, 365, 60, 10);
    g.fillStyle(0xFFFF00, 0.9);
    g.fillCircle(390, 380, 8);
    g.fillCircle(410, 385, 6);
    g.fillCircle(400, 390, 7);
    // Chains
    g.fillStyle(0x808080, 1);
    g.fillRect(395, 320, 3, 35);
    g.fillRect(405, 325, 2, 30);
    g.generateTexture('bg_castle_5', 800, 450);
    
    // Layer 6: Fireworks (subtle)
    g.clear();
    g.fillStyle(0xFF0000, 0.7);
    g.fillCircle(200, 100, 5);
    g.fillCircle(195, 95, 3);
    g.fillStyle(0x00FF00, 0.7);
    g.fillCircle(500, 80, 4);
    g.fillCircle(496, 76, 2);
    g.fillStyle(0x0000FF, 0.7);
    g.fillCircle(700, 120, 5);
    g.fillCircle(696, 116, 3);
    g.generateTexture('bg_castle_6', 800, 200);
    
    g.destroy();
  }

  private createItemTextures() {
    const g = this.add.graphics();
    g.fillStyle(0xf8f8f8, 1); g.fillRoundedRect(10, 16, 12, 12, 4);
    g.fillStyle(0xe00000, 1); g.fillEllipse(16, 10, 16, 12);
    g.fillStyle(0xf8f8f8, 1); g.fillCircle(16, 6, 4);
    g.generateTexture('mushroom', 32, 28);

    g.clear();
    g.fillStyle(0x2ecc71, 1); g.fillRect(14, 16, 4, 16);
    g.fillStyle(0xf1c40f, 1); g.fillCircle(16, 12, 12);
    g.fillStyle(0xffffff, 1); g.fillCircle(16, 12, 8);
    g.fillStyle(0xc0392b, 1); g.fillCircle(16, 12, 4);
    g.generateTexture('flower', 32, 32);

    g.clear();
    g.fillStyle(0xf8d870, 1); g.fillTriangle(16, 0, 0, 32, 32, 32);
    g.generateTexture('star', 32, 32);

    g.clear();
    g.fillStyle(0xf8f8f8, 1); g.fillRect(14, 0, 4, 64);
    g.fillStyle(0x000000, 1); g.fillCircle(16, 4, 6);
    g.generateTexture('goal', 40, 64);
    g.destroy();
  }

  private createParticleTextures() {
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 1); g.fillRect(0, 0, 4, 4);
    g.generateTexture('particle', 4, 4);
    g.destroy();
  }
}