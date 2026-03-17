"use client";

import { useState, useEffect } from "react";
import { Keyboard, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Shortcut {
  keys: string[];
  description: string;
}

interface ShortcutGroup {
  title: string;
  shortcuts: Shortcut[];
}

const shortcutGroups: ShortcutGroup[] = [
  {
    title: "Điều hướng",
    shortcuts: [
      { keys: ["←"], description: "Bài học trước" },
      { keys: ["→"], description: "Bài học tiếp theo" },
      { keys: ["↑"], description: "Cuộn lên" },
      { keys: ["↓"], description: "Cuộn xuống" },
      { keys: ["Home"], description: "Về đầu trang" },
      { keys: ["End"], description: "Về cuối trang" },
    ],
  },
  {
    title: "Trang bài học",
    shortcuts: [
      { keys: ["b"], description: "Bookmark bài học" },
      { keys: ["p"], description: "In bài học" },
      { keys: ["m"], description: "Đánh dấu hoàn thành" },
      { keys: ["n"], description: "Mở ghi chú" },
    ],
  },
  {
    title: "Chung",
    shortcuts: [
      { keys: ["/"], description: "Focus tìm kiếm" },
      { keys: ["?"], description: "Hiển thị phím tắt" },
      { keys: ["Esc"], description: "Đóng modal" },
    ],
  },
];

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsOpen(true);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
      }

      // Focus search with /
      if (e.key === "/" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[type="search"], input[placeholder*="Tìm"], input[placeholder*="tìm"]'
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 left-4 z-40 rounded-full opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => setIsOpen(true)}
        title="Phím tắt (?)"
      >
        <Keyboard className="h-5 w-5" />
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
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md animate-in zoom-in-95 duration-200">
        <div className="bg-background rounded-lg shadow-lg border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              Phím tắt
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {shortcutGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  {group.title}
                </h3>
                <div className="space-y-2">
                  {group.shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <kbd
                            key={keyIndex}
                            className="px-2 py-1 bg-muted rounded text-xs font-mono border min-w-[28px] text-center"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Nhấn{" "}
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono border">
                ?
              </kbd>{" "}
              để mở/đóng
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
