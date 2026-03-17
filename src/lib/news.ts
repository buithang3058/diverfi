export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  description: string;
  thumb_2x: string | null;
  created_at: number;
}

export interface NewsResponse {
  data: NewsItem[];
  count: number;
}

// CoinGecko public news API (no key required)
export async function getLatestNews(
  filter: "all" | "defi" | "nft" | "trading" = "all",
  page = 1,
  perPage = 20
): Promise<NewsItem[]> {
  const categoryMap: Record<string, string> = {
    all: "",
    defi: "decentralized-finance-defi",
    nft: "non-fungible-tokens-nft",
    trading: "trading",
  };

  const category = categoryMap[filter];
  const params = new URLSearchParams({
    locale: "en",
    page: page.toString(),
    per_page: perPage.toString(),
  });
  if (category) params.set("category", category);

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/news?${params}`,
      {
        next: { revalidate: 300 }, // 5 minutes ISR
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) throw new Error(`News API error: ${res.status}`);

    const json = await res.json();

    // CoinGecko returns { data: [...] }
    const items: NewsItem[] = (json.data || []).map((item: NewsItem) => ({
      id: item.id || String(item.created_at),
      title: item.title || "",
      url: item.url || "",
      source: item.source || "",
      description: item.description || "",
      thumb_2x: item.thumb_2x || null,
      created_at: item.created_at || 0,
    }));

    return items;
  } catch {
    return [];
  }
}

export function timeAgo(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;

  if (diff < 60) return "vừa xong";
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} ngày trước`;
  return new Date(timestamp * 1000).toLocaleDateString("vi-VN");
}
