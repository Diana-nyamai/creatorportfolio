export const categories = ["Brand Collaborations", "Tech & Coding", "Developer Humor", "Lifestyle", "Product Reviews"] as const;
export type Category = (typeof categories)[number];
export type Reel = {
  id: string;
  title: string;
  category: Category;
  brand?: string;
  thumbnail: string | null;
  instagramUrl: string | null;
  publishedDate: string | null;
  views?: number;
  featured?: boolean;
  sample?: boolean;
  embed?: boolean;
  videoSrc?: string;
};

export const reels: Reel[] = [
  {
    id: "fish-audio",
    title: "Giving my builds a voice",
    category: "Brand Collaborations",
    brand: "Fish Audio",
    thumbnail: "/images/fish-audio-reel.webp",
    videoSrc: "/videos/fish-audio-reel.mp4",
    instagramUrl: "https://www.instagram.com/reel/DdZdj4OIu3I/",
    publishedDate: null,
    featured: true,
  },
  {
    id: "v2com",
    title: "V2COM",
    category: "Brand Collaborations",
    brand: "V2COM",
    thumbnail: null,
    instagramUrl: "https://www.instagram.com/reel/DVvajjfiJaY/",
    publishedDate: null,
    embed: true,
  },
  {
    id: "oraimo",
    title: "Oraimo",
    category: "Brand Collaborations",
    brand: "Oraimo",
    thumbnail: null,
    instagramUrl: "https://www.instagram.com/reel/DSpD1ZsiPcf/",
    publishedDate: null,
    embed: true,
  },
  {
    id: "willow-voice",
    title: "Willow Voice",
    category: "Brand Collaborations",
    brand: "Willow Voice",
    thumbnail: null,
    instagramUrl: "https://www.instagram.com/reel/Daft8sBq7xz/",
    publishedDate: null,
    embed: true,
  },
  {
    id: "gadget-connect",
    title: "Gadget Connect",
    category: "Brand Collaborations",
    brand: "Gadget Connect",
    thumbnail: null,
    instagramUrl: "https://www.instagram.com/reel/DaKhoF8KAC7/",
    publishedDate: null,
    embed: true,
  },
  {
    id: "gomycode",
    title: "GOMYCODE",
    category: "Brand Collaborations",
    brand: "GOMYCODE",
    thumbnail: null,
    instagramUrl: "https://www.instagram.com/reel/DZ9z79FoIBY/",
    publishedDate: null,
    embed: true,
  },
  { id: "api", title: "APIs, explained with coffee", category: "Tech & Coding", thumbnail: null, instagramUrl: null, publishedDate: null, featured: true, sample: true },
  { id: "works-on-my-machine", title: "It works on my machine", category: "Developer Humor", thumbnail: null, instagramUrl: null, publishedDate: null, sample: true },
  { id: "desk", title: "A little desk reset", category: "Lifestyle", thumbnail: null, instagramUrl: null, publishedDate: null, sample: true },
  { id: "keyboard", title: "The keyboard test", category: "Product Reviews", thumbnail: null, instagramUrl: null, publishedDate: null, sample: true },
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
