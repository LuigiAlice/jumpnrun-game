// Main entry point for the Phaser game
import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { TitleScene } from './scenes/TitleScene';
import { GameScene } from './scenes/GameScene';
import { GameOverScene } from './scenes/GameOverScene';
import { goToTitle } from './sceneNav';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  roundPixels: true,
  parent: 'game-container',
  width: 1200,
  height: 800,
  backgroundColor: '#1a1a2e',
  scale: {
    mode: Phaser.Scale.FIT,
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
(window as any).__game = game;

game.events.once('ready', () => {
  game.canvas?.setAttribute('tabindex', '0');
  game.canvas?.focus();
});

window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key !== 'Escape') return;
  const activeGame = game.scene.isActive('Game');
  const activeGameOver = game.scene.isActive('GameOver');
  if (!activeGame && !activeGameOver) return;
  event.preventDefault();
  event.stopPropagation();
  if (activeGame) {
    const gameScene = game.scene.getScene('Game') as GameScene;
    if (gameScene?.scene?.isActive()) {
      gameScene.quitToTitle();
    }
  } else if (activeGameOver) {
    goToTitle(game, game.scene.getScene('GameOver'));
  }
});