import { describe, it, expect } from 'vitest';
import { BIOME_MUSIC, midiToFreq } from '../src/audio/biomeMusic';
import { stepTime } from '../src/audio/musicPlayer';
import type { Biome } from '../src/data/levels/index';

const BIOMES: Biome[] = [
  'grasslands', 'desert', 'water', 'ice-snow', 'sky-clouds', 'forest', 'village',
  'beach-island', 'factory', 'volcano-lava', 'haunted-mansion', 'ruins',
  'canyon-base', 'space-star', 'castle-final',
];

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

describe('Music', () => {
  it('every biome has a song', () => {
    for (const biome of BIOMES) {
      expect(BIOME_MUSIC[biome], biome).toBeDefined();
    }
    expect(Object.keys(BIOME_MUSIC).length).toBe(15);
  });

  it('bpm within 110-180 for all songs', () => {
    for (const biome of BIOMES) {
      expect(BIOME_MUSIC[biome].bpm).toBeGreaterThanOrEqual(110);
      expect(BIOME_MUSIC[biome].bpm).toBeLessThanOrEqual(180);
    }
  });

  it('every song has at least 16 bars and matching track lengths', () => {
    for (const biome of BIOMES) {
      const song = BIOME_MUSIC[biome];
      expect(song.melody.length).toBeGreaterThanOrEqual(256);
      expect(song.bassline.length).toBe(song.melody.length);
      expect(song.drums.length).toBe(song.melody.length);
      expect(song.melody.length % 16).toBe(0);
    }
  });

  it('hook reprise: first 32 steps reappear later in the melody', () => {
    for (const biome of BIOMES) {
      const hook = BIOME_MUSIC[biome].melody.slice(0, 32);
      const melody = BIOME_MUSIC[biome].melody;
      const reprised = melody.some((_, i) =>
        i >= 32 && i + 32 <= melody.length && melody.slice(i, i + 32).every((v, j) => v === hook[j])
      );
      expect(reprised, biome).toBe(true);
    }
  });

  it('drums contain kick(1), hat(2) and snare(3)', () => {
    for (const biome of BIOMES) {
      const drums = BIOME_MUSIC[biome].drums;
      expect(drums.includes(1), biome).toBe(true);
      expect(drums.includes(2), biome).toBe(true);
      expect(drums.includes(3), biome).toBe(true);
    }
  });

  it('snare only on beats 2 and 4 (step % 16 in {4, 12})', () => {
    for (const biome of BIOMES) {
      const drums = BIOME_MUSIC[biome].drums;
      drums.forEach((d, i) => {
        if (d === 3) {
          expect([4, 12], `${biome} step ${i}`).toContain(i % 16);
        }
      });
    }
  });

  it('no NaN, no negative values in any track', () => {
    for (const biome of BIOMES) {
      const song = BIOME_MUSIC[biome];
      for (const track of [song.melody, song.bassline, song.drums]) {
        for (const v of track) {
          expect(Number.isNaN(v)).toBe(false);
          expect(v).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });

  it('melody register (median) between 60 and 96, bass below melody', () => {
    for (const biome of BIOMES) {
      const song = BIOME_MUSIC[biome];
      const melodyNotes = song.melody.filter((v) => v > 0);
      const bassNotes = song.bassline.filter((v) => v > 0);
      const melodyMedian = median(melodyNotes);
      const bassMedian = median(bassNotes);
      expect(melodyMedian, biome).toBeGreaterThanOrEqual(60);
      expect(melodyMedian, biome).toBeLessThanOrEqual(96);
      expect(bassMedian, biome).toBeLessThan(melodyMedian);
    }
  });

  it('midiToFreq converts A4 to 440 Hz and C4 to ~261.63 Hz', () => {
    expect(Math.abs(midiToFreq(69) - 440)).toBeLessThan(0.01);
    expect(Math.abs(midiToFreq(60) - 261.63)).toBeLessThan(0.01);
  });

  it('song data is deterministic across imports', async () => {
    const first = await import('../src/audio/biomeMusic');
    const second = await import('../src/audio/biomeMusic');
    for (const biome of BIOMES) {
      expect(second.BIOME_MUSIC[biome].melody).toEqual(first.BIOME_MUSIC[biome].melody);
      expect(second.BIOME_MUSIC[biome].bassline).toEqual(first.BIOME_MUSIC[biome].bassline);
      expect(second.BIOME_MUSIC[biome].drums).toEqual(first.BIOME_MUSIC[biome].drums);
    }
  });

  it('stepTime: one 16th note at 150 bpm equals 0.1s', () => {
    expect(stepTime(150, 1)).toBeCloseTo(0.1, 10);
    expect(stepTime(150, 16)).toBeCloseTo(1.6, 10);
  });
});
