import { Suspense } from "react";
import { getMarketOverview } from "@/lib/defillama";
import { Card, CardContent } from "@/components/ui/card";
import { ProtocolTable } from "@/components/protocol-table";

export const metadata = {
  title: "Thị trường",
  description: "Theo dõi TVL của các DeFi protocols hàng đầu",
};

// Disable static generation for this page (uses live API data)
export const dynamic = "force-dynamic";

// Loading skeleton
function MarketsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="h-4 w-24 bg-muted animate-pulse rounded mb-2" />
              <div className="h-8 w-32 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="h-96 bg-muted animate-pulse" />
        </CardContent>
      </Card>
    </div>
  );
}

// Data fetcher component
async function MarketsData() {
  try {
    const data = await getMarketOverview();

    return (
      <ProtocolTable
        protocols={data.protocols}
        totalTvl={data.totalTvl}
        updatedAt={data.updatedAt}
      />
    );
  } catch (error) {
    console.error("Markets page error:", error);

    return (
      <Card className="border-destructive">
        <CardContent className="p-8 text-center">
          <p className="text-destructive font-medium mb-2">
            Không thể tải dữ liệu thị trường
          </p>
          <p className="text-sm text-muted-foreground">
            Vui lòng thử lại sau. Nếu lỗi tiếp tục, DefiLlama API có thể đang bảo trì.
          </p>
        </CardContent>
      </Card>
    );
  }
}

export default function MarketsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Thị trường DeFi</h1>
        <p className="text-muted-foreground mt-2">
          Theo dõi TVL và xu hướng của các DeFi protocols hàng đầu
        </p>
      </div>

      <Suspense fallback={<MarketsSkeleton />}>
        <MarketsData />
      </Suspense>
    </div>
  );
}
