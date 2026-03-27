export const metadata = {
  title: "Chính sách nội dung — diverFi",
  description:
    "diverFi viết theo tiêu chuẩn nào. Có affiliate không. Ai chịu trách nhiệm nếu thông tin sai.",
};

export default function ContentPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-10">

      <section>
        <h1 className="text-2xl font-semibold leading-snug mb-2">Chính sách nội dung</h1>
        <p className="text-sm text-muted-foreground">Cập nhật: tháng 3/2026</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tiêu chuẩn viết bài</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li>— Ghi ngày xuất bản và cập nhật.</li>
          <li>— Số liệu phải có nguồn: DeFiLlama, CoinGecko, Ethereum.org.</li>
          <li>— Mỗi bài có phần rủi ro — không bài nào bỏ qua.</li>
          <li>— Affiliate link ghi rõ, không giấu.</li>
          <li>— Sai thì sửa, không xóa — thêm chú thích ngày sửa.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Không làm</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li>— Không viết bài được trả tiền mà không ghi là sponsored.</li>
          <li>— Không dự báo giá, không khuyến nghị mua/bán.</li>
          <li>— Không thổi phồng APY để hấp dẫn người đọc.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Affiliate không ảnh hưởng nội dung</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          diverFi có affiliate với Binance, OKX, Uniswap, Aave. Điều đó không làm thay đổi những gì chúng tôi viết về họ.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Thông tin lỗi thời</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          DeFi thay đổi nhanh. Số liệu APY, TVL trong bài có thể đã thay đổi sau vài tuần.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Kiểm tra ngày bài trước khi dùng số liệu cho quyết định thực tế. Thấy sai — báo qua{" "}
          <a href="https://t.me/diverfi_vn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Telegram
          </a>.
        </p>
      </section>

    </div>
  );
}
