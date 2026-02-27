import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------- NETWORK (SUBTLE) ---------- */

function Network() {
  const group: any = useRef();
  const { mouse } = useThree();

  const nodes = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < 60; i++) {
      arr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 6
        )
      );
    }
    return arr;
  }, []);

  const connections = useMemo(() => {
    const list: [THREE.Vector3, THREE.Vector3][] = [];
    nodes.forEach((a, i) => {
      nodes.slice(i + 1).forEach((b) => {
        if (a.distanceTo(b) < 1.6) list.push([a, b]);
      });
    });
    return list;
  }, [nodes]);

  useFrame(() => {
    group.current.rotation.y += 0.0004;
    group.current.rotation.x = mouse.y * 0.08;
  });

  return (
    <group ref={group}>
      {/* nodes */}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.55} />
        </mesh>
      ))}

      {/* connections */}
      {connections.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color="#22d3ee"
          transparent
          opacity={0.08}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

/* ---------- AI CORE (SUBTLE CENTER) ---------- */

function Core() {
  const ref: any = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.0008;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.9, 1]} />
      <meshStandardMaterial
        color="#6366f1"
        wireframe
        transparent
        opacity={0.35}
        emissive="#6366f1"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

/* ---------- MAIN ---------- */

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]}>
      <color attach="background" args={["#020617"]} />

      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={0.8} />

      <Network />
      <Core />
    </Canvas>
  );
}
