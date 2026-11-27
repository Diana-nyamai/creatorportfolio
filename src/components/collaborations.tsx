import Image from "next/image";
import { Clapperboard } from "lucide-react";
import { brands } from "@/data/brands";
import { reels, reelUrl } from "@/data/reels";
import { Instagram } from "./art";
import { SectionTitle } from "./section-title";

export function BrandCards() {
  return (
    <ul className="brand-grid" aria-label="Collaboration partners">
      {brands.map(({ name, color, logo }) => (
        <li key={name} className={`brand-card tone-${color}`}>
          {logo ? <Image src={logo.src} alt={logo.alt} width={110} height={45} /> : <span>{name}</span>}
        </li>
      ))}
    </ul>
  );
}

export function CampaignHighlights() {
  const highlights = brands.filter(({ campaign, featured }) => campaign || featured);
  if (!highlights.length) return null;

  return (
    <div className="campaign-grid">
      {highlights.map(({ name, color, campaign, featured }) => {
        const matchingReel = campaign?.reelId && reels.find(({ id }) => id === campaign.reelId);
        const url = matchingReel && reelUrl(matchingReel);
        const label = campaign?.title ? name : featured?.field;
        return (
          <article key={name} className={`campaign-card tone-${color}`}>
            <Clapperboard className="campaign-decoration" size={22} aria-hidden="true" />
            {label && <p className="reel-category">{label}</p>}
            <h3>{campaign?.title || name}</h3>
            {campaign?.summary && <p>{campaign.summary}</p>}
            {campaign?.results && <p className="campaign-results">{campaign.results}</p>}
            {url && <a className="text-link" href={url} target="_blank" rel="noopener noreferrer"><Instagram /> Watch on Instagram</a>}
          </article>
        );
      })}
    </div>
  );
}

export function Collaborations() {
  return (
    <section id="collaborations" className="section collaborations paper" aria-labelledby="collaborations-title">
      <div className="shell centered">
        <SectionTitle id="collaborations-title" note="Better together" title="brands i’ve created with" mark="heart"
          description="A few of the brands I’ve worked with across tech, creator tools, and lifestyle." />
        <BrandCards />
        <CampaignHighlights />
        <a className="button button-outline" href="#contact">Tell me about your project</a>
      </div>
    </section>
  );
}
