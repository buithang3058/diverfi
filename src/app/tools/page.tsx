import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Công cụ DeFi",
  description: "Tổng hợp các công cụ và tài nguyên hữu ích cho người dùng DeFi",
};

interface Tool {
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
}

const tools: Tool[] = [
  // Analytics & Data
  {
    name: "DefiLlama",
    description: "Theo dõi TVL, yields, và dữ liệu DeFi toàn diện nhất",
    url: "https://defillama.com",
    category: "Analytics",
    tags: ["TVL", "Yields", "Free"],
  },
  {
    name: "Dune Analytics",
    description: "Tạo và xem dashboards phân tích blockchain",
    url: "https://dune.com",
    category: "Analytics",
    tags: ["Dashboards", "SQL", "Free"],
  },
  {
    name: "Token Terminal",
    description: "Dữ liệu tài chính của các protocol (P/E, revenue...)",
    url: "https://tokenterminal.com",
    category: "Analytics",
    tags: ["Fundamentals", "Premium"],
  },
  {
    name: "Nansen",
    description: "Phân tích on-chain và theo dõi smart money",
    url: "https://nansen.ai",
    category: "Analytics",
    tags: ["On-chain", "Premium"],
  },

  // Portfolio Trackers
  {
    name: "Zapper",
    description: "Quản lý portfolio DeFi đa chain",
    url: "https://zapper.xyz",
    category: "Portfolio",
    tags: ["Multi-chain", "Free"],
  },
  {
    name: "DeBank",
    description: "Xem tất cả vị thế DeFi và NFT của bạn",
    url: "https://debank.com",
    category: "Portfolio",
    tags: ["Multi-chain", "Free"],
  },
  {
    name: "Zerion",
    description: "Ví và portfolio tracker với UI đẹp",
    url: "https://zerion.io",
    category: "Portfolio",
    tags: ["Wallet", "Free"],
  },

  // DEX Aggregators
  {
    name: "1inch",
    description: "DEX aggregator tìm giá tốt nhất",
    url: "https://1inch.io",
    category: "Trading",
    tags: ["Aggregator", "Multi-chain"],
  },
  {
    name: "Paraswap",
    description: "DEX aggregator với gas optimization",
    url: "https://paraswap.io",
    category: "Trading",
    tags: ["Aggregator", "Gas saving"],
  },
  {
    name: "CowSwap",
    description: "DEX với MEV protection",
    url: "https://cow.fi",
    category: "Trading",
    tags: ["MEV Protection", "Gasless"],
  },

  // Yield Farming
  {
    name: "Beefy Finance",
    description: "Auto-compounder đa chain",
    url: "https://beefy.com",
    category: "Yield",
    tags: ["Auto-compound", "Multi-chain"],
  },
  {
    name: "Yearn Finance",
    description: "Yield optimizer trên Ethereum",
    url: "https://yearn.fi",
    category: "Yield",
    tags: ["Vaults", "Ethereum"],
  },
  {
    name: "APY.vision",
    description: "Tính toán IL và lợi nhuận LP thực tế",
    url: "https://apy.vision",
    category: "Yield",
    tags: ["IL Calculator", "LP Analytics"],
  },

  // Security
  {
    name: "Revoke.cash",
    description: "Kiểm tra và thu hồi token approvals",
    url: "https://revoke.cash",
    category: "Security",
    tags: ["Approvals", "Free"],
  },
  {
    name: "De.Fi Scanner",
    description: "Kiểm tra an toàn của smart contract",
    url: "https://de.fi/scanner",
    category: "Security",
    tags: ["Audit", "Free"],
  },
  {
    name: "Pocket Universe",
    description: "Mô phỏng giao dịch trước khi ký",
    url: "https://pocketuniverse.app",
    category: "Security",
    tags: ["Simulation", "Browser Extension"],
  },

  // Bridges
  {
    name: "Jumper",
    description: "Bridge aggregator của LI.FI",
    url: "https://jumper.exchange",
    category: "Bridge",
    tags: ["Aggregator", "Multi-chain"],
  },
  {
    name: "Across",
    description: "Bridge nhanh với phí thấp",
    url: "https://across.to",
    category: "Bridge",
    tags: ["Fast", "Low fees"],
  },

  // Gas Trackers
  {
    name: "Etherscan Gas Tracker",
    description: "Theo dõi gas Ethereum real-time",
    url: "https://etherscan.io/gastracker",
    category: "Gas",
    tags: ["Ethereum", "Free"],
  },
  {
    name: "GasNow",
    description: "Dự đoán gas với nhiều options",
    url: "https://gasnow.io",
    category: "Gas",
    tags: ["Predictions", "Free"],
  },

  // Learning
  {
    name: "Ethereum.org",
    description: "Tài liệu chính thức về Ethereum",
    url: "https://ethereum.org/vi",
    category: "Learning",
    tags: ["Official", "Vietnamese"],
  },
  {
    name: "Finematics",
    description: "Video giải thích DeFi dễ hiểu",
    url: "https://youtube.com/@finematics",
    category: "Learning",
    tags: ["YouTube", "English"],
  },
];

const categories = [...new Set(tools.map(t => t.category))];

export default function ToolsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Công cụ DeFi</h1>
        <p className="text-muted-foreground mt-2">
          Tổng hợp các công cụ và tài nguyên hữu ích cho người dùng DeFi
        </p>
      </div>

      {categories.map((category) => (
        <section key={category} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools
              .filter((tool) => tool.category === category)
              .map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="h-full hover:bg-muted/50 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {tool.name}
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
          </div>
        </section>
      ))}

      <div className="mt-8 p-6 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          Đây là danh sách các công cụ phổ biến, không phải lời khuyên tài chính.
          Luôn DYOR trước khi sử dụng bất kỳ dịch vụ nào.
        </p>
      </div>
    </div>
  );
}
