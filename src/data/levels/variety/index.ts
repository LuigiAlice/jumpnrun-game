import type { LevelData } from '../index';
import { rewriteNatureLevel } from './nature';
import { rewriteChallengeLevel } from './challenge';
import { rewriteVerticalLevel } from './vertical';

/** The identity is carried by authored main-route geometry, not by optional overlays. */
export const LEVEL_IDENTITIES: Readonly<Record<number, { shape: string; idea: string }>> = {
  8: { shape: 'valley', idea: 'In die Wüstenkluft hinab und zur Oase hinauf' },
  14: { shape: 'grotto', idea: 'Zwischen Korallenbecken und Luftgalerien wechseln' },
  20: { shape: 'ice-fields', idea: 'Auf Eis anlaufen und auf Schnee präzise landen' },
  28: { shape: 'tower', idea: 'Im Zickzack durch den Wolkenturm aufsteigen' },
  32: { shape: 'branching-canopy', idea: 'Waldweg und Baumkronen verbinden' },
  38: { shape: 'rooftops', idea: 'Über Dächer steigen und in Höfe springen' },
  44: { shape: 'coves', idea: 'Sandbuchten und höher gelegene Stege erkunden' },
  50: { shape: 'machine-shaft', idea: 'Über Maschinenetagen die Richtung wechseln' },
  58: { shape: 'crater', idea: 'In den Krater hinab und über den Rand hinaus' },
  62: { shape: 'rooms', idea: 'In verbundenen Spuksälen die Blickrichtung nutzen' },
  74: { shape: 'rock-bands', idea: 'Zwischen langen Felsbändern und Auffangwegen wählen' },
  80: { shape: 'orbit', idea: 'In großen Bögen über breite Orbitinseln springen' },
};

export function applyLevelIdentity(level: LevelData): LevelData {
  if (!LEVEL_IDENTITIES[level.id]) return level;
  const rewritten = rewriteVerticalLevel(rewriteChallengeLevel(rewriteNatureLevel(level)));
  return { ...rewritten, cameraMode: 'bidirectional' };
}
