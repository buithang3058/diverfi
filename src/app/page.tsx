import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Học DeFi & Crypto
            <br />
            <span className="text-muted-foreground">dành cho người Việt</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Từ zero đến hero. Hiểu về blockchain, DeFi, và cách tham gia thị trường crypto một cách an toàn.
          </p>
          <div className="flex gap-4">
            <Button size="lg" render={<Link href="/learn" />}>
              Bắt đầu học
            </Button>
            <Button variant="outline" size="lg" render={<Link href="/markets" />}>
              Xem thị trường
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Học từ cơ bản</CardTitle>
              <CardDescription>
                Bắt đầu từ những khái niệm đơn giản nhất
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Blockchain là gì? Ví crypto hoạt động như thế nào? DeFi khác gì CeFi?
                Tất cả được giải thích dễ hiểu bằng tiếng Việt.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dữ liệu thị trường</CardTitle>
              <CardDescription>
                Theo dõi giá và TVL real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Giá Bitcoin, Ethereum, và top altcoins. TVL của các DeFi protocols.
                Tất cả dữ liệu bạn cần để ra quyết định.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thuật ngữ</CardTitle>
              <CardDescription>
                Từ điển crypto tiếng Việt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                APY, TVL, Impermanent Loss, Liquidity Mining...
                Hiểu rõ ý nghĩa từng thuật ngữ trước khi đầu tư.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
