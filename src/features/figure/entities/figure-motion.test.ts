import { describe, expect, it } from "vitest";
import {
  breathDepth,
  calculateBreathScale,
  calculateFigurePose,
  calculateHeadTurnTarget,
  calculateWaveAngle,
  easeHeadTurn,
  maximumHeadTurnRadians,
  restingFigurePose,
  waveDurationSeconds,
  waveSwingRadians,
} from "@/features/figure/entities/figure-motion";

describe("calculateWaveAngle", () => {
  it("rests before the wave starts and once it ends", () => {
    expect(calculateWaveAngle(0)).toBe(0);
    expect(calculateWaveAngle(waveDurationSeconds)).toBe(0);
    expect(calculateWaveAngle(5)).toBe(0);
  });

  it("swings both ways within the swing limit while waving", () => {
    const sampledAngles = Array.from({ length: 120 }, (_, sampleIndex) =>
      calculateWaveAngle((sampleIndex / 120) * waveDurationSeconds),
    );
    expect(Math.max(...sampledAngles)).toBeGreaterThan(0.1);
    expect(Math.min(...sampledAngles)).toBeLessThan(-0.1);
    for (const sampledAngle of sampledAngles) {
      expect(Math.abs(sampledAngle)).toBeLessThanOrEqual(waveSwingRadians);
    }
  });
});

describe("calculateBreathScale", () => {
  it("stays within the breath depth", () => {
    for (let elapsedSeconds = 0; elapsedSeconds < 10; elapsedSeconds += 0.25) {
      const breathScale = calculateBreathScale(elapsedSeconds);
      expect(breathScale).toBeGreaterThanOrEqual(1 - breathDepth);
      expect(breathScale).toBeLessThanOrEqual(1 + breathDepth);
    }
  });
});

describe("calculateHeadTurnTarget", () => {
  it("faces forward when the pointer is centred", () => {
    expect(calculateHeadTurnTarget(0, 0)).toEqual({ yaw: 0, pitch: 0 });
  });

  it("never turns more than 12 degrees in total", () => {
    const farCornerTurn = calculateHeadTurnTarget(3, -3);
    expect(Math.hypot(farCornerTurn.yaw, farCornerTurn.pitch)).toBeCloseTo(
      maximumHeadTurnRadians,
    );
    expect(maximumHeadTurnRadians).toBeCloseTo((12 * Math.PI) / 180);
  });

  it("turns toward the pointer side", () => {
    expect(calculateHeadTurnTarget(0.5, 0).yaw).toBeGreaterThan(0);
    expect(calculateHeadTurnTarget(-0.5, 0).yaw).toBeLessThan(0);
  });
});

describe("easeHeadTurn", () => {
  it("moves part of the way and settles on the target", () => {
    const targetTurn = { yaw: 0.2, pitch: -0.1 };
    const firstStep = easeHeadTurn({ yaw: 0, pitch: 0 }, targetTurn, 1 / 60);
    expect(firstStep.yaw).toBeGreaterThan(0);
    expect(firstStep.yaw).toBeLessThan(0.2);
    const settledTurn = easeHeadTurn(firstStep, targetTurn, 10);
    expect(settledTurn.yaw).toBeCloseTo(0.2);
    expect(settledTurn.pitch).toBeCloseTo(-0.1);
  });
});

describe("calculateFigurePose", () => {
  it("holds the resting pose under reduced motion", () => {
    expect(calculateFigurePose(0.4, { yaw: 0.2, pitch: 0.1 }, true)).toEqual(
      restingFigurePose,
    );
  });

  it("waves, breathes and follows the pointer otherwise", () => {
    const figurePose = calculateFigurePose(
      0.4,
      { yaw: 0.2, pitch: 0.1 },
      false,
    );
    expect(figurePose.waveAngle).not.toBe(0);
    expect(figurePose.breathScale).not.toBe(1);
    expect(figurePose.headYaw).toBe(0.2);
    expect(figurePose.headPitch).toBe(0.1);
  });
});
