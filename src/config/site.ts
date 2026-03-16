export const siteConfig = {
  name: "diverFi",
  description: "Học DeFi & Crypto dành cho người Việt",
  url: "https://diverfi.com",
  links: {
    twitter: "https://twitter.com/diverfi",
    github: "https://github.com/diverfi",
  },
  nav: [
    { title: "Học", href: "/learn" },
    { title: "Thị trường", href: "/markets" },
    { title: "Thuật ngữ", href: "/glossary" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
