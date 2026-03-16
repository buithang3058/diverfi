import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, BookOpen, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-8xl font-bold text-muted-foreground/20 mb-4">404</div>
      <h1 className="text-2xl font-bold mb-2">Trang không tìm thấy</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Có vẻ như trang bạn đang tìm không tồn tại hoặc đã được chuyển đi nơi khác.
      </p>

      <div className="grid gap-4 sm:grid-cols-3 w-full max-w-lg">
        <Card className="hover:bg-muted/50 transition-colors">
          <Link href="/">
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <Home className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Trang chủ</span>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:bg-muted/50 transition-colors">
          <Link href="/learn">
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Học DeFi</span>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:bg-muted/50 transition-colors">
          <Link href="/glossary">
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <Search className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Thuật ngữ</span>
            </CardContent>
          </Link>
        </Card>
      </div>

      <div className="mt-8">
        <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
          ← Quay về trang chủ
        </Button>
      </div>
    </div>
  );
}
