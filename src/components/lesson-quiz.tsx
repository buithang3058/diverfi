"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, HelpCircle, RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { getQuizByLessonId, type QuizQuestion } from "@/data/quizzes";

interface Props {
  lessonId: string;
  questions?: QuizQuestion[];
}

const QUIZ_RESULTS_KEY = "diverfi-quiz-results";

interface QuizResult {
  lessonId: string;
  score: number;
  total: number;
  completedAt: string;
  bestScore?: number;
}

function getQuizResults(): Record<string, QuizResult> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(QUIZ_RESULTS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveQuizResult(lessonId: string, score: number, total: number) {
  try {
    const results = getQuizResults();
    const existing = results[lessonId];
    const bestScore = existing ? Math.max(existing.bestScore || 0, score) : score;

    results[lessonId] = {
      lessonId,
      score,
      total,
      completedAt: new Date().toISOString(),
      bestScore,
    };
    localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(results));
  } catch {
    // Ignore
  }
}

export function LessonQuiz({ lessonId, questions: propQuestions }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [previousBest, setPreviousBest] = useState<number | null>(null);

  // Get questions from props or load from data file
  const questions = (propQuestions && Array.isArray(propQuestions) && propQuestions.length > 0)
    ? propQuestions
    : getQuizByLessonId(lessonId);

  useEffect(() => {
    const results = getQuizResults();
    if (results[lessonId]) {
      setPreviousBest(results[lessonId].bestScore || null);
    }
  }, [lessonId]);

  // Safety check for invalid questions
  if (!questions || questions.length === 0) {
    return null;
  }

  const question = questions[currentQuestion];

  // Safety check for invalid question
  if (!question) {
    return null;
  }
  const isCorrect = selectedAnswer === question.correct;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const percentage = Math.round((score / questions.length) * 100);

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = isCorrect ? score + 1 : score;
      saveQuizResult(lessonId, finalScore, questions.length);
      setIsComplete(true);
    } else {
      setSelectedAnswer(null);
      setShowResult(false);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const finalScore = score;
    const isNewBest = previousBest === null || finalScore > previousBest;

    return (
      <Card className="mt-8 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Kết quả Quiz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="text-5xl font-bold mb-2">
              {finalScore}/{questions.length}
            </div>
            <div className="text-2xl text-muted-foreground mb-4">
              {percentage}%
            </div>

            {isNewBest && previousBest !== null && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-sm mb-4">
                <Trophy className="h-4 w-4" />
                Kỷ lục mới!
              </div>
            )}

            <div className={cn(
              "text-lg font-medium mb-6",
              percentage >= 80 ? "text-green-600 dark:text-green-400" :
              percentage >= 60 ? "text-yellow-600 dark:text-yellow-400" :
              "text-red-600 dark:text-red-400"
            )}>
              {percentage >= 80
                ? "Xuất sắc! Bạn đã nắm vững kiến thức."
                : percentage >= 60
                ? "Khá tốt! Có thể ôn lại một số phần."
                : "Cần ôn tập thêm. Đọc lại bài học nhé!"}
            </div>

            {previousBest !== null && !isNewBest && (
              <p className="text-sm text-muted-foreground mb-4">
                Điểm cao nhất: {previousBest}/{questions.length}
              </p>
            )}

            <Button onClick={handleRestart} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Làm lại
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8 border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <HelpCircle className="h-5 w-5 text-primary" />
            Quiz
          </CardTitle>
          <div className="flex items-center gap-2">
            {previousBest !== null && (
              <span className="text-xs text-muted-foreground">
                Best: {previousBest}/{questions.length}
              </span>
            )}
            <span className="text-sm font-medium bg-muted px-2 py-1 rounded">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-muted rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-medium text-lg mb-4">{question.question}</p>

        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correct;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all",
                  !showResult && isSelected && "border-primary bg-primary/5",
                  !showResult && !isSelected && "border-border hover:border-primary/50 hover:bg-muted/50",
                  showResult && isCorrectAnswer && "border-green-500 bg-green-50 dark:bg-green-950/50",
                  showResult && isSelected && !isCorrectAnswer && "border-red-500 bg-red-50 dark:bg-red-950/50",
                  showResult && !isSelected && !isCorrectAnswer && "opacity-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors",
                    !showResult && isSelected && "border-primary bg-primary text-primary-foreground",
                    showResult && isCorrectAnswer && "border-green-500 bg-green-500 text-white",
                    showResult && isSelected && !isCorrectAnswer && "border-red-500 bg-red-500 text-white"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && isCorrectAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {showResult && isSelected && !isCorrectAnswer && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && question.explanation && (
          <div className={cn(
            "mt-4 p-4 rounded-lg text-sm",
            isCorrect
              ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
              : "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800"
          )}>
            <strong className="block mb-1">
              {isCorrect ? "Chính xác!" : "Giải thích:"}
            </strong>
            {question.explanation}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {!showResult ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              size="lg"
            >
              Kiểm tra
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg">
              {isLastQuestion ? "Xem kết quả" : "Câu tiếp theo →"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
