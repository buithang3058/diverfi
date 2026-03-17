"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  emoji: string;
  delay: number;
  duration: number;
}

const emojis = ["🎉", "🎊", "✨", "💫", "🌟", "⭐", "🏆", "💪"];

export function Confetti({ show, onComplete }: { show: boolean; onComplete?: () => void }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (show) {
      // Generate confetti particles
      const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1,
      }));
      setParticles(newParticles);

      // Clean up after animation
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute text-2xl animate-confetti"
          style={{
            left: `${particle.x}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        >
          {particle.emoji}
        </span>
      ))}
    </div>
  );
}
