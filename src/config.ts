export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 800;
export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 800;

// Centralized physics & gameplay constants used across the codebase.
export const PHYSICS = {
  TILE_SIZE: 32,
  // Player size and buffer used for jump calculations
  PLAYER_WIDTH: 48,
  PLAYER_BUFFER: 24,

  // Core physics values (gravity in px/s^2, speeds in px/s)
  GRAVITY: 2000,
  JUMP_SPEED: 900,
  HORIZONTAL_SPEED: 300,

  // Solver-related constants (see AGENTS.md / Physics.ts)
  MAX_PRACTICAL_JUMP: 585,
  MAX_JUMP_UP: 350,
  MAX_FALL_DOWN: 1000,
};
