# diverFi Design System v1

## 0. Brand Principles (Non-negotiable)

- Clarity > Aesthetics
- Decision > Decoration
- Trust > Hype

All design decisions must pass these 3 rules.

---

## I. Typography

### 1. Font Stack
- Primary: Be Vietnam Pro
- Secondary (data): JetBrains Mono

---

### 2. Type Scale

#### Desktop

| Type     | Size | Line Height | Weight |
|----------|------|-------------|--------|
| H1       | 36px | 44px        | 700    |
| H2       | 28px | 36px        | 600    |
| H3       | 22px | 30px        | 600    |
| Body L   | 18px | 28px        | 400    |
| Body     | 16px | 26px        | 400    |
| Caption  | 14px | 22px        | 400    |

#### Mobile (≤ 768px)

| Type     | Size | Line Height | Weight |
|----------|------|-------------|--------|
| H1       | 26px | 34px        | 700    |
| H2       | 22px | 30px        | 600    |
| H3       | 18px | 26px        | 600    |
| Body L   | 16px | 26px        | 400    |
| Body     | 16px | 26px        | 400    |
| Caption  | 13px | 20px        | 400    |

Rules:
- Body text >= 16px (desktop và mobile)
- H1 only once per page
- Mỗi đoạn = 1 ý duy nhất — không giới hạn số dòng cứng
- Line length: 60–75 characters (desktop), full width trên mobile

---

### 3. Emphasis System

- **Bold** → decision / key insight (dùng tiết kiệm — tối đa 2-3 lần/section)
- `Mono` → numbers / APY / % / contract address
- Red (#DC2626) → risk warning
- Green (#16A34A) → safe action / recommended

---

## II. Color System

### 1. Core Palette

| Token      | Hex       | Dùng cho |
|------------|-----------|----------|
| Background | #FFFFFF   | Page background |
| Surface    | #F7F9FB   | Card, sidebar, inset block |
| Primary    | #2F6BFF   | CTA button, link, border accent |
| Accent     | #5CE1E6   | Highlight data point, tag, badge — không dùng cho text |
| Text       | #0A0A0A   | Body text, heading |
| Subtext    | #6B7280   | Caption, metadata, placeholder |

---

### 2. Semantic Colors

| Token   | Hex       | Dùng cho |
|---------|-----------|----------|
| Success | #16A34A   | Safe action, low risk indicator |
| Warning | #F59E0B   | Medium risk, caution |
| Danger  | #DC2626   | High risk, loss scenario, stop |

Rules:
- Màu phải carry meaning, không decoration
- Không dùng màu chỉ để "làm đẹp" — nếu không có semantic reason thì dùng trắng/xám

---

## III. Layout & Grid

### 1. Content Width
- Max width: 720px
- Centered layout
- Padding ngang mobile: 16px

---

### 2. Spacing System (8pt grid)

```
8 / 16 / 24 / 32 / 48 / 64 / 96
```

---

### 3. Section Spacing

- Giữa các section chính: 48–64px
- Heading → content: 16–24px
- Component → component: 24–32px

---

### 4. Layout Rules

- Max 2 columns (desktop only)
- Prefer vertical flow — mobile first
- Không dùng card grid phức tạp
- Bảng: max 4-5 cột, scroll ngang trên mobile

---

## IV. Core Components

### 1. Decision Box

**Purpose:** Giúp user ra quyết định ngay — NÊN hay KHÔNG NÊN.

**Style:**
- Background: #F0F7FF
- Border-left: 4px solid #2F6BFF
- Border-radius: 4px
- Padding: 16–20px

**Structure:**
```
✅ Bạn NÊN [action] nếu:
- [điều kiện cụ thể 1]
- [điều kiện cụ thể 2]

❌ Bạn KHÔNG NÊN nếu:
- [điều kiện cụ thể 1]
- [điều kiện cụ thể 2]
```

**Rules:**
- Luôn có cả ✅ lẫn ❌ — không một chiều
- Điều kiện phải cụ thể, không generic ("nếu bạn hiểu DeFi" = invalid)

---

### 2. Risk Table

**Purpose:** Hiển thị rủi ro với mức độ rõ ràng — không giấu, không giảm nhẹ.

**Style:**
- Border: 1px solid #E5E7EB
- Header background: #F7F9FB
- Row padding: 12px 16px

**Structure:**

| Rủi ro | Mức độ | Ví dụ thực tế | Cách giảm thiểu |
|--------|--------|---------------|-----------------|
| [tên]  | 🟢 Low  | [scenario VNĐ] | [action cụ thể] |
| [tên]  | 🟡 Medium | [scenario VNĐ] | [action cụ thể] |
| [tên]  | 🔴 High | [scenario VNĐ] | [action cụ thể] |

**Risk level indicators:**
- 🟢 Low — mất ít, recover được
- 🟡 Medium — mất đáng kể, cần cẩn thận
- 🔴 High — mất lớn, có thể không recover

**Rules:**
- Mỗi bài DeFi bắt buộc có Risk Table
- "Ví dụ thực tế" phải dùng VNĐ và scenario cụ thể
- Không dùng "có thể xảy ra" — phải là scenario thật

---

### 3. Warning / Tip Block

**Purpose:** Nổi bật thông tin quan trọng không nên bỏ qua.

**Warning (risk):**
- Background: #FEF2F2
- Border-left: 4px solid #DC2626
- Icon: ⚠️
- Dùng cho: rủi ro cao, bước dễ mắc lỗi, không được làm

**Tip (action):**
- Background: #F0FDF4
- Border-left: 4px solid #16A34A
- Icon: 💡
- Dùng cho: best practice, cách làm tốt hơn, shortcut an toàn

**Structure:**
```
⚠️ **Cảnh báo:** [nội dung ngắn gọn, 1-2 câu]

💡 **Mẹo:** [nội dung ngắn gọn, 1-2 câu]
```

**Rules:**
- Không dùng Warning cho thông tin bình thường
- Không dùng quá 2 Warning/Tip per section — nếu mọi thứ đều "quan trọng" thì không gì quan trọng

---

### 4. FAQ Block

**Purpose:** Trả lời câu hỏi thực tế — cấu trúc cho AI citation và featured snippet.

**Style:**
- Question: H3, font-weight 600
- Answer: Body, padding-left 16px
- Separator: 1px solid #E5E7EB giữa các Q&A

**Structure:**
```
### [Câu hỏi dạng người dùng thực tế hay search?]
[Trả lời 2-3 câu, thẳng thắn, có số liệu hoặc mức độ cụ thể]

### [Câu hỏi 2]
[Trả lời]
```

**Rules:**
- Câu hỏi phải là ngôn ngữ người dùng, không jargon kỹ thuật
- Trả lời phải có lập trường — không "tùy trường hợp" chung chung
- Mỗi bài: 3–5 FAQ, đặt cuối bài

---

### 5. Definition Block

**Purpose:** Định nghĩa rõ ràng để AI (Perplexity, ChatGPT) có thể trích dẫn.

**Style:**
- Blockquote styling
- Font: Body L (18px desktop)

**Structure:**
```
> **[Tên khái niệm]** là [định nghĩa 1-2 câu, không jargon].
> Ví dụ thực tế: [1 câu với số tiền VNĐ].
```

**Rules:**
- Đặt ngay sau Hook, trước khi giải thích sâu
- Không dùng jargon trong definition
- Ví dụ phải có số tiền cụ thể (VNĐ)

---

## V. What This System Does NOT Do

- ❌ Không có dark mode
- ❌ Không có animation / transition (ngoại trừ hover state đơn giản)
- ❌ Không có glassmorphism, gradient phức tạp, glow effect
- ❌ Không có hình ảnh abstract blockchain, coin bay lơ lửng
- ❌ Không dùng màu chỉ để trang trí
- ❌ Không có layout quá 2 cột
- ❌ Không dùng icon thay cho text quan trọng

---

## VI. Design Decisions Log

| Date       | Decision | Rationale |
|------------|----------|-----------|
| 2026-03-21 | Chọn Direction 1: Clarity Over Chaos | Trust > Hype, phù hợp target user chưa dùng DeFi |
| 2026-03-21 | Be Vietnam Pro làm primary font | Tối ưu cho tiếng Việt, dễ đọc trên mobile |
| 2026-03-21 | Max content width 720px | Optimal reading length, không cần full-bleed |
| 2026-03-21 | Risk Table bắt buộc mỗi bài | Differentiation thật sự với đối thủ thiếu risk layer |
