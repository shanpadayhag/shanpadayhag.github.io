export type SeaGlassPiece = {
  restX: number;
  restY: number;
  restZ: number;
  size: number;
  depth: number;
};

export type SeaGlassOffset = { x: number; y: number; spin: number };

export const seaGlassPieces: SeaGlassPiece[] = [
  { restX: -1.62, restY: 0.95, restZ: -0.4, size: 0.3, depth: 0.22 },
  { restX: 1.74, restY: 0.82, restZ: -0.7, size: 0.22, depth: 0.14 },
  { restX: -1.55, restY: -1.5, restZ: 0.5, size: 0.32, depth: 0.3 },
  { restX: 1.62, restY: -1.05, restZ: 0.4, size: 0.16, depth: 0.26 },
];

export const seaGlassBobHeight = 0.07;

export function calculateSeaGlassOffset(
  pieceIndex: number,
  elapsedSeconds: number,
  pointerOffsetX: number,
  pointerOffsetY: number,
): SeaGlassOffset {
  const piece = seaGlassPieces[pieceIndex];
  if (!piece) return { x: 0, y: 0, spin: 0 };
  const bobPeriodSeconds = 5 + pieceIndex * 0.8;
  const bob =
    seaGlassBobHeight *
    Math.sin((2 * Math.PI * elapsedSeconds) / bobPeriodSeconds + pieceIndex);
  const spinDirection = pieceIndex % 2 === 0 ? 1 : -1;
  return {
    x: pointerOffsetX * piece.depth,
    y: -pointerOffsetY * piece.depth + bob,
    spin: spinDirection * 0.12 * elapsedSeconds,
  };
}
