"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StickyNote, Save, Trash2 } from "lucide-react";

interface Props {
  lessonId: string;
}

const NOTES_KEY = "diverfi-notes";

export function LessonNotes({ lessonId }: Props) {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(NOTES_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data[lessonId]) {
          setNote(data[lessonId]);
          setSavedNote(data[lessonId]);
        }
      }
    } catch {
      // Ignore
    }
  }, [lessonId]);

  const handleSave = () => {
    try {
      const stored = localStorage.getItem(NOTES_KEY);
      const data = stored ? JSON.parse(stored) : {};
      data[lessonId] = note;
      localStorage.setItem(NOTES_KEY, JSON.stringify(data));
      setSavedNote(note);
      setIsEditing(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleDelete = () => {
    try {
      const stored = localStorage.getItem(NOTES_KEY);
      const data = stored ? JSON.parse(stored) : {};
      delete data[lessonId];
      localStorage.setItem(NOTES_KEY, JSON.stringify(data));
      setNote("");
      setSavedNote("");
      setIsEditing(false);
    } catch {
      // Ignore
    }
  };

  const hasChanges = note !== savedNote;

  return (
    <Card className="mt-8">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <StickyNote className="h-4 w-4" />
          Ghi chú của bạn
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing || !savedNote ? (
          <>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Viết ghi chú cho bài học này..."
              className="w-full min-h-[120px] p-3 border rounded-lg bg-background resize-y text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-muted-foreground">
                {note.length} ký tự
              </div>
              <div className="flex gap-2">
                {savedNote && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setNote(savedNote);
                      setIsEditing(false);
                    }}
                  >
                    Hủy
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!note.trim() || !hasChanges}
                >
                  <Save className="h-4 w-4 mr-1" />
                  {isSaved ? "Đã lưu!" : "Lưu"}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="p-3 bg-muted/50 rounded-lg text-sm whitespace-pre-wrap">
              {savedNote}
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Xóa
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Chỉnh sửa
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
