"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SearchDialog } from "@/components/search-dialog";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_EN = [
  { title: "Learn", href: "/learn" },
  { title: "Markets", href: "/markets" },
  { title: "Glossary", href: "/glossary" },
  { title: "News", href: "/news" },
  { title: "Tools", href: "/tools" },
  { title: "About", href: "/about" },
];

const NAV_VI = [
  { title: "Bắt đầu", href: "/getting-started" },
  { title: "Học", href: "/learn" },
  { title: "Thị trường", href: "/markets" },
  { title: "Thuật ngữ", href: "/glossary" },
  { title: "Tin tức", href: "/news" },
  { title: "Công cụ", href: "/tools" },
  { title: "Về diverFi", href: "/about" },
];

interface Props {
  lessons: { slug: string; title: string; description: string; track: string }[];
  terms: { term: string; fullName: string; definition: string }[];
}

export function HeaderClient({ lessons, terms }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isVi = pathname.startsWith("/vi");
  const nav = isVi ? NAV_VI : NAV_EN;
  const logoHref = isVi ? "/vi" : "/";
  const langSwitchHref = isVi ? "/" : "/vi";
  const langSwitchLabel = isVi ? "EN" : "VI";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href={logoHref} className="flex items-center py-2.5">
          <span className="font-[family-name:var(--font-geist)] text-[22px] leading-none tracking-[-0.025em]">
            <span className="font-light text-foreground">diver</span>
            <span className="font-bold text-[#2F6BFF] dark:text-[#5B8FFF]">Fi</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex items-center space-x-1 text-sm font-medium">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-3 py-3 transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <SearchDialog lessons={lessons} terms={terms} />
          <Link
            href={langSwitchHref}
            className="font-mono text-xs px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            {langSwitchLabel}
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile: Search + Theme + Menu Button */}
        <div className="flex items-center gap-1 md:hidden">
          <SearchDialog lessons={lessons} terms={terms} />
          <Link
            href={langSwitchHref}
            className="font-mono text-xs px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            {langSwitchLabel}
          </Link>
          <ThemeToggle />
          <button
            className="p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center py-3 text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
