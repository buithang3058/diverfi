"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { LessonListItem } from "@/components/lesson-list-item";
import { Filter } from "lucide-react";
import type { LessonMeta } from "@/lib/lessons";

interface Props {
  lessons: LessonMeta[];
}

type Difficulty = "all" | "beginner" | "intermediate" | "advanced";

const difficultyConfig: Record<
  Difficulty,
  { label: string; activeClass: string; inactiveClass: string }
> = {
  all: {
    label: "Tất cả",
    activeClass: "bg-primary text-primary-foreground",
    inactiveClass: "bg-muted hover:bg-accent",
  },
  beginner: {
    label: "Cơ bản",
    activeClass: "bg-green-500 text-white",
    inactiveClass: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50",
  },
  intermediate: {
    label: "Trung bình",
    activeClass: "bg-yellow-500 text-white",
    inactiveClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/50",
  },
  advanced: {
    label: "Nâng cao",
    activeClass: "bg-red-500 text-white",
    inactiveClass: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50",
  },
};

export function TrackLessonsFilter({ lessons }: Props) {
  const [filter, setFilter] = useState<Difficulty>("all");

  const filteredLessons =
    filter === "all"
      ? lessons
      : lessons.filter((l) => l.difficulty === filter);

  // Count by difficulty
  const counts: Record<Difficulty, number> = {
    all: lessons.length,
    beginner: lessons.filter((l) => l.difficulty === "beginner").length,
    intermediate: lessons.filter((l) => l.difficulty === "intermediate").length,
    advanced: lessons.filter((l) => l.difficulty === "advanced").length,
  };

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Lọc theo độ khó:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(difficultyConfig) as Difficulty[]).map((difficulty) => {
            const config = difficultyConfig[difficulty];
            const isActive = filter === difficulty;
            const count = counts[difficulty];

            return (
              <button
                key={difficulty}
                onClick={() => setFilter(difficulty)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive ? config.activeClass : config.inactiveClass
                } ${isActive ? "ring-2 ring-offset-2 ring-offset-background" : ""}`}
              >
                {config.label}
                <span className={`ml-1.5 ${isActive ? "opacity-80" : "opacity-60"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active filter indicator */}
      {filter !== "all" && (
        <div className="flex items-center gap-2 mb-4 text-sm">
          <span className="text-muted-foreground">Đang hiển thị:</span>
          <Badge
            className={
              filter === "beginner"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : filter === "intermediate"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }
          >
            {difficultyConfig[filter].label}
          </Badge>
          <button
            onClick={() => setFilter("all")}
            className="text-primary hover:underline"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* Lessons list */}
      <div className="space-y-3">
        {filteredLessons.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-muted/30">
            <p className="text-muted-foreground">
              Không có bài học nào ở cấp độ {difficultyConfig[filter].label.toLowerCase()}
            </p>
          </div>
        ) : (
          filteredLessons.map((lesson) => (
            <LessonListItem
              key={lesson.slug}
              lesson={lesson}
              index={lessons.indexOf(lesson) + 1}
            />
          ))
        )}
      </div>

      {/* Summary */}
      {filteredLessons.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Hiển thị {filteredLessons.length} / {lessons.length} bài học
        </div>
      )}
    </div>
  );
}
