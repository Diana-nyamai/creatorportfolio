"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ComponentProps } from "react";

const MotionLink = motion.create(Link);
const spring = { type: "spring" as const, stiffness: 420, damping: 24 };

export function SpringLink(props: Pick<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const reduced = useReducedMotion();
  return <MotionLink {...props} whileTap={reduced ? undefined : { scale: 0.97 }} transition={spring} />;
}

export function SpringButton({ className, disabled, children }: Pick<ComponentProps<"button">, "className" | "disabled" | "children">) {
  const reduced = useReducedMotion();
  return <motion.button type="submit" className={className} disabled={disabled} whileTap={reduced ? undefined : { scale: 0.97 }}
    transition={spring}>{children}</motion.button>;
}
