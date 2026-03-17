"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight } from "lucide-react";
import type { LessonMeta } from "@/lib/lessons";

interface Props {
  lessons: LessonMeta[];
}

const STORAGE_KEY = "diverfi_progress";

const difficultyOrder = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

const difficultyLabels = {
  beginner: "Cơ bản",
  intermediate: "Trung bình",
  advanced: "Nâng cao",
};

export function LearningRecommendations({ lessons }: Props) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setCompletedLessons(data.completedLessons || []);
      }
    } catch {
      // Ignore
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  // Get incomplete lessons
  const incompleteLessons = lessons.filter(
    (l) => !completedLessons.includes(`${l.track}/${l.slug}`)
  );

  if (incompleteLessons.length === 0) {
    return null;
  }

  // Score lessons based on various factors
  const scoredLessons = incompleteLessons.map((lesson) => {
    let score = 0;

    // Check if prerequisites are met
    const prereqsMet =
      !lesson.prerequisites ||
      lesson.prerequisites.every((prereq) =>
        completedLessons.includes(prereq)
      );

    if (prereqsMet) {
      score += 50; // Big bonus for meeting prerequisites
    }

    // Prefer easier lessons for beginners, harder for advanced users
    const completedCount = completedLessons.length;
    const userLevel =
      completedCount < 5
        ? "beginner"
        : completedCount < 15
        ? "intermediate"
        : "advanced";

    const diffLevel = difficultyOrder[lesson.difficulty];
    const userLevelNum = difficultyOrder[userLevel];

    // Prefer lessons at or slightly above user level
    if (diffLevel === userLevelNum) {
      score += 30;
    } else if (diffLevel === userLevelNum + 1) {
      score += 20;
    } else if (diffLevel < userLevelNum) {
      score += 10;
    }

    // Prefer lessons from tracks user has started
    const trackLessons = completedLessons.filter((l) =>
      l.startsWith(`${lesson.track}/`)
    );
    if (trackLessons.length > 0) {
      score += 15; // Continue existing track
    }

    // Prefer lower order lessons (sequential learning)
    score -= lesson.order * 2;

    return { lesson, score, prereqsMet };
  });

  // Sort by score and take top 3
  const recommendations = scoredLessons
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const trackTitles: Record<string, string> = {
    "defi-basics": "DeFi Cơ bản",
    "crypto-security": "Bảo mật Crypto",
    "yield-farming": "Yield Farming",
    trading: "Trading",
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          Gợi ý cho bạn
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map(({ lesson, prereqsMet }) => (
            <Link
              key={`${lesson.track}/${lesson.slug}`}
              href={`/learn/${lesson.track}/${lesson.slug}`}
              className="block p-3 rounded-lg border hover:bg-accent transition-colors group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {trackTitles[lesson.track] || lesson.track}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {lesson.estimatedTime}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {difficultyLabels[lesson.difficulty]}
                    </Badge>
                    {prereqsMet && (
                      <span className="text-xs text-green-600">Sẵn sàng</span>
                    )}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
