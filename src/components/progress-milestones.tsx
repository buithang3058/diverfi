"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Zap, Target, Award, X } from "lucide-react";

const MILESTONES_KEY = "diverfi-milestones";
const STORAGE_KEY = "diverfi_progress";

interface Milestone {
  id: string;
  title: string;
  description: string;
  threshold: number;
  icon: "trophy" | "star" | "zap" | "target" | "award";
  color: string;
}

const MILESTONES: Milestone[] = [
  {
    id: "first_lesson",
    title: "Khởi đầu!",
    description: "Hoàn thành bài học đầu tiên",
    threshold: 1,
    icon: "star",
    color: "text-yellow-500",
  },
  {
    id: "five_lessons",
    title: "Đang tiến bộ!",
    description: "Hoàn thành 5 bài học",
    threshold: 5,
    icon: "zap",
    color: "text-blue-500",
  },
  {
    id: "ten_lessons",
    title: "Học viên chăm chỉ!",
    description: "Hoàn thành 10 bài học",
    threshold: 10,
    icon: "target",
    color: "text-green-500",
  },
  {
    id: "fifteen_lessons",
    title: "Trung cấp!",
    description: "Hoàn thành 15 bài học",
    threshold: 15,
    icon: "award",
    color: "text-purple-500",
  },
  {
    id: "twenty_lessons",
    title: "Nâng cao!",
    description: "Hoàn thành 20 bài học",
    threshold: 20,
    icon: "trophy",
    color: "text-orange-500",
  },
  {
    id: "twenty_five_lessons",
    title: "Chuyên gia!",
    description: "Hoàn thành 25 bài học",
    threshold: 25,
    icon: "trophy",
    color: "text-red-500",
  },
  {
    id: "thirty_lessons",
    title: "Master!",
    description: "Hoàn thành 30 bài học",
    threshold: 30,
    icon: "trophy",
    color: "text-amber-500",
  },
];

const IconMap = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  target: Target,
  award: Award,
};

export function ProgressMilestones() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    checkMilestones();
  }, []);

  const checkMilestones = () => {
    try {
      // Get completed lessons count
      const progressStored = localStorage.getItem(STORAGE_KEY);
      const progressData = progressStored ? JSON.parse(progressStored) : {};
      const completedCount = progressData.completedLessons?.length || 0;

      // Get already celebrated milestones
      const milestonesStored = localStorage.getItem(MILESTONES_KEY);
      const celebratedMilestones: string[] = milestonesStored
        ? JSON.parse(milestonesStored)
        : [];

      // Find new milestone to celebrate
      const newMilestone = MILESTONES.find(
        (m) =>
          completedCount >= m.threshold &&
          !celebratedMilestones.includes(m.id)
      );

      if (newMilestone) {
        setCurrentMilestone(newMilestone);
        setShowCelebration(true);
      }
    } catch {
      // Ignore
    }
  };

  const handleDismiss = () => {
    if (currentMilestone) {
      try {
        const milestonesStored = localStorage.getItem(MILESTONES_KEY);
        const celebratedMilestones: string[] = milestonesStored
          ? JSON.parse(milestonesStored)
          : [];

        celebratedMilestones.push(currentMilestone.id);
        localStorage.setItem(
          MILESTONES_KEY,
          JSON.stringify(celebratedMilestones)
        );
      } catch {
        // Ignore
      }
    }
    setShowCelebration(false);
    setCurrentMilestone(null);
  };

  if (!showCelebration || !currentMilestone) {
    return null;
  }

  const Icon = IconMap[currentMilestone.icon];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-300"
        onClick={handleDismiss}
      />

      {/* Celebration Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm animate-in zoom-in-95 duration-300">
        <Card className="border-2 border-primary/50 shadow-2xl overflow-hidden">
          {/* Confetti-like background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
            <div className="absolute top-4 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <div className="absolute top-2 left-1/2 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            <div className="absolute top-6 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="absolute top-1 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
          </div>

          <CardContent className="pt-8 pb-6 text-center relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <Icon className={`h-10 w-10 ${currentMilestone.color}`} />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">
              {currentMilestone.title}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground mb-6">
              {currentMilestone.description}
            </p>

            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Trophy className="h-4 w-4" />
              <span>Mốc {currentMilestone.threshold} bài học</span>
            </div>

            {/* Action */}
            <Button onClick={handleDismiss} className="w-full">
              Tuyệt vời! Tiếp tục học
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Component to show milestone progress on dashboard
export function MilestoneProgress({ completedCount }: { completedCount: number }) {
  const nextMilestone = MILESTONES.find((m) => m.threshold > completedCount);
  const prevMilestone = [...MILESTONES]
    .reverse()
    .find((m) => m.threshold <= completedCount);

  if (!nextMilestone) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
        <Trophy className="h-4 w-4" />
        <span>Đã đạt tất cả mốc!</span>
      </div>
    );
  }

  const progress = prevMilestone
    ? ((completedCount - prevMilestone.threshold) /
        (nextMilestone.threshold - prevMilestone.threshold)) *
      100
    : (completedCount / nextMilestone.threshold) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Mốc tiếp theo</span>
        <span className="font-medium">{nextMilestone.title}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Còn {nextMilestone.threshold - completedCount} bài để đạt mốc
      </p>
    </div>
  );
}
