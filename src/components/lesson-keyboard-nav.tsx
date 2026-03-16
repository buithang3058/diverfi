"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  prevUrl: string | null;
  nextUrl: string | null;
}

export function LessonKeyboardNav({ prevUrl, nextUrl }: Props) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowLeft" && prevUrl) {
        router.push(prevUrl);
      } else if (e.key === "ArrowRight" && nextUrl) {
        router.push(nextUrl);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevUrl, nextUrl, router]);

  // Show hint at bottom of page
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-4 text-xs text-muted-foreground bg-background/80 backdrop-blur px-4 py-2 rounded-full border shadow-sm">
      {prevUrl && (
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono">←</kbd>
          Bài trước
        </span>
      )}
      {nextUrl && (
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono">→</kbd>
          Bài sau
        </span>
      )}
    </div>
  );
}
