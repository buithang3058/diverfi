"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProgress, type ProgressData } from "@/lib/progress";
import { PlayCircle, CheckCircle2 } from "lucide-react";

interface Lesson {
  slug: string;
  title: string;
  track: string;
  order: number;
}

interface Props {
  lessons: Lesson[];
}

export function ContinueLearning({ lessons }: Props) {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProgress(getProgress());
  }, []);

  if (!mounted) {
    return null;
  }

  if (!progress || progress.completedLessons.length === 0) {
    return null; // Don't show if user hasn't started
  }

  const completedCount = progress.completedLessons.length;
  const totalCount = lessons.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  // Find next lesson to continue
  const nextLesson = lessons.find(
    (lesson) => !progress.completedLessons.includes(`${lesson.track}/${lesson.slug}`)
  );

  // Find last visited lesson
  const lastVisitedLesson = progress.lastVisited
    ? lessons.find(
        (lesson) => `${lesson.track}/${lesson.slug}` === progress.lastVisited
      )
    : null;

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <PlayCircle className="h-5 w-5 text-primary" />
          Tiếp tục học
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Tiến độ</span>
            <span className="font-medium">
              {completedCount}/{totalCount} bài ({percentage}%)
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Next lesson or completion message */}
        {nextLesson ? (
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Bài tiếp theo</p>
              <p className="font-medium truncate">{nextLesson.title}</p>
            </div>
            <Button
              size="sm"
              nativeButton={false}
              render={<Link href={`/learn/${nextLesson.track}/${nextLesson.slug}`} />}
            >
              Học tiếp
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Chúc mừng! Bạn đã hoàn thành tất cả bài học.</span>
          </div>
        )}

        {/* Last visited (if different from next) */}
        {lastVisitedLesson &&
          nextLesson &&
          lastVisitedLesson.slug !== nextLesson.slug && (
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Lần cuối xem:{" "}
                <Link
                  href={`/learn/${lastVisitedLesson.track}/${lastVisitedLesson.slug}`}
                  className="underline hover:text-foreground"
                >
                  {lastVisitedLesson.title}
                </Link>
              </p>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
