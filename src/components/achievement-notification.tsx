"use client";

import { useEffect, useState } from "react";
import { Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { achievements, rarityColors } from "@/data/achievements";
import { checkAchievements } from "./achievements";

interface Notification {
  id: string;
  achievement: (typeof achievements)[0];
}

export function AchievementNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Check achievements on mount and periodically
    const check = () => {
      const newlyUnlocked = checkAchievements();
      if (newlyUnlocked.length > 0) {
        const newNotifications = newlyUnlocked
          .map((id) => {
            const achievement = achievements.find((a) => a.id === id);
            if (achievement) {
              return { id, achievement };
            }
            return null;
          })
          .filter(Boolean) as Notification[];

        setNotifications((prev) => [...prev, ...newNotifications]);
      }
    };

    check();
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map(({ id, achievement }) => (
        <div
          key={id}
          className={cn(
            "animate-in slide-in-from-right-8 fade-in duration-300",
            "bg-card border rounded-lg shadow-lg p-4 max-w-sm",
            "flex items-center gap-3"
          )}
        >
          <div
            className={cn(
              "h-12 w-12 rounded-full flex items-center justify-center text-2xl",
              "bg-gradient-to-br",
              rarityColors[achievement.rarity]
            )}
          >
            {achievement.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="h-3 w-3 text-yellow-500" />
              Thành tựu mới!
            </div>
            <p className="font-semibold truncate">{achievement.title}</p>
            <p className="text-sm text-primary">+{achievement.xp} XP</p>
          </div>
          <button
            onClick={() => dismissNotification(id)}
            className="p-1 hover:bg-muted rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
