"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, HelpCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface Props {
  questions: QuizQuestion[];
  title?: string;
}

export function Quiz({ questions, title = "Kiểm tra kiến thức" }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctIndex;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(questions.length).fill(null));
  };

  const isComplete = currentQuestion === questions.length - 1 && showResult;
  const percentage = Math.round((score / questions.length) * 100);

  if (isComplete && isLastQuestion && showResult) {
    return (
      <Card className="mt-8 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            {title} - Kết quả
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="text-4xl font-bold mb-2">
              {score}/{questions.length}
            </div>
            <div className="text-lg text-muted-foreground mb-4">
              {percentage >= 80
                ? "Xuất sắc! Bạn đã nắm vững kiến thức."
                : percentage >= 60
                ? "Khá tốt! Có thể ôn lại một số phần."
                : "Cần ôn tập thêm. Đọc lại bài học nhé!"}
            </div>
            <div className="flex justify-center gap-2 mb-4">
              {answers.map((answer, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    answer === questions[idx].correctIndex
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  )}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
            <Button onClick={handleRestart} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Làm lại
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            {title}
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            Câu {currentQuestion + 1}/{questions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-medium mb-4">{question.question}</p>
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={showResult}
              className={cn(
                "w-full text-left p-3 rounded-lg border transition-colors",
                selectedAnswer === index && !showResult
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50",
                showResult &&
                  index === question.correctIndex &&
                  "border-green-500 bg-green-50 dark:bg-green-950",
                showResult &&
                  selectedAnswer === index &&
                  index !== question.correctIndex &&
                  "border-red-500 bg-red-50 dark:bg-red-950"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border flex items-center justify-center text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && index === question.correctIndex && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {showResult &&
                  selectedAnswer === index &&
                  index !== question.correctIndex && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
              </div>
            </button>
          ))}
        </div>

        {showResult && question.explanation && (
          <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
            <strong>Giải thích:</strong> {question.explanation}
          </div>
        )}

        <div className="mt-4 flex justify-end gap-2">
          {!showResult ? (
            <Button onClick={handleCheckAnswer} disabled={selectedAnswer === null}>
              Kiểm tra
            </Button>
          ) : (
            <Button onClick={isLastQuestion ? handleRestart : handleNext}>
              {isLastQuestion ? "Xem kết quả" : "Câu tiếp theo"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
