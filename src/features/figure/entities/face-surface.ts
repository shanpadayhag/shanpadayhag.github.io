export const headHeightScale = 1.08;
export const jawTaperStartY = -0.45;
export const jawTaperDepth = 0.5;
export const jawTaperAmount = 0.14;

export function calculateJawTaper(headY: number) {
  if (headY >= jawTaperStartY) return 1;
  const taperProgress = Math.min((jawTaperStartY - headY) / jawTaperDepth, 1);
  return 1 - jawTaperAmount * taperProgress * taperProgress;
}

export function calculateFaceSurfaceDepth(faceX: number, faceY: number) {
  const jawTaper = calculateJawTaper(faceY);
  const unitX = faceX / jawTaper;
  const unitY = faceY / headHeightScale;
  const unitDepthSquared = 1 - unitX * unitX - unitY * unitY;
  if (unitDepthSquared <= 0) return 0;
  return Math.sqrt(unitDepthSquared) * jawTaper;
}

export function wrapPositionsOntoFace(
  flatPositions: Float32Array,
  surfaceOffset: number,
) {
  const wrappedPositions = new Float32Array(flatPositions.length);
  for (
    let vertexStart = 0;
    vertexStart < flatPositions.length;
    vertexStart += 3
  ) {
    const faceX = flatPositions[vertexStart] ?? 0;
    const faceY = flatPositions[vertexStart + 1] ?? 0;
    const layerDepth = flatPositions[vertexStart + 2] ?? 0;
    wrappedPositions[vertexStart] = faceX;
    wrappedPositions[vertexStart + 1] = faceY;
    wrappedPositions[vertexStart + 2] =
      calculateFaceSurfaceDepth(faceX, faceY) + surfaceOffset + layerDepth;
  }
  return wrappedPositions;
}
