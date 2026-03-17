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

  // Also update recently viewed list
  updateRecentlyViewed(lessonId);

  return saveProgress(progress);
}

const RECENTLY_VIEWED_KEY = "diverfi-recently-viewed";
const MAX_RECENT = 10;

interface RecentLesson {
  id: string;
  timestamp: number;
}

export function updateRecentlyViewed(lessonId: string): void {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
    let recent: RecentLesson[] = stored ? JSON.parse(stored) : [];

    // Remove existing entry for this lesson
    recent = recent.filter((r) => r.id !== lessonId);

    // Add new entry at the beginning
    recent.unshift({ id: lessonId, timestamp: Date.now() });

    // Keep only the most recent
    recent = recent.slice(0, MAX_RECENT);

    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recent));
  } catch {
    // Ignore errors
  }
}

export function getCompletionPercentage(totalLessons: number): number {
  const progress = getProgress();
  if (totalLessons === 0) return 0;
  return Math.round((progress.completedLessons.length / totalLessons) * 100);
}

// Bookmarks
const BOOKMARKS_KEY = "diverfi-bookmarks";

export interface BookmarkedLesson {
  id: string;
  title: string;
  savedAt: string;
}

export function getBookmarks(): BookmarkedLesson[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getBookmarkIds(): string[] {
  return getBookmarks().map((b) => b.id);
}

// Study Streak
const STREAK_KEY = "diverfi-streak";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
}

function getDefaultStreak(): StreakData {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: null,
  };
}

export function getStreak(): StreakData {
  if (typeof window === "undefined") return getDefaultStreak();

  try {
    const stored = localStorage.getItem(STREAK_KEY);
    return stored ? JSON.parse(stored) : getDefaultStreak();
  } catch {
    return getDefaultStreak();
  }
}

export function updateStreak(): StreakData {
  if (typeof window === "undefined") return getDefaultStreak();

  try {
    const streak = getStreak();
    const today = new Date().toISOString().split("T")[0];

    if (streak.lastStudyDate === today) {
      return streak; // Already studied today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (streak.lastStudyDate === yesterdayStr) {
      // Continuing streak
      streak.currentStreak += 1;
    } else {
      // Streak broken, start fresh
      streak.currentStreak = 1;
    }

    streak.lastStudyDate = today;
    streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);

    localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
    return streak;
  } catch {
    return getDefaultStreak();
  }
}
