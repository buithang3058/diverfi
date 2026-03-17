"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  CheckCircle2,
  Circle,
  ArrowRight,
  Share2,
  Flame,
  Bookmark,
} from "lucide-react";
import { ShareProgress } from "@/components/share-progress";
import { Achievements } from "@/components/achievements";
import { WeeklyGoals } from "@/components/weekly-goals";
import { DataExport } from "@/components/data-export";
import { LearningRecommendations } from "@/components/learning-recommendations";
import { CompletedTracks } from "@/components/completed-tracks";
import { StudyStatistics } from "@/components/study-statistics";
import { DailyTip } from "@/components/daily-tip";
import { StudyReminder } from "@/components/study-reminder";
import { ProgressMilestones, MilestoneProgress } from "@/components/progress-milestones";
import type { LessonMeta } from "@/lib/lessons";

interface Track {
  slug: string;
  title: string;
  lessonCount: number;
  totalTime: string;
}

interface Props {
  lessons: LessonMeta[];
  tracks: Track[];
  totalMinutes: number;
}

const STORAGE_KEY = "diverfi_progress";
const BOOKMARKS_KEY = "diverfi-bookmarks";
const STREAK_KEY = "diverfi-streak";

interface BookmarkedLesson {
  id: string;
  title: string;
  savedAt: string;
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
}

export function DashboardClient({ lessons, tracks, totalMinutes }: Props) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkedLesson[]>([]);
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastStudyDate: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setCompletedLessons(data.completedLessons || []);
      }

      // Load bookmarks
      const bookmarksStored = localStorage.getItem(BOOKMARKS_KEY);
      if (bookmarksStored) {
        setBookmarks(JSON.parse(bookmarksStored));
      }

      // Load streak
      const streakStored = localStorage.getItem(STREAK_KEY);
      if (streakStored) {
        setStreak(JSON.parse(streakStored));
      }
    } catch {
      // Ignore
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const completedCount = completedLessons.length;
  const totalLessons = lessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Calculate completed time
  const completedMinutes = lessons
    .filter((l) => completedLessons.includes(`${l.track}/${l.slug}`))
    .reduce((sum, lesson) => {
      const match = lesson.estimatedTime.match(/(\d+)/);
      return sum + (match ? parseInt(match[1]) : 0);
    }, 0);

  // Get next lesson to continue
  const nextLesson = lessons.find(
    (l) => !completedLessons.includes(`${l.track}/${l.slug}`)
  );

  // Track progress
  const trackProgress = tracks.map((track) => {
    const trackLessons = lessons.filter((l) => l.track === track.slug);
    const completed = trackLessons.filter((l) =>
      completedLessons.includes(`${l.track}/${l.slug}`)
    ).length;
    return {
      ...track,
      completed,
      total: trackLessons.length,
      percent: Math.round((completed / trackLessons.length) * 100),
    };
  });

  // Calculate level
  const level =
    completedCount === 0
      ? "Mới bắt đầu"
      : completedCount < 5
      ? "Người học"
      : completedCount < 10
      ? "Trung cấp"
      : completedCount < 15
      ? "Nâng cao"
      : "Chuyên gia";

  // Recent completed
  const recentCompleted = completedLessons
    .slice(-5)
    .reverse()
    .map((id) => {
      const [track, slug] = id.split("/");
      return lessons.find((l) => l.track === track && l.slug === slug);
    })
    .filter(Boolean);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tiến độ học tập</h1>
            <p className="text-muted-foreground mt-2">
              Theo dõi hành trình học DeFi của bạn
            </p>
          </div>
          {completedCount > 0 && (
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Chia sẻ:</span>
              <ShareProgress
                completedCount={completedCount}
                totalLessons={totalLessons}
                level={level}
              />
            </div>
          )}
        </div>
      </div>

      {/* Progress Milestones Celebration */}
      <ProgressMilestones />

      {/* Daily Tip */}
      <DailyTip />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Đã hoàn thành</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedCount}/{totalLessons}
            </div>
            <p className="text-xs text-muted-foreground">bài học</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tiến độ</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressPercent}%</div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Thời gian học</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedMinutes} phút</div>
            <p className="text-xs text-muted-foreground">
              / {totalMinutes} phút tổng
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cấp độ</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedCount === 0
                ? "Mới bắt đầu"
                : completedCount < 5
                ? "Người học"
                : completedCount < 10
                ? "Trung cấp"
                : completedCount < 15
                ? "Nâng cao"
                : "Chuyên gia"}
            </div>
            <p className="text-xs text-muted-foreground">
              {completedCount < 15
                ? `Còn ${Math.max(5, (Math.floor(completedCount / 5) + 1) * 5) - completedCount} bài để lên cấp`
                : "Đã đạt cấp cao nhất!"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Chuỗi học</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {streak.currentStreak} ngày
            </div>
            <p className="text-xs text-muted-foreground">
              Kỷ lục: {streak.longestStreak} ngày
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goals */}
      <div className="mb-8">
        <WeeklyGoals />
      </div>

      {/* Study Reminder */}
      <StudyReminder />

      {/* Learning Recommendations */}
      <div className="mb-8">
        <LearningRecommendations lessons={lessons} />
      </div>

      {/* Continue Learning */}
      {nextLesson && (
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Tiếp tục học</CardTitle>
            <CardDescription>Bài học tiếp theo của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{nextLesson.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {nextLesson.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{nextLesson.estimatedTime}</Badge>
                  <Badge variant="outline">
                    {tracks.find((t) => t.slug === nextLesson.track)?.title}
                  </Badge>
                </div>
              </div>
              <Button
                nativeButton={false}
                render={
                  <Link
                    href={`/learn/${nextLesson.track}/${nextLesson.slug}`}
                  />
                }
              >
                Học ngay <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Track Progress */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Tiến độ theo khóa học</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {trackProgress.map((track) => (
            <Card key={track.slug}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{track.title}</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {track.completed}/{track.total}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${track.percent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {track.percent}% hoàn thành
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    nativeButton={false}
                    render={<Link href={`/learn/${track.slug}`} />}
                  >
                    Xem khóa học
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Tracks Certificates */}
      <CompletedTracks lessons={lessons} tracks={tracks} />

      {/* Bookmarked Lessons */}
      {bookmarks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Bài học đã lưu</h2>
          <div className="space-y-2">
            {bookmarks.slice(0, 5).map((bookmark) => {
              const [track, slug] = bookmark.id.split("/");
              const lesson = lessons.find(
                (l) => l.track === track && l.slug === slug
              );
              if (!lesson) return null;
              return (
                <Link
                  key={bookmark.id}
                  href={`/learn/${track}/${slug}`}
                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <Bookmark className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {tracks.find((t) => t.slug === lesson.track)?.title}
                    </p>
                  </div>
                  <Badge variant="secondary">{lesson.estimatedTime}</Badge>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Completed */}
      {recentCompleted.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Hoàn thành gần đây</h2>
          <div className="space-y-2">
            {recentCompleted.map(
              (lesson) =>
                lesson && (
                  <Link
                    key={`${lesson.track}/${lesson.slug}`}
                    href={`/learn/${lesson.track}/${lesson.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {tracks.find((t) => t.slug === lesson.track)?.title}
                      </p>
                    </div>
                    <Badge variant="secondary">{lesson.estimatedTime}</Badge>
                  </Link>
                )
            )}
          </div>
        </div>
      )}

      {/* Achievements */}
      <div className="mb-8">
        <Achievements />
      </div>

      {/* Study Statistics */}
      <StudyStatistics />

      {/* Data Export */}
      <div className="mb-8">
        <DataExport />
      </div>

      {/* Empty State */}
      {completedCount === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Circle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Chưa có bài học nào</h3>
            <p className="text-muted-foreground mb-4">
              Bắt đầu học để theo dõi tiến độ của bạn
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/getting-started" />}
            >
              Bắt đầu học
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
