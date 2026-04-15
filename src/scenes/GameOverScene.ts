import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config';

export class GameOverScene extends Phaser.Scene {
  private score: number = 0;
  private coins: number = 0;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private canRestart: boolean = false;

  constructor() {
    super({ key: 'GameOver' });
  }

  init(data: any) {
    this.score = data?.score ?? 0;
    this.coins = data?.coins ?? 0;
  }

  create() {
    this.cursors = this.input.keyboard!.createCursorKeys();

    this.add.graphics()
      .fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x0f0f1a, 0x0f0f1a, 1)
      .fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    const centerX = GAME_WIDTH / 2;

    const title = this.add.text(centerX, 150, 'GAME OVER', {
      fontSize: '64px',
      fontFamily: 'Fredoka, Arial Black, sans-serif',
      color: '#e74c3c',
      stroke: '#c0392b',
      strokeThickness: 8
    }).setOrigin(0.5);

    this.add.text(centerX, 250, 'GEWONNEN:', {
      fontSize: '28px',
      color: '#2ecc71'
    }).setOrigin(0.5);

    this.add.text(centerX, 310, 'PUNKTE: ' + this.score, {
      fontSize: '36px',
      color: '#f1c40f',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(centerX, 360, 'MÜNZEN: ' + this.coins, {
      fontSize: '36px',
      color: '#f39c12',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    const starCount = Math.min(5, Math.floor(this.score / 500));
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < starCount ? '⭐' : '☆';
    }
    this.add.text(centerX, 420, stars, {
      fontSize: '40px'
    }).setOrigin(0.5);

    const restartText = this.add.text(centerX, 520, 'DRÜCKE LEERTASTE FÜR NEUSTART', {
      fontSize: '20px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => {
        restartText.setAlpha(restartText.alpha === 1 ? 0.3 : 1);
      }
    });
    
    this.time.delayedCall(1000, () => {
      this.canRestart = true;
    });
  }
  
  update() {
    if (!this.canRestart) return;
    
    if (this.cursors.space.isDown) {
      this.scene.start('Game');
    }
  }
}