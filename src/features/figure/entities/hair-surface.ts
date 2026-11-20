import {
  calculateJawTaper,
  headHeightScale,
} from "@/features/figure/entities/face-surface";

export type HairSurfacePoint = { x: number; y: number; z: number };

export function calculateHairlineHeight(azimuthRadians: number) {
  return (
    0.21 +
    0.62 * Math.cos(azimuthRadians) -
    0.07 * Math.cos(2 * azimuthRadians) +
    0.02 * Math.sin(9 * azimuthRadians + 1)
  );
}

export function smoothStep(edgeStart: number, edgeEnd: number, value: number) {
  const progress = Math.min(
    Math.max((value - edgeStart) / (edgeEnd - edgeStart), 0),
    1,
  );
  return progress * progress * (3 - 2 * progress);
}

function calculatePompadourLift(azimuthRadians: number, coverProgress: number) {
  const frontWeight = Math.exp(-((azimuthRadians / 1.05) ** 2));
  const heightWeight = Math.exp(-(((coverProgress - 0.3) / 0.24) ** 2));
  return 0.3 * frontWeight * heightWeight;
}

function calculateCombedGrooves(azimuthRadians: number, coverProgress: number) {
  const frontWeight = Math.exp(-((azimuthRadians / 1.4) ** 2));
  const grooveWave = Math.sin(15 * azimuthRadians + 3 * coverProgress);
  const grooveFade = smoothStep(0.08, 0.3, coverProgress);
  return 0.026 * frontWeight * grooveFade * grooveWave * Math.abs(grooveWave);
}

function calculateMessyRipple(azimuthRadians: number, coverProgress: number) {
  return (
    0.045 *
    smoothStep(0.25, 0.7, coverProgress) *
    Math.sin(7 * azimuthRadians + 5 * coverProgress) *
    Math.cos(6 * coverProgress - 3 * azimuthRadians)
  );
}

export function calculateHairThickness(
  azimuthRadians: number,
  coverProgress: number,
) {
  const edgeTaper = smoothStep(0, 0.06, coverProgress);
  return (
    1.022 +
    edgeTaper *
      (0.05 +
        0.16 * smoothStep(0.05, 0.6, coverProgress) +
        calculatePompadourLift(azimuthRadians, coverProgress) +
        calculateMessyRipple(azimuthRadians, coverProgress) +
        calculateCombedGrooves(azimuthRadians, coverProgress))
  );
}

export function calculateHairSurfacePoint(
  azimuthRadians: number,
  coverProgress: number,
): HairSurfacePoint {
  const hairlineHeight = calculateHairlineHeight(azimuthRadians);
  const hairlinePolarAngle = Math.acos(
    Math.min(Math.max(hairlineHeight / headHeightScale, -1), 1),
  );
  const polarAngle = hairlinePolarAngle * (1 - coverProgress);
  const headY = Math.cos(polarAngle) * headHeightScale;
  const horizontalRadius = Math.sin(polarAngle) * calculateJawTaper(headY);
  const hairThickness = calculateHairThickness(azimuthRadians, coverProgress);
  return {
    x: Math.sin(azimuthRadians) * horizontalRadius * hairThickness,
    y: headY * hairThickness,
    z: Math.cos(azimuthRadians) * horizontalRadius * hairThickness,
  };
}
