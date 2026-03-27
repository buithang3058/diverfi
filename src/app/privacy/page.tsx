export const metadata = {
  title: "Chính sách bảo mật — diverFi",
  description:
    "diverFi không có tài khoản người dùng, không lưu thông tin cá nhân. Tiến độ học lưu trên máy bạn.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-10">

      <section>
        <h1 className="text-2xl font-semibold leading-snug mb-2">Chính sách bảo mật</h1>
        <p className="text-sm text-muted-foreground">Cập nhật: tháng 3/2026</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">diverFi không biết bạn là ai</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Không có tài khoản. Không có email. Không có tên. diverFi không thu thập thông tin cá nhân.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Dữ liệu được lưu</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Tiến độ học lưu trong localStorage của trình duyệt — trên máy bạn, không gửi về server.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Vercel Analytics và Google Analytics ghi lại số lượt xem ẩn danh. Không gắn với danh tính cá nhân.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Khi bạn click link ra ngoài</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Binance, OKX, và các platform khác có chính sách bảo mật riêng. diverFi không kiểm soát được những gì họ làm với dữ liệu của bạn.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Xóa dữ liệu</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Vào Settings trình duyệt → Clear site data cho diverfi.com. Tiến độ học sẽ bị xóa.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Câu hỏi khác:{" "}
          <a href="https://t.me/diverfi_vn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            t.me/diverfi_vn
          </a>
        </p>
      </section>

    </div>
  );
}
