export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "learning" | "streak" | "quiz" | "explorer" | "special";
  condition: {
    type: "lessons_completed" | "track_completed" | "streak_days" | "quiz_score" | "study_time" | "first_lesson" | "bookmarks" | "all_tracks";
    value: number;
    trackId?: string;
  };
  xp: number;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
}

export const achievements: Achievement[] = [
  // Learning achievements
  {
    id: "first-step",
    title: "Bước Đầu Tiên",
    description: "Hoàn thành bài học đầu tiên",
    icon: "🎯",
    category: "learning",
    condition: { type: "first_lesson", value: 1 },
    xp: 10,
    rarity: "common",
  },
  {
    id: "getting-started",
    title: "Khởi Đầu Vững Chắc",
    description: "Hoàn thành 5 bài học",
    icon: "📚",
    category: "learning",
    condition: { type: "lessons_completed", value: 5 },
    xp: 50,
    rarity: "common",
  },
  {
    id: "dedicated-learner",
    title: "Người Học Chăm Chỉ",
    description: "Hoàn thành 10 bài học",
    icon: "🎓",
    category: "learning",
    condition: { type: "lessons_completed", value: 10 },
    xp: 100,
    rarity: "uncommon",
  },
  {
    id: "knowledge-seeker",
    title: "Người Tìm Kiến Thức",
    description: "Hoàn thành 20 bài học",
    icon: "🧠",
    category: "learning",
    condition: { type: "lessons_completed", value: 20 },
    xp: 200,
    rarity: "rare",
  },
  {
    id: "defi-master",
    title: "DeFi Master",
    description: "Hoàn thành 30 bài học",
    icon: "👑",
    category: "learning",
    condition: { type: "lessons_completed", value: 30 },
    xp: 500,
    rarity: "epic",
  },

  // Track completion
  {
    id: "defi-basics-complete",
    title: "Nền Tảng DeFi",
    description: "Hoàn thành track DeFi Cơ Bản",
    icon: "🏆",
    category: "learning",
    condition: { type: "track_completed", value: 1, trackId: "defi-basics" },
    xp: 150,
    rarity: "rare",
  },
  {
    id: "trading-complete",
    title: "Trader Chuyên Nghiệp",
    description: "Hoàn thành track Trading",
    icon: "📈",
    category: "learning",
    condition: { type: "track_completed", value: 1, trackId: "trading" },
    xp: 150,
    rarity: "rare",
  },
  {
    id: "security-complete",
    title: "Bảo Mật Expert",
    description: "Hoàn thành track Crypto Security",
    icon: "🛡️",
    category: "learning",
    condition: { type: "track_completed", value: 1, trackId: "crypto-security" },
    xp: 150,
    rarity: "rare",
  },
  {
    id: "yield-complete",
    title: "Yield Farmer",
    description: "Hoàn thành track Yield Farming",
    icon: "🌾",
    category: "learning",
    condition: { type: "track_completed", value: 1, trackId: "yield-farming" },
    xp: 150,
    rarity: "rare",
  },
  {
    id: "all-tracks-complete",
    title: "Crypto Scholar",
    description: "Hoàn thành tất cả các track",
    icon: "🎖️",
    category: "special",
    condition: { type: "all_tracks", value: 4 },
    xp: 1000,
    rarity: "legendary",
  },

  // Streak achievements
  {
    id: "streak-3",
    title: "Khởi Động",
    description: "Duy trì streak 3 ngày liên tiếp",
    icon: "🔥",
    category: "streak",
    condition: { type: "streak_days", value: 3 },
    xp: 30,
    rarity: "common",
  },
  {
    id: "streak-7",
    title: "Một Tuần Bền Bỉ",
    description: "Duy trì streak 7 ngày liên tiếp",
    icon: "🔥",
    category: "streak",
    condition: { type: "streak_days", value: 7 },
    xp: 70,
    rarity: "uncommon",
  },
  {
    id: "streak-14",
    title: "Hai Tuần Kiên Trì",
    description: "Duy trì streak 14 ngày liên tiếp",
    icon: "💪",
    category: "streak",
    condition: { type: "streak_days", value: 14 },
    xp: 150,
    rarity: "rare",
  },
  {
    id: "streak-30",
    title: "Một Tháng Vững Chãi",
    description: "Duy trì streak 30 ngày liên tiếp",
    icon: "⚡",
    category: "streak",
    condition: { type: "streak_days", value: 30 },
    xp: 300,
    rarity: "epic",
  },

  // Quiz achievements
  {
    id: "quiz-perfect",
    title: "Điểm Tuyệt Đối",
    description: "Đạt 100% trong một quiz",
    icon: "💯",
    category: "quiz",
    condition: { type: "quiz_score", value: 100 },
    xp: 50,
    rarity: "uncommon",
  },

  // Explorer achievements
  {
    id: "bookmark-collector",
    title: "Người Sưu Tầm",
    description: "Bookmark 5 bài học",
    icon: "📌",
    category: "explorer",
    condition: { type: "bookmarks", value: 5 },
    xp: 25,
    rarity: "common",
  },

  // Study time achievements
  {
    id: "study-1hr",
    title: "Giờ Đầu Tiên",
    description: "Học tổng cộng 1 giờ",
    icon: "⏱️",
    category: "learning",
    condition: { type: "study_time", value: 60 },
    xp: 30,
    rarity: "common",
  },
  {
    id: "study-5hr",
    title: "Người Học Nghiêm Túc",
    description: "Học tổng cộng 5 giờ",
    icon: "📖",
    category: "learning",
    condition: { type: "study_time", value: 300 },
    xp: 100,
    rarity: "uncommon",
  },
  {
    id: "study-10hr",
    title: "Học Viên Cần Cù",
    description: "Học tổng cộng 10 giờ",
    icon: "🎯",
    category: "learning",
    condition: { type: "study_time", value: 600 },
    xp: 200,
    rarity: "rare",
  },
];

export const rarityColors = {
  common: "from-gray-400 to-gray-500",
  uncommon: "from-green-400 to-green-600",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-orange-500",
};

export const rarityBorders = {
  common: "border-gray-400",
  uncommon: "border-green-500",
  rare: "border-blue-500",
  epic: "border-purple-500",
  legendary: "border-yellow-500",
};

export const rarityLabels = {
  common: "Phổ thông",
  uncommon: "Không phổ biến",
  rare: "Hiếm",
  epic: "Sử thi",
  legendary: "Huyền thoại",
};
