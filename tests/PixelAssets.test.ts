import { describe, expect, it, vi } from 'vitest';

type Shape = { kind: string; color: number; bounds: number[]; args: unknown[] };
function recorder() {
  const assets = new Map<string, { size: number[]; shapes: Shape[] }>();
  let shapes: Shape[] = [], color = 0, stroke = 0;
  const add = (kind: string, bounds: number[], args: unknown[]) => shapes.push({ kind, color, bounds, args });
  const graphics = {
    clear: () => { shapes = []; }, fillStyle: (c: number) => { color = c; },
    fillRect: (x: number, y: number, w: number, h: number) => add('rect', [x,y,w,h], [x,y,w,h]),
    fillRoundedRect: (x: number, y: number, w: number, h: number, radius: number) => add('round', [x,y,w,h], [x,y,w,h,radius]),
    fillEllipse: (x: number, y: number, w: number, h: number) => add('ellipse', [x-w/2,y-h/2,w,h], [x,y,w,h]),
    fillTriangle: (...v: number[]) => { const xs=[v[0],v[2],v[4]], ys=[v[1],v[3],v[5]]; add('triangle',[Math.min(...xs),Math.min(...ys),Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys)],v); },
    fillPoints: (points: {x:number;y:number}[]) => { const xs=points.map(p=>p.x),ys=points.map(p=>p.y); add('polygon',[Math.min(...xs),Math.min(...ys),Math.max(...xs)-Math.min(...xs),Math.max(...ys)-Math.min(...ys)],points); },
    lineStyle: (width: number, c: number) => { stroke=width;color=c; },
    strokeEllipse: (x: number,y: number,w: number,h: number) => add('ring',[x-(w+stroke)/2,y-(h+stroke)/2,w+stroke,h+stroke],[x,y,w,h,stroke]),
    generateTexture: (key: string,w: number,h: number) => assets.set(key,{size:[w,h],shapes:shapes.map(s=>({...s}))}), destroy: vi.fn(),
  };
  return { assets, graphics, scene: {add:{graphics:()=>graphics},textures:{exists:()=>false,remove:vi.fn()}} };
}
function assertBounded(assets: ReturnType<typeof recorder>['assets']) {
  for (const [key,{size:[width,height],shapes}] of assets) {
    expect(shapes.length,key).toBeGreaterThan(0);
    for (const {bounds:[x,y,w,h]} of shapes) {
      expect([x,y,w,h].every(Number.isFinite),key).toBe(true);
      expect(x,key).toBeGreaterThanOrEqual(-0.001); expect(y,key).toBeGreaterThanOrEqual(-0.001);
      expect(w,key).toBeGreaterThan(0); expect(h,key).toBeGreaterThan(0);
      expect(x+w,key).toBeLessThanOrEqual(width+0.001); expect(y+h,key).toBeLessThanOrEqual(height+0.001);
    }
  }
}
import { ANIMATED_ENEMY_TEXTURES, createPixelBlocks, createPixelCoins, createPixelEnemies, createPixelItems } from '../src/art/pixelAssets';
function generateAssets() {
  const capture=recorder();
  for(const generate of [createPixelEnemies,createPixelCoins,createPixelBlocks,createPixelItems]) generate(capture.scene as any);
  return capture.assets;
}
describe('Generated storybook assets', () => {
  it('generates actual animation frames at identical collision-safe sizes', () => {
    const assets=generateAssets();
    for(const [enemy,size] of Object.entries(ANIMATED_ENEMY_TEXTURES)) {
      for(const suffix of ['', '_walk1', '_walk2']) expect(assets.get(enemy+suffix)?.size).toEqual(size);
      expect(assets.get(enemy+'_walk1')?.shapes).not.toEqual(assets.get(enemy+'_walk2')?.shapes);
    }
    expect(assets.get('koopa_shell')?.size).toEqual(assets.get('koopa')?.size);
    expect(assets.get('koopa_shell')?.shapes.every(s=>s.bounds[1]>=18)).toBe(true);
    for(const [a,b] of [['piranha_open','piranha_closed'],['boo','boo_shy'],['question','question_used']]) {
      expect(assets.get(a)?.size).toEqual(assets.get(b)?.size);
      expect(assets.get(a)?.shapes).not.toEqual(assets.get(b)?.shapes);
    }
    for(let phase=1;phase<=4;phase++) expect(assets.get('coin_spin'+phase)?.size).toEqual(assets.get('coin')?.size);
  });
  it('draws rounded unclipped silhouettes and separate terrain caps, fills and pipe lips', () => {
    const assets=generateAssets(); assertBounded(assets); expect(assets.size).toBeGreaterThanOrEqual(70);
    for(const type of ['goomba','koopa','robot','mushroom','flower']) {
      expect(assets.get(type)?.shapes.some(s=>s.kind==='ellipse')).toBe(true);
      expect(new Set(assets.get(type)?.shapes.map(s=>s.color)).size).toBeGreaterThan(5);
    }
    for(const type of ['grass','snow','sand','ice','cave','castle','ruins','metal','space','stone']) {
      const cap=assets.get('ground_'+type),fill=assets.get('ground_'+type+'_fill');
      expect(cap?.size).toEqual([32,32]); expect(fill?.size).toEqual([32,32]);
      expect(fill?.shapes[0].bounds).toEqual([0,0,32,32]);
      expect(cap?.shapes.slice(0,fill?.shapes.length)).toEqual(fill?.shapes);
      expect(cap?.shapes.length).toBeGreaterThan(fill?.shapes.length ?? 0);
    }
    expect(assets.get('pipe')?.size).toEqual([64,64]); expect(assets.get('pipe_top')?.size).toEqual([80,24]);
    expect(assets.get('spike')?.shapes.some(s=>s.kind==='triangle')).toBe(true);
  });
});
