// Level Loader - Fetches predefined levels by index
import { getLevel, getLevelCount as getTotalLevels } from '../data/levels/index';

export function loadLevel(levelIndex: number) {
    return getLevel(levelIndex);
}

export function getLevelName(levelIndex: number): string {
    const level = getLevel(levelIndex);
    return level.name;
}

export function getLevelCount(): number {
    return getTotalLevels();
}