import { Group, IcosahedronGeometry, Mesh, type Material } from "three";
import { seaGlassPieces } from "@/features/figure/entities/sea-glass-motion";

export function buildSeaGlass(material: Material) {
  const seaGlass = new Group();
  seaGlass.name = "sea-glass";
  seaGlassPieces.forEach((piece, pieceIndex) => {
    const pebble = new Mesh(new IcosahedronGeometry(piece.size, 2), material);
    pebble.scale.set(1.25, 0.8, 0.7);
    pebble.position.set(piece.restX, piece.restY, piece.restZ);
    pebble.rotation.set(0.4 * pieceIndex, 0.7 * pieceIndex, 0.3);
    seaGlass.add(pebble);
  });
  return seaGlass;
}
