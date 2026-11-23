import type { MetadataRoute } from "next";
import { productionOrigin } from "@/lib/origin";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = productionOrigin();
  return origin ? ["/", "/media-kit"].map((path) => ({ url: new URL(path, origin).href })) : [];
}
