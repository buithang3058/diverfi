import { notFound } from "next/navigation";
import { getAllLessons, getTracks } from "@/lib/lessons";
import { Badge } from "@/components/ui/badge";
import { LessonListItem } from "@/components/lesson-list-item";
import { Breadcrumb } from "@/components/breadcrumb";

interface Props {
  params: Promise<{
    track: string;
  }>;
}

const trackInfo: Record<string, { title: string; description: string }> = {
  "defi-basics": {
    title: "DeFi Cơ bản",
    description: "Tìm hiểu về DeFi là gì, tại sao nó quan trọng, và cách bắt đầu.",
  },
  "crypto-security": {
    title: "Bảo mật Crypto",
    description: "Bảo vệ tài sản crypto của bạn khỏi hacker và lừa đảo.",
  },
  "yield-farming": {
    title: "Yield Farming",
    description: "Cách kiếm lợi nhuận từ việc cung cấp thanh khoản.",
  },
};

export async function generateStaticParams() {
  const tracks = getTracks();
  return tracks.map((track) => ({
    track: track.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { track } = await params;
  const info = trackInfo[track];

  if (!info) {
    return { title: "Track không tìm thấy" };
  }

  return {
    title: info.title,
    description: info.description,
  };
}

export default async function TrackPage({ params }: Props) {
  const { track } = await params;
  const info = trackInfo[track];
  const lessons = getAllLessons(track);

  if (!info || lessons.length === 0) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Học", href: "/learn" },
            { label: info.title },
          ]}
        />
        <h1 className="text-3xl font-bold tracking-tight">{info.title}</h1>
        <p className="text-muted-foreground mt-2">{info.description}</p>
        <div className="flex items-center gap-2 mt-4">
          <Badge variant="secondary">{lessons.length} bài học</Badge>
        </div>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson, index) => (
          <LessonListItem
            key={lesson.slug}
            lesson={lesson}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
