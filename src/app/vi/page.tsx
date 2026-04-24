import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllLessons, getTracks } from "@/lib/lessons";
import { getAllTerms } from "@/lib/glossary";
import { ContinueLearning } from "@/components/continue-learning";
import { Newsletter } from "@/components/newsletter";
import { LearningStats } from "@/components/learning-stats";
import { ProtocolLogo } from "@/components/protocol-logo";

const PROTOCOL_DATA = [
  {
    name: "Uniswap V3",
    type: "DEX · Thanh khoản",
    claimedAPY: "50–200%",
    realisticAPY: "8–15%",
    risk: "med" as const,
  },
  {
    name: "Aave V3",
    type: "Cho vay",
    claimedAPY: "5–15%",
    realisticAPY: "3–8%",
    risk: "low" as const,
  },
  {
    name: "GMX",
    type: "Perps · Phái sinh",
    claimedAPY: "15–70%",
    realisticAPY: "10–25%",
    risk: "high" as const,
  },
  {
    name: "Lido",
    type: "Liquid Staking",
    claimedAPY: "4–6%",
    realisticAPY: "3.5–5%",
    risk: "low" as const,
  },
];

const RISK_STYLES = {
  low: { badge: "bg-green-500/10 text-green-500", label: "🟢 Thấp" },
  med: { badge: "bg-yellow-500/10 text-yellow-400", label: "🟡 Vừa" },
  high: { badge: "bg-red-500/10 text-red-400", label: "🔴 Cao" },
};

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

          {/* Right — Protocol Reality Check panel */}
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest font-bold">
                Kiểm tra Thực tế Protocol
              </span>
              <span className="flex items-center gap-1.5 font-mono text-xs text-green-500">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Dữ liệu thực
              </span>
            </div>

            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-4 py-2 border-b border-border">
              {["Protocol", "Hứa hẹn", "Thực tế", "Rủi ro"].map((h) => (
                <span key={h} className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest first:text-left text-center">
                  {h}
                </span>
              ))}
            </div>

            {PROTOCOL_DATA.map((p) => {
              const risk = RISK_STYLES[p.risk];
              return (
                <div
                  key={p.name}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr] px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors items-center"
                >
                  <div className="flex items-center gap-2.5">
                    <ProtocolLogo name={p.name} size={26} />
                    <div>
                      <div className="text-sm font-bold leading-tight">{p.name}</div>
                      <div className="font-mono text-[11px] text-muted-foreground">{p.type}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-mono text-sm text-muted-foreground line-through decoration-red-400">
                      {p.claimedAPY}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="font-mono text-sm text-green-500 font-bold">
                      {p.realisticAPY}
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <span className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${risk.badge}`}>
                      {risk.label}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="px-4 py-2.5 bg-amber-500/5 border-t border-amber-500/20">
              <p className="font-mono text-[11px] text-amber-400">
                → diverFi tính APY thực tế sau IL, phí giao dịch và điều kiện thị trường
              </p>
            </div>
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
