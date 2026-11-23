import type { MetadataRoute } from "next";
import { productionOrigin } from "@/lib/origin";

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview") return { rules: { userAgent: "*", disallow: "/" } };
  const origin = productionOrigin();
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: origin ? new URL("/sitemap.xml", origin).href : undefined,
  };
}
