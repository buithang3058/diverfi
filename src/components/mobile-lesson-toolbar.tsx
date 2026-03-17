"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Share2,
  Twitter,
  Facebook,
  Link2,
  Check,
  Bookmark,
  Printer,
  Focus,
  Settings,
  X,
} from "lucide-react";

interface Props {
  lessonId: string;
  lessonTitle: string;
  shareUrl: string;
}

export function MobileLessonToolbar({ lessonId, lessonTitle, shareUrl }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check bookmark status on mount
  useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("diverfi-bookmarks");
        if (stored) {
          const bookmarks = JSON.parse(stored);
          setIsBookmarked(bookmarks.some((b: { id: string }) => b.id === lessonId));
        }
      } catch {
        // Ignore
      }
    }
  });

  const toggleBookmark = () => {
    try {
      const stored = localStorage.getItem("diverfi-bookmarks");
      let bookmarks = stored ? JSON.parse(stored) : [];

      if (isBookmarked) {
        bookmarks = bookmarks.filter((b: { id: string }) => b.id !== lessonId);
      } else {
        bookmarks.push({
          id: lessonId,
          title: lessonTitle,
          savedAt: new Date().toISOString(),
        });
      }

      localStorage.setItem("diverfi-bookmarks", JSON.stringify(bookmarks));
      setIsBookmarked(!isBookmarked);
    } catch {
      // Ignore
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  const shareTwitter = () => {
    const text = `${lessonTitle} - Học DeFi miễn phí tại diverFi`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const handlePrint = () => {
    window.print();
    setIsOpen(false);
  };

  const toggleFocusMode = () => {
    document.body.classList.toggle("focus-mode");
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <MoreHorizontal className="h-4 w-4" />
        Thêm
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl border-t shadow-lg animate-in slide-in-from-bottom duration-200">
            <div className="p-4">
              {/* Handle */}
              <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Tùy chọn</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Actions Grid */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <button
                  onClick={toggleBookmark}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isBookmarked ? "bg-yellow-100 dark:bg-yellow-900" : "bg-muted"}`}>
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? "text-yellow-600 fill-yellow-600" : ""}`} />
                  </div>
                  <span className="text-xs">{isBookmarked ? "Đã lưu" : "Lưu"}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Printer className="h-5 w-5" />
                  </div>
                  <span className="text-xs">In</span>
                </button>

                <button
                  onClick={toggleFocusMode}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Focus className="h-5 w-5" />
                  </div>
                  <span className="text-xs">Tập trung</span>
                </button>

                <button
                  onClick={copyLink}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {copied ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Link2 className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs">{copied ? "Đã copy" : "Copy link"}</span>
                </button>
              </div>

              {/* Share Section */}
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-3">Chia sẻ lên</p>
                <div className="flex gap-3">
                  <button
                    onClick={shareTwitter}
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="text-sm font-medium">Twitter</span>
                  </button>
                  <button
                    onClick={shareFacebook}
                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                </div>
              </div>

              {/* Safe area for iPhone */}
              <div className="h-6" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
