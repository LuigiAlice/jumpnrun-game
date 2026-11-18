import type Phaser from 'phaser';

/** Keep one native-width column: TileSprite repeats it horizontally without scaling pixels. */
export interface TerrainRow { y: number; height: number; fill: boolean }
export function terrainRows(height: number, capHeight: number, fillHeight: number): TerrainRow[] {
  const rows: TerrainRow[] = [];
  let y = 0;
  while (y < height) {
    const fill = y > 0;
    const rowHeight = Math.min(fill ? fillHeight : capHeight, height - y);
    if (rowHeight <= 0) throw new Error('Terrain tiles must have positive dimensions');
    rows.push({ y, height: rowHeight, fill });
    y += rowHeight;
  }
  return rows;
}

const FILL_TEXTURES = new Set([
  'ground_grass', 'ground_snow', 'ground_sand', 'ground_cave', 'ground_castle',
  'ground_ruins', 'ground_metal', 'ground_space', 'ground_stone', 'ground_ice',
]);

/** Per-scene cache is released on shutdown, including level restarts. */
export class TerrainTextures {
  private keys = new Set<string>();
  constructor(private scene: Phaser.Scene) {
    scene.events.once('shutdown', () => {
      for (const key of this.keys) scene.textures.remove(key);
      this.keys.clear();
    });
  }

  /** Dynamic Arcade sprites need a finite panel rather than a TileSprite component. */
  panel(textureKey: string, width: number, height: number): string {
    const w = Math.max(1, Math.ceil(width));
    const h = Math.max(1, Math.ceil(height));
    const key = `terrain-panel:${textureKey}:${w}:${h}`;
    if (this.keys.has(key)) return key;
    const columnKey = this.surface(textureKey, h);
    const column = this.scene.textures.get(columnKey).getSourceImage() as HTMLCanvasElement;
    const texture = this.scene.textures.createCanvas(key, w, h);
    if (!texture) return columnKey;
    texture.context.imageSmoothingEnabled = false;
    for (let x = 0; x < w; x += column.width) {
      const remaining = Math.min(column.width, w - x);
      texture.context.drawImage(column, 0, 0, remaining, h, x, 0, remaining, h);
    }
    texture.refresh();
    this.keys.add(key);
    return key;
  }

  surface(textureKey: string, height: number): string {
    const h = Math.max(1, Math.ceil(height));
    const key = `terrain:${textureKey}:${h}`;
    if (this.keys.has(key)) return key;
    const textures = this.scene.textures;
    const source = textures.get(textureKey).getSourceImage() as HTMLCanvasElement;
    const fillKey = `${textureKey}_fill`;
    const fill = FILL_TEXTURES.has(textureKey) && textures.exists(fillKey)
      ? textures.get(fillKey).getSourceImage() as HTMLCanvasElement : source;
    const texture = textures.createCanvas(key, source.width, h);
    if (!texture) return textureKey;
    texture.context.imageSmoothingEnabled = false;
    for (const row of terrainRows(h, source.height, fill.height)) {
      const image = row.fill ? fill : source;
      texture.context.drawImage(image, 0, 0, source.width, row.height, 0, row.y, source.width, row.height);
    }
    texture.refresh();
    this.keys.add(key);
    return key;
  }
}
