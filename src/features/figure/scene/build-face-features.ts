import {
  BufferAttribute,
  CatmullRomCurve3,
  Group,
  Mesh,
  Shape,
  ShapeGeometry,
  SphereGeometry,
  TubeGeometry,
  Vector3,
  type Material,
} from "three";
import {
  calculateFaceSurfaceDepth,
  wrapPositionsOntoFace,
} from "@/features/figure/entities/face-surface";
import type { FigureMaterials } from "@/features/figure/scene/figure-materials";

const mouthCenterY = -0.43;

function placeOnFace(faceX: number, faceY: number, surfaceOffset: number) {
  return new Vector3(
    faceX,
    faceY,
    calculateFaceSurfaceDepth(faceX, faceY) + surfaceOffset,
  );
}

function createSurfaceTube(
  facePoints: [number, number][],
  tubeRadius: number,
  surfaceOffset: number,
  material: Material,
) {
  const surfaceCurve = new CatmullRomCurve3(
    facePoints.map(([faceX, faceY]) =>
      placeOnFace(faceX, faceY, surfaceOffset),
    ),
  );
  return new Mesh(
    new TubeGeometry(surfaceCurve, 32, tubeRadius, 12, false),
    material,
  );
}

function createSurfaceShape(
  shape: Shape,
  centerY: number,
  surfaceOffset: number,
  material: Material,
) {
  const shapeGeometry = new ShapeGeometry(shape, 24);
  shapeGeometry.translate(0, centerY, 0);
  const flatPositions = shapeGeometry.attributes.position?.array;
  if (flatPositions instanceof Float32Array) {
    shapeGeometry.setAttribute(
      "position",
      new BufferAttribute(
        wrapPositionsOntoFace(flatPositions, surfaceOffset),
        3,
      ),
    );
  }
  shapeGeometry.computeVertexNormals();
  return new Mesh(shapeGeometry, material);
}

function createEllipsoid(
  radius: Vector3,
  position: Vector3,
  material: Material,
) {
  const ellipsoid = new Mesh(new SphereGeometry(1, 28, 20), material);
  ellipsoid.scale.copy(radius);
  ellipsoid.position.copy(position);
  return ellipsoid;
}

function buildBrows(materials: FigureMaterials) {
  return [-1, 1].map((sideSign) =>
    createSurfaceTube(
      [
        [sideSign * 0.12, 0.315],
        [sideSign * 0.26, 0.33],
        [sideSign * 0.42, 0.325],
        [sideSign * 0.57, 0.285],
      ],
      0.055,
      0.035,
      materials.hair,
    ),
  );
}

function buildEyes(materials: FigureMaterials) {
  return [-1, 1].map((sideSign) =>
    createSurfaceTube(
      [
        [sideSign * 0.22, 0.095],
        [sideSign * 0.3, 0.135],
        [sideSign * 0.4, 0.145],
        [sideSign * 0.5, 0.105],
      ],
      0.024,
      0.02,
      materials.feature,
    ),
  );
}

function buildNose(materials: FigureMaterials) {
  const noseTip = createEllipsoid(
    new Vector3(0.16, 0.12, 0.12),
    placeOnFace(0, -0.11, 0.055),
    materials.skin,
  );
  const noseBridge = createEllipsoid(
    new Vector3(0.075, 0.2, 0.06),
    placeOnFace(0, 0.05, 0.005),
    materials.skin,
  );
  const noseWings = [-1, 1].map((sideSign) =>
    createEllipsoid(
      new Vector3(0.075, 0.06, 0.05),
      placeOnFace(sideSign * 0.13, -0.14, 0.005),
      materials.skin,
    ),
  );
  const nostrils = [-1, 1].map((sideSign) =>
    createEllipsoid(
      new Vector3(0.045, 0.022, 0.03),
      placeOnFace(sideSign * 0.075, -0.2, 0.07),
      materials.skinShadow,
    ),
  );
  return [noseBridge, noseTip, ...noseWings, ...nostrils];
}

function createMouthShape() {
  const mouthShape = new Shape();
  mouthShape.moveTo(-0.37, 0.05);
  mouthShape.quadraticCurveTo(0, -0.03, 0.37, 0.05);
  mouthShape.bezierCurveTo(0.3, -0.12, 0.16, -0.25, 0, -0.25);
  mouthShape.bezierCurveTo(-0.16, -0.25, -0.3, -0.12, -0.37, 0.05);
  return mouthShape;
}

function createUpperTeethShape() {
  const upperTeethShape = new Shape();
  upperTeethShape.moveTo(-0.32, 0.032);
  upperTeethShape.quadraticCurveTo(0, -0.04, 0.32, 0.032);
  upperTeethShape.lineTo(0.285, -0.035);
  upperTeethShape.quadraticCurveTo(0, -0.105, -0.285, -0.035);
  upperTeethShape.closePath();
  return upperTeethShape;
}

function buildMouth(materials: FigureMaterials) {
  const mouthOpening = createSurfaceShape(
    createMouthShape(),
    mouthCenterY,
    0.03,
    materials.mouth,
  );
  const upperTeeth = createSurfaceShape(
    createUpperTeethShape(),
    mouthCenterY,
    0.036,
    materials.teeth,
  );
  const lowerLip = createSurfaceTube(
    [
      [-0.36, mouthCenterY + 0.03],
      [-0.24, mouthCenterY - 0.17],
      [0, mouthCenterY - 0.262],
      [0.24, mouthCenterY - 0.17],
      [0.36, mouthCenterY + 0.03],
    ],
    0.042,
    0.012,
    materials.lip,
  );
  const upperLip = createSurfaceTube(
    [
      [-0.37, mouthCenterY + 0.05],
      [-0.18, mouthCenterY + 0.012],
      [0, mouthCenterY],
      [0.18, mouthCenterY + 0.012],
      [0.37, mouthCenterY + 0.05],
    ],
    0.02,
    0.018,
    materials.lip,
  );
  return [mouthOpening, upperTeeth, lowerLip, upperLip];
}

function buildMole(materials: FigureMaterials) {
  return createEllipsoid(
    new Vector3(0.02, 0.02, 0.01),
    placeOnFace(-0.46, -0.5, 0.004),
    materials.feature,
  );
}

export function buildFaceFeatures(materials: FigureMaterials) {
  const faceFeatures = new Group();
  faceFeatures.name = "face";
  faceFeatures.add(
    ...buildBrows(materials),
    ...buildEyes(materials),
    ...buildNose(materials),
    ...buildMouth(materials),
    buildMole(materials),
  );
  return faceFeatures;
}
