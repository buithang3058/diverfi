import type { Metadata } from "next";
import Link from "next/link";
import { PROTOCOLS } from "@/config/protocols";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "DeFi Protocols",
  description:
    "Tìm hiểu các DeFi protocol phổ biến nhất: Uniswap, Aave, GMX, Lido, Curve — giải thích bằng tiếng Việt, kèm ưu điểm và rủi ro.",
  keywords: ["Uniswap", "Aave", "GMX", "Lido", "Curve", "DeFi protocol", "Việt Nam"],
};

const categoryColors: Record<string, string> = {
  DEX: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Lending: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Derivatives: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  CEX: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Staking: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export default function ProtocolsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">DeFi Protocols</h1>
        <p className="text-muted-foreground text-lg">
          Các protocol DeFi phổ biến nhất — giải thích bằng tiếng Việt, kèm ưu điểm, rủi ro, và hướng dẫn bắt đầu.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {PROTOCOLS.map((protocol) => (
          <Link
            key={protocol.slug}
            href={`/protocols/${protocol.slug}`}
            className="group block rounded-xl border p-5 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h2 className="font-bold text-lg group-hover:text-primary transition-colors">
                {protocol.name}
              </h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[protocol.category] ?? "bg-muted"}`}>
                {protocol.category}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{protocol.tagline}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1 flex-wrap">
                {protocol.chain.slice(0, 2).map((c) => (
                  <Badge key={c} variant="outline" className="text-xs">
                    {c}
                  </Badge>
                ))}
                {protocol.chain.length > 2 && (
                  <Badge variant="outline" className="text-xs">+{protocol.chain.length - 2}</Badge>
                )}
              </div>
              {protocol.tvl && (
                <span className="text-xs text-muted-foreground">TVL {protocol.tvl}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
