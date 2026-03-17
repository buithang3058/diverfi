import { getTracks, getAllLessons } from "@/lib/lessons";
import { TrackCard } from "@/components/track-card";
import { BookmarkedLessons } from "@/components/bookmarked-lessons";
import { LessonSearch } from "@/components/lesson-search";
import { RecentlyViewed } from "@/components/recently-viewed";

export const metadata = {
  title: "Học DeFi",
  description: "Khóa học DeFi và Crypto cho người Việt",
};

const trackDescriptions: Record<string, string> = {
  "defi-basics": "Tìm hiểu về DeFi là gì, tại sao nó quan trọng, và cách bắt đầu.",
  "crypto-security": "Bảo vệ tài sản crypto của bạn khỏi hacker và lừa đảo.",
  "yield-farming": "Cách kiếm lợi nhuận từ việc cung cấp thanh khoản.",
  trading: "Học cách giao dịch crypto từ cơ bản đến phân tích kỹ thuật.",
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

      {/* Search */}
      <LessonSearch lessons={allLessons} />

      {/* Recently viewed */}
      <RecentlyViewed lessons={allLessons} />

      {/* Bookmarked lessons */}
      <BookmarkedLessons />

      <div className="grid gap-4 md:grid-cols-2">
        {tracks.map((track) => (
          <TrackCard
            key={track.slug}
            track={track}
            lessonIds={trackLessonIds[track.slug] || []}
            description={trackDescriptions[track.slug] || `Khóa học về ${track.title}`}
          />
        ))}

      </div>
    </div>
  );
}
