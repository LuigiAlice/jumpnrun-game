import { afterEach, describe, expect, it, vi } from 'vitest';
import { MusicPlayer, percussionNoise } from '../src/audio/musicPlayer';
import type { BiomeSong } from '../src/audio/biomeMusic';

function audioMock() {
  const nodes: any[] = [];
  const param = () => ({ setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() });
  const node = (kind: string) => {
    const n = { kind, connect: vi.fn(), disconnect: vi.fn(), start: vi.fn(), stop: vi.fn(),
      frequency: param(), detune: param(), gain: param(), pan: param(), Q: param(), delayTime: param(), type: 'sine', buffer: null };
    nodes.push(n);
    return n;
  };
  const context = { currentTime: 0, sampleRate: 48000,
    createOscillator: () => node('oscillator'), createBufferSource: () => node('noise'),
    createGain: () => node('gain'), createBiquadFilter: () => node('filter'),
    createStereoPanner: () => node('pan'), createDelay: () => node('delay'),
    createBuffer: (_channels: number, length: number) => {
      const data = new Float32Array(length);
      return { length, getChannelData: () => data };
    },
  };
  const master = node('master');
  return { nodes, context, player: new MusicPlayer(context as unknown as AudioContext, master as unknown as GainNode) };
}

const song = (overrides: Partial<BiomeSong> = {}): BiomeSong => ({
  bpm: 150, leadWave: 'triangle', leadDouble: 'none',
  melody: Array(32).fill(0), melodyDurations: Array(32).fill(0),
  bassline: Array(32).fill(0), drums: Array(32).fill(0),
  chords: [{ root: 48, type: 'major' }, { root: 45, type: 'minor' }],
  ...overrides,
});

afterEach(() => vi.useRealTimers());

describe('MusicPlayer arrangement and lifecycle', () => {
  it('plays authored long notes with sustain and a tempo-synchronised echo', () => {
    vi.useFakeTimers();
    const { player, nodes } = audioMock();
    const melody = Array(32).fill(0); melody[0] = 72;
    const durations = Array(32).fill(0); durations[0] = 8;
    player.start(song({ melody, melodyDurations: durations }), 'water');
    const lead = nodes.find(n => n.kind === 'oscillator' && n.frequency.setValueAtTime.mock.calls.some((c: number[]) => Math.abs(c[0] - 523.251) < 0.01));
    expect(lead.stop).toHaveBeenCalledWith(expect.closeTo(0.1 + 0.8 * 0.92, 6));
    const delay = nodes.find(n => n.kind === 'delay');
    expect(delay.delayTime.setValueAtTime).toHaveBeenCalledWith(expect.closeTo(0.3, 6), 0);
    player.stop();
  });

  it('schedules one pad per bar, lighter arpeggios and the correct minor third', () => {
    const { player } = audioMock();
    const p = player as any;
    p.song = song({ arpEverySteps: 4 });
    const pad = vi.spyOn(p, 'playPad').mockImplementation(() => {});
    const arp = vi.spyOn(p, 'playArp').mockImplementation(() => {});
    for (let step = 0; step < 32; step++) p.scheduleStep(p.song, step, step * 0.1);
    expect(pad).toHaveBeenCalledTimes(2);
    expect(arp).toHaveBeenCalledTimes(8);
    // A-minor second arpeggio tone is C, not C-sharp.
    expect(arp.mock.calls[5][0]).toBeCloseTo(261.625565, 5);
  });

  it('ends chord pads before the next bar begins', () => {
    vi.useFakeTimers();
    const { player, nodes } = audioMock();
    player.start(song(), 'grasslands');
    const p = player as any;
    const padVoices = p.active.filter((voice: any) => voice.sources.length === 3);
    expect(padVoices).toHaveLength(1);
    expect(padVoices[0].end).toBeLessThan(0.1 + 1.6);
    expect(nodes.filter(n => n.kind === 'oscillator')).toHaveLength(4); // Three pad voices, one quiet arp.
    player.stop();
  });

  it('disconnects completed voices and stops all sources and feedback on shutdown', () => {
    vi.useFakeTimers();
    const { player, context, nodes } = audioMock();
    const melody = Array(32).fill(0); melody[0] = 72;
    const durations = Array(32).fill(0); durations[0] = 8;
    player.start(song({ melody, melodyDurations: durations }), 'space-star');
    // Pad and arp share C4: identify the short arp voice rather than the held pad.
    const earlyArp = (player as any).active.find((voice: any) => voice.sources.length === 1 && voice.end < 0.3).sources[0];
    context.currentTime = 0.3;
    (player as any).scheduler();
    expect(earlyArp.disconnect).toHaveBeenCalled();
    const liveSources = nodes.filter(n => n.kind === 'oscillator' || n.kind === 'noise');
    player.stop();
    expect(liveSources.every(n => n.stop.mock.calls.length >= 1)).toBe(true);
    expect(nodes.filter(n => n.kind !== 'master').every(n => n.disconnect.mock.calls.length >= 1)).toBe(true);
    const count = nodes.length;
    vi.advanceTimersByTime(200);
    expect(nodes).toHaveLength(count);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('restarts with one scheduler and the new biome', () => {
    vi.useFakeTimers();
    const { player } = audioMock();
    player.start(song(), 'water');
    player.start(song(), 'castle-final');
    expect(player.getBiome()).toBe('castle-final');
    expect(vi.getTimerCount()).toBe(1);
    player.stop();
  });

  it('creates bounded, repeatable non-silent percussion noise', () => {
    const first = percussionNoise(1024);
    expect(first).toEqual(percussionNoise(1024));
    expect(first.some(value => Math.abs(value) > 0.5)).toBe(true);
    expect(first.every(value => value >= -1 && value <= 1)).toBe(true);
  });
});
