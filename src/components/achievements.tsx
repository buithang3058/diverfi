"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Lock, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  achievements,
  rarityColors,
  rarityBorders,
  rarityLabels,
  type Achievement,
} from "@/data/achievements";

const ACHIEVEMENTS_KEY = "diverfi-achievements";
const PROGRESS_KEY = "diverfi-progress";
const STREAK_KEY = "diverfi-streak";
const BOOKMARKS_KEY = "diverfi-bookmarks";
const STUDY_TIME_KEY = "diverfi-total-study-time";
const QUIZ_RESULTS_KEY = "diverfi-quiz-results";

interface UnlockedAchievement {
  id: string;
  unlockedAt: string;
}

interface UserProgress {
  completedLessons: string[];
  completedTracks: string[];
}

function getUnlockedAchievements(): UnlockedAchievement[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveUnlockedAchievement(id: string) {
  try {
    const unlocked = getUnlockedAchievements();
    if (!unlocked.find((a) => a.id === id)) {
      unlocked.push({ id, unlockedAt: new Date().toISOString() });
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(unlocked));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

function getUserProgress(): UserProgress {
  if (typeof window === "undefined") return { completedLessons: [], completedTracks: [] };
  try {
    const stored = localStorage.getItem(PROGRESS_KEY);
    const progress = stored ? JSON.parse(stored) : {};
    return {
      completedLessons: Object.keys(progress).filter((k) => progress[k].completed),
      completedTracks: [],
    };
  } catch {
    return { completedLessons: [], completedTracks: [] };
  }
}

function getStreak(): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem(STREAK_KEY);
    if (!stored) return 0;
    const streak = JSON.parse(stored);
    return streak.currentStreak || 0;
  } catch {
    return 0;
  }
}

function getBookmarksCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    const bookmarks = stored ? JSON.parse(stored) : [];
    return bookmarks.length;
  } catch {
    return 0;
  }
}

function getTotalStudyTime(): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem(STUDY_TIME_KEY);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

function getBestQuizScore(): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem(QUIZ_RESULTS_KEY);
    if (!stored) return 0;
    const results = JSON.parse(stored);
    let maxPercentage = 0;
    Object.values(results).forEach((result: unknown) => {
      const r = result as { score: number; total: number };
      const percentage = Math.round((r.score / r.total) * 100);
      if (percentage > maxPercentage) maxPercentage = percentage;
    });
    return maxPercentage;
  } catch {
    return 0;
  }
}

export function checkAchievements(): string[] {
  const unlocked = getUnlockedAchievements();
  const progress = getUserProgress();
  const streak = getStreak();
  const bookmarks = getBookmarksCount();
  const studyTime = getTotalStudyTime();
  const bestQuiz = getBestQuizScore();

  const newlyUnlocked: string[] = [];

  achievements.forEach((achievement) => {
    if (unlocked.find((a) => a.id === achievement.id)) return;

    let earned = false;

    switch (achievement.condition.type) {
      case "first_lesson":
        earned = progress.completedLessons.length >= 1;
        break;
      case "lessons_completed":
        earned = progress.completedLessons.length >= achievement.condition.value;
        break;
      case "track_completed":
        const trackId = achievement.condition.trackId;
        if (trackId) {
          const trackLessons = progress.completedLessons.filter((l) =>
            l.startsWith(trackId + "/")
          );
          earned = trackLessons.length >= 8;
        }
        break;
      case "all_tracks":
        const tracks = ["defi-basics", "trading", "crypto-security", "yield-farming"];
        const completedTracks = tracks.filter((t) => {
          const lessons = progress.completedLessons.filter((l) => l.startsWith(t + "/"));
          return lessons.length >= 5;
        });
        earned = completedTracks.length >= achievement.condition.value;
        break;
      case "streak_days":
        earned = streak >= achievement.condition.value;
        break;
      case "quiz_score":
        earned = bestQuiz >= achievement.condition.value;
        break;
      case "bookmarks":
        earned = bookmarks >= achievement.condition.value;
        break;
      case "study_time":
        earned = studyTime >= achievement.condition.value;
        break;
    }

    if (earned) {
      if (saveUnlockedAchievement(achievement.id)) {
        newlyUnlocked.push(achievement.id);
      }
    }
  });

  return newlyUnlocked;
}

export function AchievementBadge({
  achievement,
  unlocked,
  size = "md",
}: {
  achievement: Achievement;
  unlocked: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-12 w-12 text-xl",
    md: "h-16 w-16 text-2xl",
    lg: "h-20 w-20 text-3xl",
  };

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center border-2 transition-all",
        sizeClasses[size],
        unlocked
          ? cn("bg-gradient-to-br", rarityColors[achievement.rarity], rarityBorders[achievement.rarity])
          : "bg-muted border-muted-foreground/20 opacity-50 grayscale"
      )}
    >
      {unlocked ? (
        <span>{achievement.icon}</span>
      ) : (
        <Lock className={cn(
          size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6",
          "text-muted-foreground"
        )} />
      )}
      {unlocked && achievement.rarity === "legendary" && (
        <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
      )}
    </div>
  );
}

export function AchievementCard({
  achievement,
  unlocked,
  unlockedAt,
}: {
  achievement: Achievement;
  unlocked: boolean;
  unlockedAt?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg border transition-all",
        unlocked
          ? "bg-card hover:bg-muted/50"
          : "bg-muted/30 opacity-60"
      )}
    >
      <AchievementBadge achievement={achievement} unlocked={unlocked} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={cn("font-medium", !unlocked && "text-muted-foreground")}>
            {achievement.title}
          </h3>
          <Badge
            variant="secondary"
            className={cn(
              "text-xs",
              unlocked && "bg-gradient-to-r text-white",
              unlocked && rarityColors[achievement.rarity]
            )}
          >
            {rarityLabels[achievement.rarity]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{achievement.description}</p>
        {unlocked && unlockedAt && (
          <p className="text-xs text-muted-foreground mt-1">
            Mở khóa: {new Date(unlockedAt).toLocaleDateString("vi-VN")}
          </p>
        )}
      </div>
      <div className="text-right shrink-0">
        <div className={cn(
          "font-bold",
          unlocked ? "text-primary" : "text-muted-foreground"
        )}>
          +{achievement.xp} XP
        </div>
      </div>
    </div>
  );
}

export function AchievementsPanel() {
  const [unlocked, setUnlocked] = useState<UnlockedAchievement[]>([]);
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");

  useEffect(() => {
    setUnlocked(getUnlockedAchievements());
    checkAchievements();
    setUnlocked(getUnlockedAchievements());
  }, []);

  const totalXP = unlocked.reduce((sum, u) => {
    const achievement = achievements.find((a) => a.id === u.id);
    return sum + (achievement?.xp || 0);
  }, 0);

  const filteredAchievements = achievements.filter((a) => {
    const isUnlocked = unlocked.some((u) => u.id === a.id);
    if (filter === "unlocked") return isUnlocked;
    if (filter === "locked") return !isUnlocked;
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Thành Tựu
          </CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{totalXP} XP</div>
            <div className="text-xs text-muted-foreground">
              {unlocked.length}/{achievements.length} thành tựu
            </div>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          {(["all", "unlocked", "locked"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "Tất cả" : f === "unlocked" ? "Đã mở" : "Chưa mở"}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredAchievements.map((achievement) => {
            const unlockedInfo = unlocked.find((u) => u.id === achievement.id);
            return (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                unlocked={!!unlockedInfo}
                unlockedAt={unlockedInfo?.unlockedAt}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function AchievementsSummary() {
  const [unlocked, setUnlocked] = useState<UnlockedAchievement[]>([]);

  useEffect(() => {
    setUnlocked(getUnlockedAchievements());
  }, []);

  const recentAchievements = achievements
    .filter((a) => unlocked.some((u) => u.id === a.id))
    .slice(0, 3);

  const totalXP = unlocked.reduce((sum, u) => {
    const achievement = achievements.find((a) => a.id === u.id);
    return sum + (achievement?.xp || 0);
  }, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            Thành Tựu
          </CardTitle>
          <Badge variant="secondary">{totalXP} XP</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {recentAchievements.length > 0 ? (
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {recentAchievements.map((a) => (
                <AchievementBadge key={a.id} achievement={a} unlocked size="sm" />
              ))}
            </div>
            <div className="flex-1">
              <p className="text-sm">
                {unlocked.length}/{achievements.length} thành tựu
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              nativeButton={false}
              render={<a href="/dashboard#achievements" />}
            >
              Xem tất cả
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Hoàn thành bài học để mở khóa thành tựu!
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Alias for backward compatibility
export const Achievements = AchievementsPanel;
