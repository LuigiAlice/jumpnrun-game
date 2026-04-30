import { getLevel, getLevelCount } from '../src/data/levels/index.ts';

const missing: string[] = [];
for (let i = 0; i < getLevelCount(); i++) {
    const level = getLevel(i);
    if (!level.movingPlatforms || level.movingPlatforms.length === 0) {
        missing.push(`  Index ${i} → id:${level.id} (${level.name}, ${level.biome})`);
    }
}
console.log(`Missing moving platforms (${missing.length}/${getLevelCount()}):`);
missing.forEach(m => console.log(m));
