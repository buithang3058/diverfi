"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface Props {
  lessonId: string;
}

const READING_TIME_KEY = "diverfi-reading-time";

export function ReadingTimeTracker({ lessonId }: Props) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Load saved time for this lesson
    try {
      const stored = localStorage.getItem(READING_TIME_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data[lessonId]) {
          setSeconds(data[lessonId]);
        }
      }
    } catch {
      // Ignore
    }

    // Track visibility
    const handleVisibility = () => {
      setIsActive(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [lessonId]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const newSeconds = prev + 1;

        // Save every 10 seconds
        if (newSeconds % 10 === 0) {
          try {
            const stored = localStorage.getItem(READING_TIME_KEY);
            const data = stored ? JSON.parse(stored) : {};
            data[lessonId] = newSeconds;
            localStorage.setItem(READING_TIME_KEY, JSON.stringify(data));
          } catch {
            // Ignore
          }
        }

        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, lessonId]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    if (mins === 0) {
      return `${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Clock className="h-3 w-3" />
      <span>Đã đọc: {formatTime(seconds)}</span>
    </div>
  );
}
