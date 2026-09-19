import type { Biome } from '../data/levels/index';

export type ChordType = 'major' | 'minor';

export interface Chord {
  root: number;
  type: ChordType;
}

export interface BiomeSong {
  bpm: number;
  leadWave: OscillatorType;
  leadDouble: 'none' | 'sub' | 'oct';
  melody: number[];
  bassline: number[];
  drums: number[];
  chords: Chord[];
}

export function midiToFreq(m: number): number {
  return 440 * Math.pow(2, (m - 69) / 12);
}

const NOTE_OFFSETS: Record<string, number> = {
  c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11,
};

function parseBar(src: string): number[] {
  const out: number[] = [];
  for (const tok of src.trim().split(/\s+/)) {
    if (tok === '' ) continue;
    if (tok[0] === '.') {
      const len = tok.length > 1 ? parseInt(tok.slice(1), 10) : 2;
      for (let i = 0; i < len; i++) out.push(0);
      continue;
    }
    const m = tok.match(/^([a-g])([#b]?)(-?\d+)(?:\/(\d+))?$/);
    if (!m) throw new Error('bad token: ' + tok);
    let semis = NOTE_OFFSETS[m[1]];
    if (m[2] === '#') semis += 1;
    if (m[2] === 'b') semis -= 1;
    const midi = 12 * (parseInt(m[3], 10) + 1) + semis;
    const len = m[4] ? parseInt(m[4], 10) : 2;
    out.push(midi);
    for (let i = 1; i < len; i++) out.push(0);
  }
  if (out.length !== 16) throw new Error('bar length ' + out.length + ' in: ' + src);
  return out;
}

function seqBars(src: string): number[] {
  const lines = src.trim().split(/[|\n]/).map((l) => l.trim()).filter((l) => l.length > 0);
  const out: number[] = [];
  for (const l of lines) out.push(...parseBar(l));
  return out;
}

type BassPattern = number[];

const BP_GROOVE: BassPattern = [0, -1, 0, -1, 7, -1, 0, -1, 0, -1, 0, -1, 12, -1, 7, -1];
const BP_PUMP: BassPattern = [0, -1, 12, -1, 0, -1, 12, -1, 0, -1, 12, -1, 0, -1, 12, -1];
const BP_DRIVE: BassPattern = [0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 12, 0];
const BP_SPARSE: BassPattern = [0, -1, -1, -1, 7, -1, -1, -1, 0, -1, -1, -1, 7, -1, -1, -1];
const BP_WALKUP: BassPattern = [0, -1, 2, -1, 4, -1, 5, -1, 7, -1, 9, -1, 10, -1, 11, -1];
const BP_TURN: BassPattern = [0, -1, 4, -1, 7, -1, 10, -1, 12, -1, 10, -1, 7, -1, 5, -1];
const BP_SYNC: BassPattern = [-1, 0, -1, -1, 0, -1, 7, -1, -1, 0, -1, -1, 0, -1, 7, -1];

function bassBar(root: number, pat: BassPattern): number[] {
  return pat.map((o) => (o < 0 ? 0 : root + o));
}

function bassTrack(roots: number[], pats: BassPattern[]): number[] {
  const out: number[] = [];
  for (let b = 0; b < roots.length; b++) out.push(...bassBar(roots[b], pats[b % pats.length]));
  return out;
}

const DRUM_STD = [1, 0, 2, 0, 3, 0, 2, 0, 1, 0, 2, 0, 3, 0, 2, 0];
const DRUM_SNOW = [1, 0, 2, 0, 0, 0, 2, 0, 1, 0, 2, 0, 3, 0, 2, 0];
const DRUM_FILL = [1, 0, 2, 0, 3, 0, 2, 0, 1, 0, 2, 0, 3, 1, 1, 1];
const DRUM_SPARSE = [1, 0, 2, 0, 0, 0, 2, 0, 1, 0, 2, 0, 3, 0, 2, 0];

function drumTrack(bars: number, std: number[], fillBar: number[]): number[] {
  const out: number[] = [];
  for (let b = 0; b < bars; b++) {
    out.push(...(b === 7 || b === 15 ? fillBar : std));
  }
  return out;
}

interface SongSpec {
  bpm: number;
  leadWave: OscillatorType;
  leadDouble?: 'none' | 'sub' | 'oct';
  hook: string;
  resp: string;
  bridge: string;
  tail: string;
  chords: Chord[];
  bassRoots: number[];
  bassPats: BassPattern[];
  drumStd?: number[];
}

function buildSong(spec: SongSpec): BiomeSong {
  const hook = seqBars(spec.hook);
  const resp = seqBars(spec.resp);
  const bridge = seqBars(spec.bridge);
  const tail = seqBars(spec.tail);
  if (hook.length !== 32 || resp.length !== 32 || bridge.length !== 64 || tail.length !== 64) {
    throw new Error('bad section lengths');
  }
  return {
    bpm: spec.bpm,
    leadWave: spec.leadWave,
    leadDouble: spec.leadDouble || 'none',
    melody: [...hook, ...resp, ...bridge, ...hook, ...resp, ...tail],
    bassline: bassTrack(spec.bassRoots, spec.bassPats),
    drums: drumTrack(16, spec.drumStd || DRUM_STD, spec.drumStd === DRUM_SNOW ? DRUM_SNOW : DRUM_FILL),
    chords: spec.chords,
  };
}

function C(root: number, type: ChordType = 'major'): Chord {
  return { root, type };
}

const CHORDS_GRASSLANDS = [C(48), C(43), C(45, 'minor'), C(41), C(48), C(45, 'minor'), C(41), C(43), C(48), C(43), C(45, 'minor'), C(41), C(41), C(43), C(48), C(43)];

const CHORDS_DESERT = [C(40, 'minor'), C(41, 'minor'), C(40, 'minor'), C(47), C(40, 'minor'), C(41, 'minor'), C(40, 'minor'), C(47), C(40, 'minor'), C(41, 'minor'), C(40, 'minor'), C(47), C(41, 'minor'), C(47), C(40, 'minor'), C(47)];

const CHORDS_WATER = [C(48), C(48), C(45, 'minor'), C(48), C(52, 'minor'), C(42, 'minor'), C(52, 'minor'), C(48), C(48), C(48), C(45, 'minor'), C(48), C(48), C(50), C(48), C(48)];

const CHORDS_ICE = [C(48), C(41), C(43), C(48), C(45, 'minor'), C(41), C(43), C(48), C(48), C(41), C(43), C(48), C(41), C(43), C(48), C(48)];

const CHORDS_SKY = [C(41), C(48), C(50, 'minor'), C(46), C(46), C(48), C(41), C(48), C(41), C(48), C(50, 'minor'), C(46), C(46), C(48), C(41), C(48)];

const CHORDS_FOREST = [C(45, 'minor'), C(41), C(48), C(43), C(48), C(43), C(45, 'minor'), C(43), C(45, 'minor'), C(41), C(48), C(43), C(41), C(43), C(48), C(45, 'minor')];

const CHORDS_VILLAGE = [C(43), C(50), C(40, 'minor'), C(48), C(48), C(50), C(43), C(50), C(43), C(50), C(40, 'minor'), C(48), C(48), C(50), C(43), C(43)];

const CHORDS_BEACH = [C(48), C(41), C(43), C(41), C(43), C(41), C(48), C(43), C(48), C(41), C(43), C(41), C(41), C(43), C(48), C(48)];

const CHORDS_FACTORY = [C(40, 'minor'), C(48), C(43), C(50), C(40, 'minor'), C(48), C(43), C(47), C(40, 'minor'), C(48), C(43), C(50), C(48), C(50), C(40, 'minor'), C(40, 'minor')];

const CHORDS_VOLCANO = [C(50, 'minor'), C(43, 'minor'), C(46), C(45), C(50, 'minor'), C(43, 'minor'), C(45), C(45), C(50, 'minor'), C(43, 'minor'), C(46), C(45), C(43, 'minor'), C(45), C(50, 'minor'), C(50, 'minor')];

const CHORDS_HAUNTED = [C(43, 'minor'), C(51), C(50), C(50), C(43, 'minor'), C(51), C(50), C(50), C(43, 'minor'), C(51), C(50), C(50), C(51), C(50), C(43, 'minor'), C(50)];

const CHORDS_RUINS = [C(50, 'minor'), C(43), C(50, 'minor'), C(45, 'minor'), C(48), C(43), C(50, 'minor'), C(45, 'minor'), C(50, 'minor'), C(43), C(50, 'minor'), C(45, 'minor'), C(48), C(43), C(45, 'minor'), C(50, 'minor')];

const CHORDS_CANYON = [C(45, 'minor'), C(41), C(48), C(43), C(48), C(43), C(45, 'minor'), C(45, 'minor'), C(45, 'minor'), C(41), C(48), C(43), C(41), C(43), C(45, 'minor'), C(45, 'minor')];

const CHORDS_SPACE = [C(48), C(52, 'minor'), C(50), C(52, 'minor'), C(48), C(52, 'minor'), C(42, 'minor'), C(52, 'minor'), C(48), C(52, 'minor'), C(50), C(52, 'minor'), C(50), C(52, 'minor'), C(48), C(48)];

const CHORDS_CASTLE = [C(48, 'minor'), C(44), C(51), C(46), C(48, 'minor'), C(44), C(43), C(43), C(48, 'minor'), C(44), C(51), C(46), C(44), C(43), C(48, 'minor'), C(48, 'minor')];

export const BIOME_MUSIC: Record<Biome, BiomeSong> = {
  grasslands: buildSong({
    bpm: 168,
    leadWave: 'square',
    hook: 'g5 . e5 g5 . a5 . b5 | c6 . g5 . e5 g5 . .',
    resp: 'a5 . g5 . f5 e5 . d5 | e5 . d5 . c5 . . .',
    bridge: 'e5 . e5 . d5 . c5 . | d5 . d5 . c5 . b4 . | e5 g5 . c6 . b5 a5 g5 | a5 . f5 . g5 . . .',
    tail: 'c6 . a5 . g5 . e5 . | f5 . e5 . d5 . . . | c6 . g5 . e5 . c5 . | g4 . c5 e5 g5 . c6 .',
    chords: CHORDS_GRASSLANDS,
    bassRoots: CHORDS_GRASSLANDS.map((c) => c.root),
    bassPats: [BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_WALKUP, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_TURN],
  }),
  desert: buildSong({
    bpm: 152,
    leadWave: 'square',
    leadDouble: 'sub',
    hook: 'e5 . f5 . g#5 . a5 . | e6 . . . d5 c5 b4 .',
    resp: 'a5 . g#5 . f5 . g#5 . | e5 . . . b4 . e5 .',
    bridge: 'c5 . c5 . b4 . a4 . | b4 . b4 . a4 . g#4 . | a4/1 b4/1 c5/1 d5/1 e5/1 f5/1 g#5/1 a5/1 a5/4 .4 | a5 . . . e5 . . .',
    tail: 'e6 . c5 . b5 . a5 . | g#5 . f5 . e5 . d5 . | e5 . g#5 . b5 . e6 . | b5 . . . e5 . . .',
    chords: CHORDS_DESERT,
    bassRoots: CHORDS_DESERT.map((c) => c.root),
    bassPats: [BP_GROOVE, BP_SYNC, BP_GROOVE, BP_GROOVE, BP_SYNC, BP_SYNC, BP_GROOVE, BP_WALKUP, BP_GROOVE, BP_SYNC, BP_GROOVE, BP_GROOVE, BP_SYNC, BP_GROOVE, BP_GROOVE, BP_TURN],
  }),
  water: buildSong({
    bpm: 138,
    leadWave: 'triangle',
    hook: 'c5/4 e5/4 g5/4 f#5/4 | c6/4 a5/4 f#5/4 g5/4',
    resp: 'a5/4 g5/4 e5/4 d5/4 | c5/2 . g4/2 c5/2 . . . .',
    bridge: 'e5 . g5 . b5 . g5 . | a5 . f#5 . a5 . c6 . | b5 g5 e5 g5 d5 . . . | g4 . . . . . . .',
    tail: 'c6/4 b5/4 a5/4 g5/4 | f#5/4 e5/4 d5/4 e5/4 | c5/4 e5/4 g5/4 c6/4 | c6/8 . . . .',
    chords: CHORDS_WATER,
    bassRoots: CHORDS_WATER.map((c) => c.root),
    bassPats: [BP_PUMP, BP_PUMP, BP_SYNC, BP_PUMP, BP_SYNC, BP_SYNC, BP_SYNC, BP_PUMP, BP_PUMP, BP_PUMP, BP_SYNC, BP_PUMP, BP_PUMP, BP_SYNC, BP_PUMP, BP_TURN],
  }),
  'ice-snow': buildSong({
    bpm: 126,
    leadWave: 'sine',
    hook: 'e5/4 g5/4 c6/4 g5/4 | c6/4 a5/4 g5/4 e5/4',
    resp: 'f5/4 e5/4 d5/4 c5/4 | d5/4 .4 g4/4 c5/4',
    bridge: 'g5/4 e5/4 g5/4 .4 | a5/4 g5/4 e5/4 .4 | f5/4 e5/4 d5/4 .4 | e5/8 .4 .4',
    tail: 'c6/4 g5/4 e5/4 g5/4 | a5/4 f5/4 d5/4 .4 | g5/4 e5/4 c5/4 d5/4 | c5/8 .4 .4',
    chords: CHORDS_ICE,
    bassRoots: CHORDS_ICE.map((c) => c.root),
    bassPats: [BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_WALKUP, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_TURN],
    drumStd: DRUM_SNOW,
  }),
  'sky-clouds': buildSong({
    bpm: 158,
    leadWave: 'square',
    hook: 'c5 . f5 . a5 . c6 . | d6 . c6 . a5 . g5 .',
    resp: 'a5 . g5 . f5 . c5 . | d5 . e5 . f5 . . .',
    bridge: 'a5 . a5 . g5 . f5 . | g5 . g5 . f5 . e5 . | f5 a5 c6 . d6 . c6 . | a5 . g5 . f5 . . .',
    tail: 'f6 . d6 . c6 . a5 . | g5 . a5 . bb5 . a5 . | c6 . a5 . f5 . g5 . | f5/8 .4 .4',
    chords: CHORDS_SKY,
    bassRoots: CHORDS_SKY.map((c) => c.root),
    bassPats: [BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_SYNC, BP_SYNC, BP_GROOVE, BP_WALKUP, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_SYNC, BP_SYNC, BP_GROOVE, BP_TURN],
  }),
  forest: buildSong({
    bpm: 144,
    leadWave: 'triangle',
    hook: 'a4 . c5 . e5 . f5 . | a5 . e5 . c5 . b4 .',
    resp: 'g5 . e5 . c5 . a4 . | b4 . c5 . a4 . . .',
    bridge: 'c5 . d5 . e5 . c5 . | d5 . f5 . e5 . c5 . | e5 . f5 . g5 . e5 . | a4 . b4 . c5 . . .',
    tail: 'a5 . g5 . e5 . c5 . | d5 . e5 . f5 . d5 . | e5 . c5 . b4 . g4 . | e4 . a4 . c5 . e5 .',
    chords: CHORDS_FOREST,
    bassRoots: CHORDS_FOREST.map((c) => c.root),
    bassPats: [BP_GROOVE, BP_GROOVE, BP_PUMP, BP_GROOVE, BP_PUMP, BP_GROOVE, BP_GROOVE, BP_WALKUP, BP_GROOVE, BP_GROOVE, BP_PUMP, BP_GROOVE, BP_GROOVE, BP_PUMP, BP_GROOVE, BP_TURN],
  }),
  village: buildSong({
    bpm: 160,
    leadWave: 'square',
    hook: 'd5 . g5 . a5 . b5 . | d6 . b5 . g5 . d5 .',
    resp: 'e5 . d5 . c5 . b4 . | a4 . b4 . g4 . . .',
    bridge: 'b5 . b5 . a5 . g5 . | a5 . a5 . g5 . f#5 . | g5 b5 d6 . c6 . b5 . | a5 . f#5 . g5 . . .',
    tail: 'd6 . b5 . g5 . a5 . | b5 . a5 . g5 . f#5 . | g5 . a5 . b5 . d6 . | g5 . d5 . g5 . . .',
    chords: CHORDS_VILLAGE,
    bassRoots: CHORDS_VILLAGE.map((c) => c.root),
    bassPats: [BP_GROOVE, BP_GROOVE, BP_SYNC, BP_GROOVE, BP_SYNC, BP_SYNC, BP_GROOVE, BP_WALKUP, BP_GROOVE, BP_GROOVE, BP_SYNC, BP_GROOVE, BP_SYNC, BP_SYNC, BP_GROOVE, BP_TURN],
  }),
  'beach-island': buildSong({
    bpm: 172,
    leadWave: 'square',
    hook: 'e5 . e5 . g5 . a5 . | c6 . . a5 . g5 . e5',
    resp: 'f5 . e5 . d5 . c5 . | d5 . g4 . c5 . . .',
    bridge: 'g5 . g5 . a5 . g5 . | e5 . e5 . g5 . e5 . | a5 g5 e5 g5 a5 . c6 . | a5 . . . g5 . . .',
    tail: 'c6 . g5 . e5 . g5 . | a5 . f5 . g5 . e5 . | f5 . g5 . a5 . b5 . | c6 . g5 . e5 . c5 .',
    chords: CHORDS_BEACH,
    bassRoots: CHORDS_BEACH.map((c) => c.root),
    bassPats: [BP_PUMP, BP_PUMP, BP_SYNC, BP_PUMP, BP_SYNC, BP_SYNC, BP_PUMP, BP_WALKUP, BP_PUMP, BP_PUMP, BP_SYNC, BP_PUMP, BP_SYNC, BP_SYNC, BP_PUMP, BP_TURN],
  }),
  factory: buildSong({
    bpm: 174,
    leadWave: 'square',
    hook: 'e5 . e5 . g5 . e5 . | e6/4 .4 b5 . g5 .',
    resp: 'd5 . d5 . e5 . f#5 . | g5 . f#5 . e5 . . .',
    bridge: 'b4 . b4 . e5 . b4 . | c5 . c5 . e5 . c5 . | a4 . c5 . b4 . e5 . | b4 . . . . . . .',
    tail: 'e6 . d6 . b5 . g5 . | c6 . b5 . a5 . f#5 . | g5 . a5 . b5 . d6 . | e6 . b5 . g5 . e5 .',
    chords: CHORDS_FACTORY,
    bassRoots: CHORDS_FACTORY.map((c) => c.root),
    bassPats: [BP_DRIVE, BP_DRIVE, BP_DRIVE, BP_DRIVE, BP_DRIVE, BP_DRIVE, BP_DRIVE, BP_WALKUP, BP_DRIVE, BP_DRIVE, BP_DRIVE, BP_DRIVE, BP_DRIVE, BP_DRIVE, BP_DRIVE, BP_TURN],
  }),
  'volcano-lava': buildSong({
    bpm: 170,
    leadWave: 'sawtooth',
    hook: 'd5 . f5 . a5 . g5 . | d6 . a5 . f5 . d5 .',
    resp: 'e5 . f5 . e5 . d5 . | c#5 . d5 . a4 . . .',
    bridge: 'f5 . g5 . a5 . f5 . | g5 . a5 . bb5 . g5 . | a5 . g5 . f5 . e5 . | d5 . . . . . . .',
    tail: 'd6 . c#6 . a5 . f5 . | g5 . f5 . e5 . d5 . | f5 . g5 . a5 . c#6 . | d6 . a5 . d5 . . .',
    chords: CHORDS_VOLCANO,
    bassRoots: CHORDS_VOLCANO.map((c) => c.root),
    bassPats: [BP_DRIVE, BP_DRIVE, BP_SYNC, BP_GROOVE, BP_DRIVE, BP_SYNC, BP_GROOVE, BP_WALKUP, BP_DRIVE, BP_DRIVE, BP_SYNC, BP_GROOVE, BP_SYNC, BP_GROOVE, BP_GROOVE, BP_TURN],
  }),
  'haunted-mansion': buildSong({
    bpm: 120,
    leadWave: 'triangle',
    hook: 'g4 . bb4 . d5 . c#5 . | d5 . bb4 . g4 . f#4 .',
    resp: 'g4 . bb4 . a4 . g4 . | f#4 . g4 . d4 . . .',
    bridge: 'bb4 . b4 . c5 . a4 . | c5 . c#5 . d5 . bb4 . | d5 . eb5 . d5 . c#5 . | d4 . . . . . . .',
    tail: 'g5 . f#5 . f5 . d5 . | eb5 . d5 . c5 . bb4 . | a4 . bb4 . c5 . d5 . | g4 . d5 . g4 . . .',
    chords: CHORDS_HAUNTED,
    bassRoots: CHORDS_HAUNTED.map((c) => c.root),
    bassPats: [BP_GROOVE, BP_SPARSE, BP_GROOVE, BP_GROOVE, BP_GROOVE, BP_SPARSE, BP_GROOVE, BP_WALKUP, BP_GROOVE, BP_SPARSE, BP_GROOVE, BP_GROOVE, BP_SPARSE, BP_GROOVE, BP_GROOVE, BP_TURN],
  }),
  ruins: buildSong({
    bpm: 132,
    leadWave: 'square',
    hook: 'd5 . f5 . a5 . g5 . | d6 . b5 . a5 . f5 .',
    resp: 'e5 . d5 . c5 . a4 . | d5 . . . a4 . d5 .',
    bridge: 'a4 . c5 . e5 . g5 . | f5 . a5 . g5 . e5 . | d5 . e5 . f5 . g5 . | a4 . . . . . . .',
    tail: 'd6 . a5 . f5 . a5 . | g5 . e5 . c5 . e5 . | d5 . f5 . a5 . c6 . | b5 . a5 . d5 . . .',
    chords: CHORDS_RUINS,
    bassRoots: CHORDS_RUINS.map((c) => c.root),
    bassPats: [BP_GROOVE, BP_SYNC, BP_GROOVE, BP_GROOVE, BP_SYNC, BP_SYNC, BP_GROOVE, BP_WALKUP, BP_GROOVE, BP_SYNC, BP_GROOVE, BP_GROOVE, BP_SYNC, BP_SYNC, BP_GROOVE, BP_TURN],
  }),
  'canyon-base': buildSong({
    bpm: 148,
    leadWave: 'square',
    hook: 'e5 . a4 . c5 . e5 . | a5 . e5 . c5 . b4 .',
    resp: 'g5 . e5 . c5 . a4 . | b4 . c5 . a4 . . .',
    bridge: 'c5 . e5 . a5 . g5 . | a5 . e5 . c5 . e5 . | e5 . g5 . a5 . g5 . | e4 . . . . . . .',
    tail: 'a5 . e5 . c5 . a4 . | d5 . e5 . f5 . d5 . | e5 . a4 . c5 . e5 . | a4 . e5 . a5 . . .',
    chords: CHORDS_CANYON,
    bassRoots: CHORDS_CANYON.map((c) => c.root),
    bassPats: [BP_GROOVE, BP_GROOVE, BP_SYNC, BP_GROOVE, BP_SYNC, BP_SYNC, BP_GROOVE, BP_WALKUP, BP_GROOVE, BP_GROOVE, BP_SYNC, BP_GROOVE, BP_SYNC, BP_SYNC, BP_GROOVE, BP_TURN],
  }),
  'space-star': buildSong({
    bpm: 118,
    leadWave: 'sine',
    hook: 'c5/4 e5/4 g5/4 b5/4 | c6/4 b5/4 g5/4 e5/4',
    resp: 'a5/4 f#5/4 e5/4 d5/4 | e5/4 .4 g4/4 c5/4',
    bridge: 'g5/4 e5/4 a5/4 f#5/4 | b5/4 g5/4 e5/4 d5/4 | c6/4 a5/4 g5/4 e5/4 | g4/8 .4 .4',
    tail: 'c6/4 b5/4 g5/4 e5/4 | a5/4 f#5/4 d5/4 e5/4 | g5/4 e5/4 c5/4 d5/4 | c5/8 .4 .4',
    chords: CHORDS_SPACE,
    bassRoots: CHORDS_SPACE.map((c) => c.root),
    bassPats: [BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_WALKUP, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_SPARSE, BP_TURN],
    drumStd: DRUM_SPARSE,
  }),
  'castle-final': buildSong({
    bpm: 176,
    leadWave: 'square',
    leadDouble: 'oct',
    hook: 'c5 . c5 . eb5 . d5 . | c6 . . g5 . c5 . eb5',
    resp: 'f5 . eb5 . d5 . c5 . | d5 . g4 . c5 . . .',
    bridge: 'c5 . eb5 . g5 . ab5 . | g5 . g5 . f5 . eb5 . | d5 . f5 . ab5 . g5 . | g4 . . . . . . .',
    tail: 'c6 . ab5 . g5 . eb5 . | f5 . ab5 . g5 . f5 . | eb5 . g5 . c6 . d6 . | c6 . g5 . eb5 . c5 .',
    chords: CHORDS_CASTLE,
    bassRoots: CHORDS_CASTLE.map((c) => c.root),
    bassPats: [BP_DRIVE, BP_GROOVE, BP_GROOVE, BP_SYNC, BP_DRIVE, BP_GROOVE, BP_GROOVE, BP_WALKUP, BP_DRIVE, BP_GROOVE, BP_GROOVE, BP_SYNC, BP_GROOVE, BP_SYNC, BP_GROOVE, BP_TURN],
  }),
};
