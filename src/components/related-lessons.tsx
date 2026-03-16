import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

interface Lesson {
  slug: string;
  title: string;
  description: string;
  estimatedTime: string;
  track: string;
}

interface Props {
  currentSlug: string;
  lessons: Lesson[];
  track: string;
}

export function RelatedLessons({ currentSlug, lessons, track }: Props) {
  // Filter out current lesson and get up to 2 related lessons
  const relatedLessons = lessons
    .filter((lesson) => lesson.slug !== currentSlug)
    .slice(0, 2);

  if (relatedLessons.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5" />
        Bài học liên quan
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {relatedLessons.map((lesson) => (
          <Link key={lesson.slug} href={`/learn/${track}/${lesson.slug}`}>
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <h4 className="font-medium mb-1">{lesson.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {lesson.description}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {lesson.estimatedTime}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
