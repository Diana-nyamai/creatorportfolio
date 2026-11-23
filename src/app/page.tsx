import type { Metadata } from "next";
import { About } from "@/components/about";
import { Flower, Instagram, Spark } from "@/components/art";
import { Collaborations } from "@/components/collaborations";
import { Community } from "@/components/community";
import { Contact } from "@/components/contact";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { MediaTeaser } from "@/components/media-kit";
import { SectionTitle } from "@/components/section-title";
import { reels } from "@/data/reels";
import { site } from "@/data/site-config";
import { productionOrigin } from "@/lib/origin";

export function generateMetadata(): Metadata {
  const origin = productionOrigin();
  return origin ? { alternates: { canonical: "/" }, openGraph: { url: "/", title: site.seo.title, description: site.seo.description,
    siteName: site.name, images: [{ url: "/images/ndinda-social.jpg", width: 1200, height: 630 }] } } : {};
}

export default function Home() {
  const origin = productionOrigin();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.creator,
    alternateName: site.name,
    jobTitle: "Software engineer and content creator",
    url: origin,
    image: origin && site.media.hero.src ? new URL(site.media.hero.src, origin).href : undefined,
    sameAs: [site.instagram.url],
    homeLocation: { "@type": "Place", name: site.location },
  };

  return (
    <main id="main" tabIndex={-1}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Hero />
      <div className="scrap-strip paper" aria-hidden="true">
        <div><Flower /> backend brain <Spark /> creator heart <Flower /> cat mom <Spark /> based in nairobi <Flower /> always building <Spark /></div>
      </div>
      <About />
      <Community />
      <section id="work" className="section work paper" aria-labelledby="work-title">
        <div className="shell">
          <div className="work-intro">
            <SectionTitle id="work-title" note="From the camera roll" title="things i’ve created"
              description="A little collection of content, creativity, and collaborations." />
            <a className="text-link" target="_blank" rel="noopener noreferrer" href={site.instagram.url}><Instagram /> See more on Instagram</a>
          </div>
          <Gallery entries={reels} />
        </div>
      </section>
      <Collaborations />
      <MediaTeaser />
      <Contact />
    </main>
  );
}
