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
import { CLASSIC_TEXTURE_SIZES, createClassicAssets } from '../src/art/classicAssets';
function capture() { const result=recorder(); createClassicAssets(result.scene as any); return result; }
describe('Classic expansion storybook assets', () => {
  it('generates every runtime key with stable native enemy and shell dimensions', () => {
    const {assets,graphics}=capture();
    expect(assets.size).toBe(Object.keys(CLASSIC_TEXTURE_SIZES).length);
    for(const [key,size] of Object.entries(CLASSIC_TEXTURE_SIZES)) expect(assets.get(key)?.size,key).toEqual(size);
    for(const type of ['parakoopa','buzzy_beetle','bobomb']) {
      for(const suffix of ['_walk1','_walk2']) expect(assets.get(type+suffix)?.size).toEqual(assets.get(type)?.size);
      expect(assets.get(type+'_walk1')?.shapes).not.toEqual(assets.get(type+'_walk2')?.shapes);
    }
    expect(assets.get('buzzy_shell')?.shapes.every(s=>s.bounds[1]>=18)).toBe(true);
    expect(graphics.destroy).toHaveBeenCalledOnce();
  });
  it('draws soft unclipped shapes and distinguishes dangerous and collected states', () => {
    const {assets}=capture(); assertBounded(assets);
    for(const type of ['parakoopa','buzzy_beetle','bobomb','firebar_orb']) expect(assets.get(type)?.shapes.some(s=>s.kind==='ellipse')).toBe(true);
    expect(assets.get('bobomb_lit')?.shapes).not.toEqual(assets.get('bobomb')?.shapes);
    expect(assets.get('red_coin_used')?.shapes).not.toEqual(assets.get('red_coin')?.shapes);
    const ring=assets.get('red_ring')?.shapes ?? [];
    expect(ring.filter(s=>s.kind==='ring')).toHaveLength(2);
    expect(ring.filter(s=>s.kind!=='ring').some(({bounds:[x,y,w,h]})=>x<=24&&x+w>24&&y<=32&&y+h>32)).toBe(false);
    for(const shape of ring.filter(s=>s.kind==='ring')) expect(shape.args[4]).toBeLessThan(10);
  });
});
