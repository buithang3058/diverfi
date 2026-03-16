"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { isLessonComplete, markLessonComplete, updateLastVisited } from "@/lib/progress";

interface Props {
  lessonId: string;
}

export function LessonProgress({ lessonId }: Props) {
  const [isComplete, setIsComplete] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    // Check if lesson is already complete
    setIsComplete(isLessonComplete(lessonId));

    // Update last visited
    updateLastVisited(lessonId);
  }, [lessonId]);

  const handleMarkComplete = () => {
    const success = markLessonComplete(lessonId);

    if (success) {
      setIsComplete(true);
      setSaveError(false);
    } else {
      setSaveError(true);
    }
  };

  if (isComplete) {
    return (
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span className="font-medium">Đã hoàn thành bài học này</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleMarkComplete} className="w-full sm:w-auto">
        Đánh dấu đã học xong
      </Button>

      {saveError && (
        <p className="text-sm text-destructive">
          Không thể lưu tiến độ. Vui lòng thử lại.
        </p>
      )}
    </div>
  );
}
