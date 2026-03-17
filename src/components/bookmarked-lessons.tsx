"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookmarkedLesson {
  id: string;
  title: string;
  savedAt: string;
}

export function BookmarkedLessons() {
  const [bookmarks, setBookmarks] = useState<BookmarkedLesson[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    const stored = localStorage.getItem("diverfi-bookmarks");
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch {
        setBookmarks([]);
      }
    }
  };

  const removeBookmark = (id: string) => {
    const newBookmarks = bookmarks.filter((b) => b.id !== id);
    localStorage.setItem("diverfi-bookmarks", JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  };

  if (!mounted || bookmarks.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-primary" />
          Bài học đã lưu
          <Badge variant="secondary" className="ml-auto">
            {bookmarks.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {bookmarks.map((bookmark) => {
            const [track, slug] = bookmark.id.split("/");
            return (
              <div
                key={bookmark.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Link
                  href={`/learn/${track}/${slug}`}
                  className="flex-1 hover:text-primary transition-colors"
                >
                  {bookmark.title}
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBookmark(bookmark.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                  title="Bỏ lưu"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
