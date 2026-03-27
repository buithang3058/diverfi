export const metadata = {
  title: "Chính sách Cookie — diverFi",
  description:
    "diverFi dùng cookie tối thiểu. Không có cookie quảng cáo hay theo dõi cá nhân.",
};

export default function CookiesPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-12">

      <section>
        <h1 className="text-2xl font-semibold leading-snug mb-2">Chính sách Cookie</h1>
        <p className="text-sm text-muted-foreground">Cập nhật lần cuối: tháng 3/2026</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Trang này để làm gì</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Cookie là các file nhỏ được lưu trong trình duyệt khi bạn truy cập một trang
          web. Trang này giải thích diverFi dùng cookie gì, tại sao, và bạn có thể
          tắt những gì.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Chúng tôi dùng gì và không dùng gì</h2>

        <div className="space-y-3">
          <div className="border rounded-lg p-4 space-y-1">
            <p className="text-sm font-semibold">Analytics (Vercel Analytics)</p>
            <p className="text-sm text-muted-foreground">
              Đếm số người xem, thời gian trên trang, trang nào được đọc nhiều.
              Dữ liệu ẩn danh — không gắn với danh tính cá nhân.
            </p>
            <p className="text-xs text-muted-foreground">Loại: Phân tích | Có thể tắt: Có</p>
          </div>

          <div className="border rounded-lg p-4 space-y-1">
            <p className="text-sm font-semibold">Theme preference (localStorage)</p>
            <p className="text-sm text-muted-foreground">
              Ghi nhớ bạn chọn dark mode hay light mode. Lưu trong localStorage của
              trình duyệt — không phải cookie kỹ thuật, không gửi về server.
            </p>
            <p className="text-xs text-muted-foreground">Loại: Chức năng | Cần thiết để site hoạt động đúng</p>
          </div>

          <div className="border rounded-lg p-4 space-y-1">
            <p className="text-sm font-semibold">Tiến độ học (localStorage)</p>
            <p className="text-sm text-muted-foreground">
              Ghi nhớ bài nào bạn đã đọc. Lưu hoàn toàn trên thiết bị của bạn.
            </p>
            <p className="text-xs text-muted-foreground">Loại: Chức năng | Cần thiết cho tính năng học</p>
          </div>
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Không có cookie quảng cáo. Không có cookie theo dõi hành vi cho bên thứ ba.
          Không có cookie social media tự động.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Trách nhiệm thuộc về ai</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          diverFi chịu trách nhiệm về cookie và localStorage trên site này. Các platform
          bên ngoài (Binance, OKX...) có cookie riêng khi bạn truy cập trang của họ.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Bạn nên làm gì</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Để tắt analytics: dùng trình duyệt có ad-blocker (uBlock Origin, Brave) hoặc
          bật "Do Not Track" trong settings trình duyệt.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Để xóa dữ liệu localStorage: vào Settings trình duyệt → Clear site data cho
          diverfi.app. Tiến độ học sẽ bị xóa.
        </p>
      </section>

    </div>
  );
}
