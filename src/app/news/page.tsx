import { Suspense } from "react";
import { getLatestNews, timeAgo } from "@/lib/news";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ExternalLink, Clock } from "lucide-react";
import { NewsFilter } from "./news-filter";

export const metadata = {
  title: "Tin tức DeFi",
  description: "Cập nhật tin tức mới nhất về DeFi và Crypto",
};

export const revalidate = 300; // 5 min

type FilterType = "all" | "defi" | "nft" | "trading";

const categoryLabels: Record<FilterType, string> = {
  all: "Tất cả",
  defi: "DeFi",
  nft: "NFT",
  trading: "Trading",
};

function NewsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="h-20 w-20 bg-muted animate-pulse rounded shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                <div className="h-4 bg-muted animate-pulse rounded w-full" />
                <div className="h-3 bg-muted animate-pulse rounded w-1/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function NewsData({ filter }: { filter: FilterType }) {
  const news = await getLatestNews(filter, 1, 30);

  if (news.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Không thể tải tin tức. Vui lòng thử lại sau.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {news.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <Card className="transition-all hover:shadow-md hover:border-primary/30">
            <CardContent className="p-4">
              <div className="flex gap-4">
                {item.thumb_2x && (
                  <div className="shrink-0 h-20 w-20 rounded overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumb_2x}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs py-0">
                      {item.source}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {timeAgo(item.created_at)}
                    </span>
                    <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}

interface Props {
  searchParams: Promise<{ filter?: string }>;
}

export default async function NewsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filter = (params.filter as FilterType) || "all";
  const validFilters: FilterType[] = ["all", "defi", "nft", "trading"];
  const activeFilter = validFilters.includes(filter) ? filter : "all";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Newspaper className="h-7 w-7" />
          Tin Tức Crypto
        </h1>
        <p className="text-muted-foreground mt-1">
          Cập nhật mới nhất từ thị trường DeFi và Crypto
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {(Object.keys(categoryLabels) as FilterType[]).map((f) => (
          <NewsFilter key={f} filter={f} active={activeFilter === f} label={categoryLabels[f]} />
        ))}
      </div>

      <Suspense fallback={<NewsSkeleton />}>
        <NewsData filter={activeFilter} />
      </Suspense>
    </div>
  );
}
