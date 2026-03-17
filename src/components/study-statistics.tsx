"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, Calendar, TrendingUp } from "lucide-react";

const READING_TIME_KEY = "diverfi-reading-time";
const STREAK_KEY = "diverfi-streak";
const STORAGE_KEY = "diverfi_progress";

interface Stats {
  totalReadingSeconds: number;
  lessonsWithTime: number;
  averageTimePerLesson: number;
  longestSession: number;
  currentStreak: number;
  longestStreak: number;
  completedLessons: number;
}

export function StudyStatistics() {
  const [stats, setStats] = useState<Stats>({
    totalReadingSeconds: 0,
    lessonsWithTime: 0,
    averageTimePerLesson: 0,
    longestSession: 0,
    currentStreak: 0,
    longestStreak: 0,
    completedLessons: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Get reading time data
      const readingStored = localStorage.getItem(READING_TIME_KEY);
      const readingData: Record<string, number> = readingStored
        ? JSON.parse(readingStored)
        : {};

      const times = Object.values(readingData);
      const totalSeconds = times.reduce((sum, t) => sum + t, 0);
      const longestSession = times.length > 0 ? Math.max(...times) : 0;

      // Get streak data
      const streakStored = localStorage.getItem(STREAK_KEY);
      const streakData = streakStored ? JSON.parse(streakStored) : {};

      // Get progress data
      const progressStored = localStorage.getItem(STORAGE_KEY);
      const progressData = progressStored ? JSON.parse(progressStored) : {};

      setStats({
        totalReadingSeconds: totalSeconds,
        lessonsWithTime: times.length,
        averageTimePerLesson:
          times.length > 0 ? Math.round(totalSeconds / times.length) : 0,
        longestSession,
        currentStreak: streakData.currentStreak || 0,
        longestStreak: streakData.longestStreak || 0,
        completedLessons: progressData.completedLessons?.length || 0,
      });
    } catch {
      // Ignore
    }
    setIsLoading(false);
  }, []);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins < 60) return `${mins}m ${secs}s`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}h ${remainingMins}m`;
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (stats.totalReadingSeconds === 0 && stats.completedLessons === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Thống kê học tập</h2>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Tổng thời gian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTime(stats.totalReadingSeconds)}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.lessonsWithTime} bài đã đọc
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              Trung bình/bài
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTime(stats.averageTimePerLesson)}
            </div>
            <p className="text-xs text-muted-foreground">thời gian đọc</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              Session dài nhất
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTime(stats.longestSession)}
            </div>
            <p className="text-xs text-muted-foreground">một bài học</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Streak dài nhất
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.longestStreak} ngày</div>
            <p className="text-xs text-muted-foreground">
              Hiện tại: {stats.currentStreak} ngày
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
