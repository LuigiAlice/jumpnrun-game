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
  /** Authored duration in sixteenth-note steps; zero on rests and continuations. */
  melodyDurations?: number[];
  arpEverySteps?: number;
  percussionGain?: number;
  leadGain?: number;
  padGain?: number;
  delaySend?: number;
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

interface Phrase { notes: number[]; durations: number[] }

// Note/rest lengths are retained: a quarter-note melody must not become a tiny beep.
function parseBar(src: string): Phrase {
  const notes: number[] = [];
  const durations: number[] = [];
  for (const token of src.trim().split(/\s+/)) {
    if (token.startsWith('.')) {
      const length = token.length > 1 ? Number(token.slice(1)) : 2;
      if (!Number.isInteger(length) || length < 1) throw new Error(`bad rest: ${token}`);
      notes.push(...Array(length).fill(0));
      durations.push(...Array(length).fill(0));
      continue;
    }
    const match = token.match(/^([a-g])([#b]?)(-?\d+)(?:\/(\d+))?$/);
    if (!match) throw new Error(`bad note: ${token}`);
    const accidental = match[2] === '#' ? 1 : match[2] === 'b' ? -1 : 0;
    const midi = 12 * (Number(match[3]) + 1) + NOTE_OFFSETS[match[1]] + accidental;
    const length = match[4] ? Number(match[4]) : 2;
    if (!Number.isInteger(length) || length < 1 || midi < 1 || midi > 127) throw new Error(`bad note: ${token}`);
    notes.push(midi, ...Array(length - 1).fill(0));
    durations.push(length, ...Array(length - 1).fill(0));
  }
  if (notes.length !== 16) throw new Error(`bar length ${notes.length}: ${src}`);
  return { notes, durations };
}

function seqBars(source: string): Phrase {
  const bars = source.split('|').map(bar => parseBar(bar.trim()));
  return { notes: bars.flatMap(bar => bar.notes), durations: bars.flatMap(bar => bar.durations) };
}

type BassPattern = number[];
// Offsets deliberately use roots/fifths/octaves: no chromatic walk-up against minor harmony.
const BOUNCE: BassPattern = [0,-1,-1,-1,7,-1,-1,-1,12,-1,-1,-1,7,-1,-1,-1];
const CALM: BassPattern = [0,-1,-1,-1,-1,-1,-1,-1,7,-1,-1,-1,-1,-1,-1,-1];
const DRIVE: BassPattern = [0,-1,0,-1,7,-1,-1,-1,0,-1,12,-1,7,-1,-1,-1];
const SWAY: BassPattern = [0,-1,-1,7,-1,-1,12,-1,0,-1,-1,7,-1,-1,12,-1];
const DRUM_LIGHT = [1,0,0,0,3,0,2,0,1,0,0,0,3,0,2,0];
const DRUM_CALM = [1,0,0,0,0,0,2,0,0,0,0,0,3,0,0,0];
const DRUM_DRIVE = [1,0,2,0,3,0,2,0,1,0,2,0,3,0,2,0];

interface SongSpec {
  bpm: number;
  leadWave: OscillatorType;
  hook: string;
  response: string;
  bridge: string;
  ending: string;
  chords: Chord[];
  bass: BassPattern;
  drums?: number[];
  arpEverySteps?: number;
  percussionGain?: number;
  delaySend?: number;
}

function buildSong(spec: SongSpec): BiomeSong {
  const hook = seqBars(spec.hook);
  const response = seqBars(spec.response);
  const bridge = seqBars(spec.bridge);
  const ending = seqBars(spec.ending);
  if (hook.notes.length !== 32 || response.notes.length !== 32 || bridge.notes.length !== 64 || ending.notes.length !== 64 || spec.chords.length !== 16) {
    throw new Error('song must have a 2+2+4+2+2+4 bar form');
  }
  const form = [hook, response, bridge, hook, response, ending];
  const drums = spec.drums || DRUM_LIGHT;
  return {
    bpm: spec.bpm, leadWave: spec.leadWave, leadDouble: 'none',
    melody: form.flatMap(phrase => phrase.notes),
    melodyDurations: form.flatMap(phrase => phrase.durations),
    chords: spec.chords,
    bassline: spec.chords.flatMap(chord => spec.bass.map(offset => offset < 0 ? 0 : chord.root + offset)),
    // Restrained fills at the phrase turn, rather than a constant snare roll.
    drums: spec.chords.flatMap((_, bar) => drums.map((hit, step) =>
      (bar === 7 || bar === 15) && step === 14 ? 2 : hit)),
    arpEverySteps: spec.arpEverySteps ?? 2,
    percussionGain: spec.percussionGain ?? 0.55,
    leadGain: 1.1,
    padGain: 0.8,
    delaySend: spec.delaySend ?? 0.12,
  };
}

function C(root: number, type: ChordType = 'major'): Chord { return { root, type }; }

// Entirely original themes. Each two-bar question returns in bars 9–10,
// with a contrasting middle and a cadence that leads naturally back into the loop.
export const BIOME_MUSIC: Record<Biome, BiomeSong> = {
  'grasslands': buildSong({
    bpm: 150, leadWave: 'triangle',
    hook: 'c5 e5 g5/4 e5 d5 e5/4 | b4 d5 g5/4 f5 d5 b4/4',
    response: 'a4 c5 e5/4 e5 c5 a4/4 | a4 c5 f5/4 e5 c5 a4/4',
    bridge: 'e5/4 g5 a5 g5/4 e5/4 | g5/4 e5 d5 e5/4 b4/4 | a4/4 c5 d5 f5/4 e5/4 | d5/4 b4 a4 g4/4 .4',
    ending: 'f5/4 a5 g5 f5/4 c5/4 | d5/4 g5 f5 d5/4 b4/4 | e5 g5 c6/4 b5 g5 e5/4 | d5/4 b4 a4 g4/4 .4',
    chords: [C(48), C(43), C(45, 'minor'), C(41), C(48), C(40, 'minor'), C(41), C(43), C(48), C(43), C(45, 'minor'), C(41), C(41), C(43), C(48), C(43)],
    bass: BOUNCE,
    drums: DRUM_LIGHT, arpEverySteps: 2, percussionGain: 0.5,
  }),
  'desert': buildSong({
    bpm: 136, leadWave: 'triangle',
    hook: 'd5/3 e5/1 f5/4 a5 g5 f5/4 | f5/3 g5/1 bb5/4 a5 f5 d5/4',
    response: 'g5/4 bb5 a5 g5/4 d5/4 | e5/3 f5/1 e5/4 c#5/4 .4',
    bridge: 'f5/4 a5/4 g5 f5 e5 d5 | e5/4 g5/4 e5 d5 c5/4 | d5/4 f5/4 bb5 a5 g5 f5 | e5/4 c#5/4 a4/4 .4',
    ending: 'f5/4 bb5/4 a5 f5 d5/4 | d5/4 g5/4 f5 d5 bb4/4 | f5 a5 d6/4 c6 a5 f5/4 | e5/4 c#5/4 a4/4 .4',
    chords: [C(50, 'minor'), C(46), C(43, 'minor'), C(45), C(50, 'minor'), C(48), C(46), C(45), C(50, 'minor'), C(46), C(43, 'minor'), C(45), C(46), C(43, 'minor'), C(50, 'minor'), C(45)],
    bass: SWAY,
    drums: DRUM_LIGHT, arpEverySteps: 2, percussionGain: 0.5,
  }),
  'water': buildSong({
    bpm: 112, leadWave: 'sine',
    hook: 'e5/6 g5/2 a5/4 g5/4 | e5/6 c5/2 a4/4 c5/4',
    response: 'f5/4 a5/4 g5/4 e5/4 | d5/4 b4/4 g4/4 .4',
    bridge: 'g5/4 b5/4 a5/4 g5/4 | a5/4 e5/4 c5/4 e5/4 | f5/6 g5/2 a5/4 f5/4 | d5/8 .4 b4/4',
    ending: 'a5/4 g5/4 f5/4 c5/4 | b4/4 d5/4 f5/4 d5/4 | e5/4 g5/4 e5/4 c5/4 | d5/8 b4/4 .4',
    chords: [C(48), C(45, 'minor'), C(41), C(43), C(40, 'minor'), C(45, 'minor'), C(41), C(43), C(48), C(45, 'minor'), C(41), C(43), C(41), C(43), C(48), C(43)],
    bass: CALM,
    drums: DRUM_CALM, arpEverySteps: 4, percussionGain: 0.28, delaySend: 0.23,
  }),
  'ice-snow': buildSong({
    bpm: 116, leadWave: 'sine',
    hook: 'f#5/4 a5/2 .2 d6/4 a5/4 | b5/4 a5/4 g5/6 .2',
    response: 'f#5/4 d5/4 b4/4 d5/4 | e5/4 c#5/4 a4/6 .2',
    bridge: 'g5/4 b5/4 a5/4 g5/4 | f#5/4 a5/4 d6/4 a5/4 | g5/4 e5/4 b4/4 e5/4 | e5/8 c#5/4 .4',
    ending: 'b5/4 a5/4 g5/4 d5/4 | c#5/4 e5/4 a5/4 g5/4 | f#5/4 e5/4 d5/6 .2 | e5/4 c#5/4 a4/4 .4',
    chords: [C(50), C(43), C(47, 'minor'), C(45), C(43), C(50), C(40, 'minor'), C(45), C(50), C(43), C(47, 'minor'), C(45), C(43), C(45), C(50), C(45)],
    bass: CALM,
    drums: DRUM_CALM, arpEverySteps: 4, percussionGain: 0.28, delaySend: 0.23,
  }),
  'sky-clouds': buildSong({
    bpm: 144, leadWave: 'triangle',
    hook: 'a5/4 c6 a5 g5 f5 a5/4 | g5/4 e5 g5 c6/4 g5/4',
    response: 'a5/4 f5 d5 f5 a5/4 .2 | f5/4 d5 f5 bb5/4 a5/4',
    bridge: 'bb5/4 a5 g5 f5/4 d5/4 | e5/4 g5 c6 bb5/4 g5/4 | a5/4 g5 f5 c5/4 f5/4 | e5/4 d5 c5 g4/4 .4',
    ending: 'bb5/4 a5 g5 f5/4 d5/4 | g5/4 e5 g5 bb5/4 g5/4 | a5/4 c6/4 a5/4 f5/4 | e5/4 g5/4 c5/4 .4',
    chords: [C(41), C(48), C(50, 'minor'), C(46), C(43, 'minor'), C(48), C(41), C(48), C(41), C(48), C(50, 'minor'), C(46), C(46), C(48), C(41), C(48)],
    bass: BOUNCE,
    drums: DRUM_LIGHT, arpEverySteps: 2, percussionGain: 0.5,
  }),
  'forest': buildSong({
    bpm: 126, leadWave: 'triangle',
    hook: 'a4/4 c5 e5 e5/4 d5 c5 | a4/4 c5 f5 e5/4 c5 a4',
    response: 'g4/4 c5 e5 g5/4 e5 d5 | b4/4 d5 g5 f5/4 d5 b4',
    bridge: 'f5/4 e5 d5 a4/4 d5/4 | e5/4 c5 b4 a4/4 c5/4 | c5/4 f5 e5 d5/4 c5/4 | b4/4 g#4 a4 b4/4 .4',
    ending: 'a4 c5 f5/4 e5/4 c5/4 | a4 d5 f5/4 e5/4 d5/4 | c5 e5 a5/4 g5 e5 c5/4 | b4/4 g#4/4 e4/4 .4',
    chords: [C(45, 'minor'), C(41), C(48), C(43), C(50, 'minor'), C(45, 'minor'), C(41), C(40), C(45, 'minor'), C(41), C(48), C(43), C(41), C(50, 'minor'), C(45, 'minor'), C(40)],
    bass: SWAY,
    drums: DRUM_LIGHT, arpEverySteps: 2, percussionGain: 0.5,
  }),
  'village': buildSong({
    bpm: 148, leadWave: 'triangle',
    hook: 'b4 d5 g5/4 g5 a5 b5/4 | a5 f#5 d5/4 e5 f#5 a5/4',
    response: 'g5/4 e5 d5 b4/4 g4/4 | e5/4 g5 e5 d5/4 c5/4',
    bridge: 'c5/4 e5 a5 g5/4 e5/4 | f#5/4 a5 f#5 e5/4 d5/4 | g5/4 b5 a5 g5/4 d5/4 | f#5/4 e5 d5 a4/4 .4',
    ending: 'g5/4 e5 d5 c5/4 e5/4 | f#5/4 a5 g5 f#5/4 d5/4 | b4 d5 g5/4 a5 g5 d5/4 | f#5/4 e5/4 d5/4 .4',
    chords: [C(43), C(50), C(40, 'minor'), C(48), C(45, 'minor'), C(50), C(43), C(50), C(43), C(50), C(40, 'minor'), C(48), C(48), C(50), C(43), C(50)],
    bass: BOUNCE,
    drums: DRUM_LIGHT, arpEverySteps: 2, percussionGain: 0.5,
  }),
  'beach-island': buildSong({
    bpm: 146, leadWave: 'triangle',
    hook: 'e5/3 g5/1 a5/4 g5 e5 d5/4 | f5/3 a5/1 g5/4 f5 e5 c5/4',
    response: 'd5/3 g5/1 b5/4 a5 g5 d5/4 | e5/4 g5/4 c5/4 .4',
    bridge: 'e5/4 a5 g5 e5/4 c5/4 | f5/4 a5 g5 f5/4 c5/4 | d5/4 f5 a5 g5/4 f5/4 | d5/4 b4 a4 g4/4 .4',
    ending: 'a5/3 c6/1 a5/4 g5 f5 e5/4 | g5/3 b5/1 a5/4 g5 f5 d5/4 | e5/4 g5/4 e5/4 c5/4 | b4/4 d5/4 g4/4 .4',
    chords: [C(48), C(41), C(43), C(48), C(45, 'minor'), C(41), C(50, 'minor'), C(43), C(48), C(41), C(43), C(48), C(41), C(43), C(48), C(43)],
    bass: SWAY,
    drums: DRUM_LIGHT, arpEverySteps: 2, percussionGain: 0.5,
  }),
  'factory': buildSong({
    bpm: 158, leadWave: 'triangle',
    hook: 'e5 b4 e5 g5 b5/4 g5/4 | g5 e5 c5 e5 g5/4 e5/4',
    response: 'd5 b4 d5 g5 a5/4 g5/4 | f#5 e5 d5 a4 d5/4 .4',
    bridge: 'g5/4 e5 g5 b5/4 a5/4 | g5/4 e5 g5 c6/4 b5/4 | a5/4 e5 c5 e5/4 c5/4 | f#5/4 d#5 c#5 b4/4 .4',
    ending: 'e5 g5 c6/4 b5/4 g5/4 | f#5 a5 f#5/4 d#5/4 b4/4 | g5 e5 b4/4 e5/4 g5/4 | f#5/4 d#5/4 b4/4 .4',
    chords: [C(40, 'minor'), C(48), C(43), C(50), C(40, 'minor'), C(48), C(45, 'minor'), C(47), C(40, 'minor'), C(48), C(43), C(50), C(48), C(47), C(40, 'minor'), C(47)],
    bass: DRIVE,
    drums: DRUM_DRIVE, arpEverySteps: 2, percussionGain: 0.7, delaySend: 0.08,
  }),
  'volcano-lava': buildSong({
    bpm: 154, leadWave: 'triangle',
    hook: 'd5/4 f5 a5 a5/4 g5 f5 | f5/4 bb5 a5 f5/4 d5/4',
    response: 'g5/4 bb5 a5 g5/4 d5/4 | e5/4 c#5 e5 a5/4 .4',
    bridge: 'a5/4 g5 f5 d5/4 f5/4 | g5/4 e5 d5 c5/4 e5/4 | bb5/4 a5 g5 d5/4 g5/4 | a5/4 e5 c#5 a4/4 .4',
    ending: 'bb5/4 a5 f5 d5/4 f5/4 | bb5/4 a5 g5 d5/4 bb4/4 | a5/4 f5 e5 d5/4 f5/4 | e5/4 c#5/4 a4/4 .4',
    chords: [C(50, 'minor'), C(46), C(43, 'minor'), C(45), C(50, 'minor'), C(48), C(43, 'minor'), C(45), C(50, 'minor'), C(46), C(43, 'minor'), C(45), C(46), C(43, 'minor'), C(50, 'minor'), C(45)],
    bass: DRIVE,
    drums: DRUM_DRIVE, arpEverySteps: 2, percussionGain: 0.7, delaySend: 0.08,
  }),
  'haunted-mansion': buildSong({
    bpm: 114, leadWave: 'triangle',
    hook: 'bb4/6 d5/2 g5/4 f5/4 | g5/6 f5/2 eb5/4 bb4/4',
    response: 'eb5/4 g5/4 f5/4 eb5/4 | f#5/4 d5/4 a4/4 .4',
    bridge: 'd5/4 bb4/4 g4/4 bb4/4 | eb5/4 g5/4 bb5/4 g5/4 | g5/4 eb5/4 c5/4 eb5/4 | f#5/8 d5/4 .4',
    ending: 'g5/4 f5/4 eb5/4 bb4/4 | eb5/4 d5/4 c5/4 g4/4 | bb4/4 d5/4 g5/4 d5/4 | f#5/8 a4/4 .4',
    chords: [C(43, 'minor'), C(51), C(48, 'minor'), C(50), C(43, 'minor'), C(51), C(48, 'minor'), C(50), C(43, 'minor'), C(51), C(48, 'minor'), C(50), C(51), C(48, 'minor'), C(43, 'minor'), C(50)],
    bass: CALM,
    drums: DRUM_CALM, arpEverySteps: 4, percussionGain: 0.28, delaySend: 0.23,
  }),
  'ruins': buildSong({
    bpm: 124, leadWave: 'triangle',
    hook: 'f5/4 a5/4 g5 f5 e5 d5 | f5/4 bb5/4 a5/4 f5/4',
    response: 'e5/4 g5/4 e5 d5 c5/4 | c5/4 e5/4 a4/4 .4',
    bridge: 'd5/4 g5/4 bb5/4 a5/4 | a5/4 f5/4 e5/4 d5/4 | f5/4 d5/4 bb4/4 d5/4 | e5/8 c#5/4 .4',
    ending: 'bb5/4 a5/4 g5/4 d5/4 | f5/4 d5/4 bb4/4 f5/4 | a5/4 f5/4 e5/4 d5/4 | e5/4 c#5/4 a4/4 .4',
    chords: [C(50, 'minor'), C(46), C(48), C(45, 'minor'), C(43, 'minor'), C(50, 'minor'), C(46), C(45), C(50, 'minor'), C(46), C(48), C(45, 'minor'), C(43, 'minor'), C(46), C(50, 'minor'), C(45)],
    bass: CALM,
    drums: DRUM_LIGHT, arpEverySteps: 2, percussionGain: 0.5,
  }),
  'canyon-base': buildSong({
    bpm: 140, leadWave: 'triangle',
    hook: 'e5/4 a5/4 g5 e5 c5/4 | f5/4 a5/4 g5 f5 c5/4',
    response: 'e5/4 g5/4 c6 b5 g5/4 | d5/4 b4/4 g4/4 .4',
    bridge: 'a5/4 f5 e5 d5/4 f5/4 | a5/4 g5 f5 c5/4 f5/4 | e5/4 c5 b4 a4/4 c5/4 | b4/4 g#4 a4 b4/4 .4',
    ending: 'f5/4 a5/4 g5/4 c5/4 | d5/4 g5/4 f5/4 d5/4 | e5 a5 c6/4 b5 a5 e5/4 | b4/4 g#4/4 e4/4 .4',
    chords: [C(45, 'minor'), C(41), C(48), C(43), C(50, 'minor'), C(41), C(45, 'minor'), C(40), C(45, 'minor'), C(41), C(48), C(43), C(41), C(43), C(45, 'minor'), C(40)],
    bass: BOUNCE,
    drums: DRUM_LIGHT, arpEverySteps: 2, percussionGain: 0.5,
  }),
  'space-star': buildSong({
    bpm: 110, leadWave: 'sine',
    hook: 'g5/6 e5/2 c5/4 e5/4 | b5/6 g5/2 e5/4 g5/4',
    response: 'a5/4 e5/4 c5/4 e5/4 | a5/4 g5/4 f5/6 .2',
    bridge: 'f5/4 a5/4 c6/4 a5/4 | b5/4 a5/4 g5/4 d5/4 | g5/4 e5/4 b4/4 e5/4 | d5/8 b4/4 .4',
    ending: 'a5/4 f5/4 d5/4 f5/4 | g5/4 d5/4 b4/4 d5/4 | e5/4 g5/4 c6/4 g5/4 | d5/8 b4/4 .4',
    chords: [C(48), C(40, 'minor'), C(45, 'minor'), C(41), C(50, 'minor'), C(43), C(40, 'minor'), C(43), C(48), C(40, 'minor'), C(45, 'minor'), C(41), C(50, 'minor'), C(43), C(48), C(43)],
    bass: CALM,
    drums: DRUM_CALM, arpEverySteps: 4, percussionGain: 0.28, delaySend: 0.23,
  }),
  'castle-final': buildSong({
    bpm: 164, leadWave: 'square',
    hook: 'c5 eb5 g5/4 g5 ab5 g5/4 | ab5 g5 eb5/4 c5 eb5 ab5/4',
    response: 'g5 bb5 g5/4 eb5 f5 g5/4 | f5 d5 bb4/4 c5 d5 f5/4',
    bridge: 'ab5/4 g5 f5 c5/4 f5/4 | g5/4 eb5 d5 c5/4 eb5/4 | ab5/4 g5 eb5 c5/4 eb5/4 | d5/4 b4 a4 g4/4 .4',
    ending: 'ab5/4 c6/4 ab5/4 f5/4 | ab5/4 g5 eb5 c5/4 eb5/4 | g5 eb5 c5/4 d5 eb5 g5/4 | d5/4 b4/4 g4/4 .4',
    chords: [C(48, 'minor'), C(44), C(51), C(46), C(41, 'minor'), C(48, 'minor'), C(44), C(43), C(48, 'minor'), C(44), C(51), C(46), C(41, 'minor'), C(44), C(48, 'minor'), C(43)],
    bass: DRIVE,
    drums: DRUM_DRIVE, arpEverySteps: 2, percussionGain: 0.7, delaySend: 0.08,
  }),
};
