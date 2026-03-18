"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_URL = "https://t.me/diverfi_vn";
const DISMISS_KEY = "telegram_banner_dismissed";

interface Props {
  variant?: "banner" | "card";
  memberCount?: string;
}

export function TelegramBanner({ variant = "banner", memberCount = "1,000+" }: Props) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  };

  if (variant === "card") {
    return (
      <div className="rounded-xl border bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">✈️</span>
          <div className="flex-1">
            <p className="font-semibold text-sm">Tham gia cộng đồng Telegram</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {memberCount} người học DeFi Việt Nam. Hỏi đáp, tín hiệu thị trường, deals từ protocols.
            </p>
            <Button
              size="sm"
              className="mt-3 bg-[#0088cc] hover:bg-[#0077bb] text-white"
              nativeButton={false}
              render={<Link href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" />}
            >
              Tham gia ngay →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Banner variant — sticky bottom strip
  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 bg-[#0088cc] text-white px-4 py-2.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-sm">
        <span>✈️</span>
        <span className="font-medium">Tham gia {memberCount} người học DeFi trên Telegram</span>
        <Link
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold hover:no-underline"
        >
          Vào group ngay →
        </Link>
      </div>
      <button
        onClick={dismiss}
        className="shrink-0 opacity-80 hover:opacity-100"
        aria-label="Đóng"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Inline card for homepage and lesson end
export function TelegramCard({ memberCount = "1,000+" }: { memberCount?: string }) {
  return <TelegramBanner variant="card" memberCount={memberCount} />;
}
