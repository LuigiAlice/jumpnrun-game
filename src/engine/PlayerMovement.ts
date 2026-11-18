/** Player controls in game-time milliseconds; independent of Phaser and the renderer. */
export const PLAYER_MOVEMENT = {
  walkSpeed: 300,
  runSpeed: 400,
  acceleration: 1800,
  braking: 1800,
  turnBraking: 2400,
  jumpVelocity: -900,
  jumpCutVelocity: -360,
  coyoteMs: 90,
  bufferMs: 120,
} as const;

export type GroundSurface = 'normal' | 'ice' | 'snow';

/** Direct controls on normal terrain and in the air; inertia only while standing on ice. */
export function stepHorizontalVelocity(
  velocity: number,
  direction: -1 | 0 | 1,
  sprinting: boolean,
  grounded: boolean,
  surface: GroundSurface,
  deltaMs: number,
): number {
  const target = direction * (sprinting ? PLAYER_MOVEMENT.runSpeed : PLAYER_MOVEMENT.walkSpeed);
  // Snow and the rest of the ice biome are ordinary terrain. Only actual ice is slippery.
  if (!grounded || surface !== 'ice') return target;

  const dt = Math.max(0, deltaMs) / 1000;
  if (dt === 0) return velocity;
  if (direction === 0) {
    return velocity * Math.pow(0.96, dt * 60);
  }

  const acceleration = PLAYER_MOVEMENT.acceleration;
  let remaining = dt;
  let next = velocity;
  if (next * direction < 0) {
    const reverseTime = Math.abs(next) / PLAYER_MOVEMENT.turnBraking;
    if (remaining <= reverseTime) {
      return next + direction * PLAYER_MOVEMENT.turnBraking * remaining;
    }
    remaining -= reverseTime;
    next = 0;
  }
  // Ice alone decelerates toward walking speed when sprint is released.
  const rate = Math.abs(next) > Math.abs(target) ? PLAYER_MOVEMENT.braking : acceleration;
  return next + Math.sign(target - next) * Math.min(Math.abs(target - next), rate * remaining);
}

export interface JumpState {
  wasDown: boolean;
  sinceGrounded: number;
  sincePressed: number;
  consumed: boolean;
  ownJump: boolean;
}

export function createJumpState(): JumpState {
  return { wasDown: false, sinceGrounded: Infinity, sincePressed: Infinity, consumed: false, ownJump: false };
}

export interface JumpInput {
  grounded: boolean;
  jumpDown: boolean;
  velocityY: number;
  deltaMs: number;
  /** Pipe entry, swimming or another mode owns vertical control this frame. */
  suppressed?: boolean;
  /** Springs/stomps own their launch; releasing jump must not shorten them. */
  externalLaunch?: boolean;
}

/** Edge-triggered jump with short landing buffer and ledge grace, and a single release cut. */
export function stepJump(state: JumpState, input: JumpInput): {
  state: JumpState;
  velocityY: number;
  jumped: boolean;
} {
  const dt = Math.max(0, input.deltaMs);
  const next = { ...state, sinceGrounded: state.sinceGrounded + dt, sincePressed: state.sincePressed + dt };
  let velocityY = input.velocityY;
  const pressed = input.jumpDown && !state.wasDown;
  next.wasDown = input.jumpDown;
  if (input.suppressed || input.externalLaunch) {
    next.ownJump = false;
    next.sincePressed = Infinity;
    next.sinceGrounded = Infinity;
    next.consumed = true;
    return { state: next, velocityY, jumped: false };
  }
  // Arcade can retain blocked.down on the launch frame. An upward body is not a landing.
  if (input.grounded && velocityY >= 0) {
    next.sinceGrounded = 0;
    next.consumed = false;
    next.ownJump = false;
  }
  if (pressed) next.sincePressed = 0;
  let jumped = false;
  if (!next.consumed && next.sinceGrounded <= PLAYER_MOVEMENT.coyoteMs && next.sincePressed <= PLAYER_MOVEMENT.bufferMs) {
    velocityY = PLAYER_MOVEMENT.jumpVelocity;
    next.consumed = true;
    next.ownJump = true;
    next.sincePressed = Infinity;
    jumped = true;
  }
  if (next.ownJump && !input.jumpDown && velocityY < 0) {
    velocityY = Math.max(velocityY, PLAYER_MOVEMENT.jumpCutVelocity);
    next.ownJump = false;
  }
  if (velocityY >= 0) next.ownJump = false;
  return { state: next, velocityY, jumped };
}
