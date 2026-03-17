"use client";

import { useEffect } from "react";

interface Props {
  show: boolean;
  onComplete?: () => void;
}

export function Confetti({ show, onComplete }: Props) {
  useEffect(() => {
    if (!show) return;

    let cancelled = false;

    const run = async () => {
      const confetti = (await import("canvas-confetti")).default;

      if (cancelled) return;

      const end = Date.now() + 2000;
      const colors = ["#7c3aed", "#4f46e5", "#fbbf24", "#34d399", "#f472b6"];

      const frame = () => {
        if (cancelled) return;

        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors,
          zIndex: 9999,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors,
          zIndex: 9999,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else {
          onComplete?.();
        }
      };

      frame();
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [show, onComplete]);

  return null;
}
