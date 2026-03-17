"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapStep {
  id: string;
  title: string;
  track: string;
  slug: string;
  description: string;
}

const roadmap: RoadmapStep[] = [
  {
    id: "1",
    title: "DeFi là gì?",
    track: "defi-basics",
    slug: "01-what-is-defi",
    description: "Hiểu cơ bản về tài chính phi tập trung",
  },
  {
    id: "2",
    title: "Ví Crypto",
    track: "defi-basics",
    slug: "02-crypto-wallet",
    description: "Tạo và bảo mật ví crypto đầu tiên",
  },
  {
    id: "3",
    title: "Bảo mật Ví",
    track: "crypto-security",
    slug: "01-wallet-security",
    description: "Bảo vệ tài sản khỏi mất mát",
  },
  {
    id: "4",
    title: "Smart Contracts",
    track: "defi-basics",
    slug: "03-smart-contracts",
    description: "Hiểu code điều khiển DeFi",
  },
  {
    id: "5",
    title: "DEX & AMM",
    track: "defi-basics",
    slug: "04-dex-amm",
    description: "Giao dịch phi tập trung",
  },
  {
    id: "6",
    title: "Tránh Scam",
    track: "crypto-security",
    slug: "02-avoiding-scams",
    description: "Nhận biết và phòng tránh lừa đảo",
  },
  {
    id: "7",
    title: "Liquidity Pool",
    track: "defi-basics",
    slug: "05-liquidity-pool",
    description: "Cung cấp thanh khoản",
  },
  {
    id: "8",
    title: "Yield Farming",
    track: "yield-farming",
    slug: "01-yield-farming-basics",
    description: "Bắt đầu farming",
  },
];

const STORAGE_KEY = "diverfi_progress";

export function LearningRoadmap() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setCompletedLessons(data.completedLessons || []);
      }
    } catch {
      // Ignore
    }
  }, []);

  const isCompleted = (step: RoadmapStep) =>
    completedLessons.includes(`${step.track}/${step.slug}`);

  const isUnlocked = (index: number) => {
    if (index === 0) return true;
    // Unlock if previous step is completed
    return isCompleted(roadmap[index - 1]);
  };

  const completedCount = roadmap.filter(isCompleted).length;
  const progress = Math.round((completedCount / roadmap.length) * 100);

  if (!isClient) {
    return (
      <div className="rounded-lg border p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Lộ trình học</h2>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{roadmap.length} bước
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Roadmap steps */}
      <div className="space-y-1">
        {roadmap.map((step, index) => {
          const completed = isCompleted(step);
          const unlocked = isUnlocked(index);

          return (
            <div key={step.id} className="flex items-start gap-3">
              {/* Connector line */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                    completed
                      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                      : unlocked
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {completed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : unlocked ? (
                    <Circle className="w-4 h-4" />
                  ) : (
                    <Lock className="w-3 h-3" />
                  )}
                </div>
                {index < roadmap.length - 1 && (
                  <div
                    className={cn(
                      "w-0.5 h-8 mt-1",
                      completed ? "bg-green-300 dark:bg-green-700" : "bg-muted"
                    )}
                  />
                )}
              </div>

              {/* Step content */}
              {unlocked ? (
                <Link
                  href={`/learn/${step.track}/${step.slug}`}
                  className={cn(
                    "flex-1 p-2 -ml-1 rounded-lg hover:bg-accent transition-colors group",
                    completed && "opacity-75"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "font-medium text-sm",
                        completed && "line-through"
                      )}
                    >
                      {step.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.description}
                  </p>
                </Link>
              ) : (
                <div className="flex-1 p-2 -ml-1 opacity-50">
                  <span className="font-medium text-sm">{step.title}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Hoàn thành bước trước để mở khóa
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {completedCount === roadmap.length && (
        <div className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-center">
          <p className="text-green-700 dark:text-green-300 font-medium">
            Chúc mừng! Bạn đã hoàn thành lộ trình cơ bản!
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            Tiếp tục khám phá các bài học nâng cao
          </p>
        </div>
      )}
    </div>
  );
}
