"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Clock, Trophy } from "lucide-react";

interface Props {
  totalLessons: number;
  totalTime: string;
}

export function LearningStats({ totalLessons, totalTime }: Props) {
  const [completedCount, setCompletedCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get completed lessons from localStorage
    const stored = localStorage.getItem("diverfi-completed");
    if (stored) {
      try {
        const completed = JSON.parse(stored);
        setCompletedCount(Object.keys(completed).length);
      } catch {
        setCompletedCount(0);
      }
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Don't show if no progress yet
  if (completedCount === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Tiến độ học tập của bạn</h3>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold">
              <CheckCircle className="h-5 w-5 text-green-500" />
              {completedCount}
            </div>
            <p className="text-xs text-muted-foreground">Đã hoàn thành</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold">
              <BookOpen className="h-5 w-5 text-primary" />
              {totalLessons}
            </div>
            <p className="text-xs text-muted-foreground">Tổng bài học</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold">
              <Clock className="h-5 w-5 text-muted-foreground" />
              {totalTime}
            </div>
            <p className="text-xs text-muted-foreground">Thời lượng</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tiến độ tổng thể</span>
            <span className="font-medium">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {progressPercent === 100 && (
          <p className="text-sm text-center text-primary mt-4 font-medium">
            Chúc mừng! Bạn đã hoàn thành tất cả bài học!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
