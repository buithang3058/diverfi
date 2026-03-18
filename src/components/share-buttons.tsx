"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Link2, Check } from "lucide-react";
import { ZaloIcon, TelegramIcon } from "@/components/icons/zalo-icon";

interface Props {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const shareText = `${title} - Học DeFi miễn phí tại diverFi`;

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareZalo = () => {
    window.open(
      `https://zalo.me/share?u=${encodeURIComponent(url)}&t=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const shareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Chia sẻ:</span>
      {/* Zalo — most important for Vietnam */}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={shareZalo}
        title="Chia sẻ lên Zalo"
      >
        <ZaloIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={shareFacebook}
        title="Chia sẻ lên Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={shareTelegram}
        title="Chia sẻ lên Telegram"
      >
        <TelegramIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={shareTwitter}
        title="Chia sẻ lên Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={copyLink}
        title="Copy link"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
