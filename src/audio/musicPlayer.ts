import type { BiomeSong } from './biomeMusic';
import { midiToFreq } from './biomeMusic';

interface ActiveNode {
  osc: OscillatorNode | AudioBufferSourceNode;
  gain: GainNode;
  end: number;
}

export function stepTime(bpm: number, step: number): number {
  return step * (60 / bpm / 4);
}

const LEAD_GAIN = 0.06;
const BASS_GAIN = 0.05;
const ARP_GAIN = 0.02;
const KICK_GAIN = 0.07;
const SNARE_GAIN = 0.05;
const HAT_GAIN = 0.02;

export class MusicPlayer {
  private playing: boolean = false;
  private timer: number | undefined;
  private song: BiomeSong | null = null;
  private biome: string = '';
  private startTime: number = 0;
  private globalStep: number = 0;
  private stepDur: number = 0.1;
  private active: ActiveNode[] = [];
  private noiseBuffer: AudioBuffer | null = null;
  private delay: DelayNode | null = null;
  private scheduleAheadTime: number = 0.12;
  private lookaheadMs: number = 25;

  constructor(private ctx: AudioContext, private master: GainNode) {}

  start(song: BiomeSong, biome: string): void {
    this.stop();
    this.song = song;
    this.biome = biome;
    this.stepDur = 60 / song.bpm / 4;
    this.globalStep = 0;
    this.startTime = this.ctx.currentTime + 0.1;
    this.playing = true;
    this.delay = this.ctx.createDelay(0.5);
    this.delay.delayTime.setValueAtTime(0.18, this.ctx.currentTime);
    const fb = this.ctx.createGain();
    fb.gain.setValueAtTime(0.2, this.ctx.currentTime);
    this.delay.connect(fb);
    fb.connect(this.delay);
    this.delay.connect(this.master);
    this.noiseBuffer = this.createNoiseBuffer();
    this.timer = window.setInterval(() => this.scheduler(), this.lookaheadMs);
    this.scheduler();
  }

  stop(): void {
    this.playing = false;
    if (this.timer !== undefined) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
    const t = this.ctx.currentTime;
    for (const node of this.active) {
      try {
        node.gain.gain.cancelScheduledValues(t);
        node.gain.gain.setValueAtTime(0, t);
        node.osc.stop(t);
      } catch {}
    }
    this.active = [];
    this.song = null;
    this.delay = null;
    this.noiseBuffer = null;
  }

  getBiome(): string {
    return this.biome;
  }

  private scheduler(): void {
    if (!this.playing || !this.song) return;
    const song = this.song;
    const total = song.melody.length;
    while (this.startTime + this.globalStep * this.stepDur < this.ctx.currentTime + this.scheduleAheadTime) {
      const t = this.startTime + this.globalStep * this.stepDur;
      const s = this.globalStep % total;
      this.scheduleStep(song, s, t);
      this.globalStep++;
    }
  }

  private scheduleStep(song: BiomeSong, s: number, t: number): void {
    const m = song.melody[s];
    if (m > 0) this.playLead(midiToFreq(m), t);
    const b = song.bassline[s];
    if (b > 0) this.playBass(midiToFreq(b), t);
    const d = song.drums[s];
    if (d === 1) this.playKick(t);
    else if (d === 2) this.playHat(t);
    else if (d === 3) this.playSnare(t);
    const chord = song.chords[Math.floor(s / 16) % song.chords.length];
    const fifth = midiToFreq(chord.root + 7);
    const octave = midiToFreq(chord.root + 12);
    if (s % 4 === 0) this.playPad(chord, t);
    const arpPattern = [chord.root, chord.root + 7, chord.root + 12, chord.root + 7];
    this.playArp(midiToFreq(arpPattern[s % 4]), t);
  }

  private createNoiseBuffer(): AudioBuffer {
    const size = Math.floor(this.ctx.sampleRate * 0.2);
    const buf = this.ctx.createBuffer(1, size, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  private track(osc: OscillatorNode | AudioBufferSourceNode, gain: GainNode, end: number): void {
    const now = this.ctx.currentTime;
    this.active = this.active.filter((n) => n.end > now);
    this.active.push({ osc, gain, end });
  }

  private makeEnv(t: number, peak: number, dur: number, attack: number = 0.005): GainNode {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    return g;
  }

  private pan(value: number): StereoPannerNode {
    const p = this.ctx.createStereoPanner();
    p.pan.setValueAtTime(value, this.ctx.currentTime);
    p.connect(this.master);
    return p;
  }

  private playLead(midiNoteHz: number, t: number): void {
    if (!this.song) return;
    const dur = this.stepDur * 1.7;
    const pan = this.pan(0.25);
    const env = this.makeEnv(t, LEAD_GAIN, dur);
    env.connect(pan);
    if (this.delay) {
      const send = this.ctx.createGain();
      send.gain.setValueAtTime(0.35, t);
      env.connect(send);
      send.connect(this.delay);
    }
    const osc = this.ctx.createOscillator();
    osc.type = this.song.leadWave;
    osc.frequency.setValueAtTime(midiNoteHz, t);
    osc.connect(env);
    const osc2 = this.ctx.createOscillator();
    osc2.type = this.song.leadWave;
    osc2.frequency.setValueAtTime(midiNoteHz, t);
    osc2.detune.setValueAtTime(6, t);
    const g2 = this.ctx.createGain();
    g2.gain.setValueAtTime(0.6, t);
    osc2.connect(g2);
    g2.connect(env);
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(5.5, t);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0, t);
    lfoGain.gain.setValueAtTime(0, t + dur * 0.6);
    lfoGain.gain.linearRampToValueAtTime(midiNoteHz * 0.008, t + dur);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfoGain.connect(osc2.frequency);
    osc.start(t);
    osc2.start(t);
    lfo.start(t);
    osc.stop(t + dur + 0.05);
    osc2.stop(t + dur + 0.05);
    lfo.stop(t + dur + 0.05);
    this.track(osc, env, t + dur + 0.05);
    this.track(osc2, env, t + dur + 0.05);
    if (this.song.leadDouble === 'sub') this.playLeadDouble(midiNoteHz / 2, t, dur, pan);
    if (this.song.leadDouble === 'oct') this.playLeadDouble(midiNoteHz * 2, t, dur, pan);
  }

  private playLeadDouble(freq: number, t: number, dur: number, pan: StereoPannerNode): void {
    const osc = this.ctx.createOscillator();
    osc.type = this.song ? this.song.leadWave : 'square';
    osc.frequency.setValueAtTime(freq, t);
    const env = this.makeEnv(t, LEAD_GAIN * 0.45, dur);
    env.connect(pan);
    osc.connect(env);
    osc.start(t);
    osc.stop(t + dur + 0.05);
    this.track(osc, env, t + dur + 0.05);
  }

  private playBass(midiNoteHz: number, t: number): void {
    const dur = this.stepDur * 0.9;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, t);
    filter.connect(this.pan(-0.15));
    const env = this.makeEnv(t, BASS_GAIN, dur, 0.003);
    env.connect(filter);
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(midiNoteHz, t);
    osc.connect(env);
    const sub = this.ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(midiNoteHz / 2, t);
    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.5, t);
    sub.connect(subGain);
    subGain.connect(env);
    osc.start(t);
    sub.start(t);
    osc.stop(t + dur + 0.05);
    sub.stop(t + dur + 0.05);
    this.track(osc, env, t + dur + 0.05);
    this.track(sub, env, t + dur + 0.05);
  }

  private playArp(midiNoteHz: number, t: number): void {
    const dur = this.stepDur * 0.85;
    const env = this.makeEnv(t, ARP_GAIN, dur, 0.002);
    env.connect(this.pan(-0.1));
    const osc = this.ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(midiNoteHz, t);
    osc.connect(env);
    osc.start(t);
    osc.stop(t + dur + 0.05);
    this.track(osc, env, t + dur + 0.05);
  }

  private playPad(chord: { root: number; type: 'major' | 'minor' }, t: number): void {
    const dur = this.stepDur * 16;
    const env = this.makeEnv(t, 0.012, dur, 0.4);
    env.connect(this.pan(0.4));
    const third = chord.type === 'minor' ? 3 : 4;
    const freqs = [chord.root, chord.root + third, chord.root + 7, chord.root + 12];
    const oscs: OscillatorNode[] = [];
    for (const semis of freqs) {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(midiToFreq(semis), t);
      osc.connect(env);
      osc.start(t);
      osc.stop(t + dur + 0.1);
      oscs.push(osc);
    }
    for (const osc of oscs) this.track(osc, env, t + dur + 0.1);
  }

  private playKick(t: number): void {
    const dur = 0.09;
    const env = this.makeEnv(t, KICK_GAIN, dur, 0.002);
    env.connect(this.pan(0));
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + dur);
    osc.connect(env);
    osc.start(t);
    osc.stop(t + dur + 0.05);
    this.track(osc, env, t + dur + 0.05);
    const clickEnv = this.makeEnv(t, KICK_GAIN * 0.4, 0.02, 0.001);
    clickEnv.connect(this.pan(0));
    const click = this.ctx.createOscillator();
    click.type = 'square';
    click.frequency.setValueAtTime(1000, t);
    click.connect(clickEnv);
    click.start(t);
    click.stop(t + 0.03);
    this.track(click, clickEnv, t + 0.03);
  }

  private playSnare(t: number): void {
    const dur = 0.12;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(1800, t);
    bp.Q.setValueAtTime(1.2, t);
    const env = this.makeEnv(t, SNARE_GAIN, dur, 0.002);
    noise.connect(bp);
    bp.connect(env);
    env.connect(this.pan(0.1));
    noise.start(t);
    noise.stop(t + dur + 0.05);
    this.track(noise, env, t + dur + 0.05);
    const bodyEnv = this.makeEnv(t, SNARE_GAIN * 0.5, 0.08, 0.002);
    bodyEnv.connect(this.pan(0.1));
    const body = this.ctx.createOscillator();
    body.type = 'triangle';
    body.frequency.setValueAtTime(200, t);
    body.connect(bodyEnv);
    body.start(t);
    body.stop(t + 0.1);
    this.track(body, bodyEnv, t + 0.1);
  }

  private playHat(t: number): void {
    const dur = 0.03;
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(7000, t);
    const env = this.makeEnv(t, HAT_GAIN, dur, 0.001);
    noise.connect(hp);
    hp.connect(env);
    env.connect(this.pan(-0.05));
    noise.start(t);
    noise.stop(t + dur + 0.02);
    this.track(noise, env, t + dur + 0.02);
  }
}
