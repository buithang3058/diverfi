"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Check, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const GOALS_KEY = "diverfi-weekly-goals";

interface WeeklyGoal {
  lessonsTarget: number;
  weekStart: string;
  lessonsCompleted: number;
}

function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split("T")[0];
}

export function WeeklyGoals() {
  const [goal, setGoal] = useState<WeeklyGoal>({
    lessonsTarget: 3,
    weekStart: getWeekStart(),
    lessonsCompleted: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempTarget, setTempTarget] = useState(3);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(GOALS_KEY);
      const currentWeekStart = getWeekStart();

      if (stored) {
        const data = JSON.parse(stored);
        if (data.weekStart === currentWeekStart) {
          setGoal(data);
          setTempTarget(data.lessonsTarget);
        } else {
          const newGoal = {
            lessonsTarget: data.lessonsTarget || 3,
            weekStart: currentWeekStart,
            lessonsCompleted: 0,
          };
          setGoal(newGoal);
          setTempTarget(newGoal.lessonsTarget);
          localStorage.setItem(GOALS_KEY, JSON.stringify(newGoal));
        }
      }

      const progressStored = localStorage.getItem("diverfi_progress");
      if (progressStored) {
        const progress = JSON.parse(progressStored);
        const completedCount = progress.completedLessons?.length || 0;
        setGoal((prev) => ({
          ...prev,
          lessonsCompleted: Math.min(completedCount, prev.lessonsTarget),
        }));
      }
    } catch {
      // Ignore
    }
  }, []);

  const saveGoal = () => {
    const newGoal = {
      ...goal,
      lessonsTarget: tempTarget,
    };
    setGoal(newGoal);
    localStorage.setItem(GOALS_KEY, JSON.stringify(newGoal));
    setIsEditing(false);
  };

  const progress =
    goal.lessonsTarget > 0
      ? Math.min(
          100,
          Math.round((goal.lessonsCompleted / goal.lessonsTarget) * 100)
        )
      : 0;
  const isComplete = goal.lessonsCompleted >= goal.lessonsTarget;
  const remaining = goal.lessonsTarget - goal.lessonsCompleted;

  return (
    <Card
      className={cn(
        isComplete && "border-green-500/50 bg-green-50/50 dark:bg-green-950/20"
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Target
            className={cn(
              "h-4 w-4",
              isComplete ? "text-green-500" : "text-primary"
            )}
          />
          Mục tiêu tuần này
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTempTarget(Math.max(1, tempTarget - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-2xl font-bold w-12 text-center">
                {tempTarget}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTempTarget(Math.min(10, tempTarget + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              bài học/tuần
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Hủy
              </Button>
              <Button size="sm" onClick={saveGoal}>
                Lưu
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">
                {goal.lessonsCompleted}/{goal.lessonsTarget}
              </span>
              {isComplete ? (
                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <Check className="h-4 w-4" />
                  Hoàn thành!
                </span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Chỉnh sửa
                </Button>
              )}
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all",
                  isComplete ? "bg-green-500" : "bg-primary"
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {isComplete
                ? "Tuyệt vời! Bạn đã đạt mục tiêu tuần này"
                : `Còn ${remaining} bài nữa`}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
