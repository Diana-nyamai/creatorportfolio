"use client";

import { Environment, Float, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, type ReactNode, type RefObject } from "react";
import { MathUtils, type Group } from "three";
import { propSlots, type PropMotion } from "./hero-props";

type SceneProps = {
  controls: RefObject<PropMotion[]>;
  visible: boolean;
  onReady: () => void;
  onFailure: () => void;
};

function CodeMarks({ z, color }: { z: number; color: string }) {
  return (
    <group position={[0, 0, z]}>
      {[
        [-0.22, 0.095, -Math.PI / 4], [-0.22, -0.095, Math.PI / 4],
        [0.22, 0.095, Math.PI / 4], [0.22, -0.095, -Math.PI / 4],
        [0, 0, -0.45],
      ].map(([x, y, angle], index) => (
        <RoundedBox key={index} args={[0.052, index === 4 ? 0.36 : 0.23, 0.022]} radius={0.012}
          smoothness={2} position={[x, y, 0]} rotation={[0, 0, angle]}>
          <meshStandardMaterial color={color} roughness={0.48} />
        </RoundedBox>
      ))}
    </group>
  );
}

function Keycap() {
  return (
    <group>
      <RoundedBox args={[1.33, 1.24, 0.43]} radius={0.16} smoothness={3}>
        <meshStandardMaterial color="#9881be" roughness={0.52} />
      </RoundedBox>
      <RoundedBox args={[1.12, 1.04, 0.24]} radius={0.16} smoothness={3} position={[0, 0, 0.25]}>
        <meshStandardMaterial color="#e8d6ff" roughness={0.31} />
      </RoundedBox>
      <CodeMarks z={0.365} color="#5b427b" />
    </group>
  );
}

function IcedCoffee() {
  return (
    <group>
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.5, 0.35, 1.13, 24]} />
        <meshStandardMaterial color="#b67147" roughness={0.27} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.46, 0.418, 0.33, 24]} />
        <meshStandardMaterial color="#f1c698" roughness={0.78} />
      </mesh>
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.53, 0.53, 0.13, 24]} />
        <meshStandardMaterial color="#fff0db" roughness={0.26} />
      </mesh>
      <mesh position={[0.17, 0.69, -0.16]} rotation={[0, 0, -0.23]}>
        <cylinderGeometry args={[0.046, 0.046, 0.49, 12]} />
        <meshStandardMaterial color="#d08198" roughness={0.35} />
      </mesh>
      <mesh position={[-0.19, 0.55, 0.11]} rotation={[0.1, 0.48, 0.15]}>
        <boxGeometry args={[0.21, 0.15, 0.2]} />
        <meshStandardMaterial color="#e7ddcd" roughness={0.2} />
      </mesh>
    </group>
  );
}

function TerminalBadge() {
  return (
    <group>
      <RoundedBox args={[1.44, 1.05, 0.28]} radius={0.14} smoothness={3}>
        <meshStandardMaterial color="#baa2d7" roughness={0.36} />
      </RoundedBox>
      <RoundedBox args={[1.3, 0.9, 0.08]} radius={0.1} smoothness={3} position={[0, 0, 0.14]}>
        <meshStandardMaterial color="#473753" roughness={0.25} />
      </RoundedBox>
      <group position={[0, -0.08, 0]} scale={0.87}>
        <CodeMarks z={0.216} color="#e4cef7" />
      </group>
      {["#f5adc4", "#efd59e", "#c1d8bc"].map((color, index) => (
        <mesh key={color} position={[-0.47 + index * 0.14, 0.28, 0.188]}>
          <sphereGeometry args={[0.039, 10, 8]} />
          <meshStandardMaterial color={color} roughness={0.38} />
        </mesh>
      ))}
    </group>
  );
}

const models = [Keycap, IcedCoffee, TerminalBadge];

function FloatingProp({ index, control, children }: { index: number; control: PropMotion; children: ReactNode }) {
  const mesh = useRef<Group>(null);
  const { width, height } = useThree((state) => state.viewport);
  const { x, y } = propSlots[index];

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const rotation = mesh.current.rotation;
    rotation.x = MathUtils.damp(rotation.x, 0.23 + control.pitch, 6, delta);
    rotation.y = MathUtils.damp(rotation.y, -0.32 + control.yaw + control.spin, 6, delta);
    rotation.z = index === 1 ? 0.22 : -0.18;
  });

  return (
    <group position={[(x / 100 - 0.5) * width, (0.5 - y / 100) * height, 0]} scale={width * 0.092}>
      <Float speed={1.2 + index * 0.18} rotationIntensity={0.14} floatIntensity={0.18}>
        <group ref={mesh}>{children}</group>
      </Float>
    </group>
  );
}

function SceneLifecycle({ onReady, onFailure }: Pick<SceneProps, "onReady" | "onFailure">) {
  const canvas = useThree((state) => state.gl.domElement);
  const shown = useRef(false);

  useFrame(() => {
    if (shown.current) return;
    shown.current = true;
    onReady();
  });

  useEffect(() => {
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [canvas, onFailure]);

  return null;
}

export function Hero3DScene({ controls, visible, onReady, onFailure }: SceneProps) {
  return (
    <div className="hero-prop-canvas" aria-hidden="true">
      <Canvas orthographic camera={{ position: [0, 0, 9], zoom: 100 }} dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power", failIfMajorPerformanceCaveat: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[-3, 5, 6]} intensity={2.15} />
        <Suspense fallback={null}>
          <Environment files="/lighting/potsdamer-platz-256.hdr" environmentIntensity={0.85} />
        </Suspense>
        {models.map((Model, index) => (
          <FloatingProp key={propSlots[index].id} index={index} control={controls.current[index]}><Model /></FloatingProp>
        ))}
        <SceneLifecycle onReady={onReady} onFailure={onFailure} />
      </Canvas>
    </div>
  );
}
