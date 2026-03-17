export const siteConfig = {
  name: "diverFi",
  description:
    "Học DeFi & Crypto dành cho người Việt. Từ zero đến hero - hiểu về blockchain, DeFi, và cách tham gia thị trường crypto an toàn.",
  url: "https://diverfi.vercel.app",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/diverfi",
    github: "https://github.com/diverfi",
  },
  nav: [
    { title: "Bắt đầu", href: "/getting-started" },
    { title: "Học", href: "/learn" },
    { title: "Thị trường", href: "/markets" },
    { title: "Thuật ngữ", href: "/glossary" },
    { title: "Công cụ", href: "/tools" },
  ],
  keywords: [
    "DeFi",
    "Crypto",
    "Việt Nam",
    "Học",
    "Blockchain",
    "Bitcoin",
    "Ethereum",
    "Tiền điện tử",
    "Tài chính phi tập trung",
    "Yield Farming",
    "Liquidity Pool",
    "Smart Contract",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
