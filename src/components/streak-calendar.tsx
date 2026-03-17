"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Flame } from "lucide-react";

const ACTIVITY_KEY = "diverfi-activity";
const STREAK_KEY = "diverfi-streak";

interface ActivityData {
  [date: string]: number; // date -> lessons completed
}

export function StreakCalendar() {
  const [activityData, setActivityData] = useState<ActivityData>({});
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const activityStored = localStorage.getItem(ACTIVITY_KEY);
      if (activityStored) {
        setActivityData(JSON.parse(activityStored));
      }

      const streakStored = localStorage.getItem(STREAK_KEY);
      if (streakStored) {
        const streakData = JSON.parse(streakStored);
        setCurrentStreak(streakData.currentStreak || 0);
      }
    } catch {
      // Ignore
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="h-6 bg-muted rounded w-1/3 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  // Generate last 12 weeks of dates
  const today = new Date();
  const weeks: Date[][] = [];

  for (let w = 11; w >= 0; w--) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      week.push(date);
    }
    weeks.push(week);
  }

  const getActivityLevel = (date: Date): number => {
    const dateStr = date.toISOString().split("T")[0];
    const count = activityData[dateStr] || 0;
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    return 3;
  };

  const getLevelColor = (level: number): string => {
    switch (level) {
      case 0:
        return "bg-muted";
      case 1:
        return "bg-green-200 dark:bg-green-900";
      case 2:
        return "bg-green-400 dark:bg-green-700";
      case 3:
        return "bg-green-600 dark:bg-green-500";
      default:
        return "bg-muted";
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const totalActiveDays = Object.keys(activityData).length;
  const totalLessons = Object.values(activityData).reduce((sum, count) => sum + count, 0);

  const dayLabels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Lịch học tập
          </CardTitle>
          <div className="flex items-center gap-1 text-sm">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="font-medium">{currentStreak}</span>
            <span className="text-muted-foreground">ngày liên tiếp</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar grid */}
        <div className="overflow-x-auto">
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1 pr-2">
              {dayLabels.map((label, i) => (
                <div
                  key={i}
                  className="h-3 w-6 text-[10px] text-muted-foreground flex items-center"
                >
                  {i % 2 === 1 ? label : ""}
                </div>
              ))}
            </div>

            {/* Weeks */}
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((date, dayIndex) => {
                  const level = getActivityLevel(date);
                  const isToday = date.toDateString() === today.toDateString();
                  const isFuture = date > today;

                  return (
                    <div
                      key={dayIndex}
                      className={`w-3 h-3 rounded-sm transition-colors ${
                        isFuture
                          ? "bg-transparent"
                          : getLevelColor(level)
                      } ${isToday ? "ring-1 ring-primary" : ""}`}
                      title={
                        isFuture
                          ? ""
                          : `${formatDate(date)}: ${activityData[date.toISOString().split("T")[0]] || 0} bài học`
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Ít</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                />
              ))}
            </div>
            <span>Nhiều</span>
          </div>
          <div>
            {totalActiveDays} ngày • {totalLessons} bài học
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Function to record activity - call when completing a lesson
export function recordLearningActivity() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const activityStored = localStorage.getItem(ACTIVITY_KEY);
    const activityData: ActivityData = activityStored
      ? JSON.parse(activityStored)
      : {};

    activityData[today] = (activityData[today] || 0) + 1;
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activityData));

    // Also update streak
    updateStreak();
  } catch {
    // Ignore
  }
}

function updateStreak() {
  try {
    const streakStored = localStorage.getItem(STREAK_KEY);
    const streakData = streakStored
      ? JSON.parse(streakStored)
      : { currentStreak: 0, longestStreak: 0, lastStudyDate: null };

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    if (streakData.lastStudyDate === today) {
      // Already studied today, no change
      return;
    }

    if (streakData.lastStudyDate === yesterday) {
      // Continuing streak
      streakData.currentStreak += 1;
    } else if (streakData.lastStudyDate !== today) {
      // Streak broken or first day
      streakData.currentStreak = 1;
    }

    streakData.lastStudyDate = today;
    streakData.longestStreak = Math.max(
      streakData.longestStreak,
      streakData.currentStreak
    );

    localStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
  } catch {
    // Ignore
  }
}
