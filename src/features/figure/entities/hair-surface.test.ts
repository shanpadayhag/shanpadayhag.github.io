import { describe, expect, it } from "vitest";
import {
  calculateHairSurfacePoint,
  calculateHairThickness,
  calculateHairlineHeight,
  smoothStep,
} from "@/features/figure/entities/hair-surface";

describe("calculateHairlineHeight", () => {
  it("sits highest at the forehead, lower over the ears and lowest at the nape", () => {
    const foreheadHeight = calculateHairlineHeight(0);
    const earHeight = calculateHairlineHeight(Math.PI / 2);
    const napeHeight = calculateHairlineHeight(Math.PI);
    expect(foreheadHeight).toBeGreaterThan(earHeight);
    expect(earHeight).toBeGreaterThan(napeHeight);
  });

  it("keeps the ears clear of hair", () => {
    expect(calculateHairlineHeight(Math.PI / 2)).toBeGreaterThan(0.2);
    expect(calculateHairlineHeight(-Math.PI / 2)).toBeGreaterThan(0.2);
  });
});

describe("smoothStep", () => {
  it("clamps outside the edges and eases between them", () => {
    expect(smoothStep(0, 1, -1)).toBe(0);
    expect(smoothStep(0, 1, 2)).toBe(1);
    expect(smoothStep(0, 1, 0.5)).toBeCloseTo(0.5);
  });
});

describe("calculateHairThickness", () => {
  it("tapers to sit just off the skin at the hairline", () => {
    expect(calculateHairThickness(0, 0)).toBeCloseTo(1.022);
  });

  it("lifts the front higher than the back", () => {
    expect(calculateHairThickness(0, 0.3)).toBeGreaterThan(
      calculateHairThickness(Math.PI, 0.3),
    );
  });
});

describe("calculateHairSurfacePoint", () => {
  it("starts on the hairline and ends at the crown", () => {
    const hairlinePoint = calculateHairSurfacePoint(0, 0);
    expect(hairlinePoint.y / 1.022).toBeCloseTo(calculateHairlineHeight(0));
    const crownPoint = calculateHairSurfacePoint(0, 1);
    expect(crownPoint.x).toBeCloseTo(0);
    expect(crownPoint.z).toBeCloseTo(0);
    expect(crownPoint.y).toBeGreaterThan(1.08);
  });
});
