"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface Props {
  lessonId: string;
  title: string;
}

interface BookmarkedLesson {
  id: string;
  title: string;
  savedAt: string;
}

export function BookmarkButton({ lessonId, title }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("diverfi-bookmarks");
    if (stored) {
      try {
        const bookmarks: BookmarkedLesson[] = JSON.parse(stored);
        setIsBookmarked(bookmarks.some((b) => b.id === lessonId));
      } catch {
        setIsBookmarked(false);
      }
    }
  }, [lessonId]);

  const toggleBookmark = () => {
    const stored = localStorage.getItem("diverfi-bookmarks");
    let bookmarks: BookmarkedLesson[] = [];

    if (stored) {
      try {
        bookmarks = JSON.parse(stored);
      } catch {
        bookmarks = [];
      }
    }

    if (isBookmarked) {
      // Remove bookmark
      bookmarks = bookmarks.filter((b) => b.id !== lessonId);
    } else {
      // Add bookmark
      bookmarks.push({
        id: lessonId,
        title,
        savedAt: new Date().toISOString(),
      });
    }

    localStorage.setItem("diverfi-bookmarks", JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Bookmark className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleBookmark}
      className={isBookmarked ? "text-primary" : "text-muted-foreground"}
      title={isBookmarked ? "Bỏ lưu" : "Lưu bài học"}
    >
      {isBookmarked ? (
        <>
          <BookmarkCheck className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Đã lưu</span>
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Lưu</span>
        </>
      )}
    </Button>
  );
}
