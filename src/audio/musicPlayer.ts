import type { BiomeSong, Chord } from './biomeMusic';
import { midiToFreq } from './biomeMusic';

interface Voice {
  sources: (OscillatorNode | AudioBufferSourceNode)[];
  nodes: AudioNode[];
  end: number;
}

export function stepTime(bpm: number, step: number): number {
  return step * (60 / bpm / 4);
}

/** A deterministic noise source keeps percussion reproducible without changing the score. */
export function percussionNoise(length: number): Float32Array {
  const data = new Float32Array(length);
  let seed = 0x5eed1234;
  for (let i = 0; i < length; i++) {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    data[i] = (seed >>> 0) / 0x80000000 - 1;
  }
  return data;
}

export class MusicPlayer {
  private playing = false;
  private timer: number | undefined;
  private song: BiomeSong | null = null;
  private biome = '';
  private startTime = 0;
  private globalStep = 0;
  private stepDur = 0.1;
  private active: Voice[] = [];
  private noiseBuffer: AudioBuffer | null = null;
  private delay: DelayNode | null = null;
  private feedback: GainNode | null = null;
  private readonly scheduleAheadTime = 0.12;
  private readonly lookaheadMs = 25;

  constructor(private ctx: AudioContext, private master: GainNode) {}

  start(song: BiomeSong, biome: string): void {
    this.stop();
    this.song = song;
    this.biome = biome;
    this.stepDur = stepTime(song.bpm, 1);
    this.globalStep = 0;
    this.startTime = this.ctx.currentTime + 0.1;
    this.playing = true;
    this.delay = this.ctx.createDelay(1);
    // Dotted eighth-note echo follows the tempo instead of smearing every melody alike.
    this.delay.delayTime.setValueAtTime(this.stepDur * 3, this.ctx.currentTime);
    this.feedback = this.ctx.createGain();
    this.feedback.gain.setValueAtTime(0.16, this.ctx.currentTime);
    this.delay.connect(this.feedback);
    this.feedback.connect(this.delay);
    this.delay.connect(this.master);
    this.noiseBuffer = this.ctx.createBuffer(1, Math.floor(this.ctx.sampleRate * 0.2), this.ctx.sampleRate);
    this.noiseBuffer.getChannelData(0).set(percussionNoise(this.noiseBuffer.length));
    this.timer = window.setInterval(() => this.scheduler(), this.lookaheadMs);
    this.scheduler();
  }

  stop(): void {
    this.playing = false;
    if (this.timer !== undefined) window.clearInterval(this.timer);
    this.timer = undefined;
    for (const voice of this.active) this.disposeVoice(voice, true);
    this.active = [];
    // Break the feedback cycle too: disconnecting the delay output alone leaves a live graph.
    this.feedback?.disconnect();
    this.delay?.disconnect();
    this.feedback = null;
    this.delay = null;
    this.song = null;
    this.noiseBuffer = null;
  }

  getBiome(): string { return this.biome; }

  private disposeVoice(voice: Voice, stop: boolean): void {
    if (stop) {
      for (const source of voice.sources) {
        try { source.stop(this.ctx.currentTime); } catch { /* Already ended. */ }
      }
    }
    for (const node of voice.nodes) node.disconnect();
  }

  private scheduler(): void {
    if (!this.playing || !this.song) return;
    this.active = this.active.filter(voice => {
      if (voice.end > this.ctx.currentTime) return true;
      this.disposeVoice(voice, false);
      return false;
    });
    const song = this.song;
    while (this.startTime + this.globalStep * this.stepDur < this.ctx.currentTime + this.scheduleAheadTime) {
      const t = this.startTime + this.globalStep * this.stepDur;
      this.scheduleStep(song, this.globalStep % song.melody.length, t);
      this.globalStep++;
    }
  }

  private scheduleStep(song: BiomeSong, s: number, t: number): void {
    if (song.melody[s] > 0) this.playLead(midiToFreq(song.melody[s]), t, song.melodyDurations?.[s] || 2);
    if (song.bassline[s] > 0) this.playBass(midiToFreq(song.bassline[s]), t);
    const percussion = song.percussionGain ?? 0.6;
    if (percussion > 0) {
      if (song.drums[s] === 1) this.playKick(t, percussion);
      else if (song.drums[s] === 2) this.playHat(t, percussion);
      else if (song.drums[s] === 3) this.playSnare(t, percussion);
    }
    const chord = song.chords[Math.floor(s / 16) % song.chords.length];
    // One chord per bar, with release ending before the next chord starts.
    if (s % 16 === 0) this.playPad(chord, t);
    const spacing = song.arpEverySteps ?? 2;
    if (s % spacing === 0) {
      const third = chord.type === 'minor' ? 3 : 4;
      const notes = [chord.root + 12, chord.root + third + 12, chord.root + 19, chord.root + 24];
      this.playArp(midiToFreq(notes[Math.floor(s / spacing) % notes.length]), t);
    }
  }

  private voice(t: number, duration: number): Voice {
    const voice: Voice = { sources: [], nodes: [], end: t + duration };
    this.active.push(voice);
    return voice;
  }

  private own<T extends AudioNode>(voice: Voice, node: T): T {
    voice.nodes.push(node);
    return node;
  }

  private output(voice: Voice, position: number): StereoPannerNode {
    const pan = this.own(voice, this.ctx.createStereoPanner());
    pan.pan.setValueAtTime(position, this.ctx.currentTime);
    pan.connect(this.master);
    return pan;
  }

  private env(voice: Voice, t: number, peak: number, duration: number, attack = 0.006, sustain = false): GainNode {
    const gain = this.own(voice, this.ctx.createGain());
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(Math.max(0.0001, peak), t + Math.min(attack, duration * 0.2));
    if (sustain) {
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak * 0.7), t + duration * 0.7);
    }
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    return gain;
  }

  private tone(voice: Voice, type: OscillatorType, frequency: number, t: number, duration: number, destination: AudioNode): OscillatorNode {
    const osc = this.own(voice, this.ctx.createOscillator());
    voice.sources.push(osc);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, t);
    osc.connect(destination);
    osc.start(t);
    osc.stop(t + duration);
    return osc;
  }

  private playLead(frequency: number, t: number, steps: number): void {
    if (!this.song) return;
    const duration = Math.max(0.04, steps * this.stepDur * 0.92);
    const voice = this.voice(t, duration);
    const filter = this.own(voice, this.ctx.createBiquadFilter());
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(this.song.leadWave === 'square' ? 2400 : 3400, t);
    filter.Q.setValueAtTime(0.5, t);
    filter.connect(this.output(voice, 0.08));
    const env = this.env(voice, t, 0.075 * (this.song.leadGain ?? 1), duration, 0.012, true);
    env.connect(filter);
    if (this.delay) {
      const send = this.own(voice, this.ctx.createGain());
      send.gain.setValueAtTime(this.song.delaySend ?? 0.14, t);
      filter.connect(send);
      send.connect(this.delay);
    }
    const lead = this.tone(voice, this.song.leadWave, frequency, t, duration, env);
    // Gentle vibrato only on held notes, not on every short jumping motif.
    if (duration > 0.3) {
      const depth = this.own(voice, this.ctx.createGain());
      depth.gain.setValueAtTime(0, t);
      depth.gain.setValueAtTime(0, t + duration * 0.55);
      depth.gain.linearRampToValueAtTime(3, t + duration * 0.8);
      depth.connect(lead.detune);
      this.tone(voice, 'sine', 5, t, duration, depth);
    }
    if (this.song.leadDouble !== 'none') {
      const layer = this.own(voice, this.ctx.createGain());
      layer.gain.setValueAtTime(0.16, t);
      layer.connect(env);
      this.tone(voice, 'sine', frequency * (this.song.leadDouble === 'sub' ? 0.5 : 2), t, duration, layer);
    }
  }

  private playBass(frequency: number, t: number): void {
    const duration = this.stepDur * 1.65;
    const voice = this.voice(t, duration);
    const filter = this.own(voice, this.ctx.createBiquadFilter());
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, t);
    filter.connect(this.output(voice, -0.12));
    const env = this.env(voice, t, 0.045, duration);
    env.connect(filter);
    this.tone(voice, 'triangle', frequency, t, duration, env);
  }

  private playArp(frequency: number, t: number): void {
    const duration = this.stepDur * 1.4;
    const voice = this.voice(t, duration);
    const env = this.env(voice, t, 0.012, duration, 0.008);
    env.connect(this.output(voice, -0.25));
    this.tone(voice, 'triangle', frequency, t, duration, env);
  }

  private playPad(chord: Chord, t: number): void {
    const duration = this.stepDur * 15.8;
    const voice = this.voice(t, duration);
    const env = this.env(voice, t, 0.008 * (this.song?.padGain ?? 0.7), duration, 0.18, true);
    env.connect(this.output(voice, 0.3));
    const third = chord.type === 'minor' ? 3 : 4;
    for (const note of [chord.root + 12, chord.root + third + 12, chord.root + 19]) {
      this.tone(voice, 'sine', midiToFreq(note), t, duration, env);
    }
  }

  private playKick(t: number, level: number): void {
    const duration = 0.12;
    const voice = this.voice(t, duration);
    const env = this.env(voice, t, 0.065 * level, duration, 0.003);
    env.connect(this.output(voice, 0));
    const osc = this.tone(voice, 'sine', 130, t, duration, env);
    osc.frequency.exponentialRampToValueAtTime(45, t + duration);
  }

  private noise(voice: Voice, t: number, duration: number, destination: AudioNode): void {
    const source = this.own(voice, this.ctx.createBufferSource());
    voice.sources.push(source);
    source.buffer = this.noiseBuffer;
    source.connect(destination);
    source.start(t);
    source.stop(t + duration);
  }

  private playSnare(t: number, level: number): void {
    const duration = 0.085;
    const voice = this.voice(t, duration);
    const filter = this.own(voice, this.ctx.createBiquadFilter());
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1500, t);
    filter.Q.setValueAtTime(0.7, t);
    const env = this.env(voice, t, 0.038 * level, duration, 0.002);
    filter.connect(env);
    env.connect(this.output(voice, 0.12));
    this.noise(voice, t, duration, filter);
  }

  private playHat(t: number, level: number): void {
    const duration = 0.035;
    const voice = this.voice(t, duration);
    const filter = this.own(voice, this.ctx.createBiquadFilter());
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(6500, t);
    const env = this.env(voice, t, 0.012 * level, duration, 0.001);
    filter.connect(env);
    env.connect(this.output(voice, -0.15));
    this.noise(voice, t, duration, filter);
  }
}
