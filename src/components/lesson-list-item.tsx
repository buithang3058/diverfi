"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { isLessonComplete } from "@/lib/progress";
import type { LessonMeta } from "@/lib/lessons";

interface Props {
  lesson: LessonMeta;
  index: number;
}

export function LessonListItem({ lesson, index }: Props) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(isLessonComplete(`${lesson.track}/${lesson.slug}`));
  }, [lesson.track, lesson.slug]);

  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <Link href={`/learn/${lesson.track}/${lesson.slug}`}>
        <CardHeader className="flex flex-row items-start gap-4">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              isComplete
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isComplete ? "✓" : index}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg">{lesson.title}</CardTitle>
            <CardDescription className="mt-1">
              {lesson.description}
            </CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {lesson.estimatedTime}
              </Badge>
              {isComplete && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Đã hoàn thành
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
      </Link>
    </Card>
  );
}
