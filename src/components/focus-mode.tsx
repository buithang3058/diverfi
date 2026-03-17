"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Focus, X, Moon, Sun, Type, Minus, Plus } from "lucide-react";

interface FocusModeContextType {
  isFocusMode: boolean;
  setFocusMode: (value: boolean) => void;
}

const FocusModeContext = createContext<FocusModeContextType>({
  isFocusMode: false,
  setFocusMode: () => {},
});

export function useFocusMode() {
  return useContext(FocusModeContext);
}

export function FocusModeProvider({ children }: { children: React.ReactNode }) {
  const [isFocusMode, setFocusMode] = useState(false);

  useEffect(() => {
    if (isFocusMode) {
      document.body.classList.add("focus-mode");
    } else {
      document.body.classList.remove("focus-mode");
    }

    return () => {
      document.body.classList.remove("focus-mode");
    };
  }, [isFocusMode]);

  return (
    <FocusModeContext.Provider value={{ isFocusMode, setFocusMode }}>
      {children}
    </FocusModeContext.Provider>
  );
}

export function FocusModeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [isDark, setIsDark] = useState(false);
  const { isFocusMode, setFocusMode } = useFocusMode();

  useEffect(() => {
    // Check system preference
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleFocusMode = () => {
    setFocusMode(!isFocusMode);
    if (!isFocusMode) {
      setIsOpen(false);
    }
  };

  const adjustFontSize = (delta: number) => {
    const newSize = Math.max(80, Math.min(140, fontSize + delta));
    setFontSize(newSize);
    document.documentElement.style.setProperty(
      "--prose-font-size",
      `${newSize}%`
    );
  };

  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.removeProperty("--prose-font-size");
  };

  if (isFocusMode) {
    return (
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Font size controls */}
        <div className="flex items-center gap-1 bg-background/80 backdrop-blur rounded-full px-2 py-1 border shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => adjustFontSize(-10)}
            title="Giảm cỡ chữ"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <button
            onClick={resetFontSize}
            className="text-xs w-10 text-center hover:underline"
            title="Reset cỡ chữ"
          >
            {fontSize}%
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => adjustFontSize(10)}
            title="Tăng cỡ chữ"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        {/* Exit focus mode */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFocusMode}
          className="gap-2 bg-background/80 backdrop-blur"
        >
          <X className="h-4 w-4" />
          Thoát
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
        title="Chế độ tập trung"
      >
        <Focus className="h-4 w-4" />
        <span className="hidden sm:inline">Tập trung</span>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 p-4 bg-popover border rounded-lg shadow-lg z-50">
            <h3 className="font-semibold mb-3">Chế độ tập trung</h3>

            <div className="space-y-4">
              {/* Focus mode toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Ẩn menu & sidebar</span>
                <Button
                  variant={isFocusMode ? "default" : "outline"}
                  size="sm"
                  onClick={toggleFocusMode}
                >
                  {isFocusMode ? "Đang bật" : "Bật"}
                </Button>
              </div>

              {/* Font size */}
              <div>
                <span className="text-sm block mb-2">Cỡ chữ</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => adjustFontSize(-10)}
                  >
                    <Type className="h-3 w-3" />
                  </Button>
                  <div className="flex-1 text-center text-sm">{fontSize}%</div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => adjustFontSize(10)}
                  >
                    <Type className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Chế độ tập trung ẩn các yếu tố gây xao nhãng để bạn có thể tập trung đọc.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// CSS to add to globals.css:
// .focus-mode header,
// .focus-mode footer,
// .focus-mode nav,
// .focus-mode .no-focus,
// .focus-mode [data-focus-hide] {
//   display: none !important;
// }
// .focus-mode article {
//   max-width: 700px !important;
//   margin: 0 auto !important;
// }
// .focus-mode .prose {
//   font-size: var(--prose-font-size, 100%);
// }
