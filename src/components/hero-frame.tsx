"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { ArrowDown, CodeXml, Heart } from "lucide-react";
import { site } from "@/data/site-config";
import { Flower } from "./art";

const item = {
  rest: { y: 13 },
  visible: { y: 0, transition: { duration: 0.54, ease: "easeOut" as const } },
};

export function HeroFrame({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 22 });
  const springY = useSpring(y, { stiffness: 80, damping: 22 });

  function parallax(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(min-width: 900px) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 19);
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 15);
  }

  return (
    <section className="hero paper" id="home" aria-labelledby="hero-title" onPointerMove={parallax}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      <div className="shell hero-grid">
        <motion.div className="hero-copy" initial={reduced ? false : "rest"} animate="visible"
          transition={{ staggerChildren: 0.09 }}>
          <motion.p className="hero-eyebrow" variants={item}><CodeXml size={17} aria-hidden="true" />{site.hero.eyebrow}</motion.p>
          <motion.h1 id="hero-title" variants={item}>{site.hero.heading}<br /><span>{site.hero.name}<Flower /></span></motion.h1>
          <motion.p className="hero-subtitle" variants={item}>{site.hero.subtitle}</motion.p>
          <motion.p className="hero-description" variants={item}>{site.hero.description}</motion.p>
          <motion.div className="hero-actions" variants={item}>
            <a className="button button-primary" href="#work">Explore my work</a>
            <a className="button button-outline" href="#contact">Let’s collaborate <Heart size={16} aria-hidden="true" /></a>
          </motion.div>
        </motion.div>
        <motion.div className="hero-art" initial={reduced ? false : { scale: 0.98, y: 18, rotate: -2 }}
          animate={{ scale: 1, y: 0, rotate: 0 }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.16 }}>
          <motion.div className="hero-parallax" style={reduced ? undefined : { x: springX, y: springY }}>{children}</motion.div>
        </motion.div>
        <a className="scroll-note" href="#about"><span><ArrowDown size={14} aria-hidden="true" /></span> scroll a little</a>
      </div>
    </section>
  );
}
