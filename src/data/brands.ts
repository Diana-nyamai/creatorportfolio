export type Brand = {
  name: string;
  color: "rose" | "blue" | "lilac" | "yellow" | "mint";
  logo?: { src: string; alt: string };
  featured?: { field: string };
  campaign?: { title?: string; summary?: string; reelId?: string; results?: string };
};

export const brands: Brand[] = [
  { name: "GOMYCODE", color: "lilac", featured: { field: "Tech education" }, campaign: { reelId: "gomycode" } },
  { name: "Oraimo", color: "mint", featured: { field: "Consumer tech" }, campaign: { reelId: "oraimo" } },
  { name: "Rapoo", color: "blue" },
  { name: "V2COM", color: "yellow", campaign: { reelId: "v2com" } },
  { name: "Willow Voice", color: "rose", featured: { field: "Dictation software" }, campaign: { reelId: "willow-voice" } },
  { name: "Gadget Connect", color: "blue", campaign: { reelId: "gadget-connect" } },
  {
    name: "Fish Audio",
    color: "blue",
    campaign: {
      title: "Giving my builds a voice",
      summary: "A hands-on Reel showing what it sounds like when a build can talk back.",
      reelId: "fish-audio",
    },
  },
];
