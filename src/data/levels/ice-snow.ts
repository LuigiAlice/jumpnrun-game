import { LevelData, createPlat, createCoin, createQB, createEnemy, createDeco } from './helpers';

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
      plats.push(...pipeSection(3700, 550, 4, S));
      plats.push(createPlat(5500 * S, 550, 1200 * S, 40, 'snow'));
      plats.push(createPlat(7100 * S, 470, 120, 28, 'platform_easy'));
      plats.push(createPlat(7400 * S, 390, 120, 28, 'platform_medium'));
      plats.push(createPlat(7700 * S, 310, 120, 28, 'platform_hard'));
      plats.push(createPlat(8000 * S, 550, 800 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(9000, 550, 400, 3, S));
      plats.push(createPlat(9800 * S, 550, 1000 * S, 40, 'snow'));
      plats.push(createPlat(11200 * S, 470, 120, 28, 'platform_easy'));
      plats.push(createPlat(11500 * S, 390, 120, 28, 'platform_medium'));
      plats.push(createPlat(11800 * S, 310, 120, 28, 'platform_hard'));
      plats.push(createPlat(12100 * S, 230, 150, 40, 'snow'));
      plats.push(createPlat(12500 * S, 310, 120, 28, 'platform_hard'));
      plats.push(createPlat(12800 * S, 390, 120, 28, 'platform_medium'));
      plats.push(createPlat(13100 * S, 470, 120, 28, 'platform_easy'));
      plats.push(createPlat(13400 * S, 550, 800 * S, 40, 'snow'));
      plats.push(...pipeSection(14400, 550, 4, S));
      plats.push(createPlat(16200 * S, 550, 1500 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(17900, 550, 500, 4, S));
      plats.push(createPlat(18900 * S, 550, 1000 * S, 40, 'snow'));
      plats.push(createPlat(20300 * S, 470, 120, 28, 'platform_easy'));
      plats.push(createPlat(20600 * S, 390, 120, 28, 'platform_medium'));
      plats.push(createPlat(20900 * S, 310, 120, 28, 'platform_hard'));
      plats.push(createPlat(21200 * S, 550, 800 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(22200, 550, 400, 3, S));
      plats.push(createPlat(23100 * S, 550, 1200 * S, 40, 'snow'));
      plats.push(...pipeSection(24300, 550, 4, S));
      plats.push(createPlat(26500 * S, 550, 1500 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(28200, 550, 500, 4, S));
      plats.push(createPlat(29200 * S, 550, 1000 * S, 40, 'snow'));
      plats.push(createPlat(30600 * S, 470, 120, 28, 'platform_easy'));
      plats.push(createPlat(30900 * S, 390, 120, 28, 'platform_medium'));
      plats.push(createPlat(31200 * S, 310, 120, 28, 'platform_hard'));
      plats.push(createPlat(31500 * S, 550, 800 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.625;
      const coins: any[] = [];
      for (let x = 350 * S; x < 2700 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 2800 * S; x < 5500 * S; x += 100 * S) coins.push(createCoin(x, 500));
      coins.push(createCoin(7100 * S, 420), createCoin(7400 * S, 340), createCoin(7700 * S, 260));
      for (let x = 8000 * S; x < 8800 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 9900 * S; x < 11200 * S; x += 100 * S) coins.push(createCoin(x, 500));
      coins.push(createCoin(11200 * S, 420), createCoin(11500 * S, 340), createCoin(11800 * S, 260), createCoin(12100 * S, 180));
      coins.push(createCoin(12500 * S, 260), createCoin(12800 * S, 340), createCoin(13100 * S, 420));
      for (let x = 13400 * S; x < 14200 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 16200 * S; x < 17700 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 18900 * S; x < 19900 * S; x += 100 * S) coins.push(createCoin(x, 500));
      coins.push(createCoin(20300 * S, 420), createCoin(20600 * S, 340), createCoin(20900 * S, 260));
      for (let x = 21200 * S; x < 22000 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 23100 * S; x < 24300 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 26500 * S; x < 28000 * S; x += 100 * S) coins.push(createCoin(x, 500));
      for (let x = 29200 * S; x < 30200 * S; x += 100 * S) coins.push(createCoin(x, 500));
      coins.push(createCoin(30600 * S, 420), createCoin(30900 * S, 340), createCoin(31200 * S, 260));
      for (let x = 31500 * S; x < 32000 * S; x += 100 * S) coins.push(createCoin(x, 500));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.625;
      return [
        createQB(1500 * S, 480, 'mushroom'),
        createQB(2800 * S, 480, 'coin'),
        createQB(4700 * S, 480, 'mushroom'),
        createQB(5600 * S, 480, 'flower'),
        createQB(8200 * S, 480, 'star'),
        createQB(10000 * S, 480, 'mushroom'),
        createQB(12200 * S, 150, 'flower'),
        createQB(13600 * S, 480, 'coin'),
        createQB(15500 * S, 480, 'mushroom'),
        createQB(17000 * S, 480, 'star'),
        createQB(19100 * S, 480, 'mushroom'),
        createQB(21400 * S, 480, 'coin'),
        createQB(23500 * S, 480, 'flower'),
        createQB(25700 * S, 480, 'mushroom'),
        createQB(27700 * S, 480, 'star'),
        createQB(29400 * S, 480, 'mushroom'),
        createQB(31600 * S, 480, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.625;
      return [
        createEnemy(500 * S, 510, 'goomba'), createEnemy(800 * S, 510, 'robot'),
        createEnemy(1100 * S, 510, 'spiny'), createEnemy(1300 * S, 510, 'goomba'),
        createEnemy(1600 * S, 510, 'crab'), createEnemy(1900 * S, 510, 'koopa'),
        createEnemy(2300 * S, 510, 'goomba'), createEnemy(2700 * S, 510, 'robot'),
        createEnemy(3100 * S, 510, 'spiny'), createEnemy(3500 * S, 480, 'piranha'),
        createEnemy(3800 * S, 480, 'piranha'), createEnemy(4150 * S, 480, 'piranha'),
        createEnemy(4500 * S, 480, 'piranha'), createEnemy(4850 * S, 480, 'piranha'),
        createEnemy(5200 * S, 480, 'piranha'), createEnemy(5600 * S, 510, 'goomba'),
        createEnemy(5900 * S, 510, 'robot'), createEnemy(6200 * S, 510, 'crab'),
        createEnemy(6600 * S, 510, 'koopa'), createEnemy(7100 * S, 510, 'goomba'),
        createEnemy(7600 * S, 510, 'spiny'), createEnemy(8100 * S, 510, 'goomba'),
        createEnemy(8500 * S, 510, 'robot'), createEnemy(9000 * S, 510, 'koopa'),
        createEnemy(9400 * S, 510, 'crab'), createEnemy(9900 * S, 510, 'goomba'),
        createEnemy(10300 * S, 510, 'spiny'), createEnemy(10700 * S, 510, 'robot'),
        createEnemy(11200 * S, 510, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.625;
      const decos: any[] = [];
      for (let x = 300 * S; x < 32000 * S; x += 1500 * S) {
        decos.push(createDeco(x, 510, x % (3000 * S) === 300 * S ? 'snowflake' : (x % (3000 * S) === 900 * S ? 'icicle' : 'rock')));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 500 },
    goal: { x: 19500, y: 508 },
    timeBonus: 120,
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
      plats.push(...pipeSection(4400, 600, 5, S));
      plats.push(createPlat(6300 * S, 600, 1500 * S, 40, 'snow'));
      plats.push(createPlat(8200 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(8500 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(8800 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(9100 * S, 280, 150, 40, 'snow'));
      plats.push(createPlat(9500 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(9800 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(10100 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(10400 * S, 600, 1000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(11600, 600, 500, 4, S));
      plats.push(createPlat(12600 * S, 600, 1200 * S, 40, 'snow'));
      plats.push(createPlat(14200 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(14500 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(14800 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(15100 * S, 280, 150, 40, 'snow'));
      plats.push(createPlat(15500 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(15800 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(16100 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(16400 * S, 600, 1200 * S, 40, 'snow'));
      plats.push(...pipeSection(17600, 600, 5, S));
      plats.push(createPlat(20400 * S, 600, 1800 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(22400, 600, 550, 4, S));
      plats.push(createPlat(23600 * S, 600, 1000 * S, 40, 'snow'));
      plats.push(createPlat(25000 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(25300 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(25600 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(25900 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(26200 * S, 600, 800 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(27200, 600, 400, 3, S));
      plats.push(createPlat(28200 * S, 600, 1400 * S, 40, 'snow'));
      plats.push(...pipeSection(29600, 600, 5, S));
      plats.push(createPlat(32000 * S, 600, 2000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(34200, 600, 500, 4, S));
      plats.push(createPlat(35200 * S, 600, 800 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.556;
      const coins: any[] = [];
      for (let x = 300 * S; x < 3200 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 3300 * S; x < 4400 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 6300 * S; x < 7800 * S; x += 100 * S) coins.push(createCoin(x, 550));
      coins.push(createCoin(8200 * S, 470), createCoin(8500 * S, 390), createCoin(8800 * S, 310), createCoin(9100 * S, 230));
      coins.push(createCoin(9500 * S, 310), createCoin(9800 * S, 390), createCoin(10100 * S, 470));
      for (let x = 10400 * S; x < 11400 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 12600 * S; x < 13800 * S; x += 100 * S) coins.push(createCoin(x, 550));
      coins.push(createCoin(14200 * S, 470), createCoin(14500 * S, 390), createCoin(14800 * S, 310), createCoin(15100 * S, 230));
      coins.push(createCoin(15500 * S, 310), createCoin(15800 * S, 390), createCoin(16100 * S, 470));
      for (let x = 16400 * S; x < 17600 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 20400 * S; x < 22200 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 23600 * S; x < 24600 * S; x += 100 * S) coins.push(createCoin(x, 550));
      coins.push(createCoin(25000 * S, 470), createCoin(25300 * S, 390), createCoin(25600 * S, 310), createCoin(25900 * S, 230));
      for (let x = 26200 * S; x < 27000 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 28200 * S; x < 29600 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 32000 * S; x < 34000 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 35200 * S; x < 36000 * S; x += 100 * S) coins.push(createCoin(x, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.556;
      return [
        createQB(1000 * S, 530, 'mushroom'),
        createQB(2500 * S, 450, 'coin'),
        createQB(3700 * S, 530, 'mushroom'),
        createQB(4700 * S, 530, 'flower'),
        createQB(6600 * S, 530, 'star'),
        createQB(8100 * S, 530, 'mushroom'),
        createQB(9400 * S, 210, 'flower'),
        createQB(10800 * S, 530, 'coin'),
        createQB(12000 * S, 530, 'mushroom'),
        createQB(13800 * S, 530, 'star'),
        createQB(15200 * S, 210, 'mushroom'),
        createQB(16600 * S, 530, 'coin'),
        createQB(17800 * S, 530, 'mushroom'),
        createQB(19600 * S, 530, 'star'),
        createQB(21800 * S, 530, 'flower'),
        createQB(23800 * S, 530, 'mushroom'),
        createQB(26000 * S, 530, 'coin'),
        createQB(28400 * S, 530, 'mushroom'),
        createQB(30200 * S, 530, 'star'),
        createQB(32200 * S, 530, 'flower'),
      ];
    })(),
    enemies: (() => {
      const S = 0.556;
      return [
        createEnemy(600 * S, 560, 'goomba'), createEnemy(1000 * S, 560, 'robot'),
        createEnemy(1400 * S, 560, 'spiny'), createEnemy(1800 * S, 560, 'goomba'),
        createEnemy(2200 * S, 560, 'crab'), createEnemy(2600 * S, 560, 'koopa'),
        createEnemy(3000 * S, 560, 'goomba'), createEnemy(3400 * S, 560, 'robot'),
        createEnemy(3900 * S, 560, 'spiny'), createEnemy(4400 * S, 520, 'piranha'),
        createEnemy(4900 * S, 520, 'piranha'), createEnemy(5400 * S, 520, 'piranha'),
        createEnemy(5900 * S, 520, 'piranha'), createEnemy(6400 * S, 520, 'piranha'),
        createEnemy(7000 * S, 560, 'goomba'), createEnemy(7400 * S, 560, 'robot'),
        createEnemy(7800 * S, 560, 'crab'), createEnemy(8200 * S, 560, 'koopa'),
        createEnemy(8700 * S, 560, 'goomba'), createEnemy(9100 * S, 560, 'spiny'),
        createEnemy(9600 * S, 560, 'robot'), createEnemy(10100 * S, 560, 'goomba'),
        createEnemy(10500 * S, 560, 'crab'), createEnemy(11000 * S, 560, 'koopa'),
        createEnemy(11500 * S, 560, 'goomba'), createEnemy(12000 * S, 560, 'spiny'),
        createEnemy(12500 * S, 560, 'robot'), createEnemy(13000 * S, 560, 'goomba'),
        createEnemy(13500 * S, 560, 'crab'),
      ];
    })(),
    decorations: (() => {
      const S = 0.556;
      const decos: any[] = [];
      for (let x = 300 * S; x < 36000 * S; x += 1800 * S) {
        decos.push(createDeco(x, 560, x % (3600 * S) === 300 * S ? 'snowflake' : (x % (3600 * S) === 900 * S ? 'icicle' : 'cloud')));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19516, y: 558 },
    timeBonus: 140,
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
      plats.push(...pipeSection(5000, 650, 6, S));
      plats.push(createPlat(7200 * S, 650, 1800 * S, 40, 'snow'));
      plats.push(createPlat(9400 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(9700 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(10000 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(10300 * S, 330, 150, 40, 'snow'));
      plats.push(createPlat(10700 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(11000 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(11300 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(11600 * S, 650, 1000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(12800, 650, 500, 4, S));
      plats.push(createPlat(13800 * S, 650, 1400 * S, 40, 'snow'));
      plats.push(createPlat(15600 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(15900 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(16200 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(16500 * S, 330, 150, 40, 'snow'));
      plats.push(createPlat(16900 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(17200 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(17500 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(17800 * S, 650, 1200 * S, 40, 'snow'));
      plats.push(...pipeSection(19000, 650, 5, S));
      plats.push(createPlat(21800 * S, 650, 2000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(24000, 650, 600, 5, S));
      plats.push(createPlat(25300 * S, 650, 1200 * S, 40, 'snow'));
      plats.push(createPlat(26900 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(27200 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(27500 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(27800 * S, 330, 120, 28, 'platform_hard'));
      plats.push(createPlat(28100 * S, 250, 150, 40, 'snow'));
      plats.push(createPlat(28500 * S, 330, 120, 28, 'platform_hard'));
      plats.push(createPlat(28800 * S, 410, 120, 28, 'platform_medium'));
      plats.push(createPlat(29100 * S, 490, 120, 28, 'platform_easy'));
      plats.push(createPlat(29400 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(29700 * S, 650, 1000 * S, 40, 'snow'));
      plats.push(createPlat(31400 * S, 650, 2000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(33600, 650, 600, 5, S));
      plats.push(createPlat(35000 * S, 650, 1500 * S, 40, 'snow'));
      plats.push(...pipeSection(36500, 650, 6, S));
      plats.push(createPlat(39500 * S, 650, 2500 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.476;
      const coins: any[] = [];
      for (let x = 300 * S; x < 3500 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 3700 * S; x < 5000 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 7200 * S; x < 9000 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(9400 * S, 520), createCoin(9700 * S, 440), createCoin(10000 * S, 360), createCoin(10300 * S, 280));
      coins.push(createCoin(10700 * S, 360), createCoin(11000 * S, 440), createCoin(11300 * S, 520));
      for (let x = 11600 * S; x < 12600 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 13800 * S; x < 15200 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(15600 * S, 520), createCoin(15900 * S, 440), createCoin(16200 * S, 360), createCoin(16500 * S, 280));
      coins.push(createCoin(16900 * S, 360), createCoin(17200 * S, 440), createCoin(17500 * S, 520));
      for (let x = 17800 * S; x < 19000 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 21800 * S; x < 23800 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 25300 * S; x < 26500 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(26900 * S, 520), createCoin(27200 * S, 440), createCoin(27500 * S, 360), createCoin(27800 * S, 280), createCoin(28100 * S, 200));
      coins.push(createCoin(28500 * S, 280), createCoin(28800 * S, 360), createCoin(29100 * S, 440), createCoin(29400 * S, 520));
      for (let x = 29700 * S; x < 30700 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 31400 * S; x < 33400 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 35000 * S; x < 36500 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 39500 * S; x < 42000 * S; x += 100 * S) coins.push(createCoin(x, 600));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.476;
      return [
        createQB(1200 * S, 580, 'mushroom'),
        createQB(2800 * S, 500, 'coin'),
        createQB(4200 * S, 580, 'mushroom'),
        createQB(5300 * S, 580, 'flower'),
        createQB(7700 * S, 580, 'star'),
        createQB(9300 * S, 580, 'mushroom'),
        createQB(10500 * S, 250, 'flower'),
        createQB(12000 * S, 580, 'coin'),
        createQB(13200 * S, 580, 'mushroom'),
        createQB(14800 * S, 580, 'star'),
        createQB(16600 * S, 250, 'mushroom'),
        createQB(18000 * S, 580, 'coin'),
        createQB(19200 * S, 580, 'mushroom'),
        createQB(21000 * S, 580, 'star'),
        createQB(23000 * S, 580, 'flower'),
        createQB(25500 * S, 580, 'mushroom'),
        createQB(27000 * S, 580, 'coin'),
        createQB(28200 * S, 170, 'mushroom'),
        createQB(29800 * S, 580, 'flower'),
        createQB(31000 * S, 580, 'mushroom'),
        createQB(33000 * S, 580, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.476;
      return [
        createEnemy(800 * S, 610, 'goomba'), createEnemy(1300 * S, 610, 'robot'),
        createEnemy(1800 * S, 610, 'spiny'), createEnemy(2300 * S, 610, 'goomba'),
        createEnemy(2800 * S, 610, 'koopa'), createEnemy(3300 * S, 610, 'crab'),
        createEnemy(3900 * S, 610, 'goomba'), createEnemy(4400 * S, 610, 'robot'),
        createEnemy(4900 * S, 570, 'piranha'), createEnemy(5400 * S, 570, 'piranha'),
        createEnemy(5900 * S, 570, 'piranha'), createEnemy(6400 * S, 570, 'piranha'),
        createEnemy(6900 * S, 570, 'piranha'), createEnemy(7500 * S, 610, 'goomba'),
        createEnemy(8000 * S, 610, 'spiny'), createEnemy(8500 * S, 610, 'crab'),
        createEnemy(9100 * S, 610, 'koopa'), createEnemy(9600 * S, 610, 'goomba'),
        createEnemy(10200 * S, 610, 'robot'), createEnemy(10800 * S, 610, 'spiny'),
        createEnemy(11400 * S, 610, 'goomba'), createEnemy(12000 * S, 610, 'crab'),
        createEnemy(12600 * S, 610, 'koopa'), createEnemy(13200 * S, 610, 'goomba'),
        createEnemy(13800 * S, 610, 'robot'), createEnemy(14400 * S, 610, 'spiny'),
        createEnemy(15000 * S, 610, 'goomba'), createEnemy(15600 * S, 610, 'crab'),
        createEnemy(16200 * S, 610, 'koopa'),
      ];
    })(),
    decorations: (() => {
      const S = 0.476;
      const decos: any[] = [];
      for (let x = 300 * S; x < 42000 * S; x += 2000 * S) {
        decos.push(createDeco(x, 610, x % (4000 * S) === 300 * S ? 'snowflake' : (x % (4000 * S) === 1100 * S ? 'icicle' : 'rock')));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 19492, y: 608 },
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
      plats.push(...pipeSection(5900, 600, 6, S));
      plats.push(createPlat(8200 * S, 600, 2000 * S, 40, 'snow'));
      plats.push(createPlat(10600 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(10900 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(11200 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(11500 * S, 280, 150, 40, 'snow'));
      plats.push(createPlat(11900 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(12200 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(12500 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(12800 * S, 600, 1200 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(14200, 600, 600, 5, S));
      plats.push(createPlat(15300 * S, 600, 1500 * S, 40, 'snow'));
      plats.push(createPlat(17200 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(17500 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(17800 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(18100 * S, 280, 150, 40, 'snow'));
      plats.push(createPlat(18500 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(18800 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(19100 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(19400 * S, 600, 1500 * S, 40, 'snow'));
      plats.push(...pipeSection(20900, 600, 6, S));
      plats.push(createPlat(24000 * S, 600, 2500 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(26700, 600, 700, 5, S));
      plats.push(createPlat(28000 * S, 600, 1500 * S, 40, 'snow'));
      plats.push(createPlat(29900 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(30200 * S, 440, 120, 28, 'platform_medium'));
      plats.push(createPlat(30500 * S, 360, 120, 28, 'platform_hard'));
      plats.push(createPlat(30800 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(31100 * S, 200, 150, 40, 'snow'));
      plats.push(createPlat(31500 * S, 280, 120, 28, 'platform_hard'));
      plats.push(createPlat(31800 * S, 360, 120, 28, 'platform_medium'));
      plats.push(createPlat(32100 * S, 440, 120, 28, 'platform_easy'));
      plats.push(createPlat(32400 * S, 520, 120, 28, 'platform_easy'));
      plats.push(createPlat(32700 * S, 600, 1200 * S, 40, 'snow'));
      plats.push(createPlat(34600 * S, 600, 2000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(36800, 600, 600, 5, S));
      plats.push(createPlat(38000 * S, 600, 1800 * S, 40, 'snow'));
      plats.push(...pipeSection(39800, 600, 6, S));
      plats.push(createPlat(42800 * S, 600, 2200 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.444;
      const coins: any[] = [];
      for (let x = 300 * S; x < 4100 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 4300 * S; x < 5900 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 8300 * S; x < 10200 * S; x += 100 * S) coins.push(createCoin(x, 550));
      coins.push(createCoin(10600 * S, 470), createCoin(10900 * S, 390), createCoin(11200 * S, 310), createCoin(11500 * S, 230));
      coins.push(createCoin(11900 * S, 310), createCoin(12200 * S, 390), createCoin(12500 * S, 470));
      for (let x = 12800 * S; x < 14000 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 15300 * S; x < 16800 * S; x += 100 * S) coins.push(createCoin(x, 550));
      coins.push(createCoin(17200 * S, 470), createCoin(17500 * S, 390), createCoin(17800 * S, 310), createCoin(18100 * S, 230));
      coins.push(createCoin(18500 * S, 310), createCoin(18800 * S, 390), createCoin(19100 * S, 470));
      for (let x = 19400 * S; x < 20900 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 24000 * S; x < 26500 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 28000 * S; x < 29500 * S; x += 100 * S) coins.push(createCoin(x, 550));
      coins.push(createCoin(29900 * S, 470), createCoin(30200 * S, 390), createCoin(30500 * S, 310), createCoin(30800 * S, 230), createCoin(31100 * S, 150));
      coins.push(createCoin(31500 * S, 230), createCoin(31800 * S, 310), createCoin(32100 * S, 390), createCoin(32400 * S, 470));
      for (let x = 32700 * S; x < 33900 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 34600 * S; x < 36600 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 38000 * S; x < 39800 * S; x += 100 * S) coins.push(createCoin(x, 550));
      for (let x = 42800 * S; x < 45000 * S; x += 100 * S) coins.push(createCoin(x, 550));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.444;
      return [
        createQB(1500 * S, 530, 'mushroom'),
        createQB(3300 * S, 450, 'coin'),
        createQB(4700 * S, 530, 'mushroom'),
        createQB(6200 * S, 530, 'flower'),
        createQB(8700 * S, 530, 'star'),
        createQB(10400 * S, 530, 'mushroom'),
        createQB(11700 * S, 210, 'flower'),
        createQB(13100 * S, 530, 'coin'),
        createQB(14400 * S, 530, 'mushroom'),
        createQB(16000 * S, 530, 'star'),
        createQB(17300 * S, 530, 'mushroom'),
        createQB(18200 * S, 210, 'flower'),
        createQB(19600 * S, 530, 'coin'),
        createQB(20100 * S, 530, 'mushroom'),
        createQB(22000 * S, 530, 'star'),
        createQB(24500 * S, 530, 'flower'),
        createQB(26200 * S, 530, 'mushroom'),
        createQB(28200 * S, 530, 'coin'),
        createQB(29700 * S, 530, 'mushroom'),
        createQB(31200 * S, 120, 'star'),
        createQB(32900 * S, 530, 'mushroom'),
        createQB(34800 * S, 530, 'flower'),
        createQB(36500 * S, 530, 'mushroom'),
        createQB(38200 * S, 530, 'coin'),
      ];
    })(),
    enemies: (() => {
      const S = 0.444;
      return [
        createEnemy(800 * S, 560, 'goomba'), createEnemy(1300 * S, 560, 'robot'),
        createEnemy(1800 * S, 560, 'spiny'), createEnemy(2400 * S, 560, 'goomba'),
        createEnemy(2900 * S, 560, 'crab'), createEnemy(3500 * S, 560, 'koopa'),
        createEnemy(4100 * S, 560, 'goomba'), createEnemy(4700 * S, 560, 'robot'),
        createEnemy(5300 * S, 560, 'spiny'), createEnemy(5900 * S, 520, 'piranha'),
        createEnemy(6500 * S, 520, 'piranha'), createEnemy(7100 * S, 520, 'piranha'),
        createEnemy(7700 * S, 520, 'piranha'), createEnemy(8300 * S, 520, 'piranha'),
        createEnemy(9000 * S, 560, 'goomba'), createEnemy(9500 * S, 560, 'spiny'),
        createEnemy(10100 * S, 560, 'crab'), createEnemy(10700 * S, 560, 'koopa'),
        createEnemy(11300 * S, 560, 'goomba'), createEnemy(11900 * S, 560, 'robot'),
        createEnemy(12500 * S, 560, 'spiny'), createEnemy(13100 * S, 560, 'goomba'),
        createEnemy(13700 * S, 560, 'crab'), createEnemy(14300 * S, 560, 'koopa'),
        createEnemy(14900 * S, 560, 'goomba'), createEnemy(15500 * S, 560, 'robot'),
        createEnemy(16100 * S, 560, 'spiny'), createEnemy(16700 * S, 560, 'goomba'),
        createEnemy(17300 * S, 560, 'crab'),
      ];
    })(),
    decorations: (() => {
      const S = 0.444;
      const decos: any[] = [];
      for (let x = 300 * S; x < 45000 * S; x += 2200 * S) {
        decos.push(createDeco(x, 560, x % (4400 * S) === 300 * S ? 'snowflake' : (x % (4400 * S) === 1100 * S ? 'icicle' : 'cloud')));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 550 },
    goal: { x: 19480, y: 558 },
    timeBonus: 180,
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
      plats.push(...pipeSection(6800, 650, 7, S));
      plats.push(createPlat(9300 * S, 650, 2200 * S, 40, 'snow'));
      plats.push(createPlat(11900 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(12200 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(12500 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(12800 * S, 330, 150, 40, 'snow'));
      plats.push(createPlat(13200 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(13500 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(13800 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(14100 * S, 650, 1400 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(15700, 650, 700, 5, S));
      plats.push(createPlat(16900 * S, 650, 1800 * S, 40, 'snow'));
      plats.push(createPlat(19100 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(19400 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(19700 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(20000 * S, 330, 150, 40, 'snow'));
      plats.push(createPlat(20400 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(20700 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(21000 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(21300 * S, 650, 1600 * S, 40, 'snow'));
      plats.push(...pipeSection(22900, 650, 6, S));
      plats.push(createPlat(26500 * S, 650, 2800 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(29500, 650, 800, 6, S));
      plats.push(createPlat(31000 * S, 650, 1600 * S, 40, 'snow'));
      plats.push(createPlat(33000 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(33300 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(33600 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(33900 * S, 330, 120, 28, 'platform_hard'));
      plats.push(createPlat(34200 * S, 250, 150, 40, 'snow'));
      plats.push(createPlat(34600 * S, 330, 120, 28, 'platform_hard'));
      plats.push(createPlat(34900 * S, 410, 120, 28, 'platform_medium'));
      plats.push(createPlat(35200 * S, 490, 120, 28, 'platform_easy'));
      plats.push(createPlat(35500 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(35800 * S, 650, 1400 * S, 40, 'snow'));
      plats.push(createPlat(37900 * S, 650, 2200 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(40300, 650, 700, 5, S));
      plats.push(createPlat(41700 * S, 650, 1800 * S, 40, 'snow'));
      plats.push(...pipeSection(43500, 650, 7, S));
      plats.push(createPlat(46800 * S, 650, 1200 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.417;
      const coins: any[] = [];
      for (let x = 300 * S; x < 4800 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 5000 * S; x < 6800 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 9400 * S; x < 11700 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(11900 * S, 520), createCoin(12200 * S, 440), createCoin(12500 * S, 360), createCoin(12800 * S, 280));
      coins.push(createCoin(13200 * S, 360), createCoin(13500 * S, 440), createCoin(13800 * S, 520));
      for (let x = 14100 * S; x < 15500 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 16900 * S; x < 18700 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(19100 * S, 520), createCoin(19400 * S, 440), createCoin(19700 * S, 360), createCoin(20000 * S, 280));
      coins.push(createCoin(20400 * S, 360), createCoin(20700 * S, 440), createCoin(21000 * S, 520));
      for (let x = 21300 * S; x < 22900 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 26500 * S; x < 29300 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 31000 * S; x < 32600 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(33000 * S, 520), createCoin(33300 * S, 440), createCoin(33600 * S, 360), createCoin(33900 * S, 280), createCoin(34200 * S, 200));
      coins.push(createCoin(34600 * S, 280), createCoin(34900 * S, 360), createCoin(35200 * S, 440), createCoin(35500 * S, 520));
      for (let x = 35800 * S; x < 37200 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 37900 * S; x < 40100 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 41700 * S; x < 43500 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 46800 * S; x < 48000 * S; x += 100 * S) coins.push(createCoin(x, 600));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.417;
      return [
        createQB(1800 * S, 580, 'mushroom'),
        createQB(3800 * S, 500, 'coin'),
        createQB(5500 * S, 580, 'mushroom'),
        createQB(7200 * S, 580, 'flower'),
        createQB(10000 * S, 580, 'star'),
        createQB(11600 * S, 580, 'mushroom'),
        createQB(13000 * S, 250, 'flower'),
        createQB(14400 * S, 580, 'coin'),
        createQB(15800 * S, 580, 'mushroom'),
        createQB(17600 * S, 580, 'star'),
        createQB(18900 * S, 580, 'mushroom'),
        createQB(20100 * S, 250, 'flower'),
        createQB(21500 * S, 580, 'coin'),
        createQB(22100 * S, 580, 'mushroom'),
        createQB(24000 * S, 580, 'star'),
        createQB(26500 * S, 580, 'flower'),
        createQB(29000 * S, 580, 'mushroom'),
        createQB(31000 * S, 580, 'coin'),
        createQB(32800 * S, 580, 'mushroom'),
        createQB(34300 * S, 170, 'star'),
        createQB(36000 * S, 580, 'mushroom'),
        createQB(37800 * S, 580, 'flower'),
        createQB(39500 * S, 580, 'mushroom'),
        createQB(41200 * S, 580, 'coin'),
        createQB(43000 * S, 580, 'mushroom'),
        createQB(45000 * S, 580, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.417;
      return [
        createEnemy(900 * S, 610, 'goomba'), createEnemy(1500 * S, 610, 'robot'),
        createEnemy(2100 * S, 610, 'spiny'), createEnemy(2800 * S, 610, 'goomba'),
        createEnemy(3400 * S, 610, 'crab'), createEnemy(4100 * S, 610, 'koopa'),
        createEnemy(4800 * S, 610, 'goomba'), createEnemy(5500 * S, 610, 'robot'),
        createEnemy(6200 * S, 570, 'piranha'), createEnemy(6800 * S, 570, 'piranha'),
        createEnemy(7400 * S, 570, 'piranha'), createEnemy(8000 * S, 570, 'piranha'),
        createEnemy(8600 * S, 570, 'piranha'), createEnemy(9200 * S, 570, 'piranha'),
        createEnemy(9800 * S, 570, 'piranha'), createEnemy(10500 * S, 610, 'goomba'),
        createEnemy(11100 * S, 610, 'spiny'), createEnemy(11800 * S, 610, 'crab'),
        createEnemy(12500 * S, 610, 'koopa'), createEnemy(13200 * S, 610, 'goomba'),
        createEnemy(13900 * S, 610, 'robot'), createEnemy(14600 * S, 610, 'spiny'),
        createEnemy(15300 * S, 610, 'goomba'), createEnemy(16000 * S, 610, 'crab'),
        createEnemy(16700 * S, 610, 'koopa'), createEnemy(17400 * S, 610, 'goomba'),
        createEnemy(18100 * S, 610, 'robot'), createEnemy(18800 * S, 610, 'spiny'),
        createEnemy(19500 * S, 610, 'goomba'),
      ];
    })(),
    decorations: (() => {
      const S = 0.417;
      const decos: any[] = [];
      for (let x = 300 * S; x < 48000 * S; x += 2400 * S) {
        decos.push(createDeco(x, 610, x % (4800 * S) === 300 * S ? 'snowflake' : (x % (4800 * S) === 1500 * S ? 'icicle' : 'rock')));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 19516, y: 608 },
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
      plats.push(...pipeSection(7500, 650, 8, S));
      plats.push(createPlat(10300 * S, 650, 2500 * S, 40, 'snow'));
      plats.push(createPlat(13200 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(13500 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(13800 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(14100 * S, 330, 150, 40, 'snow'));
      plats.push(createPlat(14500 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(14800 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(15100 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(15400 * S, 650, 1600 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(17200, 650, 800, 6, S));
      plats.push(createPlat(18500 * S, 650, 2000 * S, 40, 'snow'));
      plats.push(createPlat(20900 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(21200 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(21500 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(21800 * S, 330, 150, 40, 'snow'));
      plats.push(createPlat(22200 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(22500 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(22800 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(23100 * S, 650, 1800 * S, 40, 'snow'));
      plats.push(...pipeSection(24900, 650, 7, S));
      plats.push(createPlat(28500 * S, 650, 3000 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(31700, 650, 900, 6, S));
      plats.push(createPlat(33300 * S, 650, 2000 * S, 40, 'snow'));
      plats.push(createPlat(35700 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(36000 * S, 490, 120, 28, 'platform_medium'));
      plats.push(createPlat(36300 * S, 410, 120, 28, 'platform_hard'));
      plats.push(createPlat(36600 * S, 330, 120, 28, 'platform_hard'));
      plats.push(createPlat(36900 * S, 250, 150, 40, 'snow'));
      plats.push(createPlat(37300 * S, 330, 120, 28, 'platform_hard'));
      plats.push(createPlat(37600 * S, 410, 120, 28, 'platform_medium'));
      plats.push(createPlat(37900 * S, 490, 120, 28, 'platform_easy'));
      plats.push(createPlat(38200 * S, 570, 120, 28, 'platform_easy'));
      plats.push(createPlat(38500 * S, 650, 1600 * S, 40, 'snow'));
      plats.push(createPlat(40800 * S, 650, 2500 * S, 40, 'snow'));
      plats.push(...gapWithPlatforms(43500, 650, 800, 6, S));
      plats.push(createPlat(45000 * S, 650, 2000 * S, 40, 'snow'));
      plats.push(...pipeSection(47000, 650, 8, S));
      plats.push(createPlat(49500 * S, 650, 500 * S, 40, 'snow'));
      return plats;
    })(),
    coins: (() => {
      const S = 0.4;
      const coins: any[] = [];
      for (let x = 300 * S; x < 5300 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 5600 * S; x < 7500 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 10300 * S; x < 12800 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(13200 * S, 520), createCoin(13500 * S, 440), createCoin(13800 * S, 360), createCoin(14100 * S, 280));
      coins.push(createCoin(14500 * S, 360), createCoin(14800 * S, 440), createCoin(15100 * S, 520));
      for (let x = 15400 * S; x < 17000 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 18500 * S; x < 20500 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(20900 * S, 520), createCoin(21200 * S, 440), createCoin(21500 * S, 360), createCoin(21800 * S, 280));
      coins.push(createCoin(22200 * S, 360), createCoin(22500 * S, 440), createCoin(22800 * S, 520));
      for (let x = 23100 * S; x < 24900 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 28500 * S; x < 31500 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 33300 * S; x < 35300 * S; x += 100 * S) coins.push(createCoin(x, 600));
      coins.push(createCoin(35700 * S, 520), createCoin(36000 * S, 440), createCoin(36300 * S, 360), createCoin(36600 * S, 280), createCoin(36900 * S, 200));
      coins.push(createCoin(37300 * S, 280), createCoin(37600 * S, 360), createCoin(37900 * S, 440), createCoin(38200 * S, 520));
      for (let x = 38500 * S; x < 40100 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 40800 * S; x < 43300 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 45000 * S; x < 47000 * S; x += 100 * S) coins.push(createCoin(x, 600));
      for (let x = 49500 * S; x < 50000 * S; x += 100 * S) coins.push(createCoin(x, 600));
      return coins;
    })(),
    questionBlocks: (() => {
      const S = 0.4;
      return [
        createQB(2000 * S, 580, 'mushroom'),
        createQB(4200 * S, 500, 'coin'),
        createQB(6000 * S, 580, 'mushroom'),
        createQB(8000 * S, 580, 'flower'),
        createQB(10500 * S, 580, 'star'),
        createQB(12500 * S, 580, 'mushroom'),
        createQB(14300 * S, 250, 'flower'),
        createQB(15700 * S, 580, 'coin'),
        createQB(17200 * S, 580, 'mushroom'),
        createQB(19200 * S, 580, 'star'),
        createQB(20800 * S, 580, 'mushroom'),
        createQB(21900 * S, 250, 'flower'),
        createQB(23300 * S, 580, 'coin'),
        createQB(24100 * S, 580, 'mushroom'),
        createQB(26000 * S, 580, 'star'),
        createQB(28500 * S, 580, 'flower'),
        createQB(31000 * S, 580, 'mushroom'),
        createQB(33300 * S, 580, 'coin'),
        createQB(35500 * S, 580, 'mushroom'),
        createQB(37000 * S, 170, 'star'),
        createQB(38700 * S, 580, 'mushroom'),
        createQB(40500 * S, 580, 'flower'),
        createQB(42000 * S, 580, 'mushroom'),
        createQB(44200 * S, 580, 'coin'),
        createQB(45500 * S, 580, 'mushroom'),
        createQB(47200 * S, 580, 'star'),
      ];
    })(),
    enemies: (() => {
      const S = 0.4;
      return [
        createEnemy(1000 * S, 610, 'goomba'), createEnemy(1600 * S, 610, 'robot'),
        createEnemy(2200 * S, 610, 'spiny'), createEnemy(2900 * S, 610, 'goomba'),
        createEnemy(3500 * S, 610, 'crab'), createEnemy(4200 * S, 610, 'koopa'),
        createEnemy(4900 * S, 610, 'goomba'), createEnemy(5600 * S, 610, 'robot'),
        createEnemy(6300 * S, 570, 'piranha'), createEnemy(6900 * S, 570, 'piranha'),
        createEnemy(7500 * S, 570, 'piranha'), createEnemy(8100 * S, 570, 'piranha'),
        createEnemy(8700 * S, 570, 'piranha'), createEnemy(9300 * S, 570, 'piranha'),
        createEnemy(9900 * S, 570, 'piranha'), createEnemy(10600 * S, 570, 'piranha'),
        createEnemy(11300 * S, 610, 'goomba'), createEnemy(11900 * S, 610, 'spiny'),
        createEnemy(12600 * S, 610, 'crab'), createEnemy(13300 * S, 610, 'koopa'),
        createEnemy(14000 * S, 610, 'goomba'), createEnemy(14700 * S, 610, 'robot'),
        createEnemy(15400 * S, 610, 'spiny'), createEnemy(16100 * S, 610, 'goomba'),
        createEnemy(16800 * S, 610, 'crab'), createEnemy(17500 * S, 610, 'koopa'),
        createEnemy(18200 * S, 610, 'goomba'), createEnemy(18900 * S, 610, 'robot'),
        createEnemy(19600 * S, 610, 'spiny'),
      ];
    })(),
    decorations: (() => {
      const S = 0.4;
      const decos: any[] = [];
      for (let x = 300 * S; x < 50000 * S; x += 2500 * S) {
        decos.push(createDeco(x, 610, x % (5000 * S) === 300 * S ? 'snowflake' : (x % (5000 * S) === 1300 * S ? 'icicle' : 'cloud')));
      }
      return decos;
    })(),
    playerStart: { x: 150, y: 600 },
    goal: { x: 19500, y: 608 },
    timeBonus: 220,
  },
];
