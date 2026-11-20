import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config';
import { goToTitle } from '../sceneNav';

export class GameOverScene extends Phaser.Scene {
  private score: number = 0;
  private victory = false;
  private coins: number = 0;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private escapeKey!: Phaser.Input.Keyboard.Key;
  private canRestart: boolean = false;

  constructor() {
    super({ key: 'GameOver' });
  }

  init(data: any) {
    this.victory = data?.victory === true;
    this.canRestart = false;
    this.score = data?.score ?? 0;
    this.coins = data?.coins ?? 0;
  }

  create() {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.escapeKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.add.graphics()
      .fillGradientStyle(0xc6e9df, 0xc6e9df, 0xf7edd1, 0xf7edd1, 1)
      .fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    const centerX = GAME_WIDTH / 2;
    this.add.graphics().fillStyle(0x527e78, 0.12).fillRoundedRect(220, 102, 760, 510, 36)
      .fillStyle(0xfffcf0, 0.96).fillRoundedRect(220, 94, 760, 510, 36);

    const title = this.add.text(centerX, 150, this.victory ? 'ABENTEUER GESCHAFFT!' : 'GAME OVER', {
      fontSize: this.victory ? '42px' : '64px',
      fontFamily: 'Fredoka, Trebuchet MS, sans-serif',
      color: this.victory ? '#d79b45' : '#df7c75',
      stroke: '#fff4dc',
      strokeThickness: 5
    }).setOrigin(0.5);

    this.add.text(centerX, 250, this.victory ? 'DER BURGHÜTER IST BESIEGT' : 'DEIN ERGEBNIS', {
      fontSize: '28px',
      fontFamily: 'Fredoka, Trebuchet MS, sans-serif',
      color: '#527e78'
    }).setOrigin(0.5);

    this.add.text(centerX, 310, 'PUNKTE: ' + this.score, {
      fontSize: '36px',
      color: '#527e78',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(centerX, 360, 'MÜNZEN: ' + this.coins, {
      fontSize: '36px',
      color: '#527e78',
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

    this.add.text(centerX, 560, 'ESC = HAUPTMENÜ', {
      fontSize: '18px',
      color: '#527e78',
    }).setOrigin(0.5);

    const restartText = this.add.text(centerX, 520, 'LEERTASTE = LEVELAUSWAHL', {
      fontSize: '20px',
      color: '#527e78',
      stroke: '#fff4dc',
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
    if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
      goToTitle(this.game, this);
      return;
    }
    if (!this.canRestart) return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      goToTitle(this.game, this);
    }
  }
}