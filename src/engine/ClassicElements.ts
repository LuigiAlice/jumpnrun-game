import type Phaser from 'phaser';
import type { LevelData, RedCoinChallenge, Vine } from '../data/levels/index';

type Sprite = Phaser.Physics.Arcade.Sprite;
type Collider = Phaser.Physics.Arcade.Collider;
export interface ClassicElementCallbacks {
  hit(): void;
  reward(kind: 'oneup' | 'score', x: number, y: number): void;
  coin?(x: number, y: number): void;
}
export interface ClimbingInput { up: boolean; down: boolean; jumpDown: boolean; horizontal: number }

/** Angles and timers use game time, so focus changes never overtake the player's physics. */
export function fireBarAngle(elapsedMs: number, angularSpeed = 1.1, phase = 0): number {
  return phase + elapsedMs * angularSpeed / 1000;
}
export function redCoinTimeLeft(remainingMs: number, deltaMs: number): number {
  return Math.max(0, remainingMs - Math.max(0, deltaMs));
}

interface FireArm { x: number; y: number; speed: number; phase: number; orbs: Sprite[] }
interface CoinTrial {
  data: RedCoinChallenge;
  ring: Sprite;
  coins: Sprite[];
  label: Phaser.GameObjects.Text;
  state: 'ready' | 'active' | 'failed' | 'complete';
  remainingMs: number;
  collected: number;
  lastSeconds: number;
}

/** Optional discoveries and hazards; never changes the level's required collision geometry. */
export class ClassicElements {
  private elapsedMs = 0;
  private destroyed = false;
  private arms: FireArm[] = [];
  private trials: CoinTrial[] = [];
  private activeVine: Vine | null = null;
  private wasJumpDown = false;
  private decorations: Phaser.GameObjects.GameObject[] = [];
  private colliders: Collider[] = [];
  private fireOrbs: Phaser.Physics.Arcade.Group;
  private rings: Phaser.Physics.Arcade.StaticGroup;
  private redCoins: Phaser.Physics.Arcade.StaticGroup;
  private coinOwners = new Map<Phaser.GameObjects.GameObject, { trial: CoinTrial; index: number }>();
  private ringOwners = new Map<Phaser.GameObjects.GameObject, CoinTrial>();
  private hud: Phaser.GameObjects.Text | null = null;
  private readonly onShutdown = () => this.destroy();

  constructor(
    private scene: Phaser.Scene,
    private player: Sprite,
    private level: LevelData,
    private callbacks: ClassicElementCallbacks,
  ) {
    this.fireOrbs = scene.physics.add.group({ allowGravity: false, immovable: true });
    this.rings = scene.physics.add.staticGroup();
    this.redCoins = scene.physics.add.staticGroup();
    for (const vine of level.vines || []) {
      this.decorations.push(scene.add.tileSprite(vine.x, vine.y - vine.height / 2, 24, vine.height, 'vine_segment').setDepth(-1));
      this.decorations.push(scene.add.image(vine.x, vine.y - vine.height, 'vine_top').setDepth(-1));
    }
    for (const bar of level.fireBars || []) {
      this.decorations.push(scene.add.image(bar.x, bar.y, 'firebar_hub').setDepth(3));
      const orbs: Sprite[] = [];
      const angle = fireBarAngle(0, bar.angularSpeed, bar.phase);
      for (let i = 1; i <= bar.length; i++) {
        const orb = this.fireOrbs.create(bar.x + Math.cos(angle) * i * 16, bar.y + Math.sin(angle) * i * 16, 'firebar_orb') as Sprite;
        orb.setDepth(4);
        const body = orb.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false).setCircle(6, 2, 2);
        orbs.push(orb);
      }
      this.arms.push({ x: bar.x, y: bar.y, speed: bar.angularSpeed ?? 1.1, phase: bar.phase ?? 0, orbs });
    }
    for (const data of level.redCoinChallenges || []) this.createTrial(data);
    if (this.trials.length) {
      this.hud = scene.add.text(scene.cameras.main.width / 2, 132, '', {
        fontFamily: 'monospace', fontSize: '16px', color: '#ffcf9c', stroke: '#25233b', strokeThickness: 3,
      }).setOrigin(0.5).setScrollFactor(0).setDepth(1002).setVisible(false);
    }
    this.colliders.push(scene.physics.add.overlap(player, this.fireOrbs, () => callbacks.hit()));
    this.colliders.push(scene.physics.add.overlap(player, this.rings, (_player, ring) => {
      const trial = this.ringOwners.get(ring as Phaser.GameObjects.GameObject);
      if (trial?.state === 'ready') this.startTrial(trial);
    }));
    this.colliders.push(scene.physics.add.overlap(player, this.redCoins, (_player, coin) => {
      const owner = this.coinOwners.get(coin as Phaser.GameObjects.GameObject);
      if (owner) this.collectRedCoin(owner.trial, owner.index);
    }));
    scene.events.once('shutdown', this.onShutdown);
  }

  get isClimbing(): boolean { return this.activeVine !== null; }

  private createTrial(data: RedCoinChallenge): void {
    const ring = this.rings.create(data.x, data.y, 'red_ring') as Sprite;
    const label = this.scene.add.text(data.x, data.y - 48, 'Rote Münzen', {
      fontFamily: 'monospace', fontSize: '12px', color: '#ffd34e', stroke: '#25233b', strokeThickness: 3,
    }).setOrigin(0.5).setDepth(10);
    const trial: CoinTrial = { data, ring, coins: [], label, state: 'ready', remainingMs: 0, collected: 0, lastSeconds: -1 };
    this.trials.push(trial);
    this.ringOwners.set(ring, trial);
    data.coins.forEach((point, index) => {
      const coin = this.redCoins.create(point.x, point.y, 'red_coin') as Sprite;
      coin.setVisible(false).setActive(false);
      coin.body!.enable = false;
      trial.coins.push(coin);
      this.coinOwners.set(coin, { trial, index });
    });
  }

  private startTrial(trial: CoinTrial): void {
    if (!trial.coins.length) return;
    trial.state = 'active';
    trial.remainingMs = trial.data.durationMs ?? 10000;
    trial.collected = 0;
    trial.lastSeconds = -1;
    trial.ring.setAlpha(0.45);
    for (const coin of trial.coins) {
      coin.setTexture('red_coin').setActive(true).setVisible(true).setAlpha(1);
      coin.body!.enable = true;
    }
    this.updateTrialLabel(trial);
  }

  private collectRedCoin(trial: CoinTrial, index: number): void {
    const coin = trial.coins[index];
    if (trial.state !== 'active' || !coin.body?.enable) return;
    coin.body.enable = false;
    coin.setTexture('red_coin_used').setAlpha(0.3);
    trial.collected++;
    this.callbacks.coin?.(coin.x, coin.y);
    if (trial.collected === trial.coins.length) {
      trial.state = 'complete';
      trial.ring.body!.enable = false;
      trial.ring.setTint(0xffd34e).setAlpha(0.65);
      trial.label.setText('Geschafft!');
      this.callbacks.reward(trial.data.reward ?? 'oneup', trial.data.x, trial.data.y);
    } else this.updateTrialLabel(trial);
  }

  private updateTrialLabel(trial: CoinTrial): void {
    const seconds = Math.ceil(trial.remainingMs / 1000);
    if (seconds !== trial.lastSeconds) trial.lastSeconds = seconds;
    trial.label.setText(`${trial.collected}/${trial.coins.length} · ${seconds}s`);
  }

  private playerTouchesRing(trial: CoinTrial): boolean {
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    return body.right > trial.data.x - 24 && body.left < trial.data.x + 24
      && body.bottom > trial.data.y - 32 && body.top < trial.data.y + 32;
  }

  /** Runs before normal jump handling. Only this class's climbing mode changes allowGravity. */
  handleClimbing(input: ClimbingInput, swimming = false): { climbing: boolean; launched: boolean } {
    if (this.destroyed) return { climbing: false, launched: false };
    const pressed = input.jumpDown && !this.wasJumpDown;
    this.wasJumpDown = input.jumpDown;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (!body?.enable) return { climbing: false, launched: false };
    if (this.activeVine && pressed) {
      this.activeVine = null;
      body.setAllowGravity(true).setVelocityY(-450);
      return { climbing: false, launched: true };
    }
    if (swimming || input.horizontal !== 0 || (this.activeVine && !this.withinVine(this.activeVine))) {
      if (this.activeVine) body.setAllowGravity(true);
      this.activeVine = null;
      return { climbing: false, launched: false };
    }
    if (!this.activeVine && (input.up || input.down) && !input.jumpDown) {
      this.activeVine = (this.level.vines || []).find(vine => this.withinVine(vine)
        && !(input.down && body.blocked.down && body.bottom >= vine.y - 4)) ?? null;
      if (this.activeVine) {
        this.player.setX(this.activeVine.x);
        body.setVelocityX(0);
      }
    }
    if (!this.activeVine) return { climbing: false, launched: false };
    const vine = this.activeVine;
    if (input.down && body.bottom >= vine.y) {
      this.activeVine = null;
      body.setAllowGravity(true);
      return { climbing: false, launched: false };
    }
    body.setAllowGravity(false);
    const atTop = this.player.y <= vine.y - vine.height + 12;
    body.setVelocityY(input.up && !atTop ? -180 : input.down ? 180 : 0);
    return { climbing: true, launched: false };
  }

  private withinVine(vine: Vine): boolean {
    return Math.abs(this.player.x - vine.x) <= 26 && this.player.y >= vine.y - vine.height - 8 && this.player.y <= vine.y + 8;
  }

  update(deltaMs: number): void {
    if (this.destroyed) return;
    const delta = Math.max(0, deltaMs);
    this.elapsedMs += delta;
    for (const arm of this.arms) {
      const angle = fireBarAngle(this.elapsedMs, arm.speed, arm.phase);
      const dx = Math.cos(angle) * 16, dy = Math.sin(angle) * 16;
      for (let i = 0; i < arm.orbs.length; i++) {
        const orb = arm.orbs[i];
        (orb.body as Phaser.Physics.Arcade.Body).reset(arm.x + dx * (i + 1), arm.y + dy * (i + 1));
      }
    }
    let active: CoinTrial | null = null;
    for (const trial of this.trials) {
      if (trial.state === 'active') {
        trial.remainingMs = redCoinTimeLeft(trial.remainingMs, delta);
        if (trial.remainingMs <= 0) {
          trial.state = 'failed';
          trial.label.setText('Zeit vorbei · Ring verlassen');
          for (const coin of trial.coins) { coin.body!.enable = false; coin.setVisible(false).setActive(false); }
        } else {
          active = trial;
          if (Math.ceil(trial.remainingMs / 1000) !== trial.lastSeconds) this.updateTrialLabel(trial);
        }
      } else if (trial.state === 'failed' && !this.playerTouchesRing(trial)) {
        trial.state = 'ready';
        trial.ring.setAlpha(1);
        trial.label.setText('Noch einmal?');
      }
    }
    if (this.hud) {
      this.hud.setVisible(active !== null);
      if (active) {
        const text = `Rote Münzen ${active.collected}/${active.coins.length} · ${Math.ceil(active.remainingMs / 1000)}s`;
        if (this.hud.text !== text) this.hud.setText(text);
      }
    }
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.scene.events.off('shutdown', this.onShutdown);
    for (const collider of this.colliders) if (collider.world) collider.destroy();
    this.colliders.length = 0;
    for (const decoration of this.decorations) decoration.destroy();
    for (const trial of this.trials) trial.label.destroy();
    // Phaser systems may have already destroyed groups before user shutdown listeners run.
    for (const group of [this.fireOrbs, this.rings, this.redCoins]) {
      if (group.children) { group.clear(true, true); group.destroy(); }
    }
    this.hud?.destroy();
    this.activeVine = null;
    this.coinOwners.clear(); this.ringOwners.clear();
    this.arms.length = 0; this.trials.length = 0;
  }
}
