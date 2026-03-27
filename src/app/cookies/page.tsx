export const metadata = {
  title: "Chính sách Cookie — diverFi",
  description:
    "diverFi dùng analytics ẩn danh và localStorage. Không có cookie quảng cáo.",
};

export default function CookiesPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-10">

      <section>
        <h1 className="text-2xl font-semibold leading-snug mb-2">Chính sách Cookie</h1>
        <p className="text-sm text-muted-foreground">Cập nhật: tháng 3/2026</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Cookie diverFi dùng</h2>

        <div className="space-y-3">
          <div className="border-l-4 border-muted pl-4 space-y-1">
            <p className="text-sm font-semibold">Vercel Analytics</p>
            <p className="text-sm text-muted-foreground">Đếm lượt xem, trang nào được đọc. Ẩn danh.</p>
          </div>

          <div className="border-l-4 border-muted pl-4 space-y-1">
            <p className="text-sm font-semibold">Google Analytics (GA4)</p>
            <p className="text-sm text-muted-foreground">
              Nguồn traffic, thiết bị, quốc gia. Ẩn danh, IP rút gọn. Cookie: <code className="text-xs bg-muted px-1 rounded">_ga</code>, <code className="text-xs bg-muted px-1 rounded">_ga_*</code>
            </p>
          </div>

          <div className="border-l-4 border-muted pl-4 space-y-1">
            <p className="text-sm font-semibold">Google Search Console</p>
            <p className="text-sm text-muted-foreground">Xác minh sở hữu site. Không đặt cookie phía bạn.</p>
          </div>

          <div className="border-l-4 border-muted pl-4 space-y-1">
            <p className="text-sm font-semibold">localStorage — theme và tiến độ học</p>
            <p className="text-sm text-muted-foreground">Lưu trên máy bạn. Không gửi về server.</p>
          </div>
        </div>

        <p className="text-base text-muted-foreground">
          Không có cookie quảng cáo. Không có cookie theo dõi cho bên thứ ba.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Tắt analytics</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Dùng uBlock Origin hoặc Brave. Hoặc bật "Do Not Track" trong settings trình duyệt.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Xóa localStorage: Settings trình duyệt → Clear site data cho diverfi.com.
        </p>
      </section>

    </div>
  );
}
