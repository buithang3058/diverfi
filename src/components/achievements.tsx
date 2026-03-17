"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  Flame,
  Star,
  Trophy,
  Zap,
  Target,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  condition: (stats: UserStats) => boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface UserStats {
  completedLessons: number;
  currentStreak: number;
  longestStreak: number;
  totalReadingTime: number;
  bookmarksCount: number;
  notesCount: number;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_lesson",
    title: "Khởi đầu",
    description: "Hoàn thành bài học đầu tiên",
    icon: <Star className="h-6 w-6" />,
    condition: (stats) => stats.completedLessons >= 1,
    rarity: "common",
  },
  {
    id: "five_lessons",
    title: "Người học",
    description: "Hoàn thành 5 bài học",
    icon: <BookOpen className="h-6 w-6" />,
    condition: (stats) => stats.completedLessons >= 5,
    rarity: "common",
  },
  {
    id: "ten_lessons",
    title: "Chăm chỉ",
    description: "Hoàn thành 10 bài học",
    icon: <Zap className="h-6 w-6" />,
    condition: (stats) => stats.completedLessons >= 10,
    rarity: "rare",
  },
  {
    id: "twenty_lessons",
    title: "Chuyên gia",
    description: "Hoàn thành 20 bài học",
    icon: <GraduationCap className="h-6 w-6" />,
    condition: (stats) => stats.completedLessons >= 20,
    rarity: "epic",
  },
  {
    id: "all_lessons",
    title: "Hoàn hảo",
    description: "Hoàn thành tất cả bài học",
    icon: <Trophy className="h-6 w-6" />,
    condition: (stats) => stats.completedLessons >= 24,
    rarity: "legendary",
  },
  {
    id: "streak_3",
    title: "Đều đặn",
    description: "Chuỗi học 3 ngày liên tiếp",
    icon: <Flame className="h-6 w-6" />,
    condition: (stats) => stats.longestStreak >= 3,
    rarity: "common",
  },
  {
    id: "streak_7",
    title: "Kiên trì",
    description: "Chuỗi học 7 ngày liên tiếp",
    icon: <Flame className="h-6 w-6" />,
    condition: (stats) => stats.longestStreak >= 7,
    rarity: "rare",
  },
  {
    id: "streak_30",
    title: "Bền bỉ",
    description: "Chuỗi học 30 ngày liên tiếp",
    icon: <Flame className="h-6 w-6" />,
    condition: (stats) => stats.longestStreak >= 30,
    rarity: "legendary",
  },
  {
    id: "bookworm",
    title: "Mọt sách",
    description: "Lưu 5 bài học yêu thích",
    icon: <Target className="h-6 w-6" />,
    condition: (stats) => stats.bookmarksCount >= 5,
    rarity: "rare",
  },
  {
    id: "note_taker",
    title: "Ghi chép",
    description: "Viết ghi chú cho 3 bài học",
    icon: <Award className="h-6 w-6" />,
    condition: (stats) => stats.notesCount >= 3,
    rarity: "rare",
  },
];

const rarityColors = {
  common: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  rare: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  epic: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  legendary: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
};

const rarityBorders = {
  common: "border-gray-200 dark:border-gray-700",
  rare: "border-blue-200 dark:border-blue-800",
  epic: "border-purple-200 dark:border-purple-800",
  legendary: "border-yellow-300 dark:border-yellow-700",
};

export function Achievements() {
  const [stats, setStats] = useState<UserStats>({
    completedLessons: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalReadingTime: 0,
    bookmarksCount: 0,
    notesCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Get completed lessons
      const progressStored = localStorage.getItem("diverfi_progress");
      const progress = progressStored ? JSON.parse(progressStored) : {};
      const completedLessons = progress.completedLessons?.length || 0;

      // Get streak
      const streakStored = localStorage.getItem("diverfi-streak");
      const streak = streakStored ? JSON.parse(streakStored) : {};

      // Get bookmarks
      const bookmarksStored = localStorage.getItem("diverfi-bookmarks");
      const bookmarks = bookmarksStored ? JSON.parse(bookmarksStored) : [];

      // Get notes
      const notesStored = localStorage.getItem("diverfi-notes");
      const notes = notesStored ? JSON.parse(notesStored) : {};

      // Get reading time
      const readingStored = localStorage.getItem("diverfi-reading-time");
      const reading = readingStored ? JSON.parse(readingStored) : {};
      const totalReadingTime = Object.values(reading).reduce(
        (sum: number, time) => sum + (time as number),
        0
      );

      setStats({
        completedLessons,
        currentStreak: streak.currentStreak || 0,
        longestStreak: streak.longestStreak || 0,
        totalReadingTime,
        bookmarksCount: Array.isArray(bookmarks) ? bookmarks.length : 0,
        notesCount: Object.keys(notes).length,
      });
    } catch {
      // Ignore
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-1/4"></div>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const unlockedAchievements = ACHIEVEMENTS.filter((a) => a.condition(stats));
  const lockedAchievements = ACHIEVEMENTS.filter((a) => !a.condition(stats));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Thành tích ({unlockedAchievements.length}/{ACHIEVEMENTS.length})
        </h2>

        {unlockedAchievements.length > 0 && (
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-6">
            {unlockedAchievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={cn(
                  "border-2",
                  rarityBorders[achievement.rarity]
                )}
              >
                <CardContent className="pt-4 text-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2",
                      rarityColors[achievement.rarity]
                    )}
                  >
                    {achievement.icon}
                  </div>
                  <h3 className="font-medium text-sm">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {lockedAchievements.length > 0 && (
          <>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Chưa mở khóa
            </h3>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {lockedAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className="border-dashed opacity-50"
                >
                  <CardContent className="pt-4 text-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 bg-muted">
                      {achievement.icon}
                    </div>
                    <h3 className="font-medium text-sm">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
