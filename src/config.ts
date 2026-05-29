export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 800;
export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 800;

// Biome-specific gravity overrides (used in GameScene and solver)
export const BIOME_GRAVITY: Record<string, number> = {
  'space-star': 1000,
  'sky-clouds': 1500,
  'water': 1200,
  'beach-island': 1500,
  'volcano-lava': 2200,
};

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
  // Note: MAX_PRACTICAL_JUMP was removed in biome-aware physics refactor.
  // Jump distances are now calculated from gravity + biome overrides.
  MAX_JUMP_DISTANCE: 800,
  MAX_JUMP_UP: 350,
  MAX_FALL_DOWN: 1000,
};

// Get effective gravity for a biome (falls back to default)
export function getBiomeGravity(biome: string): number {
  return BIOME_GRAVITY[biome] ?? PHYSICS.GRAVITY;
}
