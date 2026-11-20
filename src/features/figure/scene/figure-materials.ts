import {
  Color,
  DataTexture,
  MeshBasicMaterial,
  MeshPhongMaterial,
  MeshToonMaterial,
  NearestFilter,
  RedFormat,
} from "three";
import type { FigurePalette } from "@/features/figure/entities/figure-palette";

export type FigureMaterials = {
  skin: MeshToonMaterial;
  skinShadow: MeshToonMaterial;
  hair: MeshToonMaterial;
  feature: MeshToonMaterial;
  lip: MeshToonMaterial;
  mouth: MeshBasicMaterial;
  teeth: MeshToonMaterial;
  top: MeshToonMaterial;
  seaGlass: MeshPhongMaterial;
};

function createToonGradientTexture() {
  const toneSteps = new Uint8Array([90, 170, 255]);
  const gradientTexture = new DataTexture(
    toneSteps,
    toneSteps.length,
    1,
    RedFormat,
  );
  gradientTexture.minFilter = NearestFilter;
  gradientTexture.magFilter = NearestFilter;
  gradientTexture.needsUpdate = true;
  return gradientTexture;
}

export function createFigureMaterials(palette: FigurePalette): FigureMaterials {
  const gradientTexture = createToonGradientTexture();
  const createToonMaterial = (colorHex: string) =>
    new MeshToonMaterial({
      color: new Color(colorHex),
      gradientMap: gradientTexture,
    });
  return {
    skin: createToonMaterial(palette.skin),
    skinShadow: createToonMaterial(palette.skinShadow),
    hair: createToonMaterial(palette.hair),
    feature: createToonMaterial(palette.feature),
    lip: createToonMaterial(palette.lip),
    mouth: new MeshBasicMaterial({ color: new Color(palette.mouth) }),
    teeth: createToonMaterial(palette.teeth),
    top: createToonMaterial(palette.top),
    seaGlass: new MeshPhongMaterial({
      color: new Color(palette.seaGlass),
      transparent: true,
      opacity: 0.62,
      shininess: 90,
      depthWrite: false,
    }),
  };
}

export function applyFigurePalette(
  materials: FigureMaterials,
  palette: FigurePalette,
) {
  materials.skin.color.set(palette.skin);
  materials.skinShadow.color.set(palette.skinShadow);
  materials.hair.color.set(palette.hair);
  materials.feature.color.set(palette.feature);
  materials.lip.color.set(palette.lip);
  materials.mouth.color.set(palette.mouth);
  materials.teeth.color.set(palette.teeth);
  materials.top.color.set(palette.top);
  materials.seaGlass.color.set(palette.seaGlass);
}

export function disposeFigureMaterials(materials: FigureMaterials) {
  const uniqueGradientTextures = new Set(
    Object.values(materials).map((material) =>
      material instanceof MeshToonMaterial ? material.gradientMap : null,
    ),
  );
  for (const material of Object.values(materials)) material.dispose();
  for (const gradientTexture of uniqueGradientTextures)
    gradientTexture?.dispose();
}
