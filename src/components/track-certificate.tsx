"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2 } from "lucide-react";

interface Props {
  trackTitle: string;
  trackSlug: string;
  completedDate: string;
  lessonsCount: number;
}

export function TrackCertificate({
  trackTitle,
  trackSlug,
  completedDate,
  lessonsCount,
}: Props) {
  const [isSharing, setIsSharing] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Date(completedDate).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const certificateId = `DFI-${trackSlug.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  const handleShare = async () => {
    setIsSharing(true);
    const shareText = `Tôi vừa hoàn thành khóa học "${trackTitle}" trên diverFi với ${lessonsCount} bài học! Học DeFi miễn phí tại diverfi.com #DeFi #Crypto #Learning`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Chứng chỉ ${trackTitle}`,
          text: shareText,
          url: "https://diverfi.com",
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert("Đã copy nội dung chia sẻ!");
      }
    } catch {
      // User cancelled or error
    }
    setIsSharing(false);
  };

  const handleDownload = () => {
    // Create a simple text certificate for download
    const certText = `
════════════════════════════════════════════════════════════
                     CHỨNG CHỈ HOÀN THÀNH
                         diverFi
════════════════════════════════════════════════════════════

                    Chứng nhận đã hoàn thành

                      ${trackTitle}

                    Số bài học: ${lessonsCount}
                    Ngày hoàn thành: ${formattedDate}

                    Mã chứng chỉ: ${certificateId}

════════════════════════════════════════════════════════════
                    diverfi.com
════════════════════════════════════════════════════════════
    `.trim();

    const blob = new Blob([certText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diverfi-certificate-${trackSlug}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
      <CardContent className="pt-6">
        <div ref={certificateRef} className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
            <Award className="h-8 w-8 text-yellow-600" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Chứng chỉ hoàn thành
            </p>
            <h3 className="text-xl font-bold mt-1">{trackTitle}</h3>
          </div>

          <div className="py-4 border-y border-yellow-200 dark:border-yellow-800">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Số bài học</p>
                <p className="font-semibold">{lessonsCount}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Ngày hoàn thành</p>
                <p className="font-semibold">{formattedDate}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Mã chứng chỉ: {certificateId}
          </p>

          <div className="flex justify-center gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Tải xuống
            </Button>
            <Button size="sm" onClick={handleShare} disabled={isSharing}>
              <Share2 className="h-4 w-4 mr-1" />
              Chia sẻ
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
