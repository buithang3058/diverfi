"use client";

import { useEffect, useCallback } from "react";

interface Props {
  trigger: boolean;
  variant?: "confetti" | "stars";
}

export function CompletionCelebration({ trigger, variant = "confetti" }: Props) {
  const celebrate = useCallback(async () => {
    if (typeof window === "undefined") return;

    const confetti = (await import("canvas-confetti")).default;

    if (variant === "stars") {
      // Star burst from center
      confetti({
        particleCount: 80,
        spread: 360,
        startVelocity: 25,
        shapes: ["star"],
        colors: ["#7c3aed", "#4f46e5", "#fbbf24", "#34d399", "#60a5fa"],
        origin: { x: 0.5, y: 0.5 },
        gravity: 0.6,
        scalar: 1.2,
      });
    } else {
      // Burst from both sides
      const end = Date.now() + 1000;
      const colors = ["#7c3aed", "#4f46e5", "#fbbf24", "#34d399"];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [variant]);

  useEffect(() => {
    if (trigger) {
      celebrate();
    }
  }, [trigger, celebrate]);

  return null;
}

// Hook for easy use
export function useCelebration() {
  const fire = useCallback(async (variant: "confetti" | "stars" = "confetti") => {
    if (typeof window === "undefined") return;

    const confetti = (await import("canvas-confetti")).default;

    if (variant === "stars") {
      confetti({
        particleCount: 80,
        spread: 360,
        startVelocity: 25,
        shapes: ["star"],
        colors: ["#7c3aed", "#4f46e5", "#fbbf24", "#34d399", "#60a5fa"],
        origin: { x: 0.5, y: 0.5 },
        gravity: 0.6,
        scalar: 1.2,
      });
    } else {
      const end = Date.now() + 1500;
      const colors = ["#7c3aed", "#4f46e5", "#fbbf24", "#34d399"];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, []);

  return { fire };
}
