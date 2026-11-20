export const revealStartViewportFraction = 0.85;
export const revealEndViewportFraction = 0.5;
export const revealMinimumOpacity = 0.18;
export const marqueeCopyCount = 4;
export const scrollVelocitySmoothingRate = 12;

const marqueeWrapStartPercent = -100 / marqueeCopyCount;

function clampToUnit(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

export function calculateRevealProgress(
  elementTop: number,
  elementHeight: number,
  viewportHeight: number,
) {
  const startTop = viewportHeight * revealStartViewportFraction;
  const endTop = viewportHeight * revealEndViewportFraction - elementHeight;
  return clampToUnit((startTop - elementTop) / (startTop - endTop));
}

export function calculateWordOpacity(
  revealProgress: number,
  wordIndex: number,
  wordCount: number,
) {
  const wordStart = wordIndex / wordCount;
  const wordEnd = (wordIndex + 1) / wordCount;
  const wordProgress = clampToUnit(
    (revealProgress - wordStart) / (wordEnd - wordStart),
  );
  return revealMinimumOpacity + (1 - revealMinimumOpacity) * wordProgress;
}

export function wrapMarqueeOffset(offsetPercent: number) {
  const wrapRangePercent = -marqueeWrapStartPercent;
  return (
    ((((offsetPercent - marqueeWrapStartPercent) % wrapRangePercent) +
      wrapRangePercent) %
      wrapRangePercent) +
    marqueeWrapStartPercent
  );
}

export function smoothTowards(
  currentValue: number,
  targetValue: number,
  deltaSeconds: number,
  responseRate: number,
) {
  const followFraction = 1 - Math.exp(-responseRate * deltaSeconds);
  return currentValue + (targetValue - currentValue) * followFraction;
}

export function calculateScrollVelocityFactor(
  scrollVelocityPixelsPerSecond: number,
) {
  return (scrollVelocityPixelsPerSecond / 1000) * 5;
}

export function advanceMarqueeOffset(
  offsetPercent: number,
  movementDirection: number,
  baseVelocity: number,
  deltaSeconds: number,
  scrollVelocityFactor: number,
) {
  const nextDirection =
    scrollVelocityFactor < 0
      ? -1
      : scrollVelocityFactor > 0
        ? 1
        : movementDirection;
  const baseMovePercent = nextDirection * baseVelocity * deltaSeconds;
  return {
    offsetPercent:
      offsetPercent +
      baseMovePercent +
      baseMovePercent * Math.abs(scrollVelocityFactor),
    movementDirection: nextDirection,
  };
}
