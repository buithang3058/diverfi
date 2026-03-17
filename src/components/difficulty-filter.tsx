"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

type Difficulty = "all" | "beginner" | "intermediate" | "advanced";

interface Props {
  onFilterChange: (difficulty: Difficulty) => void;
  counts?: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
}

const difficultyConfig = {
  all: {
    label: "Tất cả",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  },
  beginner: {
    label: "Cơ bản",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  intermediate: {
    label: "Trung bình",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  advanced: {
    label: "Nâng cao",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
};

export function DifficultyFilter({ onFilterChange, counts }: Props) {
  const [selected, setSelected] = useState<Difficulty>("all");

  const handleSelect = (difficulty: Difficulty) => {
    setSelected(difficulty);
    onFilterChange(difficulty);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span>Độ khó:</span>
      </div>
      <div className="flex gap-1 flex-wrap">
        {(Object.keys(difficultyConfig) as Difficulty[]).map((difficulty) => {
          const config = difficultyConfig[difficulty];
          const count =
            difficulty === "all"
              ? counts
                ? counts.beginner + counts.intermediate + counts.advanced
                : undefined
              : counts?.[difficulty];

          return (
            <button
              key={difficulty}
              onClick={() => handleSelect(difficulty)}
              className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                selected === difficulty
                  ? `${config.color} ring-2 ring-offset-2 ring-primary`
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {config.label}
              {count !== undefined && (
                <span className="ml-1 text-xs opacity-70">({count})</span>
              )}
            </button>
          );
        })}
      </div>
      {selected !== "all" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleSelect("all")}
          className="h-7 px-2"
        >
          <X className="h-3 w-3 mr-1" />
          Xóa filter
        </Button>
      )}
    </div>
  );
}

// Simpler inline filter badges
export function DifficultyBadges({
  selected,
  onSelect,
}: {
  selected: Difficulty;
  onSelect: (d: Difficulty) => void;
}) {
  return (
    <div className="flex gap-1">
      {(["all", "beginner", "intermediate", "advanced"] as Difficulty[]).map(
        (d) => (
          <Badge
            key={d}
            variant={selected === d ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onSelect(d)}
          >
            {difficultyConfig[d].label}
          </Badge>
        )
      )}
    </div>
  );
}
