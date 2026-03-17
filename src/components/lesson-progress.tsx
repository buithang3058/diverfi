"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/confetti";
import { LessonShareCard } from "@/components/lesson-share-card";
import { recordLearningActivity } from "@/components/streak-calendar";
import {
  isLessonComplete,
  markLessonComplete,
  updateLastVisited,
  updateStreak,
  getCompletedCount,
} from "@/lib/progress";

interface Props {
  lessonId: string;
  lessonTitle?: string;
  trackTitle?: string;
  totalLessons?: number;
}

export function LessonProgress({
  lessonId,
  lessonTitle = "Bài học",
  trackTitle = "Khóa học",
  totalLessons = 31,
}: Props) {
  const [isComplete, setIsComplete] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    // Check if lesson is already complete
    setIsComplete(isLessonComplete(lessonId));

    // Get completed count
    setCompletedCount(getCompletedCount());

    // Update last visited
    updateLastVisited(lessonId);
  }, [lessonId]);

  const handleMarkComplete = () => {
    const success = markLessonComplete(lessonId);

    if (success) {
      setIsComplete(true);
      setSaveError(false);
      setShowConfetti(true);
      setCompletedCount(getCompletedCount());
      updateStreak(); // Update study streak
      recordLearningActivity(); // Record in calendar
    } else {
      setSaveError(true);
    }
  };

  if (isComplete) {
    return (
      <>
        <Confetti
          show={showConfetti}
          onComplete={() => setShowConfetti(false)}
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
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
          <LessonShareCard
            lessonTitle={lessonTitle}
            trackTitle={trackTitle}
            completedCount={completedCount}
            totalLessons={totalLessons}
          />
        </div>
      </>
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
