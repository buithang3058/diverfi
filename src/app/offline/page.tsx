"use client";

import { WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OfflinePage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <WifiOff className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle>Bạn đang offline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Không thể kết nối internet. Một số tính năng có thể không hoạt động.
          </p>

          <div className="bg-muted/50 rounded-lg p-4 text-left">
            <p className="font-medium mb-2">Bạn vẫn có thể:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>- Xem các bài học đã cache</li>
              <li>- Đọc lại nội dung đã tải</li>
              <li>- Xem tiến độ học tập offline</li>
            </ul>
          </div>

          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Thử lại
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
