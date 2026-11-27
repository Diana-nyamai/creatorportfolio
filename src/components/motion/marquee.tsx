import type { ReactNode } from "react";

export function Marquee({ children, className, label }: { children: ReactNode; className: string; label: string }) {
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-viewport" role="group" aria-label={label} tabIndex={0}>
        <div className="marquee-track">
          <div className="marquee-group">{children}</div>
          <div className="marquee-group marquee-copy" aria-hidden="true" inert>{children}</div>
        </div>
      </div>
    </div>
  );
}
