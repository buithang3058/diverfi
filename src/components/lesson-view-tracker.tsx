"use client";

import { useTrackLessonView } from "./recently-viewed";

interface Props {
  lessonId: string;
}

export function LessonViewTracker({ lessonId }: Props) {
  useTrackLessonView(lessonId);
  return null;
}
