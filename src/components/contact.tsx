import { Mail } from "lucide-react";
import { site } from "@/data/site-config";
import { hasEmailDelivery } from "@/lib/deliver-inquiry";
import { Flower, Instagram, Spark } from "./art";
import { ContactForm } from "./contact-form";
import { SectionTitle } from "./section-title";

export function Contact() {
  return (
    <section id="contact" className="section contact paper" aria-labelledby="contact-title">
      <div className="shell contact-grid">
        <div className="contact-copy">
          <SectionTitle id="contact-title" note="Hi, future collaborator" title="let’s make something cool" mark="heart" description={site.contactIntro} />
          <a className="text-link" href={`mailto:${site.email}`}><Mail size={20} aria-hidden="true" />{site.email}</a>
          <a className="text-link" href={site.instagram.url} target="_blank" rel="noopener noreferrer"><Instagram />{site.instagram.handle}</a>
          <div className="contact-doodle" aria-hidden="true"><Flower /><Spark /><span>talk soon!</span></div>
        </div>
        <ContactForm available={hasEmailDelivery()} />
      </div>
    </section>
  );
}
