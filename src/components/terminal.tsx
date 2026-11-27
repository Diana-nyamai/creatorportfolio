"use client";

import { useState } from "react";
import { TypingCode } from "./motion/typing-code";
import { Play } from "lucide-react";

export function Terminal() {
  const [ran, setRan] = useState(false);
  return (
    <div className="terminal">
      <div className="terminal-top">
        <span className="terminal-dots" aria-hidden="true"><i /><i /><i /></span>
        <span>hello-world.js</span>
        <button type="button" aria-label={ran ? "Reset terminal" : "Run terminal snippet"} aria-pressed={ran} onClick={() => setRan(!ran)}>
          <Play size={13} aria-hidden="true" />
        </button>
      </div>
      <div className="terminal-content">
        <TypingCode />
        <span className="terminal-output" aria-live="polite">{ran ? "› hello from ndinda ♡" : ""}</span>
      </div>
    </div>
  );
}
