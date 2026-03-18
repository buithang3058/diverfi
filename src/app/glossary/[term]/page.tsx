import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllTerms, categoryLabels } from "@/lib/glossary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getAllLessons } from "@/lib/lessons";

interface Props {
  params: Promise<{ term: string }>;
}

function slugify(term: string) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function findTerm(slug: string) {
  return getAllTerms().find((t) => slugify(t.term) === slug.toLowerCase());
}

export async function generateStaticParams() {
  return getAllTerms().map((t) => ({ term: slugify(t.term) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term: slug } = await params;
  const entry = findTerm(slug);
  if (!entry) return { title: "Không tìm thấy" };

  return {
    title: `${entry.term} là gì? — ${entry.fullName}`,
    description: entry.definition,
    keywords: [entry.term, entry.fullName, "DeFi", "Crypto", "Việt Nam", `${entry.term} là gì`],
    openGraph: {
      title: `${entry.term} là gì? ${entry.fullName} — diverFi`,
      description: entry.definition,
    },
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term: slug } = await params;
  const entry = findTerm(slug);

  if (!entry) notFound();

  const allTerms = getAllTerms();
  const allLessons = getAllLessons();

  // Related terms — same category, exclude current
  const related = allTerms
    .filter((t) => t.category === entry.category && t.term !== entry.term)
    .slice(0, 6);

  // Related lessons — match term in title or track name
  const relatedLessons = allLessons
    .filter(
      (l) =>
        l.title.toLowerCase().includes(entry.term.toLowerCase()) ||
        l.description.toLowerCase().includes(entry.term.toLowerCase())
    )
    .slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back */}
      <Link
        href="/glossary"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Thuật ngữ DeFi
      </Link>

      {/* Term header */}
      <div className="mb-8">
        <div className="flex items-start gap-3 mb-2">
          <h1 className="text-4xl font-bold tracking-tight">{entry.term}</h1>
          <Badge variant="secondary" className="mt-2">
            {categoryLabels[entry.category] ?? entry.category}
          </Badge>
        </div>
        {entry.fullName && (
          <p className="text-lg text-muted-foreground">{entry.fullName}</p>
        )}
      </div>

      {/* Definition card */}
      <div className="rounded-xl border bg-muted/30 p-6 mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          {entry.term} là gì?
        </h2>
        <p className="text-lg leading-relaxed">{entry.definition}</p>
      </div>

      {/* Related lessons */}
      {relatedLessons.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Bài học liên quan
          </h2>
          <div className="space-y-2">
            {relatedLessons.map((lesson) => (
              <Link
                key={`${lesson.track}/${lesson.slug}`}
                href={`/learn/${lesson.track}/${lesson.slug}`}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground">{lesson.estimatedTime}</p>
                </div>
                <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related terms */}
      {related.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold mb-3">Thuật ngữ liên quan</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((t) => (
              <Button
                key={t.term}
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href={`/glossary/${slugify(t.term)}`} />}
              >
                {t.term}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="rounded-xl border bg-muted/30 p-5 text-center">
        <p className="font-medium mb-2">Muốn hiểu sâu hơn về DeFi?</p>
        <p className="text-sm text-muted-foreground mb-4">
          diverFi có 40+ bài học miễn phí bằng tiếng Việt — từ cơ bản đến nâng cao.
        </p>
        <Button nativeButton={false} render={<Link href="/learn" />}>
          Bắt đầu học ngay
        </Button>
      </div>
    </div>
  );
}
