"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface Props {
  lessonTitle: string;
}

export function PrintLesson({ lessonTitle }: Props) {
  const handlePrint = () => {
    // Add print-specific styles
    const style = document.createElement("style");
    style.id = "print-styles";
    style.textContent = `
      @media print {
        /* Hide non-essential elements */
        header, footer, nav,
        .no-print,
        button:not(.print-include),
        [data-radix-popper-content-wrapper],
        .fixed,
        .sticky {
          display: none !important;
        }

        /* Reset background and colors for printing */
        body {
          background: white !important;
          color: black !important;
          font-size: 12pt !important;
          line-height: 1.5 !important;
        }

        /* Main content styling */
        article {
          max-width: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        /* Ensure prose content is readable */
        .prose {
          max-width: 100% !important;
          color: black !important;
        }

        .prose h1, .prose h2, .prose h3,
        .prose h4, .prose h5, .prose h6 {
          color: black !important;
          page-break-after: avoid !important;
        }

        .prose p, .prose li {
          color: black !important;
        }

        .prose pre, .prose code {
          background: #f5f5f5 !important;
          color: black !important;
          border: 1px solid #ddd !important;
          page-break-inside: avoid !important;
        }

        .prose a {
          color: black !important;
          text-decoration: underline !important;
        }

        .prose a::after {
          content: " (" attr(href) ")";
          font-size: 0.8em;
          color: #666;
        }

        /* Print header */
        .print-header {
          display: block !important;
          text-align: center;
          margin-bottom: 20pt;
          padding-bottom: 10pt;
          border-bottom: 1px solid #ccc;
        }

        /* Page breaks */
        h2 {
          page-break-before: auto;
        }

        /* Avoid orphans and widows */
        p {
          orphans: 3;
          widows: 3;
        }

        /* Footer with page numbers */
        @page {
          margin: 2cm;
          @bottom-center {
            content: counter(page);
          }
        }
      }
    `;
    document.head.appendChild(style);

    // Add print header
    const printHeader = document.createElement("div");
    printHeader.className = "print-header";
    printHeader.id = "print-header";
    printHeader.innerHTML = `
      <h1 style="font-size: 18pt; margin: 0;">${lessonTitle}</h1>
      <p style="font-size: 10pt; color: #666; margin: 5pt 0 0 0;">
        diverFi - Học DeFi & Crypto | In ngày ${new Date().toLocaleDateString("vi-VN")}
      </p>
    `;

    const article = document.querySelector("article");
    if (article) {
      article.insertBefore(printHeader, article.firstChild);
    }

    // Print
    window.print();

    // Cleanup after print
    setTimeout(() => {
      const styleEl = document.getElementById("print-styles");
      if (styleEl) styleEl.remove();

      const headerEl = document.getElementById("print-header");
      if (headerEl) headerEl.remove();
    }, 1000);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className="no-print gap-2"
      title="In bài học"
    >
      <Printer className="h-4 w-4" />
      <span className="hidden sm:inline">In</span>
    </Button>
  );
}
