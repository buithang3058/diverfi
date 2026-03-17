"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Clock, X } from "lucide-react";

const REMINDER_KEY = "diverfi-study-reminder";
const LAST_STUDY_KEY = "diverfi-last-study";

interface ReminderSettings {
  enabled: boolean;
  time: string; // HH:MM format
  days: number[]; // 0-6, Sunday = 0
}

const DEFAULT_SETTINGS: ReminderSettings = {
  enabled: false,
  time: "19:00",
  days: [1, 2, 3, 4, 5], // Mon-Fri
};

const DAY_LABELS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export function StudyReminder() {
  const [settings, setSettings] = useState<ReminderSettings>(DEFAULT_SETTINGS);
  const [showReminder, setShowReminder] = useState(false);
  const [lastStudy, setLastStudy] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(REMINDER_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }

      const lastStudyStored = localStorage.getItem(LAST_STUDY_KEY);
      if (lastStudyStored) {
        setLastStudy(lastStudyStored);
      }

      // Check if should show reminder
      checkReminder();
    } catch {
      // Ignore
    }
    setIsLoading(false);
  }, []);

  const checkReminder = () => {
    try {
      const stored = localStorage.getItem(REMINDER_KEY);
      const reminderSettings: ReminderSettings = stored
        ? JSON.parse(stored)
        : DEFAULT_SETTINGS;

      if (!reminderSettings.enabled) return;

      const now = new Date();
      const today = now.getDay();
      const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

      // Check if today is a reminder day
      if (!reminderSettings.days.includes(today)) return;

      // Check if it's time for reminder (within 30 minutes of set time)
      const [setHour, setMin] = reminderSettings.time.split(":").map(Number);
      const setMinutes = setHour * 60 + setMin;
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      if (
        currentMinutes >= setMinutes &&
        currentMinutes <= setMinutes + 30
      ) {
        // Check if already studied today
        const lastStudyStored = localStorage.getItem(LAST_STUDY_KEY);
        if (lastStudyStored) {
          const lastStudyDate = new Date(lastStudyStored).toDateString();
          const todayDate = now.toDateString();
          if (lastStudyDate === todayDate) return; // Already studied today
        }

        setShowReminder(true);
      }
    } catch {
      // Ignore
    }
  };

  const saveSettings = (newSettings: ReminderSettings) => {
    setSettings(newSettings);
    localStorage.setItem(REMINDER_KEY, JSON.stringify(newSettings));
  };

  const toggleEnabled = () => {
    saveSettings({ ...settings, enabled: !settings.enabled });
  };

  const toggleDay = (day: number) => {
    const newDays = settings.days.includes(day)
      ? settings.days.filter((d) => d !== day)
      : [...settings.days, day].sort();
    saveSettings({ ...settings, days: newDays });
  };

  const setTime = (time: string) => {
    saveSettings({ ...settings, time });
  };

  const dismissReminder = () => {
    setShowReminder(false);
  };

  const markStudied = () => {
    const now = new Date().toISOString();
    localStorage.setItem(LAST_STUDY_KEY, now);
    setLastStudy(now);
    setShowReminder(false);
  };

  const getLastStudyText = () => {
    if (!lastStudy) return "Chưa có";

    const lastDate = new Date(lastStudy);
    const now = new Date();
    const diffMs = now.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hôm nay";
    if (diffDays === 1) return "Hôm qua";
    return `${diffDays} ngày trước`;
  };

  if (isLoading) {
    return null;
  }

  // Show reminder popup
  if (showReminder) {
    return (
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Đến giờ học rồi!</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Dành 10-15 phút để học một bài mới nhé.
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={markStudied}>
                  Bắt đầu học
                </Button>
                <Button variant="ghost" size="sm" onClick={dismissReminder}>
                  Để sau
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
              onClick={dismissReminder}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Nhắc nhở học tập
          </CardTitle>
          <Button
            variant={settings.enabled ? "default" : "outline"}
            size="sm"
            onClick={toggleEnabled}
            className="gap-2"
          >
            {settings.enabled ? (
              <>
                <Bell className="h-4 w-4" />
                Đang bật
              </>
            ) : (
              <>
                <BellOff className="h-4 w-4" />
                Đang tắt
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-3">
          Lần học gần nhất: <span className="font-medium">{getLastStudyText()}</span>
        </div>

        {settings.enabled && (
          <div className="space-y-4">
            {/* Time picker */}
            <div className="flex items-center gap-3">
              <span className="text-sm">Giờ nhắc:</span>
              <input
                type="time"
                value={settings.time}
                onChange={(e) => setTime(e.target.value)}
                className="px-3 py-1.5 text-sm border rounded-md bg-background"
              />
            </div>

            {/* Day selector */}
            <div>
              <span className="text-sm block mb-2">Ngày trong tuần:</span>
              <div className="flex gap-1">
                {DAY_LABELS.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => toggleDay(index)}
                    className={`w-9 h-9 text-xs rounded-md transition-colors ${
                      settings.days.includes(index)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Bạn sẽ nhận được nhắc nhở khi mở trang vào giờ đã chọn.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
