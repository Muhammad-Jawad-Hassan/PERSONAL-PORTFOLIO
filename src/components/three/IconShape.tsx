"use client";

import { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

type IconShapeProps = {
  src: string;
  size: number;
  color: string;
  emissiveIntensity?: number;
  tubeRadius?: number;
};

const POINTS_PER_CURVE = 48;
const RADIAL_SEGMENTS = 8;
const CLOSE_EPSILON = 0.5;

export function IconShape({
  src,
  size,
  color,
  emissiveIntensity = 1.4,
  tubeRadius = 0.7,
}: IconShapeProps) {
  const data = useLoader(SVGLoader, src);

  const { geometries, scale, center } = useMemo(() => {
    const geos: THREE.TubeGeometry[] = [];
    const bbox = new THREE.Box3();

    for (const path of data.paths) {
      for (const subPath of path.subPaths) {
        const pts2d = subPath.getPoints(POINTS_PER_CURVE);
        if (pts2d.length < 2) continue;
        const pts3d = pts2d.map((p) => {
          const v = new THREE.Vector3(p.x, -p.y, 0);
          bbox.expandByPoint(v);
          return v;
        });
        const closed =
          pts3d.length > 2 &&
          pts3d[0].distanceTo(pts3d[pts3d.length - 1]) < CLOSE_EPSILON;
        // Drop duplicate close point so CatmullRomCurve3 doesn't kink the loop.
        const curvePoints = closed ? pts3d.slice(0, -1) : pts3d;
        const curve = new THREE.CatmullRomCurve3(
          curvePoints,
          closed,
          "catmullrom",
          0.0,
        );
        const tubularSegments = Math.max(24, curvePoints.length * 2);
        geos.push(
          new THREE.TubeGeometry(
            curve,
            tubularSegments,
            tubeRadius,
            RADIAL_SEGMENTS,
            closed,
          ),
        );
      }
    }

    const c = bbox.getCenter(new THREE.Vector3());
    const sz = bbox.getSize(new THREE.Vector3());
    const maxDim = Math.max(sz.x, sz.y) || 1;
    const targetScale = (size * 2.6) / maxDim;

    return { geometries: geos, scale: targetScale, center: c };
  }, [data, tubeRadius, size]);

  useEffect(() => {
    return () => {
      geometries.forEach((g) => g.dispose());
    };
  }, [geometries]);

  return (
    <group scale={scale}>
      <group position={[-center.x, -center.y, 0]}>
        {geometries.map((geo, i) => (
          <mesh key={i} geometry={geo} castShadow receiveShadow>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={emissiveIntensity}
              metalness={0.55}
              roughness={0.35}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
