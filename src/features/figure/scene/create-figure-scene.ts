import {
  Color,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import type { FigurePose } from "@/features/figure/entities/figure-motion";
import {
  calculateSeaGlassOffset,
  seaGlassPieces,
} from "@/features/figure/entities/sea-glass-motion";
import { buildSeaGlass } from "@/features/figure/scene/build-sea-glass";
import {
  figurePalettes,
  type FigureTheme,
} from "@/features/figure/entities/figure-palette";
import {
  buildFigure,
  headPivotY,
  type FigureRig,
} from "@/features/figure/scene/build-figure";
import {
  applyFigurePalette,
  createFigureMaterials,
  disposeFigureMaterials,
} from "@/features/figure/scene/figure-materials";

export type FigureScene = {
  rig: FigureRig;
  camera: PerspectiveCamera;
  render: () => void;
  applyPose: (pose: FigurePose) => void;
  applySeaGlassDrift: (
    elapsedSeconds: number,
    pointerOffsetX: number,
    pointerOffsetY: number,
  ) => void;
  resize: (widthPixels: number, heightPixels: number) => void;
  setTheme: (theme: FigureTheme) => void;
  dispose: () => void;
};

export function createFigureScene(
  canvas: HTMLCanvasElement,
  theme: FigureTheme,
): FigureScene {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(26, 1, 0.1, 60);
  camera.position.set(0, -0.6, 9.75);
  camera.lookAt(0, -0.6, 0);

  const palette = figurePalettes[theme];
  const skyLight = new HemisphereLight(
    palette.skyLight,
    palette.groundLight,
    1.6,
  );
  const keyLight = new DirectionalLight(palette.keyLight, 2.2);
  keyLight.position.set(-3, 4, 6);
  const rimLight = new DirectionalLight(palette.rimLight, 3.2);
  rimLight.position.set(4, 2.5, -4);
  const counterRimLight = new DirectionalLight(palette.rimLight, 1.6);
  counterRimLight.position.set(-4.5, 1, -3);
  scene.add(skyLight, keyLight, rimLight, counterRimLight);

  const materials = createFigureMaterials(palette);
  const rig = buildFigure(materials);
  const seaGlass = buildSeaGlass(materials.seaGlass);
  scene.add(rig.root, seaGlass);

  function render() {
    renderer.render(scene, camera);
  }

  function applyPose(pose: FigurePose) {
    rig.waveArm.rotation.z = pose.waveAngle;
    rig.torso.scale.set(1, pose.breathScale, 1);
    rig.headPivot.position.y = headPivotY + (pose.breathScale - 1) * 1.6;
    rig.headPivot.rotation.set(-pose.headPitch, pose.headYaw, 0);
  }

  function applySeaGlassDrift(
    elapsedSeconds: number,
    pointerOffsetX: number,
    pointerOffsetY: number,
  ) {
    seaGlass.children.forEach((pebble, pieceIndex) => {
      const piece = seaGlassPieces[pieceIndex];
      if (!piece) return;
      const offset = calculateSeaGlassOffset(
        pieceIndex,
        elapsedSeconds,
        pointerOffsetX,
        pointerOffsetY,
      );
      pebble.position.set(
        piece.restX + offset.x,
        piece.restY + offset.y,
        piece.restZ,
      );
      pebble.rotation.y = 0.7 * pieceIndex + offset.spin;
    });
  }

  function resize(widthPixels: number, heightPixels: number) {
    renderer.setSize(widthPixels, heightPixels, false);
    camera.aspect = widthPixels / heightPixels;
    camera.updateProjectionMatrix();
  }

  function setTheme(nextTheme: FigureTheme) {
    const nextPalette = figurePalettes[nextTheme];
    applyFigurePalette(materials, nextPalette);
    skyLight.color = new Color(nextPalette.skyLight);
    skyLight.groundColor = new Color(nextPalette.groundLight);
    keyLight.color = new Color(nextPalette.keyLight);
    rimLight.color = new Color(nextPalette.rimLight);
    counterRimLight.color = new Color(nextPalette.rimLight);
  }

  function dispose() {
    scene.traverse((sceneObject) => {
      if (sceneObject instanceof Mesh) sceneObject.geometry.dispose();
    });
    disposeFigureMaterials(materials);
    renderer.dispose();
  }

  return {
    rig,
    camera,
    render,
    applyPose,
    applySeaGlassDrift,
    resize,
    setTheme,
    dispose,
  };
}
