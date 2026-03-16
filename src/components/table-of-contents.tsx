"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all headings in the prose content
    const article = document.querySelector(".prose");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3");
    const items: TOCItem[] = [];

    elements.forEach((element) => {
      // Generate ID if not exists
      if (!element.id) {
        element.id = element.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || "";
      }

      items.push({
        id: element.id,
        text: element.textContent || "",
        level: element.tagName === "H2" ? 2 : 3,
      });
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="hidden xl:block sticky top-24 ml-8 w-64 shrink-0">
      <p className="font-semibold text-sm mb-3">Trong bài này</p>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "text-left text-muted-foreground hover:text-foreground transition-colors",
                heading.level === 3 && "pl-4",
                activeId === heading.id && "text-primary font-medium"
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
