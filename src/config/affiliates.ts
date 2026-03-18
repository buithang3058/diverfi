export interface AffiliateLink {
  id: string;
  name: string;
  description: string; // Vietnamese
  url: string; // includes UTM params
  cta: string; // button text
  badge?: string; // e.g. "Hoa hồng cao nhất"
}

const UTM = "utm_source=diverfi&utm_medium=lesson&utm_campaign=affiliate";

export const AFFILIATES: Record<string, AffiliateLink> = {
  binance: {
    id: "binance",
    name: "Binance",
    description: "Sàn giao dịch lớn nhất thế giới. Hoa hồng giới thiệu lên đến 40%.",
    url: `https://www.binance.com/vi/register?${UTM}&utm_content=binance`,
    cta: "Đăng ký Binance",
    badge: "Phổ biến nhất",
  },
  okx: {
    id: "okx",
    name: "OKX",
    description: "Top 3 sàn thế giới. Phí giao dịch cạnh tranh, nhiều cặp DeFi.",
    url: `https://www.okx.com/vi/join/${UTM}&utm_content=okx`,
    cta: "Đăng ký OKX",
  },
  uniswap: {
    id: "uniswap",
    name: "Uniswap",
    description: "DEX hàng đầu trên Ethereum. Swap token không cần KYC.",
    url: `https://app.uniswap.org?${UTM}&utm_content=uniswap`,
    cta: "Dùng Uniswap",
  },
  aave: {
    id: "aave",
    name: "Aave",
    description: "Giao thức cho vay DeFi lớn nhất. Lãi suất linh hoạt theo thị trường.",
    url: `https://app.aave.com?${UTM}&utm_content=aave`,
    cta: "Dùng Aave",
  },
  gmx: {
    id: "gmx",
    name: "GMX",
    description: "Sàn giao dịch phái sinh phi tập trung. Leverage tối đa 50x.",
    url: `https://app.gmx.io?${UTM}&utm_content=gmx`,
    cta: "Dùng GMX",
    badge: "Advanced",
  },
  bybit: {
    id: "bybit",
    name: "Bybit",
    description: "Sàn giao dịch phổ biến tại Việt Nam. Hỗ trợ tiếng Việt.",
    url: `https://www.bybit.com/invite?${UTM}&utm_content=bybit`,
    cta: "Đăng ký Bybit",
    badge: "Hỗ trợ VN",
  },
};

// Map track slug → affiliate IDs to show
export const TRACK_AFFILIATES: Record<string, string[]> = {
  "defi-basics": ["binance", "uniswap", "aave"],
  "trading": ["binance", "okx", "bybit"],
  "yield-farming": ["aave", "uniswap", "gmx"],
  "crypto-security": ["binance", "bybit"],
};

export function getAffiliatesForTrack(track: string): AffiliateLink[] {
  const ids = TRACK_AFFILIATES[track] ?? ["binance", "okx"];
  return ids.map((id) => AFFILIATES[id]).filter(Boolean);
}
