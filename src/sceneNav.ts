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

  if (caller && caller.scene.isActive()) {
    caller.scene.stop();
    // Use setTimeout instead of scene.time.delayedCall because
    // after scene.stop() the scene's clock no longer ticks.
    setTimeout(() => launchTitle(game), 0);
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
