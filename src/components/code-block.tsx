"use client";

import { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = () => {
    const text = preRef.current?.textContent || "";

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group">
      <pre ref={preRef} className={cn("relative", className)}>
        {children}
      </pre>
      <button
        onClick={copyToClipboard}
        className={cn(
          "absolute top-2 right-2 p-2 rounded-md",
          "bg-muted/80 hover:bg-muted border",
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "text-muted-foreground hover:text-foreground"
        )}
        aria-label={copied ? "Đã copy" : "Copy code"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
