import {
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  PointLight,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import {
  createWorkspaceMaterials,
  type WorkspaceMaterials,
} from "./workspace-materials";

type Point = readonly [number, number, number];
type MaterialName = keyof WorkspaceMaterials;

function createModelBuilder(materials: WorkspaceMaterials) {
  const group = new Group();
  const geometries = new Map<string, BufferGeometry>();
  function geometry(key: string, create: () => BufferGeometry) {
    const existing = geometries.get(key);
    if (existing) return existing;
    const created = create();
    geometries.set(key, created);
    return created;
  }
  function mesh(
    shape: BufferGeometry,
    material: MaterialName,
    position: Point,
    parent = group,
  ) {
    const object = new Mesh(shape, materials[material]);
    object.position.set(...position);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function box(
    size: Point,
    position: Point,
    material: MaterialName,
    radius = 0,
    parent = group,
  ) {
    return mesh(
      geometry(`box:${size.join(":")}:${radius}`, () =>
        radius
          ? new RoundedBoxGeometry(
              ...size,
              2,
              Math.min(radius, ...size.map((dimension) => dimension / 2)),
            )
          : new BoxGeometry(...size),
      ),
      material,
      position,
      parent,
    );
  }
  function cylinder(
    top: number,
    bottom: number,
    height: number,
    position: Point,
    material: MaterialName,
    parent = group,
  ) {
    return mesh(
      geometry(
        `cylinder:${top}:${bottom}:${height}`,
        () => new CylinderGeometry(top, bottom, height, 24),
      ),
      material,
      position,
      parent,
    );
  }
  function sphere(
    scale: Point,
    position: Point,
    material: MaterialName,
    parent = group,
  ) {
    const object = mesh(
      geometry("sphere", () => new SphereGeometry(1, 20, 14)),
      material,
      position,
      parent,
    );
    object.scale.set(...scale);
    return object;
  }
  function rod(
    start: Point,
    end: Point,
    radius: number,
    material: MaterialName,
    parent = group,
  ) {
    const direction = new Vector3(...end).sub(new Vector3(...start));
    const midpoint = new Vector3(...start)
      .add(new Vector3(...end))
      .multiplyScalar(0.5);
    const object = cylinder(
      radius,
      radius,
      direction.length(),
      [midpoint.x, midpoint.y, midpoint.z],
      material,
      parent,
    );
    object.quaternion.setFromUnitVectors(
      new Vector3(0, 1, 0),
      direction.normalize(),
    );
    return object;
  }
  function plane(
    width: number,
    height: number,
    position: Point,
    material: MaterialName,
  ) {
    const object = mesh(
      geometry(
        `plane:${width}:${height}`,
        () => new PlaneGeometry(width, height),
      ),
      material,
      position,
    );
    object.castShadow = false;
    return object;
  }
  function ring(
    radius: number,
    thickness: number,
    position: Point,
    material: MaterialName,
    parent = group,
  ) {
    return mesh(
      geometry(
        `ring:${radius}:${thickness}`,
        () => new TorusGeometry(radius, thickness, 8, 28),
      ),
      material,
      position,
      parent,
    );
  }
  return {
    group,
    box,
    cylinder,
    sphere,
    rod,
    plane,
    ring,
    dispose: () => geometries.forEach((shape) => shape.dispose()),
  };
}

type ModelBuilder = ReturnType<typeof createModelBuilder>;

function createArchitecture(builder: ModelBuilder) {
  builder.box([8.2, 0.28, 6.2], [0, -0.18, 0], "woodDark", 0.08);
  for (let row = 0; row < 15; row++) {
    for (let column = 0; column < 4; column++) {
      const position = -3 + column * 2;
      builder.box(
        [1.985, 0.055, 0.389],
        [position, -0.008, -2.8 + row * 0.4],
        (row + column) % 4 ? "wood" : "woodLight",
        0.008,
      );
    }
  }
  builder.box([8.08, 0.17, 0.12], [0, 0.08, -3.02], "woodDark");
  builder.box([0.14, 3.95, 2.2], [-4.02, 1.9, -1.95], "wall", 0.025);
  builder.box([0.22, 0.15, 2.25], [-3.96, 0.12, -1.93], "woodDark");
  builder.box([2.15, 3.95, 0.15], [3, 1.9, -3.02], "wall", 0.025);
  builder.box([8.15, 0.18, 0.23], [0, 3.86, -3.01], "woodDark", 0.015);
  builder.box([0.19, 3.92, 0.23], [-3.99, 1.9, -3], "woodDark");
  builder.plane(5.95, 3.5, [-1, 1.93, -3.04], "night");
  for (let column = 0; column <= 4; column++) {
    builder.box(
      [0.1, 3.62, 0.14],
      [-3.92 + column * 1.475, 1.96, -2.94],
      "wood",
      0.008,
    );
  }
  for (const height of [0.19, 1.39, 2.59, 3.73]) {
    builder.box([5.96, 0.095, 0.17], [-0.98, height, -2.93], "wood", 0.008);
  }
  builder.box([6.08, 0.12, 0.32], [-1, 0.22, -2.86], "woodLight", 0.025);
  for (let index = 0; index < 9; index++) {
    builder.box(
      [0.06, 3.63, 0.085],
      [2.04 + index * 0.245, 1.91, -2.89],
      "woodDark",
      0.01,
    );
  }
}

function createDesk(builder: ModelBuilder) {
  builder.box([3.75, 0.15, 1.42], [-1.63, 1.19, -1.66], "woodLight", 0.065);
  for (const horizontal of [-3.27, -0.02]) {
    for (const depth of [-2.12, -1.12]) {
      builder.box(
        [0.095, 1.12, 0.095],
        [horizontal, 0.58, depth],
        "metal",
        0.017,
      );
    }
    builder.rod(
      [horizontal, 0.1, -2.12],
      [horizontal, 0.1, -1.12],
      0.045,
      "metal",
    );
  }
  builder.box([0.79, 0.78, 0.84], [-2.98, 0.68, -1.71], "wood", 0.04);
  for (const height of [0.45, 0.71, 0.94]) {
    builder.box([0.69, 0.018, 0.025], [-2.98, height, -1.282], "woodDark");
    builder.box(
      [0.18, 0.025, 0.035],
      [-2.98, height + 0.08, -1.25],
      "brass",
      0.01,
    );
  }
  builder.box([0.61, 0.045, 0.36], [-1.52, 1.29, -1.95], "metal", 0.035);
  builder.box([0.075, 0.37, 0.075], [-1.52, 1.46, -2], "metal", 0.02);
  builder.box([1.88, 1.12, 0.105], [-1.52, 1.99, -2.06], "metal", 0.055);
  builder.plane(1.75, 0.98, [-1.52, 2.02, -2.001], "code");
  builder.sphere([0.012, 0.012, 0.008], [-1.52, 1.465, -1.998], "blueGlow");
  builder.box([1.73, 0.012, 0.62], [-1.44, 1.276, -1.35], "rug", 0.035);
  builder.box([1.11, 0.055, 0.38], [-1.61, 1.315, -1.32], "metal", 0.035);
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 13; column++) {
      builder.box(
        [0.057, 0.019, 0.056],
        [-2.094 + column * 0.079, 1.354, -1.455 + row * 0.081],
        "ceramic",
        0.007,
      );
    }
  }
  builder.box([0.4, 0.018, 0.044], [-1.62, 1.361, -1.097], "ceramic", 0.009);
  builder.sphere([0.105, 0.051, 0.16], [-0.74, 1.324, -1.32], "ceramic");
  createDeskAccessories(builder);
}

function createDeskAccessories(builder: ModelBuilder) {
  for (const horizontal of [-2.66, -0.35]) {
    builder.box([0.24, 0.36, 0.22], [horizontal, 1.47, -2.11], "metal", 0.028);
    const speaker = builder.cylinder(
      0.075,
      0.075,
      0.014,
      [horizontal, 1.49, -1.993],
      "screen",
    );
    speaker.rotation.x = Math.PI / 2;
    builder.ring(0.08, 0.008, [horizontal, 1.49, -1.982], "brass");
  }
  builder.box([0.36, 0.89, 0.72], [-0.22, 0.47, -1.87], "metal", 0.04);
  builder.box([0.26, 0.7, 0.025], [-0.22, 0.49, -1.493], "screen", 0.025);
  for (const height of [0.31, 0.64]) {
    builder.ring(0.096, 0.009, [-0.22, height, -1.47], "blueGlow");
  }
  createBook(builder, [-3.08, 1.3, -1.73], 0.39, 0.49, "book");
  createBook(builder, [-3.12, 1.36, -1.72], 0.36, 0.46, "cushion");
  createMug(builder, [-2.68, 1.3, -1.31], 0.82);
  builder.cylinder(0.08, 0.075, 0.18, [-3.23, 1.37, -2.08], "ceramic");
  for (let index = 0; index < 4; index++) {
    builder.rod(
      [-3.27 + index * 0.025, 1.4, -2.08],
      [-3.3 + index * 0.047, 1.68, -2.1 + index * 0.008],
      0.009,
      index % 2 ? "woodDark" : "brass",
    );
  }
}

function createChairAndDeveloper(builder: ModelBuilder) {
  const chair = new Group();
  chair.position.set(-1.6, 0, -0.29);
  chair.rotation.y = -0.11;
  builder.group.add(chair);
  builder.cylinder(0.065, 0.08, 0.51, [0, 0.38, 0], "metal", chair);
  for (let index = 0; index < 5; index++) {
    const angle = (index / 5) * Math.PI * 2;
    const end: Point = [Math.sin(angle) * 0.45, 0.1, Math.cos(angle) * 0.45];
    builder.rod([0, 0.18, 0], end, 0.028, "metal", chair);
    builder.sphere([0.07, 0.068, 0.055], end, "metal", chair);
  }
  builder.box([0.78, 0.16, 0.7], [0, 0.67, -0.06], "metal", 0.08, chair);
  const chairBack = builder.box(
    [0.75, 0.84, 0.14],
    [0, 1.13, 0.26],
    "metal",
    0.075,
    chair,
  );
  chairBack.rotation.x = 0.08;
  builder.box([0.45, 0.18, 0.15], [0, 1.61, 0.31], "metal", 0.065, chair);
  for (const horizontal of [-0.4, 0.4]) {
    builder.rod(
      [horizontal, 0.65, 0.06],
      [horizontal, 1.06, 0.06],
      0.035,
      "metal",
      chair,
    );
    builder.box(
      [0.11, 0.065, 0.42],
      [horizontal, 1.06, -0.04],
      "metal",
      0.03,
      chair,
    );
  }
  createDeveloper(builder, chair);
}

function createDeveloper(builder: ModelBuilder, chair: Group) {
  builder.box([0.55, 0.59, 0.35], [0, 1.12, -0.025], "shirt", 0.13, chair);
  builder.sphere([0.27, 0.16, 0.21], [0, 0.78, -0.11], "trousers", chair);
  builder.cylinder(0.078, 0.09, 0.14, [0, 1.47, -0.055], "skin", chair);
  builder.sphere([0.21, 0.26, 0.21], [0, 1.72, -0.09], "skin", chair);
  builder.sphere([0.222, 0.19, 0.216], [0, 1.83, -0.065], "hair", chair);
  builder.sphere([0.12, 0.15, 0.075], [0, 1.7, 0.088], "hair", chair);
  for (const side of [-1, 1]) {
    builder.sphere(
      [0.047, 0.072, 0.037],
      [side * 0.205, 1.7, -0.081],
      "skin",
      chair,
    );
    builder.rod(
      [side * 0.18, 0.77, -0.16],
      [side * 0.21, 0.68, -0.56],
      0.115,
      "trousers",
      chair,
    );
    builder.rod(
      [side * 0.21, 0.66, -0.56],
      [side * 0.23, 0.2, -0.62],
      0.085,
      "trousers",
      chair,
    );
    builder.box(
      [0.19, 0.12, 0.34],
      [side * 0.23, 0.13, -0.73],
      "ceramic",
      0.055,
      chair,
    );
    builder.rod(
      [side * 0.28, 1.3, -0.035],
      [side * 0.36, 1.04, -0.32],
      0.085,
      "shirt",
      chair,
    );
    builder.rod(
      [side * 0.36, 1.04, -0.32],
      [side * 0.24, 1.23, -0.69],
      0.065,
      "shirt",
      chair,
    );
    builder.sphere(
      [0.07, 0.045, 0.11],
      [side * 0.24, 1.25, -0.76],
      "skin",
      chair,
    );
  }
  const headphones = builder.ring(
    0.239,
    0.025,
    [0, 1.78, -0.075],
    "metal",
    chair,
  );
  headphones.rotation.y = Math.PI / 2;
  for (const side of [-1, 1]) {
    builder.sphere(
      [0.04, 0.085, 0.067],
      [side * 0.233, 1.72, -0.075],
      "metal",
      chair,
    );
  }
}

function createLivingCorner(builder: ModelBuilder) {
  const firstFurnitureIndex = builder.group.children.length;
  builder.box([3.32, 0.035, 3.17], [1.91, 0.055, 1.08], "rug", 0.11);
  for (let index = 0; index < 11; index++) {
    builder.box(
      [3.07, 0.007, 0.016],
      [1.91, 0.078, -0.32 + index * 0.275],
      "rugStripe",
      0.004,
    );
  }
  for (const horizontal of [0.78, 3.21]) {
    for (const depth of [-0.21, 0.75]) {
      builder.cylinder(
        0.065,
        0.046,
        0.2,
        [horizontal, 0.18, depth],
        "woodDark",
      );
    }
  }
  builder.box([2.85, 0.37, 1.21], [2, 0.42, 0.25], "sofa", 0.13);
  builder.box([2.92, 0.82, 0.26], [2, 0.87, -0.31], "sofa", 0.11);
  for (const horizontal of [0.65, 3.35]) {
    builder.box([0.27, 0.63, 1.25], [horizontal, 0.73, 0.24], "sofa", 0.12);
  }
  for (const horizontal of [1.39, 2.59]) {
    builder.box([1.13, 0.22, 0.92], [horizontal, 0.68, 0.33], "linen", 0.1);
    const cushion = builder.box(
      [1.12, 0.54, 0.22],
      [horizontal, 1.01, -0.135],
      "linen",
      0.1,
    );
    cushion.rotation.x = -0.13;
  }
  const pillow = builder.box(
    [0.47, 0.47, 0.2],
    [3.02, 1.03, 0.065],
    "cushion",
    0.105,
  );
  pillow.rotation.set(-0.15, -0.25, 0.2);
  const secondPillow = builder.box(
    [0.48, 0.42, 0.18],
    [0.98, 0.99, 0.1],
    "rug",
    0.1,
  );
  secondPillow.rotation.set(-0.16, 0.2, -0.2);
  builder.box([0.64, 0.045, 0.89], [2.67, 0.811, 0.37], "cushion", 0.025);
  builder.box([0.64, 0.42, 0.045], [2.67, 0.63, 0.832], "cushion", 0.025);
  for (let index = 0; index < 7; index++) {
    builder.rod(
      [2.4 + index * 0.085, 0.43, 0.847],
      [2.4 + index * 0.085, 0.375, 0.847],
      0.009,
      "linen",
    );
  }
  createCoffeeTable(builder);
  const furniture = builder.group.children.slice(firstFurnitureIndex);
  const livingCorner = new Group();
  livingCorner.position.set(2, 0, 1.08);
  builder.group.add(livingCorner);
  for (const object of furniture) {
    object.position.x -= 2;
    object.position.z -= 1.08;
    livingCorner.add(object);
  }
  livingCorner.rotation.y = Math.PI;
}

function createCoffeeTable(builder: ModelBuilder) {
  const tabletop = builder.cylinder(
    0.8,
    0.8,
    0.105,
    [1.93, 0.53, 1.85],
    "woodLight",
  );
  tabletop.scale.z = 0.76;
  for (let index = 0; index < 3; index++) {
    const angle = (index / 3) * Math.PI * 2 + 0.4;
    builder.rod(
      [1.93 + Math.cos(angle) * 0.4, 0.47, 1.85 + Math.sin(angle) * 0.3],
      [1.93 + Math.cos(angle) * 0.5, 0.09, 1.85 + Math.sin(angle) * 0.4],
      0.065,
      "woodDark",
    );
  }
  builder.box([0.72, 0.05, 0.62], [1.82, 0.645, 1.86], "book", 0.008);
  builder.box([0.7, 0.01, 0.6], [1.82, 0.67, 1.86], "pages", 0.004);
  builder.box([0.012, 0.002, 0.6], [1.82, 0.676, 1.86], "woodDark");
  for (let line = 0; line < 7; line++) {
    builder.box(
      [0.24, 0.002, 0.005],
      [1.64, 0.676, 1.64 + line * 0.06],
      "rugStripe",
    );
  }
  createMug(builder, [2.27, 0.592, 1.65], 1);
  builder.cylinder(0.17, 0.17, 0.016, [2.22, 0.592, 2.09], "woodDark");
}

function createBook(
  builder: ModelBuilder,
  position: Point,
  width: number,
  depth: number,
  material: MaterialName,
) {
  builder.box([width, 0.054, depth], position, material, 0.009);
  builder.box(
    [width - 0.018, 0.028, depth - 0.018],
    [position[0] + 0.005, position[1], position[2]],
    "pages",
    0.003,
  );
}

function createMug(builder: ModelBuilder, position: Point, scale: number) {
  builder.cylinder(
    0.089 * scale,
    0.071 * scale,
    0.17 * scale,
    [position[0], position[1] + 0.085 * scale, position[2]],
    "ceramic",
  );
  builder.cylinder(
    0.073 * scale,
    0.073 * scale,
    0.005,
    [position[0], position[1] + 0.173 * scale, position[2]],
    "coffee",
  );
  builder.ring(
    0.054 * scale,
    0.016 * scale,
    [position[0] + 0.096 * scale, position[1] + 0.092 * scale, position[2]],
    "ceramic",
  );
}

function createPlant(builder: ModelBuilder, position: Point, scale: number) {
  const plant = new Group();
  plant.position.set(...position);
  plant.scale.setScalar(scale);
  builder.group.add(plant);
  builder.cylinder(0.26, 0.19, 0.48, [0, 0.25, 0], "ceramic", plant);
  builder.cylinder(0.237, 0.237, 0.015, [0, 0.495, 0], "soil", plant);
  builder.ring(0.249, 0.017, [0, 0.48, 0], "ceramic", plant).rotation.x =
    Math.PI / 2;
  for (let index = 0; index < 12; index++) {
    const angle = index * 2.399;
    const height = 0.8 + (index % 5) * 0.24;
    const horizontal = Math.cos(angle) * (0.3 + (index % 3) * 0.12);
    const depth = Math.sin(angle) * (0.3 + (index % 3) * 0.12);
    builder.rod(
      [0, 0.48, 0],
      [horizontal * 0.76, height, depth * 0.76],
      0.012,
      "leaf",
      plant,
    );
    const leaf = builder.sphere(
      [0.125, 0.34, 0.032],
      [horizontal, height + 0.08, depth],
      index % 3 ? "leaf" : "leafLight",
      plant,
    );
    leaf.rotation.set(Math.sin(angle) * 0.6, -angle, -Math.cos(angle) * 0.65);
  }
}

function createDecor(builder: ModelBuilder) {
  builder.box([1.55, 0.9, 0.105], [2.94, 2.44, -2.78], "metal", 0.045);
  builder.box([1.41, 0.76, 0.015], [2.94, 2.44, -2.718], "screen", 0.025);
  builder.box([0.79, 0.015, 0.01], [2.94, 2.43, -2.703], "blueGlow");
  builder.box([0.41, 0.012, 0.01], [2.94, 2.36, -2.702], "brass");
  builder.box([1.67, 0.09, 0.43], [2.96, 1.49, -2.65], "woodLight", 0.025);
  for (let index = 0; index < 6; index++) {
    builder.box(
      [0.085, 0.3 + (index % 3) * 0.045, 0.23],
      [2.38 + index * 0.11, 1.69, -2.65],
      index % 2 ? "linen" : "book",
      0.007,
    );
  }
  builder.cylinder(0.1, 0.073, 0.25, [3.42, 1.67, -2.62], "ceramic");
  builder.sphere([0.15, 0.16, 0.14], [3.42, 1.91, -2.62], "leaf");
  createPlant(builder, [0.94, 0, -2.08], 1.18);
  createPlant(builder, [-3.41, 0, 1.4], 0.88);
  builder.box([0.57, 0.68, 0.61], [-3.18, 0.37, -0.58], "wood", 0.035);
  builder.box([0.62, 0.07, 0.65], [-3.18, 0.76, -0.58], "woodLight", 0.03);
  createBook(builder, [-3.18, 0.82, -0.58], 0.4, 0.45, "linen");
}

function createPracticalLights(
  builder: ModelBuilder,
  glow: MeshStandardMaterial,
) {
  const floorPosition: Point = [-3.38, 0, -2.17];
  builder.cylinder(
    0.28,
    0.3,
    0.07,
    [floorPosition[0], 0.08, floorPosition[2]],
    "metal",
  );
  builder.rod(
    [floorPosition[0], 0.1, floorPosition[2]],
    [floorPosition[0], 2.58, floorPosition[2]],
    0.033,
    "brass",
  );
  builder.sphere(
    [0.41, 0.35, 0.41],
    [floorPosition[0], 2.68, floorPosition[2]],
    "glow",
  );
  builder.cylinder(
    0.412,
    0.412,
    0.035,
    [floorPosition[0], 2.62, floorPosition[2]],
    "brass",
  );
  const floorLight = new PointLight("#ffb35c", 18, 6, 2);
  floorLight.position.set(floorPosition[0], 2.48, floorPosition[2] + 0.12);
  builder.group.add(floorLight);
  builder.cylinder(0.19, 0.22, 0.045, [-0.16, 1.3, -1.59], "brass");
  builder.rod([-0.16, 1.31, -1.59], [-0.16, 1.88, -1.59], 0.022, "brass");
  builder.cylinder(0.21, 0.32, 0.29, [-0.16, 1.98, -1.59], "glow");
  builder.cylinder(0.213, 0.213, 0.015, [-0.16, 2.13, -1.59], "brass");
  const deskLight = new PointLight("#ffbd71", 6, 3, 2);
  deskLight.position.set(-0.16, 1.82, -1.55);
  builder.group.add(deskLight);
  return {
    setLamp(enabled: boolean) {
      floorLight.intensity = enabled ? 18 : 0;
      deskLight.intensity = enabled ? 6 : 0;
      glow.emissiveIntensity = enabled ? 1.6 : 0;
      glow.color.set(enabled ? "#ffd595" : "#d0b78e");
    },
    dispose() {
      floorLight.dispose();
      deskLight.dispose();
    },
  };
}

export function createWorkspaceModel() {
  const materialResources = createWorkspaceMaterials();
  const builder = createModelBuilder(materialResources.materials);
  let disposePracticalLights = () => {};
  try {
    createArchitecture(builder);
    createDesk(builder);
    createChairAndDeveloper(builder);
    createLivingCorner(builder);
    createDecor(builder);
    const lighting = createPracticalLights(
      builder,
      materialResources.materials.glow,
    );
    disposePracticalLights = lighting.dispose;
    return {
      group: builder.group,
      setTheme(isDark: boolean) {
        materialResources.setTheme(isDark);
        lighting.setLamp(isDark);
      },
      dispose() {
        disposePracticalLights();
        builder.dispose();
        materialResources.dispose();
        builder.group.clear();
      },
    };
  } catch (error) {
    disposePracticalLights();
    builder.dispose();
    materialResources.dispose();
    throw error;
  }
}
