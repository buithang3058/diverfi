"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  filter: string;
  active: boolean;
  label: string;
}

export function NewsFilter({ filter, active, label }: Props) {
  return (
    <Link
      href={filter === "all" ? "/news" : `/news?filter=${filter}`}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "border-border hover:border-primary/50 hover:bg-muted"
      )}
    >
      {label}
    </Link>
  );
}
