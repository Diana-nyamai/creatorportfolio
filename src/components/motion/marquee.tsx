"use client";

import { useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

export function Marquee({ children, className, label }: { children: ReactNode; className: string; label: string }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className={`marquee ${className}`} data-paused={paused}>
      <div className="marquee-viewport">
        <div className="marquee-track">
          <div className="marquee-group">{children}</div>
          <div className="marquee-group marquee-copy" aria-hidden="true" inert>{children}</div>
        </div>
      </div>
      <button type="button" className="marquee-toggle" aria-label={`${paused ? "Resume" : "Pause"} ${label}`}
        onClick={() => setPaused(!paused)}>
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      </button>
    </div>
  );
}
