import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PROTOCOLS, getProtocol } from "@/config/protocols";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, CheckCircle2, AlertTriangle } from "lucide-react";
import { getAllLessons } from "@/lib/lessons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROTOCOLS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const protocol = getProtocol(slug);
  if (!protocol) return { title: "Không tìm thấy" };

  return {
    title: `${protocol.name} là gì? — Hướng dẫn tiếng Việt`,
    description: protocol.description.slice(0, 160),
    keywords: [
      protocol.name,
      `${protocol.name} là gì`,
      `${protocol.name} tiếng Việt`,
      protocol.category,
      "DeFi",
      "Việt Nam",
    ],
    openGraph: {
      title: `${protocol.name} là gì? — diverFi`,
      description: protocol.tagline,
    },
  };
}

export default async function ProtocolPage({ params }: Props) {
  const { slug } = await params;
  const protocol = getProtocol(slug);
  if (!protocol) notFound();

  const allLessons = getAllLessons();
  const relatedLessons = allLessons.filter((l) =>
    protocol.relatedTracks.includes(l.track)
  ).slice(0, 4);

  const otherProtocols = PROTOCOLS.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back */}
      <Link
        href="/protocols"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Tất cả protocols
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold tracking-tight">{protocol.name}</h1>
          <Badge variant="secondary">{protocol.category}</Badge>
        </div>
        <p className="text-xl text-muted-foreground">{protocol.tagline}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {protocol.chain.map((c) => (
            <Badge key={c} variant="outline" className="text-xs">
              {c}
            </Badge>
          ))}
          {protocol.tvl && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              TVL {protocol.tvl}
            </Badge>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="rounded-xl border bg-muted/30 p-6 mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          {protocol.name} là gì?
        </h2>
        <p className="text-base leading-relaxed">{protocol.description}</p>
      </div>

      {/* Pros & Risks */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border p-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4" />
            Ưu điểm
          </h3>
          <ul className="space-y-2">
            {protocol.pros.map((pro) => (
              <li key={pro} className="text-sm flex gap-2">
                <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border p-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-orange-700 dark:text-orange-400">
            <AlertTriangle className="h-4 w-4" />
            Rủi ro
          </h3>
          <ul className="space-y-2">
            {protocol.risks.map((risk) => (
              <li key={risk} className="text-sm flex gap-2">
                <span className="text-orange-500 shrink-0 mt-0.5">!</span>
                {risk}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl border bg-primary/5 p-6 mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold">Sẵn sàng dùng {protocol.name}?</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Học xong rồi mới dùng — đừng bỏ qua phần rủi ro ở trên.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={
            <Link href={protocol.url} target="_blank" rel="noopener noreferrer sponsored" />
          }
        >
          {protocol.ctaLabel}
          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Related lessons */}
      {relatedLessons.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold mb-3">Học về {protocol.name}</h2>
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

      {/* Other protocols */}
      <div>
        <h2 className="font-semibold mb-3">Protocols khác</h2>
        <div className="grid grid-cols-2 gap-2">
          {otherProtocols.map((p) => (
            <Link
              key={p.slug}
              href={`/protocols/${p.slug}`}
              className="p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <p className="font-medium text-sm">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.category}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
