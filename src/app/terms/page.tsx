export const metadata = {
  title: "Điều khoản sử dụng — diverFi",
  description:
    "Điều khoản khi dùng diverFi. Ngắn. Không có điều khoản ẩn.",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-10">

      <section>
        <h1 className="text-2xl font-semibold leading-snug mb-2">Điều khoản sử dụng</h1>
        <p className="text-sm text-muted-foreground">Cập nhật: tháng 3/2026</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">diverFi cung cấp</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li>— Nội dung giáo dục về DeFi và crypto bằng tiếng Việt.</li>
          <li>— Dữ liệu thị trường từ DefiLlama. Chỉ để tham khảo.</li>
          <li>— Link đến các platform DeFi. Một số là affiliate link.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">diverFi không cung cấp</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li>— Lời khuyên đầu tư.</li>
          <li>— Đảm bảo số liệu luôn chính xác — DeFi thay đổi nhanh.</li>
          <li>— Đảm bảo uptime — đây là side project.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Trách nhiệm</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          diverFi chịu trách nhiệm về chất lượng nội dung khi xuất bản.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Bạn chịu trách nhiệm về quyết định tài chính của mình.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Thay đổi</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Điều khoản có thể cập nhật. Thay đổi lớn thông báo qua{" "}
          <a href="https://t.me/diverfi_vn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Telegram
          </a>.
        </p>
      </section>

    </div>
  );
}
