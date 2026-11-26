import type { Metadata } from "next";
import Link from "next/link";
import { Clapperboard, Coffee, CodeXml, Film, Heart, Keyboard, Mail, MapPin } from "lucide-react";
import { Flower, Instagram, Spark } from "@/components/art";
import { Audience } from "@/components/community";
import { BrandCards, CampaignHighlights } from "@/components/collaborations";
import { DownloadKit } from "@/components/media-kit";
import { PhotoFrame } from "@/components/photo";
import { SectionTitle } from "@/components/section-title";
import { categories } from "@/data/reels";
import { hasMediaKitRates, mediaKit, services, site } from "@/data/site-config";
import { productionOrigin } from "@/lib/origin";

const title = "Media Kit";
const description = "Explore Diana Ndinda’s creator services, audience snapshot, partnership rates, and downloadable media kit.";
const serviceIcons = [Film, Keyboard, CodeXml, Clapperboard, Heart, Coffee];

export function generateMetadata(): Metadata {
  const origin = productionOrigin();
  const images = origin ? [{ url: "/images/ndinda-social.jpg", width: 1200, height: 630 }] : undefined;
  return {
    title, description,
    alternates: origin ? { canonical: "/media-kit" } : undefined,
    openGraph: { title, description, siteName: site.name, url: origin ? "/media-kit" : undefined, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default function MediaKitPage() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="section kit-hero paper" aria-labelledby="kit-title">
        <div className="shell kit-hero-grid">
          <div>
            <p className="section-note"><Spark /> Media kit</p>
            <h1 className="section-title" id="kit-title">the creator side of <span className="kit-title-end">things <Spark /></span></h1>
            <p>{site.bio[0]}</p>
            <p className="kit-location"><MapPin size={17} aria-hidden="true" />{site.location}</p>
            <div className="kit-hero-actions">
              <DownloadKit />
              {hasMediaKitRates ? <a className="button button-outline" href="#rates">View rates</a> :
                <Link className="button button-outline" href="/#contact">Discuss a project <Heart size={16} aria-hidden="true" /></Link>}
            </div>
          </div>
          <div className="kit-photo-stack">
            <PhotoFrame photo={site.media.hero} className="kit-portrait" caption={site.creator} placeholder="Portrait photo placeholder" sizes="(max-width: 640px) 58vw, 300px" priority />
            <PhotoFrame photo={site.media.studio} className="kit-studio" caption="from my desk" placeholder="Studio photo placeholder" sizes="160px" />
            <Flower /><div className="tape" aria-hidden="true" />
          </div>
        </div>
      </section>
      <section className="section community paper" aria-labelledby="kit-audience-title">
        <div className="shell community-grid">
          <div><SectionTitle id="kit-audience-title" note="On Instagram" title="audience at a glance" mark="spark" />
            <a className="text-link" href={site.instagram.url} rel="noopener noreferrer" target="_blank"><Instagram /> {site.instagram.handle}</a>
            <ul className="badges" aria-label="Content categories">{categories.map((category) => <li key={category}>{category}</li>)}</ul>
          </div>
          <Audience />
        </div>
      </section>
      <section className="section kit-services paper" aria-labelledby="services-title">
        <div className="shell">
          <SectionTitle id="services-title" title="what we can make together" mark="flower" />
          <ul className="services-grid">{services.map((service, index) => {
            const Icon = serviceIcons[index] ?? Film;
            return <li key={service}><Icon size={22} aria-hidden="true" /><h3>{service}</h3></li>;
          })}</ul>
          {hasMediaKitRates && (
            <section className="rate-card" id="rates" aria-labelledby="rates-title">
              <h3 id="rates-title">Collaboration rates</h3>
              <div className="rate-grid">
                {mediaKit.rates.map(({ title, items }) => (
                  <div className="rate-group" key={title}>
                    <h4>{title}</h4>
                    <dl>
                      {items.map(({ label, price }) => <div key={label}><dt>{label}</dt><dd>{price}</dd></div>)}
                    </dl>
                  </div>
                ))}
              </div>
              {mediaKit.terms.length > 0 && (
                <div className="rate-booking">
                  <h4>Booking terms</h4>
                  <ul className="rate-terms">{mediaKit.terms.map((term) => <li key={term}>{term}</li>)}</ul>
                </div>
              )}
              <Link className="button button-primary" href="/#contact">Discuss a project <Heart size={16} aria-hidden="true" /></Link>
            </section>
          )}
        </div>
      </section>
      <section className="section collaborations paper" aria-labelledby="kit-partners-title">
        <div className="shell centered">
          <SectionTitle id="kit-partners-title" title="brands i’ve created with" mark="heart" />
          <BrandCards /><CampaignHighlights />
        </div>
      </section>
      <section className="section kit-contact paper" aria-labelledby="kit-contact-title">
        <div className="shell centered">
          <SectionTitle id="kit-contact-title" title="let’s talk about your project" mark="heart" />
          <a className="text-link" href={`mailto:${site.email}`}><Mail size={19} aria-hidden="true" />{site.email}</a>
        </div>
      </section>
    </main>
  );
}
