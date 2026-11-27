"use client";

import Image from "next/image";
import { ArrowUpRight, Bug, Clapperboard, CodeXml, Coffee, Keyboard, Play, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { brands } from "@/data/brands";
import { categories, reelUrl, type Category, type Reel } from "@/data/reels";
import { formatCount, formatDate } from "@/lib/format";
import { Flower, Instagram, Spark } from "./art";

const coverArt = {
  "Brand Collaborations": { tone: "mint", Icon: Clapperboard },
  "Tech & Coding": { tone: "lilac", Icon: CodeXml },
  "Developer Humor": { tone: "rose", Icon: Bug },
  Lifestyle: { tone: "yellow", Icon: Coffee },
  "Product Reviews": { tone: "blue", Icon: Keyboard },
} satisfies Record<Category, unknown>;

function ReelCard({ reel }: { reel: Reel }) {
  const url = reelUrl(reel);
  const { Icon, tone: categoryTone } = coverArt[reel.category];
  const tone = brands.find(({ name }) => name === reel.brand)?.color ?? categoryTone;
  const [showPlayer, setShowPlayer] = useState(false);
  const instagramPlayer = useRef<HTMLDialogElement>(null);
  const videoSrc = reel.sample ? undefined : reel.videoSrc;
  const embedUrl = !videoSrc && url && reel.embed ? `https://www.instagram.com${new URL(url).pathname.replace(/\/$/, "")}/embed/` : null;

  const content = (
    <>
      <div className={`reel-cover tone-${tone}`}>
        <div className="reel-visual">
          {reel.thumbnail ? <Image src={reel.thumbnail} alt="" fill sizes="(max-width: 620px) 46vw, (max-width: 980px) 30vw, 220px" /> :
            <div className="cover-drawing" aria-hidden="true"><Spark /><div><Icon /></div><Flower /></div>}
        </div>
        <span className="reel-cover-label">{reel.sample ? "Sample Reel" : reel.featured ? "Featured" : ""}</span>
        <Instagram className="reel-instagram" />
        {url && <span className="reel-overlay"><Play size={18} aria-hidden="true" /> Watch on Instagram</span>}
      </div>
      <div className="reel-caption">
        <span className="reel-category">{reel.category}</span>
        <h3>{reel.title} {url && <ArrowUpRight className="reel-external" size={16} aria-hidden="true" />}</h3>
        {reel.brand && reel.brand !== reel.title && <p className="reel-brand">{reel.brand}</p>}
        {reel.description && <p>{reel.description}</p>}
        {(reel.views !== undefined || reel.publishedDate) && <p className="reel-meta">
          {reel.views !== undefined && `${formatCount(reel.views)} views`}
          {reel.views !== undefined && reel.publishedDate && " · "}
          {reel.publishedDate && <time dateTime={reel.publishedDate}>{formatDate(reel.publishedDate)}</time>}
        </p>}
        {!url && !reel.sample && <p className="reel-meta">Reel link coming soon</p>}
      </div>
    </>
  );

  return (
    <article className="reel-card">
      {url ? <a href={url} target="_blank" rel="noopener noreferrer">{content}</a> : content}
      {videoSrc && <div className="reel-embed">
        <button type="button" aria-expanded={showPlayer} onClick={() => setShowPlayer(!showPlayer)}>
          {showPlayer ? "Hide player" : "Watch here"}
        </button>
        {showPlayer && (
          <video controls playsInline preload="none" src={videoSrc} poster={reel.thumbnail ?? undefined} aria-label={reel.title} />
        )}
      </div>}
      {url && embedUrl && (
        <div className="reel-embed">
          <button type="button" aria-haspopup="dialog" aria-label={`Load Instagram player for ${reel.title}`}
            onClick={() => { instagramPlayer.current?.showModal(); setShowPlayer(true); }}>
            Load Instagram player
          </button>
          <dialog className="reel-dialog" ref={instagramPlayer} aria-label={reel.title} onClose={() => setShowPlayer(false)}>
            <div className="reel-dialog-header">
              <h3>{reel.title}</h3>
              <button type="button" aria-label="Close Instagram player" onClick={() => instagramPlayer.current?.close()}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <a className="text-link" href={url} target="_blank" rel="noopener noreferrer"><Instagram /> Watch on Instagram</a>
            {showPlayer && <iframe src={embedUrl} title={`Instagram Reel: ${reel.title}`} loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin" allow="encrypted-media; fullscreen" allowFullScreen />}
          </dialog>
        </div>
      )}
    </article>
  );
}

export function Gallery({ entries }: { entries: Reel[] }) {
  const [filter, setFilter] = useState<Category | "All">("All");
  const reduced = useReducedMotion();
  const shown = filter === "All" ? entries : entries.filter(({ category }) => category === filter);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter Reels">
        {(["All", ...categories] as const).map((category) => (
          <button type="button" key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>
        ))}
      </div>
      <p className="sr-only" role="status">{shown.length} {shown.length === 1 ? "Reel" : "Reels"} shown</p>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div className="reel-grid" key={filter} initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.22 }}>
          {shown.length ? shown.map((reel) => <ReelCard key={reel.id} reel={reel} />) :
            <div className="gallery-empty"><Flower /><h3>No Reels here yet</h3><p>Try another category to keep exploring.</p>
              {filter !== "All" && <button className="button button-outline" onClick={() => setFilter("All")}>Show all Reels</button>}</div>}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
