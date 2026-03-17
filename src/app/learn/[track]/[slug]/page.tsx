import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getLesson, getAllLessons } from "@/lib/lessons";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LessonProgress } from "@/components/lesson-progress";
import { ShareButtons } from "@/components/share-buttons";
import { ReadingProgress } from "@/components/reading-progress";
import { LessonKeyboardNav } from "@/components/lesson-keyboard-nav";
import { TableOfContents } from "@/components/table-of-contents";
import { RelatedLessons } from "@/components/related-lessons";
import { BackToTop } from "@/components/back-to-top";
import { mdxComponents } from "@/components/mdx-components";
import { Breadcrumb } from "@/components/breadcrumb";
import { LessonPrerequisites } from "@/components/lesson-prerequisites";
import { BookmarkButton } from "@/components/bookmark-button";
import { LessonFeedback } from "@/components/lesson-feedback";
import { getTracks } from "@/lib/lessons";

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
  const tracks = getTracks();
  const currentTrack = tracks.find((t) => t.slug === track);
  const currentIndex = allLessons.findIndex((l) => l.slug === slug);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const prevUrl = prevLesson ? `/learn/${track}/${prevLesson.slug}` : null;
  const nextUrl = nextLesson ? `/learn/${track}/${nextLesson.slug}` : null;

  const difficultyLabels = {
    beginner: "Cơ bản",
    intermediate: "Trung bình",
    advanced: "Nâng cao",
  };

  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <>
      <ReadingProgress />
      <LessonKeyboardNav prevUrl={prevUrl} nextUrl={nextUrl} />
      <BackToTop />
      <div className="flex justify-center">
      <article className="max-w-3xl flex-1">
        {/* Header */}
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Học", href: "/learn" },
            { label: currentTrack?.title || track, href: `/learn/${track}` },
            { label: lesson.title },
          ]}
        />
        <h1 className="text-3xl font-bold tracking-tight mb-2">{lesson.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
          <Badge variant="secondary">{lesson.estimatedTime}</Badge>
          <span>•</span>
          <span>Bài {lesson.order}</span>
          <span>•</span>
          <Badge className={difficultyColors[lesson.difficulty]}>
            {difficultyLabels[lesson.difficulty]}
          </Badge>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <ShareButtons
            title={lesson.title}
            url={`${siteConfig.url}/learn/${track}/${slug}`}
          />
          <BookmarkButton lessonId={`${track}/${slug}`} title={lesson.title} />
        </div>
      </div>

      {/* Prerequisites */}
      {lesson.prerequisites && lesson.prerequisites.length > 0 && (
        <LessonPrerequisites
          prerequisites={lesson.prerequisites}
          allLessons={getAllLessons()}
        />
      )}

      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={lesson.content} components={mdxComponents} />
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

      {/* Feedback */}
      <LessonFeedback lessonId={`${track}/${slug}`} />

      {/* Related Lessons */}
      <RelatedLessons
        currentSlug={slug}
        lessons={allLessons}
        track={track}
      />
    </article>
    <TableOfContents />
    </div>
    </>
  );
}
