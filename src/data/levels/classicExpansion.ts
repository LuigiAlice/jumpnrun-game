import type { EnemyType, FireBar, LevelData, RedCoinChallenge, Vine } from './index';

type NewEnemy = Extract<EnemyType, 'parakoopa' | 'buzzy_beetle' | 'bobomb'>;
interface ClassicPlan {
  idea: string;
  enemy?: { x: number; type: NewEnemy };
  vine?: Vine;
  fireBar?: FireBar;
  ring?: { shelfX: number; x: number; startX: number; spacing: number; count?: number; durationMs?: number; reward?: 'oneup' | 'score' };
}

/** Authored, small additions: no new solid geometry and never a requirement to reach the flag. */
export const CLASSIC_EXPANSION_PLANS: Record<number, ClassicPlan> = {
  4: { idea: 'A first winged patrol above the hill, with a vine beside the optional ledge', enemy: { x: 2300, type: 'parakoopa' }, vine: { x: 1939, y: 640, height: 162 } },
  6: { idea: 'Winged patrol before the wind-dash islands', enemy: { x: 1800, type: 'parakoopa' } },
  9: { idea: 'An armoured beetle guards the pyramid floor', enemy: { x: 2100, type: 'buzzy_beetle' } },
  10: { idea: 'Oasis red-coin sprint above the sheltered shelf', enemy: { x: 1500, type: 'buzzy_beetle' }, ring: { shelfX: 3900, x: 3730, startX: 3750, spacing: 60, durationMs: 12000, reward: 'oneup' } },
  16: { idea: 'A calm grotto ring after the deep-water climb', ring: { shelfX: 8100, x: 7780, startX: 7840, spacing: 70, count: 8, durationMs: 14000 } },
  19: { idea: 'A red-coin snowfield and the first ice-world beetle', enemy: { x: 900, type: 'buzzy_beetle' }, ring: { shelfX: 2800, x: 2350, startX: 2440, spacing: 80, count: 8, durationMs: 14000, reward: 'oneup' } },
  22: { idea: 'Winged patrol above a snowy summit', enemy: { x: 1800, type: 'parakoopa' } },
  25: { idea: 'Winged cloud guardian followed by an open-sky red-coin runway', enemy: { x: 920, type: 'parakoopa' }, ring: { shelfX: 4900, x: 4580, startX: 4660, spacing: 65, count: 8, durationMs: 12000 } },
  28: { idea: 'A fluttering guardian on the broad cloud landing', enemy: { x: 2400, type: 'parakoopa' } },
  31: { idea: 'A woodland vine climbs beside the bonus branch', enemy: { x: 1250, type: 'parakoopa' }, vine: { x: 1666, y: 640, height: 212 } },
  34: { idea: 'Climb a hanging vine into the tree canopy', enemy: { x: 3600, type: 'parakoopa' }, vine: { x: 1784, y: 720, height: 200 } },
  37: { idea: 'A courtyard vine leads to the roof route', vine: { x: 4364, y: 680, height: 200 } },
  43: { idea: 'A sunny red-coin dash over the quiet sand bank', ring: { shelfX: 3420, x: 3210, startX: 3240, spacing: 60, durationMs: 10000, reward: 'oneup' } },
  46: { idea: 'A winged guardian hovers over the first coastal cliff', enemy: { x: 2000, type: 'parakoopa' } },
  49: { idea: 'An ignitable bomb patrol and an overhead machine fire arm', enemy: { x: 900, type: 'bobomb' }, fireBar: { x: 4330, y: 420, length: 4, angularSpeed: 0.85, phase: 0.4 } },
  51: { idea: 'A fireproof beetle patrols the pipeworks landing', enemy: { x: 7000, type: 'buzzy_beetle' } },
  55: { idea: 'A ticking bomb and a slow fire arm over the obsidian bank', enemy: { x: 4500, type: 'bobomb' }, fireBar: { x: 4410, y: 200, length: 4, angularSpeed: -0.7, phase: 1.2 } },
  58: { idea: 'A bomb encounter on a roomy crater terrace', enemy: { x: 7300, type: 'bobomb' } },
  61: { idea: 'A quiet red-coin gallery before the armoured manor guard', enemy: { x: 5400, type: 'buzzy_beetle' }, ring: { shelfX: 3800, x: 3510, startX: 3600, spacing: 60, count: 8, durationMs: 12000 } },
  67: { idea: 'An ancient armoured guard and a turning temple flame', enemy: { x: 3000, type: 'buzzy_beetle' }, fireBar: { x: 7140, y: 596, length: 4, angularSpeed: 0.6, phase: 2.1 } },
  73: { idea: 'A bomb patrol on the wide canyon ledge', enemy: { x: 3900, type: 'bobomb' } },
  79: { idea: 'Low-gravity winged patrol above the station entrance', enemy: { x: 1700, type: 'parakoopa' } },
  85: { idea: 'A bomb guard and an overhead castle fire arm', enemy: { x: 3600, type: 'bobomb' }, fireBar: { x: 7140, y: 532, length: 4, angularSpeed: -0.85, phase: 0.9 } },
  88: { idea: 'A ticking bomb separates the two tower-climbing phrases', enemy: { x: 2500, type: 'bobomb' } },
};

function makeRing(level: LevelData, spec: NonNullable<ClassicPlan['ring']>): RedCoinChallenge {
  const shelf = level.platforms.find(platform => platform.x === spec.shelfX && platform.w >= 250);
  if (!shelf) throw new Error(`L${level.id}: missing authored red-coin shelf ${spec.shelfX}`);
  const top = shelf.y - shelf.h / 2;
  return {
    x: spec.x, y: top - 48,
    coins: Array.from({ length: spec.count ?? 6 }, (_, i) => ({ x: spec.startX + i * spec.spacing, y: top - 40 })),
    durationMs: spec.durationMs ?? 12000,
    reward: spec.reward ?? 'score',
  };
}

export function expandClassicLevel(level: LevelData): LevelData {
  const plan = CLASSIC_EXPANSION_PLANS[level.id];
  if (!plan) return level;
  let replaced = false;
  const enemies = level.enemies.map(enemy => {
    if (!plan.enemy || enemy.x !== plan.enemy.x) return enemy;
    if (replaced) throw new Error(`L${level.id}: ambiguous authored enemy at ${enemy.x}`);
    replaced = true;
    if (plan.enemy.type === 'parakoopa') return { ...enemy, y: enemy.y - 72, type: plan.enemy.type };
    const support = level.platforms.filter(platform => platform.type !== 'lava' && platform.type !== 'water'
      && enemy.x >= platform.x - platform.w / 2 && enemy.x <= platform.x + platform.w / 2
      && platform.y - platform.h / 2 >= enemy.y - 5)
      .sort((a, b) => Math.abs(a.y - a.h / 2 - enemy.y) - Math.abs(b.y - b.h / 2 - enemy.y))[0];
    if (!support) throw new Error(`L${level.id}: no ground for ${plan.enemy.type} at ${enemy.x}`);
    return { ...enemy, y: support.y - support.h / 2 - 18, type: plan.enemy.type };
  });
  if (plan.enemy && !replaced) throw new Error(`L${level.id}: missing authored enemy ${plan.enemy.x}`);
  return {
    ...level, enemies,
    ...(plan.vine ? { vines: [plan.vine] } : {}),
    ...(plan.fireBar ? { fireBars: [plan.fireBar] } : {}),
    ...(plan.ring ? { redCoinChallenges: [makeRing(level, plan.ring)] } : {}),
  };
}
