"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import type { LessonMeta } from "@/lib/lessons";

interface Props {
  lessons: LessonMeta[];
}

const difficultyLabels: Record<string, string> = {
  beginner: "Cơ bản",
  intermediate: "Trung bình",
  advanced: "Nâng cao",
};

const trackLabels: Record<string, string> = {
  "defi-basics": "DeFi Cơ bản",
  "crypto-security": "Bảo mật",
  "yield-farming": "Yield Farming",
  trading: "Trading",
};

export function LessonSearch({ lessons }: Props) {
  const [query, setQuery] = useState("");

  const filteredLessons = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return lessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(lowerQuery) ||
        lesson.description.toLowerCase().includes(lowerQuery)
    );
  }, [lessons, query]);

  return (
    <div className="mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Tìm bài học... (ví dụ: wallet, staking, phishing)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {query.trim() && (
        <div className="mt-4">
          {filteredLessons.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Không tìm thấy bài học nào cho &quot;{query}&quot;
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Tìm thấy {filteredLessons.length} bài học
              </p>
              <div className="grid gap-2">
                {filteredLessons.map((lesson) => (
                  <Link
                    key={`${lesson.track}/${lesson.slug}`}
                    href={`/learn/${lesson.track}/${lesson.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {lesson.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant="outline" className="whitespace-nowrap">
                        {trackLabels[lesson.track] || lesson.track}
                      </Badge>
                      <Badge variant="secondary" className="whitespace-nowrap">
                        {difficultyLabels[lesson.difficulty]}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
