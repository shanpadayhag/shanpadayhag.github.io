import { describe, expect, it } from "vitest";
import {
  advanceMarqueeOffset,
  calculateRevealProgress,
  calculateScrollVelocityFactor,
  calculateWordOpacity,
  marqueeCopyCount,
  revealMinimumOpacity,
  smoothTowards,
  wrapMarqueeOffset,
} from "@/features/portfolio/entities/scroll-motion";

describe("calculateRevealProgress", () => {
  it("starts when the top reaches 85% of the viewport", () => {
    expect(calculateRevealProgress(850, 200, 1000)).toBe(0);
    expect(calculateRevealProgress(900, 200, 1000)).toBe(0);
  });

  it("finishes when the bottom reaches half the viewport", () => {
    expect(calculateRevealProgress(300, 200, 1000)).toBe(1);
    expect(calculateRevealProgress(0, 200, 1000)).toBe(1);
  });

  it("is halfway between the two", () => {
    expect(calculateRevealProgress(575, 200, 1000)).toBeCloseTo(0.5);
  });
});

describe("calculateWordOpacity", () => {
  it("dims words not yet reached and fills words passed", () => {
    expect(calculateWordOpacity(0, 0, 4)).toBe(revealMinimumOpacity);
    expect(calculateWordOpacity(1, 3, 4)).toBe(1);
    expect(calculateWordOpacity(0.5, 1, 4)).toBe(1);
    expect(calculateWordOpacity(0.5, 3, 4)).toBe(revealMinimumOpacity);
  });

  it("fades a word in across its own share of the progress", () => {
    expect(calculateWordOpacity(0.125, 0, 4)).toBeCloseTo(
      revealMinimumOpacity + (1 - revealMinimumOpacity) / 2,
    );
  });
});

describe("wrapMarqueeOffset", () => {
  it("keeps the offset within one copy of the text", () => {
    const copyPercent = 100 / marqueeCopyCount;
    for (const offsetPercent of [-130, -40, -25, -3, 0, 12, 99]) {
      const wrappedOffset = wrapMarqueeOffset(offsetPercent);
      expect(wrappedOffset).toBeGreaterThanOrEqual(-copyPercent);
      expect(wrappedOffset).toBeLessThan(0.0001);
    }
  });
});

describe("advanceMarqueeOffset", () => {
  it("moves at the base velocity when the page is still", () => {
    const nextStep = advanceMarqueeOffset(0, 1, -2, 0.5, 0);
    expect(nextStep.offsetPercent).toBe(-1);
    expect(nextStep.movementDirection).toBe(1);
  });

  it("speeds up and follows the scroll direction", () => {
    const scrollingUpStep = advanceMarqueeOffset(0, 1, -2, 0.5, -1);
    expect(scrollingUpStep.movementDirection).toBe(-1);
    expect(scrollingUpStep.offsetPercent).toBe(2);
  });
});

describe("scroll velocity", () => {
  it("maps 1000 px/s to a factor of 5", () => {
    expect(calculateScrollVelocityFactor(1000)).toBe(5);
    expect(calculateScrollVelocityFactor(-200)).toBe(-1);
  });

  it("smooths toward the target", () => {
    expect(smoothTowards(0, 10, 0, 12)).toBe(0);
    expect(smoothTowards(0, 10, 10, 12)).toBeCloseTo(10);
  });
});
