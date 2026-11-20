import { describe, expect, it } from "vitest";
import {
  calculateSeaGlassOffset,
  seaGlassBobHeight,
  seaGlassPieces,
} from "@/features/figure/entities/sea-glass-motion";

describe("calculateSeaGlassOffset", () => {
  it("has four pieces", () => {
    expect(seaGlassPieces).toHaveLength(4);
  });

  it("drifts with the pointer, nearer pieces further", () => {
    const nearOffset = calculateSeaGlassOffset(2, 0, 1, 0);
    const farOffset = calculateSeaGlassOffset(3, 0, 1, 0);
    expect(nearOffset.x).toBeGreaterThan(farOffset.x);
    expect(farOffset.x).toBeGreaterThan(0);
  });

  it("bobs within its height", () => {
    for (let elapsedSeconds = 0; elapsedSeconds < 12; elapsedSeconds += 0.5) {
      const offset = calculateSeaGlassOffset(0, elapsedSeconds, 0, 0);
      expect(Math.abs(offset.y)).toBeLessThanOrEqual(seaGlassBobHeight);
    }
  });

  it("returns no offset for a piece that doesn't exist", () => {
    expect(calculateSeaGlassOffset(9, 1, 1, 1)).toEqual({
      x: 0,
      y: 0,
      spin: 0,
    });
  });
});
