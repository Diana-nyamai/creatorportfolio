export type Brand = {
  name: string;
  color: "rose" | "blue" | "lilac" | "yellow" | "mint";
  logo?: { src: string; alt: string };
  featured?: { field: string };
  campaign?: { title: string; summary: string; reelId?: string; results?: string };
};

export const brands: Brand[] = [
  { name: "GOMYCODE", color: "lilac", featured: { field: "Tech education" } },
  { name: "Oraimo", color: "mint", featured: { field: "Consumer tech" } },
  { name: "Rapoo", color: "blue" },
  { name: "V2COM", color: "yellow" },
  { name: "Willow Voice", color: "rose", featured: { field: "Dictation software" } },
  { name: "Fish Audio", color: "blue" },
  { name: "Tripo 3D", color: "lilac" },
];
