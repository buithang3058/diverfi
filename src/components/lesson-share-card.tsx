"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Copy, Check, BookOpen, X } from "lucide-react";

interface Props {
  lessonTitle: string;
  trackTitle: string;
  completedCount: number;
  totalLessons: number;
}

export function LessonShareCard({
  lessonTitle,
  trackTitle,
  completedCount,
  totalLessons,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const shareText = `Vừa hoàn thành "${lessonTitle}" trên diverFi! ${progressPercent}% tiến độ học DeFi. Học cùng tôi tại diverfi.com`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Hoàn thành: ${lessonTitle}`,
      text: shareText,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or error
      }
    } else {
      handleCopy();
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Share2 className="h-4 w-4" />
        Chia sẻ
      </Button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4 animate-in zoom-in-95 duration-200">
        <Card>
          <CardContent className="pt-6">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <h3 className="text-lg font-semibold mb-4">Chia sẻ thành tích</h3>

            {/* Share Card Preview */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/90 to-primary p-6 text-primary-foreground mb-4">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 border-2 border-current rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-2 border-current rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              <div className="relative">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <span className="font-bold">diverFi</span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm opacity-80">Vừa hoàn thành</p>
                    <h3 className="text-xl font-bold">{lessonTitle}</h3>
                    <p className="text-sm opacity-80">{trackTitle}</p>
                  </div>

                  {/* Progress */}
                  <div className="pt-3 border-t border-white/20">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Tiến độ học tập</span>
                      <span className="font-bold">{progressPercent}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <p className="text-xs opacity-80 mt-1">
                      {completedCount} / {totalLessons} bài học
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-white/20 text-xs opacity-80">
                  Học DeFi miễn phí tại diverfi.com
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={handleShare} className="flex-1 gap-2">
                <Share2 className="h-4 w-4" />
                Chia sẻ
              </Button>
              <Button
                variant="outline"
                onClick={handleCopy}
                className="flex-1 gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Đã copy
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy text
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Chia sẻ thành tích của bạn với bạn bè!
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
