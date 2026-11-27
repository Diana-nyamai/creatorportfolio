import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { site } from "@/data/site-config";
import { Flower, Instagram } from "./art";
import { SpringLink } from "./motion/spring-action";
import { Darcy } from "./darcy";

export function Footer() {
  return (
    <footer className="site-footer paper">
      <div className="shell">
        <div className="footer-main">
          <div><Link href="/#home" className="site-logo"><Flower /> ndinda codes<span>.</span></Link>
            <p>made with ♡, caffeine &amp; a few console.logs</p></div>
          <div className="footer-links">
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer"><Instagram /> Instagram</a>
            <a href={`mailto:${site.email}`}><Mail size={18} aria-hidden="true" /> Email</a>
            <SpringLink href="#top"><ArrowUp size={17} aria-hidden="true" /> Back to top</SpringLink>
          </div>
          <Darcy className="footer-darcy" />
        </div>
        <p className="copyright">© {new Date().getFullYear()} {site.name} · {site.location}</p>
      </div>
    </footer>
  );
}
