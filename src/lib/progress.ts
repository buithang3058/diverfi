const STORAGE_KEY = "diverfi_progress";

export interface ProgressData {
  completedLessons: string[];
  lastVisited: string | null;
  updatedAt: string;
}

function getDefaultProgress(): ProgressData {
  return {
    completedLessons: [],
    lastVisited: null,
    updatedAt: new Date().toISOString(),
  };
}

export function getProgress(): ProgressData {
  if (typeof window === "undefined") {
    return getDefaultProgress();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultProgress();
    }

    const parsed = JSON.parse(stored);

    // Validate structure
    if (
      !parsed ||
      !Array.isArray(parsed.completedLessons)
    ) {
      console.warn("Invalid progress data, resetting");
      return getDefaultProgress();
    }

    return parsed as ProgressData;
  } catch (error) {
    console.error("Failed to read progress:", error);
    return getDefaultProgress();
  }
}

export function saveProgress(data: ProgressData): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const toSave = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    return true;
  } catch (error) {
    // Handle storage full or other errors
    console.error("Failed to save progress:", error);

    // Try to notify user if storage is full
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      console.warn("localStorage is full");
    }

    return false;
  }
}

export function markLessonComplete(lessonId: string): boolean {
  const progress = getProgress();

  if (progress.completedLessons.includes(lessonId)) {
    return true; // Already complete
  }

  progress.completedLessons.push(lessonId);
  return saveProgress(progress);
}

export function isLessonComplete(lessonId: string): boolean {
  const progress = getProgress();
  return progress.completedLessons.includes(lessonId);
}

export function updateLastVisited(lessonId: string): boolean {
  const progress = getProgress();
  progress.lastVisited = lessonId;
  return saveProgress(progress);
}

export function getCompletionPercentage(totalLessons: number): number {
  const progress = getProgress();
  if (totalLessons === 0) return 0;
  return Math.round((progress.completedLessons.length / totalLessons) * 100);
}
