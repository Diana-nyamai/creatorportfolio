"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site-config";
import { Flower } from "./art";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  function links() {
    return navigation.map(({ label, href }) => (
      <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={path === href ? "page" : undefined}>
        {label}
      </Link>
    ));
  }

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="shell header-inner">
        <Link href="/#home" className="site-logo" onClick={() => setOpen(false)}><Flower /> ndinda codes<span>.</span></Link>
        <nav aria-label="Main navigation" className="nav-desktop">{links()}</nav>
        <Link className="button button-nav" href="/#contact">Let’s work together <Heart size={15} aria-hidden="true" /></Link>
        <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div id="mobile-navigation">
        <AnimatePresence initial={false}>
          {open && (
            <motion.nav className="nav-mobile" aria-label="Mobile navigation"
              initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
              {links()}
              <Link className="button button-nav-mobile" href="/#contact" onClick={() => setOpen(false)}>
                Let’s work together <Heart size={15} aria-hidden="true" />
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
