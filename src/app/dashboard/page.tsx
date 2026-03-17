import { getAllLessons, getTracks } from "@/lib/lessons";
import { DashboardClient } from "./dashboard-client";

export const metadata = {
  title: "Tiến độ học tập",
  description: "Theo dõi tiến độ học DeFi và Crypto của bạn",
};

export default function DashboardPage() {
  const lessons = getAllLessons();
  const tracks = getTracks();

  // Calculate total time
  const totalMinutes = lessons.reduce((sum, lesson) => {
    const match = lesson.estimatedTime.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);

  return (
    <DashboardClient
      lessons={lessons}
      tracks={tracks}
      totalMinutes={totalMinutes}
    />
  );
}
