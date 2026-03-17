"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  lessonId: string;
}

type Feedback = "helpful" | "not-helpful" | null;

const STORAGE_KEY = "diverfi-feedback";

export function LessonFeedback({ lessonId }: Props) {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: Record<string, Feedback> = JSON.parse(stored);
        if (data[lessonId]) {
          setFeedback(data[lessonId]);
          setSubmitted(true);
        }
      }
    } catch {
      // Ignore
    }
  }, [lessonId]);

  const handleFeedback = (value: Feedback) => {
    setFeedback(value);
    setSubmitted(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const data: Record<string, Feedback> = stored ? JSON.parse(stored) : {};
      data[lessonId] = value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="mt-8 pt-6 border-t">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {submitted ? "Cảm ơn phản hồi của bạn!" : "Bài học này có hữu ích không?"}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleFeedback("helpful")}
            disabled={submitted}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors",
              feedback === "helpful"
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-muted hover:bg-accent",
              submitted && feedback !== "helpful" && "opacity-50"
            )}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Có</span>
          </button>

          <button
            onClick={() => handleFeedback("not-helpful")}
            disabled={submitted}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors",
              feedback === "not-helpful"
                ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                : "bg-muted hover:bg-accent",
              submitted && feedback !== "not-helpful" && "opacity-50"
            )}
          >
            <ThumbsDown className="w-4 h-4" />
            <span>Chưa</span>
          </button>
        </div>
      </div>

      {submitted && feedback === "not-helpful" && (
        <p className="mt-3 text-sm text-muted-foreground">
          Chúng tôi sẽ cải thiện nội dung. Bạn có thể gửi góp ý qua{" "}
          <a
            href="https://github.com/buithang3058/diverfi/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub Issues
          </a>
          .
        </p>
      )}
    </div>
  );
}
