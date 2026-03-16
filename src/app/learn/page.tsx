import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Học DeFi",
  description: "Khóa học DeFi và Crypto cho người Việt",
};

export default function LearnPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Học DeFi & Crypto</h1>
        <p className="text-muted-foreground mt-2">
          Bắt đầu hành trình tìm hiểu về tài chính phi tập trung
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:bg-muted/50 transition-colors">
          <Link href="/learn/defi-basics">
            <CardHeader>
              <CardTitle>DeFi Cơ bản</CardTitle>
              <CardDescription>
                Tìm hiểu về DeFi là gì, tại sao nó quan trọng, và cách bắt đầu.
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:bg-muted/50 transition-colors opacity-50">
          <CardHeader>
            <CardTitle>Yield Farming</CardTitle>
            <CardDescription>
              Sắp ra mắt — Cách kiếm lợi nhuận từ việc cung cấp thanh khoản.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
