import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/lessons");

export interface LessonMeta {
  slug: string;
  title: string;
  description: string;
  track: string;
  order: number;
  estimatedTime: string;
}

export interface Lesson extends LessonMeta {
  content: string;
}

export function getAllLessons(track?: string): LessonMeta[] {
  const tracks = track ? [track] : fs.readdirSync(contentDirectory);
  const lessons: LessonMeta[] = [];

  for (const trackDir of tracks) {
    const trackPath = path.join(contentDirectory, trackDir);

    if (!fs.statSync(trackPath).isDirectory()) continue;

    const files = fs.readdirSync(trackPath).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const filePath = path.join(trackPath, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      lessons.push({
        slug: file.replace(/\.mdx$/, ""),
        title: data.title || "Untitled",
        description: data.description || "",
        track: trackDir,
        order: data.order || 0,
        estimatedTime: data.estimatedTime || "5 min",
      });
    }
  }

  return lessons.sort((a, b) => a.order - b.order);
}

export function getLesson(track: string, slug: string): Lesson | null {
  const filePath = path.join(contentDirectory, track, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    track,
    order: data.order || 0,
    estimatedTime: data.estimatedTime || "5 min",
    content,
  };
}

export function getTracks(): { slug: string; title: string; lessonCount: number }[] {
  const trackDirs = fs.readdirSync(contentDirectory);

  return trackDirs
    .filter((dir) => fs.statSync(path.join(contentDirectory, dir)).isDirectory())
    .map((dir) => {
      const lessons = getAllLessons(dir);
      const trackTitles: Record<string, string> = {
        "defi-basics": "DeFi Cơ bản",
        "yield-farming": "Yield Farming",
        "trading": "Trading",
      };

      return {
        slug: dir,
        title: trackTitles[dir] || dir,
        lessonCount: lessons.length,
      };
    });
}
