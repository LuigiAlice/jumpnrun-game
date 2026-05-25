import Phaser from 'phaser';

function launchTitle(game: Phaser.Game): void {
  const sm = game.scene;
  if (sm.isActive('Game')) sm.stop('Game');
  if (sm.isActive('GameOver')) sm.stop('GameOver');
  if (sm.isActive('Title')) sm.stop('Title');
  sm.start('Title');
}

/** Stop gameplay scenes and show the title screen (clean scene stack). */
export function goToTitle(game: Phaser.Game, caller?: Phaser.Scene): void {
  const sm = game.scene;
  if (sm.isActive('GameOver')) sm.stop('GameOver');

  // Stopping the current scene and starting another in the same frame is unreliable.
  if (caller && caller.scene.isActive()) {
    caller.scene.stop();
    caller.time.delayedCall(0, () => launchTitle(game));
    return;
  }

  launchTitle(game);
}

/** Start a level from the title screen (no overlapping scenes). */
export function startGameFromTitle(
  game: Phaser.Game,
  data: {
    levelIndex: number;
    lives?: number;
    score?: number;
    coinCount?: number;
    isPlayerBig?: boolean;
    isPlayerFire?: boolean;
  }
): void {
  const sm = game.scene;
  if (sm.isActive('GameOver')) sm.stop('GameOver');
  if (sm.isActive('Game')) sm.stop('Game');
  if (sm.isActive('Title')) sm.stop('Title');
  sm.start('Game', data);
}
