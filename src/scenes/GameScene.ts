import Phaser from 'phaser';
import { loadLevel, getLevelName } from '../generator/LevelLoader';
import type { LevelData } from '../data/levels';
import { GAME_HEIGHT, GAME_WIDTH } from '../config';

const PLAYER_SPEED = 350;
const JUMP_VELOCITY = -900;
const GRAVITY = 2000;

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private solidPlatforms!: Phaser.Physics.Arcade.StaticGroup;
  private movingPlatforms!: Phaser.Physics.Arcade.Group;
  private enemies!: Phaser.Physics.Arcade.Group;
  private coins!: Phaser.Physics.Arcade.StaticGroup;
  private questionBlocks!: Phaser.Physics.Arcade.StaticGroup;
  private powerUps!: Phaser.Physics.Arcade.Group;
  private fireballs!: Phaser.Physics.Arcade.Group;
  private goal!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private shootKey!: Phaser.Input.Keyboard.Key;
  private escapeKey!: Phaser.Input.Keyboard.Key;
  
  private score: number = 0;
  private coinCount: number = 0;
  private lives: number = 3;
  private levelIndex: number = 0;
  private levelId: number = 0;
  private timeLeft: number = 300;
  private timerEvent!: Phaser.Time.TimerEvent;
  
  private isPlayerBig: boolean = false;
  private isPlayerFire: boolean = false;
  private isInvincible: boolean = false;
  private isDead: boolean = false;
  private isTransitioning: boolean = false;
  private lastFired: number = 0;

  private scoreText!: Phaser.GameObjects.Text;
  private coinText!: Phaser.GameObjects.Text;
  private livesText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private worldText!: Phaser.GameObjects.Text;
  private scoreValText!: Phaser.GameObjects.Text;
  private coinValText!: Phaser.GameObjects.Text;
  private livesValText!: Phaser.GameObjects.Text;
  private timerValText!: Phaser.GameObjects.Text;
  private worldValText!: Phaser.GameObjects.Text;

  private audioContext?: AudioContext;
  private isMusicPlaying: boolean = false;
  private musicLoopInterval?: any;

  private currentLevelData?: LevelData;
  private movingPlatformData: Map<Phaser.GameObjects.Sprite, { startX: number; startY: number; moveType: string; range: number; speed: number; angle?: number }> = new Map();

  constructor() { super({ key: 'Game' }); }

  init(data: any) {
    this.levelIndex = data.levelIndex || 0;
    this.score = data.score || 0;
    this.lives = data.lives !== undefined ? data.lives : 3;
    this.coinCount = data.coinCount || 0;
    this.isPlayerBig = data.isPlayerBig || false;
    this.isPlayerFire = data.isPlayerFire || false;
    this.levelId = data.levelId || 0;
  }

  create() {
    this.currentLevelData = loadLevel(this.levelIndex);
    const level = this.currentLevelData;
    this.levelId = level.id;
    
    this.isDead = false;
    this.isTransitioning = false;
    this.timeLeft = 300 + (level.timeBonus || 0);

    this.setupWorld(level);
    this.createGroups();
    this.spawnEntities(level);
    this.setupPlayer(level);
    this.createUI();
    this.setupCollisions();
    this.setupTimer();
    
    this.shootKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.escapeKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    
    // ESC to quit to level select
    this.escapeKey.on('down', () => {
      this.isMusicPlaying = false;
      if (this.musicLoopInterval) clearInterval(this.musicLoopInterval);
      this.scene.stop('Game');
      this.scene.start('Title');
    });
    
    // Start music on first input (click or key)
    this.input.once('pointerdown', () => this.startBgm());
    this.input.keyboard!.once('keydown', () => this.startBgm());
  }

  private setupWorld(level: LevelData) {
    this.physics.world.gravity.y = GRAVITY;
    this.physics.world.setBounds(0, 0, level.width, GAME_HEIGHT);
    this.cameras.main.setBounds(0, 0, level.width, GAME_HEIGHT);
    
    const biomePrefix: Record<string, string> = {
      'grasslands': 'bg_grasslands',
      'desert': 'bg_desert',
      'water': 'bg_water',
      'ice-snow': 'bg_ice',
      'sky-clouds': 'bg_sky',
      'forest': 'bg_forest',
      'village': 'bg_village',
      'beach-island': 'bg_beach',
      'factory': 'bg_factory',
      'volcano-lava': 'bg_volcano',
      'haunted-mansion': 'bg_haunted',
      'ruins': 'bg_ruins',
      'canyon-base': 'bg_canyon',
      'space-star': 'bg_space',
      'castle-final': 'bg_castle',
    };
    
    const prefix = biomePrefix[level.biome] || 'bg_grasslands';
    
    const scrollFactors = [0, 0.02, 0.05, 0.1, 0.2, 0.3, 0.4];
    const depths = [-100, -95, -90, -85, -80, -75, -70];
    const widths = [1200, 1400, 1600, 1600, 1600, 1200, 1200];
    const heights = [800, 400, 450, 500, 550, 600, 650];
    const yPositions = [GAME_HEIGHT / 2, 320, 360, 400, 440, 480, 520];

    for (let i = 0; i < 7; i++) {
      this.add.tileSprite(GAME_WIDTH / 2, yPositions[i], widths[i], heights[i], `${prefix}_${i}`)
        .setScrollFactor(scrollFactors[i], 0)
        .setDepth(depths[i]);
    }
  }

  private createGroups() {
    this.platforms = this.physics.add.staticGroup();
    this.solidPlatforms = this.physics.add.staticGroup();
    this.movingPlatforms = this.physics.add.group();
    this.enemies = this.physics.add.group();
    this.coins = this.physics.add.staticGroup();
    this.questionBlocks = this.physics.add.staticGroup();
    this.powerUps = this.physics.add.group();
    this.fireballs = this.physics.add.group();
  }

  private spawnEntities(level: LevelData) {
    // Render decorations in background
    if (level.decorations) {
      level.decorations.forEach(d => {
        const dec = this.add.image(d.x, d.y, d.type);
        dec.setScrollFactor(0.3, 0.3).setDepth(-85);
      });
    }
    
    const SOLID_TYPES = ['grass', 'stone', 'brick', 'cave', 'castle', 'metal', 'lava', 'wood', 'sand', 'snow', 'ruins', 'space', 'sandstone', 'ground', 'cloud'];

    level.platforms.forEach(p => {
      let tex = 'ground_grass';
      const platType = p.type as string;
      if (platType === 'brick') tex = 'brick';
      else if (platType === 'cave') tex = 'ground_cave';
      else if (platType === 'castle') tex = 'ground_castle';
      else if (platType === 'pipe') tex = 'pipe';
      else if (platType === 'platform_easy') tex = 'platform_easy';
      else if (platType === 'platform_medium') tex = 'platform_medium';
      else if (platType === 'platform_hard') tex = 'platform_hard';
      else if (platType === 'metal') tex = 'ground_metal';
      else if (platType === 'wood') tex = 'ground_cave';
      else if (platType === 'sand') tex = 'ground_sand';
      else if (platType === 'snow') tex = 'ground_snow';
      else if (platType === 'lava') tex = 'ground_lava';
      else if (platType === 'space') tex = 'ground_space';
      else if (platType === 'sandstone') tex = 'ground_ruins';
      else if (platType === 'cloud') tex = 'cloud_block';
      else if (platType === 'water') tex = 'ground_water';
      else if (platType === 'ruins') tex = 'ground_ruins';
      else if (platType === 'stone') tex = 'ground_stone';
      else if (platType === 'bubble') tex = 'cloud_block';
      else if (platType === 'ground') tex = 'ground_grass';
      else if (platType === 'pipe_top') tex = 'pipe';
      
      const isSolid = SOLID_TYPES.includes(p.type);
      const targetGroup = isSolid ? this.solidPlatforms : this.platforms;
      
      const platform = targetGroup.create(p.x, p.y, tex);
      platform.setDisplaySize(p.w, p.h).refreshBody();
      (platform as any).platformType = p.type;
      if (platType === 'pipe' || platType === 'pipe_top') {
        platform.setDepth(5);
      }
    });
    
    if (level.movingPlatforms) {
      level.movingPlatforms.forEach(mp => {
        let tex = 'platform_easy';
        if (mp.type === 'platform_medium') tex = 'platform_medium';
        else if (mp.type === 'platform_hard') tex = 'platform_hard';
        
        const mplat = this.movingPlatforms.create(mp.x, mp.y, tex);
        mplat.setDisplaySize(mp.w, mp.h).refreshBody();
        mplat.body.setAllowGravity(false);
        mplat.setImmovable(true);
        
        this.movingPlatformData.set(mplat, {
          startX: mp.x,
          startY: mp.y,
          moveType: mp.moveType,
          range: mp.range,
          speed: mp.speed
        });
      });
    }
    
    level.coins.forEach(c => this.coins.create(c.x, c.y, 'coin'));
    level.questionBlocks.forEach(q => {
      const b = this.questionBlocks.create(q.x, q.y, 'question');
      (b as any).contents = q.contents;
    });
    level.enemies.forEach(e => {
      // Check if there's solid ground below the enemy (within 60px vertical gap)
      let hasSolidBelow = false;
      for (const p of level.platforms) {
        const platLeft = p.x - p.w / 2;
        const platRight = p.x + p.w / 2;
        const platTop = p.y - p.h / 2;
        
        // Enemy is above/within platform and platform is solid type
        if (e.x >= platLeft - 20 && e.x <= platRight + 20 && 
            e.y >= platTop - 10 && e.y <= platTop + 50 &&
            SOLID_TYPES.includes(p.type)) {
          hasSolidBelow = true;
          break;
        }
      }
      
      // If no solid platform below, create invisible ground platform
      if (!hasSolidBelow) {
        const safePlat = this.solidPlatforms.create(e.x, e.y + 35, 'ground_grass');
        safePlat.setDisplaySize(80, 20).refreshBody();
        (safePlat as any).platformType = 'grass';
      }
      
      const enemy = this.enemies.create(e.x, e.y, e.type);
      // Ground enemies - have edge detection (won't fall off platforms)
      if (e.type === 'goomba' || e.type === 'spiny' || e.type === 'koopa' || e.type === 'robot' || e.type === 'crab') {
        enemy.setVelocityX(-80).setCollideWorldBounds(true).setBounce(0);
        enemy.setDragX(0);
      } else if (e.type === 'boo' || e.type === 'fireball' || e.type === 'ghost' || e.type === 'ufo') {
        // Floating enemies - no gravity, no edge detection
        enemy.body.setAllowGravity(false);
        enemy.setVelocityX(-80).setCollideWorldBounds(true).setBounce(0);
        enemy.setData('noEdgeDetection', true);
} else if (e.type === 'piranha') {
        enemy.body.setAllowGravity(false);
        enemy.setImmovable(true);
        enemy.setData('noEdgeDetection', true);
        enemy.setDepth(-5);

        let pipeCenterX = e.x;
        let pipeTopY = e.y;
        let hasPipe = false;

        for (const platform of level.platforms) {
          const typeStr = platform.type as string;
          if ((typeStr === 'pipe' || typeStr === 'pipe_top') &&
              Math.abs(e.x - platform.x) < platform.w / 2 + 10 &&
              Math.abs(e.y - platform.y) < 200) {
            pipeCenterX = platform.x;
            pipeTopY = platform.y - platform.h / 2;
            hasPipe = true;
            break;
          }
        }

        if (hasPipe) {
          enemy.setX(pipeCenterX);
          const hiddenY = pipeTopY + 35;
          const peekY = pipeTopY - 50;
          enemy.setY(hiddenY);
          enemy.setData('hiddenY', hiddenY);
          enemy.setData('peekY', peekY);
          this.tweens.add({
            targets: enemy,
            y: { from: hiddenY, to: peekY },
            duration: 1500,
            ease: 'Sine.easeInOut',
            hold: 3000,
            yoyo: true,
            repeat: -1,
            repeatDelay: 2000,
            delay: Math.random() * 2000,
          });
        } else {
          enemy.destroy();
        }
      } else if (e.type === 'thwomp') {
        enemy.body.setAllowGravity(false);
        enemy.setImmovable(true);
        enemy.setData('noEdgeDetection', true);
      } else if (e.type === 'lakitu') {
        enemy.setVelocityX(-60).setCollideWorldBounds(true);
        enemy.setData('noEdgeDetection', true);
      } else if (e.type === 'bullet_bill') {
        enemy.setVelocityX(-400).setCollideWorldBounds(true);
        enemy.setData('noEdgeDetection', true);
      } else if (e.type === 'boss') {
        enemy.setVelocityX(-50).setCollideWorldBounds(true).setBounce(0);
        enemy.setData('noEdgeDetection', true);
      } else {
        enemy.setVelocityX(-50).setCollideWorldBounds(true);
      }
    });
    // Correctly store and setup the goal
    this.goal = this.physics.add.sprite(level.goal.x, level.goal.y, 'flag').setImmovable(true);
    (this.goal.body as Phaser.Physics.Arcade.Body).allowGravity = false;
  }

  private setupPlayer(level: LevelData) {
    let tex = 'player_idle';
    if (this.isPlayerFire) tex = 'player_fire';
    else if (this.isPlayerBig) tex = 'player_big';
    this.player = this.physics.add.sprite(level.playerStart.x, level.playerStart.y, tex);
    this.player.setCollideWorldBounds(false);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (this.isPlayerBig || this.isPlayerFire) body.setSize(24, 48);
    else body.setSize(22, 32);
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
  }

  private setupCollisions() {
    // Player hits lava = die
    this.physics.add.collider(this.player, this.solidPlatforms, (p, plat) => { if ((plat as any).platformType === 'lava') this.die(); });
    
    // Enemies collide with ALL platforms and turn around
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.physics.add.collider(this.enemies, this.solidPlatforms, (e: any) => { 
        if (e.body?.blocked?.left || e.body?.blocked?.right) {
            e.setVelocityX(-e.body.velocity.x);
        }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.physics.add.collider(this.enemies, this.platforms, (e: any) => {
        if (e.body?.blocked?.left || e.body?.blocked?.right) {
            e.setVelocityX(-e.body.velocity.x);
        }
    });
    
    // Floating platforms: player can land on top
    this.physics.add.collider(this.player, this.platforms);
    
    // Moving platforms: player can land on top
    this.physics.add.collider(this.player, this.movingPlatforms);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.physics.add.collider(this.player, this.questionBlocks, (p: any, b: any) => { if (p.body?.touching?.up && b.body?.touching?.down) this.hitQuestionBlock(b); });
    this.physics.add.overlap(this.player, this.coins, (_p, c) => { c.destroy(); this.coinCount++; this.score += 100; });
    
    // Enemy collision - use collider for proper physics response
    this.physics.add.collider(this.player, this.enemies, (p: any, e: any) => {
        if (this.isDead || this.isInvincible) return;
        // Piranha plants cannot be stomped - always kill player
        if (e.getData('type') === 'piranha' || e.texture?.key === 'piranha') {
            this.playerHit();
            return;
        }
        // Player must be falling OR player bottom near enemy top AND player is above enemy
        const playerFeet = p.body.bottom;
        const enemyTop = e.body.y - e.body.height / 2;
        const enemyMid = e.body.y + e.body.height / 2;
        const isAbove = p.body.y < e.body.y;
        const isFalling = p.body.velocity.y >= 0;
        const isStomping = isAbove && playerFeet < enemyMid && (isFalling || playerFeet < enemyTop + 30);
        if (isStomping) {
            this.killEnemy(e);
            p.setVelocityY(-400);
            this.score += 500;
        } else {
            this.playerHit();
        }
    });
    
    this.physics.add.overlap(this.player, this.powerUps, (_p, pu) => this.collectPowerUp(pu as any));
    this.physics.add.overlap(this.player, this.goal, () => this.reachGoal()); // Use the goal variable
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.physics.add.overlap(this.fireballs, this.enemies, (f: any, e: any) => { this.killEnemy(e as any); f.destroy(); this.score += 500; });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.physics.add.collider(this.fireballs, this.solidPlatforms, (f: any, _p: any) => { if (f.body?.blocked?.left || f.body?.blocked?.right) f.destroy(); });
  }

  private handleEnemyContact(enemy: Phaser.Physics.Arcade.Sprite) {
    if (this.isDead || this.isInvincible) return;
    if (this.player.body!.velocity.y > 0) { this.killEnemy(enemy); this.player.setVelocityY(-400); this.score += 500; }
    else { this.playerHit(); }
  }

  private killEnemy(enemy: Phaser.GameObjects.Sprite) {
    const x = enemy.x;
    const y = enemy.y;
    
    this.tweens.add({
      targets: enemy,
      scaleX: 0,
      scaleY: 0,
      alpha: 0,
      angle: 180,
      duration: 200,
      ease: 'Power2',
      onComplete: () => { enemy.destroy(); }
    });
    
    const popup = this.add.text(x, y - 20, '+500', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#FFD700',
      stroke: '#000',
      strokeThickness: 3
    }).setOrigin(0.5).setDepth(100);
    
    this.tweens.add({
      targets: popup,
      y: y - 60,
      alpha: 0,
      duration: 800,
      ease: 'Power2',
      onComplete: () => { popup.destroy(); }
    });
  }

  private hitQuestionBlock(block: any) {
    if (block.isEmpty) return;
    block.isEmpty = true;
    block.setTexture('question_used');
    this.tweens.add({ targets: block, y: block.y - 10, duration: 100, yoyo: true });
    const content = block.contents;
    if (content === 'coin') { this.coinCount++; this.score += 200; }
    else { const pu = this.powerUps.create(block.x, block.y - 32, content); pu.setVelocityY(-200); (pu as any).type = content; }
  }

  private collectPowerUp(pu: any) {
    const type = pu.type;
    pu.destroy();
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (type === 'mushroom') { if (!this.isPlayerBig) { this.isPlayerBig = true; this.player.y -= 16; this.player.setTexture('player_big'); body.setSize(24, 48); } }
    else if (type === 'flower') { if (!this.isPlayerBig) this.player.y -= 16; this.isPlayerBig = true; this.isPlayerFire = true; this.player.setTexture('player_fire'); body.setSize(24, 48); }
    else if (type === 'star') { this.makeInvincible(5000); }
    this.score += 1000;
  }

  private makeInvincible(duration: number) { this.isInvincible = true; this.player.setAlpha(0.5); this.time.delayedCall(duration, () => { this.isInvincible = false; this.player.setAlpha(1); }); }

  private playerHit() {
    if (this.isInvincible) return;
    if (this.isPlayerFire) { this.isPlayerFire = false; this.player.setTexture('player_big'); this.makeInvincible(2000); }
    else if (this.isPlayerBig) { this.isPlayerBig = false; this.player.setTexture('player_idle'); (this.player.body as Phaser.Physics.Arcade.Body).setSize(22, 32); this.makeInvincible(2000); }
    else this.die();
  }

  private die() {
    if (this.isDead) return;
    this.isDead = true;
    this.isMusicPlaying = false;
    if (this.musicLoopInterval) clearInterval(this.musicLoopInterval);
    this.physics.world.pause();
    this.player.setTint(0xff0000).setVelocity(0, -500);
    this.time.delayedCall(2000, () => {
        this.lives--;
        if (this.lives <= 0) this.scene.start('GameOver', { score: this.score });
        else this.scene.restart({ levelIndex: this.levelIndex, lives: this.lives, score: this.score, coinCount: this.coinCount });
    });
  }

  private setupTimer() { if (this.timerEvent) this.timerEvent.destroy(); this.timerEvent = this.time.addEvent({ delay: 1000, callback: () => { if (this.isDead) return; this.timeLeft--; if (this.timeLeft <= 0) this.die(); }, loop: true }); }

  private createUI() {
    const levelData = this.currentLevelData;
    const levelName = levelData?.name || `Level ${this.levelIndex + 1}`;

    const labelStyle = { fontSize: '12px', fontFamily: 'Arial', color: '#fff', stroke: '#000', strokeThickness: 3 };
    const valueStyle = { fontSize: '22px', fontFamily: 'Arial', color: '#fff', stroke: '#000', strokeThickness: 3 };
    const hudY = 20;
    const valY = hudY + 18;

    this.scoreText = this.add.text(20, hudY, 'MARIO', labelStyle).setScrollFactor(0).setDepth(1000);
    this.coinText = this.add.text(160, hudY, 'COINS', labelStyle).setScrollFactor(0).setDepth(1000);
    this.worldText = this.add.text(300, hudY, 'WORLD', labelStyle).setScrollFactor(0).setDepth(1000);
    this.timerText = this.add.text(440, hudY, 'TIME', labelStyle).setScrollFactor(0).setDepth(1000);
    this.livesText = this.add.text(GAME_WIDTH - 100, hudY, 'LIVES', labelStyle).setScrollFactor(0).setDepth(1000);

    // Value texts that get updated
    this.scoreValText = this.add.text(20, valY, '', valueStyle).setScrollFactor(0).setDepth(1000);
    this.coinValText = this.add.text(160, valY, '', valueStyle).setScrollFactor(0).setDepth(1000);
    this.worldValText = this.add.text(300, valY, '', valueStyle).setScrollFactor(0).setDepth(1000);
    this.timerValText = this.add.text(440, valY, '', valueStyle).setScrollFactor(0).setDepth(1000);
    this.livesValText = this.add.text(GAME_WIDTH - 100, valY, '', valueStyle).setScrollFactor(0).setDepth(1000);

    // Level name display - centered below HUD
    this.add.text(GAME_WIDTH / 2, 75, levelName, {
      fontSize: '16px',
      fontFamily: 'Arial',
      color: '#FFD700',
      stroke: '#000',
      strokeThickness: 2
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1000);
    
    // ESC hint
    this.add.text(GAME_WIDTH - 20, GAME_HEIGHT - 20, 'ESC = Quit', {
      fontSize: '12px',
      fontFamily: 'Arial',
      color: '#aaa',
      stroke: '#000',
      strokeThickness: 1
    }).setOrigin(1, 1).setScrollFactor(0).setDepth(1000);
  }

  private updateUI() {
    this.scoreValText.setText(this.score.toString().padStart(6, '0'));
    this.coinValText.setText('x' + this.coinCount.toString().padStart(2, '0'));
    this.worldValText.setText(this.levelId + '-' + (this.levelIndex % 6 + 1));
    this.timerValText.setText(Math.max(0, this.timeLeft).toString().padStart(3, '0'));
    this.livesValText.setText(String(this.lives));
  }

  update(time: number) {
    if (this.isDead || this.isTransitioning) return;
    this.updateUI();
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (this.cursors.left.isDown) { body.setVelocityX(-300); this.player.setFlipX(true); }
    else if (this.cursors.right.isDown) { body.setVelocityX(300); this.player.setFlipX(false); }
    else body.setVelocityX(0);
    if (this.cursors.up.isDown && body.blocked.down) body.setVelocityY(JUMP_VELOCITY);
    if (this.shootKey.isDown && this.isPlayerFire && time > this.lastFired) { this.shootFireball(); this.lastFired = time + 250; }
    
    // Update moving platforms
    this.movingPlatforms.getChildren().forEach((mplat: any) => {
      const data = this.movingPlatformData.get(mplat);
      if (!data) return;
      
      if (data.moveType === 'horizontal') {
        mplat.x = data.startX + Math.sin(time * 0.001 * data.speed) * data.range;
      } else if (data.moveType === 'vertical') {
        mplat.y = data.startY + Math.sin(time * 0.001 * data.speed) * data.range;
      } else if (data.moveType === 'circular') {
        if (!data.angle) data.angle = 0;
        data.angle += data.speed * 0.016;
        mplat.x = data.startX + Math.cos(data.angle) * data.range;
        mplat.y = data.startY + Math.sin(data.angle) * data.range;
      }
      mplat.body.updateFromGameObject();
    });
    
    // Enemy platform edge detection - turn around instead of falling
    const level = this.currentLevelData;
    if (level) {
      const SOLID_TYPES = ['grass', 'stone', 'brick', 'cave', 'castle', 'metal', 'lava', 'wood', 'sand', 'snow', 'ruins', 'space', 'sandstone', 'ground', 'sand', 'water', 'dirt'];
      this.enemies.getChildren().forEach((enemy: any) => {
        if (!enemy.body || enemy.getData('noEdgeDetection')) return;
        const vx = enemy.body.velocity.x;
        if (vx === 0) return;
        
        const ex = enemy.body.x;
        const ey = enemy.body.y;
        const ew = enemy.body.width;
        const eh = enemy.body.height;
        
        let hasGroundBelow = false;
        for (const p of level.platforms) {
          if (!SOLID_TYPES.includes(p.type)) continue;
          const px = p.x - p.w / 2;
          const pw = p.w;
          const py = p.y - p.h / 2;
          
          if (ex + ew > px && ex < px + pw) {
            if (ey + eh >= py && ey + eh <= py + 40) {
              hasGroundBelow = true;
              break;
            }
          }
        }
        
        if (!hasGroundBelow) {
          enemy.setVelocityX(-vx);
          enemy.setX(enemy.x + (vx > 0 ? -2 : 2));
        }
      });
    }
    
    // Safety Threshold for death
    if (this.player.y > GAME_HEIGHT - 100) this.die();
  }

  private shootFireball() {
      const offsetX = this.player.flipX ? -20 : 20;
      const f = this.fireballs.create(this.player.x + offsetX, this.player.y, 'fireball');
      f.setVelocity(this.player.flipX ? -450 : 450, 200).setBounce(1, 0.8).setCircle(4);
  }

  private reachGoal() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.cameras.main.fadeOut(500);
      this.time.delayedCall(500, () => {
          this.scene.restart({ levelIndex: this.levelIndex + 1, lives: this.lives, score: this.score + 1000, coinCount: this.coinCount, isPlayerBig: this.isPlayerBig, isPlayerFire: this.isPlayerFire });
      });
  }

  private startBgm() {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    
    try {
      // Resume audio context if suspended (browser autoplay policy)
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx();
      
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      
      // More elaborate Mario-style background music
      // Main theme with intro
      const intro = [0, 0, 0, 0, 0, 0, 0, 0];
      const phraseA = [329.63, 329.63, 0, 329.63, 0, 261.63, 329.63, 0, 392.00, 0, 0, 0, 196.00, 0, 0, 0];
      const phraseB = [261.63, 0, 0, 196.00, 0, 0, 164.81, 0, 220.00, 0, 246.94, 0, 233.08, 220.00, 0, 0];
      const phraseC = [196.00, 329.63, 392.00, 440.00, 0, 349.23, 392.00, 0, 329.63, 0, 261.63, 293.66, 246.94, 0, 0, 0];
      
      // Full loop: intro + A + A + B + C + B + C
      const melody = [...intro, ...phraseA, ...phraseA, ...phraseB, ...phraseC, ...phraseB, ...phraseC];
      
      // Bassline
      const bassIntro = [0, 0, 0, 0];
      const bassA = [130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0, 98.00, 0, 98.00, 0, 98.00, 0, 98.00, 0];
      const bassB = [98.00, 0, 123.47, 0, 98.00, 0, 82.41, 0, 110.00, 0, 98.00, 0, 82.41, 0, 0, 0];
      const bassline = [...bassIntro, ...bassA, ...bassA, ...bassB, ...bassA, ...bassB, ...bassA];
      
      // Percussion - more complex pattern
      const drums = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0];
      
      let step = 0;
      this.musicLoopInterval = setInterval(() => {
        if (!this.isMusicPlaying || !this.audioContext || this.isDead) return;
        
        // Melody
        if (melody[step] > 0) {
          this.playNote(melody[step], 'triangle', 0.08, 0.15);
        }
        
        // Bass
        if (bassline[step] > 0) {
          this.playNote(bassline[step], 'square', 0.04, 0.12);
        }
        
        // Percussion (noise burst)
        if (drums[step] > 0) {
          this.playDrum(0.03);
        }
        
        step = (step + 1) % melody.length;
      }, 140);
    } catch (e) {}
  }
  
  private playDrum(volume: number) {
    if (!this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.05);
    gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.05);
  }

  private playNote(freq: number, type: OscillatorType, volume: number, duration: number) {
      if (!this.audioContext) return;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = type; osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
      gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);
      osc.connect(gain); gain.connect(this.audioContext.destination);
      osc.start(); osc.stop(this.audioContext.currentTime + duration);
  }
}