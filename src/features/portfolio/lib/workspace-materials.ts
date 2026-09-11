import {
  CanvasTexture,
  MeshStandardMaterial,
  RepeatWrapping,
  SRGBColorSpace,
} from "three";

function createCanvasTexture(
  width: number,
  height: number,
  draw: (context: CanvasRenderingContext2D) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("The workspace texture could not be created.");
  draw(context);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function drawCity(context: CanvasRenderingContext2D, isDark: boolean) {
  const sky = context.createLinearGradient(0, 0, 0, 768);
  sky.addColorStop(0, isDark ? "#071829" : "#87bed8");
  sky.addColorStop(0.6, isDark ? "#1c354d" : "#c6dfeb");
  sky.addColorStop(1, isDark ? "#53616c" : "#edf0df");
  context.fillStyle = sky;
  context.fillRect(0, 0, 1536, 768);
  for (let index = 0; index < (isDark ? 58 : 0); index++) {
    const horizontal = (index * 173 + 71) % 1536;
    const vertical = (index * 79 + 31) % 360;
    context.fillStyle = index % 3 ? "#85919f" : "#e0d2ae";
    context.fillRect(horizontal, vertical, index % 5 === 0 ? 3 : 1, 2);
  }
  if (!isDark) {
    const sun = context.createRadialGradient(1180, 165, 10, 1180, 165, 150);
    sun.addColorStop(0, "#fff7d3");
    sun.addColorStop(1, "#fff7d300");
    context.fillStyle = sun;
    context.fillRect(1030, 15, 300, 300);
    context.fillStyle = "#ffffff65";
    for (const [x, y, width] of [
      [260, 140, 160],
      [620, 230, 220],
      [1370, 310, 130],
    ]) {
      context.beginPath();
      context.ellipse(x!, y!, width!, 18, 0, 0, Math.PI * 2);
      context.fill();
    }
  }
  for (let layer = 0; layer < 3; layer++) {
    for (let index = 0; index < 21; index++) {
      const buildingWidth = 42 + ((index * 31 + layer * 19) % 65);
      const horizontal = index * 83 - layer * 28;
      const buildingHeight = 110 + ((index * 71 + layer * 43) % 290);
      const top = 768 - buildingHeight + layer * 44;
      context.fillStyle = (
        isDark
          ? ["#1b2b40", "#142335", "#0c1c2b"]
          : ["#a7bec8", "#809aa9", "#627c8b"]
      )[layer]!;
      context.fillRect(horizontal, top, buildingWidth, buildingHeight);
      for (let row = 0; row < buildingHeight / 19; row++) {
        for (let column = 0; column < buildingWidth / 13 - 1; column++) {
          if ((row * 17 + column * 11 + index * 7 + layer) % 5 < 2) continue;
          context.fillStyle = isDark
            ? (row + column + index) % 4
              ? "#ad9e72"
              : "#91b3c9"
            : "#c3dde6";
          context.globalAlpha = layer === 2 ? 0.8 : 0.45;
          context.fillRect(
            horizontal + 8 + column * 13,
            top + 12 + row * 19,
            4,
            6,
          );
          context.globalAlpha = 1;
        }
      }
    }
  }
  const reflection = context.createLinearGradient(0, 0, 1536, 768);
  reflection.addColorStop(0, "#cfac7022");
  reflection.addColorStop(0.4, "#ffffff00");
  reflection.addColorStop(1, "#7392b116");
  context.fillStyle = reflection;
  context.fillRect(0, 0, 1536, 768);
}

function drawCodeScreen(context: CanvasRenderingContext2D) {
  context.fillStyle = "#101d2c";
  context.fillRect(0, 0, 1024, 640);
  context.fillStyle = "#1e2d40";
  context.fillRect(0, 0, 1024, 58);
  context.fillStyle = "#8192a5";
  context.font = "20px monospace";
  context.fillText("workspace / main.ts", 32, 37);
  const codeLines = [
    ["#769bb9", "01    const developer = {"],
    ["#a5bba2", '02      name: "Shan Padayhag",'],
    ["#d7ae7e", '03      focus: "thoughtful systems",'],
    ["#a5bba2", '04      craft: "full-stack engineering",'],
    ["#769bb9", "05    };"],
    ["#718093", "06"],
    ["#b6a3c8", "07    async function buildSomethingGood() {"],
    ["#a5bba2", "08      const idea = await understand();"],
    ["#d7ae7e", "09      return ship(idea.withCare());"],
    ["#769bb9", "10    }"],
  ];
  context.font = "23px monospace";
  codeLines.forEach(([color, line], index) => {
    context.fillStyle = color!;
    context.fillText(line!, 30, 112 + index * 39);
  });
  context.fillStyle = "#192c34";
  context.fillRect(0, 544, 1024, 96);
  context.fillStyle = "#9ab7a1";
  context.font = "21px monospace";
  context.fillText("✓ ready   /   built with care", 33, 600);
}

function drawWoodGrain(context: CanvasRenderingContext2D) {
  context.fillStyle = "#96623e";
  context.fillRect(0, 0, 512, 128);
  for (let index = 0; index < 110; index++) {
    context.strokeStyle = index % 3 ? "#54382216" : "#dfaa7220";
    context.lineWidth = 0.5 + (index % 4) * 0.45;
    context.beginPath();
    const vertical = (index * 37) % 128;
    context.moveTo(0, vertical);
    context.bezierCurveTo(
      120,
      vertical + Math.sin(index) * 6,
      400,
      vertical - 3,
      512,
      vertical + 1,
    );
    context.stroke();
  }
}

export function createWorkspaceMaterials() {
  const textures: CanvasTexture[] = [];
  const allocatedMaterials: MeshStandardMaterial[] = [];
  function trackTexture(
    width: number,
    height: number,
    draw: (context: CanvasRenderingContext2D) => void,
  ) {
    const texture = createCanvasTexture(width, height, draw);
    textures.push(texture);
    return texture;
  }
  function trackMaterial(
    parameters: ConstructorParameters<typeof MeshStandardMaterial>[0],
  ) {
    const material = new MeshStandardMaterial(parameters);
    allocatedMaterials.push(material);
    return material;
  }
  function dispose() {
    allocatedMaterials.forEach((material) => material.dispose());
    textures.forEach((texture) => texture.dispose());
  }
  try {
    const cityTexture = trackTexture(1536, 768, (context) =>
      drawCity(context, true),
    );
    const dayTexture = trackTexture(1536, 768, (context) =>
      drawCity(context, false),
    );
    const codeTexture = trackTexture(1024, 640, drawCodeScreen);
    const woodTexture = trackTexture(512, 128, drawWoodGrain);
    woodTexture.wrapS = RepeatWrapping;
    woodTexture.wrapT = RepeatWrapping;
    const materials = {
      wood: trackMaterial({
        map: woodTexture,
        color: "#ddbd95",
        roughness: 0.63,
      }),
      woodLight: trackMaterial({
        map: woodTexture,
        color: "#eed2a9",
        roughness: 0.63,
      }),
      woodDark: trackMaterial({ color: "#553c2d", roughness: 0.67 }),
      wall: trackMaterial({ color: "#8a7361", roughness: 0.93 }),
      night: trackMaterial({
        map: cityTexture,
        emissiveMap: cityTexture,
        emissive: "#ffffff",
        emissiveIntensity: 0.58,
        roughness: 0.31,
      }),
      code: trackMaterial({
        map: codeTexture,
        emissiveMap: codeTexture,
        emissive: "#ffffff",
        emissiveIntensity: 0.8,
        roughness: 0.4,
      }),
      metal: trackMaterial({
        color: "#333633",
        roughness: 0.4,
        metalness: 0.65,
      }),
      brass: trackMaterial({
        color: "#b38b4d",
        metalness: 0.73,
        roughness: 0.37,
      }),
      screen: trackMaterial({
        color: "#101b29",
        roughness: 0.27,
        metalness: 0.3,
      }),
      sofa: trackMaterial({ color: "#b2aba0", roughness: 0.95 }),
      linen: trackMaterial({ color: "#e2d3b4", roughness: 1 }),
      cushion: trackMaterial({ color: "#9c694c", roughness: 1 }),
      rug: trackMaterial({ color: "#526160", roughness: 1 }),
      rugStripe: trackMaterial({ color: "#71807a", roughness: 1 }),
      ceramic: trackMaterial({ color: "#d0c4ad", roughness: 0.45 }),
      coffee: trackMaterial({ color: "#392a20", roughness: 0.24 }),
      book: trackMaterial({ color: "#526e71", roughness: 0.86 }),
      pages: trackMaterial({ color: "#e1d4b7", roughness: 0.91 }),
      leaf: trackMaterial({ color: "#3b644b", roughness: 0.9 }),
      leafLight: trackMaterial({ color: "#668461", roughness: 0.9 }),
      soil: trackMaterial({ color: "#3c3329", roughness: 1 }),
      skin: trackMaterial({ color: "#bd8e6c", roughness: 0.85 }),
      hair: trackMaterial({ color: "#292723", roughness: 1 }),
      shirt: trackMaterial({ color: "#43534f", roughness: 1 }),
      trousers: trackMaterial({ color: "#333e43", roughness: 1 }),
      glow: trackMaterial({
        color: "#ffd595",
        emissive: "#ffb752",
        emissiveIntensity: 1.6,
        roughness: 0.78,
      }),
      blueGlow: trackMaterial({
        color: "#627e93",
        emissive: "#719dc0",
        emissiveIntensity: 0.8,
      }),
    };
    return {
      materials,
      setTheme(isDark: boolean) {
        const texture = isDark ? cityTexture : dayTexture;
        materials.night.map = texture;
        materials.night.emissiveMap = texture;
        materials.night.emissiveIntensity = isDark ? 0.58 : 0.25;
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}

export type WorkspaceMaterials = ReturnType<
  typeof createWorkspaceMaterials
>["materials"];
