// Minimal BIOME_MUSIC placeholder exported for audio subsystem.
// The full data previously lived inline inside GameScene.ts; to keep the repo small
// and avoid embedding very large literals in multiple places we export a compact
// placeholder here. GameScene still contains the original full data until we
// perform a safe extraction refactor.
export const BIOME_MUSIC: Record<string, { melody: number[]; bassline: number[]; drums: number[]; chordProgression: { root: number; type: string }[]; padRoots: number[] }> = {
  'grasslands': {
    melody: [329.63, 0, 392.0],
    bassline: [130.81, 0],
    drums: [1, 0, 0, 0],
    chordProgression: [{ root: 261.63, type: 'major' }],
    padRoots: [261.63]
  },
  'desert': {
    melody: [392.0, 0, 293.66],
    bassline: [98.0, 0],
    drums: [1, 0, 0, 0],
    chordProgression: [],
    padRoots: []
  },
  'water': {
    melody: [261.63, 0, 293.66],
    bassline: [65.41, 0],
    drums: [1, 0, 1, 0],
    chordProgression: [],
    padRoots: []
  }
};
