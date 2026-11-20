import { Group } from "three";
import { buildTorso } from "@/features/figure/scene/build-body";
import { buildFaceFeatures } from "@/features/figure/scene/build-face-features";
import { buildHair } from "@/features/figure/scene/build-hair";
import { buildHead, buildNeck } from "@/features/figure/scene/build-head";
import type { FigureMaterials } from "@/features/figure/scene/figure-materials";

export const headPivotY = -0.82;

export type FigureRig = {
  root: Group;
  headPivot: Group;
  torso: Group;
  waveArm: Group;
};

export function buildFigure(materials: FigureMaterials): FigureRig {
  const root = new Group();
  root.name = "figure";
  const headPivot = new Group();
  headPivot.name = "head-pivot";
  headPivot.position.y = headPivotY;
  const headAssembly = new Group();
  headAssembly.position.y = -headPivotY;
  headAssembly.add(
    buildHead(materials),
    buildHair(materials),
    buildFaceFeatures(materials),
  );
  headPivot.add(headAssembly);
  const { torso, waveArm } = buildTorso(materials);
  root.add(torso, waveArm, buildNeck(materials), headPivot);
  return { root, headPivot, torso, waveArm };
}
