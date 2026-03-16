import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getTracks } from "@/lib/lessons";

export const metadata = {
  title: "Học DeFi",
  description: "Khóa học DeFi và Crypto cho người Việt",
};

const trackDescriptions: Record<string, string> = {
  "defi-basics": "Tìm hiểu về DeFi là gì, tại sao nó quan trọng, và cách bắt đầu.",
  "yield-farming": "Cách kiếm lợi nhuận từ việc cung cấp thanh khoản.",
};

export default function LearnPage() {
  const tracks = getTracks();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Học DeFi & Crypto</h1>
        <p className="text-muted-foreground mt-2">
          Bắt đầu hành trình tìm hiểu về tài chính phi tập trung
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tracks.map((track) => (
          <Card key={track.slug} className="hover:bg-muted/50 transition-colors">
            <Link href={`/learn/${track.slug}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{track.title}</CardTitle>
                  <Badge variant="secondary">{track.lessonCount} bài</Badge>
                </div>
                <CardDescription>
                  {trackDescriptions[track.slug] || "Khóa học về " + track.title}
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        ))}

        {/* Coming soon tracks */}
        <Card className="opacity-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Yield Farming</CardTitle>
              <Badge variant="outline">Sắp ra mắt</Badge>
            </div>
            <CardDescription>
              Cách kiếm lợi nhuận từ việc cung cấp thanh khoản.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
