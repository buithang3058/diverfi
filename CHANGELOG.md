# Changelog

All notable changes to diverFi are documented here.

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
