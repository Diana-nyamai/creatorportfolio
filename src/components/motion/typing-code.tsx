import type { CSSProperties } from "react";

const snippet = 'console.log("hello from ndinda ♡")';

export function TypingCode() {
  return (
    <code className="typing-code" style={{ "--characters": snippet.length } as CSSProperties}>
      <span className="typing-line" aria-hidden="true"><b>console</b>.log(<em>&quot;hello from ndinda ♡&quot;</em>)</span>
      <span className="sr-only">{snippet}</span>
    </code>
  );
}
