"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, BookOpen, FileText, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface SearchItem {
  type: "lesson" | "term";
  title: string;
  description: string;
  href: string;
}

interface Props {
  lessons: { slug: string; title: string; description: string; track: string }[];
  terms: { term: string; fullName: string; definition: string }[];
}

export function SearchDialog({ lessons, terms }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Convert to searchable items
  const searchItems: SearchItem[] = useMemo(() => {
    const lessonItems: SearchItem[] = lessons.map((l) => ({
      type: "lesson",
      title: l.title,
      description: l.description,
      href: `/learn/${l.track}/${l.slug}`,
    }));

    const termItems: SearchItem[] = terms.map((t) => ({
      type: "term",
      title: `${t.term} (${t.fullName})`,
      description: t.definition,
      href: `/glossary?q=${encodeURIComponent(t.term)}`,
    }));

    return [...lessonItems, ...termItems];
  }, [lessons, terms]);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    return searchItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, searchItems]);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground border rounded-md hover:bg-muted transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Tìm kiếm...</span>
        <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search modal */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <div className="relative mx-auto max-w-lg mt-[20vh] px-4">
            <Card className="overflow-hidden shadow-lg">
              {/* Search input */}
              <div className="flex items-center border-b px-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm bài học, thuật ngữ..."
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[300px] overflow-y-auto">
                {query.trim() === "" ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Nhập từ khóa để tìm kiếm
                  </div>
                ) : results.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Không tìm thấy kết quả cho &quot;{query}&quot;
                  </div>
                ) : (
                  <div className="p-2">
                    {results.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-start gap-3 p-2 rounded-md hover:bg-muted transition-colors text-left"
                      >
                        <div className="mt-0.5">
                          {item.type === "lesson" ? (
                            <BookOpen className="h-4 w-4 text-primary" />
                          ) : (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t p-2 text-xs text-muted-foreground flex justify-between">
                <span>{lessons.length} bài học • {terms.length} thuật ngữ</span>
                <span>ESC để đóng</span>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
