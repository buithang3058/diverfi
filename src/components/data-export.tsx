"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Upload, Check, AlertCircle } from "lucide-react";

const STORAGE_KEYS = [
  "diverfi_progress",
  "diverfi-bookmarks",
  "diverfi-streak",
  "diverfi-notes",
  "diverfi-reading-time",
  "diverfi-weekly-goals",
  "diverfi-recently-viewed",
];

interface ExportData {
  version: string;
  exportedAt: string;
  data: Record<string, unknown>;
}

export function DataExport() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      const data: Record<string, unknown> = {};

      STORAGE_KEYS.forEach((key) => {
        const stored = localStorage.getItem(key);
        if (stored) {
          try {
            data[key] = JSON.parse(stored);
          } catch {
            data[key] = stored;
          }
        }
      });

      const exportData: ExportData = {
        version: "1.0",
        exportedAt: new Date().toISOString(),
        data,
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `diverfi-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus("success");
      setMessage("Đã xuất dữ liệu thành công!");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setMessage("Lỗi khi xuất dữ liệu");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importData: ExportData = JSON.parse(content);

        if (!importData.version || !importData.data) {
          throw new Error("Invalid backup file format");
        }

        Object.entries(importData.data).forEach(([key, value]) => {
          if (STORAGE_KEYS.includes(key)) {
            localStorage.setItem(key, JSON.stringify(value));
          }
        });

        setStatus("success");
        setMessage("Đã nhập dữ liệu thành công! Tải lại trang để cập nhật.");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        setStatus("error");
        setMessage("File không hợp lệ hoặc bị lỗi");
        setTimeout(() => setStatus("idle"), 3000);
      }
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Sao lưu dữ liệu</CardTitle>
        <CardDescription>
          Xuất hoặc nhập dữ liệu học tập của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Xuất dữ liệu
          </Button>

          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Nhập dữ liệu
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>

        {status !== "idle" && (
          <div
            className={`mt-3 flex items-center gap-2 text-sm ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status === "success" ? (
              <Check className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {message}
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-3">
          Dữ liệu bao gồm: tiến độ học, bookmarks, ghi chú, streak, và mục tiêu.
        </p>
      </CardContent>
    </Card>
  );
}
