import { Suspense } from "react";
import { connection } from "next/server";
import { site } from "@/data/site-config";
import { getInstagramStats, type InstagramStats } from "@/lib/instagram";
import { formatDate } from "@/lib/format";
import { Flower, Instagram } from "./art";
import { SectionTitle } from "./section-title";

import { CountUp } from "./motion/count-up";

const manual: InstagramStats = { followers: site.instagram.fallbackFollowers, source: "manual" };

function AudienceMetrics({ stats }: { stats: InstagramStats }) {
  return (
    <div className="audience-metrics">
      <div className="follower-metric">
        <dl>
          <dt>Instagram followers</dt>
          <dd className="metric-value"><CountUp value={stats.followers} /></dd>
          {stats.updatedAt ? <dd className="metric-source">Updated <time dateTime={stats.updatedAt}>{formatDate(stats.updatedAt)}</time></dd> :
            <dd className="metric-source">{stats.source === "manual" ? "Manual count" : "From Instagram"}</dd>}
        </dl>
        <Flower />
      </div>
      <dl className="audience-secondary">
        {site.audience.map(({ label, value }) => (
          <div key={label}><dt>{label}</dt><dd>{value ?? "On request"}</dd></div>
        ))}
      </dl>
    </div>
  );
}

async function CurrentAudience() {
  if (process.env.INSTAGRAM_ACCESS_TOKEN?.trim()) await connection();
  return <AudienceMetrics stats={await getInstagramStats()} />;
}

export function Audience() {
  return <Suspense fallback={<AudienceMetrics stats={manual} />}><CurrentAudience /></Suspense>;
}

export function Community() {
  return (
    <section className="section community paper" aria-labelledby="community-title">
      <div className="shell community-grid">
        <div>
          <SectionTitle id="community-title" note="Over on Instagram" title="my corner of the internet" mark="spark"
            description="Come for the tech tips, stay for the oddly specific developer jokes." />
          <a className="text-link" href={site.instagram.url} target="_blank" rel="noopener noreferrer"><Instagram /> {site.instagram.handle}</a>
        </div>
        <Audience />
      </div>
    </section>
  );
}
