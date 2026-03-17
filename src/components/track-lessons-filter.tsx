"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { LessonListItem } from "@/components/lesson-list-item";
import type { LessonMeta } from "@/lib/lessons";

interface Props {
  lessons: LessonMeta[];
}

const difficultyOptions = [
  { value: "all", label: "Tất cả" },
  { value: "beginner", label: "Cơ bản" },
  { value: "intermediate", label: "Trung bình" },
  { value: "advanced", label: "Nâng cao" },
];

export function TrackLessonsFilter({ lessons }: Props) {
  const [filter, setFilter] = useState("all");

  const filteredLessons =
    filter === "all"
      ? lessons
      : lessons.filter((l) => l.difficulty === filter);

  // Count by difficulty
  const counts = {
    all: lessons.length,
    beginner: lessons.filter((l) => l.difficulty === "beginner").length,
    intermediate: lessons.filter((l) => l.difficulty === "intermediate").length,
    advanced: lessons.filter((l) => l.difficulty === "advanced").length,
  };

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {difficultyOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              filter === option.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-accent"
            }`}
          >
            {option.label}
            <Badge variant="secondary" className="ml-2 text-xs">
              {counts[option.value as keyof typeof counts]}
            </Badge>
          </button>
        ))}
      </div>

      {/* Lessons list */}
      <div className="space-y-3">
        {filteredLessons.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Không có bài học nào ở cấp độ này
          </p>
        ) : (
          filteredLessons.map((lesson, index) => (
            <LessonListItem
              key={lesson.slug}
              lesson={lesson}
              index={lessons.indexOf(lesson) + 1}
            />
          ))
        )}
      </div>
    </div>
  );
}
