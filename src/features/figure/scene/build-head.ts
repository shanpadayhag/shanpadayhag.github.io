import { CylinderGeometry, Group, Mesh, SphereGeometry } from "three";
import {
  calculateJawTaper,
  headHeightScale,
} from "@/features/figure/entities/face-surface";
import type { FigureMaterials } from "@/features/figure/scene/figure-materials";

function createHeadGeometry() {
  const headGeometry = new SphereGeometry(1, 72, 56);
  const headPositions = headGeometry.attributes.position;
  if (!headPositions) return headGeometry;
  for (
    let vertexIndex = 0;
    vertexIndex < headPositions.count;
    vertexIndex += 1
  ) {
    const unitY = headPositions.getY(vertexIndex);
    const headY = unitY * headHeightScale;
    const jawTaper = calculateJawTaper(headY);
    headPositions.setXYZ(
      vertexIndex,
      headPositions.getX(vertexIndex) * jawTaper,
      headY,
      headPositions.getZ(vertexIndex) * jawTaper,
    );
  }
  headGeometry.computeVertexNormals();
  return headGeometry;
}

function createEar(materials: FigureMaterials, sideSign: number) {
  const ear = new Group();
  const earShell = new Mesh(new SphereGeometry(0.25, 32, 24), materials.skin);
  earShell.scale.set(0.42, 1, 0.78);
  const earHollow = new Mesh(
    new SphereGeometry(0.12, 24, 16),
    materials.skinShadow,
  );
  earHollow.scale.set(0.3, 1, 0.7);
  earHollow.position.set(sideSign * 0.03, -0.01, 0.06);
  ear.add(earShell, earHollow);
  ear.position.set(sideSign * 0.96, -0.04, -0.08);
  ear.rotation.y = sideSign * 0.8;
  ear.rotation.z = sideSign * -0.08;
  return ear;
}

export function buildHead(materials: FigureMaterials) {
  const head = new Group();
  head.name = "head";
  const skull = new Mesh(createHeadGeometry(), materials.skin);
  head.add(skull, createEar(materials, -1), createEar(materials, 1));
  return head;
}

export function buildNeck(materials: FigureMaterials) {
  const neck = new Mesh(
    new CylinderGeometry(0.42, 0.48, 0.7, 40),
    materials.skin,
  );
  neck.name = "neck";
  neck.position.y = -1.18;
  return neck;
}
