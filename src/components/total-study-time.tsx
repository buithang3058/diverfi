"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TrendingUp, Target, Award } from "lucide-react";

const READING_TIME_KEY = "diverfi-reading-time";

interface StudyStats {
  totalSeconds: number;
  lessonsWithTime: number;
  averagePerLesson: number;
  longestSession: { lessonId: string; seconds: number } | null;
}

function getStudyStats(): StudyStats {
  if (typeof window === "undefined") {
    return {
      totalSeconds: 0,
      lessonsWithTime: 0,
      averagePerLesson: 0,
      longestSession: null,
    };
  }

  try {
    const stored = localStorage.getItem(READING_TIME_KEY);
    if (!stored) {
      return {
        totalSeconds: 0,
        lessonsWithTime: 0,
        averagePerLesson: 0,
        longestSession: null,
      };
    }

    const data = JSON.parse(stored) as Record<string, number>;
    const entries = Object.entries(data);

    if (entries.length === 0) {
      return {
        totalSeconds: 0,
        lessonsWithTime: 0,
        averagePerLesson: 0,
        longestSession: null,
      };
    }

    const totalSeconds = entries.reduce((sum, [, time]) => sum + time, 0);
    const lessonsWithTime = entries.length;
    const averagePerLesson = Math.round(totalSeconds / lessonsWithTime);

    // Find longest session
    let longestSession: { lessonId: string; seconds: number } | null = null;
    for (const [lessonId, seconds] of entries) {
      if (!longestSession || seconds > longestSession.seconds) {
        longestSession = { lessonId, seconds };
      }
    }

    return {
      totalSeconds,
      lessonsWithTime,
      averagePerLesson,
      longestSession,
    };
  } catch {
    return {
      totalSeconds: 0,
      lessonsWithTime: 0,
      averagePerLesson: 0,
      longestSession: null,
    };
  }
}

function formatTime(totalSeconds: number): string {
  if (totalSeconds < 60) {
    return `${totalSeconds} giây`;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);

  if (hours === 0) {
    return `${mins} phút`;
  }

  if (mins === 0) {
    return `${hours} giờ`;
  }

  return `${hours} giờ ${mins} phút`;
}

function formatLessonName(lessonId: string): string {
  // lessonId format: "track/slug"
  const slug = lessonId.split("/").pop() || lessonId;
  // Convert kebab-case to title case
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function TotalStudyTime() {
  const [stats, setStats] = useState<StudyStats>({
    totalSeconds: 0,
    lessonsWithTime: 0,
    averagePerLesson: 0,
    longestSession: null,
  });

  useEffect(() => {
    setStats(getStudyStats());

    // Update every minute
    const interval = setInterval(() => {
      setStats(getStudyStats());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Milestones for gamification
  const milestones = [
    { minutes: 30, label: "30 phút", icon: "🌱" },
    { minutes: 60, label: "1 giờ", icon: "🌿" },
    { minutes: 180, label: "3 giờ", icon: "🌳" },
    { minutes: 300, label: "5 giờ", icon: "🏆" },
    { minutes: 600, label: "10 giờ", icon: "⭐" },
  ];

  const totalMinutes = Math.floor(stats.totalSeconds / 60);
  const currentMilestone = milestones
    .filter((m) => totalMinutes >= m.minutes)
    .pop();
  const nextMilestone = milestones.find((m) => totalMinutes < m.minutes);
  const progressToNext = nextMilestone
    ? Math.min(100, (totalMinutes / nextMilestone.minutes) * 100)
    : 100;

  if (stats.totalSeconds === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Thời Gian Học
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total time */}
        <div className="text-center">
          <div className="text-3xl font-bold">
            {formatTime(stats.totalSeconds)}
          </div>
          <p className="text-sm text-muted-foreground">Tổng thời gian học</p>
        </div>

        {/* Milestone progress */}
        {nextMilestone && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                {currentMilestone && (
                  <span className="text-lg">{currentMilestone.icon}</span>
                )}
                <span className="text-muted-foreground">
                  {currentMilestone?.label || "Bắt đầu"}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <span className="text-lg">{nextMilestone.icon}</span>
                <span className="font-medium">{nextMilestone.label}</span>
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Còn {nextMilestone.minutes - totalMinutes} phút nữa!
            </p>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{stats.lessonsWithTime}</p>
              <p className="text-xs text-muted-foreground">Bài đã học</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <Target className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {formatTime(stats.averagePerLesson)}
              </p>
              <p className="text-xs text-muted-foreground">TB/bài</p>
            </div>
          </div>
        </div>

        {/* Longest session */}
        {stats.longestSession && stats.longestSession.seconds >= 60 && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <Award className="h-5 w-5 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {formatLessonName(stats.longestSession.lessonId)}
              </p>
              <p className="text-xs text-muted-foreground">
                Phiên học dài nhất: {formatTime(stats.longestSession.seconds)}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
