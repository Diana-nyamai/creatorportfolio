import Link from "next/link";
import { Download, Film, Heart } from "lucide-react";
import { hasMediaKitRates, mediaKit } from "@/data/site-config";
import { Flower, Spark } from "./art";
import { SpringLink } from "./motion/spring-action";
import { SectionTitle } from "./section-title";

export function DownloadKit() {
  return mediaKit.pdfUrl ?
    <div className="kit-download">
      <a className="button button-primary" href={mediaKit.pdfUrl} download>Download media kit <Download size={17} aria-hidden="true" /></a>
      <p>PDF · Includes the original audience snapshot</p>
    </div> :
    <p className="kit-placeholder">The downloadable kit is coming soon. <Link href="/#contact">Get in touch</Link> for details.</p>;
}

export function MediaTeaser() {
  return (
    <section className="section media-teaser paper" aria-labelledby="teaser-title">
      <div className="shell media-teaser-grid">
        <div>
          <SectionTitle id="teaser-title" note="For brands & agencies" title="the creator side of things" mark="spark"
            description="See what I make, who I make it for, and how we can work together." />
          <div className="media-teaser-actions">
            <SpringLink className="button button-primary" href="/media-kit">Explore my media kit</SpringLink>
            {hasMediaKitRates && <Link className="button button-outline" href="/media-kit#rates">View rates</Link>}
          </div>
        </div>
        <div className="kit-illustration" aria-hidden="true">
          <div className="kit-shadow-paper" /><div className="kit-sheet"><div className="tape" /><span>Ndinda Codes</span>
            <strong>media kit</strong><Film /><i /><i /><i /><Heart /></div><Flower /><Spark />
        </div>
      </div>
    </section>
  );
}
