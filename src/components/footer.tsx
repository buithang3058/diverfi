import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-bold text-xl">
              {siteConfig.name}
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Học DeFi & Crypto dành cho người Việt
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-3">Khám phá</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/learn"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Học DeFi
                </Link>
              </li>
              <li>
                <Link
                  href="/markets"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Thị trường
                </Link>
              </li>
              <li>
                <Link
                  href="/glossary"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Thuật ngữ
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Công cụ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">Tài nguyên</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://defillama.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  DefiLlama
                </a>
              </li>
              <li>
                <a
                  href="https://ethereum.org/vi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Ethereum.org
                </a>
              </li>
              <li>
                <a
                  href="https://coinmarketcap.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  CoinMarketCap
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">Kết nối</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.name}. Miễn phí và mã nguồn mở.
          </p>
          <p className="text-xs text-muted-foreground">
            Dữ liệu thị trường từ DefiLlama. Không phải lời khuyên đầu tư.
          </p>
        </div>
      </div>
    </footer>
  );
}
