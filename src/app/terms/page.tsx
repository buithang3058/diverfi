export const metadata = {
  title: "Điều khoản sử dụng — diverFi",
  description:
    "Điều khoản khi sử dụng diverFi. Ngắn gọn, không rắc rối pháp lý.",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-12">

      <section>
        <h1 className="text-2xl font-semibold leading-snug mb-2">Điều khoản sử dụng</h1>
        <p className="text-sm text-muted-foreground">Cập nhật lần cuối: tháng 3/2026</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Trang này để làm gì</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          Khi bạn dùng diverFi, bạn đồng ý với những điều khoản cơ bản này. Chúng tôi
          cố viết ngắn nhất có thể — không có điều khoản ẩn hay ngôn ngữ đánh bẫy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Chúng tôi cung cấp gì và không cung cấp gì</h2>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Cung cấp</p>
          <ul className="space-y-2 text-base text-muted-foreground">
            <li className="flex gap-2"><span>—</span><span>Nội dung giáo dục về DeFi, crypto, và blockchain bằng tiếng Việt.</span></li>
            <li className="flex gap-2"><span>—</span><span>Dữ liệu thị trường từ nguồn công khai (DefiLlama) mang tính tham khảo.</span></li>
            <li className="flex gap-2"><span>—</span><span>Liên kết đến các platform DeFi — một số là affiliate link.</span></li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Không cung cấp</p>
          <ul className="space-y-2 text-base text-muted-foreground">
            <li className="flex gap-2"><span>—</span><span>Lời khuyên đầu tư hay tư vấn tài chính cá nhân.</span></li>
            <li className="flex gap-2"><span>—</span><span>Đảm bảo tính chính xác tuyệt đối — DeFi thay đổi nhanh, số liệu có thể lỗi thời.</span></li>
            <li className="flex gap-2"><span>—</span><span>Đảm bảo uptime liên tục — đây là side project, có thể bảo trì bất cứ lúc nào.</span></li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Trách nhiệm thuộc về ai</h2>
        <p className="text-base text-muted-foreground leading-relaxed">
          diverFi chịu trách nhiệm về chất lượng nội dung xuất bản. Bạn chịu trách
          nhiệm về quyết định tài chính của mình. Nếu bạn mất tiền sau khi đọc bài
          trên diverFi, đó là quyết định của bạn — không phải lỗi của chúng tôi.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Điều khoản này có thể cập nhật. Thay đổi lớn sẽ được thông báo qua Telegram.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Bạn nên làm gì</h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li className="flex gap-2"><span>—</span><span>Dùng diverFi để học — không phải để lấy tín hiệu giao dịch.</span></li>
          <li className="flex gap-2"><span>—</span><span>Kiểm tra ngày đăng bài trước khi dùng số liệu cho quyết định thực tế.</span></li>
          <li className="flex gap-2"><span>—</span><span>Nếu thấy thông tin sai, báo qua Telegram để chúng tôi sửa.</span></li>
        </ul>
      </section>

    </div>
  );
}
