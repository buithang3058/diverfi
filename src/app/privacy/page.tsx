export const metadata = {
  title: "Chính sách bảo mật — diverFi",
  description:
    "diverFi không thu thập thông tin cá nhân. Tìm hiểu dữ liệu nào được lưu, ở đâu, và bạn kiểm soát được gì.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-12">

      <section>
        <h1 className="text-2xl font-semibold leading-snug mb-2">Chính sách bảo mật</h1>
        <p className="text-sm text-muted-foreground">Cập nhật lần cuối: tháng 3/2026</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Trang này để làm gì</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          diverFi là trang học DeFi, không phải ứng dụng thu thập dữ liệu. Trang này
          giải thích rõ dữ liệu nào được ghi lại khi bạn dùng diverFi — và những gì
          chúng tôi không làm với nó.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Chúng tôi làm gì và không làm gì</h2>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Làm</p>
          <ul className="space-y-2 text-base text-muted-foreground">
            <li className="flex gap-2"><span>—</span><span>Ghi lại số lượt xem trang và hành vi điều hướng ẩn danh (qua Vercel Analytics) để hiểu bài nào hữu ích.</span></li>
            <li className="flex gap-2"><span>—</span><span>Lưu tiến độ học của bạn trong localStorage của trình duyệt — hoàn toàn trên thiết bị của bạn, không gửi về server.</span></li>
            <li className="flex gap-2"><span>—</span><span>Ghi nhận khi bạn click affiliate link để tính hoa hồng — nhưng đây là việc của partner (Binance, OKX...), không phải chúng tôi.</span></li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Không làm</p>
          <ul className="space-y-2 text-base text-muted-foreground">
            <li className="flex gap-2"><span>—</span><span>Không yêu cầu tên, email, hay bất kỳ thông tin cá nhân nào.</span></li>
            <li className="flex gap-2"><span>—</span><span>Không bán dữ liệu cho bên thứ ba.</span></li>
            <li className="flex gap-2"><span>—</span><span>Không dùng cookie theo dõi cho quảng cáo.</span></li>
            <li className="flex gap-2"><span>—</span><span>Không có tài khoản người dùng — không có gì để hack hay rò rỉ.</span></li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Trách nhiệm thuộc về ai</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          diverFi chịu trách nhiệm về dữ liệu analytics ẩn danh thu thập trên site.
          Khi bạn click link đến Binance, OKX, hoặc bất kỳ platform nào khác, chính
          sách bảo mật của họ áp dụng từ đó. Chúng tôi không kiểm soát được những gì
          họ làm với dữ liệu của bạn.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Bạn nên làm gì</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Nếu muốn xóa dữ liệu tiến độ học: vào Settings trình duyệt → Clear localStorage
          cho diverfi.app. Xong.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Nếu bạn có câu hỏi về dữ liệu, liên hệ qua Telegram:{" "}
          <a
            href="https://t.me/diverfi_vn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            t.me/diverfi_vn
          </a>
        </p>
      </section>

    </div>
  );
}
