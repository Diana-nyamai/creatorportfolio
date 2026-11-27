export type Brand = {
  name: string;
  color: "rose" | "blue" | "lilac" | "yellow" | "mint";
  logo?: { src: string; alt: string };
  campaign?: { title?: string; reelId?: string; results?: string };
};

export const brands: Brand[] = [
  { name: "GOMYCODE", color: "lilac", campaign: { reelId: "gomycode" } },
  { name: "Oraimo", color: "mint", campaign: { reelId: "oraimo" } },
  { name: "Rapoo", color: "blue" },
  { name: "V2COM", color: "yellow", campaign: { reelId: "v2com" } },
  { name: "Willow Voice", color: "rose", campaign: { reelId: "willow-voice" } },
  { name: "Gadget Connect", color: "blue", campaign: { reelId: "gadget-connect" } },
  {
    name: "Fish Audio",
    color: "blue",
    campaign: {
      title: "Giving my builds a voice",
      reelId: "fish-audio",
    },
  },
];
