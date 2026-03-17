"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, X, RefreshCw } from "lucide-react";

const TIPS = [
  {
    category: "Security",
    tip: "Luôn verify URL trước khi kết nối ví. Scammers thường dùng domain giống với site thật.",
  },
  {
    category: "Trading",
    tip: "Không bao giờ invest nhiều hơn số tiền bạn có thể mất. Đây là nguyên tắc vàng trong crypto.",
  },
  {
    category: "DeFi",
    tip: "APY cao thường đi kèm rủi ro cao. Luôn research kỹ trước khi farm.",
  },
  {
    category: "Security",
    tip: "Seed phrase là chìa khóa master. Không bao giờ chia sẻ với bất kỳ ai, kể cả 'support team'.",
  },
  {
    category: "Trading",
    tip: "Đặt Stop-Loss trước khi vào lệnh. Đừng để cảm xúc quyết định thay logic.",
  },
  {
    category: "DeFi",
    tip: "Kiểm tra TVL và audit của protocol trước khi deposit. DefiLlama là công cụ hữu ích.",
  },
  {
    category: "Security",
    tip: "Dùng hardware wallet cho số tiền lớn. Hot wallet chỉ nên chứa số tiền nhỏ cho daily use.",
  },
  {
    category: "Trading",
    tip: "DCA (Dollar Cost Averaging) giúp giảm rủi ro timing. Đừng cố đoán đỉnh/đáy.",
  },
  {
    category: "DeFi",
    tip: "Impermanent Loss là thực. Hiểu rõ trước khi cung cấp thanh khoản cho volatile pairs.",
  },
  {
    category: "Security",
    tip: "Revoke approvals định kỳ tại revoke.cash. Đừng để unlimited approvals cho contracts không dùng.",
  },
  {
    category: "Trading",
    tip: "Greed và Fear là kẻ thù lớn nhất. Có kế hoạch và stick with it.",
  },
  {
    category: "DeFi",
    tip: "Gas fees trên Ethereum có thể rất cao. Cân nhắc L2s cho transactions nhỏ.",
  },
  {
    category: "Security",
    tip: "Dùng burner wallet khi tương tác với protocols mới hoặc mint NFTs.",
  },
  {
    category: "Trading",
    tip: "Đừng FOMO. Cơ hội trong crypto luôn có, nhưng tiền mất thì khó lấy lại.",
  },
  {
    category: "DeFi",
    tip: "Stablecoins cũng có rủi ro depeg. Diversify giữa USDC, USDT, DAI.",
  },
];

const DISMISSED_KEY = "diverfi-tip-dismissed";
const LAST_TIP_KEY = "diverfi-last-tip";

export function DailyTip() {
  const [tip, setTip] = useState<(typeof TIPS)[0] | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getTodaysTip = () => {
    // Use date as seed for consistent daily tip
    const today = new Date().toISOString().split("T")[0];
    const seed = today.split("-").reduce((a, b) => a + parseInt(b), 0);
    return TIPS[seed % TIPS.length];
  };

  useEffect(() => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const dismissedDate = localStorage.getItem(DISMISSED_KEY);

      if (dismissedDate === today) {
        setDismissed(true);
      } else {
        setTip(getTodaysTip());
      }
    } catch {
      setTip(getTodaysTip());
    }
    setIsLoading(false);
  }, []);

  const handleDismiss = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(DISMISSED_KEY, today);
    setDismissed(true);
  };

  const handleRefresh = () => {
    const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];
    setTip(randomTip);
  };

  if (isLoading || dismissed || !tip) {
    return null;
  }

  const categoryColors: Record<string, string> = {
    Security: "text-red-600 bg-red-100 dark:bg-red-900/30",
    Trading: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
    DeFi: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
  };

  return (
    <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">Mẹo hôm nay</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[tip.category]}`}
              >
                {tip.category}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{tip.tip}</p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleRefresh}
              title="Mẹo khác"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleDismiss}
              title="Ẩn"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
