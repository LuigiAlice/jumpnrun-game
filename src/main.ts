// Main entry point for the Phaser game
import { BootScene } from './scenes/BootScene';
import { TitleScene } from './scenes/TitleScene';
import { GameScene } from './scenes/GameScene';
import { GameOverScene } from './scenes/GameOverScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 1200,
  height: 800,
  backgroundColor: '#1a1a2e',
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: { width: 600, height: 400 },
    max: { width: 1200, height: 800 }
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 1000 },
      debug: false
    }
  },
  scene: [BootScene, TitleScene, GameScene, GameOverScene]
};

const game = new Phaser.Game(config);

(window as any).game = game;