import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

interface Lesson {
  slug: string;
  title: string;
  track: string;
  estimatedTime: string;
}

interface Props {
  prerequisites: string[]; // Array of "track/slug" strings
  allLessons: Lesson[];
}

export function LessonPrerequisites({ prerequisites, allLessons }: Props) {
  if (!prerequisites || prerequisites.length === 0) return null;

  const prereqLessons = prerequisites
    .map((prereq) => {
      const [track, slug] = prereq.split("/");
      return allLessons.find((l) => l.track === track && l.slug === slug);
    })
    .filter(Boolean) as Lesson[];

  if (prereqLessons.length === 0) return null;

  return (
    <Card className="mb-6 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm mb-2">Nên đọc trước:</p>
            <div className="flex flex-wrap gap-2">
              {prereqLessons.map((lesson) => (
                <Link
                  key={`${lesson.track}/${lesson.slug}`}
                  href={`/learn/${lesson.track}/${lesson.slug}`}
                >
                  <Badge
                    variant="outline"
                    className="hover:bg-background transition-colors cursor-pointer"
                  >
                    {lesson.title}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
