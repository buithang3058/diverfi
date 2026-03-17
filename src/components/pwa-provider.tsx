"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, X, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  setShowUpdateBanner(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error("SW registration failed:", error);
        });
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);

      // Show banner if not dismissed before
      const dismissed = localStorage.getItem("pwa-install-dismissed");
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setShowInstallBanner(false);
    }
    setInstallPrompt(null);
  };

  const handleDismissInstall = () => {
    setShowInstallBanner(false);
    localStorage.setItem("pwa-install-dismissed", "true");
  };

  const handleUpdate = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.waiting?.postMessage("skipWaiting");
        window.location.reload();
      });
    }
  };

  return (
    <>
      {children}

      {/* Offline indicator */}
      {!isOnline && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto z-50">
          <div className="bg-yellow-500 text-yellow-950 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg">
            <div className="h-2 w-2 rounded-full bg-yellow-950 animate-pulse" />
            Offline - Một số tính năng bị giới hạn
          </div>
        </div>
      )}

      {/* Install banner */}
      {showInstallBanner && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-4">
          <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-lg flex items-center gap-3">
            <Download className="h-5 w-5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium">Cài đặt diverFi</p>
              <p className="text-sm opacity-90">Học offline, trải nghiệm mượt hơn</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleInstall}
              >
                Cài đặt
              </Button>
              <button
                onClick={handleDismissInstall}
                className="p-1 hover:bg-white/10 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update banner */}
      {showUpdateBanner && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-4">
          <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-3">
            <RefreshCw className="h-5 w-5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium">Có bản cập nhật mới!</p>
              <p className="text-sm opacity-90">Tải lại để sử dụng phiên bản mới nhất</p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleUpdate}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
