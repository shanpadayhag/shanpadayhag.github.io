import { expect, test } from "vitest";
import {
  calculateFaceSurfaceDepth,
  calculateJawTaper,
  headHeightScale,
  wrapPositionsOntoFace,
} from "@/features/figure/entities/face-surface";

test("the centre of the face sits one head radius forward", () => {
  expect(calculateFaceSurfaceDepth(0, 0)).toBeCloseTo(1);
});

test("the face curves back toward the sides and the crown", () => {
  expect(calculateFaceSurfaceDepth(0.5, 0)).toBeLessThan(
    calculateFaceSurfaceDepth(0.2, 0),
  );
  expect(calculateFaceSurfaceDepth(0, 0.8)).toBeLessThan(
    calculateFaceSurfaceDepth(0, 0.2),
  );
});

test("a point outside the head silhouette has no depth", () => {
  expect(calculateFaceSurfaceDepth(1.2, 0)).toBe(0);
  expect(calculateFaceSurfaceDepth(0, headHeightScale + 0.1)).toBe(0);
});

test("the jaw narrows only below the cheeks", () => {
  expect(calculateJawTaper(0)).toBe(1);
  expect(calculateJawTaper(-0.4)).toBe(1);
  expect(calculateJawTaper(-0.8)).toBeLessThan(1);
  expect(calculateJawTaper(-1.05)).toBeLessThan(calculateJawTaper(-0.8));
});

test("wrapping keeps x and y and lifts each vertex onto the face", () => {
  const flatPositions = new Float32Array([0, 0, 0, 0.3, -0.4, 0.01]);
  const wrappedPositions = wrapPositionsOntoFace(flatPositions, 0.02);
  expect(wrappedPositions[0]).toBe(0);
  expect(wrappedPositions[2]).toBeCloseTo(1.02);
  expect(wrappedPositions[3]).toBeCloseTo(0.3);
  expect(wrappedPositions[4]).toBeCloseTo(-0.4);
  expect(wrappedPositions[5]).toBeCloseTo(
    calculateFaceSurfaceDepth(0.3, -0.4) + 0.03,
  );
});
