# diverFi — TODOs

## Lean MVP (4-6 weeks)

### Week 1-2: Foundation
- [ ] Setup Next.js 14 + Tailwind + ShadCN
- [ ] Deploy to Vercel
- [ ] Basic layout + navigation
- [ ] 2-3 pilot MDX lessons

### Week 3-4: Core Features
- [ ] Learning module (tracks, lessons)
- [ ] Progress tracking (localStorage)
- [ ] Market overview (DefiLlama)
- [ ] Basic search
- [ ] 5-7 more lessons

### Week 5-6: Polish & Launch
- [ ] Glossary page
- [ ] SEO optimization
- [ ] Mobile responsive
- [ ] Error handling + loading states
- [ ] Launch!

---

## Post-MVP TODOs

### P1 — When traction (>1k MAU)
- [ ] Add Clerk authentication
- [ ] Add Neon PostgreSQL for persistent progress
- [ ] Add Sentry error tracking
- [ ] Migrate localStorage progress to DB

### P2 — When scaling (>10k MAU)
- [ ] Add The Graph for on-chain data
- [ ] Add Vercel KV for caching
- [ ] Add E2E tests with Playwright
- [ ] Add monitoring dashboard for API quotas
- [ ] Protocol deep-dive pages

### P3 — Monetization
- [ ] Premium tier with Stripe
- [ ] Advanced analytics
- [ ] Whale tracking features
- [ ] API for developers

---

## Deferred (Not planned)
- Offline support (PWA) — low value
- Multi-language — focus Vietnamese first
- Mobile app — wait for 100k MAU

---

## Architecture Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-03-16 | Next.js 14 + Vercel | Best DX, SEO, free tier |
| 2025-03-16 | DefiLlama as primary data source | Free, no rate limit |
| 2025-03-16 | localStorage first (no DB for MVP) | Ship faster, add DB when needed |
| 2025-03-16 | No auth for MVP | Anonymous users first |
