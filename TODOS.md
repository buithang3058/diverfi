# diverFi — TODOs

## Architecture Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-03-16 | Next.js 14 + Vercel | Best DX, SEO, free tier |
| 2025-03-16 | DefiLlama as primary data source | Free, no rate limit |
| 2025-03-16 | localStorage first (no DB for MVP) | Ship faster, add DB when needed |
| 2025-03-16 | No auth for MVP | Anonymous users first |
| 2026-03-18 | Affiliate revenue over paid courses | Vietnam market: courses not viable; affiliate $30-50/user |
| 2026-03-18 | Track-level affiliate mapping | Simple to maintain; upgrade to lesson-level when A/B data available |
| 2026-03-18 | Supabase over Clerk+Neon | Full auth + DB in one service, better free tier for Vietnam scale |

---

## P1 — Active (building now)

- [x] Affiliate link system (track-level CTAs on every lesson) — Day 42
- [x] /partners page with sponsorship packages + mailto contact — Day 42
- [ ] DeFi Simulator ("What if I invested $X in Y protocol") + shareable image card — Day 43
- [ ] Supabase auth (Google OAuth) + user profiles — Day 44
- [ ] Public leaderboard by XP — Day 45
- [ ] Telegram Mini App version of diverFi — Day 46+

---

## P2 — When traction (>1k MAU)

- [ ] Vercel KV cache for CoinGecko API (rate limit protection)
- [ ] Lesson-level affiliate overrides (e.g. MEV lesson → GMX specifically)
- [ ] Affiliate click tracking (custom event to Vercel Analytics)
- [ ] Sentry error tracking
- [ ] Portfolio Tracker (wallet address → DeFi positions view)
- [ ] Migrate localStorage progress to Supabase (after auth ships)

---

## P3 — When scaling (>10k MAU)

- [ ] The Graph for on-chain data
- [ ] E2E tests with Playwright
- [ ] Monitoring dashboard for API quotas
- [x] Protocol deep-dive pages — Day 42 (v0.43.0.0)
- [ ] Telegram community growth tools (50k target)

---

## Deferred (Not planned)

- Mobile app (native) — wait for 100k MAU
- Multi-language — focus Vietnamese first
- Premium tier with Stripe — affiliate model is better fit for Vietnam
