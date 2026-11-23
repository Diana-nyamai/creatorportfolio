"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  const router = useRouter();

  return (
    <main id="main" className="section shell centered">
      <h1 className="section-title">a little hiccup</h1>
      <p>Something went wrong loading this page.</p>
      <div className="hero-actions justify-center">
        <button className="button button-primary" onClick={() => { router.refresh(); reset(); }}>Try again</button>
        <Link className="button button-outline" href="/">Back home</Link>
      </div>
    </main>
  );
}
