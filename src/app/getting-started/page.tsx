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
import {
  BookOpen,
  Wallet,
  Shield,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

export const metadata = {
  title: "Bắt đầu",
  description: "Hướng dẫn nhanh để bắt đầu học DeFi và Crypto trên diverFi",
};

const steps = [
  {
    number: 1,
    title: "Hiểu DeFi là gì",
    description: "Tài chính phi tập trung khác gì ngân hàng truyền thống?",
    icon: Lightbulb,
    link: "/learn/defi-basics/01-what-is-defi",
    time: "10 phút",
  },
  {
    number: 2,
    title: "Tạo ví crypto",
    description: "Tạo ví MetaMask hoặc Rabby để lưu trữ tài sản",
    icon: Wallet,
    link: "/learn/defi-basics/02-crypto-wallet",
    time: "15 phút",
  },
  {
    number: 3,
    title: "Bảo mật ví",
    description: "Học cách bảo vệ seed phrase và tránh mất tiền",
    icon: Shield,
    link: "/learn/crypto-security/01-wallet-security",
    time: "12 phút",
  },
  {
    number: 4,
    title: "Tránh lừa đảo",
    description: "Nhận biết scam và phishing trong crypto",
    icon: Shield,
    link: "/learn/crypto-security/02-avoiding-scams",
    time: "10 phút",
  },
  {
    number: 5,
    title: "Hiểu DEX",
    description: "Cách hoạt động của sàn giao dịch phi tập trung",
    icon: TrendingUp,
    link: "/learn/defi-basics/04-dex-amm",
    time: "12 phút",
  },
];

const tips = [
  "Bắt đầu với số tiền nhỏ bạn có thể chấp nhận mất",
  "KHÔNG BAO GIỜ chia sẻ seed phrase với bất kỳ ai",
  "Kiểm tra URL kỹ trước khi connect wallet",
  "Đọc kỹ transaction trước khi ký",
  "Diversify - không bỏ hết tiền vào 1 protocol",
];

export default function GettingStartedPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-2">
          Người mới
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">Bắt đầu với DeFi</h1>
        <p className="text-muted-foreground mt-2">
          Hướng dẫn từng bước để bắt đầu hành trình crypto của bạn một cách an
          toàn
        </p>
      </div>

      {/* Time estimate */}
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium">Thời gian hoàn thành: ~60 phút</p>
              <p className="text-sm text-muted-foreground">
                5 bài học cơ bản để bắt đầu an toàn
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-4 mb-12">
        <h2 className="text-xl font-semibold mb-4">Lộ trình 5 bước</h2>
        {steps.map((step) => (
          <Link key={step.number} href={step.link}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <step.icon className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{step.time}</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Safety Tips */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-yellow-500" />
            Quy tắc an toàn quan trọng
          </CardTitle>
          <CardDescription>
            Ghi nhớ những điều này trước khi bắt đầu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Resources */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Thuật ngữ</CardTitle>
            <CardDescription>
              Hiểu ý nghĩa các từ chuyên ngành
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<Link href="/glossary" />}
            >
              Xem từ điển →
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Công cụ DeFi</CardTitle>
            <CardDescription>
              Các tools hữu ích khi tham gia DeFi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<Link href="/tools" />}
            >
              Xem công cụ →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="py-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Sẵn sàng bắt đầu?</h2>
          <p className="mb-6 opacity-90">
            Bắt đầu với bài học đầu tiên ngay bây giờ
          </p>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            render={<Link href="/learn/defi-basics/01-what-is-defi" />}
          >
            Bắt đầu học →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
