"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Settings, Type, AlignLeft, Minus, Plus, RotateCcw } from "lucide-react";

const PREFERENCES_KEY = "diverfi-reading-preferences";

interface ReadingPreferences {
  fontSize: number;
  lineHeight: number;
  contentWidth: "narrow" | "medium" | "wide";
}

const defaultPreferences: ReadingPreferences = {
  fontSize: 100,
  lineHeight: 1.75,
  contentWidth: "medium",
};

export function getReadingPreferences(): ReadingPreferences {
  if (typeof window === "undefined") return defaultPreferences;

  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
  } catch {
    return defaultPreferences;
  }
}

export function applyReadingPreferences(prefs: ReadingPreferences) {
  if (typeof window === "undefined") return;

  document.documentElement.style.setProperty(
    "--prose-font-size",
    `${prefs.fontSize}%`
  );
  document.documentElement.style.setProperty(
    "--prose-line-height",
    `${prefs.lineHeight}`
  );

  const widthValues = {
    narrow: "600px",
    medium: "750px",
    wide: "900px",
  };
  document.documentElement.style.setProperty(
    "--prose-max-width",
    widthValues[prefs.contentWidth]
  );
}

export function ReadingPreferencesLoader() {
  useEffect(() => {
    const prefs = getReadingPreferences();
    applyReadingPreferences(prefs);
  }, []);

  return null;
}

export function ReadingPreferences() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<ReadingPreferences>(defaultPreferences);

  useEffect(() => {
    setPreferences(getReadingPreferences());
  }, []);

  const savePreferences = (newPrefs: ReadingPreferences) => {
    setPreferences(newPrefs);
    applyReadingPreferences(newPrefs);

    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(newPrefs));
    } catch {
      // Ignore
    }
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.max(80, Math.min(140, preferences.fontSize + delta));
    savePreferences({ ...preferences, fontSize: newSize });
  };

  const adjustLineHeight = (delta: number) => {
    const newHeight = Math.max(1.4, Math.min(2.2, preferences.lineHeight + delta));
    savePreferences({
      ...preferences,
      lineHeight: parseFloat(newHeight.toFixed(2)),
    });
  };

  const setContentWidth = (width: "narrow" | "medium" | "wide") => {
    savePreferences({ ...preferences, contentWidth: width });
  };

  const resetToDefaults = () => {
    savePreferences(defaultPreferences);
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
        title="Tùy chỉnh đọc"
      >
        <Settings className="h-4 w-4" />
        <span className="hidden sm:inline">Tùy chỉnh</span>
      </Button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div className="absolute right-0 top-full mt-2 z-50">
        <Card className="w-72 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Tùy chỉnh đọc
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetToDefaults}
                className="h-8 px-2 text-xs"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Font Size */}
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2">
                <Type className="h-4 w-4" />
                Cỡ chữ
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => adjustFontSize(-5)}
                  disabled={preferences.fontSize <= 80}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="flex-1 text-center text-sm font-medium">
                  {preferences.fontSize}%
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => adjustFontSize(5)}
                  disabled={preferences.fontSize >= 140}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Line Height */}
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2">
                <AlignLeft className="h-4 w-4" />
                Khoảng cách dòng
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => adjustLineHeight(-0.1)}
                  disabled={preferences.lineHeight <= 1.4}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="flex-1 text-center text-sm font-medium">
                  {preferences.lineHeight.toFixed(1)}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => adjustLineHeight(0.1)}
                  disabled={preferences.lineHeight >= 2.2}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Content Width */}
            <div className="space-y-2">
              <Label className="text-sm">Độ rộng nội dung</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["narrow", "medium", "wide"] as const).map((width) => (
                  <Button
                    key={width}
                    variant={preferences.contentWidth === width ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContentWidth(width)}
                    className="text-xs"
                  >
                    {width === "narrow" && "Hẹp"}
                    {width === "medium" && "Vừa"}
                    {width === "wide" && "Rộng"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Preview text */}
            <div className="pt-2 border-t">
              <p
                className="text-sm text-muted-foreground"
                style={{
                  fontSize: `${preferences.fontSize * 0.85}%`,
                  lineHeight: preferences.lineHeight,
                }}
              >
                Xem trước: Đây là văn bản mẫu để bạn xem hiệu ứng của các tùy chỉnh.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
