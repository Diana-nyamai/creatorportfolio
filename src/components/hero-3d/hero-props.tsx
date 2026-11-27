"use client";

import dynamic from "next/dynamic";
import { CodeXml, Coffee, SquareTerminal } from "lucide-react";
import { Component, useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";

const Hero3DScene = dynamic(() => import("./hero-3d-scene").then((module) => module.Hero3DScene), { ssr: false });

export const propSlots = [
  { id: "keycap", label: "Code keycap", x: 10, y: 24, Icon: CodeXml },
  { id: "coffee", label: "Iced coffee", x: 9, y: 64, Icon: Coffee },
  { id: "terminal", label: "Terminal badge", x: 90, y: 69, Icon: SquareTerminal },
] as const;

export type PropMotion = { pitch: number; yaw: number; spin: number };
class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function HeroProps() {
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => { setReady(false); setFailed(true); }, []);
  const controls = useRef<PropMotion[]>(propSlots.map(() => ({ pitch: 0, yaw: 0, spin: 0 })));
  const drag = useRef<{ index: number; x: number; y: number; moved: boolean } | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => {
      setEnabled(media.matches);
      if (!media.matches) setReady(false);
    };
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (host.current) observer.observe(host.current);
    return () => { observer.disconnect(); media.removeEventListener("change", update); };
  }, []);

  const [requested, setRequested] = useState(false);
  useEffect(() => {
    if (!enabled || !visible || requested || failed) return;
    const timer = window.setTimeout(() => setRequested(true), 300);
    return () => window.clearTimeout(timer);
  }, [enabled, visible, requested, failed]);

  useEffect(() => {
    if (!enabled || !ready || !visible || failed) return;
    function move(event: globalThis.PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const { left, top, width, height } = host.current?.getBoundingClientRect() ?? {};
      if (left === undefined || top === undefined || !width || !height) return;
      const x = (event.clientX - left) / width;
      const y = (event.clientY - top) / height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      for (const control of controls.current) {
        control.pitch = inside ? (y - 0.5) * 0.35 : 0;
        control.yaw = inside ? (x - 0.5) * 0.5 : 0;
      }
    }
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, ready, visible, failed]);

  function dragProp(event: PointerEvent<HTMLButtonElement>) {
    const state = drag.current;
    if (!state || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const x = event.clientX - state.x;
    const y = event.clientY - state.y;
    if (!state.moved && Math.hypot(x, y) < 4) return;
    state.moved = true;
    controls.current[state.index].spin += (x - y * 0.45) * 0.028;
    state.x = event.clientX;
    state.y = event.clientY;
  }

  const active = enabled && ready && !failed;

  return (
    <div className="hero-props" ref={host} data-webgl={active}>
      {enabled && requested && !failed && (
        <SceneBoundary onFailure={onFailure}>
          <Hero3DScene controls={controls} visible={visible} onReady={onReady} onFailure={onFailure} />
        </SceneBoundary>
      )}
      {propSlots.map(({ id, label, x, y, Icon }, index) => {
        const style = { "--prop-x": `${x}%`, "--prop-y": `${y}%` } as CSSProperties;
        return active ? (
          <button key={id} className="hero-prop-hit" style={style} aria-label={`Spin the ${label.toLowerCase()}`}
            type="button"
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              drag.current = { index, x: event.clientX, y: event.clientY, moved: false };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={dragProp}
            onPointerCancel={() => { drag.current = null; }}
            onClick={(event) => {
              if (event.detail === 0 || !drag.current?.moved) controls.current[index].spin += Math.PI * 2;
              drag.current = null;
            }} />
        ) : <span key={id} className={`hero-prop-sticker hero-prop-${id}`} style={style} aria-hidden="true"><Icon size={23} /></span>;
      })}
    </div>
  );
}
