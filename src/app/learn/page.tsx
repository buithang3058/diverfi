import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTracks, getAllLessons } from "@/lib/lessons";
import { TrackCard } from "@/components/track-card";

export const metadata = {
  title: "Học DeFi",
  description: "Khóa học DeFi và Crypto cho người Việt",
};

const trackDescriptions: Record<string, string> = {
  "defi-basics": "Tìm hiểu về DeFi là gì, tại sao nó quan trọng, và cách bắt đầu.",
  "yield-farming": "Cách kiếm lợi nhuận từ việc cung cấp thanh khoản.",
  trading: "Chiến lược và kỹ thuật giao dịch crypto hiệu quả.",
};

export default function LearnPage() {
  const tracks = getTracks();
  const allLessons = getAllLessons();

  // Get lesson IDs for each track
  const trackLessonIds: Record<string, string[]> = {};
  for (const track of tracks) {
    trackLessonIds[track.slug] = allLessons
      .filter((l) => l.track === track.slug)
      .map((l) => `${l.track}/${l.slug}`);
  }

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
          <TrackCard
            key={track.slug}
            track={track}
            lessonIds={trackLessonIds[track.slug] || []}
            description={trackDescriptions[track.slug] || `Khóa học về ${track.title}`}
          />
        ))}

        {/* Coming soon tracks */}
        <Card className="opacity-50 cursor-not-allowed">
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

        <Card className="opacity-50 cursor-not-allowed">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Trading Cơ bản</CardTitle>
              <Badge variant="outline">Sắp ra mắt</Badge>
            </div>
            <CardDescription>
              Chiến lược và kỹ thuật giao dịch crypto hiệu quả.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
