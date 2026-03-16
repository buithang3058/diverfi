export const metadata = {
  title: "Thị trường",
  description: "Theo dõi giá crypto và DeFi protocols",
};

export default function MarketsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Thị trường</h1>
        <p className="text-muted-foreground mt-2">
          Theo dõi giá và TVL của các crypto và DeFi protocols
        </p>
      </div>

      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">
          Đang phát triển — Trang này sẽ hiển thị dữ liệu thị trường từ DefiLlama.
        </p>
      </div>
    </div>
  );
}
