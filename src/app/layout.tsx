import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { site } from "@/data/site-config";
import { productionOrigin } from "@/lib/origin";
import "./globals.css";

const sans = localFont({ src: "./fonts/dm-sans.woff2", variable: "--font-dm-sans", display: "swap", weight: "100 1000" });
const serif = localFont({ src: "./fonts/dm-serif-display.woff2", variable: "--font-dm-serif", display: "swap", weight: "400" });
const handwritten = localFont({ src: "./fonts/caveat.woff2", variable: "--font-hand", display: "swap", weight: "700", preload: false });

export function generateMetadata(): Metadata {
  const origin = productionOrigin();
  const images = origin ? [{ url: "/images/ndinda-social.jpg", width: 1200, height: 630, alt: "Ndinda Codes, software engineer and tech creator" }] : undefined;
  return {
    metadataBase: origin ? new URL(origin) : undefined,
    title: { default: site.seo.title, template: `%s | ${site.name}` },
    description: site.seo.description,
    applicationName: site.name,
    authors: [{ name: site.creator }],
    openGraph: { type: "website", siteName: site.name, title: site.seo.title, description: site.seo.description, images },
    twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description, images },
    robots: process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : undefined,
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable} ${handwritten.variable}`}>
      <body id="top">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
