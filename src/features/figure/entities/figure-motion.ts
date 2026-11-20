export const waveDurationSeconds = 1.2;
export const waveSwingRadians = 0.32;
export const waveSwingCount = 2.5;
export const breathPeriodSeconds = 4.2;
export const breathDepth = 0.012;
export const maximumHeadTurnRadians = (12 * Math.PI) / 180;
export const headTurnResponseRate = 6;

export type FigurePose = {
  waveAngle: number;
  breathScale: number;
  headYaw: number;
  headPitch: number;
};

export type HeadTurn = { yaw: number; pitch: number };

export const restingFigurePose: FigurePose = {
  waveAngle: 0,
  breathScale: 1,
  headYaw: 0,
  headPitch: 0,
};

export function calculateWaveAngle(elapsedSeconds: number) {
  if (elapsedSeconds <= 0 || elapsedSeconds >= waveDurationSeconds) return 0;
  const waveProgress = elapsedSeconds / waveDurationSeconds;
  const swingEnvelope = Math.sin(Math.PI * waveProgress);
  return (
    waveSwingRadians *
    swingEnvelope *
    Math.sin(2 * Math.PI * waveSwingCount * waveProgress)
  );
}

export function calculateBreathScale(elapsedSeconds: number) {
  return (
    1 +
    breathDepth * Math.sin((2 * Math.PI * elapsedSeconds) / breathPeriodSeconds)
  );
}

export function calculateHeadTurnTarget(
  pointerOffsetX: number,
  pointerOffsetY: number,
): HeadTurn {
  const turnLength = Math.hypot(pointerOffsetX, pointerOffsetY);
  const turnScale = turnLength > 1 ? 1 / turnLength : 1;
  return {
    yaw: pointerOffsetX * turnScale * maximumHeadTurnRadians,
    pitch: pointerOffsetY * turnScale * maximumHeadTurnRadians,
  };
}

export function easeHeadTurn(
  currentTurn: HeadTurn,
  targetTurn: HeadTurn,
  deltaSeconds: number,
): HeadTurn {
  const followFraction = 1 - Math.exp(-headTurnResponseRate * deltaSeconds);
  return {
    yaw: currentTurn.yaw + (targetTurn.yaw - currentTurn.yaw) * followFraction,
    pitch:
      currentTurn.pitch +
      (targetTurn.pitch - currentTurn.pitch) * followFraction,
  };
}

export function calculateFigurePose(
  elapsedSeconds: number,
  headTurn: HeadTurn,
  isReducedMotion: boolean,
): FigurePose {
  if (isReducedMotion) return restingFigurePose;
  return {
    waveAngle: calculateWaveAngle(elapsedSeconds),
    breathScale: calculateBreathScale(elapsedSeconds),
    headYaw: headTurn.yaw,
    headPitch: headTurn.pitch,
  };
}
