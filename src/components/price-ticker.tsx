import { TrendingUp, TrendingDown } from "lucide-react";

interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

async function getPrices(): Promise<CoinPrice[]> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,bnb,solana,usd-coin&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h",
      {
        next: { revalidate: 60 }, // 1 min
        headers: { Accept: "application/json" },
      }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

function formatPrice(price: number): string {
  if (price >= 1000) return price.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (price >= 1) return price.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return price.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

export async function PriceTicker() {
  const prices = await getPrices();
  if (prices.length === 0) return null;

  return (
    <div className="border-b bg-muted/30 overflow-hidden hidden md:block">
      <div className="container py-1.5">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
          {prices.map((coin) => {
            const isUp = coin.price_change_percentage_24h >= 0;
            return (
              <div key={coin.id} className="flex items-center gap-1.5 shrink-0 text-sm">
                <span className="font-medium uppercase text-muted-foreground">
                  {coin.symbol}
                </span>
                <span className="font-semibold">${formatPrice(coin.current_price)}</span>
                <span
                  className={
                    isUp ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }
                >
                  {isUp ? (
                    <TrendingUp className="h-3 w-3 inline mr-0.5" />
                  ) : (
                    <TrendingDown className="h-3 w-3 inline mr-0.5" />
                  )}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
            );
          })}
          <span className="ml-auto text-xs text-muted-foreground shrink-0">
            nguồn: CoinGecko
          </span>
        </div>
      </div>
    </div>
  );
}
