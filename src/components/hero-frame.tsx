"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { ArrowDown, CodeXml, Heart } from "lucide-react";
import { site } from "@/data/site-config";
import { Flower } from "./art";

import { BlurFade } from "./motion/blur-fade";
import { SpringLink } from "./motion/spring-action";

export function HeroFrame({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 22 });
  const springY = useSpring(y, { stiffness: 80, damping: 22 });

  const vertical = useTransform(() => springY.get() + drift.get());

  function parallax(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(min-width: 900px) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 19);
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 15);
  }

  return (
    <section ref={heroRef} className="hero paper" id="home" aria-labelledby="hero-title" onPointerMove={parallax}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      <div className="shell hero-grid">
        <div className="hero-copy">
          <BlurFade as="p" className="hero-eyebrow"><CodeXml size={17} aria-hidden="true" />{site.hero.eyebrow}</BlurFade>
          <BlurFade as="h1" id="hero-title" delay={0.08}>{site.hero.heading}<br /><span>{site.hero.name}<Flower /></span></BlurFade>
          <BlurFade as="p" className="hero-subtitle" delay={0.16}>{site.hero.subtitle}</BlurFade>
          <BlurFade as="p" className="hero-description" delay={0.22}>{site.hero.description}</BlurFade>
          <BlurFade className="hero-actions" delay={0.29}>
            <SpringLink className="button button-primary" href="#work">Explore my work</SpringLink>
            <a className="button button-outline" href="#contact">Let’s collaborate <Heart size={16} aria-hidden="true" /></a>
          </BlurFade>
        </div>
        <motion.div className="hero-art" initial={reduced ? false : { scale: 0.98, y: 18, rotate: -2 }}
          animate={{ scale: 1, y: 0, rotate: 0 }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.16 }}>
          <motion.div className="hero-parallax" style={reduced ? undefined : { x: springX, y: vertical }}>{children}</motion.div>
        </motion.div>
        <a className="scroll-note" href="#about"><span><ArrowDown size={14} aria-hidden="true" /></span> scroll a little</a>
      </div>
    </section>
  );
}
