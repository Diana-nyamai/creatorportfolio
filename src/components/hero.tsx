import { Heart, MapPin } from "lucide-react";
import { site } from "@/data/site-config";
import { CurvedArrow, Spark } from "./art";
import { Darcy } from "./darcy";
import { HeroProps } from "./hero-3d/hero-props";
import { HeroFrame } from "./hero-frame";
import { PhotoFrame } from "./photo";
import { Terminal } from "./terminal";

export function Hero() {
  return (
    <HeroFrame>
      <div className="hero-paper-sheet" aria-hidden="true" />
      <div className="hero-grid-sheet" aria-hidden="true" />
      <Spark className="hero-spark hero-spark-one" />
      <Spark className="hero-spark hero-spark-two" />
      <Spark className="hero-spark hero-spark-three" />
      <PhotoFrame className="hero-portrait" photo={site.media.hero} placeholder="Portrait photo placeholder"
        caption="diana ndinda" sizes="(max-width: 560px) 56vw, (max-width: 720px) 285px, (max-width: 1000px) 28vw, 350px" priority />
      <div className="tape hero-tape" aria-hidden="true" />
      <div className="hero-handwritten">creating on<br /> the internet <Heart size={14} aria-hidden="true" /></div>
      <CurvedArrow className="hero-arrow" />
      <div className="hero-location"><MapPin size={14} aria-hidden="true" /> {site.location}</div>
      <HeroProps />
      <div className="hero-terminal"><Terminal /></div>
      <Darcy className="hero-darcy" />
    </HeroFrame>
  );
}
