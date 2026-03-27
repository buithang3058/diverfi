"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Check, Twitter } from "lucide-react";

interface Props {
  completedCount: number;
  totalLessons: number;
  level: string;
}

export function ShareProgress({ completedCount, totalLessons, level }: Props) {
  const [copied, setCopied] = useState(false);

  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const shareText = `🎓 Tôi đã hoàn thành ${completedCount}/${totalLessons} bài học DeFi trên diverFi!

📊 Tiến độ: ${progressPercent}%
🏆 Cấp độ: ${level}

Học DeFi miễn phí tại: diverfi.com

#DeFi #Crypto #Learning`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleCopy}>
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            Đã copy
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </>
        )}
      </Button>
      <Button variant="outline" size="sm" onClick={handleTwitterShare}>
        <Twitter className="h-4 w-4 mr-1" />
        Tweet
      </Button>
    </div>
  );
}
