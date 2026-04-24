import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllLessons, getTracks } from "@/lib/lessons";
import { getAllTerms } from "@/lib/glossary";
import { ContinueLearning } from "@/components/continue-learning";
import { Newsletter } from "@/components/newsletter";
import { LearningStats } from "@/components/learning-stats";

const EN_FEATURED_LESSONS = [
  {
    track: "defi-basics",
    slug: "01-what-is-defi",
    title: "What is DeFi — how it works and the risks you must understand",
    estimatedTime: "10 min",
    difficulty: "beginner" as const,
  },
  {
    track: "yield-farming",
    slug: "01-yield-farming-basics",
    title: "Yield farming — what the APY numbers actually mean",
    estimatedTime: "12 min",
    difficulty: "intermediate" as const,
  },
  {
    track: "crypto-security",
    slug: "01-wallet-security",
    title: "Crypto wallet security — how to protect your assets",
    estimatedTime: "10 min",
    difficulty: "beginner" as const,
  },
];


export default function Home() {
  const lessons = getAllLessons();
  const tracks = getTracks();
  const terms = getAllTerms();

  return (
    <div className="flex flex-col">

      {/* ── HERO — split layout ───────────────────────────────────── */}
      <section className="w-full py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center">

          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            {/* Tag */}
            <div className="flex items-center gap-2 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-xs text-amber-500 tracking-widest uppercase">
                Risk-first DeFi education
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight">
              Most DeFi education{" "}
              <span className="text-amber-500">hides the risks.</span>
              <br />
              We don&apos;t.
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              See exactly what protocols promise vs. what they actually deliver.
              Real numbers. No sponsored content. No agenda.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold"
                nativeButton={false}
                render={<Link href="/learn" />}
              >
                Start Learning
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/markets" />}
              >
                Browse Protocols
              </Button>
            </div>

            {/* Mini stats */}
            <div className="flex gap-8 pt-4 border-t border-border">
              <div>
                <span className="block font-mono text-xl font-bold">{lessons.length}</span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Lessons</span>
              </div>
              <div>
                <span className="block font-mono text-xl font-bold">{tracks.length}</span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Tracks</span>
              </div>
              <div>
                <span className="block font-mono text-xl font-bold">{terms.length}</span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Terms</span>
              </div>
            </div>
          </div>

          {/* Right — Learning journey */}
          <div className="flex flex-col gap-3">
            <Link
              href="/learn/defi-basics/01-what-is-defi"
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 font-mono text-sm font-bold text-black">1</span>
              <div>
                <div className="text-sm font-bold leading-snug group-hover:text-amber-500 transition-colors">Understand what DeFi actually is</div>
                <div className="mt-1 text-sm text-muted-foreground leading-relaxed">No jargon, no marketing. The real mechanics — why protocols pay high APY and where that money comes from.</div>
                <div className="mt-2 font-mono text-xs text-amber-500">→ What is DeFi · 10 min</div>
              </div>
            </Link>
            <Link
              href="/learn"
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-sm font-bold">2</span>
              <div>
                <div className="text-sm font-bold leading-snug group-hover:text-amber-500 transition-colors">Spot the risks before you invest</div>
                <div className="mt-1 text-sm text-muted-foreground leading-relaxed">Impermanent loss, rug pulls, smart contract bugs. Name the risks to avoid losing money.</div>
                <div className="mt-2 font-mono text-xs text-muted-foreground">→ Why people lose money in DeFi · 12 min</div>
              </div>
            </Link>
            <Link
              href="/learn/yield-farming/01-yield-farming-basics"
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-sm font-bold">3</span>
              <div>
                <div className="text-sm font-bold leading-snug group-hover:text-amber-500 transition-colors">Make confident decisions with real money</div>
                <div className="mt-1 text-sm text-muted-foreground leading-relaxed">Read any protocol, calculate real APY yourself, and know when to enter — and when to walk away.</div>
                <div className="mt-2 font-mono text-xs text-muted-foreground">→ Yield farming in practice · 15 min</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTINUE LEARNING (shows only if user has progress) ────── */}
      <section className="w-full pb-6">
        <ContinueLearning lessons={lessons} />
      </section>

      {/* ── LEARNING STATS (shows only if user completed lessons) ───── */}
      <section className="w-full pb-6">
        <LearningStats totalLessons={lessons.length} totalTime={`${lessons.length * 12}m`} />
      </section>

      {/* ── LESSONS — strip layout ────────────────────────────────── */}
      <section className="w-full py-10 border-t">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-bold">Start here</h2>
          <Button
            variant="ghost"
            className="text-amber-500 hover:text-amber-400 font-mono text-sm"
            nativeButton={false}
            render={<Link href="/learn" />}
          >
            view all lessons →
          </Button>
        </div>

        <div className="flex flex-col gap-0.5">
          {EN_FEATURED_LESSONS.map((lesson, i) => (
            <Link
              key={lesson.slug}
              href={`/learn/${lesson.track}/${lesson.slug}`}
              className="flex items-center gap-4 px-4 py-4 border-l-2 border-transparent hover:border-amber-500 hover:bg-muted/30 rounded-r-lg transition-all group"
            >
              <span className="font-mono text-sm text-muted-foreground w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-bold group-hover:text-foreground transition-colors leading-snug">
                  {lesson.title}
                </div>
                <div className="flex gap-3 mt-1 items-center">
                  <span className="text-xs text-muted-foreground capitalize">
                    {lesson.track.replace(/-/g, " ")}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {lesson.estimatedTime}
                  </span>
                </div>
              </div>
              <span
                className={`shrink-0 text-[11px] font-semibold px-2.5 py-0.5 rounded-full font-mono ${
                  lesson.difficulty === "beginner"
                    ? "bg-green-500/10 text-green-500"
                    : lesson.difficulty === "intermediate"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {lesson.difficulty}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────── */}
      <section className="w-full py-10 border-t">
        <Newsletter />
      </section>
    </div>
  );
}
