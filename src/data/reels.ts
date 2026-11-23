export const categories = ["Brand Collaborations", "Tech & Coding", "Developer Humor", "Lifestyle", "Product Reviews"] as const;
export type Category = (typeof categories)[number];
export type Reel = {
  id: string;
  title: string;
  description: string;
  category: Category;
  brand?: string;
  thumbnail: string | null;
  instagramUrl: string | null;
  publishedDate: string | null;
  views?: number;
  featured?: boolean;
  sample?: boolean;
  embed?: boolean;
};

export const reels: Reel[] = [
  { id: "api", title: "APIs, explained with coffee", description: "A short backend explainer with a familiar example.", category: "Tech & Coding", thumbnail: null, instagramUrl: null, publishedDate: null, featured: true, sample: true },
  { id: "works-on-my-machine", title: "It works on my machine", description: "A very familiar developer plot twist.", category: "Developer Humor", thumbnail: null, instagramUrl: null, publishedDate: null, sample: true },
  { id: "desk", title: "A little desk reset", description: "Tidying the workspace before a day of coding.", category: "Lifestyle", thumbnail: null, instagramUrl: null, publishedDate: null, sample: true },
  { id: "keyboard", title: "The keyboard test", description: "A hands-on look at what a keyboard feels and sounds like.", category: "Product Reviews", thumbnail: null, instagramUrl: null, publishedDate: null, sample: true },
  { id: "brand-demo", title: "A tool in my workflow", description: "An example of a product demo built around a real task.", category: "Brand Collaborations", thumbnail: null, instagramUrl: null, publishedDate: null, sample: true },
];

export function reelUrl(reel: Reel) {
  if (reel.sample || !reel.instagramUrl) return null;
  try {
    const url = new URL(reel.instagramUrl);
    if (url.protocol === "https:" && ["instagram.com", "www.instagram.com"].includes(url.host) &&
        !url.username && !url.password && /^\/reels?\/[\w-]+\/?$/.test(url.pathname)) return url.href;
  } catch {
    return null;
  }
  return null;
}
