import type { CSSProperties } from "react";

const cursors = [
  { start: [14, 155], end: [113, 228], delay: 190, size: 0.58 },
  { start: [45, 177], end: [130, 237], delay: 245, size: 0.74 },
  { start: [4, 225], end: [104, 242], delay: 280, size: 0.54 },
  { start: [59, 213], end: [121, 249], delay: 305, size: 0.77 },
  { start: [13, 271], end: [109, 261], delay: 325, size: 0.65 },
  { start: [34, 316], end: [119, 269], delay: 350, size: 0.66 },
  { start: [74, 325], end: [133, 263], delay: 405, size: 0.58 },
  { start: [72, 275], end: [128, 253], delay: 420, size: 0.84 },
  { start: [84, 188], end: [142, 247], delay: 455, size: 0.53 },
  { start: [92, 294], end: [141, 258], delay: 485, size: 0.67 },
] as const;

export function HeroCursorTrail() {
  return (
    <svg className="hero-cursor-trail" viewBox="0 0 600 540" aria-hidden="true" focusable="false">
      {cursors.map(({ start: [x, y], end: [endX, endY], delay, size }, index) => {
        const distance = Math.hypot(endX - x, endY - y);
        const style = {
          "--cursor-x": `${endX - x}px`,
          "--cursor-y": `${endY - y}px`,
          "--cursor-delay": `${delay}ms`,
          "--cursor-duration": `${Math.round(390 + distance * 3)}ms`,
        } as CSSProperties;

        return (
          <g key={index} transform={`translate(${x} ${y})`}>
            <g className="hero-cursor" style={style}>
              <path d="M0 0 2 18 6 12 11 15 13 12 8 8 15 7Z" transform={`rotate(105) scale(${size})`} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
