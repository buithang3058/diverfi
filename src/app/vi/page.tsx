import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllLessons, getTracks } from "@/lib/lessons";
import { getAllTerms } from "@/lib/glossary";
import { ContinueLearning } from "@/components/continue-learning";
import { Newsletter } from "@/components/newsletter";
import { LearningStats } from "@/components/learning-stats";

export default function HomeVi() {
  const lessons = getAllLessons();
  const tracks = getTracks();
  const terms = getAllTerms();

  const featuredLessons = [
    lessons.find((l) => l.track === "defi-basics" && l.slug === "01-what-is-defi"),
    lessons.find((l) => l.track === "yield-farming" && l.slug === "01-yield-farming-basics"),
    lessons.find((l) => l.track === "crypto-security" && l.slug === "01-wallet-security"),
  ].filter((l): l is NonNullable<typeof l> => l !== undefined);

  return (
    <div className="flex flex-col">

      {/* ── HERO — split layout ───────────────────────────────────── */}
      <section className="w-full py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center">

          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-xs text-amber-500 tracking-widest uppercase">
                Giáo dục DeFi — Rủi ro trước tiên
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight">
              Hầu hết giáo dục DeFi{" "}
              <span className="text-amber-500">giấu đi rủi ro.</span>
              <br />
              Chúng tôi thì không.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Xem chính xác các protocol hứa hẹn gì so với những gì họ thực sự mang lại.
              Số liệu thực tế. Không nội dung tài trợ. Không agenda.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold"
                nativeButton={false}
                render={<Link href="/vi/learn" />}
              >
                Bắt đầu học
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/markets" />}
              >
                Xem Protocol
              </Button>
            </div>

            <div className="flex gap-8 pt-4 border-t border-border">
              <div>
                <span className="block font-mono text-xl font-bold">{lessons.length}</span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Bài học</span>
              </div>
              <div>
                <span className="block font-mono text-xl font-bold">{tracks.length}</span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Khóa học</span>
              </div>
              <div>
                <span className="block font-mono text-xl font-bold">{terms.length}</span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Thuật ngữ</span>
              </div>
            </div>
          </div>

          {/* Right — Hành trình học */}
          <div className="flex flex-col gap-3">
            <Link
              href="/learn/defi-basics/01-what-is-defi"
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 font-mono text-sm font-bold text-black">1</span>
              <div>
                <div className="text-sm font-bold leading-snug group-hover:text-amber-500 transition-colors">Hiểu DeFi thực sự là gì</div>
                <div className="mt-1 text-sm text-muted-foreground leading-relaxed">Không jargon, không marketing. Cơ chế thực — tại sao APY cao, tiền đó lấy từ đâu.</div>
                <div className="mt-2 font-mono text-xs text-amber-500">→ DeFi là gì · 10 phút</div>
              </div>
            </Link>
            <Link
              href="/learn"
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-sm font-bold">2</span>
              <div>
                <div className="text-sm font-bold leading-snug group-hover:text-amber-500 transition-colors">Nhận ra rủi ro trước khi đầu tư</div>
                <div className="mt-1 text-sm text-muted-foreground leading-relaxed">Impermanent loss, rug pull, smart contract bug. Biết tên rủi ro giúp bạn tránh mất tiền.</div>
                <div className="mt-2 font-mono text-xs text-muted-foreground">→ Tại sao mất tiền DeFi · 12 phút</div>
              </div>
            </Link>
            <Link
              href="/learn/yield-farming/01-yield-farming-basics"
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-sm font-bold">3</span>
              <div>
                <div className="text-sm font-bold leading-snug group-hover:text-amber-500 transition-colors">Ra quyết định tự tin với số tiền thật</div>
                <div className="mt-1 text-sm text-muted-foreground leading-relaxed">Đọc được protocol, tự tính APY thực, biết khi nào nên vào — khi nào nên dừng.</div>
                <div className="mt-2 font-mono text-xs text-muted-foreground">→ Yield farming thực tế · 15 phút</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTINUE LEARNING ────────────────────────────────────── */}
      <section className="w-full pb-6">
        <ContinueLearning lessons={lessons} />
      </section>

      {/* ── LEARNING STATS ───────────────────────────────────────── */}
      <section className="w-full pb-6">
        <LearningStats totalLessons={lessons.length} totalTime={`${lessons.length * 10}m`} />
      </section>

      {/* ── LESSONS — strip layout ────────────────────────────────── */}
      <section className="w-full py-10 border-t">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-bold">Bắt đầu từ đây</h2>
          <Button
            variant="ghost"
            className="text-amber-500 hover:text-amber-400 font-mono text-sm"
            nativeButton={false}
            render={<Link href="/learn" />}
          >
            xem tất cả →
          </Button>
        </div>

        <div className="flex flex-col gap-0.5">
          {featuredLessons.map((lesson, i) => (
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
                {lesson.difficulty === "beginner"
                  ? "cơ bản"
                  : lesson.difficulty === "intermediate"
                  ? "trung cấp"
                  : "nâng cao"}
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
