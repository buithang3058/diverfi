const UTM = "utm_source=diverfi&utm_medium=protocol&utm_campaign=affiliate";

export interface Protocol {
  slug: string;
  name: string;
  tagline: string; // Vietnamese
  description: string; // Vietnamese, 2-3 sentences
  category: string;
  chain: string[];
  url: string; // affiliate URL with UTM
  ctaLabel: string;
  tvl?: string; // approximate, for credibility
  relatedTracks: string[]; // lesson track slugs
  relatedGlossaryTerms: string[]; // term slugs
  pros: string[]; // Vietnamese bullet points
  risks: string[]; // Vietnamese bullet points
}

export const PROTOCOLS: Protocol[] = [
  {
    slug: "uniswap",
    name: "Uniswap",
    tagline: "Sàn giao dịch phi tập trung lớn nhất thế giới",
    description:
      "Uniswap là DEX (sàn giao dịch phi tập trung) hàng đầu trên Ethereum. Bạn có thể swap bất kỳ token ERC-20 nào mà không cần tài khoản, không cần KYC, chỉ cần ví Web3. Uniswap sử dụng mô hình Automated Market Maker (AMM) — thay vì order book, giá được tính tự động từ thanh khoản pool.",
    category: "DEX",
    chain: ["Ethereum", "Arbitrum", "Optimism", "Polygon", "Base"],
    url: `https://app.uniswap.org?${UTM}&utm_content=uniswap`,
    ctaLabel: "Dùng Uniswap",
    tvl: "$4B+",
    relatedTracks: ["defi-basics", "yield-farming"],
    relatedGlossaryTerms: ["dex", "amm", "liquidity-pool"],
    pros: [
      "Không cần KYC, không cần đăng ký",
      "Hỗ trợ hàng nghìn token ERC-20",
      "Mã nguồn mở, đã audit nhiều lần",
      "TVL lớn — thanh khoản tốt cho cặp phổ biến",
    ],
    risks: [
      "Phí gas Ethereum có thể cao",
      "Impermanent loss khi cung cấp thanh khoản",
      "Scam token vẫn có thể list — kiểm tra địa chỉ contract cẩn thận",
    ],
  },
  {
    slug: "aave",
    name: "Aave",
    tagline: "Giao thức cho vay DeFi lớn nhất",
    description:
      "Aave là giao thức cho vay và vay tiền phi tập trung. Bạn có thể gửi crypto để kiếm lãi (lending), hoặc vay crypto bằng cách thế chấp tài sản khác. Lãi suất biến động theo cung cầu thị trường theo thời gian thực.",
    category: "Lending",
    chain: ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Avalanche"],
    url: `https://app.aave.com?${UTM}&utm_content=aave`,
    ctaLabel: "Dùng Aave",
    tvl: "$11B+",
    relatedTracks: ["defi-basics", "yield-farming"],
    relatedGlossaryTerms: ["apy", "apr", "tvl", "collateral"],
    pros: [
      "TVL lớn nhất trong lending — an toàn và uy tín",
      "Lãi suất linh hoạt và ổn định",
      "Flash loans — vay không cần thế chấp trong 1 transaction",
      "Nhiều blockchain được hỗ trợ",
    ],
    risks: [
      "Phải over-collateralize — thế chấp nhiều hơn số muốn vay",
      "Liquidation risk khi giá tài sản thế chấp giảm mạnh",
      "Smart contract risk dù đã audit",
    ],
  },
  {
    slug: "gmx",
    name: "GMX",
    tagline: "Sàn giao dịch phái sinh phi tập trung",
    description:
      "GMX là giao thức trading perps (hợp đồng vĩnh cửu) phi tập trung trên Arbitrum và Avalanche. Cho phép giao dịch BTC, ETH với đòn bẩy tối đa 50x, không cần KYC. Phí thấp hơn nhiều so với sàn tập trung.",
    category: "Derivatives",
    chain: ["Arbitrum", "Avalanche"],
    url: `https://app.gmx.io?${UTM}&utm_content=gmx`,
    ctaLabel: "Dùng GMX",
    tvl: "$600M+",
    relatedTracks: ["trading", "defi-basics"],
    relatedGlossaryTerms: ["leverage", "perpetual", "liquidation"],
    pros: [
      "Leverage tối đa 50x, phí thấp",
      "Không cần KYC",
      "GLP token — kiếm fee từ việc cung cấp thanh khoản",
      "Slippage thấp nhờ oracle pricing",
    ],
    risks: [
      "Leverage trading rất rủi ro — có thể mất toàn bộ vốn",
      "Chỉ dành cho trader có kinh nghiệm",
      "Liquidation xảy ra nhanh khi giá biến động mạnh",
    ],
  },
  {
    slug: "binance",
    name: "Binance",
    tagline: "Sàn giao dịch crypto lớn nhất thế giới",
    description:
      "Binance là sàn giao dịch tập trung lớn nhất theo volume giao dịch. Phù hợp cho người mới bắt đầu vì giao diện thân thiện, hỗ trợ tiếng Việt, và có thể nạp/rút VND. Là cửa ngõ phổ biến nhất để bước vào crypto tại Việt Nam.",
    category: "CEX",
    chain: ["Multi-chain"],
    url: `https://www.binance.com/vi/register?${UTM}&utm_content=binance`,
    ctaLabel: "Đăng ký Binance",
    tvl: undefined,
    relatedTracks: ["crypto-security", "trading"],
    relatedGlossaryTerms: ["cex", "kyc", "spot"],
    pros: [
      "Hỗ trợ nạp rút VND qua P2P",
      "Giao diện tiếng Việt",
      "Volume thanh khoản lớn nhất",
      "Hoa hồng giới thiệu lên đến 40%",
    ],
    risks: [
      "Sàn tập trung — Binance giữ tài sản của bạn",
      "Đã từng bị hack (2019, $40M)",
      "Không nên giữ toàn bộ crypto trên sàn",
    ],
  },
  {
    slug: "lido",
    name: "Lido",
    tagline: "Liquid staking Ethereum hàng đầu",
    description:
      "Lido cho phép bạn stake ETH và nhận stETH — token đại diện cho ETH đã stake. stETH tự động tích lũy lãi staking (~4% APY) và có thể dùng trong DeFi khác. Không cần lock ETH — bạn có thể bán stETH bất cứ lúc nào.",
    category: "Staking",
    chain: ["Ethereum", "Polygon", "Solana"],
    url: `https://lido.fi?${UTM}&utm_content=lido`,
    ctaLabel: "Dùng Lido",
    tvl: "$22B+",
    relatedTracks: ["yield-farming", "defi-basics"],
    relatedGlossaryTerms: ["staking", "apy", "liquid-staking"],
    pros: [
      "Stake ETH không cần 32 ETH tối thiểu",
      "stETH có tính thanh khoản — dùng được trong DeFi",
      "TVL lớn nhất trong liquid staking",
      "Yield ổn định ~4% APY",
    ],
    risks: [
      "Smart contract risk",
      "Slashing risk của validator",
      "stETH có thể trade dưới giá ETH trong thị trường stress",
    ],
  },
  {
    slug: "curve",
    name: "Curve Finance",
    tagline: "DEX tối ưu cho stablecoin",
    description:
      "Curve là DEX được thiết kế đặc biệt cho việc swap giữa các stablecoin (USDT, USDC, DAI) với slippage cực thấp. Cũng là nơi nhiều người cung cấp thanh khoản stablecoin để kiếm yield ổn định và thấp rủi ro hơn.",
    category: "DEX",
    chain: ["Ethereum", "Polygon", "Arbitrum", "Optimism"],
    url: `https://curve.fi?${UTM}&utm_content=curve`,
    ctaLabel: "Dùng Curve",
    tvl: "$2B+",
    relatedTracks: ["yield-farming", "defi-basics"],
    relatedGlossaryTerms: ["stablecoin", "liquidity-pool", "apy"],
    pros: [
      "Slippage thấp nhất cho stablecoin swap",
      "Yield farming ít rủi ro với stablecoin",
      "CRV token incentives",
    ],
    risks: [
      "Giao diện phức tạp cho người mới",
      "Rủi ro depeg của stablecoin (UST 2022)",
      "Impermanent loss thấp nhưng vẫn có",
    ],
  },
];

export function getProtocol(slug: string): Protocol | undefined {
  return PROTOCOLS.find((p) => p.slug === slug);
}
