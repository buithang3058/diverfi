# Hướng dẫn thiết kế hình ảnh — diverFi

> **Nguyên tắc gốc:** Ảnh phải giúp hiểu nhanh hơn văn bản. Nếu không — bỏ.

---

## 1. Các loại ảnh dùng trong bài

### 1.1 Flow Diagram — Giải thích cơ chế
Dùng khi cần minh hoạ luồng tiền, cách một protocol hoạt động.

**Ví dụ:**
- Luồng tiền trong Liquidity Pool
- Cách Aave tính lãi suất
- Quá trình liquidation

**Cách tạo:** Excalidraw (excalidraw.com) — miễn phí, export PNG.

**Template layout:**
```
[Người dùng] → [Action] → [Protocol] → [Kết quả]
                                ↓
                          [Phí / Rủi ro]
```

**Quy tắc:**
- Tối đa 5 bước trong một diagram
- Mũi tên một chiều, rõ hướng tiền đi
- Ghi số tiền VNĐ vào ví dụ (không dùng $ hoặc % trừu tượng)
- Màu mũi tên: `#2F6BFF` (luồng chính), `#DC2626` (rủi ro/mất tiền)

---

### 1.2 Screenshot — Hướng dẫn thực tế
Dùng khi giải thích cách làm từng bước trên giao diện thật.

**Ví dụ:**
- Màn hình Uniswap khi swap token
- Giao diện Aave khi deposit
- MetaMask confirm transaction

**Cách chụp:**
- Full-width screenshot của phần quan trọng (không cần cả màn hình)
- Đánh số bước bằng vòng tròn đỏ `#DC2626` + số trắng
- Crop sát nội dung — bỏ phần URL bar, taskbar

**Quy tắc:**
- Phải là giao diện thật, không mock-up giả
- Nếu có số tiền cá nhân → blur hoặc thay bằng số ví dụ
- Caption bắt buộc: mô tả bước đang làm gì

---

### 1.3 Comparison Table — So sánh lựa chọn
Dùng khi so sánh 2–4 protocol, token, hoặc chiến lược.

**Ví dụ:**
- Aave vs Compound: lãi suất, TVL, rủi ro
- Uniswap v2 vs v3: fee, impermanent loss

**Cách tạo:** Tạo trực tiếp trong bài bằng Markdown table — không cần export thành ảnh.
Chỉ export thành ảnh nếu table phức tạp >5 cột.

**Quy tắc:**
- Tối đa 4 cột, 6 hàng
- Luôn có hàng "Phù hợp với" ở cuối
- Không dùng màu xanh/đỏ chỉ để trang trí — chỉ dùng khi có ý nghĩa (xanh = tốt hơn, đỏ = tệ hơn)

---

### 1.4 Risk Matrix — Minh hoạ mức độ rủi ro
Dùng khi cần show tương quan rủi ro–lợi nhuận của nhiều lựa chọn.

**Cách tạo:** Excalidraw — trục X là rủi ro, trục Y là APY tiềm năng.

**Màu chấm:**
- 🟢 `#16A34A` — Low risk
- 🟡 `#F59E0B` — Medium risk
- 🔴 `#DC2626` — High risk

---

### 1.5 Data Chart — Số liệu thị trường
Dùng khi trích dẫn TVL, APY, volume theo thời gian.

**Nguồn ưu tiên:**
- DeFiLlama (defillama.com) — screenshot chart TVL
- CoinGecko — screenshot price chart
- Dune Analytics — on-chain data

**Quy tắc:**
- Screenshot cả phần nguồn (tên website) để rõ xuất xứ
- Ghi ngày chụp trong caption: "DeFiLlama, tháng 3/2026"
- Không dùng chart quá 6 tháng tuổi — APY/TVL thay đổi nhanh

---

## 2. Palette màu cho ảnh

| Token | Hex | Dùng cho |
|-------|-----|---------|
| Primary | `#2F6BFF` | Luồng chính, element highlight, border |
| Background | `#FFFFFF` | Nền tất cả diagram |
| Surface | `#F7F9FB` | Nền box, background phụ |
| Text | `#0A0A0A` | Text trên ảnh |
| Subtext | `#6B7280` | Label, caption trên ảnh |
| Danger | `#DC2626` | Rủi ro, mất tiền, cảnh báo |
| Success | `#16A34A` | An toàn, lợi nhuận, bước đúng |
| Warning | `#F59E0B` | Cẩn thận, medium risk |

**Không dùng:**
- Gradient (trừ nền trang trí — không có trong diverFi)
- Shadow phức tạp
- Màu neon hoặc màu "crypto hype" (tím, vàng kim loại)

---

## 3. Typography trên ảnh

| Vai trò | Font | Size | Weight |
|---------|------|------|--------|
| Tiêu đề diagram | Be Vietnam Pro | 16–20px | 600 |
| Label / chú thích | Be Vietnam Pro | 12–14px | 400 |
| Số tiền / APY | JetBrains Mono | 14–16px | 500 |
| Step number | Be Vietnam Pro | 12px | 700 |

**Quy tắc:**
- Text trên ảnh phải đọc được ở 50% zoom
- Không dùng font khác ngoài 2 font trên
- Số tiền luôn dùng Mono để dễ đọc

---

## 4. Kích thước và định dạng

| Loại ảnh | Kích thước | Format |
|----------|-----------|--------|
| Flow diagram | 800×450px (16:9) | PNG |
| Screenshot | 800px width, height tự do | PNG |
| Comparison table | 800×auto | PNG |
| Risk matrix | 600×600px (1:1) | PNG |
| Data chart | 800×400px | PNG |
| OG Image (mỗi bài) | 1200×630px | PNG/JPG |

**Export:**
- PNG cho diagram và screenshot (không mất nét)
- JPG cho ảnh có nhiều gradient/photo (nhỏ hơn)
- Tên file: `[slug-bai]-[mo-ta].png` — ví dụ: `liquidity-pool-flow-diagram.png`

---

## 5. Vị trí đặt ảnh trong bài

```
Hook (text)
  ↓
[Flow Diagram — cơ chế tổng quan]
  ↓
Giải thích chi tiết (text)
  ↓
[Screenshot — bước thực tế]
  ↓
[Screenshot — bước tiếp theo]
  ↓
Risk Table (text + màu)
  ↓
[Risk Matrix nếu cần]
  ↓
Decision Framework (text)
  ↓
[Comparison Table nếu có nhiều lựa chọn]
```

**Quy tắc vị trí:**
- Ảnh đầu tiên: luôn là flow diagram tổng quan — đặt sau Hook
- Không đặt 2 ảnh liền nhau — luôn có ít nhất 1 đoạn text giữa
- Screenshot step-by-step: đặt đúng sau đoạn text mô tả bước đó
- Mỗi bài tối thiểu 2 ảnh, tối đa 6 ảnh

---

## 6. Alt text (bắt buộc cho SEO)

**Format:**
```
[Tên khái niệm] + [mô tả nội dung ảnh] + [context nếu cần]
```

**Ví dụ tốt:**
- `Cách hoạt động của Liquidity Pool trong DeFi — diagram luồng tiền`
- `Giao diện Aave v3 khi deposit USDC — bước 2 xác nhận transaction`
- `So sánh APY Aave và Compound tháng 3/2026 — nguồn DeFiLlama`

**Ví dụ xấu:**
- `ảnh 1` — quá chung chung
- `diagram` — không có keyword
- `screenshot của aave` — thiếu context

---

## 7. MDX syntax trong bài

```mdx
<!-- Flow diagram -->
![Cách hoạt động của Liquidity Pool trong DeFi — sơ đồ luồng tiền](/images/lessons/liquidity-pool-flow-diagram.png)

<!-- Screenshot có caption -->
![Giao diện Uniswap v3 khi swap ETH sang USDC — bước chọn token](/images/lessons/uniswap-v3-swap-step1.png)
*Bước 1: Chọn token muốn swap — ETH vào USDC*

<!-- Ảnh có context warning -->
![So sánh APY Aave và Compound — DeFiLlama tháng 3/2026](/images/lessons/aave-compound-apy-comparison.png)
> ⚠️ **APY thay đổi theo ngày.** Kiểm tra lại trước khi deposit.
```

---

## 8. Checklist trước khi publish

- [ ] Ảnh có alt text đầy đủ
- [ ] Tên file đúng format (slug + mô tả)
- [ ] Không có số tiền cá nhân hoặc địa chỉ ví thật
- [ ] Data chart: có ghi nguồn và ngày
- [ ] Screenshot: đã crop bỏ phần không cần thiết
- [ ] Flow diagram: đọc được khi zoom 50%
- [ ] Ảnh nằm đúng vị trí trong bài (sau đoạn text mô tả)
- [ ] File PNG <500KB (nếu lớn hơn → compress tại squoosh.app)

---

## 9. Tools miễn phí

| Tool | Dùng cho | Link |
|------|---------|------|
| Excalidraw | Flow diagram, risk matrix | excalidraw.com |
| Figma | Layout phức tạp, template cố định | figma.com |
| Squoosh | Compress PNG/JPG | squoosh.app |
| CleanShot X | Screenshot có annotation | (macOS, trả phí) |
| CMD+Shift+4 | Screenshot nhanh | macOS built-in |
| DeFiLlama | Data TVL/APY | defillama.com |
| CoinGecko | Price chart | coingecko.com |
