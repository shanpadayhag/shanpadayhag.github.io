import { Mesh, SphereGeometry } from "three";
import { calculateHairSurfacePoint } from "@/features/figure/entities/hair-surface";
import type { FigureMaterials } from "@/features/figure/scene/figure-materials";

function createHairCapGeometry() {
  const capGeometry = new SphereGeometry(
    1,
    160,
    72,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.999,
  );
  const capPositions = capGeometry.attributes.position;
  const capCoordinates = capGeometry.attributes.uv;
  if (!capPositions || !capCoordinates) return capGeometry;
  for (
    let vertexIndex = 0;
    vertexIndex < capPositions.count;
    vertexIndex += 1
  ) {
    const sweepAngle = capCoordinates.getX(vertexIndex) * Math.PI * 2;
    const azimuthRadians = Math.atan2(
      -Math.cos(sweepAngle),
      Math.sin(sweepAngle),
    );
    const surfacePoint = calculateHairSurfacePoint(
      azimuthRadians,
      capCoordinates.getY(vertexIndex),
    );
    capPositions.setXYZ(
      vertexIndex,
      surfacePoint.x,
      surfacePoint.y,
      surfacePoint.z,
    );
  }
  capGeometry.computeVertexNormals();
  return capGeometry;
}

export function buildHair(materials: FigureMaterials) {
  const hair = new Mesh(createHairCapGeometry(), materials.hair);
  hair.name = "hair";
  return hair;
}
