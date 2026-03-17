"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { LessonMeta } from "@/lib/lessons";

interface Props {
  lessons: LessonMeta[];
}

const STORAGE_KEY = "diverfi-recently-viewed";
const MAX_RECENT = 3;

interface RecentLesson {
  id: string;
  timestamp: number;
}

export function RecentlyViewed({ lessons }: Props) {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const recent: RecentLesson[] = JSON.parse(stored);
        // Sort by timestamp descending and take top 3
        const sortedIds = recent
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, MAX_RECENT)
          .map((r) => r.id);
        setRecentIds(sortedIds);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const recentLessons = recentIds
    .map((id) => {
      const [track, slug] = id.split("/");
      return lessons.find((l) => l.track === track && l.slug === slug);
    })
    .filter((l): l is LessonMeta => l !== undefined);

  if (recentLessons.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h2 className="font-medium">Xem gần đây</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {recentLessons.map((lesson) => (
          <Link
            key={`${lesson.track}/${lesson.slug}`}
            href={`/learn/${lesson.track}/${lesson.slug}`}
            className="px-3 py-1.5 text-sm rounded-full border hover:bg-accent transition-colors"
          >
            {lesson.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
