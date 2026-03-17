"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

const RATINGS_KEY = "diverfi-ratings";

interface RatingData {
  lessonId: string;
  rating: number;
  helpful: boolean | null;
  ratedAt: string;
}

interface Props {
  lessonId: string;
  lessonTitle: string;
}

export function LessonRating({ lessonId, lessonTitle }: Props) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RATINGS_KEY);
      if (stored) {
        const ratings: RatingData[] = JSON.parse(stored);
        const existing = ratings.find((r) => r.lessonId === lessonId);
        if (existing) {
          setRating(existing.rating);
          setHelpful(existing.helpful);
          setSubmitted(true);
        }
      }
    } catch {
      // Ignore
    }
    setIsLoading(false);
  }, [lessonId]);

  const saveRating = (newRating: number, newHelpful: boolean | null) => {
    try {
      const stored = localStorage.getItem(RATINGS_KEY);
      const ratings: RatingData[] = stored ? JSON.parse(stored) : [];

      const existingIndex = ratings.findIndex((r) => r.lessonId === lessonId);
      const ratingData: RatingData = {
        lessonId,
        rating: newRating,
        helpful: newHelpful,
        ratedAt: new Date().toISOString(),
      };

      if (existingIndex >= 0) {
        ratings[existingIndex] = ratingData;
      } else {
        ratings.push(ratingData);
      }

      localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
    } catch {
      // Ignore
    }
  };

  const handleRating = (value: number) => {
    setRating(value);
    saveRating(value, helpful);
    setSubmitted(true);
  };

  const handleHelpful = (value: boolean) => {
    setHelpful(value);
    saveRating(rating, value);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-20 bg-muted rounded"></div>
      </div>
    );
  }

  const ratingLabels = [
    "",
    "Rất tệ",
    "Tệ",
    "Bình thường",
    "Tốt",
    "Xuất sắc",
  ];

  return (
    <div className="border rounded-lg p-6 bg-card">
      <div className="text-center">
        <h3 className="font-semibold mb-2">Đánh giá bài học này</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Phản hồi của bạn giúp cải thiện nội dung
        </p>

        {/* Star Rating */}
        <div className="flex items-center justify-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className="p-1 transition-transform hover:scale-110 focus:outline-none"
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => handleRating(value)}
            >
              <Star
                className={cn(
                  "h-8 w-8 transition-colors",
                  (hoveredRating || rating) >= value
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                )}
              />
            </button>
          ))}
        </div>

        {/* Rating Label */}
        <p className="text-sm font-medium h-5 mb-4">
          {hoveredRating > 0
            ? ratingLabels[hoveredRating]
            : rating > 0
            ? ratingLabels[rating]
            : ""}
        </p>

        {/* Thank you message */}
        {submitted && rating > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-green-600 dark:text-green-400">
              Cảm ơn bạn đã đánh giá!
            </p>

            {/* Helpful Question */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Bài học này có hữu ích không?
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant={helpful === true ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleHelpful(true)}
                  className="gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Có
                </Button>
                <Button
                  variant={helpful === false ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleHelpful(false)}
                  className="gap-2"
                >
                  <ThumbsDown className="h-4 w-4" />
                  Không
                </Button>
              </div>

              {helpful !== null && (
                <p className="text-xs text-muted-foreground mt-3">
                  Đã ghi nhận phản hồi của bạn
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Component to show average rating (for lesson list/cards)
export function LessonRatingDisplay({ lessonId }: { lessonId: string }) {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RATINGS_KEY);
      if (stored) {
        const ratings: RatingData[] = JSON.parse(stored);
        const existing = ratings.find((r) => r.lessonId === lessonId);
        if (existing) {
          setRating(existing.rating);
        }
      }
    } catch {
      // Ignore
    }
  }, [lessonId]);

  if (!rating) return null;

  return (
    <div className="flex items-center gap-1">
      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
      <span className="text-xs text-muted-foreground">{rating}/5</span>
    </div>
  );
}

// Hook to get all ratings stats
export function useRatingsStats() {
  const [stats, setStats] = useState({
    totalRatings: 0,
    averageRating: 0,
    helpfulCount: 0,
    notHelpfulCount: 0,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RATINGS_KEY);
      if (stored) {
        const ratings: RatingData[] = JSON.parse(stored);
        const total = ratings.length;
        const avg =
          total > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / total
            : 0;
        const helpful = ratings.filter((r) => r.helpful === true).length;
        const notHelpful = ratings.filter((r) => r.helpful === false).length;

        setStats({
          totalRatings: total,
          averageRating: Math.round(avg * 10) / 10,
          helpfulCount: helpful,
          notHelpfulCount: notHelpful,
        });
      }
    } catch {
      // Ignore
    }
  }, []);

  return stats;
}
