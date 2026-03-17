import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllLessons, getTracks } from "@/lib/lessons";
import { getAllTerms } from "@/lib/glossary";
import { ContinueLearning } from "@/components/continue-learning";
import { Newsletter } from "@/components/newsletter";
import { LearningStats } from "@/components/learning-stats";
import { BookOpen, TrendingUp, Search, GraduationCap } from "lucide-react";

export default function Home() {
  const lessons = getAllLessons();
  const tracks = getTracks();
  const terms = getAllTerms();

  // Calculate total time
  const totalTimeMinutes = tracks.reduce((sum, track) => {
    const minutes = parseInt(track.totalTime.match(/\d+/)?.[0] || "0");
    const hours = track.totalTime.includes("giờ")
      ? parseInt(track.totalTime.match(/(\d+)\s*giờ/)?.[1] || "0") * 60
      : 0;
    return sum + minutes + hours;
  }, 0);
  const totalTimeStr = totalTimeMinutes >= 60
    ? `${Math.floor(totalTimeMinutes / 60)}h ${totalTimeMinutes % 60}m`
    : `${totalTimeMinutes}m`;

  // Get first 3 lessons for featured section
  const featuredLessons = lessons.slice(0, 3);

  // Get popular terms
  const popularTerms = terms.filter((t) =>
    ["DeFi", "APY", "TVL", "DEX", "Staking", "Liquidity Pool"].includes(t.term)
  );

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 lg:py-28">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Badge variant="secondary" className="mb-2">
            100% Miễn phí
          </Badge>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Học DeFi & Crypto
            <br />
            <span className="text-muted-foreground">dành cho người Việt</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Từ zero đến hero. Hiểu về blockchain, DeFi, và cách tham gia thị
            trường crypto một cách an toàn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/learn" />}
            >
              Bắt đầu học ngay
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href="/markets" />}
            >
              Xem thị trường
            </Button>
          </div>
        </div>
      </section>

      {/* Continue Learning Section - only shows if user has progress */}
      <section className="w-full pb-8">
        <ContinueLearning lessons={lessons} />
      </section>

      {/* Learning Stats - only shows if user has completed lessons */}
      <section className="w-full pb-8">
        <LearningStats totalLessons={lessons.length} totalTime={totalTimeStr} />
      </section>

      {/* Stats Section */}
      <section className="w-full py-8 border-y bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold">{lessons.length}</p>
            <p className="text-sm text-muted-foreground">Bài học</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{tracks.length}</p>
            <p className="text-sm text-muted-foreground">Khóa học</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{terms.length}</p>
            <p className="text-sm text-muted-foreground">Thuật ngữ</p>
          </div>
          <div>
            <p className="text-3xl font-bold">20+</p>
            <p className="text-sm text-muted-foreground">DeFi Protocols</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Tại sao chọn diverFi?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Học từ cơ bản</CardTitle>
              <CardDescription>
                Bắt đầu từ những khái niệm đơn giản nhất
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Blockchain là gì? Ví crypto hoạt động như thế nào? DeFi khác gì
                CeFi? Tất cả được giải thích dễ hiểu bằng tiếng Việt.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Dữ liệu thị trường</CardTitle>
              <CardDescription>Theo dõi TVL real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                TVL của các DeFi protocols hàng đầu từ DefiLlama. Tất cả dữ liệu
                bạn cần để ra quyết định.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Thuật ngữ</CardTitle>
              <CardDescription>Từ điển crypto tiếng Việt</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                APY, TVL, Impermanent Loss, Liquidity Mining... Hiểu rõ ý nghĩa
                từng thuật ngữ trước khi đầu tư.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Lessons Section */}
      <section className="w-full py-12 border-t">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Bài học nổi bật</h2>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/learn" />}
          >
            Xem tất cả →
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredLessons.map((lesson) => (
            <Card
              key={lesson.slug}
              className="hover:bg-muted/50 transition-colors"
            >
              <Link href={`/learn/${lesson.track}/${lesson.slug}`}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {lesson.estimatedTime}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Terms Section */}
      <section className="w-full py-12 border-t">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Thuật ngữ phổ biến</h2>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/glossary" />}
          >
            Xem tất cả →
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularTerms.map((term) => (
            <Card key={term.term}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  <span className="text-primary">{term.term}</span>
                  {term.term !== term.fullName && (
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      {term.fullName}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {term.definition}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 border-t">
        <Newsletter />
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 border-t">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Sẵn sàng bắt đầu?</h2>
            <p className="mb-6 opacity-90">
              Tham gia ngay để học về DeFi và crypto một cách bài bản
            </p>
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={<Link href="/learn" />}
            >
              Bắt đầu học miễn phí
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
