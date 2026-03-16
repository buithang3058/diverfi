"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProgress } from "@/lib/progress";
import { CheckCircle2 } from "lucide-react";

interface Props {
  track: {
    slug: string;
    title: string;
    lessonCount: number;
  };
  lessonIds: string[];
  description: string;
}

export function TrackCard({ track, lessonIds, description }: Props) {
  const [completedCount, setCompletedCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const progress = getProgress();
    const completed = lessonIds.filter((id) =>
      progress.completedLessons.includes(id)
    ).length;
    setCompletedCount(completed);
  }, [lessonIds]);

  const isCompleted = completedCount === track.lessonCount && track.lessonCount > 0;
  const hasStarted = completedCount > 0;
  const percentage = track.lessonCount > 0
    ? Math.round((completedCount / track.lessonCount) * 100)
    : 0;

  return (
    <Card className="hover:bg-muted/50 transition-colors overflow-hidden">
      <Link href={`/learn/${track.slug}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {track.title}
              {isCompleted && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
            </CardTitle>
            <Badge variant={isCompleted ? "default" : "secondary"}>
              {track.lessonCount} bài
            </Badge>
          </div>
          <CardDescription>{description}</CardDescription>

          {/* Progress bar - only show if user has started */}
          {mounted && hasStarted && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Tiến độ</span>
                <span className="font-medium">
                  {completedCount}/{track.lessonCount} ({percentage}%)
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isCompleted ? "bg-green-500" : "bg-primary"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}
        </CardHeader>
      </Link>
    </Card>
  );
}
