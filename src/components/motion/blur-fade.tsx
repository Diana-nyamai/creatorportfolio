"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";

export function BlurFade({ as = "div", children, delay = 0, onScroll = false, tilt = false, ...props }: {
  as?: "div" | "p" | "h1" | "li";
  children: ReactNode;
  delay?: number;
  onScroll?: boolean;
  tilt?: boolean;
} & Pick<ComponentProps<"div">, "className" | "id">) {
  const Element = motion[as];
  const reduced = useReducedMotion();
  const reveal = { opacity: [0.25, 1], y: [12, 0], filter: ["blur(8px)", "blur(0px)"] };

  return (
    <Element {...props} initial={false}
      animate={!reduced && !onScroll ? reveal : undefined}
      whileInView={!reduced && onScroll ? reveal : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.52, delay, ease: "easeOut" }}
      whileHover={!reduced && tilt ? { scale: 1.045, rotate: 3, transition: { type: "spring", stiffness: 310, damping: 19 } } : undefined}>
      {children}
    </Element>
  );
}
