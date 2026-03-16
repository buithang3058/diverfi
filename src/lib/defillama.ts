const DEFILLAMA_API = "https://api.llama.fi";
const COINS_API = "https://coins.llama.fi";

export interface Protocol {
  id: string;
  name: string;
  slug: string;
  tvl: number;
  chainTvls: Record<string, number>;
  change_1h: number | null;
  change_1d: number | null;
  change_7d: number | null;
  category: string;
  chains: string[];
  logo: string;
}

export interface CoinPrice {
  symbol: string;
  price: number;
  timestamp: number;
  confidence: number;
}

export interface MarketData {
  protocols: Protocol[];
  totalTvl: number;
  updatedAt: string;
}

// Fetch top protocols by TVL
export async function getTopProtocols(limit = 20): Promise<Protocol[]> {
  try {
    // Don't cache the full response (too large >2MB)
    const response = await fetch(`${DEFILLAMA_API}/protocols`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`DefiLlama API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract only needed fields and take top N
    return data
      .filter((p: Record<string, unknown>) => (p.tvl as number) > 0)
      .sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
        (b.tvl as number) - (a.tvl as number)
      )
      .slice(0, limit)
      .map((p: Record<string, unknown>): Protocol => ({
        id: String(p.id || p.slug),
        name: String(p.name || ""),
        slug: String(p.slug || ""),
        tvl: Number(p.tvl || 0),
        chainTvls: {},
        change_1h: p.change_1h as number | null,
        change_1d: p.change_1d as number | null,
        change_7d: p.change_7d as number | null,
        category: String(p.category || "Other"),
        chains: Array.isArray(p.chains) ? p.chains.slice(0, 5) : [],
        logo: String(p.logo || ""),
      }));
  } catch (error) {
    console.error("Failed to fetch protocols:", error);
    throw error;
  }
}

// Fetch total TVL across all chains
export async function getTotalTvl(): Promise<number> {
  try {
    const response = await fetch(`${DEFILLAMA_API}/v2/historicalChainTvl`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`DefiLlama API error: ${response.status}`);
    }

    const data = await response.json();

    // Get the latest TVL
    if (Array.isArray(data) && data.length > 0) {
      const latest = data[data.length - 1];
      return latest.tvl || 0;
    }

    return 0;
  } catch (error) {
    console.error("Failed to fetch total TVL:", error);
    throw error;
  }
}

// Fetch coin prices
export async function getCoinPrices(
  coins: string[] // Format: "chain:address" e.g., "ethereum:0x..."
): Promise<Record<string, CoinPrice>> {
  try {
    const coinsParam = coins.join(",");
    const response = await fetch(
      `${COINS_API}/prices/current/${coinsParam}`,
      { next: { revalidate: 60 } } // Cache for 1 minute
    );

    if (!response.ok) {
      throw new Error(`DefiLlama Coins API error: ${response.status}`);
    }

    const data = await response.json();
    return data.coins || {};
  } catch (error) {
    console.error("Failed to fetch coin prices:", error);
    throw error;
  }
}

// Get market overview data
export async function getMarketOverview(): Promise<MarketData> {
  const [protocols, totalTvl] = await Promise.all([
    getTopProtocols(20),
    getTotalTvl(),
  ]);

  return {
    protocols,
    totalTvl,
    updatedAt: new Date().toISOString(),
  };
}

// Format large numbers for display
export function formatTvl(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  }
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

// Format percentage change
export function formatChange(value: number | null): {
  text: string;
  isPositive: boolean;
  isNegative: boolean;
} {
  if (value === null || value === undefined) {
    return { text: "-", isPositive: false, isNegative: false };
  }

  const isPositive = value > 0;
  const isNegative = value < 0;
  const text = `${isPositive ? "+" : ""}${value.toFixed(2)}%`;

  return { text, isPositive, isNegative };
}
