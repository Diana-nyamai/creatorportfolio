export type Photo = { src: string | null; alt: string; position?: string };

export const site = {
  name: "Ndinda Codes",
  creator: "Diana Ndinda",
  location: "Nairobi, Kenya",
  email: "ndindacodes@gmail.com",
  instagram: { handle: "@ndinda_codes", url: "https://www.instagram.com/ndinda_codes/", fallbackFollowers: 26500 },
  seo: {
    title: "Ndinda Codes | Software Engineer & Tech Creator",
    description: "Meet Diana Ndinda, a Nairobi-based software engineer and creator sharing backend development, tech, and the life around it.",
  },
  hero: {
    eyebrow: "software engineer • tech creator • professional yapper",
    heading: "hey, i’m",
    name: "ndinda",
    subtitle: "I write code & create content that connects.",
    description: "Software engineer by day, tech creator by passion. Sharing the little wins, big lessons, and everything in between.",
  },
  bio: [
    "Hi, I’m Diana Ndinda, a software engineer and tech creator based in Nairobi, Kenya. I work in backend development and make videos about the things I wish someone had explained to me sooner.",
    "Around here you’ll find dev tools, career lessons, the occasional very specific coding joke, and bits of everyday life. Darcy, my black cat, makes guest appearances whenever he feels like it.",
  ],
  journey: [
    { title: "Build", detail: "Backend engineering and the work behind the screen." },
    { title: "Share", detail: "Tech tutorials, developer tools, and a few jokes only devs get." },
    { title: "Create", detail: "Tech and lifestyle stories, on my own and with brands." },
  ],
  badges: ["Software engineer", "Cat mom", "Tech storyteller", "Creative builder", "Nairobi-based"],
  media: {
    hero: { src: "/images/ndinda-portrait.webp", alt: "Black-and-white portrait of Diana Ndinda", position: "50% 36%" },
    about: { src: "/images/ndinda-about.webp", alt: "A closer crop of Diana Ndinda’s portrait", position: "51% 28%" },
    workspace: { src: "/images/ndinda-workspace.webp", alt: "Diana’s workspace with a laptop and a large monitor", position: "50% 62%" },
    studio: { src: "/images/ndinda-studio.webp", alt: "Diana’s desk setup with a monitor and leafy plant", position: "50% 65%" },
    darcy: { src: null, alt: "Darcy, Diana’s black cat" },
  } satisfies Record<string, Photo>,
  audience: [
    { label: "Average reach", value: null },
    { label: "Engagement rate", value: null },
    { label: "Audience demographics", value: null },
  ] as { label: string; value: string | null }[],
  contactIntro: "Tell me what you have in mind. I’d love to hear what you’re making and where I could come in.",
};

export const navigation = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "My Work", href: "/#work" },
  { label: "Collaborations", href: "/#collaborations" },
  { label: "Media Kit", href: "/media-kit" },
  { label: "Contact", href: "/#contact" },
];

export const services = [
  "Sponsored Instagram Reels", "Product Reviews", "Tech Tutorials",
  "Instagram Stories", "Brand Campaigns", "Creative Content Production",
] as const;

export const mediaKit: {
  pdfUrl: string | null;
  showRates: boolean;
  rates: { title: string; items: { label: string; price: string }[] }[];
  terms: string[];
} = {
  pdfUrl: "/media-kit/ndinda-codes-media-kit.pdf",
  showRates: true,
  rates: [
    { title: "Instagram Reels", items: [
      { label: "1 Reel (15–60 seconds)", price: "$450" },
      { label: "3 Reels", price: "$1,080" },
      { label: "5 Reels", price: "$1,700" },
    ] },
    { title: "Instagram Stories", items: [
      { label: "1–3 Story frames", price: "$70" },
      { label: "1–3 Story frames with a CTA", price: "$85" },
    ] },
    { title: "Campaign bundles", items: [
      { label: "1 Reel + 2 Stories with a CTA", price: "$470" },
      { label: "3 Reels + 3 Stories + a 48-hour link in bio", price: "$1,200" },
    ] },
    { title: "Product collaborations & gifting", items: [
      { label: "Product provided + minimum creation fee per Reel", price: "$300" },
    ] },
    { title: "Campaign add-ons & licensing", items: [
      { label: "Paid usage and whitelisting, per 30 days", price: "+50% of total fee" },
      { label: "Dedicated link in bio, per 24 hours", price: "$50" },
      { label: "Competitor exclusivity, per 30 days", price: "+30% of contract value" },
      { label: "Rush delivery within 48 hours", price: "+$100 flat fee" },
    ] },
  ],
  terms: [
    "Reel production includes concept development, scripting, filming, editing, and one round of revisions.",
    "Additional revisions or major concept changes may incur fees. Rates may vary by scope, usage rights, licensing, and exclusivity.",
    "Gifted products do not offset production and creative costs.",
    "A 50% deposit secures the booking. The remaining 50% is due before publication.",
  ],
};
