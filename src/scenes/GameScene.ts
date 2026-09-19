import Phaser from 'phaser';
import { loadLevel, getLevelName } from '../generator/LevelLoader';
import type { LevelData, Biome } from '../data/levels/index';
import { GAME_HEIGHT, GAME_WIDTH, BIOME_GRAVITY, SPRING_VELOCITY } from '../config';
import { goToTitle } from '../sceneNav';
import { canBreakBrick, isBrickLoadBearing } from '../data/levels/helpers';
import { BIOME_MUSIC } from '../audio/biomeMusic';
import type { BiomeSong } from '../audio/biomeMusic';
import { MusicPlayer } from '../audio/musicPlayer';

const PLAYER_SPEED = 300;
const JUMP_VELOCITY = -900;
const ACCEL = 1400;
const DECEL = 900;
const TURN_DECEL = 1600;
const MIN_ENEMY_SPAWN_DISTANCE = 500;

/** Enemies that cannot be stomped (see AGENTS.md). */
const NON_STOMPABLE_ENEMIES = new Set([
  'piranha', 'thwomp', 'boo', 'lakitu', 'bullet_bill', 'fireball', 'boss',
]);

const SOLID_TYPES = ['grass', 'stone', 'brick', 'brick_secret', 'brick_multi', 'cave', 'castle', 'metal', 'wood', 'sand', 'snow', 'ruins', 'space', 'sandstone', 'ground', 'cloud', 'water', 'hidden'];

const BIOME_ENEMY_SPEED: Record<string, number> = {
  'factory': 100,
  'volcano-lava': 100,
  'ruins': 110,
  'canyon-base': 120,
  'space-star': 100,
  'castle-final': 130,
};

const DEFAULT_ENEMY_SPEED = 80;

const BIOME_PARTICLE_CONFIG: Record<string, { key: string; color: number; frequency: number; lifespan: number } | null> = {
  'volcano-lava': { key: 'particle', color: 0xff4400, frequency: 300, lifespan: 2000 },
  'ice-snow': { key: 'particle', color: 0xffffff, frequency: 400, lifespan: 3000 },
  'space-star': { key: 'particle', color: 0x88ccff, frequency: 500, lifespan: 2500 },
  'sky-clouds': { key: 'particle', color: 0xeeeeff, frequency: 600, lifespan: 4000 },
  'haunted-mansion': { key: 'particle', color: 0x9966cc, frequency: 500, lifespan: 2000 },
};

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
  private spaceShoot!: Phaser.Input.Keyboard.Key;
  private escapeKey!: Phaser.Input.Keyboard.Key;
  private restartKey!: Phaser.Input.Keyboard.Key;
  private nextKey!: Phaser.Input.Keyboard.Key;
  
  private score: number = 0;
  private coinCount: number = 0;
  private displayedCoinCount: number = 0;
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
  private isQuitting: boolean = false;
  private isJumping: boolean = false;
  private lastCameraX: number = 0;
  private animFrame: number = 0;
  private animTime: number = 0;
  private readonly ANIM_SPEED: number = 120;
  private storedItemType: string | null = null;
  private storedItemIcon: Phaser.GameObjects.Rectangle | null = null;
  private lastFired: number = 0;
  private starKillChain: number = 0;
  private lastCoinMilestone: number = 0;

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
  private audioMaster?: GainNode;
  private audioDelay?: DelayNode;
  private audioDelayFeedback?: GainNode;
  private isMusicPlaying: boolean = false;
  private musicPlayer?: MusicPlayer;

  private currentLevelData?: LevelData;
  private bgTiles: Phaser.GameObjects.TileSprite[] = [];
  private currentBiome: string = '';
  private movingPlatformData: Map<Phaser.GameObjects.Sprite, { startX: number; startY: number; moveType: string; range: number; speed: number; angle?: number }> = new Map();
  
  // Phase 3: Special mechanics
  private bossProjectiles!: Phaser.Physics.Arcade.Group;
  private bossHp: number = 0;
  private bossHpBar?: Phaser.GameObjects.Graphics;
  private lastBossShot: number = 0;
  private fallingHazards!: Phaser.Physics.Arcade.Group;
  private windTime: number = 0;
  private springs!: Phaser.Physics.Arcade.StaticGroup;
  private spikes!: Phaser.Physics.Arcade.StaticGroup;
  private coinGateText?: Phaser.GameObjects.Text;
  private coinGateOpen: boolean = false;

  constructor() { super({ key: 'Game' }); }

  init(data: any) {
    this.levelIndex = data.levelIndex || 0;
    this.score = data.score || 0;
    this.lives = data.lives !== undefined ? data.lives : 3;
    this.coinCount = data.coinCount || 0;
    this.isPlayerBig = data.isPlayerBig || false;
    this.isPlayerFire = data.isPlayerFire || false;
    this.levelId = data.levelId || 0;
    this.isQuitting = false;
    this.isDead = false;
    this.isTransitioning = false;
    this.isInvincible = false;
    this.isJumping = false;
    this.lastCameraX = 0;
    this.animFrame = 0;
    this.animTime = 0;
    this.starKillChain = 0;
    this.lastCoinMilestone = 0;
    this.isMusicPlaying = false;
    this.stopMusic();
    this.storedItemType = null;
    if (this.storedItemIcon) { this.storedItemIcon.destroy(); this.storedItemIcon = null; }
    this.lastFired = 0;
  }

  create() {
    this.currentLevelData = loadLevel(this.levelIndex);
    const level = this.currentLevelData;
    this.levelId = level.id;
    
    this.isDead = false;
    this.isTransitioning = false;
    this.isQuitting = false;
    this.timeLeft = 300 + (level.timeBonus || 0);

    this.setupWorld(level);
    this.createGroups();
    this.spawnEntities(level);
    this.setupPlayer(level);
    this.createUI();
    this.setupCollisions();
    this.updateCoinGate();
    this.setupTimer();
    
    this.shootKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.spaceShoot = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.escapeKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.restartKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.nextKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    this.restartKey.on('down', this.onRestartKey, this);
    this.nextKey.on('down', this.onNextKey, this);
    
    // Start music on first input (click or key)
    this.input.once('pointerdown', () => this.startBgm());
    this.input.keyboard!.once('keydown', () => this.startBgm());

    if (this.game.canvas) {
      this.game.canvas.setAttribute('tabindex', '0');
      this.game.canvas.focus();
    }
  }

  private setupWorld(level: LevelData) {
    this.physics.world.gravity.y = BIOME_GRAVITY[level.biome] ?? 2000;
    this.physics.world.setBounds(0, 0, level.width, GAME_HEIGHT);
    this.cameras.main.setBounds(0, 0, level.width, GAME_HEIGHT);
    this.currentBiome = level.biome;
    this.bgTiles = [];
    
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
      const tile = this.add.tileSprite(GAME_WIDTH / 2, yPositions[i], widths[i], heights[i], `${prefix}_${i}`)
        .setScrollFactor(scrollFactors[i], 0)
        .setDepth(depths[i]);
      this.bgTiles.push(tile);
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
    this.bossProjectiles = this.physics.add.group();
    this.fallingHazards = this.physics.add.group();
    this.springs = this.physics.add.staticGroup();
    this.spikes = this.physics.add.staticGroup();
  }

  private spawnEntities(level: LevelData) {
    // Render decorations in background
    if (level.decorations) {
      level.decorations.forEach(d => {
        const dec = this.add.image(d.x, d.y, d.type);
        dec.setScrollFactor(0.3, 0.3).setDepth(-85);
        // Animate certain decoration types
        if (d.type === 'fire' || d.type === 'ember') {
          this.tweens.add({
            targets: dec,
            scaleX: { from: 1, to: 0.8 },
            scaleY: { from: 1, to: 1.2 },
            alpha: { from: 0.8, to: 1 },
            duration: 400 + Math.random() * 300,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            delay: Math.random() * 500,
          });
        } else if (d.type === 'bubble' || d.type === 'seaweed') {
          this.tweens.add({
            targets: dec,
            y: d.y - 6,
            duration: 1500 + Math.random() * 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            delay: Math.random() * 1000,
          });
        } else if (d.type === 'ghost' || d.type === 'cobweb') {
          this.tweens.add({
            targets: dec,
            alpha: { from: 0.5, to: 1 },
            duration: 2000 + Math.random() * 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
          });
        }
      });
    }

    // Ambient particle effects per biome
    const particleCfg = BIOME_PARTICLE_CONFIG[level.biome];
    if (particleCfg) {
      const particles = this.add.particles(0, 0, particleCfg.key, {
        x: { min: 0, max: level.width },
        y: -10,
        speedY: { min: 20, max: 60 },
        speedX: { min: -10, max: 10 },
        angle: { min: 80, max: 100 },
        scale: { start: 1, end: 0 },
        lifespan: particleCfg.lifespan,
        frequency: particleCfg.frequency,
        quantity: 1,
        tint: particleCfg.color,
        alpha: { start: 0.6, end: 0 },
      });
      particles.setDepth(-60);
    }
    level.platforms.forEach(p => {
      let tex = 'ground_grass';
      const platType = p.type as string;
      if (platType === 'brick' || platType === 'brick_secret' || platType === 'brick_multi') tex = 'brick';
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
      if (!isSolid && p.type.startsWith('platform_')) {
        (platform.body as Phaser.Physics.Arcade.StaticBody).checkCollision.down = false;
        (platform.body as Phaser.Physics.Arcade.StaticBody).checkCollision.left = false;
        (platform.body as Phaser.Physics.Arcade.StaticBody).checkCollision.right = false;
      }
      if (platType === 'pipe' || platType === 'pipe_top') {
        platform.setDepth(5);
      }
      if (platType === 'hidden') {
        platform.setVisible(false);
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
      // Skip enemies too close to player start (Bosse ausgenommen)
      if (e.type !== 'boss' && e.x < level.playerStart.x + MIN_ENEMY_SPAWN_DISTANCE) return;

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
      
      const biomeSpeed = BIOME_ENEMY_SPEED[level.biome] ?? DEFAULT_ENEMY_SPEED;

      const enemy = this.enemies.create(e.x, e.y, e.type);
      // Ground enemies - have edge detection (won't fall off platforms)
      if (e.type === 'goomba' || e.type === 'spiny' || e.type === 'koopa' || e.type === 'robot' || e.type === 'crab') {
        enemy.setVelocityX(-biomeSpeed).setCollideWorldBounds(true).setBounce(0);
        enemy.setDragX(0);
      } else if (e.type === 'boo' || e.type === 'fireball') {
        // Floating enemies - no gravity, no edge detection
        enemy.body.setAllowGravity(false);
        enemy.setCollideWorldBounds(true).setBounce(0);
        enemy.setData('noEdgeDetection', true);
        if (e.type === 'boo') {
          enemy.setData('speed', biomeSpeed + 60);
        } else {
          enemy.setVelocityX(-biomeSpeed - 20);
        }
      } else if (e.type === 'ghost') {
        enemy.body.setAllowGravity(false);
        enemy.setCollideWorldBounds(true).setBounce(0);
        enemy.setData('noEdgeDetection', true);
      } else if (e.type === 'ufo') {
        enemy.body.setAllowGravity(false);
        enemy.setCollideWorldBounds(true).setBounce(0);
        enemy.setData('noEdgeDetection', true);
      } else if (e.type === 'squid') {
        enemy.body.setAllowGravity(false);
        enemy.setCollideWorldBounds(true).setBounce(0);
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
        enemy.setData('origX', e.x);
        enemy.setData('origY', e.y);
      } else if (e.type === 'lakitu') {
        enemy.body.setAllowGravity(false);
        enemy.setCollideWorldBounds(true).setBounce(0);
        enemy.setData('noEdgeDetection', true);
        enemy.setData('lastEggTime', 0);
      } else if (e.type === 'bullet_bill') {
        enemy.setVelocityX(-Math.round(biomeSpeed * 4)).setCollideWorldBounds(true);
        enemy.setData('noEdgeDetection', true);
      } else if (e.type === 'boss') {
        enemy.setVelocityX(-Math.round(biomeSpeed * 0.5)).setCollideWorldBounds(true).setBounce(0);
        enemy.setData('noEdgeDetection', true);
      } else {
        enemy.setVelocityX(-biomeSpeed).setCollideWorldBounds(true);
      }
    });
    
    if (level.springs) {
      level.springs.forEach(s => {
        const spring = this.springs.create(s.x, s.y + 10, 'spring');
        (spring.body as Phaser.Physics.Arcade.StaticBody).setSize(28, 12, false);
        spring.refreshBody();
      });
    }

    if (level.spikes) {
      level.spikes.forEach(sp => {
        const spike = this.spikes.create(sp.x, sp.y, 'spike');
        (spike.body as Phaser.Physics.Arcade.StaticBody).setSize(24, 16, true);
        spike.refreshBody();
      });
    }

    // Level 60: Rising lava mechanic
    if (level.id === 60) {
      const lava = this.platforms.create(level.width / 2, level.height + 150, 'ground_lava');
      lava.setDisplaySize(level.width, 300).refreshBody();
      (lava as any).platformType = 'lava';
      lava.setData('risingLava', true);
    }
    
    // L18, L48: Rising water/tide
    if (level.id === 18 || level.id === 48) {
      const water = this.platforms.create(level.width / 2, level.height + 200, 'ground_water');
      water.setDisplaySize(level.width, 400).refreshBody();
      (water as any).platformType = 'lava';
      water.setData('risingLava', true);
    }
    
    // Level 72: Tag stepping platforms as crumble
    if (level.id === 72) {
      this.platforms.getChildren().forEach((p: any) => {
        const type = p.getData?.('type') || (p as any).platformType;
        if (type === 'platform_easy' || type === 'platform_medium' || type === 'platform_hard') {
          p.setData('crumble', true);
        }
      });
    }
    
    // Biome finales: tag platforms as crumble for L30, L78, L84
    if (level.id === 30 || level.id === 78 || level.id === 84) {
      this.platforms.getChildren().forEach((p: any) => {
        const type = p.getData?.('type') || (p as any).platformType;
        if (type === 'platform_easy' || type === 'platform_medium' || type === 'platform_hard' || type === 'cloud') {
          p.setData('crumble', true);
        }
      });
    }
    
    // Level 90: Boss HP tracking + arena walls
    if (level.id === 90) {
      this.enemies.getChildren().forEach((e: any) => {
        const eType = e.getData('type') || e.texture?.key;
        if (eType === 'boss') e.setData('hp', 3);
      });
      // Arena walls (left, right, ceiling) to keep boss fight contained
      const wallThick = 32;
      const arenaH = 700;
      const walls: { x: number; y: number; w: number; h: number }[] = [
        { x: -wallThick / 2, y: arenaH / 2, w: wallThick, h: arenaH },
        { x: level.width + wallThick / 2, y: arenaH / 2, w: wallThick, h: arenaH },
        { x: level.width / 2, y: -wallThick / 2, w: level.width, h: wallThick },
      ];
      walls.forEach(w => {
        const wall = this.solidPlatforms.create(w.x, w.y, 'ground_castle');
        wall.setDisplaySize(w.w, w.h).refreshBody();
        (wall.body as Phaser.Physics.Arcade.StaticBody).checkCollision.down = false;
      });
    }
    
    // Correctly store and setup the goal
    this.goal = this.physics.add.sprite(level.goal.x, level.goal.y, 'flag').setImmovable(true);
    (this.goal.body as Phaser.Physics.Arcade.Body).allowGravity = false;
    this.coinGateOpen = false;
    if (level.coinGoal) {
      this.goal.setAlpha(0.4);
      (this.goal.body as Phaser.Physics.Arcade.Body).enable = false;
    }
  }

  private setupPlayer(level: LevelData) {
    let tex = 'player_idle';
    if (this.isPlayerFire) tex = 'player_fire_idle';
    else if (this.isPlayerBig) tex = 'player_big_idle';
    this.player = this.physics.add.sprite(level.playerStart.x, level.playerStart.y, tex);
    this.player.setCollideWorldBounds(false);
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (this.isPlayerBig || this.isPlayerFire) body.setSize(24, 48);
    else body.setSize(22, 32);
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
  }

  private setupCollisions() {
    // Solid platforms: player walks on them + bricks break + hidden blocks reveal
    this.physics.add.collider(this.player, this.solidPlatforms, (p: any, b: any) => {
      const platType = b.getData?.('platformType') || b.texture?.key;
      if (b.body?.touching?.down && p.body?.touching?.up) {
        if (platType === 'hidden') {
          b.setTexture('question');
          b.setData('platformType', 'question');
          this.tweens.add({ targets: b, y: b.y - 10, duration: 100, yoyo: true });
          this.playBlockSound();
          this.coinCount++;
          this.score += 100;
          b.setVisible(true);
        }
        if ((platType === 'brick_secret' || platType === 'brick_multi') && b.body.blocked?.up === false) {
          if (platType === 'brick_secret') {
            b.setData('platformType', 'brick');
            this.addCoin();
            this.tweens.add({ targets: b, y: b.y - 10, duration: 100, yoyo: true });
            this.playBlockSound();
          } else {
            const lastHit = b.getData('brickLastHit') || -Infinity;
            if (this.game.loop.time - lastHit > 300) {
              b.setData('brickLastHit', this.game.loop.time);
              this.addCoin();
              this.tweens.add({ targets: b, y: b.y - 10, duration: 100, yoyo: true });
              this.playBlockSound();
            }
          }
        }
        if (platType === 'brick' && b.body.blocked?.up === false) {
          const isBig = this.isPlayerBig || this.isPlayerFire;
          const loadBearing = this.currentLevelData ? isBrickLoadBearing(this.currentLevelData, b) : false;
          if (canBreakBrick(isBig, platType, loadBearing)) {
            b.destroy();
            for (let i = 0; i < 6; i++) {
              const debris = this.add.rectangle(b.x + Phaser.Math.Between(-10, 10), b.y, 4, 4, 0x8B4513);
              debris.setDepth(50);
              this.tweens.add({
                targets: debris,
                x: debris.x + Phaser.Math.Between(-60, 60),
                y: debris.y + Phaser.Math.Between(-80, -20),
                alpha: 0,
                angle: Phaser.Math.Between(-180, 180),
                duration: 300,
                onComplete: () => debris.destroy()
              });
            }
            this.score += 50;
            this.playBlockSound();
          } else {
            this.tweens.add({ targets: b, y: b.y - 6, duration: 120, yoyo: true, ease: 'Sine.easeInOut' });
            this.playBlockSound();
          }
        }
      }
    });
    // Floating platforms: player can land on top (lava kills)
    this.physics.add.collider(this.player, this.platforms, (p, plat) => { if ((plat as any).platformType === 'lava') this.die(); });
    
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.physics.add.collider(this.enemies, this.movingPlatforms, (e: any) => {
        if (e.body?.blocked?.left || e.body?.blocked?.right) {
            e.setVelocityX(-e.body.velocity.x);
        }
    });
    
    // Floating platforms: player can land on top
    this.physics.add.collider(this.player, this.platforms);
    
    // Moving platforms: player can land on top
    this.physics.add.collider(this.player, this.movingPlatforms);
    this.physics.add.collider(this.powerUps, this.solidPlatforms);
    this.physics.add.collider(this.powerUps, this.platforms);
    this.physics.add.collider(this.powerUps, this.movingPlatforms);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.physics.add.collider(this.player, this.questionBlocks, (p: any, b: any) => { if (p.body?.touching?.up && b.body?.touching?.down) this.hitQuestionBlock(b); });
    this.physics.add.overlap(this.player, this.coins, (_p, c) => { c.destroy(); this.addCoin(); });
    
    // Enemy collision - use collider for proper physics response
    this.physics.add.collider(this.player, this.enemies, (p: any, e: any) => {
        const enemyType = e.getData('type') || e.texture?.key;
        const eState = e.getData('state') || 'walking';

        if (this.isDead) return;
        if (this.isInvincible && eState === 'walking') {
            this.starKillChain++;
            const starScore = 200 * Math.pow(2, Math.min(this.starKillChain, 4));
            this.score += starScore;
            this.killEnemy(e, starScore);
            return;
        }

        // Kicking a koopa shell
        if (eState === 'shell_idle') {
          const kickDir = p.x < e.x ? 1 : -1;
          e.setVelocityX(kickDir * 400);
          e.setData('state', 'shell_moving');
          e.setBounce(1, 0);
          this.playStompSound();
          this.score += 500;
          return;
        }
        // Shell hits player from the side
        if (eState === 'shell_moving') {
          this.playerHit();
          return;
        }

        if (NON_STOMPABLE_ENEMIES.has(enemyType)) {
            this.playerHit();
            return;
        }
        // Player stomps enemy when landing from above
        const playerFeet = p.body.bottom;
        const enemyTop = e.body.y - e.body.height / 2;
        const isFalling = p.body.velocity.y >= 0;
        const isStomping = isFalling && playerFeet <= enemyTop + 15 && Math.abs(p.x - e.x) < e.displayWidth / 2 + 15;
        if (isStomping) {
            if (enemyType === 'koopa') {
              e.setData('state', 'shell_idle');
              e.setData('shellDir', e.body.velocity.x > 0 ? 1 : -1);
              e.setVelocity(0, 0);
              e.setBounce(0);
              e.setScale(0.8, 0.5);
              e.body.setSize(28, 16);
              e.setData('shellTimer', 4000);
            } else {
              this.killEnemy(e);
            }
            this.playStompSound();
            p.setVelocityY(-400);
            this.score += 500;
        } else {
            this.playerHit();
        }
    });
    
    this.physics.add.overlap(this.player, this.powerUps, (_p, pu) => this.collectPowerUp(pu as any));
    this.physics.add.overlap(this.player, this.goal, () => this.reachGoal()); // Use the goal variable
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.physics.add.overlap(this.fireballs, this.enemies, (f: any, e: any) => {
      const eType = e.getData('type') || e.texture?.key;
      if (eType === 'boss') {
        const hp = (e.getData('hp') || 3) - 1;
        e.setData('hp', hp);
        f.destroy();
        if (hp <= 0) this.killEnemy(e as any, 200);
        this.score += 200;
      } else {
        this.killEnemy(e as any); f.destroy(); this.score += 500;
      }
    });
    // Shell kills enemies on contact
    this.physics.add.collider(this.enemies, this.enemies, (a: any, b: any) => {
      const sA = a.getData('state') || 'walking';
      const sB = b.getData('state') || 'walking';
      if (sA === 'shell_moving' && sB !== 'shell_moving') { this.killEnemy(b); this.score += 500; a.setVelocityX(a.body.velocity.x); }
      else if (sB === 'shell_moving' && sA !== 'shell_moving') { this.killEnemy(a); this.score += 500; b.setVelocityX(b.body.velocity.x); }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.physics.add.collider(this.fireballs, this.solidPlatforms, (f: any, _p: any) => { if (f.body?.blocked?.left || f.body?.blocked?.right) f.destroy(); });
    // Boss projectiles hit player and platforms
    this.physics.add.overlap(this.player, this.bossProjectiles, () => { if (!this.isDead && !this.isInvincible) this.playerHit(); });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.physics.add.collider(this.bossProjectiles, this.solidPlatforms, (f: any) => f.destroy());
    this.physics.add.collider(this.bossProjectiles, this.platforms, (f: any) => f.destroy());
    
    // Falling hazards hit player
    this.physics.add.overlap(this.player, this.fallingHazards, () => { if (!this.isDead && !this.isInvincible) this.playerHit(); });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.physics.add.collider(this.fallingHazards, this.solidPlatforms, (f: any) => f.destroy());
    this.physics.add.collider(this.fallingHazards, this.platforms, (f: any) => f.destroy());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.physics.add.collider(this.player, this.springs, (p: any, s: any) => {
      if (p.body?.touching?.down && !this.isDead) {
        p.setVelocityY(SPRING_VELOCITY);
        s.setScale(s.scaleX, 0.6);
        this.tweens.add({ targets: s, scaleY: 1, duration: 120, ease: 'Back.Out' });
        this.playJumpSound();
      }
    });

    this.physics.add.overlap(this.player, this.spikes, () => this.die());
  }

  private killEnemy(enemy: Phaser.GameObjects.Sprite, scoreAmount: number = 500) {
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
    
    const popup = this.add.text(x, y - 20, `+${scoreAmount}`, {
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
    this.playBlockSound();
    const content = block.contents;
    if (content === 'coin') { this.addCoin(); }
    else { const pu = this.powerUps.create(block.x, block.y - 32, content); pu.setVelocity(-60, -200); pu.setBounce(0.3); (pu as any).type = content; this.score += 200; }
  }

  private collectPowerUp(pu: any) {
    const type = pu.type;
    pu.destroy();
    this.playPowerUpSound();
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (type === 'mushroom') {
      if (!this.isPlayerBig) { this.isPlayerBig = true; this.player.y -= 16; this.player.setTexture('player_big_idle'); body.setSize(24, 48); }
      else if (!this.storedItemType) { this.storedItemType = 'mushroom'; this.updateStoredItemHUD(); }
    } else if (type === 'flower') {
      if (!this.isPlayerBig) this.player.y -= 16; this.isPlayerBig = true; this.isPlayerFire = true; this.player.setTexture('player_fire_idle'); body.setSize(24, 48);
      if (this.isPlayerFire && !this.storedItemType) { this.storedItemType = 'flower'; this.updateStoredItemHUD(); }
    } else if (type === 'star') { this.makeInvincible(5000); }
  }

  private updateStoredItemHUD() {
    if (this.storedItemIcon) this.storedItemIcon.destroy();
    if (this.storedItemType) {
      const colors: Record<string, number> = { 'mushroom': 0xff4444, 'flower': 0x44ff44, 'star': 0xffff44 };
      this.storedItemIcon = this.add.rectangle(200, 30, 12, 12, colors[this.storedItemType] || 0xffffff)
        .setScrollFactor(0).setDepth(1000).setStrokeStyle(1, 0xffffff);
    }
  }

  private makeInvincible(duration: number) { this.isInvincible = true; this.player.setAlpha(0.5); this.starKillChain = 0; this.time.delayedCall(duration, () => { this.isInvincible = false; this.player.setAlpha(1); }); }

  private playerHit() {
    if (this.isInvincible) return;
    this.playHitSound();
    if (this.storedItemType) {
      const restoreType = this.storedItemType;
      this.storedItemType = null;
      if (this.storedItemIcon) { this.storedItemIcon.destroy(); this.storedItemIcon = null; }
      if (restoreType === 'mushroom' && !this.isPlayerBig) {
        this.isPlayerBig = true; this.player.y -= 16; this.player.setTexture('player_big_idle');
        (this.player.body as Phaser.Physics.Arcade.Body).setSize(24, 48);
        this.makeInvincible(2000); return;
      }
    }
    if (this.isPlayerFire) { this.isPlayerFire = false; this.player.setTexture('player_big_idle'); this.makeInvincible(2000); }
    else if (this.isPlayerBig) { this.isPlayerBig = false; this.player.setTexture('player_idle'); (this.player.body as Phaser.Physics.Arcade.Body).setSize(22, 32); this.makeInvincible(2000); }
    else this.die();
  }

  private die() {
    if (this.isDead) return;
    this.isDead = true;
    this.isMusicPlaying = false;
    this.stopMusic();
    this.playDeathSound();
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0, 0);
    body.setAllowGravity(false);
    this.player.setTint(0xff0000);
    this.player.setScale(1, 0.8);
    this.player.setFlipY(true);
    this.cameras.main.stopFollow();
    body.checkCollision.none = true;
    this.physics.world.pause();
    this.tweens.add({
      targets: this.player,
      y: this.player.y - 150,
      alpha: 0,
      duration: 1200,
      ease: 'Power1',
      onComplete: () => {
        this.lives--;
        if (this.lives <= 0) this.scene.start('GameOver', { score: this.score, coins: this.coinCount });
        else this.scene.restart({
          levelIndex: this.levelIndex,
          lives: this.lives,
          score: this.score,
          coinCount: this.coinCount,
          isPlayerBig: this.isPlayerBig,
          isPlayerFire: this.isPlayerFire,
        });
      },
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

    if (levelData?.coinGoal) {
      this.coinGateText = this.add.text(GAME_WIDTH / 2, 100, '', {
        fontSize: '16px',
        fontFamily: 'Arial',
        color: '#FFD700',
        stroke: '#000',
        strokeThickness: 2
      }).setOrigin(0.5).setScrollFactor(0).setDepth(1000);
    }
  }

  private updateCoinGate() {
    const goal = this.currentLevelData?.coinGoal;
    if (!goal || this.coinGateOpen) return;
    if (this.coinCount < goal) return;
    this.coinGateOpen = true;
    (this.goal.body as Phaser.Physics.Arcade.Body).enable = true;
    this.tweens.add({ targets: this.goal, alpha: 1, duration: 300 });
    this.tweens.add({ targets: this.goal, scaleX: 1.2, scaleY: 1.2, duration: 200, yoyo: true, ease: 'Sine.easeInOut' });
    if (this.coinGateText) this.coinGateText.setText('Gate offen!');
    if (this.audioContext) {
      this.playNote(523.25, 'triangle', 0.06, 0.15, 0);
      this.time.delayedCall(120, () => this.playNote(659.25, 'triangle', 0.06, 0.15, 0));
      this.time.delayedCall(240, () => this.playNote(783.99, 'triangle', 0.08, 0.25, 0));
    }
  }

  private updateUI() {
    this.scoreValText.setText(this.score.toString().padStart(6, '0'));
    if (this.displayedCoinCount < this.coinCount) {
      this.displayedCoinCount++;
      this.coinValText.setText('x' + this.displayedCoinCount.toString().padStart(2, '0'));
    } else if (this.displayedCoinCount > this.coinCount) {
      this.displayedCoinCount = this.coinCount;
    }
    const biomeIdx = Math.floor(this.levelIndex / 6);
    const levelInBiome = this.levelIndex % 6;
    this.worldValText.setText(`${biomeIdx + 1}-${levelInBiome + 1}`);
    const time = Math.max(0, this.timeLeft);
    this.timerValText.setText(time.toString().padStart(3, '0'));
    this.timerValText.setColor(time < 50 ? '#ff4444' : time < 100 ? '#ffaa00' : '#ffffff');
    this.livesValText.setText(String(this.lives));
    const coinGoal = this.currentLevelData?.coinGoal;
    if (coinGoal && !this.coinGateOpen) {
      this.coinGateText?.setText(`Coins: ${Math.min(this.coinCount, coinGoal)} / ${coinGoal}`);
    }
  }

  private showScorePopup(text: string, x: number, y: number) {
    const popup = this.add.text(x, y, text, {
      fontSize: '16px', fontFamily: 'Arial', color: '#ffffff',
      stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setDepth(1001);
    this.tweens.add({
      targets: popup,
      y: y - 40,
      alpha: 0,
      duration: 800,
      onComplete: () => popup.destroy(),
    });
  }

  private addCoin() {
    this.coinCount++;
    this.score += 100;
    this.playCoinSound();
    this.updateCoinGate();
    if (this.coinCount - this.lastCoinMilestone >= 100) {
      this.lastCoinMilestone += 100;
      const text = this.add.text(GAME_WIDTH / 2, 200, '1-UP', {
        fontSize: '36px', fontFamily: 'Arial', color: '#4CAF50',
        stroke: '#000', strokeThickness: 5
      }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);
      this.tweens.add({ targets: text, y: 120, alpha: 0, duration: 1500, onComplete: () => text.destroy() });
    }
  }

  private handlePipeEntry() {
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const level = this.currentLevelData;
    if (!level) return;

    const entryPipe = level.pipeWarps?.find(w => {
      const dx = Math.abs(this.player.x - w.pipeX);
      const dy = Math.abs(this.player.y - w.pipeY);
      return dx < 32 && dy < 16;
    });

    if (!entryPipe) return;

    this.isTransitioning = true;
    body.setVelocity(0, 0);
    body.setAllowGravity(false);

    this.tweens.add({
      targets: this.player,
      y: this.player.y + 40,
      alpha: 0,
      duration: 400,
      ease: 'Power2',
      onComplete: () => {
        body.setAllowGravity(true);
        this.cameras.main.fadeOut(300, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.restart({
            levelIndex: entryPipe.targetLevelIndex,
            score: this.score,
            lives: this.lives,
            coinCount: this.coinCount,
            isPlayerBig: this.isPlayerBig,
            isPlayerFire: this.isPlayerFire,
            levelId: 0,
          });
        });
      },
    });
  }

  update(time: number) {
    if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
      this.quitToTitle();
      return;
    }
    if (this.isDead || this.isTransitioning) return;
    this.updateUI();
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const dt = this.game.loop.delta / 1000;

    if (this.cursors.left.isDown) {
      this.player.setFlipX(true);
      if (body.velocity.x > 0) {
        body.velocity.x -= TURN_DECEL * dt;
        if (body.velocity.x <= 0) body.velocity.x = -PLAYER_SPEED;
      } else {
        body.velocity.x = Math.max(body.velocity.x - ACCEL * dt, -PLAYER_SPEED);
      }
    } else if (this.cursors.right.isDown) {
      this.player.setFlipX(false);
      if (body.velocity.x < 0) {
        body.velocity.x += TURN_DECEL * dt;
        if (body.velocity.x >= 0) body.velocity.x = PLAYER_SPEED;
      } else {
        body.velocity.x = Math.min(body.velocity.x + ACCEL * dt, PLAYER_SPEED);
      }
    } else {
      const onIce = body.blocked.down && this.currentLevelData?.biome === 'ice-snow';
      if (onIce) {
        if (Math.abs(body.velocity.x) < 5) body.velocity.x = 0;
        else body.velocity.x *= 0.92;
      } else if (Math.abs(body.velocity.x) < 5) {
        body.velocity.x = 0;
      } else if (body.velocity.x > 0) {
        body.velocity.x = Math.max(0, body.velocity.x - DECEL * dt);
      } else {
        body.velocity.x = Math.min(0, body.velocity.x + DECEL * dt);
      }
    }

    // Pipe entry: DOWN + JUMP while on pipe_top (check BEFORE jump to avoid phantom sound)
    const enteringPipe = body.blocked.down && this.cursors.down.isDown && Phaser.Input.Keyboard.JustDown(this.cursors.up);
    if (enteringPipe) {
      this.handlePipeEntry();
    }

    if (this.cursors.up.isDown && body.blocked.down && !enteringPipe) {
      body.setVelocityY(JUMP_VELOCITY);
      this.isJumping = true;
      this.playJumpSound();
    }
    if (this.isJumping && body.velocity.y < 0) {
      if (!this.cursors.up.isDown) {
        body.velocity.y *= 0.5;
        this.isJumping = false;
      }
    }
    if (body.blocked.down) {
      this.isJumping = false;
    }

    if (this.cameras.main.scrollX < this.lastCameraX) {
      this.cameras.main.scrollX = this.lastCameraX;
    }
    this.lastCameraX = this.cameras.main.scrollX;

    const playerSpeed = Math.abs(body.velocity.x);
    const prefix = this.isPlayerFire ? 'player_fire' : this.isPlayerBig ? 'player_big' : 'player';
    if (!body.blocked.down) {
      this.player.setTexture(`${prefix}_jump`);
    } else if (playerSpeed > 20) {
      this.animTime += this.game.loop.delta;
      if (this.animTime >= this.ANIM_SPEED) {
        this.animTime = 0;
        this.animFrame = (this.animFrame + 1) % 2;
      }
      this.player.setTexture(`${prefix}_walk${this.animFrame + 1}`);
    } else {
      this.animFrame = 0;
      this.animTime = 0;
      this.player.setTexture(`${prefix}_idle`);
    }

    // Swimming mechanic for water biome
    if (this.currentBiome === 'water' && body.y > 500) {
      body.setGravityY(-(this.physics.world.gravity.y - 600));
      if (this.cursors.up.isDown) body.setVelocityY(-250);
      if (Math.abs(body.velocity.x) > 0) body.setVelocityX(body.velocity.x * 0.95);
    } else {
      body.setGravityY(0);
    }
    if ((this.shootKey.isDown || this.spaceShoot.isDown) && this.isPlayerFire && time > this.lastFired) { this.shootFireball(); this.lastFired = time + 250; }
    
    // Animate background for certain biomes
    if (this.currentBiome === 'water' || this.currentBiome === 'beach-island') {
      this.bgTiles.forEach((t, i) => t.tilePositionY += [0, 0.02, 0.04, 0.06, 0.08, 0.1, 0.12][i] || 0);
    } else if (this.currentBiome === 'sky-clouds' || this.currentBiome === 'space-star') {
      this.bgTiles.forEach((t, i) => t.tilePositionX += [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06][i] || 0);
    }
    
    // Level 60: Rising lava
    if (this.levelId === 60) {
      this.platforms.getChildren().forEach((p: any) => {
        if (p.getData?.('risingLava')) {
          p.y -= 0.4;
          p.body.updateFromGameObject();
        }
      });
    }
    
    // Level 72: Crumble platforms
    if (this.levelId === 72) {
      this.platforms.getChildren().forEach((p: any) => {
        if (!p.getData?.('crumble') || p.getData('crumbled')) return;
        if (p.body?.touching?.up && this.player.body?.blocked?.down) {
          const startTime = p.getData('crumbleStart') || 0;
          if (startTime === 0) p.setData('crumbleStart', time);
          if (time - startTime > 800) {
            p.setData('crumbled', true);
            this.tweens.add({ targets: p, alpha: 0, scaleY: 0, duration: 300, ease: 'Power2',
              onComplete: () => { p.body.enable = false; this.time.delayedCall(3000, () => {
                p.setAlpha(1); p.setScale(1); p.body.enable = true; p.setData('crumbleStart', 0); p.setData('crumbled', false);
              }); }
            });
          }
        } else {
          p.setData('crumbleStart', 0);
        }
      });
    }
    
    // L6, L42: Wind gusts
    if (this.levelId === 6 || this.levelId === 42) {
      this.windTime += 1;
      if (this.windTime % 180 === 0 && this.windTime > 0) {
        const windStr = Phaser.Math.Between(-150, 150);
        if (windStr !== 0) {
          (this.player.body as Phaser.Physics.Arcade.Body).setVelocityX(
            (this.player.body as Phaser.Physics.Arcade.Body).velocity.x + windStr
          );
        }
      }
    }
    
    // Update moving platforms
    let playerCarried = false;
    this.movingPlatforms.getChildren().forEach((mplat: any) => {
      const data = this.movingPlatformData.get(mplat);
      if (!data) return;

      const prevX = mplat.x;
      const prevY = mplat.y;

      if (data.moveType === 'horizontal') {
        mplat.x = data.startX + Math.sin(time * 0.00002 * data.speed) * data.range;
      } else if (data.moveType === 'vertical') {
        mplat.y = data.startY + Math.sin(time * 0.00002 * data.speed) * data.range;
      } else if (data.moveType === 'circular') {
        if (!data.angle) data.angle = 0;
        data.angle += data.speed * 0.0002;
        mplat.x = data.startX + Math.cos(data.angle) * data.range;
        mplat.y = data.startY + Math.sin(data.angle) * data.range;
      }
      mplat.body.updateFromGameObject();

      const dx = mplat.x - prevX;
      const dy = mplat.y - prevY;

      if (playerCarried || !this.player.body) return;

      const mBody = mplat.body as any;
      const pBody = this.player.body as any;
      const platformTop = mBody.y - mBody.halfHeight;
      const playerBottom = this.player.y + (pBody.halfHeight || 16);
      const isAbovePlatform = Math.abs(playerBottom - platformTop) < 15;
      const isHorizontallyAligned = Math.abs(this.player.x - mplat.x) < (mBody.halfWidth || 40) + 20;
      const isOnPlatform = isAbovePlatform && isHorizontallyAligned;

      if (isOnPlatform && (Math.abs(dx) > 0 || Math.abs(dy) > 0)) {
        playerCarried = true;
        this.player.setX(this.player.x + dx);
        this.player.setY(this.player.y + dy);
        if (dx !== 0) (this.player.body as any).setVelocityX(dx * 60);
        if (dy !== 0) (this.player.body as any).setVelocityY(dy * 60);
      }
    });
    
    // Enemy platform edge detection - turn around instead of falling
    const level = this.currentLevelData;
    if (level) {
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
        
        if (!hasGroundBelow && level.movingPlatforms) {
          for (const mp of level.movingPlatforms) {
            const px = mp.x - mp.w / 2;
            const pw = mp.w;
            const py = mp.y - mp.h / 2;
            
            if (ex + ew > px && ex < px + pw) {
              if (ey + eh >= py && ey + eh <= py + 40) {
                hasGroundBelow = true;
                break;
              }
            }
          }
        }
        
        if (!hasGroundBelow) {
          enemy.setVelocityX(-vx);
          enemy.setX(enemy.x + (vx > 0 ? -2 : 2));
        }
      });
    }
    
    // Enemy AI behaviors (thwomp, boo, lakitu)
    const aiBiomeSpeed = BIOME_ENEMY_SPEED[this.currentBiome] ?? DEFAULT_ENEMY_SPEED;
    this.enemies.getChildren().forEach((enemy: any) => {
      if (!enemy.body) return;
      const eType = enemy.getData('type') || enemy.texture?.key;
      
      if (eType === 'thwomp') {
        const isFalling = enemy.getData('isFalling');
        if (!isFalling) {
          const distX = Math.abs(this.player.x - enemy.x);
          const distY = this.player.y - enemy.y;
          if (distX < 80 && distY > 0 && distY < 600) {
            enemy.body.setAllowGravity(true);
            enemy.setImmovable(false);
            enemy.setData('isFalling', true);
          }
        } else if (enemy.body.blocked?.down) {
          const origY = enemy.getData('origY');
          const origX = enemy.getData('origX');
          enemy.body.setAllowGravity(false);
          enemy.setImmovable(true);
          enemy.body.velocity.y = 0;
          this.tweens.add({
            targets: enemy,
            y: origY,
            x: origX,
            duration: 2000,
            ease: 'Sine.easeIn',
            onComplete: () => enemy.setData('isFalling', false),
          });
        }
      } else if (eType === 'boo') {
        const playerLeftOfBoo = this.player.x < enemy.x;
        const facingTowardBoo = playerLeftOfBoo !== this.player.flipX;
        const booSpeed = enemy.getData('speed') || 140;
        if (facingTowardBoo) {
          enemy.setVelocityX(0);
          enemy.setVelocityY(0);
        } else {
          const dir = this.player.x > enemy.x ? 1 : -1;
          enemy.setVelocityX(dir * booSpeed);
          const targetY = this.player.y - 80;
          enemy.setVelocityY(targetY > enemy.y ? 30 : -30);
        }
      } else if (eType === 'ghost') {
        const ghostDir = this.player.x > enemy.x ? 1 : -1;
        enemy.setVelocityX(ghostDir * (aiBiomeSpeed * 0.5));
        enemy.setVelocityY(Math.sin(time * 0.003) * 40);
      } else if (eType === 'ufo') {
        const ufoDir = this.player.x > enemy.x ? 1 : -1;
        enemy.setVelocityX(ufoDir * (aiBiomeSpeed * 0.3));
        enemy.setVelocityY(Math.sin(time * 0.002 + enemy.x) * 25);
      } else if (eType === 'squid') {
        const sDir = this.player.x > enemy.x ? 1 : -1;
        enemy.setVelocityX(sDir * (aiBiomeSpeed * 0.3));
        enemy.setVelocityY(Math.sin(time * 0.004 + enemy.x) * 50);
      } else if (eType === 'lakitu') {
        const distX = this.player.x - enemy.x;
        if (Math.abs(distX) > 120) {
          enemy.setVelocityX(distX > 0 ? aiBiomeSpeed * 0.5 : -aiBiomeSpeed * 0.5);
        } else {
          enemy.setVelocityX(0);
        }
        const targetY = this.player.y - 280;
        enemy.setVelocityY(targetY > enemy.y ? 30 : -30);
        
        const lastEgg = enemy.getData('lastEggTime') || 0;
        if (time - lastEgg > 3000) {
          enemy.setData('lastEggTime', time);
          const egg = this.enemies.create(enemy.x, enemy.y + 20, 'spiny');
          egg.setData('type', 'spiny');
          egg.setData('noEdgeDetection', true);
          egg.setVelocity(0, 280);
          egg.setCollideWorldBounds(true).setBounce(0);
        }
      } else if (eType === 'boss') {
        const hp: number = enemy.getData('hp') || 3;
        if (hp <= 0) return;
        const distX = this.player.x - enemy.x;
        const distY = this.player.y - enemy.y;
        enemy.setVelocityX(distX > 0 ? 50 : -50);
        if (Math.abs(distX) < 500 && Math.abs(distY) < 300 && time - this.lastBossShot > 2000) {
          this.lastBossShot = time;
          const proj = this.bossProjectiles.create(enemy.x, enemy.y, 'fireball');
          proj.setData('bossProj', true);
          const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
          proj.setVelocity(Math.cos(angle) * 200, Math.sin(angle) * 200);
          proj.setScale(1.5);
          (proj.body as Phaser.Physics.Arcade.Body).setSize(24, 24, true);
        }
      }
      // Koopa shell timer: re-awaken after 4s
      const eState = enemy.getData('state') || 'walking';
      if (eType === 'koopa' && eState === 'shell_idle') {
        const timer = enemy.getData('shellTimer') || 0;
        if (timer > 0) {
          enemy.setData('shellTimer', timer - this.game.loop.delta);
        } else {
          enemy.setData('state', 'walking');
          enemy.setScale(1, 1);
          enemy.body.setSize(28, 34);
          const shellDir = enemy.getData('shellDir') || -1;
          enemy.setVelocityX(shellDir * aiBiomeSpeed);
          enemy.setBounce(0);
        }
      }
    });
    
    // Move boss projectiles
    this.bossProjectiles.getChildren().forEach((proj: any) => {
      if (!proj.body) return;
      if (proj.y > 800 || proj.x < -100 || proj.x > 15000) proj.destroy();
    });
    
    // Biome finales: falling hazards (L12 desert, L24 ice-snow, L36 forest, L54 factory, L66 canyon-base)
    if ([12, 24, 36, 54, 66].includes(this.levelId)) {
      if (time - (this as any)._lastHazardSpawn > 2500) {
        (this as any)._lastHazardSpawn = time;
        const xPos = this.player.x + Phaser.Math.Between(-300, 300);
        const hazard = this.fallingHazards.create(xPos, -50, 'fireball');
        hazard.setVelocityY(300);
        hazard.setScale(0.8);
        (hazard.body as Phaser.Physics.Arcade.Body).setSize(12.8, 12.8, true);
        hazard.setData('type', 'falling_hazard');
      }
    }
    
    // Level 90: Boss HP bar
    if (this.levelId === 90) {
      let totalHp = 0;
      this.enemies.getChildren().forEach((e: any) => {
        if ((e.getData('type') || e.texture?.key) === 'boss') totalHp += e.getData('hp') || 0;
      });
      if (!this.bossHpBar) {
        this.bossHpBar = this.add.graphics().setScrollFactor(0).setDepth(1001);
      }
      this.bossHpBar.clear();
      if (totalHp > 0) {
        this.bossHpBar.fillStyle(0x000000, 0.7);
        this.bossHpBar.fillRect(GAME_WIDTH / 2 - 110, 100, 220, 20);
        this.bossHpBar.fillStyle(0xff0000, 1);
        this.bossHpBar.fillRect(GAME_WIDTH / 2 - 108, 102, 216 * (totalHp / 12), 16);
        this.bossHpBar.fillStyle(0xffffff, 0.3);
        this.bossHpBar.fillRect(GAME_WIDTH / 2 - 108, 102, 216 * (totalHp / 12), 8);
      }
    }
    
    // Safety Threshold for death - player dies when falling out of level bounds
    const levelHeight = this.currentLevelData?.height || GAME_HEIGHT;
    if (this.player.y > levelHeight + 100) this.die();
  }

  quitToTitle(): void {
    if (this.isQuitting) return;
    this.isQuitting = true;
    this.isMusicPlaying = false;
    this.stopMusic();
    if (this.timerEvent) this.timerEvent.destroy();
    if (this.physics?.world) {
      this.physics.world.resume();
    }
    goToTitle(this.game, this);
  }

  private onRestartKey = (): void => {
    if (this.isDead || this.isTransitioning || this.isQuitting) return;
    this.restartLevel();
  };

  private onNextKey = (): void => {
    if (this.isDead || this.isTransitioning || this.isQuitting) return;
    this.nextLevel();
  };

  shutdown(): void {
    this.isMusicPlaying = false;
    this.stopMusic();
    this.restartKey?.off('down', this.onRestartKey, this);
    this.nextKey?.off('down', this.onNextKey, this);
  }

  private restartLevel() {
    this.isMusicPlaying = false;
    this.stopMusic();
    this.scene.restart({
      levelIndex: this.levelIndex,
      lives: this.lives,
      score: this.score,
      coinCount: this.coinCount,
      isPlayerBig: this.isPlayerBig,
      isPlayerFire: this.isPlayerFire,
    });
  }

  private nextLevel() {
    this.isMusicPlaying = false;
    this.stopMusic();
    const timeBonus = Math.max(0, this.timeLeft);
    this.scene.restart({ levelIndex: this.levelIndex + 1, lives: this.lives, score: this.score + 1000 + timeBonus, coinCount: this.coinCount, isPlayerBig: this.isPlayerBig, isPlayerFire: this.isPlayerFire });
  }

  private shootFireball() {
      const offsetX = this.player.flipX ? -20 : 20;
      const f = this.fireballs.create(this.player.x + offsetX, this.player.y, 'fireball');
      f.setVelocity(this.player.flipX ? -450 : 450, 200).setBounce(1, 0.8).setCircle(5, 3, 3);
  }

  private reachGoal() {
      if (this.isTransitioning) return;
      if (this.currentLevelData?.coinGoal && this.coinCount < this.currentLevelData.coinGoal) return;
      this.isTransitioning = true;
      this.playGoalSound();
      this.isMusicPlaying = false;
      this.stopMusic();

      const body = this.player.body as Phaser.Physics.Arcade.Body;
      body.setVelocity(0, 0);
      body.setAllowGravity(false);
      this.player.setFlipX(true);
      this.player.setScale(1, 1);

      // Score based on flagpole height
      const flagTop = this.goal.y - 25;
      const playerHeight = this.player.y;
      let poleScore = 100;
      if (playerHeight < flagTop + 16) poleScore = 5000;
      else if (playerHeight < flagTop + 32) poleScore = 2000;
      this.score += poleScore;
      this.showScorePopup('+' + poleScore, this.player.x, this.player.y - 40);

      this.tweens.add({
        targets: this.player,
        y: this.goal.y + 40,
        duration: 600,
        ease: 'Power1',
        onComplete: () => {
          body.setAllowGravity(true);
          body.setVelocityX(80);
          this.tweens.add({
            targets: this.player,
            x: this.player.x + 60,
            duration: 400,
          });
          const clearText = this.add.text(this.player.x, this.player.y - 60, 'COURSE CLEAR!', {
            fontSize: '24px', fontFamily: 'Arial', color: '#FFD700',
            stroke: '#000', strokeThickness: 4
          }).setOrigin(0.5).setDepth(1001);
          this.tweens.add({ targets: clearText, y: clearText.y - 30, alpha: 0, duration: 1500, delay: 500 });
        }
      });

      this.time.delayedCall(2000, () => {
        const timeBonus = Math.max(0, this.timeLeft);
        this.scene.restart({ levelIndex: this.levelIndex + 1, lives: this.lives, score: this.score + 1000 + timeBonus, coinCount: this.coinCount, isPlayerBig: this.isPlayerBig, isPlayerFire: this.isPlayerFire });
      });
  }

  private startBgm() {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    const biome = this.currentLevelData?.biome || 'grasslands';

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx();

      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const ctx = this.audioContext;
      this.audioMaster = ctx.createGain();
      this.audioMaster.gain.setValueAtTime(0.6, ctx.currentTime);
      this.audioMaster.connect(ctx.destination);

      this.audioDelay = ctx.createDelay(0.5);
      this.audioDelay.delayTime.setValueAtTime(0.18, ctx.currentTime);
      this.audioDelayFeedback = ctx.createGain();
      this.audioDelayFeedback.gain.setValueAtTime(0.25, ctx.currentTime);
      this.audioDelay.connect(this.audioDelayFeedback);
      this.audioDelayFeedback.connect(this.audioDelay);
      this.audioDelay.connect(this.audioMaster);

      this.musicPlayer = new MusicPlayer(ctx, this.audioMaster);
      const song = (BIOME_MUSIC as Record<string, BiomeSong>)[biome] || BIOME_MUSIC['grasslands'];
      this.musicPlayer.start(song, biome);
    } catch (e) {}
  }

  private stopMusic() {
    if (this.musicPlayer) {
      this.musicPlayer.stop();
      this.musicPlayer = undefined;
    }
  }

  private playKick(volume: number) {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.08);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioMaster!);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  private playNoiseHihat(volume: number, noiseBuffer: AudioBuffer) {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const source = this.audioContext.createBufferSource();
    source.buffer = noiseBuffer;
    const gain = this.audioContext.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(5000, now);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioMaster!);
    source.start(now);
    source.stop(now + 0.04);
  }

  private playNote(freq: number, type: OscillatorType, volume: number, duration: number, pan: number = 0, filterFreq: number = 0) {
    if (!this.audioContext || !this.audioMaster || !this.audioDelay) return;
    const now = this.audioContext.currentTime;

    const osc1 = this.audioContext.createOscillator();
    const gain1 = this.audioContext.createGain();
    osc1.type = type;
    osc1.frequency.setValueAtTime(freq, now);

    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    lfo.frequency.setValueAtTime(5, now);
    lfoGain.gain.setValueAtTime(freq * 0.002, now);
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfo.start(now);

    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(volume, now + 0.005);
    gain1.gain.exponentialRampToValueAtTime(volume * 0.3, now + duration * 0.3);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    if (filterFreq > 0) {
      filter.frequency.setValueAtTime(filterFreq, now);
    } else {
      filter.frequency.setValueAtTime(freq * 4, now);
      filter.frequency.exponentialRampToValueAtTime(freq * 2, now + duration * 0.5);
    }

    const panner = this.audioContext.createStereoPanner();
    panner.pan.setValueAtTime(pan, now);

    osc1.connect(filter);
    filter.connect(gain1);
    gain1.connect(panner);
    panner.connect(this.audioMaster);
    if (duration > 0.1) {
      const wetGain = this.audioContext.createGain();
      wetGain.gain.setValueAtTime(0.08, now);
      wetGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      gain1.connect(wetGain);
      wetGain.connect(this.audioDelay);
    }

    const detuneFreq = freq * Math.pow(2, 7 / 1200);
    const osc2 = this.audioContext.createOscillator();
    const gain2 = this.audioContext.createGain();
    osc2.type = type;
    osc2.frequency.setValueAtTime(detuneFreq, now);
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.linearRampToValueAtTime(volume * 0.5, now + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    const panner2 = this.audioContext.createStereoPanner();
    panner2.pan.setValueAtTime(pan - 0.1, now);
    osc2.connect(gain2);
    gain2.connect(panner2);
    panner2.connect(this.audioMaster);
    if (duration > 0.1) {
      const wetGain2 = this.audioContext.createGain();
      wetGain2.gain.setValueAtTime(0.06, now);
      wetGain2.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      gain2.connect(wetGain2);
      wetGain2.connect(this.audioDelay);
    }

    const osc3 = this.audioContext.createOscillator();
    const gain3 = this.audioContext.createGain();
    osc3.type = type;
    osc3.frequency.setValueAtTime(freq * 2, now);
    gain3.gain.setValueAtTime(0.0001, now);
    gain3.gain.linearRampToValueAtTime(volume * 0.35, now + 0.005);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    const panner3 = this.audioContext.createStereoPanner();
    panner3.pan.setValueAtTime(pan + 0.1, now);
    osc3.connect(gain3);
    gain3.connect(panner3);
    panner3.connect(this.audioMaster);

    osc1.start(now);
    osc1.stop(now + duration);
    osc2.start(now);
    osc2.stop(now + duration);
    osc3.start(now);
    osc3.stop(now + duration);
    lfo.stop(now + duration);
  }

  private playChord(freqs: number[], type: OscillatorType, volume: number, duration: number, pan: number = 0) {
    if (!this.audioContext || !this.audioMaster) return;
    const now = this.audioContext.currentTime;
    const spread = 2 / Math.max(freqs.length - 1, 1);
    for (let i = 0; i < freqs.length; i++) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freqs[i], now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.04);
      gain.gain.setValueAtTime(volume, now + duration * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      const panner = this.audioContext.createStereoPanner();
      panner.pan.setValueAtTime(pan + (i * spread - 1), now);
      osc.connect(gain);
      gain.connect(panner);
      panner.connect(this.audioMaster);
      osc.start(now);
      osc.stop(now + duration);
    }
  }

  private playJumpSound() {
    if (!this.audioContext || !this.audioMaster) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.audioMaster);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  private playCoinSound() {
    if (!this.audioContext || !this.audioMaster) return;
    const now = this.audioContext.currentTime;
    [988, 1319].forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);
      gain.gain.setValueAtTime(0.07, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.12);
      osc.connect(gain);
      gain.connect(this.audioMaster!);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.15);
    });
  }

  private playStompSound() {
    if (!this.audioContext || !this.audioMaster) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    osc.connect(gain);
    gain.connect(this.audioMaster);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  private playHitSound() {
    if (!this.audioContext || !this.audioMaster) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    osc.connect(gain);
    gain.connect(this.audioMaster);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  private playBlockSound() {
    if (!this.audioContext || !this.audioMaster) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.setValueAtTime(350, now + 0.03);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    osc.connect(gain);
    gain.connect(this.audioMaster);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  private playPowerUpSound() {
    if (!this.audioContext || !this.audioMaster) return;
    const now = this.audioContext.currentTime;
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.06, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.16);
      osc.connect(gain);
      gain.connect(this.audioMaster!);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.16);
    });
  }

  private playDeathSound() {
    if (!this.audioContext || !this.audioMaster) return;
    const now = this.audioContext.currentTime;
    [600, 500, 400, 300, 200, 150].forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      gain.gain.setValueAtTime(0.06, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 0.14);
      osc.connect(gain);
      gain.connect(this.audioMaster!);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.15);
    });
  }

  private playGoalSound() {
    if (!this.audioContext || !this.audioMaster) return;
    const now = this.audioContext.currentTime;
    [523, 659, 784, 1047, 784, 1047, 1319].forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0.07, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.1 + 0.2);
      osc.connect(gain);
      gain.connect(this.audioMaster!);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.22);
    });
  }
}