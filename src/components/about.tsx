import { CodeXml, Film, Heart, Paperclip } from "lucide-react";
import { site } from "@/data/site-config";
import { DarcyArt, Flower, Spark } from "./art";
import { PhotoFrame } from "./photo";
import { SectionTitle } from "./section-title";

export function About() {
  const icons = [CodeXml, Film, Heart];
  return (
    <section id="about" className="section about paper" aria-labelledby="about-title">
      <div className="shell about-grid">
        <div className="about-art">
          <div className="about-notebook" aria-hidden="true" />
          <PhotoFrame className="about-portrait" photo={site.media.about} placeholder="Portrait photo placeholder"
            caption="hi, i’m diana ♡" sizes="(max-width: 540px) 42vw, 220px" />
          <PhotoFrame className="about-desk" photo={site.media.workspace} placeholder="Workspace photo placeholder"
            caption="where the bugs happen" sizes="(max-width: 540px) 52vw, 245px" />
          <PhotoFrame className="about-darcy" photo={site.media.darcy} placeholder="Darcy photo placeholder"
            caption="darcy" sizes="110px" />
          <div className="about-sticky"><Paperclip size={16} aria-hidden="true" /> probably<br /> debugging<br /> something <DarcyArt /></div>
          <Flower className="about-flower" />
        </div>
        <div className="about-copy">
          <SectionTitle id="about-title" note="A little about me" title="the girl behind the code" mark="heart" />
          {site.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <ul className="badges" aria-label="A few things about Diana">{site.badges.map((badge) => <li key={badge}>{badge}</li>)}</ul>
          <ol className="journey">
            {site.journey.map(({ title, detail }, index) => {
              const Icon = icons[index] ?? Spark;
              return <li key={title}><Icon size={17} aria-hidden="true" /><div><h3>{title}</h3><p>{detail}</p></div></li>;
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
