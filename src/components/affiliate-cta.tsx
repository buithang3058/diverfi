import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAffiliatesForTrack } from "@/config/affiliates";

interface Props {
  track: string;
}

export function AffiliateCta({ track }: Props) {
  const affiliates = getAffiliatesForTrack(track);

  if (affiliates.length === 0) return null;

  return (
    <div className="mt-10 p-5 rounded-xl border bg-muted/30">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Đối tác được đề xuất
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {affiliates.map((affiliate) => (
          <div
            key={affiliate.id}
            className="flex flex-col gap-2 p-3 rounded-lg bg-background border"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">{affiliate.name}</span>
              {affiliate.badge && (
                <Badge variant="secondary" className="text-xs">
                  {affiliate.badge}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground flex-1">
              {affiliate.description}
            </p>
            <Button
              size="sm"
              variant="outline"
              className="w-full mt-1 text-xs"
              nativeButton={false}
              render={
                <Link
                  href={affiliate.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                />
              }
            >
              {affiliate.cta}
              <ExternalLink className="ml-1.5 h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        * diverFi có thể nhận hoa hồng khi bạn đăng ký qua các link này. Không ảnh hưởng đến nội dung học.
      </p>
    </div>
  );
}
