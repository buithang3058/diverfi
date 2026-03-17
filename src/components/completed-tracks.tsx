"use client";

import { useState, useEffect } from "react";
import { TrackCertificate } from "./track-certificate";
import type { LessonMeta } from "@/lib/lessons";

interface Track {
  slug: string;
  title: string;
  lessonCount: number;
}

interface Props {
  lessons: LessonMeta[];
  tracks: Track[];
}

const STORAGE_KEY = "diverfi_progress";

export function CompletedTracks({ lessons, tracks }: Props) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setCompletedLessons(data.completedLessons || []);
      }
    } catch {
      // Ignore
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  // Find completed tracks
  const completedTracks = tracks.filter((track) => {
    const trackLessons = lessons.filter((l) => l.track === track.slug);
    const completedInTrack = trackLessons.filter((l) =>
      completedLessons.includes(`${l.track}/${l.slug}`)
    );
    return completedInTrack.length === trackLessons.length && trackLessons.length > 0;
  });

  if (completedTracks.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Chứng chỉ của bạn</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {completedTracks.map((track) => {
          const trackLessons = lessons.filter((l) => l.track === track.slug);
          return (
            <TrackCertificate
              key={track.slug}
              trackTitle={track.title}
              trackSlug={track.slug}
              completedDate={new Date().toISOString()}
              lessonsCount={trackLessons.length}
            />
          );
        })}
      </div>
    </div>
  );
}
