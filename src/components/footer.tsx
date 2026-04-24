"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isVi = pathname.startsWith("/vi");

  const t = isVi
    ? {
        tagline: "Học DeFi & Crypto dành cho người Việt",
        explore: "Khám phá",
        learn: "Học DeFi",
        markets: "Thị trường",
        glossary: "Thuật ngữ",
        faq: "FAQ",
        tools: "Công cụ",
        resources: "Tài nguyên",
        connect: "Kết nối",
        partners: "Đối tác & Tài trợ",
        legal: "Không phải lời khuyên đầu tư.",
        oss: "Miễn phí và mã nguồn mở.",
        privacy: "Bảo mật",
        terms: "Điều khoản",
        content: "Nội dung",
      }
    : {
        tagline: "Risk-first DeFi education. No agenda.",
        explore: "Explore",
        learn: "Learn DeFi",
        markets: "Markets",
        glossary: "Glossary",
        faq: "FAQ",
        tools: "Tools",
        resources: "Resources",
        connect: "Connect",
        partners: "Partners & Sponsors",
        legal: "Not investment advice.",
        oss: "Free and open source.",
        privacy: "Privacy",
        terms: "Terms",
        content: "Content Policy",
      };

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={isVi ? "/vi" : "/"} className="font-bold text-xl">
              {siteConfig.name}
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">{t.tagline}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-3">{t.explore}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors block py-1">{t.learn}</Link>
              </li>
              <li>
                <Link href="/markets" className="text-muted-foreground hover:text-foreground transition-colors block py-1">{t.markets}</Link>
              </li>
              <li>
                <Link href="/glossary" className="text-muted-foreground hover:text-foreground transition-colors block py-1">{t.glossary}</Link>
              </li>
              <li>
                <Link href="/protocols" className="text-muted-foreground hover:text-foreground transition-colors block py-1">Protocols</Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors block py-1">{t.faq}</Link>
              </li>
              <li>
                <Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors block py-1">{t.tools}</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">{t.resources}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://defillama.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors block py-1">DefiLlama</a>
              </li>
              <li>
                <a href="https://ethereum.org/vi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors block py-1">Ethereum.org</a>
              </li>
              <li>
                <a href="https://coinmarketcap.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors block py-1">CoinMarketCap</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">{t.connect}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/partners" className="text-muted-foreground hover:text-foreground transition-colors block py-1">{t.partners}</Link>
              </li>
              <li>
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors block py-1">GitHub</a>
              </li>
              <li>
                <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors block py-1">Twitter</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.name}. {t.oss}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span>{t.legal}</span>
            <Link href="/disclaimer" className="hover:text-foreground transition-colors underline underline-offset-2">Disclaimer</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors underline underline-offset-2">{t.privacy}</Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors underline underline-offset-2">Cookie</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors underline underline-offset-2">{t.terms}</Link>
            <Link href="/content-policy" className="hover:text-foreground transition-colors underline underline-offset-2">{t.content}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
