import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { HeaderWithSearch } from "@/components/header-with-search";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { FocusModeProvider } from "@/components/focus-mode";
import { ReadingPreferencesLoader } from "@/components/reading-preferences";
import { MobileNav } from "@/components/mobile-nav";
import { OrganizationSchema, EducationalOrgSchema } from "@/components/structured-data";
import { PWAProvider } from "@/components/pwa-provider";
import { AchievementNotification } from "@/components/achievement-notification";
import { PriceTicker } from "@/components/price-ticker";
import { siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: "diverFi" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#7c3aed" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <OrganizationSchema />
        <EducationalOrgSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FocusModeProvider>
            <PWAProvider>
              <ReadingPreferencesLoader />
              <PriceTicker />
              <HeaderWithSearch />
              <main className="flex-1 container py-6 pb-20 md:pb-6">{children}</main>
              <Footer />
              <MobileNav />
              <KeyboardShortcuts />
              <AchievementNotification />
            </PWAProvider>
          </FocusModeProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
