# diverFi

## gstack
- Dùng /browse cho tất cả web browsing, không dùng mcp__claude-in-chrome__* tools
- Available skills: /office-hours, /seo, /content-writer, /ship, /retro, /design-review, /qa, /browse, /review
- Nếu skills không hoạt động: cd .claude/skills/gstack && ./setup

## Project
- Vietnamese DeFi education + market data web app
- Stack: Next.js 14 App Router, TypeScript, Tailwind v4, ShadCN
- Deploy: Vercel (free tier)
- Data: DefiLlama API (ISR 5min)
- Storage: localStorage (no auth/DB for MVP)

## Communication Rules (IMPORTANT)
- Tôi không biết code
- Trả lời tối đa 5 dòng mỗi bước
- Chạy lệnh luôn, không hỏi confirm trừ khi destructive
- Không giải thích lý thuyết
- Không recap những gì đã làm
- Chỉ báo khi cần input thực sự từ tôi

## Current Status
- v0.43.0.0 — Design system hoàn thiện, robots.txt unblocked, keyword research done
- Active strategy: SEO Scale Machine — 10 bài long-form, 3-tier keyword funnel
- Next: `/content-writer` → viết bài số 1 "DeFi là gì" (3,000+ từ)

## SEO Strategy (đã confirmed 2026-03-30)
Xem design doc: `~/.gstack/projects/buithang3058-diverfi/buithang-main-design-20260330-office-hours.md`
Xem keyword list: `project/outputs/keyword-research-10.md`

**3-tier funnel:**
- Tier 1 (bài 8–10): blockchain/Bitcoin/crypto là gì — high volume, AUTHORITY, long game
- Tier 2 (bài 1,3,5,6): DeFi/yield farming/liquidity pool/staking là gì — EASY WIN
- Tier 3 (bài 2,4,7): tại sao mất tiền DeFi / impermanent loss / rủi ro staking — EASY WIN, diverFi's USP

**Priority order viết:** DeFi là gì → Tại sao mất tiền DeFi → Yield farming → Impermanent loss → ...

**Content standard mỗi bài:**
- 3,000+ từ
- Risk Table (🟢/🟡/🔴) với scenario VNĐ thực tế
- Decision Framework: NÊN / KHÔNG NÊN
- FAQ section (3–5 câu, GEO-optimized)
- Definition block (1–2 câu, AI-citable)
- Số liệu có nguồn (DeFiLlama, CoinGecko, Ethereum.org)

**Validation gate:** Share bài số 1 với 3–5 người thực. Tốt = 2/3 nói được 1 rủi ro cụ thể. Tệ = quay lại sửa format.

## Content Rules (áp dụng mọi bài viết)
- Không bắt đầu bằng định nghĩa textbook
- Không dùng $ — dùng VNĐ (5 triệu, 20 triệu, 100 triệu)
- Không trung lập giả tạo — phải có lập trường
- Summary phải kết luận NÊN hay KHÔNG NÊN, không chỉ tóm tắt lại

## OS Context
Đọc các file sau trước khi đề xuất bất cứ thứ gì:
- `project/context/business_goal.md` — North star: 100k user / 12 tháng, revenue tháng 8/2026
- `project/context/scope.md` — Chỉ làm content + SEO. Mọi thứ khác đều ngoài scope
- `project/context/stakeholders.md` — Solo founder, user = người đi làm VN, affiliate chưa ký
- `project/context/terminology.md` — Định nghĩa thuật ngữ sản phẩm và marketing

## Priority Filter
> Trước khi đề xuất bất cứ task nào, hỏi: "Cái này giúp rank cao hơn hoặc giúp user tìm thấy diverFi không?"
> Nếu không → đừng đề xuất.
