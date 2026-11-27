"use client";

import { motion, useInView, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { formatCount } from "@/lib/format";

export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const entered = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);
  const count = useSpring(0, { stiffness: 48, damping: 17, restDelta: 0.5 });
  const display = useTransform(count, (current) => formatCount(Math.round(Math.min(value, Math.max(0, current)))));

  useEffect(() => {
    if (!entered || reduced !== false) return;
    const frame = requestAnimationFrame(() => setStarted(true));
    count.set(value);
    return () => cancelAnimationFrame(frame);
  }, [count, entered, reduced, value]);

  return (
    <span ref={ref}>
      <span className="sr-only">{formatCount(value)}</span>
      <span aria-hidden="true">{started && !reduced ? <motion.span>{display}</motion.span> : formatCount(value)}</span>
    </span>
  );
}
