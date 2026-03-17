"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { History, Clock } from "lucide-react";
import type { LessonMeta } from "@/lib/lessons";

const RECENTLY_VIEWED_KEY = "diverfi-recently-viewed";
const MAX_RECENT = 5;

interface RecentItem {
  id: string;
  viewedAt: string;
}

interface Props {
  lessons: LessonMeta[];
  tracks?: { slug: string; title: string }[];
}

export function RecentlyViewed({ lessons, tracks }: Props) {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        setRecentItems(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse mb-8">
        <div className="h-6 bg-muted rounded w-1/4 mb-3"></div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-32 bg-muted rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (recentItems.length === 0) {
    return null;
  }

  const recentLessons = recentItems
    .map((item) => {
      const [track, slug] = item.id.split("/");
      const lesson = lessons.find((l) => l.track === track && l.slug === slug);
      if (!lesson) return null;
      return {
        ...lesson,
        viewedAt: item.viewedAt,
      };
    })
    .filter(Boolean);

  if (recentLessons.length === 0) {
    return null;
  }

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins}p trước`;
    if (diffHours < 24) return `${diffHours}h trước`;
    if (diffDays === 1) return "Hôm qua";
    return `${diffDays} ngày`;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <History className="h-4 w-4 text-muted-foreground" />
        <h2 className="font-medium">Xem gần đây</h2>
      </div>
      <div className="space-y-2">
        {recentLessons.slice(0, 5).map(
          (lesson) =>
            lesson && (
              <Link
                key={`${lesson.track}/${lesson.slug}`}
                href={`/learn/${lesson.track}/${lesson.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{lesson.title}</h3>
                  {tracks && (
                    <p className="text-xs text-muted-foreground truncate">
                      {tracks.find((t) => t.slug === lesson.track)?.title}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(lesson.viewedAt)}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {lesson.estimatedTime}
                  </Badge>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
}

// Hook to track lesson views - use in lesson page
export function useTrackLessonView(lessonId: string) {
  useEffect(() => {
    if (!lessonId) return;

    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      const items: RecentItem[] = stored ? JSON.parse(stored) : [];

      // Remove if already exists
      const filtered = items.filter((item) => item.id !== lessonId);

      // Add to beginning
      const updated = [
        { id: lessonId, viewedAt: new Date().toISOString() },
        ...filtered,
      ].slice(0, MAX_RECENT);

      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }, [lessonId]);
}
