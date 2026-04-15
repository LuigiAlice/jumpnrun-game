export const DEFAULT_PHYSICS = {
    TILE_SIZE: 32,
    MAX_JUMP_DISTANCE: 800, 
    MAX_JUMP_UP: 300,
    MAX_FALL_DOWN: 1000
};

interface Platform {
    x: number;
    y: number;
    w: number;
    h: number;
    type: string;
}

export class Physics {
    private platforms: Platform[];

    constructor(platforms: Platform[], _width: number, _height: number) {
        this.platforms = platforms;
    }

    private canReach(current: Platform, next: Platform): boolean {
        const currLeft = current.x - current.w / 2;
        const currRight = current.x + current.w / 2;
        const nextLeft = next.x - next.w / 2;
        const nextRight = next.x + next.w / 2;
        
        let gapX: number;
        if (nextLeft > currRight) {
            gapX = nextLeft - currRight;
        } else if (nextRight < currLeft) {
            gapX = currLeft - nextRight;
        } else {
            gapX = 0;
        }
        
        const diffY = next.y - current.y;
        
        return gapX <= DEFAULT_PHYSICS.MAX_JUMP_DISTANCE && 
               diffY >= -DEFAULT_PHYSICS.MAX_JUMP_UP && 
               diffY <= DEFAULT_PHYSICS.MAX_FALL_DOWN;
    }

    public isSolvable(playerStartX: number, playerStartY: number, goalX: number): boolean {
        const n = this.platforms.length;
        if (n === 0) return false;
        
        const sortedPlatforms = [...this.platforms].sort((a, b) => a.x - b.x);
        
        let maxX = 0;
        for (const p of sortedPlatforms) {
            const left = p.x - p.w / 2;
            const right = p.x + p.w / 2;
            
            if (left <= goalX && right >= goalX - 2000) {
                return true;
            }
            
            if (right > maxX && left <= goalX) {
                maxX = right;
            }
        }
        
        return maxX >= goalX - 2000;
    }
}