# Changelog

All notable changes to diverFi are documented here.

## [0.44.0.0] - 2026-04-24

### Added
- **English homepage** (`/`) — Variant C split-screen design: hero copy left, Protocol Reality Check panel right. Hardcoded featured lessons with English titles. Targets international/EU market.
- **Vietnamese homepage** (`/vi`) — Same layout as English, copy in Vietnamese. "Hầu hết giáo dục DeFi giấu đi rủi ro. Chúng tôi thì không."
- **Protocol logos** — Inline SVG brand-accurate icons for Uniswap V3 (pink), Aave V3 (purple), GMX (navy/teal), Lido (blue) in the Protocol Reality Check panel. No external image dependencies.
- **Protocol Reality Check panel** — Shows claimed vs realistic APY side-by-side with risk badge for 4 protocols. Amber footer note on IL/fee methodology.

### Changed
- **Shared components translated to English** — `ContinueLearning`, `LearningStats`, `Newsletter` now render English text. Vietnamese homepage continues to use these components (language of lessons drives the experience).
- **Homepage architecture** — Removed old card-grid layout. Now uses strip-based lesson list with amber left-border hover and numbered rows.

## [0.43.0.0] - 2026-03-18

### Added
- **Affiliate system** — track-level affiliate CTAs on every lesson page (Binance, OKX, Uniswap, Aave, GMX, Bybit with UTM tracking)
- **Partners page** (`/partners`) — 3 sponsorship tiers (Bronze/Silver/Gold) with pre-filled mailto contact links
- **Glossary SEO pages** (`/glossary/[term]`) — individual page per term with "X là gì?" metadata, related lessons, and related terms
- **Protocol pages** (`/protocols`, `/protocols/[slug]`) — 6 protocol profiles (Uniswap, Aave, GMX, Binance, Lido, Curve) with pros/risks, affiliate CTAs, and related lessons
- **Viral share loop** — lesson completion auto-opens share modal after confetti (2.5s delay) with Zalo, Facebook, Telegram platform buttons
- **Telegram banner** — sticky dismissible banner + inline card variant linking to t.me/diverfi_vn community
- **Zalo/Telegram share buttons** — added to all share locations (lesson pages, share buttons component)
- **Shared icon components** — `ZaloIcon` and `TelegramIcon` in `src/components/icons/`
- **Unit tests** — vitest setup with 15 tests covering affiliates, protocols, and glossary functions
- **Footer links** — added Protocols and Đối tác & Tài trợ links

### Fixed
- `setTimeout` memory leak in lesson completion flow — now uses `useRef` cleanup on unmount

## [0.42.0.0] - 2026-03-18

### Added
- News feed (`/news`) with CoinGecko API and DeFi/NFT/Trading filters
- Price ticker strip (BTC/ETH/BNB/SOL/USDC with 24h change)
- News tab in mobile nav and desktop header
- canvas-confetti upgrade (realistic particles)
- `CompletionCelebration` hook for reuse
