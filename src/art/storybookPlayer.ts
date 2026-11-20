import type Phaser from 'phaser';

type Pose = 'idle' | 'walk1' | 'walk2' | 'jump';
export const STORYBOOK_PLAYER_SIZES = {
  player_idle: [30, 52], player_walk1: [30, 52], player_walk2: [30, 52], player_jump: [30, 52],
  player_big_idle: [36, 52], player_big_walk1: [36, 52], player_big_walk2: [36, 52], player_big_jump: [36, 52],
  player_fire_idle: [36, 52], player_fire_walk1: [36, 52], player_fire_walk2: [36, 52], player_fire_jump: [36, 52],
  fireball: [16, 16],
} as const;

/** Soft, side-facing original adventurer. The art changes; native Arcade geometry does not. */
export function createStorybookPlayer(scene: Phaser.Scene): void {
  const g = scene.add.graphics();
  const ink = 0x644651;
  const skin = 0xffc99f;
  const skinLight = 0xffe2bc;
  const cream = 0xfff8e8;
  const hair = 0x895338;
  const ellipse = (color: number, x: number, y: number, w: number, h: number, alpha = 1) => {
    g.fillStyle(color, alpha); g.fillEllipse(x, y, w, h);
  };
  const rounded = (color: number, x: number, y: number, w: number, h: number, radius: number, alpha = 1) => {
    g.fillStyle(color, alpha); g.fillRoundedRect(x, y, w, h, radius);
  };
  const make = (key: keyof typeof STORYBOOK_PLAYER_SIZES, draw: () => void) => {
    g.clear();
    if (scene.textures.exists(key)) scene.textures.remove(key);
    draw();
    const [w, h] = STORYBOOK_PLAYER_SIZES[key];
    g.generateTexture(key, w, h);
  };

  const drawHero = (key: keyof typeof STORYBOOK_PLAYER_SIZES, big: boolean, fire: boolean, pose: Pose) => make(key, () => {
    const dx = big ? 3 : 0;
    const headTop = big ? 3 : 14;
    const torsoTop = big ? 25 : 35;
    const hipY = big ? 40 : 43;
    const coat = fire ? 0xffefcf : 0xf16d70;
    const coatShade = fire ? 0xe4af89 : 0xc84c65;
    const coatLight = fire ? 0xfffaf0 : 0xffa08e;
    const trousers = fire ? 0xf39d69 : 0x42aeb7;
    const trouserShade = fire ? 0xcc735f : 0x338497;
    const trouserLight = fire ? 0xffc79a : 0x80d1cd;
    const stride = pose === 'walk1' ? -1 : pose === 'walk2' ? 1 : 0;
    const jumping = pose === 'jump';
    const rearFootX = dx + 11 + stride * 3;
    const frontFootX = dx + 20 - stride * 3;
    const rearFootY = jumping ? 45 : pose === 'walk1' ? 47 : 49;
    const frontFootY = pose === 'walk2' ? 47 : 49;

    // Rear sleeve and a softly shaded mitten remain behind the round torso.
    const rearHandY = jumping ? torsoTop + 1 : torsoTop + 7 - stride * 2;
    ellipse(ink, dx + 6.5, rearHandY - 1, 8, 10);
    ellipse(coatShade, dx + 7, rearHandY - 2, 6, 7);
    ellipse(cream, dx + 5.5, rearHandY + 2, 6, 6);
    ellipse(0xe9cdbc, dx + 6.5, rearHandY + 3.2, 3, 2, 0.7);

    // Rounded legs and broad cushion-like boots form readable, alternating strides.
    rounded(ink, rearFootX - 3.8, hipY - 1, 7.5, Math.max(4, rearFootY - hipY + 2), 3);
    rounded(trouserShade, rearFootX - 2.5, hipY, 5, Math.max(3, rearFootY - hipY + 1), 2.4);
    ellipse(ink, rearFootX, rearFootY, 12, 6);
    ellipse(0x9d6a4c, rearFootX + 0.3, rearFootY - 0.7, 10, 4.4);
    ellipse(0xd7a47b, rearFootX + 2, rearFootY - 1.5, 4, 1.5, 0.8);
    rounded(ink, frontFootX - 4, hipY - 1, 8, Math.max(4, frontFootY - hipY + 2), 3.4);
    rounded(trousers, frontFootX - 2.7, hipY, 5.5, Math.max(3, frontFootY - hipY + 1), 2.5);
    ellipse(ink, frontFootX, frontFootY, 12, 6);
    ellipse(0xa76e4d, frontFootX + 0.4, frontFootY - 0.7, 10, 4.4);
    ellipse(0xe1b38b, frontFootX + 2, frontFootY - 1.5, 4.5, 1.5, 0.9);

    // Puffy shirt and curved overalls have colored shadow rather than hard black outlines.
    ellipse(ink, dx + 15.2, torsoTop + (hipY - torsoTop) / 2, 19.5, hipY - torsoTop + 8);
    ellipse(coat, dx + 14.8, torsoTop + (hipY - torsoTop) / 2 - 0.6, 17, hipY - torsoTop + 5.5);
    ellipse(coatLight, dx + 11.8, torsoTop + 2.5, 7, 4, 0.6);
    ellipse(trouserShade, dx + 15.6, hipY - 0.7, 16, 11);
    ellipse(trousers, dx + 14.5, hipY - 1.6, 13.5, 9);
    rounded(trousers, dx + 9, torsoTop - 0.5, 3.8, Math.max(7, hipY - torsoTop), 1.9);
    rounded(trousers, dx + 18, torsoTop - 0.5, 3.8, Math.max(7, hipY - torsoTop), 1.9);
    ellipse(trouserLight, dx + 11.7, hipY - 2.6, 4.5, 5, 0.55);
    for (const x of [11, 20]) {
      ellipse(0xb88a44, dx + x, torsoTop + 5.7, 3, 3);
      ellipse(0xffe59a, dx + x - 0.3, torsoTop + 5.2, 2, 2);
    }

    // Large cheeky face in three-quarter profile, with a projecting round nose.
    ellipse(ink, dx + 14.4, headTop + 11, 23.5, 23);
    ellipse(hair, dx + 9.2, headTop + 11.3, 12, 19);
    ellipse(skin, dx + 16.5, headTop + 11.2, 20.5, 20.5);
    ellipse(skinLight, dx + 15.6, headTop + 8.5, 16, 14.5);
    ellipse(skin, dx + 6.8, headTop + 12.3, 7, 9);
    ellipse(0xf2a884, dx + 6.5, headTop + 12.5, 3.2, 4.6);
    ellipse(hair, dx + 9, headTop + 7, 5, 9);
    ellipse(hair, dx + 8.4, headTop + 11, 3.5, 4.5);
    // Far eye stays smaller, reinforcing the right-facing silhouette when flipX changes.
    ellipse(cream, dx + 15.4, headTop + 8.8, 4.8, 8.1);
    ellipse(0x46657a, dx + 16.5, headTop + 9.4, 2.6, 5.5);
    ellipse(cream, dx + 21.4, headTop + 8.8, 5.7, 8.8);
    ellipse(0x35576e, dx + 22.8, headTop + 9.5, 3, 6);
    ellipse(0xffffff, dx + 22.2, headTop + 7.7, 1.5, 2.3);
    ellipse(0xffffff, dx + 16.1, headTop + 7.6, 1.1, 1.7);
    ellipse(0xe49a79, dx + 25, headTop + 13, 8.5, 6.5);
    ellipse(skinLight, dx + 25, headTop + 12.2, 7.7, 5.4);
    ellipse(0xf38c86, dx + 18.7, headTop + 15.3, 5.5, 3.3, 0.55);
    ellipse(0xac665c, dx + 19.8, headTop + 18, 5, 2.7);
    ellipse(skinLight, dx + 19.3, headTop + 17, 5.5, 2.6);

    // A soft baker-like cap and leaf-shaped badge make this our own tiny adventurer.
    ellipse(ink, dx + 13.5, headTop + 2.8, 25, 11.6);
    ellipse(coatShade, dx + 13.8, headTop + 2.3, 23, 10);
    ellipse(coat, dx + 12.6, headTop + 1.6, 21, 9);
    ellipse(coatLight, dx + 9.3, headTop, 10, 3, 0.75);
    ellipse(ink, dx + 20, headTop + 5.5, 19, 5.4);
    ellipse(coat, dx + 19.6, headTop + 5, 18, 3.7);
    ellipse(coatLight, dx + 18.6, headTop + 4.2, 14, 1.2, 0.75);
    ellipse(cream, dx + 16.6, headTop + 1.6, 4, 4.8);
    ellipse(trousers, dx + 16.8, headTop + 1.7, 1.6, 3);

    const handY = jumping ? headTop + 2 : torsoTop + 7 + stride * 2;
    ellipse(ink, dx + 25.3, handY, 8.2, 9);
    ellipse(coat, dx + 24, handY + 2.5, 6.5, 7);
    ellipse(cream, dx + 26, handY - 0.8, 7, 6.4);
    ellipse(0xffffff, dx + 25.1, handY - 2.1, 3.7, 2.3, 0.9);
    ellipse(0xe9cdbc, dx + 27, handY + 0.9, 3.7, 1.6, 0.55);
  });

  for (const pose of ['idle', 'walk1', 'walk2', 'jump'] as const) {
    drawHero(`player_${pose}`, false, false, pose);
    drawHero(`player_big_${pose}`, true, false, pose);
    drawHero(`player_fire_${pose}`, true, true, pose);
  }
  make('fireball', () => {
    ellipse(0xf68e6d, 8, 8, 16, 16, 0.18);
    ellipse(0xf7ad62, 8, 8, 13, 13, 0.45);
    ellipse(0xffd980, 8, 8, 10, 10);
    ellipse(0xfff5c4, 6.7, 6.5, 5.5, 5.5);
    ellipse(0xffffff, 6, 5.8, 2.8, 2.8, 0.85);
  });
  g.destroy();
}
