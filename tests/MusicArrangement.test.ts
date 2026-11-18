import { describe, expect, it } from 'vitest';
import { BIOME_MUSIC } from '../src/audio/biomeMusic';

const entries = Object.entries(BIOME_MUSIC);

describe('Melodic biome arrangements', () => {
  it('preserves written note lengths without overlapping the next melody onset', () => {
    for (const [biome, song] of entries) {
      expect(song.melodyDurations, biome).toHaveLength(song.melody.length);
      const durations = song.melodyDurations!;
      song.melody.forEach((note, step) => {
        const duration = durations[step];
        expect(Number.isInteger(duration), `${biome} step ${step}`).toBe(true);
        if (note === 0) {
          expect(duration).toBe(0);
        } else {
          expect(duration).toBeGreaterThan(0);
          expect(step + duration).toBeLessThanOrEqual(song.melody.length);
          for (let i = step + 1; i < step + duration; i++) {
            expect(song.melody[i], `${biome} overlap at ${i}`).toBe(0);
          }
        }
      });
      expect(durations.some(d => d >= 4), `${biome} needs space for sustained phrases`).toBe(true);
    }
  });

  it('gives all fifteen biomes distinct hooks and a matching harmonic form', () => {
    const hooks = entries.map(([, song]) => song.melody.slice(0, 32).join(','));
    expect(new Set(hooks).size).toBe(15);
    for (const [biome, song] of entries) {
      expect(song.chords, biome).toHaveLength(song.melody.length / 16);
      expect(song.melodyDurations!.slice(128, 160), biome).toEqual(song.melodyDurations!.slice(0, 32));
    }
  });

  it('anchors melodic downbeats in the current harmony', () => {
    for (const [biome, song] of entries) {
      let anchors = 0;
      let downbeats = 0;
      song.chords.forEach((chord, bar) => {
        const note = song.melody[bar * 16];
        if (!note) return;
        downbeats++;
        const interval = ((note - chord.root) % 12 + 12) % 12;
        if ([0, chord.type === 'minor' ? 3 : 4, 7].includes(interval)) anchors++;
      });
      expect(downbeats, biome).toBeGreaterThanOrEqual(8);
      expect(anchors / downbeats, biome).toBeGreaterThanOrEqual(0.75);
    }
  });

  it('keeps calm biomes gentler than chase and finale biomes', () => {
    for (const calm of ['water', 'ice-snow', 'space-star'] as const) {
      for (const energetic of ['factory', 'volcano-lava', 'castle-final'] as const) {
        expect(BIOME_MUSIC[calm].bpm).toBeLessThan(BIOME_MUSIC[energetic].bpm);
        expect(BIOME_MUSIC[calm].percussionGain!).toBeLessThan(BIOME_MUSIC[energetic].percussionGain!);
        expect(BIOME_MUSIC[calm].arpEverySteps!).toBeGreaterThanOrEqual(BIOME_MUSIC[energetic].arpEverySteps!);
      }
    }
    for (const [biome, song] of entries) {
      expect([1, 2, 4], biome).toContain(song.arpEverySteps);
      for (const gain of [song.leadGain, song.padGain, song.percussionGain, song.delaySend]) {
        expect(Number.isFinite(gain), biome).toBe(true);
        expect(gain).toBeGreaterThanOrEqual(0);
        expect(gain).toBeLessThanOrEqual(2);
      }
    }
  });
});
