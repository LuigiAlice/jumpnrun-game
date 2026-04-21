import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco, createMovingPlat } from './helpers';

const gapWithPlatforms = (startX: number, baseY: number, gapWidth: number, platformCount: number, S: number = 1): any[] => {
  const plats = [];
  const platformSpacing = gapWidth / (platformCount + 1);
  for (let i = 0; i < platformCount; i++) {
    const px = startX * S + platformSpacing * S * (i + 1);
    const py = baseY - 60 - (i * 25);
    const pw = 100 * S;
    const ptype = i % 3 === 0 ? 'platform_easy' : (i % 3 === 1 ? 'platform_medium' : 'platform_hard');
    plats.push(createPlat(px, py, pw, 24, ptype));
  }
  return plats;
};

const pipeSection = (startX: number, y: number, pipeCount: number, S: number = 1): any[] => {
  const plats = [];
  for (let i = 0; i < pipeCount; i++) {
    const px = (startX + 300 + i * 350) * S;
    const ph = 64;
    plats.push(createPlat(px, y, 64 * S, ph, 'pipe'));
    plats.push(createPlat(px - 8 * S, y - ph / 2 - 12, 80 * S, 24, 'pipe_top'));
  }
  return plats;
};

export const ICE_SNOW_LEVELS: LevelData[] = [
  {
    id: 19, name: "Frost Peak", width: 20000, height: 600, biome: 'ice-snow',
    platforms: (() => {
      const S = 0.625;
      const plats: any[] = [];
      plats.push(createPlat(250 * S, 550, 800 * S, 40, 'snow'));
      plats.push(createPlat(1200 * S, 550, 600 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(1900, 550, 400, 3, S));
      plats.push(createPlat(2700 * S, 550, 1000 * S, 40, 'snow'));
      // Bridge gap to pipes
      plats.push(createPlat(3400 * S, 500, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(3700, 550, 4, S));
      // Bridge after pipes
      plats.push(createPlat(5200 * S, 500, 100, 20, 'platform_easy'));
      plats.push(createPlat(5500 * S, 550, 1200 * S, 40, 'snow'));
      plats.push(createPlat(7100 * S, 470, 120, 28, 'platform_easy'));
      plats.push(createPlat(7400 * S, 390, 120, 28, 'platform_medium'));
      plats.push(createPlat(7700 * S, 310, 120, 28, 'platform_hard'));
      plats.push(createPlat(8000 * S, 550, 800 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(9000, 550, 400, 3, S));
      plats.push(createPlat(9800 * S, 550, 1000 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.625;
      return [
        createCoin(400 * S, 500), createCoin(1000 * S, 440), createCoin(1700 * S, 360),
        createCoin(2400 * S, 280), createCoin(3100 * S, 220), createCoin(4000 * S, 200),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(600 * S, 460, 'mushroom'), createQB(1400 * S, 380, 'flower'),
        createQB(2200 * S, 280, 'star'), createQB(3000 * S, 220, 'mushroom'),
        createQB(3900 * S, 200, 'flower'), createQB(4800 * S, 180, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(800 * S, 530, 'spiny'), createEnemy(1800 * S, 450, 'goomba'),
        createEnemy(2700 * S, 350, 'spiny'), createEnemy(4000 * S, 280, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      return [
        createDeco(500 * S, 480, 'snowflake'), createDeco(1500 * S, 400, 'icicle'),
        createDeco(2400 * S, 320, 'rock'), createDeco(3500 * S, 260, 'snowflake'),
        createDeco(4500 * S, 220, 'icicle'), createDeco(5500 * S, 180, 'rock'),
      ];
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 6125, y: 510 },
    timeBonus: 120,
    movingPlatforms: (() => {
      const S = 0.625;
      return [
        createMovingPlat(3350, 480, 120, 24, 'platform_medium', 'horizontal', 180, 20),
        createMovingPlat(4620, 420, 120, 24, 'platform_medium', 'vertical', 180, 22),
      ];
    })(),
  },
  {
    id: 20, name: "Glacier Climb", width: 20016, height: 650, biome: 'ice-snow',
    platforms: (() => {
      const S = 0.556;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1000 * S, 40, 'snow'));
      plats.push(createPlat(1400 * S, 600, 800 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(2300, 600, 500, 4, S));
      plats.push(createPlat(3200 * S, 600, 1200 * S, 40, 'snow'));
      // Bridge
      plats.push(createPlat(4100 * S, 550, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(4400, 600, 5, S));
      // Bridge
      plats.push(createPlat(6000 * S, 550, 100, 20, 'platform_easy'));
      plats.push(createPlat(6300 * S, 600, 1500 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      return [
        createCoin(500 * S, 540), createCoin(1200 * S, 480), createCoin(2100 * S, 400),
        createCoin(3000 * S, 340), createCoin(3900 * S, 280), createCoin(4800 * S, 220),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(700 * S, 500, 'mushroom'), createQB(1600 * S, 420, 'flower'),
        createQB(2500 * S, 320, 'star'), createQB(3400 * S, 260, 'mushroom'),
        createQB(4300 * S, 240, 'flower'), createQB(5200 * S, 220, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(900 * S, 560, 'spiny'), createEnemy(2000 * S, 480, 'goomba'),
        createEnemy(3100 * S, 380, 'spiny'), createEnemy(4200 * S, 300, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      return [
        createDeco(600 * S, 520, 'snowflake'), createDeco(1700 * S, 440, 'icicle'),
        createDeco(2700 * S, 360, 'rock'), createDeco(3700 * S, 300, 'snowflake'),
        createDeco(4700 * S, 260, 'icicle'), createDeco(5600 * S, 220, 'rock'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 3503, y: 560 },
    timeBonus: 140,
    movingPlatforms: (() => {
      const S = 0.556;
      return [
        createMovingPlat(3450, 480, 120, 24, 'platform_medium', 'horizontal', 150, 20),
        createMovingPlat(4680, 400, 120, 24, 'platform_medium', 'vertical', 180, 22),
      ];
    })(),
  },
  {
    id: 21, name: "Snow Summit", width: 19992, height: 700, biome: 'ice-snow',
    platforms: (() => {
      const S = 0.476;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 650, 1200 * S, 40, 'snow'));
      plats.push(createPlat(1700 * S, 650, 800 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(2600, 650, 500, 4, S));
      plats.push(createPlat(3500 * S, 650, 1500 * S, 40, 'snow'));
      // Bridge
      plats.push(createPlat(4700 * S, 600, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(5000, 650, 6, S));
      // Bridge
      plats.push(createPlat(6900 * S, 600, 100, 20, 'platform_easy'));
      plats.push(createPlat(7200 * S, 650, 1800 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.476;
      return [
        createCoin(600 * S, 580), createCoin(1500 * S, 520), createCoin(2400 * S, 440),
        createCoin(3400 * S, 380), createCoin(4400 * S, 320), createCoin(5500 * S, 260),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.476;
      return [
        createQB(800 * S, 540, 'mushroom'), createQB(1800 * S, 460, 'flower'),
        createQB(2800 * S, 360, 'star'), createQB(3900 * S, 300, 'mushroom'),
        createQB(5000 * S, 280, 'flower'), createQB(6100 * S, 260, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.476;
      return [
        createEnemy(1000 * S, 600, 'spiny'), createEnemy(2200 * S, 520, 'goomba'),
        createEnemy(3500 * S, 420, 'spiny'), createEnemy(4800 * S, 340, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.476;
      return [
        createDeco(700 * S, 560, 'snowflake'), createDeco(1900 * S, 480, 'icicle'),
        createDeco(3100 * S, 400, 'rock'), createDeco(4300 * S, 340, 'snowflake'),
        createDeco(5500 * S, 300, 'icicle'), createDeco(6600 * S, 260, 'rock'),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 3427, y: 610 },
    timeBonus: 160,
  },
  {
    id: 22, name: "Iceberg Ascent", width: 19980, height: 650, biome: 'ice-snow',
    platforms: (() => {
      const S = 0.444;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 600, 1500 * S, 40, 'snow'));
      plats.push(createPlat(2000 * S, 600, 1000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(3100, 600, 600, 5, S));
      plats.push(createPlat(4100 * S, 600, 1800 * S, 40, 'snow'));
      // Bridge
      plats.push(createPlat(5600 * S, 550, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(5900, 600, 6, S));
      // Bridge
      plats.push(createPlat(7900 * S, 550, 100, 20, 'platform_easy'));
      plats.push(createPlat(8200 * S, 600, 2000 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.444;
      return [
        createCoin(700 * S, 540), createCoin(1600 * S, 480), createCoin(2600 * S, 400),
        createCoin(3600 * S, 340), createCoin(4600 * S, 280), createCoin(5700 * S, 220),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.444;
      return [
        createQB(900 * S, 500, 'mushroom'), createQB(2000 * S, 420, 'flower'),
        createQB(3100 * S, 320, 'star'), createQB(4200 * S, 260, 'mushroom'),
        createQB(5400 * S, 240, 'flower'), createQB(6500 * S, 220, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.444;
      return [
        createEnemy(1100 * S, 560, 'spiny'), createEnemy(2400 * S, 480, 'goomba'),
        createEnemy(3700 * S, 380, 'spiny'), createEnemy(5000 * S, 300, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.444;
      return [
        createDeco(800 * S, 520, 'snowflake'), createDeco(2100 * S, 440, 'icicle'),
        createDeco(3400 * S, 360, 'rock'), createDeco(4700 * S, 300, 'snowflake'),
        createDeco(5900 * S, 260, 'icicle'), createDeco(7000 * S, 220, 'rock'),
      ];
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 3641, y: 560 },
    timeBonus: 180,
    movingPlatforms: (() => {
      const S = 0.444;
      return [
        createMovingPlat(7880, 480, 120, 24, 'platform_medium', 'horizontal', 140, 20),
        createMovingPlat(4700, 380, 120, 24, 'platform_medium', 'vertical', 180, 22),
      ];
    })(),
  },
  {
    id: 23, name: "Polar Heights", width: 20016, height: 700, biome: 'ice-snow',
    platforms: (() => {
      const S = 0.417;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 650, 1800 * S, 40, 'snow'));
      plats.push(createPlat(2300 * S, 650, 1200 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(3600, 650, 700, 5, S));
      plats.push(createPlat(4800 * S, 650, 2000 * S, 40, 'snow'));
      // Bridge
      plats.push(createPlat(6500 * S, 600, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(6800, 650, 7, S));
      // Bridge
      plats.push(createPlat(9000 * S, 600, 100, 20, 'platform_easy'));
      plats.push(createPlat(9300 * S, 650, 2200 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.417;
      return [
        createCoin(800 * S, 580), createCoin(1900 * S, 520), createCoin(3000 * S, 440),
        createCoin(4200 * S, 380), createCoin(5500 * S, 320), createCoin(6800 * S, 260),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.417;
      return [
        createQB(1000 * S, 540, 'mushroom'), createQB(2200 * S, 460, 'flower'),
        createQB(3500 * S, 360, 'star'), createQB(4800 * S, 300, 'mushroom'),
        createQB(6100 * S, 280, 'flower'), createQB(7400 * S, 260, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.417;
      return [
        createEnemy(1200 * S, 600, 'spiny'), createEnemy(2600 * S, 520, 'goomba'),
        createEnemy(4000 * S, 420, 'spiny'), createEnemy(5400 * S, 340, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.417;
      return [
        createDeco(900 * S, 560, 'snowflake'), createDeco(2300 * S, 480, 'icicle'),
        createDeco(3700 * S, 400, 'rock'), createDeco(5100 * S, 340, 'snowflake'),
        createDeco(6400 * S, 300, 'icicle'), createDeco(7700 * S, 260, 'rock'),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 3878, y: 610 },
    timeBonus: 200,
  },
  {
    id: 24, name: "Frozen Finale", width: 20000, height: 700, biome: 'ice-snow',
    platforms: (() => {
      const S = 0.4;
      const plats: any[] = [];
      plats.push(createPlat(200 * S, 650, 2000 * S, 40, 'snow'));
      plats.push(createPlat(2500 * S, 650, 1400 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(4000, 650, 800, 6, S));
      plats.push(createPlat(5300 * S, 650, 2200 * S, 40, 'snow'));
      // Bridge
      plats.push(createPlat(7200 * S, 600, 100, 20, 'platform_easy'));
      plats.push(...pipeSection(7500, 650, 8, S));
      // Bridge
      plats.push(createPlat(10000 * S, 600, 100, 20, 'platform_easy'));
      plats.push(createPlat(10300 * S, 650, 2500 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.4;
      return [
        createCoin(900 * S, 580), createCoin(2100 * S, 520), createCoin(3300 * S, 440),
        createCoin(4600 * S, 380), createCoin(5900 * S, 320), createCoin(7300 * S, 260),
      ];
    })(),
    questionBlocks: (() => {
      const S = 0.4;
      return [
        createQB(1100 * S, 540, 'mushroom'), createQB(2400 * S, 460, 'flower'),
        createQB(3800 * S, 360, 'star'), createQB(5200 * S, 300, 'mushroom'),
        createQB(6600 * S, 244, 'flower'), createQB(8000 * S, 224, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.4;
      return [
        createEnemy(1300 * S, 600, 'spiny'), createEnemy(2800 * S, 520, 'goomba'),
        createEnemy(4300 * S, 420, 'spiny'), createEnemy(5800 * S, 340, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.4;
      return [
        createDeco(1000 * S, 560, 'snowflake'), createDeco(2500 * S, 480, 'icicle'),
        createDeco(4000 * S, 400, 'rock'), createDeco(5500 * S, 340, 'snowflake'),
        createDeco(6900 * S, 300, 'icicle'), createDeco(8300 * S, 260, 'rock'),
      ];
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 4120, y: 610 },
    timeBonus: 220,
  },
];