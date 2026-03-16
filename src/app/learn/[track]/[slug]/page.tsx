import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getLesson, getAllLessons } from "@/lib/lessons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LessonProgress } from "@/components/lesson-progress";

interface Props {
  params: Promise<{
    track: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const lessons = getAllLessons();
  return lessons.map((lesson) => ({
    track: lesson.track,
    slug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { track, slug } = await params;
  const lesson = getLesson(track, slug);

  if (!lesson) {
    return { title: "Bài học không tìm thấy" };
  }

  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: Props) {
  const { track, slug } = await params;
  const lesson = getLesson(track, slug);

  if (!lesson) {
    notFound();
  }

  const allLessons = getAllLessons(track);
  const currentIndex = allLessons.findIndex((l) => l.slug === slug);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <article className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/learn`}
          className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
        >
          ← Quay lại danh sách
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{lesson.title}</h1>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Badge variant="secondary">{lesson.estimatedTime}</Badge>
          <span>•</span>
          <span>Bài {lesson.order}</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={lesson.content} />
      </div>

      {/* Progress & Navigation */}
      <div className="mt-12 pt-8 border-t">
        <LessonProgress lessonId={`${track}/${slug}`} />

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
          {prevLesson ? (
            <Button variant="outline" className="w-full sm:w-auto" nativeButton={false} render={<Link href={`/learn/${track}/${prevLesson.slug}`} />}>
              ← {prevLesson.title}
            </Button>
          ) : (
            <div className="hidden sm:block" />
          )}
          {nextLesson ? (
            <Button className="w-full sm:w-auto" nativeButton={false} render={<Link href={`/learn/${track}/${nextLesson.slug}`} />}>
              {nextLesson.title} →
            </Button>
          ) : (
            <Button className="w-full sm:w-auto" nativeButton={false} render={<Link href="/learn" />}>
              Hoàn thành khóa học
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
