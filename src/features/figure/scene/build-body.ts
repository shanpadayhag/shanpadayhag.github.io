import {
  CapsuleGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  type Material,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from "three";
import type { FigureMaterials } from "@/features/figure/scene/figure-materials";

const upDirection = new Vector3(0, 1, 0);
export const elbowPosition = new Vector3(1.4, -1.85, 0.35);
const wristOffset = new Vector3(-0.16, 1.4, 0.25);

function createLimb(
  startPoint: Vector3,
  endPoint: Vector3,
  startRadius: number,
  endRadius: number,
  material: Material,
) {
  const limbVector = endPoint.clone().sub(startPoint);
  const limb = new Mesh(
    new CylinderGeometry(endRadius, startRadius, limbVector.length(), 24),
    material,
  );
  limb.position.copy(startPoint).addScaledVector(limbVector, 0.5);
  limb.quaternion.setFromUnitVectors(
    upDirection,
    limbVector.clone().normalize(),
  );
  return limb;
}

function createFinger(
  material: Material,
  fingerLength: number,
  positionX: number,
  positionY: number,
  tiltRadians: number,
) {
  const finger = new Mesh(
    new CapsuleGeometry(0.052, fingerLength, 6, 12),
    material,
  );
  finger.position.set(positionX, positionY, 0.01);
  finger.rotation.z = tiltRadians;
  return finger;
}

function buildPeaceHand(materials: FigureMaterials) {
  const hand = new Group();
  hand.name = "peace-hand";
  const palm = new Mesh(new SphereGeometry(0.2, 28, 20), materials.skin);
  palm.scale.set(1, 1.08, 0.52);
  palm.position.y = 0.15;
  const curledRingFinger = new Mesh(
    new SphereGeometry(0.068, 16, 12),
    materials.skin,
  );
  curledRingFinger.position.set(0.06, 0.3, 0.09);
  const curledLittleFinger = new Mesh(
    new SphereGeometry(0.06, 16, 12),
    materials.skin,
  );
  curledLittleFinger.position.set(0.15, 0.26, 0.08);
  const thumb = new Mesh(
    new CapsuleGeometry(0.055, 0.16, 6, 12),
    materials.skin,
  );
  thumb.position.set(0.0, 0.2, 0.12);
  thumb.rotation.z = -1.25;
  hand.add(
    palm,
    createFinger(materials.skin, 0.3, -0.12, 0.5, 0.2),
    createFinger(materials.skin, 0.32, -0.01, 0.52, -0.16),
    curledRingFinger,
    curledLittleFinger,
    thumb,
  );
  return hand;
}

function buildWaveArm(materials: FigureMaterials) {
  const waveArm = new Group();
  waveArm.name = "wave-arm";
  waveArm.position.copy(elbowPosition);
  const elbowOrigin = new Vector3(0, 0, 0);
  const sleeveEnd = wristOffset.clone().multiplyScalar(0.3);
  const forearm = createLimb(
    elbowOrigin,
    wristOffset,
    0.17,
    0.13,
    materials.skin,
  );
  const sleeve = createLimb(
    elbowOrigin.clone().addScaledVector(wristOffset, -0.08),
    sleeveEnd,
    0.25,
    0.22,
    materials.top,
  );
  const elbow = new Mesh(new SphereGeometry(0.25, 24, 16), materials.top);
  const hand = buildPeaceHand(materials);
  hand.position.copy(wristOffset);
  hand.rotation.z = Math.atan2(-wristOffset.x, wristOffset.y) * 0.6;
  waveArm.add(forearm, sleeve, elbow, hand);
  return waveArm;
}

export function buildTorso(materials: FigureMaterials) {
  const torso = new Group();
  torso.name = "torso";
  const chest = new Mesh(new SphereGeometry(1, 48, 32), materials.top);
  chest.scale.set(1.38, 1.05, 0.82);
  chest.position.y = -2.36;
  const collar = new Mesh(new TorusGeometry(0.44, 0.07, 14, 40), materials.top);
  collar.rotation.x = Math.PI / 2 + 0.3;
  collar.position.y = -1.4;
  const upperArm = createLimb(
    new Vector3(1.0, -1.93, 0),
    elbowPosition,
    0.34,
    0.27,
    materials.top,
  );
  torso.add(chest, collar, upperArm);
  return { torso, waveArm: buildWaveArm(materials) };
}
