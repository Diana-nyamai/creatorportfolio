"use client";

import { useState } from "react";
import { DarcyArt } from "./art";

const messages = ["meow, your code has bugs", "have you tried restarting it?", "i supervise the debugging"];

export function Darcy({ className = "" }: { className?: string }) {
  const [clicks, setClicks] = useState(0);
  const message = clicks ? messages[(clicks - 1) % messages.length] : "";

  return (
    <div className={`darcy ${className}`} data-active={clicks > 0}>
      <span className="darcy-speech" aria-live="polite">{message}</span>
      <button type="button" aria-label="Pet Darcy the cat" onClick={() => setClicks((value) => value + 1)}>
        <DarcyArt key={clicks} />
      </button>
    </div>
  );
}
